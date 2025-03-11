import { ArrowLeftOutlined, ExportOutlined, InfoCircleFilled, SearchOutlined } from "@ant-design/icons"
import { Button, Card, ConfigProvider, Divider, Flex, Form, Input, List, message, Modal, Select, Table, TableProps, Tabs, TabsProps } from "antd"
import { history, useParams } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react"
import dayjs from 'dayjs';
import WarningTag from "@/components/Tag/WarningTag"
import PermissionConfigurationCard from "./PermissionConfigurationCard"
import APICredentialsCard from './APICredentialsCard';
import AppSettingsCard from "./AppSettingsCard"
import OperationRecordCard from "./OperationRecordCard"
import { getAppInfo } from "@/services/y2/api"
import customAppConfig from "@/store/appStore/customAppConfig"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { observer } from "mobx-react-lite"

function CustomAppConfig() {

    // 路由配置
    const params  = useParams();
    
    const [isSkeleton,setIsSkeleton] = useState(true)
    
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: <div className="font-16 color-242833">权限配置</div>,
          children: <PermissionConfigurationCard />,
        },
        {
          key: '2',
          label: <div className="font-16 color-242833">API凭据</div>,
          children: <APICredentialsCard />,
        },
        {
          key: '3',
          label: <div className="font-16 color-242833">应用设置</div>,
          children: <AppSettingsCard />,
        },
        {
            key: '4',
            label: <div className="font-16 color-242833">操作记录</div>,
            children: <OperationRecordCard />,
        },
    ];

    useEffect(()=>{
        params.id !== undefined && getAppInfo({id:params.id,langId:"2"}).then(res=>{
            if(res.code == 0){
                customAppConfig.setAppInfo(res.data)
                setIsSkeleton(false)
            }
        })
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/app-store/custom-app")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">
                                <Flex className="font-20 font-w-600" align="center">
                                    <div>{customAppConfig.appInfo.app_info.app_name}</div>
                                    <div style={{marginTop:"-4px",marginLeft:"12px"}}><WarningTag text={"未安装"} /></div>
                                </Flex>
                                <div style={{marginTop:"8px"}} className="font-14 font-w-500">开发者：员工(123456)</div>
                            </div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Tabs defaultActiveKey="1" items={items} onChange={()=>{}} />
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default observer(CustomAppConfig)

const Scoped = styled.div`
    .ant-tabs-nav::before{
        border-bottom: 1px solid #d7dbe7;
    }


.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-secondary {
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }

                }
                &-content {
                    margin-left: 12px;
                }
            }
        }
    }
}
`