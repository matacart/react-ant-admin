import React, { useMemo, useState } from 'react';
import { GetProp, Table, TableColumnsType, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import { history, useIntl } from '@umijs/max';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import orderDraftList from '@/store/order/orderDraftList';
import dayjs from 'dayjs';
import OrderWarningTag from '@/components/Tag/OrderWarningTag';
import OrderDefaultTag from '@/components/Tag/OrderDefaultTag';
import { getOrderDraftList } from '@/services/y2/api';
import { useAbortController } from '@/hooks/customHooks';

// 表单项订单数据类型
interface DataType {
  id:string;
  orderid:string,
  status:string;
  create_time:string;
  order_total:string;
  customer_firstname:string;
  customer_lastname:string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}


function OrdersDraftListAjax() {

  const intl = useIntl();

  const { createAbortController } = useAbortController();

  const [loading, setLoading] = useState(false);


  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total:orderDraftList.orderDraftList.total
    },
  });
  const [data, setData] = useState<DataType[]>([]);

  const columns: TableColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.draftOrderNo' }),
      dataIndex: 'id',
      render: (text: string) => (
        <span style={{ color: '#242833' }}>{text}</span>
      ),
    },
    {
      title: intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.creationDate' }),
      dataIndex: 'create_time',
      render: (text: string) => (
        <span>{text?dayjs(parseInt(text)*1000).format("YYYY-MM-DD"):""}</span>
      ),
    },
    {
      title: intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.customer' }),
      dataIndex: 'id',
      render: (text: string,record:any) => (
        <div>{(record.customer_firstname??"")+(record.customer_lastname??"")}</div>
      ),
    },
    {
      title: intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.status' }),
      dataIndex: 'status',
      render: (value: string) => <>
        {value == "0" ? <OrderWarningTag text={intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.pending' })} /> : <OrderDefaultTag text={intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.completed' })} />}
      </>,
    },
    {
      title: intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.total' }),
      dataIndex: 'order_total',
      render: (text: string,record:any) => (
        <div>{record.currency}{text}</div>
      ),
    },
  ];

  useMemo(()=>{
    setData(orderDraftList.orderDraftList.data)
  },[orderDraftList.orderDraftList])

  const translateStatus = (statusKey: string, intl: any): string => {
    return intl.formatMessage({ id: statusKey });
  };

  const handleTableChange = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    setLoading(true);
    const signal = createAbortController();
    getOrderDraftList({
      page:pagination.current,
      limit:pagination.pageSize
    },signal).then(res=>{
      orderDraftList.setOrderDraftList({
        data:res.data,
        total:Number(res.count || 0)
      });
    }).catch(err=>{
      if(err.name === 'AbortError'){
        console.log(err);
      }
    }).finally(()=>{
      setLoading(false);
    })

  };

  return (
    <Scoped>
    {/* <SelectedActions /> */}
    {/* 列表 */}
    <Table
      columns={columns}
      rowKey={(record) => record.orderid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      scroll={{ x: 'max-content' }}
      onRow={(record) => ({
        onClick: () => {
          // 点击行时调用handleOrderClick
          history.push(`/orders/draftOrders/edit/${record.id}`);
        },
      })}
    />
  </Scoped>
  );
};

export default observer(OrdersDraftListAjax)

const Scoped = styled.div`
  .ant-table-thead > tr > th {
    background-color: #F5F8FC !important; // 设置表头背景色
  }

  .ant-table-tbody > tr > td {
    padding: 10px;
    height: 56px;
  }
  
  .ant-table{
    border: 1px solid #eef1f7;
    border-radius: 6px;
  }
`;


