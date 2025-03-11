
import { DownloadIcon, MailFilledIcon, MailIcon, PrintIcon } from '@/components/Icons/Icons';
import SuccessTag from '@/components/Tag/SuccessTag';
import { history } from '@umijs/max';
import { Card, Flex, Input, MenuProps, Select, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';


interface DataType {
    key: string;
    code: string;
    time: string;
    name: string;
    status: string;
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

function DraftOrderListTable(){

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '草稿单号',
            dataIndex: 'code',
            key: 'code',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '创建日期',
            dataIndex: 'time',
            key: 'time',
            render: (text) => <div>{text}</div>,
        },
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <div>{text}</div>,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <div>
                <SuccessTag text='已付款' />
            </div>,
        },
        {
            title: '合计',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: <div style={{textAlign:"center"}}>操作</div>,
            key: 'action',
            render: (_, record) => (
                <Flex gap={8} justify='center'>
                    <Flex className='cursor-pointer print' align='center' onClick={() => {history.push("/order_invoice_customization/orderPdfPreview/draft/1001")}}>
                        <PrintIcon className='font-20 color-356DFF' />
                        <div style={{marginLeft:"8px"}}>打印</div>    
                    </Flex>
                    <Flex className='cursor-pointer print' align='center'>
                        <DownloadIcon className='font-20 color-356DFF' />
                        <div style={{marginLeft:"8px"}}>下载</div>    
                    </Flex>
                    <Flex className='cursor-pointer print' align='center'>
                        <MailFilledIcon className='font-20 color-356DFF' />
                        <div style={{marginLeft:"8px"}}>邮件</div>    
                    </Flex>
                </Flex>
            ),
        },
    ];
    
    const data: DataType[] = [
        {
            key: '1',
            code: "2506885119584165959456",
            time: "2025/2/28 11:28:49",
            name: "MataCart",
            status: "1",
            total: "200.00"
            
        },
        {
            key: '2',
            code: "2506885119584165959451",
            time: "2025/2/28 11:28:49",
            name: "Admin",
            status: "1",
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

export default DraftOrderListTable;

const Scoped = styled.div`
    margin-top: 12px;
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