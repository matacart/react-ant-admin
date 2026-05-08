import PrimaryButton from "@/components/Button/PrimaryButton";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { Card, Flex } from "antd";
import styled from "styled-components";

function DomainVerificationCard() {
  return (
    <MyCard>
        <Flex justify="space-between" align="center">
            <div>
                <Flex gap={4} align="center" className="title font-16 font-w-500" style={{height:"28px"}}>
                    <div>网域验证</div>
                    <Flex className="more" gap={4}>
                        <QuestionCircleOutlined />
                        <span className="more-text font-12 color-474F5E">了解详情</span>
                    </Flex>
                </Flex>
                <div className="color-474F5E">用于绑定 Google 广告追踪工具与提升验证可信度</div>
            </div>
            <PrimaryButton text="立即验证" onClick={()=>history.push(`/channels/google/google-domain`)} />
        </Flex>
    </MyCard>
  )
}

const MyCard = styled(Card)`
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
`;


export default DomainVerificationCard;