import PrimaryButton from "@/components/Button/PrimaryButton"
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { getCustomRoundingRule, modifyCustomRoundingRule } from "@/services/y2/apiSaleMarket";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history, useParams } from "@umijs/max";
import { App, Flex } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"
import RuleTable from "./RuleTable";

export interface DataType {
  key: string;
  currencyCode: string;
  currencyName: string;
  roundingRule: string;
}

function PriceRounding() {

    const { langId="" } = useParams();

    const { message } = App.useApp();

    const [isSkeleton, setIsSkeleton] = useState(true);

    const [loading, setLoading] = useState(false);

    const [storeCurrencyName, setStoreCurrencyName] = useState("");

    const [currencyRoundingRules, setCurrencyRoundingRules] = useState<DataType[]>([]);

    const submit = () => {
        setLoading(true);
        modifyCustomRoundingRule({languages_id:langId, currencyRoundingRules:JSON.stringify(currencyRoundingRules)}).then((res)=>{
            message.success("成功");
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        getCustomRoundingRule({languages_id:langId}).then((res)=>{
            setCurrencyRoundingRules(res?.data?.currencyRoundingRules || []);
            setStoreCurrencyName(res?.data?.storeCurrencyName || "");
        }).catch(()=>{
        }).finally(()=>{
            setIsSkeleton(false);
        })
    },[langId])

    return (
            <Scoped>
                {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                    <div className="mc-layout">
                        <div className="mc-header">
                            <div className="mc-header-left">
                                <div className="mc-header-left-secondary" onClick={()=>{
                                    history.push(`/settings/markets/preferences/${langId}`)
                                }}>
                                    <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                </div>
                                <div className="mc-header-left-content">自定义尾数规则</div>
                            </div>
                        </div>
                        <div className='mc-layout-main'>
                            <div className='mc-layout-content'>
                                <div className="font-16 font-w-500" style={{marginBottom: "20px"}}>店铺结算货币：{storeCurrencyName}</div>
                                <RuleTable currencyRoundingRules={currencyRoundingRules} setCurrencyRoundingRules={setCurrencyRoundingRules} />
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
            &-content {
                padding: 24px;
                background-color: #fff;
                border: 1px solid #d7dbe7;
                border-radius: 10px;
            }
            .submit-btn{
                margin-top: 24px;
            }

        }
    }
`

export default PriceRounding