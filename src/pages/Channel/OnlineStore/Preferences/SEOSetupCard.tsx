import DefaultButton from "@/components/Button/DefaultButton";
import { Card, Checkbox, Divider, Flex} from "antd";
import { useState } from "react";
import styled from "styled-components";

function SEOSetupCard() {

    const [loading, setLoading] = useState(false);

    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <div className="card-top">
                    <Flex justify="space-between" align="center">
                        <div className="color-242833">搜索引擎优化</div>
                        <DefaultButton text="编辑" />
                    </Flex>
                    <div className="content">
                        <p className="color-242833 font-12 font-w-500">https://www.demo.matacard.com</p>
                        <p className="color-101AA4 font-20">未填写标题</p>
                        <p className="color-474F5E font-12">未填写标题</p>
                    </div>
                    {/* <div className="color-242833 font-16 font-w-600">身份验证</div>
                    <div className="color-7A8499" style={{marginTop:"4px",marginBottom:"12px"}}>客户注册时系统会发送邮件/短信验证信，客户必须验证才能完成注册</div>
                    <Divider className="divider" />
                    <Checkbox className="color-474F5E" value={1}>客户需要验证才能完成注册</Checkbox> */}
                </div>
                {/*  */}
                <Flex className='create-content-app' justify='space-between' align='center' gap={12}>
                    <img style={{ width: "48px" }} src="https://cdn.myshopline.cn/sl/admin/ec2-admin-onlineshop/20250311110516973/imgs/easyRank.5de17.png" />
                    <div>
                        <div className='font-16 color-474F5E font-w-600 create-content-app-title'>EasyRank SEO All-in-one</div>
                        <div className='font-14'>轻松掌握 SEO，获取更高的排名及流量</div>
                    </div>
                    <div className='create-content-app-btn'>
                        <DefaultButton text="安装应用" />
                    </div>
                </Flex>
            </Card>
            <div>
            
            </div>
        </Scoped>
    )
}

export default SEOSetupCard

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
