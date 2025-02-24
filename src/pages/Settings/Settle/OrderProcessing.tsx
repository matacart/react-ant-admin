import { ExportOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Divider, Flex, Form, GetProp, Input, message, Radio, Row, Spin, Upload, UploadProps } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
};

function OrderProcessing() {

    const [loading, setLoading] = useState(false);

    const [accountVersion,setAccountVersion] = useState(1)

    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Form layout={"vertical"}>
                    <Form.Item label={<div className="color-242833">订单自动归档</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox value={1}>订单自动归档</Checkbox>
                                    <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>系统将会对已付款并已发货的订单进行自动归档</div>
                                </Col>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>

                    <Form.Item label={<div className="color-242833">支付订单后</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>setAccountVersion(e.target.value)}
                                value={accountVersion}
                                options={[
                                    {
                                        value: 2,
                                        label: (
                                            <div className="color-474F5E">仅自动对订单的礼品卡进行发货</div>
                                        ),
                                    },
                                    {
                                        value: 3,
                                        label: (
                                            <div className="color-474F5E">不要自动填充订单的任何订单商品</div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default OrderProcessing

const Scoped = styled.div`
    margin-bottom: 20px;
    .card{
        padding-bottom: 4px;
    }
   
`
