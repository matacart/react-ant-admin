import PrimaryButton from "@/components/Button/PrimaryButton"
import DefaultTag from "@/components/Tag/DefaultTag"
import { Card, Flex, Form, Modal, Tooltip } from "antd"
import styled from "styled-components"

function SocialReportingCard() {

    return (
        <MyCard>
            <Flex justify="space-between" align="center">
                <div style={{marginRight:"20px"}}>
                    <div className="font-16 font-w-500 title">
                        通过 Offline Conversions API 上报线下转化
                    </div>
                    <div className="font-14 color-474F5E desc line-h-20">授权开启后，会将客户在直播销售、贴文销售、消息中心的转化行为同步到Meta，方便追踪成效分析并持续优化Meta的广告表现。</div>
                    <Flex gap={12} justify="space-between" className="authorization">
                        <Flex className="font-w-500" align="center" gap={12}>
                            <div>Messaging Event API</div>
                            <DefaultTag text="未授权" />
                        </Flex>
                        <PrimaryButton text="授权" />
                    </Flex>
                </div>
            </Flex>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .title{
        margin-bottom: 8px;
    }
    .authorization{
        margin-top: 20px;
    }
`


export default SocialReportingCard