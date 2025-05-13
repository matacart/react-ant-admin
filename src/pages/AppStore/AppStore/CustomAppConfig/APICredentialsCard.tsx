import { Button, Card, Flex, Input, message } from "antd"
import styled from "styled-components"
import { history } from "@umijs/max"
import copy from "copy-to-clipboard";
import { useEffect } from "react";
import customAppConfig from "@/store/appStore/customAppConfig";
import dayjs from "dayjs";
import DefaultButton from "@/components/Button/DefaultButton";

function APICredentialsCard() {

    return (
        <Scoped>
            <Card>
                <div style={{flex:"1"}}>
                    <div className="font-16 color-242833">访问令牌</div>
                    <div className="474F5E" style={{marginTop:"8px",marginBottom:"12px"}}>您还没有任何访问令牌。若要获取访问令牌，请选择您的后台 API 或者店面 API 的访问范围。</div>
                </div>
                <Flex gap={12}>
                    <DefaultButton text="去配置后台API范围" onClick={()=>history.push("/app-store/custom-app-config-setting?type=2&appId="+customAppConfig.appInfo.app_info.id)} />
                    <DefaultButton text="去配置店面API范围" onClick={()=>history.push("/app-store/custom-app-config-setting?type=1&appId="+customAppConfig.appInfo.app_info.id)} />
                </Flex>
            </Card>
            <Card title="API凭据" extra={<div className="color-474F5E">创建时间：{dayjs(customAppConfig.appInfo.app_info.create_time*1000).format("YYYY-MM-DD HH:mm:ss")}</div>} className="credentials" style={{marginTop:"20px"}}>
                <h3 className="font-16">App Key</h3>
                <Flex align="center">
                    <Input value={customAppConfig.appInfo.app_info.appid} disabled />
                    <div onClick={()=>{
                        copy(customAppConfig.appInfo.app_info.appid)
                        message.success("复制成功")
                    }} className="color-356DFF cursor-pointer" style={{paddingLeft:"24px",whiteSpace:"nowrap"}}>复制</div>
                </Flex>
                <h3 className="font-16">APP Secret</h3>
                <Flex align="center">
                    <Input.Password value={customAppConfig.appInfo.app_info.secret} readOnly className="disable" />
                    <div onClick={()=>{
                        copy(customAppConfig.appInfo.app_info.secret)
                        message.success("复制成功")
                    }} className="color-356DFF cursor-pointer" style={{paddingLeft:"24px",whiteSpace:"nowrap"}}>复制</div>
                </Flex>
            </Card>
        </Scoped>
    )
}

export default APICredentialsCard

const Scoped = styled.div`
    .credentials{
        h3{
            margin: 8px 0 10px 0;
        }
        h3:first-child{
            margin-top: 0;
        }
        .disable{
            color: rgba(0, 0, 0, 0.25);
            background-color: rgba(0, 0, 0, 0.04);
            border-color: #d9d9d9;
            box-shadow: none;
            opacity: 1;
            input{
                cursor: not-allowed !important;
            }
        }
        .disable:hover{
            /* display: none; */
            
        }
    }
`