import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { Card, Flex } from "antd";
import styled from "styled-components";

function DataTrackingCard() {
    return (
        <MyCard
            styles={{
                body: {
                    padding: 0,
                }
            }}
        >
            <div className="header">
                <Flex justify="space-between" align="center">
                    <div>
                        <Flex gap={4} align="center" className="title font-16 font-w-500" style={{height:"28px"}}>
                            <div>数据追踪</div>
                            <Flex className="more" gap={4}>
                                <QuestionCircleOutlined />
                                <span className="more-text font-12 color-474F5E">了解详情</span>
                            </Flex>
                        </Flex>
                        {/* channels/google/google-domain */}
                        <div className="color-474F5E">您可以一站式完成下列数据追踪工具的代码绑定，这有助于您获取和查看客户在网店中的行为数据，也能帮助 Google 更全面准确地评估和优化广告效果。</div>
                    </div>
                    <PrimaryButton style={{marginLeft:"24px"}} text="立即使用" onClick={()=>history.push("/channels/google/google-data-tracking")} />
                </Flex>
            </div>
            <div className="unsetOuter">
                <Flex className="list-item" vertical gap={12}>
                    <div>您还可以绑定以下数据追踪工具：</div>
                    <Flex gap={6} align="center">
                        <img style={{width:"20px",height:"20px"}} src="/icons/commons/googleAds.svg" alt="" />
                        <span>Google Ads</span>
                    </Flex>
                    <Flex gap={6} align="center">
                        <img style={{width:"20px",height:"20px"}} src="/icons/commons/googleResale.svg" alt="" />
                        <span>Google 再营销</span>
                    </Flex>
                    <Flex gap={6} align="center">
                        <img style={{width:"20px",height:"20px"}} src="/icons/commons/googleAnalytics.svg" alt="" />
                        <span>Google Analytics</span>
                    </Flex>
                    <Flex gap={6} align="center">
                        <img style={{width:"20px",height:"20px"}} src="/icons/commons/googleTagManager.svg" alt="" />
                        <span>Google 跟踪代码管理器</span>
                    </Flex>
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
        .more{
            cursor: pointer;
            &-text{
                display: none;
            }
            &:hover{
                .more-text{
                    display: inline;
                }
                padding: 4px 8px;
                border-radius: 12px;
                background-color: #fff;
                -webkit-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
                box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
            }
        }
    }
    .unsetOuter{
        padding: 24px;
        /* border-top: 1px solid #eef1f6; */
        background-color: #f7f8fb;
    }
    
`;

export default DataTrackingCard;
