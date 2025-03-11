import { ExportIcon } from "@/components/Icons/Icons";
import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Divider, Flex, message, Select, Switch, Table, TableProps } from "antd";
import { observer } from "mobx-react-lite";
import accountManagement from "@/store/shops/accountManagementStore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { setUserSharing } from "@/services/y2/api";


function AgreementAndPolicy() {

    const sharedState = (checked:boolean)=>{
        setUserSharing(checked?"1":"0").then(res=>{
            // console.log(res)
            if(res.code == 0){
                checked?message.success("已开启"):message.success("已关闭")
                accountManagement.setUser({...accountManagement.user,data_sharing:checked?"1":"0"})
            }else{
                message.error("修改失败")
            }
        })
    }
    
    // 注册时间
    const regTime = dayjs(accountManagement.user.reg_time*1000).format("YYYY-MM-DD HH:mm:ss")
    // 操作时间
    const dataSharingTime = dayjs(accountManagement.user.data_sharing_time*1000).format("YYYY-MM-DD HH:mm:ss")
    return (
        <Scoped>
            <Card>
                <div className="color-242833">当前账号于{regTime}完成账号注册并勾选<a href="https://www.matacart.com/xieyi.html" target="_blank" className="color-356DFF" style={{margin:"0 8px"}}>用户协议<ExportIcon className="font-16" /></a>与<a href="https://www.matacart.com/privacy.html" target="_blank" className="color-356DFF" style={{margin:"0 8px"}}>隐私政策<ExportIcon className="font-16" /></a></div>
                <Divider className="divider" />
                <div style={{marginBottom:"8px"}}>共享数据</div>
                <div className="color-474F5E">您的账号在 MataCart 后台的操作数据，将共享给 MataCart 官方的分析工具。您共享的数据将有助于我们改善产品、开展与您更加相关的营销活动、为您提供个性化的推荐等。</div>
                <Flex className="switch-box">
                    <Switch checked={accountManagement.user.data_sharing == "1"?true:false} onChange={(checked)=>sharedState(checked)} />
                    {accountManagement.user.data_sharing == "1" ? <div className="color-474F5E switch-text">已开启<span className="font-12 color-7A8499">（于 {accountManagement.user.data_sharing_time == null?regTime:dataSharingTime} 手动操作开启）</span></div>:<div className="color-474F5E switch-text">已关闭<span className="font-12 color-7A8499">（于 {accountManagement.user.data_sharing_time == null?regTime:dataSharingTime} 手动操作关闭）</span></div>}
                </Flex>
            </Card>
        </Scoped>
    )

}
// updateUserSharing

export default observer(AgreementAndPolicy);

const Scoped = styled.div`
    margin-bottom: 20px;

    .divider{
        margin:12px 0;
    }

    .switch-box{
        margin-top: 20px;
        .switch-text{
            margin-left: 12px;
        }
    }

`
