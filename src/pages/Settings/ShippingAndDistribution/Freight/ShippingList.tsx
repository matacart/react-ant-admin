import { Flex, Table } from "antd";
import styled from "styled-components";

function ShippingList() {

    const dataSource: { country: string, freight: number }[] = [];


    const pagination = {
        total: 0,
        current: 1,
        pageSize: 10,
    };


    const columns = [
        {
            title: '国家',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: '运费',
            dataIndex: 'freight',
            key: 'freight',
        },
    ];

    return (
        <Scoped>
            {/* 空状态 */}
            <Flex className="empty color-7A8499" justify="center" align="center">未添加运费，此地区的客户将无法完成下单</Flex>
            {/* <Table 
                columns={columns} 
                dataSource={dataSource} 
                pagination={pagination}
            /> */}
        </Scoped>
    )
}

const Scoped = styled.div`
    margin-top: 12px;
    .empty {
        height: 60px;
    }
`

export default ShippingList;