import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history, useParams } from "@umijs/max";
import { App, Flex } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMarketDetail, getMarketPayment, getMarketPriceRule, getMarketProductList } from "@/services/y2/apiSaleMarket";
import { observer } from "mobx-react-lite";
import LangSelect from "@/components/Select/LangSelect";



function Index() {

    const { marketId="", langId="" } = useParams();

    const [isSkeleton, setIsSkeleton] = useState(true);

    const { message } = App.useApp();

    const [loading, setLoading] = useState(false);

    // 初始化数据
    useEffect(() => {
        getMarketPayment({
            languages_id:langId,
            marketId,
        }).then((res)=>{
            console.log(res);
        }).catch(()=>{
        }).finally(()=>{
            setIsSkeleton(false);
        })
    }, [])

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
                                    <div className="font-20">{"支付"}</div>
                                    <div style={{marginTop:"4px"}} className="font-12 font-w-400">管理市场下各个国家/地区可使用的支付方式及支付货币。如需添加更多支付方式，可前往<a onClick={()=>history.push("/settings/payments")}>收款设置</a>。</div>
                                </div>
                            </Flex>
                            <Flex gap={12} align="flex-start">
                                <LangSelect lang={langId} setLang={(lang:string)=>history.push(`/settings/markets/payments/${marketId}/${lang}`)} />    
                            </Flex>
                        </Flex>
                        {/* 主要内容 */}
                        <Flex gap={20} vertical>
                            
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
                font-weight: bold;
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
            }
            .submit-btn {
                margin-top: 24px;
            }
        }
    }
`

export default observer(Index);
