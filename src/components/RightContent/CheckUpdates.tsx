import { SyncOutlined } from "@ant-design/icons";
import { Flex, message, Modal, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import cookie from 'react-cookies';
import { data } from '@remix-run/router';
import DefaultButton from "../Button/DefaultButton";
import PrimaryButton from "../Button/PrimaryButton";
import { useIntl } from "@umijs/max";

interface VersionType {
    comparison: any;
    local: any;
    server:any;
    update_available:boolean;
}

function CheckUpdates(){

    const intl = useIntl();

    const [open,setOpen] = useState(false);

    const [versionInfo,setVersionInfo] = useState<VersionType | null>(null);

    const [loading,setLoading] = useState(false);

    const url = process.env.NODE_ENV === 'development' ? 'https://admin.matacart.com/' : '/';

    const handleOk = () => {
        setLoading(true)
        axios.post(`${url}updater.php`,{
            token:cookie.load("token")
        },{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            message.success("success");
        }).catch(err=>{
            message.error(err.response.data.message);
        }).finally(()=>{
            setLoading(false);
            setOpen(false);
        });
    };

    // 本地无法访问跨域请求
    const checkUpdate = () => {
        axios.post(`${url}version_checker.php`,{
            token:cookie.load("token")
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            console.log(res.data.data);
            setVersionInfo(res.data.data)
            setOpen(true)
        }).catch(err=>{
            setVersionInfo(null)
            message.error("失败")
        })
    }
  
    return(
      <>
        <Tooltip title={intl.formatMessage({id: 'header.update'})} >
            <div style={{padding:"8px",display:"flex"}} onClick={checkUpdate}>
                <SyncOutlined />
            </div>
        </Tooltip>

        {/*  */}
        <ScopedModal
            title="版本更新"
            centered
            open={open}
            onCancel={()=>setOpen(false)}
            footer={(_, { OkBtn, CancelBtn }) => (
                <Flex gap={12} justify="flex-end">
                    <DefaultButton text="忽略更新" onClick={()=>setOpen(false)} />
                    <PrimaryButton text="立即更新" loading={loading} disabled={versionInfo?.comparison?.server_version == versionInfo?.comparison?.local_version ? true : false} onClick={handleOk} />
                </Flex>
            )}
        >
            <Flex vertical gap={6} style={{marginTop:"20px"}}>
                <div>当前版本：{versionInfo?.local?.current_version}</div>
                <Flex justify="space-between">
                    <div>最新版本：{versionInfo?.comparison?.server_version}</div>
                    {/* <div>更新时间：{versionInfo?.server?.create_time}</div> */}
                </Flex>
                <div className="update-content">
                
                    {versionInfo?.server?.update_content?.description && <>
                        描述：{versionInfo?.server?.update_content?.description}
                    </>}
                </div>
            </Flex>
        </ScopedModal>

      </>
    )
};

const ScopedModal = styled(Modal)`

    .update-content{
        p{
            margin-bottom: 0;
        }
    }

`;


export default CheckUpdates;