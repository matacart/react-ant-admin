import { Table } from "antd";
import styled from "styled-components";

function ProductTable() {

    const columns = [
        {
            title: '名称',
            dataIndex: 'title',
            width: 180,
        },
        {
            title: '状态',
            dataIndex: 'model',
            width: 120,
        },
        {
            title: '原价',
            dataIndex: 'specialprice',
            width: 150,
        },
        {
            title: '售价',
            dataIndex: 'quantity',
            width: 120,
        }
    ];

    return (
        <Scoped>
            <Table
                columns={columns}
            />
        </Scoped>
    )
}

const Scoped = styled.div`
    margin-top: 12px;
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`

export default ProductTable;