import { Badge, Button, Card, Checkbox, Divider, Flex, Form, Input, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect, useState } from "react";
import orderRefund from "@/store/order/orderRefund";

const { TextArea } = Input;

function Remarks() {

    useEffect(()=>{
      
    },[])

    return (
        <Scoped>
            <Card className="card">
                <Flex>
                    <div className="font-w-500 font-16">退款备注</div>
                </Flex>
                <div style={{ margin: "20px 0" }}>
                    <TextArea
                        showCount
                        maxLength={120}
                        value={orderRefund.remarks}
                        placeholder="填写退款备注"
                        autoSize={{ minRows: 5, maxRows: 5 }}
                        onChange={(e) => {
                            orderRefund.setRemarks(e.target.value);
                        }}
                    />
                </div>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
`

export default observer(Remarks);