import DefaultButton from "@/components/Button/DefaultButton"
import { Card, Flex, Form, Modal, Tooltip } from "antd"
import styled from "styled-components"

function OneNotificationCard() {

    return (
        <MyCard>
            <Flex justify="space-between" align="center">
                <div style={{marginRight:"20px"}}>
                    <div className="font-16 font-w-500 title">
                        一次性通知
                    </div>
                    <div className="font-14 color-474F5E desc line-h-20">通过Messenger发送通知请求，若顾客同意则粉丝主页可在24小时发送限制外，于1年内向顾客推送一条消息。开启后，您可前往直播中心的广播使用。</div>
                </div>
                <Flex gap={12}>
                    <DefaultButton text="查看开通方式" />
                </Flex>
            </Flex>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .title{
        margin-bottom: 8px;
    }
`

export default OneNotificationCard
