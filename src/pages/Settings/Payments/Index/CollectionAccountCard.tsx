import { Card, Divider, Flex } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import PrimaryButton from "@/components/Button/PrimaryButton"

export default function CollectionAccountCard() {
    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="pay-account">MataCart Payments</div>
                    <div><a>已有帐号？绑定</a></div>
                </Flex>
                <div className="img-box">
                    <img src="/icons/payment/VISA.svg" />
                    <img src="/icons/payment/MasterCard.svg" />
                    <img src="/icons/payment/AmericanExpress.svg" />
                    <img src="/icons/payment/Dinersclub.svg" />
                    <img src="/icons/payment/Discover.svg" />
                    <img src="/icons/payment/UnionPay.svg" />
                    <img src="/icons/payment/GooglePay.svg" />
                    <img src="/icons/payment/ApplePay.svg" />
                    <img src="/icons/payment/Paynow.svg" />
                    <img src="/icons/payment/GrabPay.svg" />
                    <img src="/icons/payment/AlipayQR.svg" />
                    <img src="/icons/payment/WechatPay.svg" />
                </div>
                <Flex className="payment-info">
                    <div>
                        <div>信用卡手续费</div>
                        <div>低至2.4%+0.25 USD</div>
                    </div>
                    <div className="divider">
                        <Divider type="vertical" style={{height:"100%"}} />
                    </div>
                    <div>
                        <div>交易佣金</div>
                        <div>0%</div>
                    </div>
                    <div className="divider">
                        <Divider type="vertical" style={{height:"100%"}} />
                    </div>
                    <div>
                        <div>全球收款</div>
                        <div>支持国际主流币种</div>
                    </div>
                </Flex>
                <PrimaryButton text="开通MataCart Payments" onClick={() => history.push("/settings/payments/mcpayment")} />
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    .pay-account{
        font-size: 20px;
        font-weight: 500;
    }
    .img-box{
        margin: 16px 0;
        img{
            width: 38px;
            margin-right: 6px;
        }
    }
    .payment-info{
        padding:12px;
        margin-bottom: 16px;
        background-color: rgb(243 244 246);
        div{
            flex:1;
        }
        .divider{
            flex: 0;
            text-align: right;
            padding-right: 20px;
        }
    }
`