import { Card, Divider, Flex } from "antd"
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
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/VISA.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/VISA.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/VISA.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/VISA.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/VISA.svg" />
                    <img src="https://cdn.myshopline.com/pay/fe-prod/kyc/payment-method/VISA.svg" />
                </div>
                <Flex className="payment-info">
                    <div>
                        <div>信用卡手续费</div>
                        <div>低至2.4%+0.25 USD</div>
                    </div>
                    <Divider type="vertical" />
                    <div>
                        <div>信用卡手续费</div>
                        <div>低至2.4%+0.25 USD</div>
                    </div>
                    <Divider type="vertical" />
                    <div>
                        <div>信用卡手续费</div>
                        <div>低至2.4%+0.25 USD</div>
                    </div>
                </Flex>
                CollectionAccountCard
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
        background-color: rgb(243 244 246);
        div{
            flex:1;
        }
    }
`