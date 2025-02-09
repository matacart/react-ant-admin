import { Button, Card, Divider, Flex, Typography } from "antd"
import styled from "styled-components"

const { Text, Link } = Typography;

export default function CreditCardCollection() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="color-242833 font-16 font-w-600">信用卡/借记卡收款</div>
                    {/* <div><a>已有帐号？绑定</a></div> */}
                </Flex>
                <div className="desc color-474F5E font-14">客户在结账页便可完成支付流程。 <Text underline className="color-7A8499">查看示例</Text></div>
                {/* <Flex className="payment-info">
                </Flex> */}
                <Button className="submit-btn">选择服务商</Button>
                
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    .desc{
        margin-top: 4px;
    }
    .submit-btn{
        margin-top: 16px;
    }
    .payment-info{
        padding:12px;
        margin-bottom: 16px;
        background-color: rgb(243 244 246);
        div{
            flex:1;
        }
    }
`