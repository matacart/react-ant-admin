import React, { useEffect, useMemo, useState } from 'react';
import { GetProp, Select, Table, TableColumnsType, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import styled from 'styled-components';
import { getOrderList} from '@/services/y2/order';
import { observer } from 'mobx-react-lite';
import orderDraftList from '@/store/order/orderDraftList';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import OrderWarningTag from '@/components/Tag/OrderWarningTag';
import OrderDefaultTag from '@/components/Tag/OrderDefaultTag';

// 表单项订单数据类型
interface DataType {
  id:string;
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

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function OrdersDraftListAjax() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 50,
    },
  });
  const [data, setData] = useState<DataType[]>([]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "草稿单号",
      dataIndex: 'id',
      render: (text: string) => (
        <span style={{ color: '#242833' }}>{text}</span>
      ),
    },
    {
      title: "创建日期",
      dataIndex: 'create_time',
      render: (text: string) => (
        <span>{text?dayjs(parseInt(text)*1000).format("YYYY-MM-DD"):""}</span>
      ),
    },
    {
      title: "客户",
      dataIndex: 'id',
      render: (text: string,record:any) => (
        <div>{(record.customer_firstname??"")+(record.customer_lastname??"")}</div>
      ),
    },
    {
      title: "状态",
      dataIndex: 'status',
      render: (value: string) => <>
        {value == "0" ? <OrderWarningTag text="未结" /> : <OrderDefaultTag text="已结" />}
      </>,
    },
    {
      title: "合计",
      dataIndex: 'order_total',
      render: (text: string,record:any) => (
        <div>{record.currency}{text}</div>
      ),
    },
  ];

  useMemo(()=>{
    setData(orderDraftList.orderDraftList)
  },[orderDraftList.orderDraftList])

  const translateStatus = (statusKey: string, intl: any): string => {
    return intl.formatMessage({ id: statusKey });
  };

  // const handleTableChange = (pagination, filters, sorter) => {
  //   setTableParams({
  //     pagination,
  //     filters,
  //     ...sorter,
  //   });
  //   if (pagination.pageSize !== tableParams.pagination?.pageSize) {
  //     setData([]);
  //   }
  // };

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
      // onChange={handleTableChange}
      scroll={{ x: 'max-content' }}
      onRow={(record) => ({
        onClick: () => {
          // 点击行时调用handleOrderClick
          navigate(`/orders/draftOrders/edit/${record.id}`);
        },
      })}
      // rowSelection={{
      //   type: 'checkbox',
      //   selectedRowKeys:orderList.orderIds, // 使用状态来记录选中的行
      //   onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      //     orderList.setOrderIds(selectedRowKeys);
      //   },
      // }}
      // 隐藏表头
      // showHeader={orderList.orderIds.length === 0}
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


