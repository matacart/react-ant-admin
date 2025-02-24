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

function ClosingForm() {

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
                    <Form.Item label={<div className="color-242833 font-w-600">全名</div>}>
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
                                                <div className="color-474F5E">姓名同时填写</div>
                                                <div className="color-7A8499">符合亚洲客户的习惯</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        value: 2,
                                        label: (
                                            <div>
                                                <div className="color-474F5E">姓、名分开填写</div>
                                                <div className="color-7A8499">符合欧美客户的习惯</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        value: 3,
                                        label: (
                                            <div>
                                                <div className="color-474F5E">姓、名分开填写，其中名为选填</div>
                                                <div className="color-7A8499">符合欧美客户的习惯，同时减少需填写的字段数量</div>
                                            </div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">公司名称</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>setCompanyNameRadio(e.target.value)}
                                value={companyNameRadio}
                                options={[
                                    {
                                        value: 4,
                                        label: (
                                            <div className="color-474F5E">隐藏</div>
                                        ),
                                    },
                                    {
                                        value: 5,
                                        label: (
                                            <div className="color-474F5E">选填</div>
                                        ),
                                    },
                                    {
                                        value: 6,
                                        label: (
                                            <div className="color-474F5E">必填</div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item label={<div className="color-242833 font-w-600">地址行2（公寓、单元等）</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>setAddressLine2Radio(e.target.value)}
                                value={addressLine2Radio}
                                options={[
                                    {
                                        value: 7,
                                        label: (
                                            <div className="color-474F5E">隐藏</div>
                                        ),
                                    },
                                    {
                                        value: 8,
                                        label: (
                                            <div className="color-474F5E">选填</div>
                                        ),
                                    },
                                    {
                                        value: 9,
                                        label: (
                                            <div className="color-474F5E">必填</div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item label={<div className="color-242833 font-w-600">邮编格式校验<a style={{marginLeft:"2px"}} className="font-w-500">了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox value={10}>启用收件人邮编格式校验功能</Checkbox>
                                    <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>开启后，将根据收件国家/州省/城市对邮编进行校验</div>
                                </Col>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>
                    
                    <Form.Item label={<div className="color-242833 font-w-600">收件人手机号</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>setAddresseePhoneRadio(e.target.value)}
                                value={addresseePhoneRadio}
                                options={[
                                    {
                                        value: 11,
                                        label: (
                                            <div className="color-474F5E">隐藏</div>
                                        ),
                                    },
                                    {
                                        value: 12,
                                        label: (
                                            <div className="color-474F5E">选填</div>
                                        ),
                                    },
                                    {
                                        value: 13,
                                        label: (
                                            <div className="color-474F5E">必填</div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>

                    <Form.Item label={<div className="color-242833 font-w-600">订单备注</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>setOrderNoteRadio(e.target.value)}
                                value={orderNoteRadio}
                                options={[
                                    {
                                        value: 14,
                                        label: (
                                            <div className="color-474F5E">隐藏</div>
                                        ),
                                    },
                                    {
                                        value: 15,
                                        label: (
                                            <div className="color-474F5E">选填</div>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </Form.Item>
                    
                    <Form.Item label={<div className="color-242833 font-w-600">账单发送地址</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox value={16}>默认将收件地址用作账单地址</Checkbox>
                                    <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>减少结账时需填写的字段数量。账单地址仍可编辑</div>
                                </Col>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>

                    <Form.Item label={<div className="color-242833 font-w-600">自动填充功能</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox value={17}>启用地址自动填充功能</Checkbox>
                                    <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>当客户输入其收货地址和账单地址时，为客户提供地址建议</div>
                                </Col>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>

                </Form>
            </Card>
        </Scoped>
    )
}

export default ClosingForm

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
