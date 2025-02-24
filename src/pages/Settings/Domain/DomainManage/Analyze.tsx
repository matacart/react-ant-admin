import { Table, TableProps } from "antd";
import styled from "styled-components";


interface DataType {
    key: string;
    recordType: string;
    hostRecord: string;
    recordedValue: string;
}

export default function Analyze() {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '记录类型(Type)',
            dataIndex: 'recordType',
            key: 'name',
            render: (text) => <div>CNAME</div>,
            width:100
        },
        {
            title: '主机记录(Host)',
            dataIndex: 'hostRecord',
            key: 'age',
            render: (text) => <div>{text}</div>,
            width:100
        },
        {
            title: '当前记录值',
            dataIndex: 'age',
            key: 'age',
            render: (text) => <div></div>,
            width:100
        },
        {
            title: '记录值',
            dataIndex: 'recordedValue',
            key: 'age',
            render: (text) => <div>{text}</div>,
            width:100
        },
    ];

    const data: DataType[] = [
        {
          key: '1',
          recordType: 'CNAME',
          hostRecord: '@',
          recordedValue:"slb3.handingdns.com",
        },
        {
          key: '2',
          recordType: 'CNAME',
          hostRecord: 'www',
          recordedValue:"slb3.handingdns.com",
        },
    ];

    return (
        <Scoped>
            <Table<DataType> columns={columns} dataSource={data} pagination={false} />
        </Scoped>
    );
}

const Scoped = styled.div`
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`