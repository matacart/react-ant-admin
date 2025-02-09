import DefaultTag from "@/components/Tag/DefaultTag";
import { Button, Card, Divider, Flex, Typography } from "antd"
import styled from "styled-components"

const { Text, Link } = Typography;

export default function ManualCollection() {

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="color-242833 font-16 font-w-600">手动收款方式</div>
                    {/* <div><a>已有帐号？绑定</a></div> */}
                </Flex>
                <div className="desc color-474F5E font-14">如果客户通过此方式付款，您需要手动将订单标记为已付款。 <Text underline className="color-7A8499">查看示例</Text></div>
                <div className="payment-info">
                    <Flex align="center">
                        <div style={{marginRight:"8px"}}>货到付款</div>
                        <DefaultTag text="未启用" />
                    </Flex>
                    <Flex align="center" className="color-356DFF">启用</Flex>
                </div>
                <Button className="submit-btn">添加</Button>
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
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        border: 1px solid #eef1f6;
        border-radius: 6px;
        padding:20px 24px;
        /* margin-bottom: 16px; */
        /* background-color: rgb(243 244 246); */
    }
    .payment-info:hover{
        background-color: #f0f7ff;
        cursor: pointer;
    }
`