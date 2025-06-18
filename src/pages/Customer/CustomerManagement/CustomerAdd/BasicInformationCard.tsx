import MyDatePicker from "@/components/DatePicker/MyDatePicker";
import DefaultInput from "@/components/Input/DefaultInput";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import addCustomer from "@/store/customer/addCustomerStore";
import { Card, Checkbox, Col, DatePicker, DatePickerProps, Form, Input, Row, Select } from "antd";
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
                                <DefaultInput placeholder="名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="姓氏">
                                <DefaultInput placeholder="姓氏" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="邮箱">
                                <DefaultInput placeholder="邮箱" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="手机">
                                <DefaultInput placeholder="手机" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="为客户订阅您的营销电子邮件或短信前您应先征得客户的同意。" style={{marginBottom:"0px"}}>
                        <Checkbox>为客户订阅营销电子邮件</Checkbox>
                    </Form.Item>
                    <Form.Item label="" style={{marginBottom:"12px"}}>
                        <Checkbox>为客户订阅营销短信</Checkbox>
                    </Form.Item>
                    <Row gutter={[12,0]}>
                        <Col span={12}>
                            <Form.Item label="性别">
                                <MySelect style={{height:"36px"}} placeholder="性别" options={[
                                    {value: '1',label:'男'},
                                    {value: '2',label:'女'},
                                    {value: '3',label:'未知'},
                                    {value: '4',label:'保密'},
                                ]} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="生日">
                                <MyDatePicker style={{height:"36px",width:"100%"}} placeholder="生日" />
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