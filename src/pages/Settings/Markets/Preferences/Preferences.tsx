import { ArrowLeftOutlined } from "@ant-design/icons"
import { App, Flex } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { history, useParams } from "@umijs/max";
import { observer } from "mobx-react-lite";
import { getMarketPreference, modifyMarketPreference } from "@/services/y2/apiSaleMarket";
import DomainCard from "./DomainCard";
import CurrencyCard from "./CurrencyCard";
import CheckoutCard from "./CheckoutCard";
import PrimaryButton from "@/components/Button/PrimaryButton";


export interface MarketPreferenceType {
    enableSettleSwitchMarket:boolean,
    isInstalledRedirectApp:boolean,
    priceRounding:boolean,
    redirect:boolean
}

function Preferences() {

    const { message } = App.useApp();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const { langId="" } = useParams();

    const [loading,setLoading] = useState(false);

    const [marketPreference,setMarketPreference] = useState<MarketPreferenceType>({
        enableSettleSwitchMarket:false,
        isInstalledRedirectApp:false,
        priceRounding:false,
        redirect:false,
    });

    const submit = ()=>{
        setLoading(true);
        modifyMarketPreference({
            languages_id:langId,
            ...marketPreference,
        }).then((res)=>{
            message.success("更新成功");
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        getMarketPreference({
            languages_id:langId,
        }).then(res=>{
            setMarketPreference(res.data);
        }).catch(()=>{
        }).finally(()=>{
            setIsSkeleton(false);
        })
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/markets")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">偏好设置</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <CheckoutCard marketPreference={marketPreference} setMarketPreference={setMarketPreference} />
                            <DomainCard marketPreference={marketPreference} setMarketPreference={setMarketPreference} />
                            <CurrencyCard marketPreference={marketPreference} setMarketPreference={setMarketPreference} />
                        </div>
                    </div>
                    <Flex justify="right" className="submit-btn">
                        <PrimaryButton loading={loading} text="更新" onClick={submit}  />
                    </Flex>
                </div>
            </div>}
        </Scoped>
    )
}

export default observer(Preferences)

const Scoped = styled.div`

.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-secondary {
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
                &-content {
                    margin-left: 12px;
                    font-size: 20px;
                }
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
            gap:20px;
        }

        .submit-btn{
            margin-top: 24px;
        }

    }
}
`