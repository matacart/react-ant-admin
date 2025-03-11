import { ArrowLeftOutlined, ExportOutlined, InfoCircleFilled, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Flex, Input, List, Modal, Table, TableProps, TabsProps } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import BlankPage from "./BlankPage"
import { useEffect, useState } from "react"
import { getAppStores } from "@/services/y2/api"

import dayjs from 'dayjs';
import AppList from "./AppList"

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

function CustomApp() {

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '应用名称',
          dataIndex: 'app_name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: '应用状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
          render: (text) => <div>{dayjs(text*1000).format("YYYY-MM-DD HH:mm:ss")}</div>,
        },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Flex gap={32}>
                <div className="color-356DFF cursor-pointer" onClick={()=>history.push("/app-store/custom-app-config/"+record.id)}>编辑</div>
                <div className="color-7A8499 cursor-pointer">卸载</div>
                <div className="color-F86140 cursor-pointer">删除</div>
            </Flex>
          ),
        },
    ];

    const [data,setData] = useState<null | []>(null)

    useEffect(()=>{
        getAppStores().then(res=>{
            console.log(res)
            res.code == 0 && setData(res.data)
        })
    },[])

    return (
        <Scoped>
            {data == null && <></>}
            {(data !== null && data.length == 0 ) ? <BlankPage />:<AppList />}
        </Scoped>
    )
}

export default CustomApp

const Scoped = styled.div`

.ant-table{
    border: 1px solid #eef1f7;
    border-radius: 6px;
    border-bottom: none;
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