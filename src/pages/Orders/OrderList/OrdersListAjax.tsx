import React, { useEffect, useMemo, useState } from 'react';
import { GetProp, Select, Table, TableColumnsType, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import styled from 'styled-components';
import { getOrderList,updateOrderStatus} from '@/services/y2/order';
import { history, useIntl } from '@umijs/max';
import OrderWarningTag from '@/components/Tag/OrderWarningTag';
import orderList from '@/store/order/orderList';
import SelectedActions from './SelectedActions';
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

function OrdersListAjax({ id,languagesId }: FilterCondition) {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [data, setData] = useState<DataType[]>([]);

  const columns: TableColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'order.tableheader.orderid' }),
      dataIndex: 'order_sn',
      render: (text: string) => (
        <span style={{ color: '#242833' }}>{text}</span>
      ),
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.orderdata' }),
      dataIndex: 'orderdata',
      render: (text: string) => (
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </span>
      ),
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.orderstate' }),
      dataIndex: 'orderstate',
      render: (text: string) => <OrderWarningTag text="处理中" />,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.paymenstate' }),
      dataIndex: 'paymentstate',
      render: (text: string) => <OrderWarningTag text="未付款" />,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.deliverystate' }),
      dataIndex: 'deliverystate',
      render: (text: string) => <OrderWarningTag text="待发货" />,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.paymentmethod' }),
      dataIndex: 'paymentmethod',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.paymentchannel' }),
      dataIndex: 'paymentchannel',
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.deliveryname' }),
      dataIndex: 'deliveryname',
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.tel' }),
      dataIndex: 'tel',
      render: (tel: string) => {
        // 显示手机号的前两位和后两位，中间用星号(*)代替
        const maskedTel = `${tel.substring(0, 2)}****${tel.substring(tel.length - 2)}`;
        return <span>{maskedTel}</span>;
      },
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.shippingmethod' }),
      dataIndex: 'shippingmethod',
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.pricetotal' }),
      dataIndex: 'price',
      render: (value: any, record: any, index: any) => {
        let num = Number(value);
        return <>{`US$ ${num.toFixed(2)}`}</>;
      },
    },
  ];

  // 
  const fetchData = (id?:string,languagesId?:string) => {
    setLoading(true);
    const limit = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
  
    console.log('Fetching data with:', { page, limit });
  
    // 构造查询字符串
    const searchParams = new URLSearchParams();
    if (page) searchParams.set('page', page.toString());
    if (limit) searchParams.set('limit', limit.toString());

   
    getOrderList(page,limit,id,languagesId,"",orderList.condition).then((res) => {
        console.log('Response from getOrderList:', res);
        const newData: DataType[] = res.data?.map((item: any) => ({
          ...item,
          orderid: item.id,
          orderdata: item.date_purchased,
          orderstate: translateStatus('order.status.name_' + item.orders_status_id, intl),
          paymentmethod: item.payment_method,
          payment_status_id: item.payment_status_id, // 确保这里使用的是最新的 payment_status_id
          paymentstate: translateStatus('order.status.name_' + item.payment_status_id, intl),
          deliverystate: translateStatus('order.status.name_' + item.delivery_status_id, intl),
          deliveryname: item.delivery_name,
          tel: item.tel,
          shippingmethod: item.shipping_method,
          paymentchannel: item.payment_method,
          price: item.order_total,
        }));
  
        console.log('New data after processing:', newData);
        setData(newData); // 使用过滤后的数据
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
        orderList.setCurrentPageOrderIds(pageIds)

    }).catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  };

  useEffect(() => {
    // 在这里监听 `filterCondition` 的变化，并重新获取数据
    console.log('filterCondition changed:',id, languagesId);
    fetchData(id,languagesId);
  }, [tableParams.pagination?.current,tableParams.pagination?.pageSize,id,languagesId,orderList.condition]);

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
    <SelectedActions />
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
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys:orderList.orderIds, // 使用状态来记录选中的行
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          orderList.setOrderIds(selectedRowKeys);
        },
      }}
      // 隐藏表头
      showHeader={orderList.orderIds.length === 0}
    />
  </Scoped>
  );
};

export default observer(OrdersListAjax)

const Scoped = styled.div`
  .ant-table-thead > tr > th {
    background-color: #F5F8FC !important; // 设置表头背景色
  }

  .ant-table-tbody > tr > td {
    padding: 10px;
  }
  
  .ant-table{
    border: 1px solid #eef1f7;
    border-radius: 6px;
  }
`;


