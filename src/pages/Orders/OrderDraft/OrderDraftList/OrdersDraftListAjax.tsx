import React, { useEffect, useMemo, useState } from 'react';
import { GetProp, Select, Table, TableColumnsType, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import styled from 'styled-components';
import { getOrderList,updateOrderStatus} from '@/services/y2/order';
import { history, useIntl } from '@umijs/max';
import OrderWarningTag from '@/components/Tag/OrderWarningTag';
import { observer } from 'mobx-react-lite';
// 表单项订单数据类型
interface DataType {
  orderid: string;
  orderdata: string;
  paymentmethod: string;
  deliveryname: string;
  shippingmethod: string;
  price: number;
  orderstate: string;
  paymentstate: string;
  deliverystate: string;
  paymentchannel: string;
  tel: string;
  [key: string]: string | number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface FilterCondition {
  id: string;
  languagesId:string;
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function OrdersDraftListAjax() {
  const intl = useIntl();
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
      dataIndex: 'orderdata',
      render: (text: string) => (
        <span>
        </span>
      ),
    },
    {
      title: "客户",
      dataIndex: 'orderstate',
      render: (text: string) => (
        <div></div>
      ),
    },
    {
      title: "状态",
      dataIndex: 'orders_status_id',
      render: (text: string) => <>
        
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

  // 
  const fetchData = () => {
    setLoading(true);
    const limit = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    // 构造查询字符串
    const searchParams = new URLSearchParams();
    if (page) searchParams.set('page', page.toString());
    if (limit) searchParams.set('limit', limit.toString());
   
    getOrderList(page,limit,"","2",1).then((res) => {
      setData(res.data || [])
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.count,
        },
      });
      // 获取当前页面订单ids
      const pageIds = res.data?.map((item:any)=>item.id)
      }).catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // 在这里监听 `filterCondition` 的变化，并重新获取数据
    fetchData();
  }, [tableParams.pagination?.current,tableParams.pagination?.pageSize]);

  useMemo(()=>{
    // fetchData(id,languagesId);
  },[])

  const translateStatus = (statusKey: string, intl: any): string => {
    return intl.formatMessage({ id: statusKey });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleOrderClick = (orderId: string) => {
    history.push(`/orders/${orderId}`);
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
        onClick: () => handleOrderClick(record.orderid), // 点击行时调用handleOrderClick
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


