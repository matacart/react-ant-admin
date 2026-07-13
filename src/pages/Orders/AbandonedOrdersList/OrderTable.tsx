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
import { searchAbandonedOrder } from '@/services/y2/ApiAbandonedOrder';
import abandonedOrderList from '@/store/order/abandonedOrder/abandonedOrderList';
import DefaultButton from '@/components/Button/DefaultButton';

// 表单项订单数据类型
interface DataType {
  id:string;
  abandonedOrderSeq:string,
  status:string;
  create_time:string;
  order_total:string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}


function OrderTable() {

  const intl = useIntl();

  const { createAbortController } = useAbortController();

  const [loading, setLoading] = useState(false);


  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });
  const [data, setData] = useState<DataType[]>([]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "弃单号",
      dataIndex: 'abandonedOrderSeq',
      width: 200,
      fixed: 'left',
      render: (text: string) => (
        <span style={{ color: '#242833' }}>{text}</span>
      ),
    },
    {
      title: "创建时间",
      width: 160,
      dataIndex: 'createTime',
      render: (text: string) => (
        <span>{text?dayjs(parseInt(text)).format("YYYY-MM-DD HH:mm:ss"):""}</span>
      ),
    },
    {
      title: "更新时间",
      width: 160,
      dataIndex: 'updateTime',
      render: (text: string) => (
        <span>{text?dayjs(parseInt(text)).format("YYYY-MM-DD HH:mm:ss"):""}</span>
      ),
    },
    {
      title: "客户",
      width: 120,
      dataIndex: 'buyerNick',
      render: (text: string) => (
        <span>{text}</span>
      ),
    },
    {
      title: "运费",
      width: 120,
      dataIndex: 'deliveryList',
      render: (value: any[]) => (
        <span>{value.map(item=>item?.deliveryName || "").join(",")}</span>
      ),
    },
    {
      title: "合计",
      width: 120,
      dataIndex: 'totalAmount',
      render: (text: string,record:any) => (
        <div>{record.currency}{text}</div>
      ),
    },
    {
      title: "发送状态",
      width: 100,
      dataIndex: 'status',
      render: (value: string) => <>
        {value == "0" ? <OrderWarningTag text={intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.pending' })} /> : <OrderDefaultTag text={intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.completed' })} />}
      </>,
    },
    {
      title: "召回状态",
      width: 100,
      dataIndex: 'recallStatus',
      render: (value: string) => <>
        {value == "0" ? <OrderWarningTag text={intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.pending' })} /> : <OrderDefaultTag text={intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftListAjax.completed' })} />}
      </>,
    },
    {
      title: "发送次数",
      width: 100,
      align: 'center',
      dataIndex: 'sendCount',
      render: (text: string,record:any) => (
        <div style={{ textAlign:'center' }}>{text}</div>
      ),
    },
    {
      title: "操作",
      width: 80,
      fixed: 'right',
      align: 'right',
      dataIndex: 'operation',
      render: (text: string,record:any) => (
        <div style={{ display:'flex',justifyContent:'flex-end' }}>
          <DefaultButton text='发送邮件' />
        </div>
      ),
    },
  ];

  useMemo(()=>{
    searchAbandonedOrder({
      languages_id:abandonedOrderList.languages,
      pageNum:"1",
      pageSize:"10",
      sortBy:"",
      status:"1",
      keyword:abandonedOrderList.keyword
    }).then(res=>{
      setData(res.data.list || []);
    })
  },[])

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
        rowKey={(record) => record.abandonedOrderSeq}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys:abandonedOrderList.orderIds, // 使用状态来记录选中的行
          onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            // abandonedOrderList.setOrderIds(selectedRowKeys);
          },
        }}
        onRow={(record) => ({
          onClick: () => {
            // 点击行时执行的操作
            history.push(`/orders/recallOrders/${record.abandonedOrderSeq}`);
          },
        })}
      />
    </Scoped>
  );
};

export default observer(OrderTable)

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


