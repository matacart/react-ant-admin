import { Avatar, Button, Flex, Input, theme } from "antd";
import styled from "styled-components";
import { Ping, Question, SelectLang } from "../RightContent";
import SelectDomain from "../RightContent/SelectDomain";
import { AvatarDropdown, AvatarName } from "../RightContent/AvatarDropdown";
import { GlobalOutlined, SearchOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { useEffect, useState } from 'react';
import { currentUserStatus } from "@/services/y2/api";
import { classNames } from 'classnames';


// const { token } = theme.useToken();

function Header({stores,initialState,domainStatus}){

    const [timer,setTimer] = useState(999);

    const goMerchantApplication = ()=>{
        history.push("/stores/merchantApplication")
    }
    useEffect(()=>{
        domainStatus.code == 0 && setTimer(parseInt((domainStatus?.data.package.end_time*1000 - Date.now())/1000/60/60/24))
    },[])
    return(
        <Scoped>
            {/* {stores == "/stores/"?<></>:<Input prefix={<SearchOutlined />} style={{maxWidth:"600px",minWidth:"100px"}} placeholder="搜索" />} */}
            { domainStatus.code == 1 ? 
                <Flex className="tips-box" justify="center" align="center">
                <div className="color-FFFFFF">未认证！请先进行账号认证</div>
                <Button className="tips-box-btn" onClick={goMerchantApplication}>账号认证</Button>
            </Flex>:""}
            { domainStatus.code == 2 ? 
                <Flex className="tips-box" justify="center" align="center">
                <div className="color-FFFFFF">未开通店铺！请先开通店铺</div>
                <Button className="tips-box-btn" onClick={()=>{}}>创建店铺</Button>
            </Flex>:<></>}
            { domainStatus.code == 3 ?
                <Flex className="tips-box" justify="center" align="center">
                <div className="color-FFFFFF">店铺已到期！购买套餐后恢复使用</div>
                <Button className="tips-box-btn" onClick={()=>{}}>选择套餐</Button>
            </Flex>:<></>}
            { domainStatus.code == 4 ? 
                <Flex className="tips-box" justify="center" align="center">
                <div className="color-FFFFFF">店铺已停用！</div>
                <Button className="tips-box-btn" onClick={()=>{}}>选择套餐</Button>
            </Flex>:<></>}
            { domainStatus.code == 0 && timer<15 ? 
                <Flex className="tips-box" justify="center" align="center">
                <div className="color-FFFFFF">{timer == 0?"你的套餐剩余时间不足1天":"你的套餐剩余"+timer+"天"}</div>
                <Button className="tips-box-btn" onClick={()=>{}}>选择套餐</Button>
            </Flex>:""}
            
            <Flex justify='space-between' style={{padding:"0 16px",height:"60px"}}>
                <div className="mc-header-left-content" style={{display:"flex",alignItems:"center",width:"240px"}}>
                    <div><GlobalOutlined className="font-24" /></div>
                    <h1 style={{fontSize:"18px",marginLeft:"12px"}} className="cursor-pointer" onClick={()=>history.push("/")}>MataCart</h1>
                </div>
                <div className="mc-header-left-content" style={{flex:"1 1 0%",textAlign:"center",position:"relative",left:"-60px"}}>
                    {stores == "/stores/"?<></>:<Input prefix={<SearchOutlined />} style={{maxWidth:"600px",minWidth:"100px"}} placeholder="搜索" />}
                </div>
                <Flex className="mc-header-left-content" align='center'>
                    <div className="item">{stores == "/stores/"?<></>:<SelectDomain/>}</div>
                    <div className="item"><Question key="doc" /></div>
                    <div className="item"><SelectLang key="SelectLang" /></div>
                    <div className="item"><Ping key="Ping" /></div>
                    <div style={{margin:"0 20px"}} className="cursor-pointer"><AvatarDropdown>{<Avatar src={initialState?.currentUser?.avatar} />} <AvatarName /></AvatarDropdown></div>
                </Flex>
            </Flex>
        </Scoped>
    )
}

export default Header;

const Scoped = styled.div`
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
            padding:8px;
            width: auto;
            line-height: 0;
        }
        .item:hover{
            background-color: rgba(0, 0, 0, 0.03)
        }
    }

`