import DefaultButton from "@/components/Button/DefaultButton";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { getMarketDetail, modifyMarketStatus } from "@/services/y2/apiSaleMarket";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history, useParams } from "@umijs/max"
import { App, Divider, Flex, Switch } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MarketsConfig from "./MarketsConfig";
import MarketData from "./MarketData";
import marketsInfo from "@/store/settings/markets/marketsInfo";
import DomainConfig from "./DomainConfig";
import MarketsPreview from "./MarketsPreview";
import MarketsEdit from "./MarketsEdit";
import MarketDelete from "./MarketDelete";
import { observer } from "mobx-react-lite";
import { names } from "../Index/MarketsList";

function Detail() {

    const {marketId="", langId=""} = useParams();

    const { message } = App.useApp();

    const [isSkeleton, setIsSkeleton] = useState(true);

    const [active, setActive] = useState(true);

    const [switchLoading, setSwitchLoading] = useState(false);

    // 更新市场状态
    const setMarketStatus = (status: boolean) => {
        setSwitchLoading(true);
        modifyMarketStatus({
            languages_id:langId,
            marketId:marketId,
            visible:status,
        }).then(()=>{
            setActive(status);
            message.success("成功");
        }).catch(()=>{
        }).finally(()=>{
            setSwitchLoading(false);
        })
    }

    useEffect(() => {
        getMarketDetail({
            market_id:marketId,
            languages_id:langId,
        }).then(res => {
            marketsInfo.setMarketsInfo(res.data);
            marketsInfo.setLanguagesId(langId);
            setActive(res.data.active);
        }).catch(()=>{
        }).finally(()=>{
            setIsSkeleton(false);
        })
    }, [marketsInfo.refreshKey])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<Flex className='mc-layout-wrap' align="center">
                <div className="mc-layout">
                    <Flex className="mc-header" justify="space-between">
                        <Flex className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>history.push("/settings/markets")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div style={{marginLeft:"12px"}}>
                                <div className="font-20 font-w-500">{marketsInfo.marketsInfo.marketName || "市场"}</div>
                                <div style={{marginTop:"4px"}} className="font-12 font-w-400">{names(marketsInfo.marketsInfo?.countryList || [])}</div>
                            </div>
                        </Flex>
                        <Flex gap={12} align="center">
                            {!marketsInfo.marketsInfo.homeMarket && <>
                                <Switch loading={switchLoading} checked={active} onChange={(checked)=>setMarketStatus(checked)} />
                                {active ? <span className="font-14 font-w-400">已启用</span> : <span className="font-14 font-w-400">已禁用</span>}
                                <Divider type="vertical" />
                            </>}
                            {marketsInfo.marketsInfo.homeMarket ? <MarketsEdit /> : <DefaultButton text="编辑" onClick={()=>history.push(`/settings/markets/edit/${marketId}/${langId}`)} />}
                            <MarketsPreview />
                        </Flex>
                    </Flex>
                    {/* 主要内容 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <MarketsConfig />
                            <DomainConfig />
                        </div>
                        <div className='mc-layout-extra'>
                            <MarketData />
                        </div>
                    </div>
                    {!marketsInfo.marketsInfo.homeMarket && <Flex className="submit-btn">
                        <MarketDelete marketId={marketId} langId={langId} />
                    </Flex>}
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
            margin: '0 auto';
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
            &-main {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 20px;
            }
            &-content {
                flex: 9;
                min-width: 510px;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            &-extra {
                flex: 1;
                min-width: 285px;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            .submit-btn {
                margin-top: 24px;
            }
        }
    }
`

export default observer(Detail);
