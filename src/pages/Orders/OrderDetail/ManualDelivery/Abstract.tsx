import { Card, Checkbox, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import orderManualDelivery from "@/store/order/orderManualDelivery";
import { FulfillmentItemType } from "@/store/order/order";

function Abstract({form}:{form:any}){

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">摘要</div>
                </Flex>
                <Flex style={{marginBottom:"8px"}} justify="space-between" align="center">
                    <div className="font-w-500">商品数量</div>
                    <div>{orderManualDelivery.fulfillmentItem.fulfillmentItemList.reduce((pre:number,cur:FulfillmentItemType)=>Number(pre)+Number(cur.productModifyNum),0)}/{orderManualDelivery.fulfillmentItem.fulfillmentItemList.reduce((pre:number,cur:FulfillmentItemType)=>Number(pre)+Number(cur.productNum),0)}</div>
                </Flex>
                <Divider />
                <Form form={form} layout="vertical">
                    <Form.Item label="通知" name="sendNotify" valuePropName="checked" style={{marginBottom:"0"}}>
                        <Checkbox>向客户发送通知</Checkbox>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    
`

export default observer(Abstract);