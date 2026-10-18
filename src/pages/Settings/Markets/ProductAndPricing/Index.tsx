import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history, useParams } from "@umijs/max";
import { App, Flex } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMarketDetail, getMarketPriceRule, getMarketProductList } from "@/services/y2/apiSaleMarket";
import { observer } from "mobx-react-lite";
import BaseCurrency from "./BaseCurrency";
import productAndPricing from "@/store/settings/markets/productAndPricing";
import ProductList from "./ProductList";
import LangSelect from "@/components/Select/LangSelect";
import { names } from "../Index/MarketsList";

function Index() {

    const { marketId="", langId="" } = useParams();

    const [isSkeleton, setIsSkeleton] = useState(true);

    const { message } = App.useApp();

    const [loading, setLoading] = useState(false);

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
                    </div>
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
