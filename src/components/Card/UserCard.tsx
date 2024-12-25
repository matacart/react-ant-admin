import { logout } from "@/services/y2/api";
import { RightOutlined, SafetyCertificateOutlined, TrademarkOutlined, WalletOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { history } from '@umijs/max';
import { stringify } from 'querystring';
import styled from "styled-components";
import { useEffect } from "react";
import cookie from 'react-cookies'

export default function UserCard(props:any) {
    /**
     * 退出登录，并且将当前的 url 保存
     */
    const loginOut = async () => {

        // 清除缓存
        sessionStorage.removeItem("domain");
        await logout();
        let test = window.location.hostname.slice(window.location.hostname.indexOf("."))
        cookie.remove("token",{domain:test,path:"/"})
        const { search, pathname } = window.location;
        const urlParams = new URL(window.location.href).searchParams;

        /** 此方法会跳转到 redirect 参数所在的位置 */
        const redirect = urlParams.get('redirect');
        // Note: There may be security issues, please note
        if (window.location.pathname !== '/user/signIn' && !redirect) {
        history.replace({
            pathname: '/user/signIn',
            search: stringify({
            redirect: pathname + search,
            }),
        });
        }
    };
    return (
        <Scoped>
            <div>
                <div className="account">
                    <Flex justify='space-between'>
                        <div style={{display:"flex",fontSize:"14px",alignItems:"center"}}>
                            <TrademarkOutlined style={{marginRight:"8px"}} />
                            <span style={{fontWeight:600}}>账号</span>
                            <RightOutlined style={{marginLeft:"8px", width:"10px"}} />
                        </div>
                        <a onClick={loginOut} className="quit">退出登录</a>
                    </Flex>
                    <Flex style={{marginTop:"12px"}}>
                        <div className="user_img"><img src="https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg"/></div>
                        <div className="user_info">
                            <div style={{fontSize:"14px"}}>{props.currentUser.name}</div>
                            <div>账号 ID：{props.currentUser.userid}</div>
                            <div className="user_info_tag">
                                <span>主账号</span>
                                <span>个人认证</span>
                            </div>
                        </div>
                    </Flex>
                </div>
                <div className="account">
                    <Flex>
                    <div style={{display:"flex",fontSize:"14px",alignItems:"center"}}>
                            <SafetyCertificateOutlined style={{marginRight:"8px"}} />
                            <span style={{fontWeight:600}}>权限与安全</span>
                            {/* <RightOutlined style={{marginLeft:"8px", width:"10px"}} /> */}
                        </div>
                    </Flex>
                    <Flex>
                        <div className="secure_tag">
                            <span>安全管控</span>
                            <div style={{display:"inline-block",borderRight:"1px solid #E9E9E9", height:"10px", margin:"0 8px"}}></div>
                            <span>访问控制</span>
                            <div style={{display:"inline-block",borderRight:"1px solid #E9E9E9", height:"10px", margin:"0 8px"}}></div>
                            <span>AccessKey</span>
                        </div>
                    </Flex>
                </div>
                <div className="account">
                    <Flex>
                    <div style={{display:"flex",fontSize:"14px",alignItems:"center"}}>
                            <WalletOutlined style={{marginRight:"8px"}} />
                            <span style={{fontWeight:600}}>费用与成本</span>
                            <RightOutlined style={{marginLeft:"8px", width:"10px"}} />
                        </div>
                    </Flex>
                    <div>
                        <div className="balance">
                            <div>可用额度</div>
                            <div>
                                <span className="span1">¥ -0.74</span>
                                <span style={{display:"inline-block",width:"8px"}}></span>
                                <span className="span2">充值</span>
                            </div>
                        </div>
                        <div className="expense">
                            <div>
                                <span>本月账单</span>
                                <span style={{display:"inline-block",width:"8px"}}></span>
                                <span style={{color:"#999"}}>持续出账中</span>
                            </div>
                            <div>
                                <span className="span1">查看</span>
                                <span style={{display:"inline-block",width:"8px"}}></span>
                                <span className="span2">成本管理</span>
                            </div>
                        </div>
                        <Flex className="item-second">
                            <div>
                                <div>待支付</div>
                                <div className="span1">0</div>
                            </div>
                            <div>
                                <div>待续费</div>
                                <div className="span1">0</div>
                            </div>
                            <div>
                                <div>待办工单</div>
                                <div className="span1">0</div>
                            </div>
                            <div>
                                <div>未读消息</div>
                                <div className="span1">0</div>
                            </div>
                        </Flex>
                        <div className="item-third">
                            <div>常用工具</div>
                            <Flex>
                                <div className="secure_tag">
                                    <span>发票</span>
                                    <div style={{display:"inline-block",borderRight:"1px solid #E9E9E9", height:"10px", margin:"0 8px"}}></div>
                                    <span>合同</span>
                                    <div style={{display:"inline-block",borderRight:"1px solid #E9E9E9", height:"10px", margin:"0 8px"}}></div>
                                    <span>卡券</span>
                                    <div style={{display:"inline-block",borderRight:"1px solid #E9E9E9", height:"10px", margin:"0 8px"}}></div>
                                    <span>订单</span>
                                    <div style={{display:"inline-block",borderRight:"1px solid #E9E9E9", height:"10px", margin:"0 8px"}}></div>
                                    <span>购物车</span>
                                    <div style={{display:"inline-block",borderRight:"1px solid #E9E9E9", height:"10px", margin:"0 8px"}}></div>
                                    <span>试用</span>
                                </div>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

const Scoped = styled.div`
    width: 320px;
    /* height: 300px; */
    .account{
        border-bottom: 1px solid #E9E9E9;
        padding: 20px;
        font-size: 12px;
        .quit{
            border: 1px solid #999;
            color: #3d3d3d;
            padding: 4px 8px;
            font-weight: 600;
        }
        .quit:hover{
            color: #0084ff;
        }
        .user_img{
            img{
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
            margin-right: 20px;
        }
        .user_info{
            font-size: 12px;
            /* #1366ec */
            .user_info_tag{
                margin-top: 4px;
                span{
                    color: #1366ec;
                    margin-right: 10px;
                    background-color: #e6eefc;
                    padding: 2px 6px;
                    border-radius: 4px;
                }
            }
        }
        .secure_tag{
            margin-top: 8px;
            color: #1366EC;
            font-weight: 600;
        }
        .span1{
            font-weight: 600;
            color:#ff6a00;
            font-size: 16px;
        }
        .span2{
            font-weight: 600;
            color: #1366EC;
            font-size: 12px;
        }
        .balance{
            margin-top: 8px;
        }
        .expense{
            margin-top: 12px;
        }
        .item-second{
            margin-top: 12px;
            &>div{
                margin-right: 24px;
            }
            &>div:last-child{
                margin-right: 0;
            }
        }
        .item-third{
            margin-top: 12px;
        }
    }
`