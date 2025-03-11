import { Card, Col, Divider, Form, Input, Row } from "antd"
import styled from "styled-components"


export default function LocationDetailsCard(){
    return (
        <Scoped>
            <Card>
                <Form layout="vertical">
                    <Form.Item label={<div className="font-w-600">地点名称（该名称用户在结账时可见）</div>}>
                        <Input placeholder="请输入地点名称" />
                    </Form.Item>
                    <Divider />
                    <Form.Item label={<div className="font-w-600">国家/地区</div>}>
                        <Input placeholder="请输入地点名称" />
                    </Form.Item>
                    <Form.Item label={<div className="font-w-600">地址</div>}>
                        <Input placeholder="请输入地点名称" />
                    </Form.Item>
                    <Form.Item label={<div className="font-w-600">详细地址</div>}>
                        <Input placeholder="请输入地点名称" />
                    </Form.Item>
                    <Row gutter={[12,0]}>
                        <Col span={12}>
                            <Form.Item label={<div className="font-w-600">城市</div>}>
                                <Input placeholder="请输入地点名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<div className="font-w-600">省份</div>}>
                                <Input placeholder="请输入地点名称" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={<div className="font-w-600">邮编</div>}>
                        <Input placeholder="请输入地点名称" />
                    </Form.Item>
                    <Form.Item label={<div className="font-w-600">电话</div>}>
                        <Input placeholder="请输入地点名称" />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )

}

const Scoped = styled.div`
    margin-bottom: 20px;

`