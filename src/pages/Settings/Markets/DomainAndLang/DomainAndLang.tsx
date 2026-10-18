import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history, useParams } from "@umijs/max";
import { App, Flex } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DomainCard from "./DomainCard";
import LangCard from "./LangCard";
import { getMarketConfigV2, updateMarketLanguage } from "@/services/y2/apiSaleMarket";
import domainAndLang from "@/store/settings/markets/domainAndLang";
import LangSelect from "@/components/Select/LangSelect";


const names = (list:any[])=>{
    const nameList = list.map(item => item.countryCnName || "");
    const otherNum = nameList.length - 2;
    return nameList.slice(0, 2).join("、") + (otherNum > 0 ? `和其它${otherNum}个国家` : "");
}

function DomainAndLang() {

    const { marketId="", langId="" } = useParams();

    const [isSkeleton, setIsSkeleton] = useState(true);

    const { message } = App.useApp();

    const [loading, setLoading] = useState(false);

    const submit = () => {
        setLoading(true);
        const marketLanguageList = domainAndLang.marketLanguageList.map(item=>{
            return {
                iso:item.iso,
                defaultLanguage:item.defaultLanguage,
            };
        });
        updateMarketLanguage({
            languages_id:langId,
            marketId:marketId,
            configType:domainAndLang.otherInfo.configType.toString(),
            configValue:domainAndLang.otherInfo.configValue,
            marketLanguageList:JSON.stringify(marketLanguageList),
        }).then(()=>{
            message.success("成功");
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(() => {
        getMarketConfigV2({
            languages_id:langId,
            marketId:marketId,
        }).then(res=>{
            const { marketLanguageList,...otherInfo } = res.data || {};
            domainAndLang.setMarketLanguageList(marketLanguageList || []);
            domainAndLang.setOtherInfo(otherInfo);
        }).catch(()=>{
        }).finally(()=>{
            setIsSkeleton(false);
        })
        return ()=>{
            domainAndLang.reset();
        }
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
                                    <div className="font-20 font-w-500">{"域名和语言"}</div>
                                    <div style={{marginTop:"4px"}} className="font-12 font-w-400">{names(domainAndLang.otherInfo?.countryInfoList || [])}</div>
                                </div>
                            </Flex>
                            <Flex align="center">
                                <LangSelect lang={langId} setLang={(lang:string)=>history.push(`/settings/markets/domainAndLang/${marketId}/${lang}`)} />    
                            </Flex>
                        </Flex>
                        {/* 主要内容 */}
                        <Flex gap={20} vertical>
                            <DomainCard />
                            <LangCard />
                        </Flex>
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

export default DomainAndLang;