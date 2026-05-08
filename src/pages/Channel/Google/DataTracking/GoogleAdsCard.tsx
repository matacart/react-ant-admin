import DefaultButton from "@/components/Button/DefaultButton";
import { Card, Divider, Flex } from "antd";
import styled from "styled-components"

function GoogleAdsCard() {
    return (
        <MyCard>
            <div>
                <div className="font-16 font-w-600">Google Ads</div>
                <div className="font-w-400 desc">根据您添加的事件追踪从广告进入网店后的客户行为数据。</div>
            </div>
            <Divider />
            <Flex justify="space-between">
                <div>
                    <div className="font-16 font-w-600">客户端</div>
                    <div className="font-w-400 desc">客户端上报通过用户的浏览器直接将数据发送至 Google，适用于用户在浏览器中的操作，例如点击、浏览或转化行为。可实时追踪用户行为。</div>
                </div>
                <DefaultButton text="添加" />
            </Flex>
            <Divider />
            <Flex justify="space-between">
                <div>
                    <div className="font-16 font-w-600">服务端</div>
                    <div className="font-w-400 desc">服务端上报通过商家服务器将数据发送至 Google，即使用户设备或浏览器限制了数据上报，关键事件数据仍能通过服务端追踪。适用于确保数据完整性的场景</div>
                </div>
                <DefaultButton text="添加" />
            </Flex>
        </MyCard>
    )
}


const MyCard = styled(Card)`
    .desc{
        margin-top: 4px;
    }
    
`

export default GoogleAdsCard;
