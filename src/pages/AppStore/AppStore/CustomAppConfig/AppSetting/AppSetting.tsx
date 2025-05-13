import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Divider, Flex } from "antd";
import styled from "styled-components";
import BaseInfoSettingCard from "./BaseInfoSettingCard";
import EmbeddedPOSCard from "./EmbeddedPOSCard";
import AppIconCard from "./AppIconCard";
import SecuritySettingsCard from "./SecuritySettingsCard";
import AppContactCard from "./AppContactCard";
import SalesChannelCard from "./SalesChannelCard";
import GDPRWebhookCard from "./GDPRWebhookCard";
import AppAgentCard from "./AppAgentCard";
import PrimaryButton from "@/components/Button/PrimaryButton";

function AppSetting(){

    const upDateApp = ()=>{
        // creatAppStore
    }

    return(
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.go(-1)
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">应用设置</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <Flex className='mc-layout-content'>
                            <BaseInfoSettingCard />
                            {/* <LicensesAndTerms /> */}
                            <EmbeddedPOSCard />
                            <AppIconCard />
                            <SecuritySettingsCard />
                            <AppContactCard />
                            <SalesChannelCard />
                            <GDPRWebhookCard />
                            <AppAgentCard />
                        </Flex>
                    </div>
                    <Divider />
                    <Flex justify="flex-end">
                        <PrimaryButton onClick={upDateApp} text="保存" />
                    </Flex>
                </div>
            </div>
        </Scoped>
    )
}

export default AppSetting;

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
                        display: flex;
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
                .card{
                    padding: 0;
                }
                .divider{
                    margin:0px;
                }
                .item:hover{
                    background-color: #f0f7ff;
                }
                .tips{
                    border: 1px solid rgba(53, 109, 255, .2);
                    background-color: #e2f0ff;
                    padding: 16px 16px;
                    border-radius: 4px;
                }

            }
            &-extra {
                flex:1;
                min-width: 285px;
                display: flex;
                flex-direction: column;
                gap:20px;
                .ant {
                    &-card {
                        background-color: #f7f8fb;
                    }
                }
            }
        }
    }
`