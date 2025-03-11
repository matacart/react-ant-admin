
import { DownloadIcon, ExportIcon, PrintIcon } from '@/components/Icons/Icons';
import ErrorTag from '@/components/Tag/ErrorTag';
import SuccessTag from '@/components/Tag/SuccessTag';
import WarningTag from '@/components/Tag/WarningTag';
import { history } from '@umijs/max';
import { Button, Card, DatePicker, Dropdown, Flex, Input, MenuProps, Select, Table, TableProps, Tag } from 'antd';
import e from 'express';
import { useState } from 'react';
import { styled } from 'styled-components';


interface DataType {
    key: string;
    name: string;
    startTime:string;
    endTime:string;
    isDefault:string;
    
}

const printItems: MenuProps['items'] = [
    {
      key: '1',
      label:<div onClick={()=>{

      }}>设为默认</div>

    },
    {
      key: '2',
      label:<div className='ota-color-FF0000' onClick={()=>{

      }}>删除</div>
    }
];

function DownloadTable({status}){

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '文件名称',
            dataIndex: 'name',
            key: 'name',
            render: (value,record) => <Flex align='center'>
                <div>{value}</div>
            </Flex>,
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (value) => <div>{value}</div>,
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (value) => <div>{value}</div>,
        },
        {
            title: '状态',
            dataIndex: 'type',
            key: 'type',
            render: (value) =>{
                if(status == "2"){
                    return(
                        <WarningTag text='下载中' />
                    )
                }else if(status == "3"){
                    return(
                        <ErrorTag text='下载失败' />
                    )
                }else{
                    return(
                        <SuccessTag text='下载完成' />
                    )
                }
            }
        },
        // 执行中不能操作
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Flex gap={12}>
                    <div className='ota-color-356DFF ota-cursor-pointer'>下载</div>
                    <div className='ota-color-356DFF ota-cursor-pointer'>预览</div>
                </Flex>
            ),
        },
    ];
    
    const data: DataType[] = [
        {
            key: '1',
            name: "文件文件",
            startTime:"2025/3/4 12:18:59",
            endTime:"2025/3/4 12:18:59",
            isDefault:"1",
        },
        {
            key: '2',
            name: "文件文件222",
            startTime:"2025/3/4 12:18:59",
            endTime:"2025/3/4 12:18:59",
            isDefault:"0",
        },
    ];

    return (
        <Scoped>
            {/*  */}
            {status && <Table<DataType> columns={columns} dataSource={data} />}
            
        </Scoped>
    )

}

export default DownloadTable;

const Scoped = styled.div`
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }

    .print{
        padding: 4px 12px;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0);
        border-radius: 4px;
    }
    .print:hover{
        border: 1px solid #356dff;
    }
`