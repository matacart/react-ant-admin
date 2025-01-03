import { Card, Col, Form, Row, Select, Table, TableProps } from "antd";
import styled from "styled-components";



interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

function PurchaseGoodsCard() {

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '商品',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '供应商SKU',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '采购数量',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '成本',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '税率',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '总计',
            dataIndex: 'address',
            key: 'address',
        },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <div>
                <a>Delete</a>
            </div>
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

    return(
        <Scoped>
            <Card bordered={false} title="采购商品">
                <div className="table_box">
                    <Table<DataType> columns={columns} dataSource={data} />
                </div>
            </Card>
        </Scoped>
    )
}

export default PurchaseGoodsCard;

const Scoped = styled.div`
    margin-top: 20px;
    .table_box{
        border-radius: 6px;
        border: 1px solid #eef1f7;
    }
`

