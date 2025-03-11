
import { DownloadIcon, ExportIcon, PrintIcon } from '@/components/Icons/Icons';
import SuccessTag from '@/components/Tag/SuccessTag';
import { history } from '@umijs/max';
import { Card, DatePicker, Dropdown, Flex, Input, MenuProps, Select, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';


interface DataType {
    key: string;
    code: string;
    name: string;
    phone: string;
    payStatus: string;
    shipStatus: string;
    time: string;
    total: string;
}

const printItems: MenuProps['items'] = [
    {
      key: '1',
      label:<div onClick={()=>history.push("/order_invoice_customization/orderPdfPreview/1001")}>发票</div>

    },
    {
      key: '2',
      label:<div onClick={()=>history.push("/order_invoice_customization/orderPdfPreview/picking/1001")}>拣货单</div>
    }
];

const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
};

function OrderListTable(){

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '订单编号',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '收件人',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <div>{text}</div>,
        },
        {
            title: '收件人手机',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => <div>{text}</div>,
        },
        {
            title: '付款状态',
            dataIndex: 'payStatus',
            key: 'payStatus',
            render: (text) => <div>
                <SuccessTag text='已付款' />
            </div>,
          },
        {
            title: '发货状态',
            dataIndex: 'shipStatus',
            key: 'shipStatus',
            render: (text) => <div>
                <SuccessTag text='已发货' />
            </div>,
        },
        {
            title: '订单日期',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '合计',
            dataIndex: 'total',
            key: 'total',
        },
        
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Flex gap={8}>
                    <Dropdown menu={{ items: printItems }} trigger={['hover']}>
                        <Flex className='cursor-pointer print' align='center'>
                            <PrintIcon className='font-20 color-356DFF' />
                            <div style={{marginLeft:"8px"}}>打印</div>    
                        </Flex>
                    </Dropdown>
                    <Dropdown menu={{ items: printItems }} trigger={['hover']}>
                        <Flex className='cursor-pointer print' align='center'>
                            <DownloadIcon className='font-20 color-356DFF' />
                            <div style={{marginLeft:"8px"}}>下载</div>    
                        </Flex>
                    </Dropdown>
                </Flex>
            ),
        },
    ];
    
    const data: DataType[] = [
        {
            key: '1',
            code: "1001",
            name: "MataCart",
            phone: "11011111111",
            payStatus: "1",
            shipStatus: "1",
            time: "2025/2/28 11:28:49",
            total: "200.00"
            
        },
        {
            key: '2',
            code: "1002",
            name: "Admin",
            phone: "11012345111",
            payStatus: "1",
            shipStatus: "1",
            time: "2025/2/28 11:28:49",
            total: "200.00"
        },
    ];

    return (
        <Scoped>
            {/*  */}
            <Table<DataType> columns={columns} rowSelection={{ type: selectionType, ...rowSelection  }} dataSource={data} />
        </Scoped>
    )

}

export default OrderListTable;

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