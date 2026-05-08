import DefaultButton from "@/components/Button/DefaultButton";
import { Card, Flex } from "antd";
import styled from "styled-components";

function AdsCard() {
    return (
        <MyCard 
            styles={{
                body: {
                    padding: 0,
                }
            }}
        >
            <div className="header">
                <div className="font-16 font-w-500 title">广告投放</div>
                <div className="color-474F5E">借助 Google 广告扩大客户群，轻松完成 账户开通、投放配置、效果跟踪、财务对账 等业务操作。</div>
            </div>

            <div className="util-list">
                <Flex className="util-item" justify="space-between" align="center">
                    <Flex align="center" gap={12}>
                        <div>
                            <img style={{width:"32px",height:"32px"}} src="/img/google-ads.svg" alt="" />
                        </div>
                        <div>
                            <div className="font-w-500" style={{marginBottom:"4px"}}>Google 原生广告工具</div>
                            <div className="color-474F5E">Google 原生的专业投放工具，简化运营操作。</div>
                        </div>
                    </Flex>
                    <DefaultButton text="立即使用" onClick={()=>window.open(`https://ads.google.com/aw/campaigns`)} />
                </Flex>
            </div>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .header{
        padding: 24px;
        .title{
            margin-bottom: 8px;
        }
    }
    
    .util-list{
        border-top: 1px solid #eef1f6;
        padding: 24px;
    }
`;

export default AdsCard;