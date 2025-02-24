import { Button, Card, Col, Divider, Flex, Form, Input, Modal, Row, Select } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { layout } from '@/app.bak';

function Parcel() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between" align="center">
                    <div>
                        <div className="color-242833 font-16 font-w-600">已保存的包裹</div>
                        <div className="color-474F5E font-14" style={{marginTop:"4px"}}>使用包裹尺寸和重量，以便第三方承运商更准确的计算费率</div>
                    </div>
                    <div>
                        <Button className="submit-btn" onClick={()=>setIsModalOpen(true)}>添加包裹</Button>
                    </div>
                </Flex>
            </Card>
            {/* 添加包裹 */}
            <Modal title="包裹" centered width={620} open={isModalOpen} onOk={()=>{}} onCancel={()=>setIsModalOpen(false)}>
                <Form form={form} layout={"vertical"}>
                    
                    <Row>
                        <Col span={24}>
                            <Form.Item label="包裹名称" name="name">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="包裹类型" name="type">
                                <Select options={[
                                    {value:"0",label:"包装箱"},
                                    {value:"1",label:"信封"},
                                    {value:"2",label:"软包装"}
                                ]} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="重量" name="weight">
                                <Input addonAfter={
                                    <Select defaultValue={"0"} options={[
                                        {value:"0",label:"克"},
                                        {value:"1",label:"千克"},
                                        {value:"3",label:"磅"},
                                        {value:"4",label:"盎司"}
                                    ]} />
                                } />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={12}>
                        <Col span={20}>
                            <Flex gap={12}>
                                <Form.Item label="长度" name="length">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="宽度" name="width">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="高度" name="height">
                                    <Input />
                                </Form.Item>
                            </Flex>
                        </Col>
                        <Col span={4}>
                            <Form.Item label={<></>} name="unit">
                                <Select defaultValue={"0"} options={[
                                    {value:"0",label:"厘米"},
                                    {value:"1",label:"英寸"},
                                ]} />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                </Form>
            </Modal>
        </Scoped>
    )
}

export default Parcel

const Scoped = styled.div`
    margin-bottom: 20px;
`
