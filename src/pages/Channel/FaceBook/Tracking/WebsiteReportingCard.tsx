import MyAlert from "@/components/Alert/MyAlert"
import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton"
import MyInput from "@/components/Input/MyInput"
import DefaultSelect from "@/components/Select/DefaultSelect"
import MySelect from "@/components/Select/MySelect"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Flex, Form, Modal, Tooltip } from "antd"
import { useState } from "react"
import styled from "styled-components"

function WebsiteReportingCard() {

    const [open,setOpen] = useState(false);

    const [form] = Form.useForm();

    const cancel = () => {
        setOpen(false);
        form.resetFields();
    };

    const submit = ()=>{
        form.validateFields().then(res=>{
            console.log(res);
        }).catch(err=>{
            // console.log(err);
        })
    }


    return (
        <MyCard>
            {/* message={`` +<a href="https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc" target="_blank">Meta Pixel Helper</a> +`检查`} */}
            <MyAlert message={ <div>请注意不要重复添加 Pixel，您可以通过 <a href="https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc" target="_blank">Meta Pixel Helper</a> 检查</div> } showIcon type="info" style={{
                backgroundColor:"#e2f0ff",
                marginBottom:"20px"
            }} />
            <Flex justify="space-between" align="center">
                <div style={{marginRight:"20px"}}>
                    <div className="font-16 font-w-500 title">
                        Pixel 和 Conversion API 授权
                        <Tooltip title="Conversions API 允许广告商将网络事件从他们的服务器直接发送到 Facebook。服务器事件链接到像素并像浏览器像素事件一样进行处理。">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip>
                    </div>
                    <div className="font-14 color-474F5E desc line-h-20">添加 Pixel ID 和访问令牌以通过 Facebook Pixel 和 Conversions API 发送所有事件，这些数据可提高你的营销能力。</div>
                </div>
                <Flex gap={12}>
                    <PrimaryButton text="授权" />
                    <PrimaryButton text="添加" onClick={()=>setOpen(true)} />
                </Flex>
            </Flex>
            {/* 添加弹窗 */}
            <MyModal
                open={open}
                title="新增 Facebook 像素 和 Conversion API 追踪事件"
                centered
                onCancel={cancel}
                footer={()=>(
                    <Flex gap={12} justify="flex-end">
                        <DefaultButton text="取消" onClick={cancel} />
                        <PrimaryButton text="添加" onClick={submit} />
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" className="form">
                    <Form.Item
                        label={<div className="font-w-500">选择追踪事件</div>}
                        name="trackEventId"
                        required={false}
                        rules={[{ required: true, message: '请输入Verification Code' }]}
                    >
                        <DefaultSelect style={{height:"36px"}} placeholder="请选择追踪事件" options={[
                            {
                                label: "顾客造访网店内的任何网页",
                                value: "all"
                            }
                        ]} />
                    </Form.Item>
                    <Form.Item
                        label={<div>
                            <div className="font-w-500" style={{marginBottom:"4px"}}>Facebook像素</div>
                            <div className="font-12 color-474F5E">通常是一个 JavaScript 代码片段，需从 Facebook 平台上获取。查看获取指引</div>
                        </div>}
                        name="facebookPX"
                        required={false}
                        rules={[{ required: true, message: '请输入Verification Code' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="请输入访问令牌" />
                    </Form.Item>
                    <Form.Item
                        label={null}
                        name="accessToken"
                        required={false}
                        rules={[{ required: true, message: '请输入Verification Code' }]}
                    >
                        <Flex style={{paddingBottom:"8px"}} justify="space-between">
                            <div className="font-w-500">Access Token</div>
                            <Flex>
                                <span className="cursor-pointer">验证是什么</span>
                                <span style={{margin:"0 8px"}}>|</span>
                                <span className="cursor-pointer">需要帮助？</span>
                            </Flex>
                        </Flex>
                        <MyInput style={{height:"36px"}} placeholder="请输入访问令牌" />
                    </Form.Item>
                    <Form.Item
                        label={<div className="font-w-500">追踪页面类型</div>}
                        name="trackPageType"
                        required={false}
                        rules={[{ required: true, message: '请输入Verification Code' }]}
                    >
                        <DefaultSelect style={{height:"36px"}} placeholder="请选择追踪页面类型" options={[
                            {
                                label: "网店",
                                value: "all"
                            }
                        ]} />
                    </Form.Item>
                </Form>
            </MyModal>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .title{
        margin-bottom: 8px;
    }
`

const MyModal = styled(Modal)`
    .form{
        max-height: calc(100vh - 60px - 60px);
        overflow-y: auto;
        padding-top: 20px;
    }
`


export default WebsiteReportingCard