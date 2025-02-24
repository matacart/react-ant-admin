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

function CustomerContactInformation() {

    const [loading, setLoading] = useState(false);

    const [accountVersion,setAccountVersion] = useState(1)

    const AccountTypeOptions = [
       
    ];

    return (
        <Scoped>
            <Card className="card">
                <Form layout={"vertical"}>
                    <Form.Item label={<div className="color-242833 font-w-600">结账联系方式</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Radio.Group
                                style={style}
                                onChange={(e)=>setAccountVersion(e.target.value)}
                                value={accountVersion}
                                options={[
                                    {
                                        value: 1,
                                        label: (
                                            <div className="color-474F5E">客户只能使用邮箱结账</div>
                                        ),
                                    },
                                    {
                                        value: 2,
                                        label: (
                                            <div className="color-474F5E">客户可使用手机号或邮箱结账</div>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item label={<div className="color-242833 font-w-600">订阅信息</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox value={3}>默认为客户订阅营销信息</Checkbox>
                                    <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>勾选后，客户仍可以在结账页选择取消订阅营销信息</div>
                                </Col>
                                <Col span={24} style={{marginTop:"12px"}}>
                                    <Checkbox value={4}>客户可以选择订阅营销短信</Checkbox>
                                </Col>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>

                    <Form.Item label={<div>
                        <div className="color-242833 font-w-600">到店取货与本地配送</div>
                        <div className="color-7A8499 font-12">若勾选必须填写手机号，结账时无法使用Apple Pay和Google Pay的快捷支付</div>
                    </div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox value={5}>到店取货时，必须填写手机号</Checkbox>
                                    <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>勾选后，客户仍可以在结账页选择取消订阅营销信息</div>
                                </Col>
                                <Col span={24} style={{marginTop:"12px"}}>
                                    <Checkbox value={6}>本地配送时，必须填写手机号</Checkbox>
                                </Col>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>

                    <Form.Item label={
                        <div className="color-242833 font-w-600">结账后接受订阅信息</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox value={7}>客户在完成订单后仍可选择添加电话号码或电子邮件，以便接收发货更新或其他订阅信息</Checkbox>
                                </Col>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>

                    <Form.Item label={
                        <div className="color-242833 font-w-600">选择客户接收物流更新通知的方式</div>}>
                        <div style={{marginTop:"4px"}}>
                            <Checkbox.Group>
                                <Col span={24}>
                                    <Checkbox value={8} disabled>客户在结账后可下载 Tracker App，并获取发货更新信息<a style={{marginLeft:"2px"}}>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></Checkbox>
                                    <div className="color-888888 font-12" style={{position:"relative",left:"24px"}}>履约时效与经营情况符合 Tracker App 标准的店铺方可开通该功能。</div>
                                </Col>
                            </Checkbox.Group>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default CustomerContactInformation

const Scoped = styled.div`
    margin-bottom: 20px;
    /* .ant-card-body{
        padding-bottom: 4px;
    } */
    .divider{
        margin:20px 0px;
    }
    .text{
        margin-top: 16px;
    }
`
