import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Form, GetProp, Input, message, Space, Spin, Switch, Table, TableProps, Upload, UploadProps } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "styled-components";


interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}



function TaxDistrict() {

    const [loading, setLoading] = useState(false);

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '征收',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <Switch/>,
        },
        {
          title: '国家/地区',
          dataIndex: 'age',
          key: 'age',
          render: (text) => <div>中国</div>
        },
        {
            title: '',
            dataIndex: 'age',
            key: 'age',
            render: (text) => <div>包含0个州/省，0个自定义税率</div>
          },
        {
          title: '操作',
          dataIndex: 'address',
          key: 'address',
          render: (_, record) => (
            <Space size="middle">
                <EditOutlined style={{fontSize:"18px",cursor:"pointer"}} />
                <DeleteOutlined style={{color:"red",fontSize:"18px",cursor:"pointer"}} />
            </Space>
          ),
        },
    ];

    const data: DataType[] = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
    ];

    return (
        <Scoped>
            <Card>
                <Input className="input-search" prefix={<SearchOutlined />} placeholder="按名称或代码搜索国家或地区" />
                <Table<DataType> columns={columns} dataSource={data} pagination={false} />
            </Card>
        </Scoped>
    )
}

export default TaxDistrict

const Scoped = styled.div`
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
        margin-bottom: 20px;
    }
    .input-search{
        margin-bottom: 20px;
    }
   
`
