import { ArrowLeftOutlined, ExportOutlined, InfoCircleFilled, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Flex, Input, List, Modal, Table, TableProps, TabsProps } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import BlankPage from "./BlankPage"
import { useEffect, useState } from "react"

import dayjs from 'dayjs';
import AppList from "./AppList"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { getDevAppStores } from "@/services/y2/api"

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

function CustomApp() {

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [data,setData] = useState<null | []>(null)

    // 获取应用列表
    const fetchAppList = async ()=>{
        try {
            const appList = await getDevAppStores()
            setData(appList.data)
        }catch(err){
            console.log(err)
        }finally{
            setIsSkeleton(false)
        }
    }

    useEffect(()=>{
        fetchAppList()
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:(data !== null && data.length == 0 ) ? <BlankPage />:<AppList data={data} />}
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