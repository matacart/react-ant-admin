import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Divider, Flex, Select, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface DataType {
    key: string;
    name: string;
    time: string;
    address: string;
    controls:string;
}

function LoginDevice() {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '设备/IP',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'age',
        },
        {
            title: '地点',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '状态',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <>
                <SuccessTag text="正常" />
            </>,
        },
        {
            title: '操作',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <>
                <Button>移除</Button>
            </>,
        },
    ];

    const data: DataType[] = [
        {
          key: '1',
          name: '设备/IP',
          time: "2025-01-01",
          address: '中国 北京市',
          controls: "hhh"
        },
        {
          key: '2',
          name: 'Windows上的Edge',
          time: "2025-01-01",
          address: '中国 上海市',
          controls: "hhh",
        },
        {
          key: '3',
          name: 'Windows上的Google',
          time: "2025-01-11",
          address: '中国 深圳市',
          controls: "hhh",
        },
    ];
    
    return (
        <Scoped>
            <Card>
                <div className="color-242833">已登录过的设备</div>
                <div className="font-12 color-7A8499">仅记录最近10条的设备登录情况</div>
                <Divider className="divider" />
                <div>
                    <Table<DataType> columns={columns} dataSource={data} pagination={false} />
                </div>
            </Card>
        </Scoped>
    )

}

export default LoginDevice;

const Scoped = styled.div`
    margin-bottom: 20px;

    .divider{
        margin:20px 0;
    }

    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`
