import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import MyTextArea from "@/components/Input/MyTextArea";
import { setHomeSeo } from "@/services/y2/api";
import { Card, Drawer, Flex, Form} from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPrimaryDomain } from "@/utils/dataStructure";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import cookie from 'react-cookies';
import preferences from "@/store/channel/preferences/preferences";
import { observer } from "mobx-react-lite";

function SEOSetupCard() {

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const parmainDomain = getPrimaryDomain();

    const [form] = Form.useForm();
    
    const seoClose = ()=>{
        setOpen(false);
    }

    const seoConfirm = ()=>{
        form.validateFields().then(values=>{
            setLoading(true);
            setHomeSeo({
                languages_id:cookie.load("shop_lang"),
                meta_title:values.title,
                meta_description:values.desc,
                meta_keywords:values.keywords,
            }).then(res=>{
                if(res.code == 0){
                    preferences.setHomeSEO({
                        meta_title:values.title,
                        meta_description:values.desc,
                        meta_keywords:values.keywords,
                    })
                    seoClose();
                }
            }).finally(()=>{
                setLoading(false);
            })
        })
    }

    useEffect(()=>{
        if(open){
            // 确保表单已经渲染完成
            setTimeout(()=>{
                form.setFieldsValue({
                    title:preferences.homeSEO.meta_title,
                    desc:preferences.homeSEO.meta_description,
                    keywords:preferences.homeSEO.meta_keywords,
                })
            },0)
        }
    },[open])

    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <div className="card-top">
                    <Flex justify="space-between" align="center">
                        <div className="color-242833">搜索引擎优化</div>
                        <DefaultButton text="编辑" onClick={()=>{
                            setOpen(true);
                        }} />
                    </Flex>
                    <div className="content">
                        <p className="color-242833 font-12 font-w-500">{parmainDomain}</p>
                        <p className="color-101AA4 font-20">{preferences.homeSEO.meta_title || "未填写标题"}</p>
                        <p className="color-474F5E font-12">{preferences.homeSEO.meta_description || "未填写描述"}</p>
                    </div>
                    {/* <div className="color-242833 font-16 font-w-600">身份验证</div>
                    <div className="color-7A8499" style={{marginTop:"4px",marginBottom:"12px"}}>客户注册时系统会发送邮件/短信验证信，客户必须验证才能完成注册</div>
                    <Divider className="divider" />
                    <Checkbox className="color-474F5E" value={1}>客户需要验证才能完成注册</Checkbox> */}
                </div>
                {/*  */}
                {/* <Flex className='create-content-app' justify='space-between' align='center' gap={12}>
                    <img style={{ width: "48px" }} src="https://cdn.myshopline.cn/sl/admin/ec2-admin-onlineshop/20250311110516973/imgs/easyRank.5de17.png" />
                    <div>
                        <div className='font-16 color-474F5E font-w-600 create-content-app-title'>EasyRank SEO All-in-one</div>
                        <div className='font-14'>轻松掌握 SEO，获取更高的排名及流量</div>
                    </div>
                    <div className='create-content-app-btn'>
                        <DefaultButton text="安装应用" />
                    </div>
                </Flex> */}
            </Card>
            <MyDrawer width={540} title='搜索引擎优化' open={open} onClose={seoClose}>
                <Scoped>
                    <div className="contentCard">
                        <div className="preview">
                            <div>预览</div>
                            <div>{parmainDomain}</div>
                            <div>{preferences.homeSEO.meta_title || "未填写标题"}</div>
                            <div>{preferences.homeSEO.meta_description || "未填写描述"}</div>
                        </div>
                        <Form
                            layout="vertical"
                            form={form}
                            >
                            <Form.Item label="页面标题" name="title" tooltip="页面标题可帮助客户快速理解产品或页面内容，建议使用简洁直观的语言。">
                                <DefaultInput placeholder={"页面标题"} />
                            </Form.Item>
                            <Form.Item label="描述" name="desc" tooltip="建议详细描述商品特性或页面内容以吸引客户访问，不要堆砌关键词。">
                                <MyTextArea placeholder={"添加描述使页面在搜索引擎中获得更高的排名"} />
                            </Form.Item>
                            <Form.Item label="搜索引擎关键词" name="keywords" tooltip="关键词可以提高搜索结果排名，建议1-2个关键词即可，堆砌关键词可能会降低排名！">
                                <DefaultInput placeholder="输入关键词后，按enter键完成输入" />
                            </Form.Item>
                        </Form>
                        <div className="submit">
                            <PrimaryButton type="primary" text="完成" loading={loading} onClick={seoConfirm} />
                        </div>
                    </div>
                </Scoped>
                
            </MyDrawer>
        </Scoped>
    )
}

export default observer(SEOSetupCard);

const Scoped = styled.div`
    margin-bottom: 20px;

    .card{
        padding: 0;
        .card-top{
            padding: 16px 24px;
            .content{
                margin-top: 12px;
                padding: 20px !important;
                border-radius: 6px;
                background: #F7F8FB;
                p{
                    margin-bottom: 4px;
                    :last-child{
                        margin-bottom: 0;
                    }
                }
            }
        }
        .create-content-app{
            background: linear-gradient(90deg, #f0f7ff 0%, #f9fcff 100%);
            padding: 12px 24px;
            .create-content-app-title{
                margin-bottom: 8px;
            }
            .create-content-app-btn{
                flex: 1;
                text-align: right;
            }
        }
    }
    .divider{
        margin:20px 0px;
    }
    
`

const MyDrawer = styled(Drawer)`
    .contentCard{
        .preview{
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #EEF1F7;
            div:nth-child(1){
                padding-bottom: 12px;
            }
            div:nth-child(3){
                font-size: 20px;
                margin:10px 0 8px 0;
                color: #101AA4;
            }
        }
        .submit{
            position: absolute;
            bottom: 24px;
            right: 24px;
        }
    } 
`
