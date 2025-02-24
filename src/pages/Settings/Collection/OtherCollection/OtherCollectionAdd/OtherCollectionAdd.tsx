import { ArrowLeftOutlined, DeleteOutlined, ExclamationCircleOutlined, ExportOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Card, Checkbox, Divider, Flex, Form, Input, List, message, TabsProps, Upload } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useState } from "react";
import { setAddonsConfig } from "@/services/y2/api";
import { useForm } from "antd/es/form/Form";
import modal from "antd/es/modal";
import axios from "axios";


const { TextArea } = Input;

function OtherCollectionAdd() {

    const [imgLoading, setimgLoading] = useState(false);

    const [isMaskVisible, setIsMaskVisible] = useState(false);

    const [form] = Form.useForm()

    const [config,setConfig] = useState<any>({
        item:[
            {name: "MerchantId",value:""},
            {name: "SecretKey",value:""},
        ]
    });

    const submit = ()=>{
        console.log({...form.getFieldsValue(),config})
        setAddonsConfig({...form.getFieldsValue(),config}).then(res=>{
            message.success("添加成功")
            history.push("/settings/payments")
        })
    }

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/payments/other")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">添加 Afterpay BNPL (Australia)</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card classNames={{body:"card"}}>
                                <div style={{margin:"20px 20px 0 20px"}}>
                                    <Form form={form} layout="vertical">
                                        <Form.Item name={config.item[0].name} label={<div className="font-w-600">{config.item[0].name}</div>}>
                                            <Input value={config.item[0].value} placeholder="输入付款方式名称" />
                                        </Form.Item>
                                        <Form.Item name={config.item[1].name} label={<div className="font-w-600">{config.item[1].name}</div>}>
                                            <Input value={config.item[1].value} placeholder="输入付款方式名称" />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Card>
                            <div style={{textAlign:"right"}}>
                                <Button onClick={submit} type="primary" style={{height:36}}>添加 手动收款方式</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default OtherCollectionAdd

const Scoped = styled.div`

.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 880px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
                &-content {
                    /* display: flex; */
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
        }
        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .card{
                padding: 0;
                .credentials-left-box{
                    flex: 1;
                    min-height: 150px;
                }
                .credentials-right-box{
                    margin-left: 8px;
                    .ant-upload{
                        width: 180px;
                        min-height: 150px;
                    }
                    .upload-img{
                        background-color: #f7f8fb;
                        border-radius: 4px;
                        width: 180px;
                        min-height: 150px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        /*  */
                        position: relative;
                        border: 1px solid #eef1f6;
                        border-radius: 4px;
                    }
                    .mask{
                        position: absolute;
                        z-index: 99;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(36,40,51,0.4);
                        /* opacity: 0; */
                        border-radius: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: opacity 0.3s ease;
                    }

                    .upload-img:hover.mask {
                        opacity: 1;
                    }

                    .delete-icon {
                        color: white;
                        font-size: 16px;
                        width: 40px;
                        height: 40px;
                        border: 1px solid rgba(255, 255, 255, 0.15);
                        border-radius: 50%;
                        /* opacity: 0.8; */
                        display: flex;
                        justify-content: center;
                        align-items:center;
                        cursor: pointer;
                    }
                }
            }
            

        }
        
    }
}
`