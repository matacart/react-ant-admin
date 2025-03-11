
import { getAppActionlogs } from "@/services/y2/api";
import { Button, Card, Flex, Form, Input, message, Select, Table, TableProps } from "antd"
import { useEffect } from "react";
import styled from "styled-components"


interface DataType {
    key: string;
    name: string;
    age: string;
    address: string;
}

function OperationRecordCard() {

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '操作事件',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <div>{text}</div>,
        },
        {
          title: '操作者',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '创建时间',
          dataIndex: 'address',
          key: 'address',
        },
    ];

    const data: DataType[] = [
        {
          key: '1',
          name: '已卸载应用',
          age: "商家(008612213444)",
          address: '2025-03-11 16:53:09',
        },
        {
          key: '2',
          name: '已生成后台 API 令牌',
          age: "员工(0086123412321)",
          address: '2025-03-11 16:53:09',
        },
        {
          key: '3',
          name: '创建应用',
          age: "商家(00861222282)",
          address: '2025-03-11 16:53:09',
        },
    ];

    useEffect(()=>{
        getAppActionlogs().then(res=>{
            console.log(res)
        })
    },[])

    return (
        <Scoped>
            <Card>
                <div className="color-474F5E font-16">操作记录</div>
                <div style={{marginTop:"8px"}} className="color-474F5E">所有时间均以 UTC 表示。</div>
                <div className="table-box">
                    <Table<DataType> columns={columns} dataSource={data} />
                </div>
            </Card>
        </Scoped>
    )
}

export default OperationRecordCard

const Scoped = styled.div`
    .table-box{
        margin-top: 16px;
        .ant-table{
            border: 1px solid #eef1f7;
            border-radius: 6px;
            border-bottom: none;
        }
    }
`