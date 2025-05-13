import DefaultButton from "@/components/Button/DefaultButton";
import DefaultTag from "@/components/Tag/DefaultTag";
import WarningTag from "@/components/Tag/WarningTag";
import { getTaskList, JobExecResult } from "@/services/y2/api";
import { Card, Flex, Space, Table, TableProps, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dayjs from 'dayjs';
import { classNames } from 'classnames';

interface DataType {
    failed_count: string;
    success_count: number;
    id: string;
    task_name: string;
    task_type: string;
    task_status: string;
    started_time:string;
    total_count:string;
}

function BatchList({progressData,status}:{progressData:any,status:string}){

    const initialRef = useRef(true)

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '执行项目',
            dataIndex: 'task_name',
            key: 'task_name',
            width: 200,
            render: (text) => <div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"160px"}}>{text}</div>,
        },
        {
            title: '类型',
            width:80,
            dataIndex: 'task_type',
            key: 'task_type',
            render: (text) => <div>{text}</div>,
        },
        {
            title: '状态',
            width: 100,
            dataIndex: 'task_status',
            key: 'task_status',
            render: (text) => <div>
                {text == "completed" && <DefaultTag text={"执行完成"} />}
                {text == "pending" && <WarningTag text={"排队中"} textStyle={{color:"#F49300"}} />}
                {text == "in_progress" && <WarningTag text={"执行中"} textStyle={{color:"#F49300"}} />}
            </div>,
        },
        {
            title: '开始时间',
            width: 180,
            dataIndex: 'started_time',
            key: 'started_time',
            render: (text) => <div style={{whiteSpace:"nowrap"}}>
                {text?dayjs(parseInt(text)*1000).format('YYYY-MM-DD HH:mm:ss'):"-"}
            </div>,
        },
        {
            title: '结束时间',
            width: 180,
            dataIndex: 'completed_time',
            key: 'completed_time',
            render: (text) => <div style={{whiteSpace:"nowrap"}}>
                {text?dayjs(parseInt(text)*1000).format('YYYY-MM-DD HH:mm:ss'):"-"}
            </div>,
        },
        {
            title: '结果总览',
            width: 180,
            dataIndex: 'address',
            key: 'address',
            render: (value,record) => <div>
                <div>已执行: {record.total_count}</div>
                <div>成功/失败：{(record.success_count??0)+"/"+(record.failed_count??0)}</div>
            </div>,
        },
        {
            title: '结果导出',
            width: 180,
            key: 'action',
            render: (_, record) => (
                <Flex vertical gap={8}>
                    <DefaultButton text="全部记录" onClick={()=>{
                        JobExecResult(record.id).then(res=>{
                            // console.log(res)
                            // 转为blob对象
                            const blob = new Blob([res])
                            // 为blob创建URL
                            const csvUrl = URL.createObjectURL(blob);
                            // 创建a标签 触发浏览器触发下载
                            let link = document.createElement('a'); 
                            link.download = `${record.task_name}.${record.file_ext}`; //文件名字 
                            link.href = csvUrl;
                            link.click();
                        })
                    }} />
                    {/* <DefaultButton text="失败记录" /> */}
                </Flex>
            ),
        },
    ];

    const [loading,setLoading] = useState(false)

    const [data,setData] = useState(progressData.data)

    const [pagination,setPagination] = useState({
        page: 1,
        pageSize: 10,
        total: progressData.count,
    })

    // 获取批处理进度
    const fetchProgressList = (page:number,limit:number,status:string)=>{
        setLoading(true)
        getTaskList(page,limit,status).then(res=>{
          setData(res.data)
          setPagination({
            ...pagination,
            page: page,
            pageSize: limit,
            total: res.count,
          })
        }).catch(err=>{
    
        }).finally(()=>{
          setLoading(false)
        })
    }

    useEffect(()=>{
        // if (initialRef.current) { 
        //     // 跳过首次加载
        //     initialRef.current = false
        // } else {
        // 执行请求
        fetchProgressList(pagination.page,pagination.pageSize,status)
        // }
    },[status])

    return(
        <Scoped>
            <Table<DataType> scroll={{x:1100}}
            loading={loading}
            pagination={{
                ...pagination,
                showSizeChanger: true,
                onChange: (page, pageSize) => {
                    fetchProgressList(page,pageSize,status)
                },
            }}
            columns={columns} dataSource={data} />
        </Scoped>
    )

}


const Scoped = styled.div`
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`

export default BatchList;