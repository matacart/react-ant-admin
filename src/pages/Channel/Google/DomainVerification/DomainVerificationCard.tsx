import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton"
import MyInput from "@/components/Input/MyInput"
import { GlobalOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Flex, Form, Space, Image, Popover } from "antd"
import { useState } from "react"
import styled from "styled-components"

function DomainVerificationCard() {

    const [form] = Form.useForm();

    const [open,setOpen] = useState(false);

    const content = (
        <div>
            <Image
                width={300}
                src="https://cdn.myshopline.cn/sl/admin/ec2-shopline-admin-channel/20260121151846073/imgs/domain_cn.fed73.png"
            />
        </div>
    );

    const onCancel = () => {
        setOpen(false);
    }

    const submit = ()=>{
        form.validateFields().then((values)=>{
            console.log(values);
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <MyCard>
            <div className="header">
                <Flex justify="space-between" align="center">
                    <div>
                        <Flex gap={4} align="center" className="title font-16 font-w-500" style={{height:"28px"}}>
                            <span>利用 Google 工具验证网域</span>
                            <Flex className="more" gap={4}>
                                <QuestionCircleOutlined />
                                <span className="more-text font-12 color-474F5E">了解详情</span>
                            </Flex>
                        </Flex>
                        <div className="color-474F5E">请添加 Meta 标记进行验证。Google 网域验证有助于提高网站安全性、信任度和可用性，同时帮助您更好地管理和推广业务。</div>
                    </div>
                </Flex>
            </div>
            <div className="content">
                <Flex className="content-top" align="center">
                    <Flex justify="center" align="center" className="icon">
                        <GlobalOutlined className="font-20" />
                    </Flex>
                    <div className="info">
                        <div>主域名: https://test112.myshopline.com</div>
                        <div style={{marginTop:"4px"}}>添加 Meta 标记后，Google 将会定时抓取网店标记来识别验证</div>
                    </div>
                </Flex>
                {/* 添加 Meta 标记后，Google 将会定时抓取网店标记来识别验证 */}
                {open ? <div className="edit-warp">
                    <div className="font-16 font-w-500 title">编辑 Meta 标记</div>
                    <div className="desc color-474F5E">
                        粘贴您的 Meta 标签
                        <Popover placement="top" content={content} arrow={false}>
                            <span className="code color-356DFF cursor-pointer"> Content Code </span> 
                        </Popover>
                        到下方栏位，即可自动添加声明代码。
                    </div>
                    <Form form={form} layout="vertical">
                        <Form.Item 
                            name="meta_tag" 
                            label={null}
                            required={false}
                            rules={[
                                { required: true, message: "内容不能为空" },
                            ]}
                        >
                            <MyInput style={{height:"36px"}} placeholder="请输入 Meta 标记" />
                        </Form.Item>
                    </Form>
                    <Flex justify="flex-end" gap={12}>
                        <DefaultButton text="放弃更改" onClick={onCancel} />
                        <PrimaryButton text="保存" onClick={submit} />
                    </Flex>
                </div> : <DefaultButton text="添加 Meta 标记" onClick={()=>setOpen(true)} />}
            </div>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    width: 100%;
    .header{
        .title{
            margin-bottom: 8px;
        }
        .more{
            cursor: pointer;
            &-text{
                display: none;
            }
            &:hover{
                .more-text{
                    display: inline;
                }
                padding: 4px 8px;
                border-radius: 12px;
                background-color: #fff;
                -webkit-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
                box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
            }
        }
    }
    .content{
        .content-top{
            padding: 20px 0;
            .icon{
                width: 42px;
                height: 42px;
                border-radius: 4px;
                background-color: #F5F7FA;
            }
            .info{
                margin-left: 12px;
            }
        }
        .edit-warp{
            padding: 20px;
            background-color: #f7f8fb;
            border-radius: 6px;
            .title{
                margin-bottom: 4px;
            }
            .desc{
                margin-bottom: 12px;
                
                .code{
                    
                }
            }
        }
    }
`


export default DomainVerificationCard