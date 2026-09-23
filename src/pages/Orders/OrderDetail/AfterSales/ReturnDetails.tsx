import { Card, Checkbox, Divider, Flex, Form } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect } from "react";
import orderAfterSales from "@/store/order/orderAfterSales";

function ReturnDetails({form}:{form:any}) {

    useEffect(() =>{
        const count = orderAfterSales.ordersPackageList.flatMap(pkg => pkg.itemGroupList ?? []).filter(group => group.requireShipping === true).flatMap(group => group.itemList ?? []).reduce((sum, item) => sum + (Number(item.productModifyNum) || 0), 0);
        orderAfterSales.setReturnedProductNum(count) 
    },[orderAfterSales.ordersPackageList]);

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500">退货明细</div>
                </Flex>
                <div>
                    {orderAfterSales.returnedProductNum > 0 ? <Flex justify="space-between">
                        <div className="color-474F5E">退货商品数量</div>
                        <div className="color-474F5E">{orderAfterSales.returnedProductNum}</div>
                    </Flex>:<div className="color-474F5E">未选择任何商品</div>}
                </div>
                <Divider/>
                <Form form={form} layout="vertical">
                    <Form.Item label={<div className="font-w-500">通知</div>} name="sendEmail" valuePropName="checked" style={{marginBottom:"0px"}}>
                        <Checkbox>给客户发送通知</Checkbox>
                    </Form.Item>
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