import { App, Avatar, Card, Flex, List } from "antd"
import styled from "styled-components"
import { useEffect, useRef, useState } from "react";
import { useParams } from "@umijs/max";
import { queryProductGroupGoods } from "@/services/y2/apiLogistics";
import AddProduct from "./AddProduct";
import customFreight from "@/store/settings/ShippingAndDistribution/customFreight";
import { observer } from "mobx-react-lite";
import { DeleteIcon } from "@/components/Icons/Icons";

export interface ProductType {
    productId: string;
    productGroupSeq: string;
    productGroupName: string;
    title: string;
    image: string | null;
}

// 服务端每页固定拉 5 条
const FETCH_PAGE_SIZE = 5;

function ApplicableGoods() {
    const { message } = App.useApp();
    const { id = "" } = useParams();
    const [loading, setLoading] = useState(false);
    // 服务端已拉取的全量数据（本地分页的唯一服务端数据源）
    const [originList, setOriginList] = useState<ProductType[]>([]);
    // goodPagination.total 只保存「服务端总数」，用于判断是否拉完
    const [goodPagination, setGoodPagination] = useState({
        position: "bottom" as const,
        align: "end" as const,
        current: 1,
        pageSize: FETCH_PAGE_SIZE,
        total: 0,
    });

    // 已从服务端拉取到的页码
    const serverPageRef = useRef(0);
    // 防止删除后补页 effect 并发执行
    const refetchingRef = useRef(false);

    // 合并列表：服务端已拉取数据（过滤已删除）在前，本地新增（只去重，不过滤）追加到最后
    const getMergedList = (list: ProductType[]): ProductType[] => {
        const created = customFreight.createdProduct || [];
        const deletedSet = new Set(customFreight.deletedProductIds || []);
        const serverIds = new Set(list.map(p => p.productId));

        // 服务端已拉取：过滤已删除的
        const serverFiltered = list.filter(p => !deletedSet.has(p.productId));
        // 本地新增：只过滤与已拉取服务端数据重复的，不过滤已删除（删除新增时已从 createdProduct 移除）
        const createdFiltered = created.filter(p => !serverIds.has(p.productId));
        return [...serverFiltered, ...createdFiltered];
    };

    // 初始加载第一页，重置所有状态
    useEffect(() => {
        if (!id) return;
        serverPageRef.current = 0;
        setOriginList([]);
        setGoodPagination(prev => ({ ...prev, current: 1, total: 0 }));
        setLoading(true);
        queryProductGroupGoods({
            languages_id: customFreight.language,
            productGroupSeq: id,
            pageNum: 1,
            pageSize: FETCH_PAGE_SIZE,
        }).then(res => {
            serverPageRef.current = 1;
            setOriginList(res.data.list);
            setGoodPagination(prev => ({
                ...prev,
                current: 1,
                total: res.data.total,
            }));
        }).catch(() => {
        }).finally(() => {
            setLoading(false);
        });
    }, [id, customFreight.language, customFreight.productGroupRefresh]);

    // 从服务端再拉一页，返回这一页数据和最新 total
    const fetchMore = async (): Promise<{ list: ProductType[]; total: number } | null> => {
        const nextPage = serverPageRef.current + 1;
        try {
            const res = await queryProductGroupGoods({
                languages_id: customFreight.language,
                productGroupSeq: id,
                pageNum: nextPage,
                pageSize: FETCH_PAGE_SIZE,
            });
            serverPageRef.current = nextPage;
            return { list: res.data.list, total: res.data.total };
        } catch {
            return null;
        }
    };

    // 翻页：上一页纯本地切换；下一页服务端已拉数据不够填当前页时才补页
    const onPageChange = async (page: number, pageSize: number) => {
        if (page < goodPagination.current) {
            setGoodPagination(prev => ({ ...prev, current: page }));
            return;
        }

        const needCount = page * pageSize;
        let localOriginList = originList;
        let localTotal = goodPagination.total;

        // 需要补页：服务端还有未拉取数据，且已拉取数据不够填满当前页
        const needFetch = () =>
            localOriginList.length < localTotal && localOriginList.length < needCount;

        if (needFetch()) {
            setLoading(true);
            while (needFetch()) {
                const res = await fetchMore();
                if (!res || res.list.length === 0) break;
                localOriginList = [...localOriginList, ...res.list];
                localTotal = res.total;
            }
            setLoading(false);
            setOriginList(localOriginList);
            setGoodPagination(prev => ({ ...prev, current: page, total: localTotal }));
        } else {
            setGoodPagination(prev => ({ ...prev, current: page }));
        }
    };

    // 合并后的完整列表 + 当前页展示数据（渲染时实时计算，新增/删除变化自动反映）
    const mergedList = getMergedList(originList);
    const { current, pageSize } = goodPagination;
    const visibleGoodsList = mergedList.slice((current - 1) * pageSize, current * pageSize);

    // 展示总数 = 服务端总数 - 已删除的服务端商品数 + 有效新增数
    const originIds = new Set(originList.map(p => p.productId));
    const created = customFreight.createdProduct || [];
    const deletedIds = customFreight.deletedProductIds || [];
    // 删除的 id 落在 originList 里 → 删的是服务端商品
    const serverDeletedCount = deletedIds.filter(did => originIds.has(did)).length;
    // 有效新增：只排除与已拉取服务端数据重复的（删除新增时已从 createdProduct 移除，无需再过滤 deleted）
    const validCreatedCount = created.filter(p => !originIds.has(p.productId)).length;
    const mergedTotal = Math.max(
        mergedList.length,
        goodPagination.total - serverDeletedCount + validCreatedCount
    );

    // 当前页超出总页数时，跳回最后一页
    useEffect(() => {
        const totalPages = Math.max(1, Math.ceil(mergedTotal / pageSize));
        if (current > totalPages) {
            setGoodPagination(prev => ({ ...prev, current: totalPages }));
        }
    }, [mergedTotal, pageSize, current]);

    // 删除导致当前页数据不够 5 条时，自动从服务端补页（仅服务端还有未拉取数据时）
    useEffect(() => {
        if (refetchingRef.current) return;
        const mergedLen = getMergedList(originList).length;
        const needCount = goodPagination.current * goodPagination.pageSize;
        if (mergedLen >= needCount || originList.length >= goodPagination.total) return;

        refetchingRef.current = true;
        let cancelled = false;
        setLoading(true);
        (async () => {
            let localOriginList = originList;
            let localTotal = goodPagination.total;
            const needFetch = () =>
                getMergedList(localOriginList).length < needCount &&
                localOriginList.length < localTotal;

            while (needFetch()) {
                const res = await fetchMore();
                if (!res || res.list.length === 0) break;
                localOriginList = [...localOriginList, ...res.list];
                localTotal = res.total;
            }
            if (cancelled) return;
            setLoading(false);
            refetchingRef.current = false;
            if (localOriginList !== originList) {
                setOriginList(localOriginList);
                setGoodPagination(prev => ({ ...prev, total: localTotal }));
            }
        })();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customFreight.deletedProductIds]);

    const removeProduct = (productId: string) => {
        if (customFreight.deletedProductIds.includes(productId)) return;
        // 删除的是本地新增商品：先从 createdProduct 移除
        if (customFreight.createdProduct.some(p => p.productId === productId)) {
            customFreight.setCreatedProduct(customFreight.createdProduct.filter(p => p.productId !== productId));
        }else{
            // 记录到删除列表（服务端商品会通过这个 id 在提交时删除）
            customFreight.setDeletedProductIds([...customFreight.deletedProductIds, productId]);
        }
    };

    return (
        <Scoped>
            <Card classNames={{ body: "card" }}>
                <Flex justify="space-between" align="center">
                    <div>
                        <div className="color-242833 font-16 font-w-600">适用商品</div>
                        <div style={{ marginRight: "8px" }}>
                            已选 {mergedTotal} 件商品，这些商品将在其他运费方案中被移除
                        </div>
                    </div>
                    <AddProduct />
                </Flex>
                {visibleGoodsList.length > 0 && (
                    <List
                        className="goods-list"
                        loading={loading}
                        pagination={{
                            ...goodPagination,
                            total: mergedTotal,
                            onChange: (page, pageSize) => {
                                onPageChange(page, pageSize);
                            },
                        }}
                        dataSource={visibleGoodsList}
                        renderItem={(item) => (
                            <List.Item key={item.productId} className="goods-item">
                                <Flex align="center">
                                    <Avatar
                                        shape="square"
                                        size="large"
                                        src={
                                            item.image && item.image !== ""
                                                ? item.image + "?x-oss-process=image/resize,w_100"
                                                : "/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"
                                        }
                                    />
                                    <div style={{ marginLeft: "12px" }}>{item.title}</div>
                                </Flex>
                                <DeleteIcon className="font-16 color-F86140" onClick={() => removeProduct(item.productId)} />
                            </List.Item>
                        )}
                    />
                )}
            </Card>
        </Scoped>
    );
}

export default observer(ApplicableGoods);

const Scoped = styled.div`
    .content-box {
        margin-bottom: 12px;
    }
    .goods-list {
        margin-top: 20px;
        .goods-item {
            padding: 12px 20px;
        }
    }
    .ant-list-items {
        border: 1px solid #eef1f7;
        border-bottom: none;
        border-radius: 4px;
    }
`