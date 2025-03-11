import { SearchOutlined } from "@ant-design/icons"
import { Button, Card, Checkbox, Input, Table, TableProps, Tabs, TabsProps } from "antd"
import { useState } from "react";
import styled from "styled-components"
import { check } from 'prettier';
import { set } from "lodash";


interface DataType {
    key: string;
    title: string;
    desc: string;
    isEdit:string;
    isInquire:string;
}

function AccessRangeAllCard(){

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render: (value,record) => <div>
                <div style={{marginBottom:"8px"}}><Checkbox checked={record.isEdit == "1" && record.isInquire == "1"} onChange={(e)=>{
                    const newData = data.map((item)=>{
                        if(item.key === record.key){
                            return {
                                ...item,
                                isEdit: e.target.checked ? "1" : "0",
                                isInquire: e.target.checked ? "1" : "0"
                            }
                        }
                        return item
                        
                    })
                    setData(newData)
                }}><span className="color-242833 font-16">{value}</span></Checkbox></div>
                <div className="color-474F5E font-14" style={{marginLeft:"24px"}}>{record.desc}</div>
            </div>
        },
        {
            title: 'isEdit',
            dataIndex: 'isEdit',
            key: 'isEdit',
            render: (value,record) => <div>
                <div style={{marginTop:"30px"}}>
                    <Checkbox onChange={(e)=>{
                        const newData = data.map((item)=>{
                            if(item.key === record.key){
                                return {
                                    ...item,
                                    isEdit: e.target.checked ? "1" : "0",
                                }
                            }
                            return item
                            
                        })
                        setData(newData)
                    }} checked={record.isEdit == "1"}>编辑{record.title}</Checkbox>
                </div>
            </div>,
        },
        {
            title: 'isInquire',
            dataIndex: 'isInquire',
            key: 'isInquire',
            render: (value,record) => <div>
                <div style={{marginTop:"30px"}}>
                    <Checkbox onChange={(e)=>{
                        const newData = data.map((item)=>{
                            if(item.key === record.key){
                                return {
                                    ...item,
                                    isInquire: e.target.checked ? "1" : "0",
                                }
                            }
                            return item
                            
                        })
                        setData(newData)
                    }} checked={record.isInquire == "1"}>查询{record.title}</Checkbox>
                </div>
            </div>,
        },
       
    ];

    const [data,setData] = useState([
        {
            key: '1',
            title: '商品',
            desc:"查看或管理商品、商品变种和分类",
            isEdit:"0",
            isInquire:"0"
        },
        {
            key: '2',
            title: '订单',
            desc:"查看或管理订单、交易、发货、弃单和结账",
            isEdit:"0",
            isInquire:"0"
        },
    ])

    return(


        <Scoped>
            <div>
                <Input style={{width:"360px"}} placeholder="请输入权限点或描述" prefix={<SearchOutlined />} />
            </div>
            <div>
                <Checkbox checked={data.every((item)=> item.isEdit == "1" && item.isInquire == "1")} onChange={(e)=>{
                    const newData = data.map((item)=>{
                        return {
                            ...item,
                            isEdit: e.target.checked ? "1" : "0",
                            isInquire: e.target.checked ? "1" : "0",
                        }
                    })
                    setData(newData)
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

