import { Card, Checkbox, Divider, Flex, Form } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect, useState } from "react";
import orderReturnGoods from "@/store/order/orderReturnGoods";

function ReturnDetails() {

    useEffect(()=>{
        let count = 0
        orderReturnGoods.shippedProductGroup.forEach(item=>{
            item.product.forEach(item=>{
                count += item.num
            })
        })
        orderReturnGoods.setReturnGoodsInfo({
            ...orderReturnGoods.returnGoodsInfo,
            returnedGoodsNum:count
        })
    },[orderReturnGoods.shippedProductGroup])

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">退货明细</div>
                </Flex>
                <div>
                    {orderReturnGoods.returnGoodsInfo.returnedGoodsNum > 0 ? <Flex justify="space-between">
                        <div className="color-474F5E">退货商品数量</div>
                        <div className="color-474F5E">{orderReturnGoods.returnGoodsInfo.returnedGoodsNum}</div>
                    </Flex>:<div className="color-474F5E">未选择任何商品</div>}
                </div>
                <Divider/>
                <Form>
                    <div className="font-w-500" style={{marginBottom:"8px"}}>通知</div>
                    <div>
                        <Checkbox>给客户发送通知</Checkbox>
                    </div>
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

export default observer(ReturnDetails);