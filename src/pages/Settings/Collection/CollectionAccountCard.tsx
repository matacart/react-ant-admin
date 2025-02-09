import { Button, Card, Divider, Flex } from "antd"
import styled from "styled-components"

export default function CollectionAccountCard() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="pay-account">MataCart Payments</div>
                    <div><a>已有帐号？绑定</a></div>
                </Flex>
                <div className="img-box">
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/VISA.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/Master%20Card.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/American%20Express.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/Diners%20club.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/Discover.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/UnionPay%20International.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/GooglePay.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/ApplePay.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/Paynow.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/GrabPay.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/AlipayQR.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/WechatPay.svg" />
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
                <Button type="primary">开通MataCart Payments</Button>
                
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    .pay-account{
        font-size: 20px;
        font-weight: 300;
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