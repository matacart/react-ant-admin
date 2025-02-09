import { Button, Card, Divider, Flex, Typography } from "antd"
import styled from "styled-components"


export default function ReceivablesEntrySettings() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="color-242833 font-16 font-w-600">其他收款方式</div>
                    {/* <div><a>已有帐号？绑定</a></div> */}
                </Flex>
                <div className="payment-info">
                   <div className="payment-info-li"></div>
                   <div>系统会自动收取客户的已付款项</div>
                </div>
                <Button className="submit-btn">管理</Button>
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
        display: flex;
        align-items: center;
        .payment-info-li{
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #35c08e;
            margin-right: 6px;
        }
    }
`