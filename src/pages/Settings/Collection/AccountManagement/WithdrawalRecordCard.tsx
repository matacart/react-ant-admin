import { ExportIcon } from "@/components/Icons/Icons";
import { Card, Flex, Table, TableProps } from "antd";
import styled from "styled-components";

interface DataType {
    key: string;
    code: string;
    age: number;
    address: string;
    tags: string[];
}

function WithdrawalRecordCard(){

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '提款序号',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <div>{text}</div>,
        },
        {
            title: '时间',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '提款总览',
            dataIndex: 'age',
            key: 'address',
        },
        {
            title: '到账金额',
            dataIndex: 'age',
            key: 'address',
        },
        {
            title: '手续费',
            dataIndex: 'age',
            key: 'address',
        },
        {
            title: '汇率',
            dataIndex: 'age',
            key: 'address',
        },
        {
            title: '提款至',
            dataIndex: 'age',
            key: 'address',
        },
    ];

    const data: DataType[] = [
        {
          key: '1',
          code: '123',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          code: '321',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          code: '1111',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
    ];

    return (
        <Scoped>
            <Card>
                <Flex justify="space-between">
                    <div className="font-16 font-w-600 color-242833">近期提款记录</div>
                    <div className="withdrawalRecord font-w-600 cursor-pointer">
                        查看全部提款记录
                        <ExportIcon />
                    </div>
                </Flex>
                <div className="table-box">
                    <Table<DataType> columns={columns} dataSource={data} pagination={false} />
                </div>
                
            </Card>
        </Scoped>
    )
}

export default WithdrawalRecordCard;

const Scoped = styled.div`
    margin-top: 20px;
    .withdrawalRecord{
        height: 22px;
        color: #356DFF;
        border-bottom: 1px solid #356DFF;
    }
    .table-box{
        margin-top: 24px;
        margin-bottom: 12px;
        .ant-table{
            border: 1px solid #eef1f7;
            border-radius: 6px;
            border-bottom: none;
        }
    }
`