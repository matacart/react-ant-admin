import { Button, Card, Form } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import DefaultInput from "@/components/Input/DefaultInput";
import base from "@/store/settings/base/base";


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
                        <DefaultInput placeholder="订单编号前缀" value={base.storeInfo.orders_prefix} onChange={(e:any)=>base.setStoreInfo({
                            ...base.storeInfo,
                            orders_prefix:e.target.value
                        })} />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}


export default observer(OrderSetUpCard)

const Scoped = styled.div`
`