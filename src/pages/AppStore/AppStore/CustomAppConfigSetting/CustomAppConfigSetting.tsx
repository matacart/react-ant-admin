import { ArrowLeftOutlined, ExportOutlined, InfoCircleFilled, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Flex, Form, Input, List, message, Modal, Select, Table, TableProps, TabsProps } from "antd"
import { history, useParams, useSearchParams } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { creatAppStore, getEmployeeList, getPermissionsList } from "@/services/y2/api"
import AccessRangeCard from "./AccessRangeCard"
import WebHookSubscriptionTable from "./WebHookSubscriptionTable"
import customAppConfigSetting from "@/store/appStore/customAppConfigSetting"
import { observer } from "mobx-react-lite"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { set } from "lodash"
import ModifyModal from "@/components/Modal/ModifyModal"
import PrimaryButton from "@/components/Button/PrimaryButton"



function CustomAppConfigSetting() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [isSkeleton,setIsSkeleton] = useState(true)

    const contentForm = (
        <Form style={{padding:"20px 0 10px 0"}} layout="vertical">
            <Form.Item label="事件名称">
            <Select disabled />
            </Form.Item>
            <Form.Item label="通知URL">
            <Input />
            </Form.Item>
            <Form.Item label="事件版本">
            <Select />
            </Form.Item>
        </Form>
    )

    // 获取权限列表
    const fetchPermissionsList = async ()=>{
        try {
            const permissionsList = await getPermissionsList(searchParams.get("appId")?? "",searchParams.get("type")?? "","2")
            customAppConfigSetting.setPermissionsList(permissionsList.data)
            console.log(permissionsList.data)
            customAppConfigSetting.setNewPermissionsList(permissionsList.data)
        } catch (error) {
            // 
        }finally{
            setIsSkeleton(false)
        }
    }

    useEffect(()=>{
        searchParams.get("type") == "2" && customAppConfigSetting.setAccessRangeTitle("后台 API 权限编辑")
        searchParams.get("type") == "1" && customAppConfigSetting.setAccessRangeTitle("店面 API 权限编辑")
        fetchPermissionsList()
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.go(-1)
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">{customAppConfigSetting.accessRangeTitle}</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <AccessRangeCard />
                            {searchParams.get("type") == "2" && <Card title="WebHook订阅" extra={
                                <ModifyModal
                                    okFun={()=>{}}
                                    title={<div className="color-242833">创建WebHook</div>}
                                    okText="保存"
                                    tElement={<PrimaryButton text="创建WebHook" />}
                                    content={contentForm} 
                                />
                            }>
                                <WebHookSubscriptionTable />
                            </Card>}
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default CustomAppConfigSetting

const Scoped = styled.div`

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
                    display: flex;
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
        }
        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .card{
                padding: 0;
            }
            .divider{
                margin:0px;
            }
            .item:hover{
                background-color: #f0f7ff;
            }
            .tips{
                border: 1px solid rgba(53, 109, 255, .2);
                background-color: #e2f0ff;
                padding: 16px 16px;
                border-radius: 4px;
            }

        }
        &-extra {
            flex:1;
            min-width: 285px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .ant {
                &-card {
                    background-color: #f7f8fb;
                }
            }
        }
    }
}
`