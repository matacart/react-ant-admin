import MyAlert from "@/components/Alert/MyAlert"
import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton"
import MyInput from "@/components/Input/MyInput"
import DefaultSelect from "@/components/Select/DefaultSelect"
import MySelect from "@/components/Select/MySelect"
import DefaultTag from "@/components/Tag/DefaultTag"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Flex, Form, Modal, Tooltip } from "antd"
import { useState } from "react"
import styled from "styled-components"

function OfflineReportingCard() {

    return (
        <MyCard>
            <Flex justify="space-between" align="center">
                <div style={{marginRight:"20px"}}>
                    <div className="font-16 font-w-500 title">
                        通过 Offline Conversions API 上报线下转化
                    </div>
                    <div className="font-14 color-474F5E desc line-h-20">通过 MBE 授权数据集权限后将为您上报成单事件到 Meta。东八区每天凌晨 1 点上报前一天全部 POS 成单的线下订单。您可以选择和【website上报】一样的 Pixel ID 作为数据集 ID。</div>
                    <Flex gap={12} justify="space-between" className="authorization">
                        <Flex className="font-w-500" align="center" gap={12}>
                            <div>Offline Conversions API</div>
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


export default OfflineReportingCard