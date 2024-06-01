import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Pagination, Popover, Switch, Table, Tooltip } from 'antd';
import type { TableColumnsType, TablePaginationConfig, TableProps } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { CopyOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface DataType {
  key: React.Key;
  imgUrl: string;
  name: string;
  price: number;
  inventory: number;
  state:boolean;
}

// ToolTip内容
const content : ReactNode = (<>
    <div>·在线商店</div>
    <div>·贴文销售</div>
    <div>·消息中心</div>
    <div>·Google</div>
    <div>·WhatsApp</div>
    <div>·Facebook</div>
    <div>·Telegram</div>

</>)


const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export default function ProductList(){

    //列表数据
    const [data,setData] = useState<DataType[]>([]);
    //数据初始化
    const initializeData = async () => {
        let tempData: DataType[] = [];
        for(let i=0;i<10;++i){
            tempData.push({
                key: i.toString(),
                imgUrl: '#',
                name: i.toString(),
                price: i,
                state: false,
                inventory: i
            });
        }
        setData(tempData);
    };

    useEffect(() => {  
        initializeData();  
      }, []); 
    

    // 状态
    const onChangeSwich = (index: number) => {
        let oldDataItem = data[index]
        let newDataItem = {
            ...oldDataItem,
            state: !oldDataItem.state
        }
        let newData = [...data];
        newData[index].state = !oldDataItem.state
        setData(newData);
    };

    
    const columns: TableColumnsType<DataType> = [
        {
          title: '商品',
          dataIndex: 'name',
          width: 170,
        },
        {
          title: '售价',
          dataIndex: 'price',
          width: 150,
        },
        {
          title: '库存数',
          dataIndex: 'inventory',
          width: 120,
        },
        {
          title: '状态',
          dataIndex: 'state',
          width: 120,
          render: (text, record, index) => 
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 9,
                alignContent: 'center',
            }}>
                <Switch style={{
                    position: 'relative',
                    top: "3px",
                }} size='small' checked={data[index].state} onChange={()=>{onChangeSwich(index)}} />
                <Popover content={content} title="销售渠道" style={{
                    width: '20px'
                }} trigger="click">
                    {data[index].state?'上架': '下架'}
                </Popover>
            </div>,
        },
        {
            title: '操作',
            width: 100,
            fixed: 'right',
            
            render: (index)=>{return(
            <div style={{
                color: '#474f5e',
                fontSize: 20,
                display: 'flex',
                
            }} >
                <ButtonIcon>
                    <div className='wrap'>
                    <Tooltip title="预览">
                        <EyeOutlined/>
                    </Tooltip>
                    </div>
                </ButtonIcon>
                <ButtonIcon>
                    <Tooltip title="复制">
                        <div className='wrap'>
                        <CopyOutlined />
                        </div>
                    </Tooltip>
                </ButtonIcon>
            </div>
            
            )}
        }
      ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return <>
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 1300 }} >
    </Table>
  </>;

}

const ButtonIcon = styled.div`
.wrap{
    height:36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-content: center;
    border-radius:4px;
    &:hover{
        background-color: rgba(60, 181, 218, 0.114);
        cursor:pointer;
    }
}
`

