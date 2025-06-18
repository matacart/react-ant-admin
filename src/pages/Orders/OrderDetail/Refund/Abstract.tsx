import { Badge, Button, Card, Checkbox, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import orderReturnGoods from "@/store/order/orderReturnGoods";
import orderRefund from "@/store/order/orderRefund";

function Abstract() {

    const [num,setNum] =  useState(0)

    useMemo(()=>{
        let newNum = 0
        orderRefund.refundProducts.forEach((item:any)=>{
            newNum += item.refundQuantity
        })
        setNum(newNum)
    },[orderRefund.refundProducts])

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">摘要</div>
                </Flex>
                <Flex vertical gap={12}>
                    <div className="color-474F5E font-w-500">
                        <Flex className="color-474F5E font-w-500" justify="space-between">
                            <div>商品小计</div>
                            <div>US${orderRefund.refundAmount.toFixed(4)}</div>
                        </Flex>
                        <div className="font-12 color-62708D">{num}件商品</div>
                    </div>
                    <Flex className="color-474F5E font-w-500" justify="space-between">
                        <div>折扣</div>
                        <div>US$1,000.00</div>
                    </Flex>
                    <Flex className="color-474F5E font-w-500" justify="space-between">
                        <div>税费</div>
                        <div>US$1,000.00</div>
                    </Flex>
                    <Flex className="color-474F5E font-w-500" justify="space-between">
                        <div>运费</div>
                        <div>US$1,000.00</div>
                    </Flex>
                </Flex>
                <Divider/>
                <Form>
                    <Flex className="color-474F5E font-w-500" justify="space-between">
                        <div>退款总额</div>
                        <div>US$1,000.00</div>
                    </Flex>
                </Form>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
`

export default observer(Abstract);