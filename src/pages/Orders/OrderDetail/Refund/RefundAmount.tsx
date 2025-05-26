import { Badge, Button, Card, Checkbox, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect, useState } from "react";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyButton from "@/components/Button/MyButton";
import MyInput from "@/components/Input/MyInput";
import NumberInput from "@/components/Input/NumberInput";

function RefundAmount() {


    useEffect(()=>{
       
    },[])

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">退款金额</div>
                </Flex>
                <div className="font-12 color-474F5E" style={{marginBottom:"8px"}}>PayPal offline payment</div>
                <div style={{marginBottom:"8px"}}>
                    <NumberInput prefix="US$" min={0} style={{width:"100%"}} />
                </div>
                <div className="font-12 color-474F5E">最高可退 US$47,999.00</div>
                <div style={{marginTop:"16px"}} className="color-474F5E">
                    <Checkbox>给客户发送通知</Checkbox>
                </div>
                <Divider/>
                <MyButton type="primary" text="退款" style={{width:"100%"}} />
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
`

export default observer(RefundAmount);