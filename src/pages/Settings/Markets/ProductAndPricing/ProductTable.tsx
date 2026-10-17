import MyInput from "@/components/Input/MyInput";
import { excludeMarketProductBatch, getMarketProductList } from "@/services/y2/apiSaleMarket";
import domainAndLang from "@/store/settings/markets/domainAndLang";
import productAndPricing, { Product } from "@/store/settings/markets/productAndPricing";
import { useParams } from "@umijs/max";
import { Flex, Switch, Table } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function ProductTable() {

    const { marketId="", langId="" } = useParams();

    const [data,setData] = useState<Product[]>([]);

    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const columns = [
        {
            title: '名称',
            dataIndex: 'title',
            width: 180,
        },
        {
            title: '状态',
            dataIndex: 'excluded',
            render: (value:boolean, record:Product) => {
                return (
                    <Flex align="center" gap={8}>
                        <Switch
                            checked={!value}
                            onChange={(checked)=>{
                                excludeMarketProductBatch({
                                    languages_id:langId,
                                    marketId:marketId,
                                    excludedProductIds:checked?"":JSON.stringify([record.productId]),
                                    includedProductIds:checked?JSON.stringify([record.productId]):"",
                                })
                            }}
                        />
                        {value ? "排除" : "包含"}
                    </Flex>
                )
            },
            width: 120,
        },
        {
            title: '原价',
            dataIndex: 'originalPriceMin',
            width: 150,
            render: (value:number, record:Product) => {
                const customPrice = productAndPricing.productPriceExchangeList.find((item)=>item.productId == record.productId)?.customPriceList.find((item)=>item.priceType == "2")?.price || undefined;
                let defaultPrice = "-";
                const hasMin = record.originalPriceMin != null;
                const hasMax = record.originalPriceMax != null;
                if (hasMin && hasMax && record.originalPriceMin != record.originalPriceMax) {
                    defaultPrice = record.originalPriceMin + "~" + record.originalPriceMax;
                } else if (hasMin || hasMax) {
                    defaultPrice = (hasMin ? record.originalPriceMin : record.originalPriceMax).toString();
                }
                return (
                    <div>
                        <MyInput prefix={record.baseCurrency}  defaultValue={defaultPrice} value={customPrice} />
                    </div>
                );
            },
        },
        {
            title: '售价',
            dataIndex: 'priceMin',
            width: 120,
            render: (value:number, record:Product) => {
                return (
                    <div>{value}</div>
                );
            },
        }
    ];

    useEffect(() => {
        getMarketProductList({
            languages_id:langId,
            marketId:marketId,
            pageNum:pagination.current,
            pageSize:pagination.pageSize,
        }).then((res)=>{
            const { list, total, excludedNum, includedNum } = res.data;
            productAndPricing.setCount(total)
            productAndPricing.setExcludedNum(excludedNum)
            productAndPricing.setIncludedNum(includedNum)
            setData(list);
            setPagination({
                ...pagination,
                total: total,
            });
        })
    }, [langId,pagination.current, pagination.pageSize]);

    return (
        <Scoped>
            <Table
                dataSource={data}
                columns={columns}
                pagination={pagination}
                rowKey={(record) => record.productId}
                onChange={(pagination)=>{
                    setPagination({
                        current: pagination.current ?? 1,
                        pageSize: pagination.pageSize ?? 10,
                        total: pagination.total ?? 0,
                    });
                }}
            />
        </Scoped>
    )
}

const Scoped = styled.div`
    margin-top: 12px;
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`

export default observer(ProductTable);