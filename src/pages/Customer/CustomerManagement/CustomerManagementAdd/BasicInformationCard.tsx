import addCustomer from "@/store/customer/customer-management/addCustomerStore";
import { Card, Checkbox, Col, DatePicker, Form, Input, Row, Select } from "antd";
import styled from "styled-components";

export default function BasicInformationCard() {

    const [form] = Form.useForm();

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <Scoped>
            <Card title="基础信息">
                <Form name="form" layout="vertical">
                    <Row gutter={[12,0]}>
                        <Col span={12}>
                            <Form.Item label="名称">
                                <Input placeholder="名称" value={addCustomer.baseFirstName} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="姓氏">
                                <Input placeholder="姓氏" value={addCustomer.baseLastName} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="邮箱">
                                <Input placeholder="邮箱" value={addCustomer.baseEmail} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="手机">
                                <Input placeholder="手机" value={addCustomer.basePhone} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div>为客户订阅您的营销电子邮件或短信前您应先征得客户的同意。</div>
                    <div>
                        <Checkbox>为客户订阅营销电子邮件</Checkbox>
                    </div>
                    <div>
                        <Checkbox>为客户订阅营销短信</Checkbox>
                    </div>
                    <Row gutter={[12,0]}>
                        <Col span={12}>
                            <Form.Item label="性别">
                                <Select placeholder="名称" value={addCustomer.baseSex} options={[
                                    {value: '1',label:'男'},
                                    {value: '2',label:'女'},
                                    {value: '3',label:'未知'},
                                    {value: '4',label:'保密'},
                                ]} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="生日">
                                <DatePicker placeholder="生日" style={{width:"100%"}} onChange={onChange} />
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