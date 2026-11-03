import MyInput from "@/components/Input/MyInput"
import customFreight from "@/store/settings/ShippingAndDistribution/customFreight"
import { Card, Form, FormInstance } from "antd"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import styled from "styled-components"


function GroupNameCard({form}:{form:FormInstance}) {

    useEffect(()=>{
        form.setFieldsValue({
            groupName:customFreight.productGroupDetail?.name || ""
        })
    },[customFreight.productGroupDetail])
    
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Form form={form} layout="vertical">
                    <Form.Item name="groupName" required={false} label={<div className="color-242833 font-16 font-w-600">分组方案名称<span className="color-7A8499 font-14 font-w-400">（该名称不会展示给客户查看）</span></div>}>
                        <MyInput style={{height:"36px"}} placeholder="请输入分组方案名称" />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

export default observer(GroupNameCard)

const Scoped = styled.div`
    .card{
        padding-bottom: 4px;
    }
`