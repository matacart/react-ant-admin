import DefaultInput from "@/components/Input/DefaultInput";
import { Card, Checkbox, Col, Form, Input, Row } from "antd";
import styled from "styled-components";

export default function DeliveryAddressCard() {

    const [form] = Form.useForm();

    return (
        <Scoped>
            <Card title="收货地址">
                <Form name="form" layout="vertical">
                    <Row>
                        <Col span={24}>
                            <Form.Item label="联系人电话" name="variant">
                                <DefaultInput placeholder="联系人电话" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="国家/地区" name="variant">
                                <DefaultInput placeholder="国家/地区" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[12,0]}>
                        <Col span={12}>
                            <Form.Item label="名称" name="variant">
                                <DefaultInput placeholder="名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="姓氏" name="variant">
                                <DefaultInput placeholder="姓氏" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="公司" name="variant">
                                <DefaultInput placeholder="公司" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="地址" name="variant">
                                <Input placeholder="地址" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="详细地址（公寓、门牌号等）" name="variant">
                                <DefaultInput placeholder="详细地址（公寓、门牌号等）" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[12,0]}>
                        <Col span={12}>
                            <Form.Item label="城市" name="variant">
                                <DefaultInput placeholder="城市" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="省份" name="variant">
                                <DefaultInput placeholder="省份" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[12,0]}>
                        <Col span={12}>
                            <Form.Item label="邮编" name="variant">
                                <DefaultInput placeholder="邮编" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="区" name="variant">
                                <DefaultInput placeholder="区" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`

    
`