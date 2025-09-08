import { Button, Card, Form, Input } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import baseInfoStore from "@/store/setUp/baseInfoStore"
import { observer } from "mobx-react-lite";


function OrderSetUpCard() {

    useEffect(()=>{
    },[])

    return (
        <Scoped>
            <Card style={{marginBottom:"20px"}}>
                <Form layout={"vertical"}>
                    <Form.Item
                        label="订单编号前缀"
                        >
                        <div style={{marginBottom:"14px"}}>默认情况下，订单号从1001开始。你可以添加前缀来创建ID，例如“ EN1001”</div>
                        <Input placeholder="订单编号前缀" value={baseInfoStore.ordersPrefix} onChange={(e)=>baseInfoStore.setOrdersPrefix(e.target.value)} />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}


export default observer(OrderSetUpCard)

const Scoped = styled.div`
`