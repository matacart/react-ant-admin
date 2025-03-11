import SuccessTag from "@/components/Tag/SuccessTag";
import { upDatePassword } from "@/services/y2/api";
import { Button, Card, Flex, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import accountManagement from "@/store/shops/accountManagementStore";
import { observer } from "mobx-react-lite";


function LoginAccountCard() {

    
    const [accountForm] = Form.useForm();
    
    const [isModifyAccount,setIsModifyAccount] = useState(false)

    const [passwordForm] = Form.useForm();

    const [isModifyPassword,seIsModifyPassword] = useState(false)

    useEffect(()=>{
        console.log(accountManagement)
    },[])


    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div>
                        <Flex align="center"><div style={{marginRight:"8px"}}>当前登录账号</div><SuccessTag text={"已验证"} /></Flex>
                        <div className="color-474F5E" style={{marginTop:"8px"}}>+{accountManagement.user.area_code} {accountManagement.user.mobile}</div>
                    </div>
                    <Flex gap={12}>
                        <Button onClick={()=>setIsModifyAccount(true)}>修改账号</Button>
                        <Button onClick={()=>seIsModifyPassword(true)}>修改密码</Button>
                    </Flex>
                </Flex>
            </Card>
            <Modal title="修改登录账号" centered open={isModifyAccount} onOk={()=>setIsModifyAccount(false)} onCancel={()=>setIsModifyAccount(false)}>
                <Form form={accountForm} layout="vertical">
                    <Form.Item label="1.验证身份" name="phone">
                        <Input placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item label="2.新账号" name="phone">
                        <Input placeholder="请输入新账号" />
                    </Form.Item>
                </Form>
            </Modal>

            {/*  */}
            <Modal title="修改登录密码" centered open={isModifyPassword} onOk={()=>{
                passwordForm.validateFields().then(values => {
                    upDatePassword(values.oldPassword,values.password).then(res=>{
                        if(res.code == 0) {
                            passwordForm.resetFields();
                            message.success("修改成功")
                            seIsModifyPassword(false)
                        }else{
                            message.error("修改失败，请检查密码是否正确")
                        }
                    })
                })
            }} onCancel={()=>{
                passwordForm.resetFields();
                seIsModifyPassword(false);
            }}>
                <Form style={{marginTop:"20px"}} form={passwordForm} layout="vertical">
                    <Form.Item label="当前密码" name="oldPassword"
                        rules={[{ required: true, message: '请输入当前密码' }]}
                    >
                        <Input placeholder="请输入当前密码" />
                    </Form.Item>
                    <Form.Item label="新密码" name="newPassword"
                        rules={[
                            { required: true, message: '请输入新密码' },
                            { min: 6,max: 16, message: '新密码至少6位' }
                        ]}
                    >
                        <Input maxLength={16} placeholder="请输入新密码（至少6位）" />
                    </Form.Item>
                    <Form.Item label="确认新密码" name="password"
                        rules={[
                            { required: true, message: '请确认新密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致'));
                                }
                            })
                        ]}
                    >
                        <Input placeholder="请再次输入新密码" />
                    </Form.Item>
                </Form>
            </Modal>
        </Scoped>
    )

}

export default LoginAccountCard

const Scoped = styled.div`
    margin-bottom: 20px;

`
