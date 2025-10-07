import { Avatar, Button, Flex, Input, theme } from "antd";
import styled from "styled-components";
import { Ping, Question, SelectLang } from "../RightContent";
import SelectDomain from "../RightContent/SelectDomain";
import { AvatarDropdown, AvatarName } from "../RightContent/AvatarDropdown";
import { GithubOutlined, GlobalOutlined, SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { currentUserStatus } from "@/services/y2/api";
import { useNavigate } from "react-router-dom";
import CheckUpdates from "../RightContent/CheckUpdates";
import cookie from 'react-cookies';
import { useIntl } from "@umijs/max";


function Header({setHeight,url,initialState}:{setHeight:any,url:string,initialState:any}){

    const intl = useIntl();

    const navigate = useNavigate();

    // 剩余天数
    const [timer,setTimer] = useState(999);

    const [userStatus,setUserStatus] = useState<any>({})

    const goMerchantApplication = ()=>{
        navigate("/stores/merchantApplication")
    }
    const goCreateStores = ()=>{
        navigate("/stores/create")
    }

    // 站点配置
    const PLATFORM_INFO = JSON.parse(localStorage["MC_DATA_PLATFORM_INFO"] || "{}")

    useEffect(()=>{
        // 获取用户账号状态信息
        currentUserStatus().then((res:any)=>{
            setUserStatus(res)
            if(res.code == 0){
                const endtimer = parseInt(res.data.package.end_time || 0)
                const RemainTime = Math.floor((endtimer*1000 - Date.now())/1000/60/60/24)
                res.code == 0 && setTimer(RemainTime)
                RemainTime<=15 ? setHeight(100) : setHeight(60)
            }else{
                setHeight(100)
                // 默认店铺
                cookie.save('domain', JSON.stringify({
                    default_currency: "USD",
                    default_lang: "en-us",
                    default_lang_name: "English",
                    domain_name: "",
                    id: "0",
                    package_id: "3",
                    package_name: "高级版",
                    second_domain: "htj4yk94",
                    status: "1",
                    store_logo: "",
                    store_name: "YIKEC",
                    timezone: "Pacific/Honolulu"
                }), { path: '/' });

            }
        }).catch(()=>{
            setHeight(60)
        })
        // 获取商品属性类型
        // getOptionType().then((res:any)=>{
        //     if(res.code == 0){
        //       sessionStorage["productOptionType"] = JSON.stringify(res.data)
        //     }else{
        //     }
        // }).catch(err=>{
        //     console.log("获取商品类型失败")
        // })
    },[])


    return(
        <Scoped>
            <div>
                {userStatus.code == 1 ? 
                    <Flex className="tips-box" justify="center" align="center">
                    <div className="color-FFFFFF">未认证！请先进行账号认证</div>
                    <Button className="tips-box-btn" onClick={goMerchantApplication}>账号认证</Button>
                </Flex>:""}
                { userStatus.code == 2 ? 
                    <Flex className="tips-box" justify="center" align="center">
                    <div className="color-FFFFFF">未开通套餐！请先开通套餐</div>
                    {/* 开通套餐 */}
                    <Button className="tips-box-btn" onClick={()=>navigate(`/stores-subscriptions/list/paid`)}>开通套餐</Button>
                </Flex>:<></>}
                { userStatus.code == 3 ?
                    <Flex className="tips-box" justify="center" align="center">
                    <div className="color-FFFFFF">店铺已到期！购买套餐后恢复使用</div>
                    <Button className="tips-box-btn" onClick={()=>navigate(`/stores-subscriptions/list/paid`)}>选择套餐</Button>
                </Flex>:<></>}
                { userStatus.code == 4 ? 
                    <Flex className="tips-box" justify="center" align="center">
                    <div className="color-FFFFFF">店铺已停用！</div>
                    <Button className="tips-box-btn" onClick={()=>navigate(`/stores-subscriptions/list/paid`)}>选择套餐</Button>
                </Flex>:<></>}
                { userStatus.code == 5 ? 
                    <Flex className="tips-box" justify="center" align="center">
                    <div className="color-FFFFFF">未创建店铺！请先创建店铺</div>
                    <Button className="tips-box-btn" onClick={goCreateStores}>创建店铺</Button>
                </Flex>:<></>}
                { userStatus.code == 0 && timer<=15 ? 
                    <Flex className="tips-box" justify="center" align="center">
                    <div className="color-FFFFFF">{timer == 0?"你的套餐剩余时间不足1天":"你的套餐剩余"+timer+"天"}</div>
                    <Button className="tips-box-btn" onClick={()=>navigate(`/stores-subscriptions/list/paid`)}>选择套餐</Button>
                </Flex>:""}
                <Flex justify='space-between' style={{padding:"0 16px",height:"60px"}}>
                    <div className="mc-header-left-content" style={{display:"flex",alignItems:"center",width:"240px"}}>
                        <div><GlobalOutlined className="font-24" /></div>
                        <h1 style={{fontSize:"18px",marginLeft:"12px"}} className="cursor-pointer" onClick={()=>navigate("/")}>{PLATFORM_INFO.brand_name}</h1>
                    </div>
                    <div className="mc-header-left-content" style={{flex:"1 1 0%",textAlign:"center",position:"relative",left:"-60px"}}>
                        {url == "/stores/"?<></>:<Input prefix={<SearchOutlined />} style={{maxWidth:"600px",minWidth:"100px"}} placeholder={intl.formatMessage({id: 'header.search'})} />}
                    </div>
                    <Flex className="mc-header-left-content" align='center'>
                        {userStatus.code == 0 && url == "/stores/"?<></>:<SelectDomain/>}
                        <div className="item"><Question key="doc" /></div>
                        <div className="item">
                            <div style={{padding:"8px",display:"flex"}} onClick={()=>window.open('https://github.com/matacart/react-ant-admin/tree/master')}>
                                <GithubOutlined key="github" />
                            </div>
                        </div>
                        {/* 检查更新 */}
                        <div className="item"><CheckUpdates /></div>
                        <div className="item"><SelectLang key="SelectLang" /></div>
                        <div className="item"><Ping key="Ping" /></div>
                        <div style={{margin:"0 20px"}} className="cursor-pointer"><AvatarDropdown>{<Avatar src={initialState?.currentUser?.avatar} />} <AvatarName /></AvatarDropdown></div>
                    </Flex>
                </Flex>
            </div>
        </Scoped>
    )
}

export default observer(Header)

const Scoped = styled.div`

    /* position: absolute; */

    .tips-box{
        line-height: 40px;
        height: 40px;
        width: 100%;
        background-color:#f86140;
        .tips-box-btn{
            margin-left: 10px;
            font-size: 12px;
            height: 28px;
            width: 68px;
        }
    }
    .mc-header-left-content{
        line-height: 60px;
        .item{
            cursor: pointer;
        }
        .item:hover{
            background-color: rgba(0, 0, 0, 0.03)
        }
    }

`