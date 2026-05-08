import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import { ExportOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Form, Modal, Radio, Tooltip } from "antd";
import { useState } from "react";
import styled from "styled-components";


function GoogleAnalytics() {


    const [form] = Form.useForm();

    const [open,setOpen] = useState(false);

    const confirm = () => {
        // setOpen(false);
    }

    const cancel = () => {
        setOpen(false);
    }

    

    return (
        <MyCard>
            <Flex justify="space-between">
                <div>
                    <div className="font-16 font-w-600">Google Analytics</div>
                    <div className="font-w-400 desc">您可以对网店中的客户行为以及流量进行详细的数据分析。</div>
                </div>
                <DefaultButton text="添加" onClick={() => setOpen(true)} />
            </Flex>

            {/*  */}
            <MyModal
                title="新增 Google Analytics 追踪事件"
                width={620}
                open={open}
                centered={true}
                onCancel={cancel}
                footer={()=>(
                    <Flex justify="flex-end" gap={12}>
                        <DefaultButton text="取消" onClick={cancel} />
                        <PrimaryButton text="确定" onClick={confirm} />
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" className="form">
                    <Form.Item label={<div className="font-w-500">资源类型</div>} name="type" initialValue={1}>
                        <DefaultSelect
                            options={[
                                { 
                                    value: 1, 
                                    label: <div>Google Analytics 4 (GA4)</div>
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label={null} name="ID">
                        <Flex justify="space-between" style={{marginBottom:"8px"}}>
                            <div className="font-w-500">代码 ID</div>
                            <div><a>如何获取?<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></div>
                        </Flex>
                        <DefaultInput placeholder="请输入代码 ID  (例如: G-123456789)" />
                    </Form.Item>
                    <Form.Item label={null} name="APISecret">
                        <Flex justify="space-between" style={{marginBottom:"8px"}}>
                            <div className="font-w-500">
                                Google Analytics API Secret (选填)
                                <Tooltip title="若需启用 Google Analytics 服务端数据上报功能，请获取并填写 api_secret。服务端数据上报能够提高数据的可靠性和准确性，特别是在用户浏览器端上报失败或受限时。配置路径为：Admin > Data Streams > choose your stream > Measurement Protocol > Create">
                                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                        <QuestionCircleOutlined />
                                    </span>
                                </Tooltip>
                            </div>
                            <div><a>如何获取?<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></div>
                        </Flex>
                        <DefaultInput placeholder="请输入您的Google Analytics API Secret  (例如: 1234567890abcdef1234567890abcdef)" />
                    </Form.Item>
                    
                </Form>
            </MyModal>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .desc{
        margin-top: 4px;
    }
    
`

const MyModal = styled(Modal)`
    .form{
        margin-top: 20px;
        .ant-radio{
            align-self: flex-start;
            position: relative;
            top: 3px;
        }
    }
`

export default GoogleAnalytics;
