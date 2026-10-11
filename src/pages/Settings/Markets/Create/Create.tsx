import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history, useParams } from "@umijs/max";
import { App, Flex } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import markets from "@/store/settings/markets/markets";
import LangSelect from "@/components/Select/LangSelect";
import { observer } from "mobx-react-lite";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { modifyMarketCountry } from "@/services/y2/apiSaleMarket";
import MarketsCountry from "../Markets/MarketsCountry";

function Create() {

    const [isSkeleton, setIsSkeleton] = useState(true);

    const { message } = App.useApp();

    const [loading, setLoading] = useState(false);

    const submit = () => {
        if(!markets.marketName){
            message.error("市场名称不能为空");
            return;
        }
        setLoading(true);
        const countryCodeList = markets.countryList.map(item => item.countryCode || "");
        modifyMarketCountry({
            languages_id:markets.languagesId || "",
            marketId:markets.marketId || "",
            marketName:markets.marketName || "",
            countryCodeList:JSON.stringify(countryCodeList),
        }).then(()=>{
            message.success("成功");
            history.push("/settings/markets");
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(() => {
        setIsSkeleton(false);
        return ()=>{
            markets.reset();
        }
    }, [])

    return (
            <Scoped>
                {isSkeleton?<SkeletonCard />:<Flex className='mc-layout-wrap' align="center">
                    <div className="mc-layout">
                        <div className="mc-header">
                            <Flex className="mc-header-left">
                                <div className="mc-header-left-secondary" onClick={()=>history.push("/settings/markets")}>
                                    <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                </div>
                                <div className="mc-header-left-content">{"创建市场"}</div>
                            </Flex>
                            <Flex gap={12}>
                                <LangSelect lang={markets.languagesId} setLang={(lang:string)=>markets.setLanguagesId(lang)} />    
                            </Flex>
                        </div>
                        {/* 主要内容 */}
                        <div>
                            <MarketsCountry />
                        </div>
                        <Flex justify="right" className="submit-btn">
                            <PrimaryButton loading={loading} text="更新" onClick={submit}  />
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

export default observer(Create);