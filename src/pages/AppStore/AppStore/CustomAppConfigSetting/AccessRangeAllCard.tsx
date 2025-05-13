import { useGroupArray } from "@/hooks/customHooks";
import customAppConfigSetting from "@/store/appStore/customAppConfigSetting";
import { SearchOutlined } from "@ant-design/icons"
import { Button, Card, Checkbox, Flex, Input, Table, TableProps, Tabs, TabsProps } from "antd"
import { status } from "nprogress";
import { useEffect, useState } from "react";
import styled from "styled-components"

interface DataType {
    key: string;
    title: string;
    desc: string;
    content:any;
}

function AccessRangeAllCard(){

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render: (value,record) => <div>
                <div style={{marginBottom:"8px"}}><Checkbox checked={record.content.every((item:any)=> item.is_authorized == "1")} onChange={(e)=>{
                    let newId:string[] = []
                    const newData = data.map((item:any)=>{
                        if(item.key === record.key){
                            const newContent = item.content.map((items:any)=>{
                                newId.push(items.id)
                                return {
                                    ...items,
                                    is_authorized: e.target.checked ? "1" : "0"
                                }
                            })
                            return {
                                ...item,
                                content: newContent
                            }
                        }
                        return item
                    })
                    setData(newData)
                    customAppConfigSetting.setNewPermissionsList(customAppConfigSetting.newPermissionsList.map((data:any)=>{
                        if(newId.includes(data.id)){
                            return{
                                ...data,
                                is_authorized: e.target.checked ? "1" : "0"
                            }
                        }
                        return data
                    }))
                }}><span className="color-242833 font-16">{value}</span></Checkbox></div>
                <div className="color-474F5E font-14" style={{marginLeft:"24px"}}>{record.desc}</div>
            </div>
        },
        {
            title: 'content',
            dataIndex: 'content',
            key: 'content',
            render: (value,record) => <Flex gap={60}>
                {record.content.map((res:any)=>{
                    return(
                        <Checkbox checked={res.is_authorized == "1"?true:false} onChange={(e)=>{
                            let newId = "";
                            const newData = data.map((item)=>{
                                if(item.key === record.key){
                                    const newContent = item.content.map((items:any)=>{
                                        if(items.id == res.id){
                                            newId = items.id
                                            return {
                                                ...items,
                                                is_authorized: e.target.checked ? "1" : "0"
                                            }
                                        }
                                        return items
                                    })
                                    return {
                                        ...item,
                                        content: newContent
                                    }
                                }
                                return item
                            })
                            setData(newData)
                            customAppConfigSetting.setNewPermissionsList(customAppConfigSetting.newPermissionsList.map((data:any)=>{
                                if(data.id == newId){
                                    return{
                                        ...data,
                                        is_authorized: e.target.checked ? "1" : "0"
                                    }
                                }
                                return data
                            }))
                        }}>{res.permission_name}</Checkbox>
                    )
                })}
            </Flex>,
        },
    ];

    const [data,setData] = useState<DataType[]>([])

    useEffect(()=>{
        const newPermissionsList= useGroupArray(customAppConfigSetting.permissionsList,"group_id")
        const newData = Object.keys(newPermissionsList).map(key => {
            return {
                key: key,
                title: newPermissionsList[key][0].group_name,
                desc: newPermissionsList[key][0].group_description,
                content: newPermissionsList[key]
            }
        })
        setData(newData)
    },[])

    return(
        <Scoped>
            <div>
                <Input style={{width:"360px"}} placeholder="请输入权限点或描述" prefix={<SearchOutlined />} />
            </div>
            <div>
                <Checkbox checked={data.every((item:any)=> item.content.every((items:any)=> items.is_authorized == "1"))} onChange={(e)=>{
                    const newData = data.map((item)=>{
                        const newContent = item.content.map((items:any)=>{
                            return {
                                ...items,
                                is_authorized: e.target.checked ? "1" : "0"
                            }
                        })
                        return {
                            ...item,
                            content: newContent
                        }
                    })
                    setData(newData)
                    customAppConfigSetting.setNewPermissionsList(customAppConfigSetting.newPermissionsList.map((data:any)=>{
                        return{
                            ...data,
                            is_authorized: e.target.checked ? "1" : "0"
                        }
                    }))
                }} className="checked-all" style={{marginBottom:"16px"}}>全选</Checkbox>
                <div className="table-box">
                    <Table<DataType>
                        columns={columns} 
                        showHeader={false} 
                        dataSource={data}
                        pagination={false}
                    />
                </div>
            </div>
        </Scoped>
    )
}

export default AccessRangeAllCard

const Scoped = styled.div`
    .checked-all{
        margin-top: 20px;
    }

    .table-box{
        max-height: 508px;
        overflow-y: auto;
        .ant-table-cell{
            padding-left: 0;
        }
        /* .ant-checkbox-wrapper{
            position: relative;
            top: -14px;
        } */
    }
    
`

