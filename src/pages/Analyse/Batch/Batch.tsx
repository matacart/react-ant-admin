import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Drawer, Flex, Form, FormInstance, Input, message, Select, Tabs } from 'antd'
import styled from 'styled-components';
import { history } from '@umijs/max';
import { observer } from 'mobx-react-lite';
import { useSleep } from '@/hooks/customHooks';
import { useEffect, useRef, useState } from 'react';
import customPage from '@/store/channel/customPage/customPage';
import type { TabsProps } from 'antd';
import BatchList from './BatchList';
import { getTaskList } from '@/services/y2/api';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { status } from 'nprogress';

function NewPage(){

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [progressData,setProgressData] = useState([]);

    const [status,setStatus] = useState("");

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '全部',
            children: <BatchList progressData={progressData} status={status} />,
        },
        {
            key: '2',
            label: '排队中',
            children: <BatchList progressData={progressData} status={status} />,
        },
        {
            key: '3',
            label: '执行中',
            children: <BatchList progressData={progressData} status={status} />,
        },
        {
            key: '4',
            label: '执行失败',
            children: <BatchList progressData={progressData} status={status}/>,
        },
        {
            key: '5',
            label: '部分失败',
            children: <BatchList progressData={progressData} status={status} />,
        },
        {
            key: '6',
            label: '执行异常',
            children: <BatchList progressData={progressData} status={status} />,
        },
        {
            key: '7',
            label: '执行完成',
            children: <BatchList progressData={progressData} status={status} />,
        },
    ];

    const onChange = (key: string)=>{
        switch(key){
            case "1":
                setStatus("")
                break;
            case "2":
                setStatus("pending")
                break;
            case "3":
                setStatus("'in_progress")
                break;
            case "4":
                setStatus("failed")
                break;
            case "5":
                setStatus("part_fail")
                break;
            case "6":
                setStatus("exception")
                break;
            case "7":
                setStatus("completed")
                break;
        }
    }

    useEffect(()=>{
        getTaskList(1,10,"").then(res=>{
            setProgressData(res)
        }).catch((err)=>{
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>history.go(-1)}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">批量处理进度</div>
                        </div>
                    </div>
                    <Card>
                        <Tabs defaultActiveKey="1" destroyInactiveTabPane={true} items={items} onChange={onChange} />
                    </Card>
                </div>
            </div>}
        </Scoped>
    )
}

export default observer(NewPage)

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: max(75%,1200px);
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
                    font-size: 20px;
                }
            }
        }
    }
}
`