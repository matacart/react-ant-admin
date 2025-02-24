import { Button, Card, Divider, Flex } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"

export default function AccountReview() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="pay-account">MataCart Payments</div>
                </Flex>
                <Flex className="desc">
                    <div style={{marginRight:"8px"}}><img src="/icons/countdown.svg" /></div>
                    <div className="color-474F5E font-16">您的资料预计会在5-7个工作日内完成审核，审核通过后即可收款</div>
                </Flex>
                <Flex style={{marginTop:"12px"}}>
                    <div style={{marginRight:"8px"}}><img src="/icons/examine.svg" /></div>
                    <div className="color-474F5E font-16 font-w-600">审核期间请保持店铺设置符合政策要求， <a className="font-w-500">查看要求</a></div>
                </Flex>
                
                <Flex className="btn-box">
                    <Button className="btn" onClick={() => history.push("/settings/payments/mcpayment")}>查看资料</Button>
                    <Button style={{marginLeft:"16px"}} className="btn" onClick={() => history.push("/settings/payments/mcpayment")}>注销账户</Button>
                </Flex>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    .pay-account{
        font-size: 20px;
        font-weight: 300;
    }
    .desc{
        margin-top: 16px;
    }
    .btn-box{
        margin-top: 20px;
        .btn{
            height: 36px;
        }
    }
`