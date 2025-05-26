import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { Card, Flex, Table, TableProps } from "antd";
import styled from "styled-components";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    orderSn:string;
}

function RecentOrderList(){


    const columns: TableProps<DataType>['columns'] = [
        {
          title: '商品',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <>
            <img style={{width:"60px"}} src="https://img.myshopline.com/image/store/1747555913813/175e41b429c611b2b09174222d772285-.jpeg?w=1000&h=533" />
          </>,
        },
        {
          title: '订单编号',
          dataIndex: 'orderSn',
          key: 'orderSn',
          render: (text) => <div className="font-w-600 color-356DFF order-sn">{text}</div>,
        },
        {
          title: '订单来源',
          dataIndex: 'number',
          key: 'address',
        },
        {
            title: '订单日期',
            dataIndex: 'number',
            key: 'address',
        },
        {
            title: '订单状态',
            dataIndex: 'number',
            key: 'address',
        },
        {
            title: '合计',
            dataIndex: 'number',
            key: 'address',
        },
    ];

    const data: DataType[] = [
        {
          key: '1',
          orderSn:"1001",
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          orderSn:"1002",
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          orderSn:"1003",
          name: 'Joe Black',
          age: 32,
          address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '3',
            orderSn:"1004",
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
        {
            key: '3',
            orderSn:"1005",
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
        },
    ];

    return(
        <MyCard>
            <Flex justify="space-between" align="center">
                <div className="font-16 font-w-600">最近5笔订单</div>
                <Flex gap={12}>
                    <DefaultButton text="查看全部订单" />
                    <PrimaryButton text="创建订单" />
                </Flex>
            </Flex>
            {/* table */}
            <Table<DataType> columns={columns} dataSource={data} pagination={false} />
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .order-sn:hover{
        text-decoration: underline;
    }

    .ant-table{
        margin: 20px 0;
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`


export default RecentOrderList