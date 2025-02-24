import { ExportOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Divider, Flex, Form, GetProp, Input, message, Radio, Row, Spin, Upload, UploadProps } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};

function CheckoutButton() {

    const [loading, setLoading] = useState(false);

    const [fullNameRadio,setFullNameRadio] = useState(1)

    const [companyNameRadio,setCompanyNameRadio] = useState(1)

    const [addressLine2Radio,setAddressLine2Radio] = useState(1)

    const [addresseePhoneRadio,setAddresseePhoneRadio] = useState(1)

    const [orderNoteRadio,setOrderNoteRadio] = useState(1)

    

    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Form layout={"vertical"}>
                    <Form.Item label={<div className="color-242833">商品详情页</div>}>
                        <div style={{marginTop:"4px"}} className="full-name-radio">
                            <Radio.Group
                                style={style}
                                onChange={(e)=>setFullNameRadio(e.target.value)}
                                value={fullNameRadio}
                                options={[
                                    {
                                        value: 1,
                                        label: (
                                            <div>
                                                <div className="color-474F5E">启用动态结算按钮</div>
                                                <div className="color-7A8499">根据配置的支付方式展示“立即购买”按钮或快捷支付按钮</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        value: 2,
                                        label: (
                                            <div>
                                                <div className="color-474F5E">自定义</div>
                                                <div className="color-7A8499">自行选择要展示的结帐按钮</div>
                                            </div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>
                    
                    <Form.Item label={<div>
                        <div className="color-242833 font-w-600">购物车</div>
                        <div className="color-7A8499 font-12">请选择在购物车要展示的结帐按钮</div>
                    </div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group>
                                <Row gutter={[0,12]}>
                                    <Col span={24}>
                                        <Checkbox value={3}>Paypal</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value={4}>Google Pay</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value={5}>Apple Pay</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>
                    
                    <Form.Item label={<div>
                        <div className="color-242833 font-w-600">结算页</div>
                        <div className="color-7A8499 font-12">请选择在结算页要展示的结帐按钮</div>
                    </div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group>
                                <Row gutter={[0,12]}>
                                    <Col span={24}>
                                        <Checkbox value={6}>Paypal</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value={7}>Google Pay</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value={8}>Apple Pay</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>

                </Form>
            </Card>
        </Scoped>
    )
}

export default CheckoutButton

const Scoped = styled.div`
    margin-bottom: 20px;
    .card{
        padding-bottom: 4px;
    }
    .full-name-radio{
        .ant-radio{
            position: relative;
            top: -10px;
        }
    }
`
