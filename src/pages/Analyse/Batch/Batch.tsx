import { ArrowLeftOutlined } from '@ant-design/icons'
import { Card, Tabs } from 'antd'
import styled from 'styled-components';
import { history } from '@umijs/max';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import type { TabsProps } from 'antd';
import BatchList from './BatchList';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';

function NewPage(){

    const [isSkeleton,setIsSkeleton] = useState(true)

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '全部',
            children: <BatchList status={""} />,
        },
        {
            key: '2',
            label: '排队中',
            children: <BatchList status={"pending"} />,
        },
        {
            key: '3',
            label: '执行中',
            children: <BatchList status={"in_progress"} />,
        },
        {
            key: '4',
            label: '执行失败',
            children: <BatchList status={"failed"} />,
        },
        {
            key: '5',
            label: '部分失败',
            children: <BatchList status={"part_fail"} />,
        },
        {
            key: '6',
            label: '执行异常',
            children: <BatchList status={"exception"} />,
        },
        {
            key: '7',
            label: '执行完成',
            children: <BatchList status={"completed"} />,
        },
    ];

    const onChange = (key: string)=>{
    }

    useEffect(()=>{
        setIsSkeleton(false)
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
                        <Tabs defaultActiveKey="1" destroyOnHidden={true} items={items} onChange={onChange} />
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