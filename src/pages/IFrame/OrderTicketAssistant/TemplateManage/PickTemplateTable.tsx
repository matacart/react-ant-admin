
import { DownloadIcon, ExportIcon, PrintIcon } from '@/components/Icons/Icons';
import SuccessTag from '@/components/Tag/SuccessTag';
import { history } from '@umijs/max';
import { Button, Card, DatePicker, Dropdown, Flex, Input, MenuProps, Select, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';


interface DataType {
    key: string;
    name: string;
    isDefault:string;
}

const printItems: MenuProps['items'] = [
    {
      key: '1',
      label:<div onClick={()=>{

      }}>设为默认</div>

    },
    {
      key: '2',
      label:<div className='ota-color-FF0000' onClick={()=>{

      }}>删除</div>
    }
];

function PickTemplateTable(){

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '模板名称',
            dataIndex: 'name',
            key: 'name',
            width:"50%",
            render: (value,record) => <Flex align='center'>
                <div>{value}</div>
                {record.isDefault == "1" && <div style={{marginLeft:"12px",marginTop:"-4px"}}><SuccessTag text='默认模板' /></div>}
            </Flex>,
        },
        {
            title: '操作',
            key: 'action',
            width:"30%",
            render: (_, record) => (
                <Flex gap={12}>
                    <Button>编辑模板</Button>
                    {record.isDefault == "0" && <Dropdown menu={{ items: printItems }} trigger={['click']}>
                        <Button>更多操作</Button>
                    </Dropdown>}
                </Flex>
            ),
        },
    ];
    
    const data: DataType[] = [
        {
            key: '1',
            name: "MataCart",
            isDefault:"1",
        },
        {
            key: '2',
            name: "MataCart2",
            isDefault:"0",
        },
    ];

    return (
        <Scoped>
            {/*  */}
            <Table<DataType> columns={columns} dataSource={data} />
        </Scoped>
    )

}

export default PickTemplateTable;

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