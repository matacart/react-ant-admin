import React, { ReactNode, useEffect, useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, Tooltip } from 'antd';
import type { GetProp, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import qs from 'qs';
import { CopyOutlined, EyeOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Product from './../../pages/Products/index';
// import ProductList from './ProductList';
import { result } from 'lodash';
import axios from 'axios';
import {  getOrderList } from '@/services/y2/order';
import { Response } from 'express';
import DeliveryState from './../Card/DeliveryState';
import { history, Link} from '@umijs/max';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项订单数据类型
interface DataType


{
    orderId: string;
    orderdata: string;
    paymentMethod:string;
    name:string;
    shippingMethod:string;
    price: number;
    orderstate:string;
    paymentstate:string;
    deliverystate:string;
    namenuber:string;
  }



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
  // const onChangeSwich = (index: number) => {
  //   let oldDataItem = data[index]
  //   let newDataItem = {
  //     ...oldDataItem,
  //     state: !oldDataItem.state
  //   }
  //   let newData = [...data];
  //   newData[index].state = !oldDataItem.state
  //   setData(newData);
  // };

  // 表头
 
  const columns: TableColumnsType<DataType> = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      width: 100,
      
    },
    {
      title: '订单日期',
      dataIndex: 'orderdata',
      width: 100,
      
      
    },
    {
      title: '订单状态',
      dataIndex: 'orderstate',
      width: 100, 
    },
    {
      title: '付款状态',
      dataIndex: 'paymentstate',
      width: 100,
    },
    {
      title: '发货状态',
      dataIndex: 'deliverystate',
      width: 100,
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      width: 100,
    },
    {
      title: '支付渠道',
      dataIndex: 'paymentMethod',
      width: 100,
    },
    {
      title: '收件人',
      dataIndex: 'name',
      width: 100,
    },
    {
     title:'收件人手机号',
     dataIndex:'namenuber',
     width:100,
    },
    {
      title: '运费方案',
      dataIndex: 'shippingMethod',
      width: 100,
    },
    {
      title: '合计',
      dataIndex: 'price',
      width: 100,
      render: (value, record, index) =>{
        let num = Number(value);
        return <>
          {`US$ ${num.toFixed(2)}`}
        </>
      } 
    },
  ];

  const fetchData = () => {
    setLoading(true);
    fetch(`/api/ApiStore/orderlist${qs.stringify(getRandomuserParams(tableParams))}`)
    fetch(``)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        // setTableParams({
        //   ...tableParams,
        //   pagination: {
        //     ...tableParams.pagination,
        //     total: 200,
        //     // 200 is mock data, you should read it from server
        //     // total: data.totalCount,
        //   },
        // });
        console.log(result);
      });
    const limit  = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    getOrderList(page,limit)
      .then((res) => {
        let newData:DataType[] = [];
        res.data?.forEach((item:any)=>{
          newData.push({
            orderId: item.id,
            orderdata:item.date_purchased,
            orderstate:item.orders_status_name,
            paymentMethod:item.payment_method,
            paymentstate:item.payment_status_id,
            deliverystate:item.delivery_status_id,
            name:item.delivery_name,
            namenuber:item.tel,
            shippingMethod:item.shipping_method,
            price: item.order_total,
            
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




const handleOrderClick = (orderId: string) => {
  history.push(`/orders/${orderId}`);
};

  return (
    <Scoped>
    {/* 列表 */}
      <Table
        columns={columns}
        rowKey={(record) => record.orderId}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1300 }}
        onRow={(record) => ({ // 添加onRow属性来处理行点击事件
          onClick: () => handleOrderClick(record.orderId), // 点击行时调用handleOrderClick
        })}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

          },
        }}
      />
     
    </Scoped>

  );
};

const Scoped = styled.div`
  .ant-table-tbody > tr > td {
    padding: 10px; 
  }
`

