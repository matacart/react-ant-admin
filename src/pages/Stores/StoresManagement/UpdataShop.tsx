import { Flex, App, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import cookie from 'react-cookies';
import { useIntl } from "@umijs/max";
import MyButton from "@/components/Button/MyButton";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";

interface VersionType {
    comparison: any;
    local: any;
    server:any;
    update_available:boolean;
}

function UpdataShop({record}:{record:any}){
    
    const { message } = App.useApp();

    const intl = useIntl();

    const [open,setOpen] = useState(false);

    const [versionInfo,setVersionInfo] = useState<VersionType | null>(null);

    const [loading,setLoading] = useState(false);

    // 店铺域名
    let domain_primary:string = "";
    if(record?.domain_primary){
        domain_primary = record.domain_primary;
    }else if(record?.handle){
        domain_primary = `${record.handle}.${JSON.parse(localStorage.getItem("MC_DATA_PLATFORM_INFO") || '{}')?.preview_domain || ''}`
    }

    const handleOk = () => {
        if(!domain_primary){
            message.error('店铺域名未配置')
            return
        }
        setLoading(true)
        axios.post(`https://${domain_primary}/updater.php`,{
            token:cookie.load("token"),
            type:"frontend"
        },{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            console.log(res.data);
            message.success("success");
        }).catch(err=>{
            message.error(err?.response?.data?.message || 'error');
        }).finally(()=>{
            setLoading(false);
            setOpen(false);
        });
    };
    // 本地无法访问跨域请求
    const checkUpdate = () => {
        if(!domain_primary){
            message.error('店铺域名未配置')
            return
        }
        axios.post(`https://${domain_primary}/version_checker.php`,{
            token:cookie.load("token"),
            type:"frontend"
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            setVersionInfo(res.data.data)
            setOpen(true)
        }).catch(err=>{
            setVersionInfo(null)
            message.error("失败")
        })
    }
    return(
      <>
        <MyButton text={'更新'} onClick={checkUpdate}/>
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


export default UpdataShop;