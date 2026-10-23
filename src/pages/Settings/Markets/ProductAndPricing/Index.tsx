import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history, useParams } from "@umijs/max";
import { App, Flex } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMarketDetail, getMarketPriceRule, getMarketProductList, modifyMarketProductPrice } from "@/services/y2/apiSaleMarket";
import { observer } from "mobx-react-lite";
import BaseCurrency from "./BaseCurrency";
import productAndPricing from "@/store/settings/markets/productAndPricing";
import ProductList from "./ProductList";
import LangSelect from "@/components/Select/LangSelect";
import { names } from "../Index/MarketsList";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { toJS } from "mobx";
import Overlay from "@/components/Overlay/Overlay";

function Index() {

    const { marketId="", langId="" } = useParams();

    const [isSkeleton, setIsSkeleton] = useState(true);

    const { message } = App.useApp();

    const [loading, setLoading] = useState(false);

    const submit = ()=>{
        console.log(toJS(productAndPricing.productPriceExchangeList));
        console.log(toJS(productAndPricing.skuPriceExchangeList));
        setLoading(true);
        modifyMarketProductPrice({
            languages_id:langId,
            marketId:marketId,
            baseCurrency:productAndPricing.priceRule.baseCurrency,
            downAdjust:productAndPricing.priceRule.downAdjust,
            priceAdjustRate:productAndPricing.priceRule.priceAdjustRate,
            useLocalCurrency:productAndPricing.priceRule.useLocalCurrency,
            skuPriceExchangeList:JSON.stringify(productAndPricing.skuPriceExchangeList),
            productPriceExchangeList:JSON.stringify(productAndPricing.productPriceExchangeList),
        }).then(()=>{
            message.success("保存成功");
            // 刷新数据
            productAndPricing.refreshTable();
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    // 初始化数据
    useEffect(() => {
        Promise.allSettled([
            getMarketDetail({
                market_id:marketId,
                languages_id:langId,
            }),
            getMarketPriceRule({
                languages_id:langId,
                marketId:marketId,
            }),
        ]).then(([marketDetail,priceRule])=>{
            marketDetail.status == "fulfilled" && productAndPricing.setMarketDetail(marketDetail.value.data);
            priceRule.status == "fulfilled" && productAndPricing.setPriceRule(priceRule.value.data);
        }).catch(()=>{}).finally(()=>{
            setIsSkeleton(false);
        })
    }, [langId])

    useEffect(()=>{
        if(isSkeleton) return;
        getMarketPriceRule({
            languages_id:langId,
            marketId:marketId,
        }).then(res=>{
            productAndPricing.setPriceRule(res.data)
        }).catch(()=>{
        }).finally(()=>{
        })
    },[productAndPricing.priceRule.baseCurrency])

    useEffect(()=>{
        productAndPricing.reset();
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<Flex className='mc-layout-wrap' align="center">
                <div className="mc-layout">
                    <Flex className="mc-header" justify="space-between">
                        <Flex className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>history.push(`/settings/markets/${marketId}/${langId}`)}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div style={{marginLeft:"12px"}}>
                                <div className="font-20 font-w-500">{"商品与定价"}</div>
                                <div style={{marginTop:"4px"}} className="font-12 font-w-400">{names(productAndPricing.marketDetail?.countryList || [])}</div>
                            </div>
                        </Flex>
                        <Flex gap={12}>
                            <LangSelect lang={langId} setLang={(lang:string)=>history.push(`/settings/markets/pricing/${marketId}/${lang}`)} />    
                        </Flex>
                    </Flex>
                    {/* 主要内容 */}
                    <Flex gap={20} vertical>
                        <BaseCurrency />
                        <ProductList />
                    </Flex>
                    {!productAndPricing.marketDetail?.homeMarket && <Flex justify="right" className="submit-btn">
                        <PrimaryButton loading={loading} text="更新" onClick={submit}  />
                    </Flex>}
                </div>
                {(productAndPricing.productPriceExchangeList.length > 0 || productAndPricing.skuPriceExchangeList.length > 0 )&& <Overlay status={loading} okText="更新" onExit={()=>{
                    history.push(`/settings/markets/${marketId}/${langId}`)
                }} onSubmit={submit} />}
            </Flex>}
        </Scoped>
    )
}

const Scoped = styled.div`
    .mc-layout-wrap{
        min-width: 510px;
        .mc-layout {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            .mc-header {
                color: rgb(36, 40, 51);
                margin: 8px 0px 24px;
                .mc-header-left-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }
                }
                .mc-header-left-content {
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
            .submit-btn {
                margin-top: 24px;
            }
        }
    }
`

export default observer(Index);
