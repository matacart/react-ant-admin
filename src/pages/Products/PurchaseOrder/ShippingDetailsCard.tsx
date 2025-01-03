import { Card, Col, Form, Row, Select } from "antd";
import styled from "styled-components";

function ShippingDetailsCard() {
    return(
        <Scoped>
            <Card bordered={false} title="运输详细信息">
                <Form layout={"vertical"}>
                    <div className="firstItem">
                    <Row gutter={[24,0]}>
                        <Col span={6}>
                        <Form.Item
                            // name="username"
                            label={<div className="color-242833 font-w-600 font-16">预计配送日期</div>}
                            rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="label"
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    }
                                ]}
                            />
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item
                            // name="username"
                            label={<div className="color-242833 font-w-600 font-16">运输承运商</div>}
                            rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="label"
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    }
                                ]}
                            />
                        </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item
                            // name="username"
                            label={<div className="color-242833 font-w-600 font-16">运单号</div>}
                            rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="label"
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    }
                                ]}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    </div>
                </Form>
            </Card>
        </Scoped>
    )
}

export default ShippingDetailsCard;

const Scoped = styled.div`
    margin-top: 20px;
`

