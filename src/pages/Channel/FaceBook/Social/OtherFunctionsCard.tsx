import DefaultButton from "@/components/Button/DefaultButton"
import { Card, Flex } from "antd"
import styled from "styled-components"

function OtherFunctionsCard() {

    return (
        <MyCard>
            <Flex justify="space-between" align="center">
                <div style={{marginRight:"20px"}}>
                    <div className="font-16 font-w-500 title">
                        消息工作台
                    </div>
                    <div className="font-14 color-474F5E desc line-h-20">聚合来自多个第三方渠道的顾客消息，支持实时回复消息、替顾客生成订单，构成新的销售场景。</div>
                </div>
                <Flex gap={12}>
                    <DefaultButton text="前往使用" />
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

export default OtherFunctionsCard