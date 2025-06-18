import { Badge, Button, Card, Checkbox, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect, useState } from "react";

function BillDetails() {

    useEffect(()=>{
      
    },[])

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">账单明细</div>
                </Flex>
                <Flex vertical gap={12}>
                    <Flex className="color-474F5E font-w-400" justify="space-between">
                        <div>更新后的总额</div>
                        <div>US$1,000.00</div>
                    </Flex>
                    <Flex className="color-474F5E font-w-400" justify="space-between">
                        <div>实际付款</div>
                        <div>US$0.00</div>
                    </Flex>
                </Flex>
                <Divider/>
                <Form>
                    <Flex className="color-474F5E font-w-500" justify="space-between">
                        <div>待客户支付</div>
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

export default observer(BillDetails);