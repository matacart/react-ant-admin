import DefaultTag from "@/components/Tag/DefaultTag";
import { ExportOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Divider, Flex, Form, GetProp, Input, message, Radio, Row, Spin, Upload, UploadProps } from "antd";
import { useState } from "react";
import styled from "styled-components";

const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
};

function ThirdPartyOnlineShop() {

    const [loading, setLoading] = useState(false);

    const [accountVersion,setAccountVersion] = useState(1)

    const AccountTypeOptions = [
       
    ];

    return (
        <Scoped>
            <Card className="card">
                <div className="color-242833 font-16 font-w-600">通过第三方登录网店</div>
                <Divider className="divider" />
                <div>
                    <div className="color-242833">通过社交媒体登录</div>
                    <div className="color-7A8499" style={{marginTop:"4px",marginBottom:"12px"}}>连接后，客户可以通过的社交媒体账号登录线上商店</div>
                    <div className="flex-item-box">
                        <Flex justify="space-between" className="flex-item" >
                            <Flex align="center" className="item-left">
                                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250109120356185/imgs/facebook.ced88.svg" />
                                <h4 style={{marginBottom:"0px",height:"20px"}}>Facebook 登录</h4>
                                <DefaultTag text="未连接" />
                            </Flex>
                            <div><Button>连接</Button></div>
                        </Flex>
                        <Flex justify="space-between" className="flex-item" >
                            <Flex align="center" className="item-left">
                                <div><img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250109120356185/imgs/google.4fa58.svg" /></div>
                                <h4 style={{marginBottom:"0px",height:"20px"}}>Google 登录</h4>
                                <div><DefaultTag text="未连接" /></div>
                            </Flex>
                            <div><Button>连接</Button></div>
                        </Flex>
                        <Flex justify="space-between" className="flex-item" >
                            <Flex align="center" className="item-left">
                                <div><img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250109120356185/imgs/apple.9ef3d.svg" /></div>
                                <h4 style={{marginBottom:"0px",height:"20px"}}>Apple 登录</h4>
                                <div><DefaultTag text="未连接" /></div>
                            </Flex>
                            <div><Button>连接</Button></div>
                        </Flex>
                        <Flex justify="space-between" className="flex-item" >
                            <Flex align="center" className="item-left">
                                <div><img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250109120356185/imgs/tiktok.59266.svg" /></div>
                                <h4 style={{marginBottom:"0px",height:"20px"}}>TikTok 登录</h4>
                                <div><DefaultTag text="未连接" /></div>
                            </Flex>
                            <div><Button>连接</Button></div>
                        </Flex>
                        <Flex justify="space-between" className="flex-item" >
                            <Flex align="center" className="item-left">
                                <div><img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250109120356185/imgs/line.02efd.svg" /></div>
                                <h4 style={{marginBottom:"0px",height:"20px"}}>LINE 登录</h4>
                                <div><DefaultTag text="未连接" /></div>
                            </Flex>
                            <div><Button>连接</Button></div>
                        </Flex>
                    </div>
                </div>
                <div style={{marginTop:"20px"}}>
                    <div className="color-242833">通过Multipass登录</div>
                    <div className="color-7A8499" style={{marginTop:"4px",marginBottom:"12px"}}>启用 Multipass 后，可以与外部客户账户系统集成<a>了解Multipass<ExportOutlined style={{position:"relative",left:"4px"}} /></a></div>
                    <div className="flex-item-box">
                        <Flex justify="space-between" className="flex-item" >
                            <Flex align="center" className="item-left">
                                <h4 style={{marginBottom:"0px",position:"relative",top:"1px"}}>Multipass</h4>
                                <div><DefaultTag text="未连接" /></div>
                            </Flex>
                            <div><Button>连接</Button></div>
                        </Flex>
                    </div>
                </div>
            </Card>
        </Scoped>
    )
}

export default ThirdPartyOnlineShop

const Scoped = styled.div`
    margin-bottom: 20px;
    .ant-radio{
        position: relative;
        top: -10px;
    }
    .divider{
        margin:20px 0px;
    }

    .flex-item-box{
        border: 1px solid #eef1f6;
        border-radius: 6px;
        .flex-item{
            padding: 12px 20px;
            border-bottom: 1px solid #eef1f6;
            .item-left{
                gap: 0 8px;
            }
        }
        .flex-item:last-child{
            border-bottom: none;
        }
    }
    
    .text{
        margin-top: 16px;
    }
`
