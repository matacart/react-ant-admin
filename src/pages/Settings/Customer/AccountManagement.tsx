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

function AccountManagement() {

    const [loading, setLoading] = useState(false);

    const [accountVersion,setAccountVersion] = useState(1)

    const AccountTypeOptions = [
       
    ];

    return (
        <Scoped>
            <Card className="card">
                <div className="color-242833 font-16 font-w-600">帐号管理</div>
                <Divider className="divider" />
                <Form layout={"vertical"}>
                    <Form.Item label={<div>
                        <div className="color-242833">登录/注册账号</div>
                        <div className="color-7A8499" style={{marginTop:"4px"}}>设置客户在网店登录注册时使用的账号类型</div>
                    </div>}>
                        <Checkbox.Group>
                            <Col span={24}>
                                <Checkbox value={1}>邮箱</Checkbox>
                            </Col>
                            <Col span={24} style={{marginTop:"12px"}}>
                                <Checkbox value={2}>手机号</Checkbox>
                                <div className="color-888888" style={{position:"relative",left:"24px"}}>若勾选此方式，请提前开通 <a>我的短信</a> 应用，并保证短信包余量充足。</div>
                            </Col>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item>
                        <div>
                            <div className="color-242833">登录验证方式</div>
                            <div className="color-7A8499" style={{marginTop:"4px"}}>经典客户账户仅支持密码</div>
                        </div>
                    </Form.Item>
                    <Form.Item label={<div>
                        <div className="color-242833">客户注册填写资料</div>
                        <div className="color-7A8499" style={{marginTop:"4px"}}>可配置客户注册时选择性填写的信息<a className="font-12" style={{marginLeft:"4px"}}>预览</a></div>
                    </div>}>
                        <Checkbox.Group>
                            <Checkbox value={3}>姓氏</Checkbox>
                            <Checkbox value={4}>名字</Checkbox>
                            <Checkbox value={5}>性别</Checkbox>
                            <Checkbox value={6}>生日</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item label={<div>
                        <div className="color-242833">其他设置</div>
                    </div>}>
                        <Checkbox.Group>
                            <Col span={24} style={{marginBottom:"12px"}}>
                                <Checkbox value={7}>未注册客户可在登录页中激活账号（不发送激活邮件或激活奖励）</Checkbox>
                            </Col>
                            <Col span={24} style={{marginBottom:"12px"}}>
                                <Checkbox value={8}>针对有风险的账号，注册/登录时开启图形验证</Checkbox>
                            </Col>
                            <Col span={24}>
                                <Checkbox value={9}>允许客户注销账户</Checkbox>
                            </Col>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default AccountManagement

const Scoped = styled.div`
    margin-bottom: 20px;
    .ant-card-body{
        padding-bottom: 4px;
    }
    .ant-radio{
        position: relative;
        top: -10px;
    }
    .divider{
        margin:20px 0px;
    }
    .text{
        margin-top: 16px;
    }
`
