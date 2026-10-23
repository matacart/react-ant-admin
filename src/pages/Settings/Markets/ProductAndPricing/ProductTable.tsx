import { FoldIcon, UnfoldIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import DefaultTag from "@/components/Tag/DefaultTag";
import { excludeMarketProductBatch, getMarketProductList } from "@/services/y2/apiSaleMarket";
import domainAndLang from "@/store/settings/markets/domainAndLang";
import productAndPricing, { Product, ProductSku } from "@/store/settings/markets/productAndPricing";
import { useParams } from "@umijs/max";
import { Avatar, Flex, InputNumber, Switch, Table } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PriceInput from "./InputPrice";

function ProductTable() {

    const { marketId="", langId="" } = useParams();

    const [loading,setLoading] = useState(false);

    const [loadingKeys, setLoadingKeys] = useState<Set<string>>(new Set());

    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    const [data,setData] = useState<Product[]>([]);

    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const handlePrice = (record:any, price:number,type:string) => {
        if(record?.skuId){
            // 更新sku价格
            const sku = record as ProductSku;
            productAndPricing.updateSkuPriceExchangeList([sku], price, type);
        }else{
            const product = record as Product;
            // 有SKU更新所有SKU 无SKU更新产品价格
            if(record.skuList?.length){
                // 更新所有SKU价格
                productAndPricing.updateSkuPriceExchangeList(record.skuList, price, type)
            }else{
                productAndPricing.updateProductPriceExchangeList(product,price,type);
            }
        }
    }

    const columns = [
        {
            title: '名称',
            dataIndex: 'title',
            width: 180,
            render: (value:string, record:Product) => {
                if(record?.skuId){
                    return (
                        <Flex align="center" gap={10} style={{marginLeft:"66px"}}>
                            <Avatar 
                                style={{flex: '0 0 60px'}}
                                size={60} 
                                shape="square" 
                                src={"/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"}
                            />
                            <div style={{flex:1}}>
                                <div style={{
                                    alignContent: 'center',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth:'calc(100% - 60px)',
                                }}>{record.title}</div>
                            </div>
                        </Flex>
                    )
                }
                return (
                    <Flex align="center" gap={10}>
                        <Avatar 
                            style={{flex: '0 0 60px'}}
                            size={60} 
                            shape="square" 
                            src={record?.imageList?.[0] ? record?.imageList?.[0] + "?x-oss-process=image/resize,w_100" : "/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"}
                        />
                        <div style={{flex:1}}>
                            <div style={{
                                alignContent: 'center',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth:'calc(100% - 60px)',
                            }}>{record.title}</div>
                            <Flex style={{marginTop:"4px",height:"20px"}} align="center">
                                {record?.skuList?.length >0 ? <span className="font-12 cursor-pointer" onClick={()=>{
                                    setExpandedRowKeys((prev) => prev.includes(record.productId) ? prev.filter((item) => item !== record.productId) : [...prev, record.productId]);
                                }}>
                                    <span>{record.skuList.length}个款式</span>
                                    {expandedRowKeys.includes(record.productId) ? <FoldIcon /> : <UnfoldIcon />}
                                </span>:<span></span>}
                                {!record.shelves && <DefaultTag text={"已下架"} />}
                            </Flex>
                        </div>
                    </Flex>
                )
            }
        },
        {
            title: '状态',
            dataIndex: 'excluded',
            render: (value:boolean, record:Product) => {
                if(record?.skuId) return null;
                return (
                    <Flex align="center" gap={8}>
                        <Switch
                            checked={!value}
                            loading={loadingKeys.has(record.productId)}
                            onChange={(checked)=>{
                                if(loadingKeys.has(record.productId)){
                                    return;
                                }
                                setLoadingKeys((prev) => new Set(prev).add(record.productId));
                                excludeMarketProductBatch({
                                    languages_id:langId,
                                    marketId:marketId,
                                    excludedProductIds:checked?"":JSON.stringify([record.productId]),
                                    includedProductIds:checked?JSON.stringify([record.productId]):"",
                                }).then(()=>{
                                    const next = [...data];
                                    next.forEach((item)=>{
                                        if(item.productId == record.productId){
                                            item.excluded = !checked;
                                        }
                                    })
                                    setData(next);
                                }).catch(()=>{
                                }).finally(()=>{
                                    setLoadingKeys((prev) => {
                                        const next = new Set(prev);
                                        next.delete(record.productId);
                                        return next;
                                    });
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
            render: (value:number, record:Product | ProductSku) => {
                let defaultPrice = "-";
                let isFixed = (record.originalPresentmentPrice != null);
                if(record?.skuId){
                    const sku = record as ProductSku;
                    defaultPrice = sku.originalPrice?.toString() || "-";
                }else{
                    const product = record as Product;
                    const hasMin = product.originalPriceMin != null;
                    const hasMax = product.originalPriceMax != null;
                    if (hasMin && hasMax && product.originalPriceMin != product.originalPriceMax) {
                        defaultPrice = product.originalPriceMin + "~" + product.originalPriceMax;
                    } else if (hasMin || hasMax) {
                        defaultPrice = (hasMin ? product.originalPriceMin : product.originalPriceMax)?.toString() || "-";
                    }
                };
                return (
                    <div>
                        <PriceInput isFixed={isFixed} disabled={productAndPricing.marketDetail?.homeMarket || Boolean(record.previewCountryCode)} prefix={record.previewCurrency} defaultValue={defaultPrice} onBlur={(e:any)=>handlePrice(record,Number(e.target.value),"2")} />
                    </div>
                );
            },
        },
        {
            title: '售价',
            dataIndex: 'priceMin',
            width: 150,
            render: (value:number, record:Product | ProductSku) => {
                let defaultPrice = "-";
                let isFixed = false;
                if(record?.skuId){
                    const sku = record as ProductSku;
                    defaultPrice = sku.price?.toString() || "-";
                }else{
                    const product = record as Product;
                    const hasMin = product.priceMin != null;
                    const hasMax = product.priceMax != null;
                    if (hasMin && hasMax && product.priceMin != product.priceMax) {
                        defaultPrice = product.priceMin + "~" + product.priceMax;
                    } else if (hasMin || hasMax) {
                        defaultPrice = (hasMin ? product.priceMin : product.priceMax)?.toString() || "-";
                    }
                };
                
                return (
                    <div>
                        <PriceInput isFixed={isFixed} disabled={productAndPricing.marketDetail?.homeMarket || Boolean(record.previewCountryCode)} prefix={record.previewCurrency} defaultValue={defaultPrice} onBlur={(e:any)=>handlePrice(record,Number(e.target.value),"1")} />
                    </div>
                );
            },
        }
    ];

    useEffect(() => {
        setLoading(true);
        getMarketProductList({
            languages_id:langId,
            marketId:marketId,
            countryCode:productAndPricing.countryCode,
            pageNum:pagination.current,
            pageSize:pagination.pageSize,
        }).then((res)=>{
            const { list, total, excludedNum, includedNum } = res.data;
            productAndPricing.setCount(total)
            productAndPricing.setExcludedNum(excludedNum)
            productAndPricing.setIncludedNum(includedNum);
            const processedList = list.map((parent:Product) => {
                if (parent.skuList && parent.skuList.length > 0 && !parent.single) {
                    parent.skuList = parent.skuList.map((child:ProductSku) => ({
                        ...child,
                        previewCurrency: parent.previewCurrency, // 注入父级货币
                        previewCountryCode: parent.previewCountryCode, // 注入父级国家
                        productId: parent.productId,  // 注入父级商品ID
                    }));
                }else{
                    parent.skuList = [];
                }
                return parent;
            });
            setData(processedList);
            setPagination({
                ...pagination,
                total: total,
            });
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }, [langId,pagination.current,pagination.pageSize,productAndPricing.priceRule.baseCurrency,productAndPricing.tableKey,productAndPricing.countryCode]);
    
    return (
        <Scoped>
            <Table
                loading={loading}
                dataSource={data}
                columns={columns}
                scroll={{ x: 800 }}
                pagination={pagination}
                rowKey={(record) => record.skuId || record.productId}
                onChange={(pagination)=>{
                    setPagination({
                        current: pagination.current ?? 1,
                        pageSize: pagination.pageSize ?? 10,
                        total: pagination.total ?? 0,
                    });
                }}
                expandable={{
                    childrenColumnName: 'skuList',
                    expandIcon: () => <></>,
                    expandedRowKeys: expandedRowKeys, // 已展开的行键
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