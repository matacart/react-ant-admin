import { Button, Card, message, Tabs, TabsProps } from "antd"
import styled from "styled-components"
import AccessRangeAllCard from "./AccessRangeAllCard";
import WebHookSubscriptionTable from "./WebHookSubscriptionTable";
import { useEffect } from "react";
import customAppConfigSetting from "@/store/appStore/customAppConfigSetting";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { upDatePermissionsList } from "@/services/y2/api";
import customAppConfig from "@/store/appStore/customAppConfig";
import { useSearchParams } from "react-router-dom";

function AccessRangeCard(){

    const [searchParams, setSearchParams] = useSearchParams("");

    const appId = searchParams.get("appId")?? "";

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '全部',
          children: <AccessRangeAllCard />,
        },
        {
          key: '2',
          label: '已选(2)',
          children: 'Content of Tab Pane 2',
        },
    ];

    const upDate = ()=>{
        const newPermissionsList = customAppConfigSetting.newPermissionsList.map((item:any)=>{
            return{
                permission_id:item.id,
                status:item.is_authorized
            }
        })
        upDatePermissionsList(appId,JSON.stringify(newPermissionsList)).then(res=>{
            console.log(res)
            message.success("修改成功")
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <Scoped>
            <Card title={customAppConfigSetting.accessRangeTitle} extra={<PrimaryButton onClick={upDate} text="保存" />}>
                <Tabs defaultActiveKey="1" items={items} onChange={()=>{}} />
            </Card>
        </Scoped>
    )
}

export default AccessRangeCard

const Scoped = styled.div`

`

