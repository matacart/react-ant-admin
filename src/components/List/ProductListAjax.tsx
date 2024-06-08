import React, { ReactNode, useEffect, useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, Tooltip } from 'antd';
import type { GetProp, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import qs from 'qs';
import { CopyOutlined, EyeOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Product from './../../pages/Products/index';
import ProductList from './ProductList';
import { result } from 'lodash';
import axios from 'axios';
import { deleteProduct, getProductList } from '@/services/y2/api';
import { Response } from 'express';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项商品数据类型
interface DataType {
  key: React.Key;
  imgUrl?: string;
  name?: string;
  price?: number;
  inventory?: number;
  state?: boolean;
}

// ToolTip内容
const content: ReactNode = (<>
  <div>·在线商店</div>
  <div>·贴文销售</div>
  <div>·消息中心</div>
  <div>·Google</div>
  <div>·WhatsApp</div>
  <div>·Facebook</div>
  <div>·Telegram</div>

</>)

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

export default function ProductListAjax() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // 分页器初始参数
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // 复制商品模态框
  const [radioValue, setRadioValue] = useState(0)

  // 
  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };

  //列表数据
  const [data, setData] = useState<DataType[]>([]);

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

  // 表头
  const columns: TableColumnsType<DataType> = [
    {
      title: '商品',
      dataIndex: 'name',
      width: 180,
      render: (value, record, index) => <div style={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignContent: 'center',
      }}>
        <Avatar shape="square" size="large" src={record.imgUrl} icon={<UserOutlined />} />
        <span style={{
          marginLeft: 10,
          alignContent: 'center',
          whiteSpace: 'nowrap',

          overflow: 'hidden',
          textOverflow: 'ellipsis',
          
          maxWidth:"100%"
        }}>{record.name}</span>
      </div>
    },
    {
      title: '售价',
      dataIndex: 'price',
      width: 150,
      render: (value, record, index) =>{
        let num = Number(value);
        return <>
          {`US$ ${num.toFixed(2)}`}
        </>
      } 
        
      
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
          }} size='small' checked={data[index].state} onChange={() => { onChangeSwich(index) }} />
          <Popover content={content} title="销售渠道" style={{
            width: '20px'
          }} trigger="click">
            {data[index].state ? '上架' : '下架'}
          </Popover>
        </div>,
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',

      render: (index,record) => {
        return (
          <div style={{
            color: '#474f5e',
            fontSize: 20,
            display: 'flex',

          }} >
            <ButtonIcon>
              <div className='wrap'>
                <Tooltip title="预览">
                  <EyeOutlined />
                </Tooltip>
              </div>
            </ButtonIcon>
            <ButtonIcon>
              <Tooltip title="复制">
                <div className='wrap' onClick={() => setModalOpen(true)}>
                  <CopyOutlined />
                </div>
              </Tooltip>
            </ButtonIcon>
            <Button type="link" 
              onClick={()=>{
                deleteProduct(record.key.toString()).then((res)=>{
                  console.log(res)
                  if(res?.code==0){
                    message.success(`删除成功`);
                    fetchData();
                  }else{
                    message.error(`删除失败，请重试`)
                  }
                });
              }}
            danger>
              Delete
            </Button>
          </div>
        )
      }
    },

  ];

  const fetchData = () => {
    setLoading(true);
    // fetch(`/api/product/query/${qs.stringify(getRandomuserParams(tableParams))}`)
    // fetch(`/api/product/query`)
    //   .then((res) => res.json())
    //   .then(({ results }) => {
    //     setData(results);
    //     setLoading(false);
    //     // setTableParams({
    //     //   ...tableParams,
    //     //   pagination: {
    //     //     ...tableParams.pagination,
    //     //     total: 200,
    //     //     // 200 is mock data, you should read it from server
    //     //     // total: data.totalCount,
    //     //   },
    //     // });
    //     console.log(result);
    //   });
    const limit  = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    getProductList(page,limit)
      .then((res) => {
        let newData:DataType[] = [];
        res.data?.forEach((item:any)=>{
          newData.push({
            key:item.id,
            imgUrl: item.product_image,
            price: item.price,
            name: item.title,
            state: item.status==1,
            inventory: item.quantity,
            
          })
        })
        setData(newData);
        setLoading(false)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.count,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          }
        });
      })

  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Scoped>
    {/* 商品列表 */}
      <Table
        columns={columns}
        rowKey={(record) => record.key}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1300 }}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

          },
        }}
      />
      
      {/* 复制商品模态框 */}
      <Modal
        centered
        title="复制商品"
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Content>
          <div>商品名称</div>
          <div>
            <Input />
          </div>
          <div>
            <Checkbox className='selectItem' >
              <span style={{
                  marginRight: '3px',
                  display: 'flex',
                  alignContent: 'center',
                  flexWrap: 'nowrap',
                  width: '200px'
                }}>
                <span style={{
                  marginRight: '3px',
                }}>复制商品图片</span>
                <Tooltip title="prompt text">
                    <QuestionCircleOutlined />
              </Tooltip>
              </span>

            </Checkbox>
          </div>
          <div>
            <Checkbox>
              <span>复制商品库存</span>
            </Checkbox>
          </div>

          <div>商品状态</div>
          <Radio.Group onChange={onChangeRadio} value={radioValue}>
            <div>
              <Radio value={1}>
                <span>已上架</span>
              </Radio>
            </div>
            <div>
              <Radio value={2}>
                <span>已下架</span>
              </Radio>
            </div>
          </Radio.Group>
        </Content>
      </Modal>
    </Scoped>

  );
};

const Scoped = styled.div`
  .ant-table-tbody > tr > td {
    padding: 10px; 
  }
`

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

const Content = styled.div`
  display:flex;
  flex-direction: column;
  gap: 5px;
  span{
  font-size: 14px;
  color: #313131
  }
`