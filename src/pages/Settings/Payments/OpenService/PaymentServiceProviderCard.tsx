import SuccessTag from "@/components/Tag/SuccessTag";
import { Card, Flex, Space, Table, TableProps } from "antd";
import styled from "styled-components";


function PaymentServiceProviderCard(){

    return (
        <Scoped>
            <Card>
                <Flex className="font-20 color-242833 font-w-600 title">
                    <div>MataCart 合作支付服务商</div>
                    <div style={{position:"relative",top:"-4px",left:"8px"}}><SuccessTag text="限时免收开户费" /></div>
                </Flex>
                <div className="color-7A8499 desc">支持中国大陆主体申请开通。</div>
                <div className="registration-method-box">
                    <div className="registration-method-item">
                        <Flex justify="space-between">
                            <div>
                                <img style={{height:"20px"}} src="https://cdn.myshopline.com/pay/fe-prod/kyc3/assets/AsiaBill-BkpkxXJf.webp" />
                            </div>
                            <div><a>了解更多</a></div>
                        </Flex>
                        <div style={{padding:"8px"}} className="color-7A8499">支持多币种信用卡收单，支持多国家本地支付</div>
                    </div>
                    <div className="registration-method-item">
                        <Flex justify="space-between">
                            <div>
                                <img style={{height:"20px"}} src="https://cdn.myshopline.com/pay/fe-prod/kyc3/assets/UseePay-L3-OpN3F.webp" />
                            </div>
                            <div><a>了解更多</a></div>
                        </Flex>
                        <div style={{padding:"8px"}} className="color-7A8499">支持多币种信用卡收单，支持多国家本地支付</div>
                    </div>
                </div>
            </Card>
        </Scoped>
    )
}

export default PaymentServiceProviderCard;

const Scoped = styled.div`
    margin-bottom: 20px;
    .title{
        margin-bottom: 10px;
        vertical-align: top;
    }
    .desc{
        margin-bottom: 12px;
    }
    .registration-method-box{
        
        display: flex;
        gap: 12px;
        .registration-method-item{
            flex: 1;
            border: 1px solid rgb(215 219 231);
            border-radius: 4px;
            padding: 20px;
        }
    }
`