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
            getMarketProductList({
                languages_id:langId,
                marketId:marketId,
            }),
        ]).then(([marketDetail,priceRule,productList])=>{
            priceRule.status == "fulfilled" && productAndPricing.setPriceRule(priceRule.value.data);
        }).catch(()=>{}).finally(()=>{
            setIsSkeleton(false);
        })
        return ()=>{
            // domainAndLang.reset();
        }
    }, [])

    return (
            <Scoped>
                {isSkeleton?<SkeletonCard />:<Flex className='mc-layout-wrap' align="center">
                    <div className="mc-layout">
                        <div className="mc-header">
                            <Flex className="mc-header-left">
                                <div className="mc-header-left-secondary" onClick={()=>history.push(`/settings/markets/${marketId}/${langId}`)}>
                                    <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                </div>
                                <div className="mc-header-left-content">{"商品与定价"}</div>
                            </Flex>
                            {/* <Flex gap={12}>
                                <LangSelect lang={markets.languagesId} setLang={(lang:string)=>markets.setLanguagesId(lang)} />    
                            </Flex> */}
                        </div>
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
                font-size: 30px;
                height: 42px;
                font-weight: bold;
                margin: 8px 0px 24px;
                display: flex;
                justify-content: space-between;
                align-content: center;
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
