import MyAlert from "@/components/Alert/MyAlert";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { ReductionIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { Button, Checkbox, Col, Flex, Form, Input, Modal, Row, Space } from "antd"
import { useEffect, useRef, useState } from "react";
import { styled } from 'styled-components';


function CustomerInfoEdit(){

    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();

    const [loading,setLoading] = useState(false);

    const submit = ()=>{
        // 更新订单数据
    }

    const cancel = () => {
        setOpen(false);
    };

    return (
        <>
            <span className="cursor-pointer color-356DFF" onClick={() => setOpen(true)}>编辑</span>
            <MyModal title={<div>编辑客户</div>} width={620} centered open={open} onOk={submit} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <>
                <Form form={form} layout="vertical" style={{margin:"20px 0 40px"}}>

                    <Row gutter={[20,0]}>
                        <Col span={12}>
                            <Form.Item label="名字" name="lastName">
                                <MyInput style={{height:"36px"}} placeholder="请填写名字" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="姓氏" name="firstName">
                                <MyInput style={{height:"36px"}} placeholder="请填写姓氏" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="语言" name="language">
                                <MyInput style={{height:"36px"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="邮箱" name="email">
                                <MyInput style={{height:"36px"}} placeholder="请填写邮箱" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="手机号码" className="phone-number" style={{marginBottom:0}}>
                                <Space.Compact style={{width:"100%"}}>
                                    <MySelect value={"+86"} options={[
                                        {
                                            label: "+86",
                                            country: {
                                                country_name: "中国"
                                            }
                                        }
                                    ]} style={{height:"36px",width:"100px"}}
                                    popupMatchSelectWidth={false}
                                    optionRender={(option:any) => {
                                        return <Space>
                                            {option.data.country.country_name}{"("+option.data.label+")"}
                                        </Space>
                                    }}
                                    />
                                    <Form.Item
                                        name="phone"
                                        validateFirst={true}
                                        style={{ flex: 1 }}
                                        rules={[
                                            {
                                                pattern: /^\d+$/,
                                                message: '请输入正确的手机号码',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                // 通用校验规则
                                                if (value && (value.length < 8 || value.length > 15)) {
                                                    return Promise.reject('请输入正确的手机号码');
                                                }
                                                return Promise.resolve();
                                                }
                                            })
                                        ]}
                                    >
                                        <MyInput placeholder="请输入手机号码" allowClear style={{height:"36px"}} />
                                    </Form.Item>
                                </Space.Compact> 
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[20,0]}>
                        <Col span={12}>
                            <Form.Item label="性别" name="sex">
                                <MyInput style={{height:"36px"}} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="生日" name="birthday">
                                <MyInput style={{height:"36px"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                </Form>
                </>
            </MyModal>
        </>
    )
}


const MyModal = styled(Modal)`
    .ant-form-item{
        /* margin-bottom: 0; */
    }
`



export default CustomerInfoEdit