import { Card, Checkbox, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import orderDelivery from "@/store/order/orderDelivery";

function Abstract() {

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">摘要</div>
                </Flex>
                <Form>
                    <>
                        <Flex style={{marginBottom:"8px"}} justify="space-between" align="center">
                            <div className="font-w-500">商品数量</div>
                            <div>1/{123213}</div>
                        </Flex>
                    </>
                </Form>
                <Divider/>
                <Form>
                    <div className="font-w-500" style={{marginBottom:"8px"}}>通知</div>
                    <Checkbox onChange={(e)=>{
                        orderDelivery.setDelivery({
                            ...orderDelivery.delivery,
                            customerNotified:e.target.checked?"1":"0"
                        })
                    }}>向客户发送通知</Checkbox>
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