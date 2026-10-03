import React, { useEffect, useMemo, useState } from 'react';
import { Flex, GetProp, Popover, Table, TableColumnsType, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import styled from 'styled-components';
import { history, useIntl } from '@umijs/max';
import OrderWarningTag from '@/components/Tag/OrderWarningTag';
import orderList, { AmountSet } from '@/store/order/orderList';
import SelectedActions from './SelectedActions';
import { observer } from 'mobx-react-lite';
import OrderDefaultTag from '@/components/Tag/OrderDefaultTag';
import { getOrderList } from '@/services/y2/apiOrders';
import { useAbortController } from '@/hooks/customHooks';
import { getCurrencyAmount } from '@/utils/common';
import OrderEmptyTag from '@/components/Tag/OrderEmptyTag';
import { DownIcon } from '@/components/Icons/Icons';

// 表单项订单数据类型
interface DataType {
  order_id: string;
  order_sn: string;
  biz_order_status: number;
  biz_pay_status: number;
  biz_delivery_status: number;
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
  orderAmountSet:AmountSet;
  // [key: string]: string | number | OrderAmountSet;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface FilterCondition {
  id: string;
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function OrdersListAjax({ id }: FilterCondition) {

  const intl = useIntl();

  const [popoverKey, setPopoverKey] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const { createAbortController } = useAbortController();

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [data, setData] = useState<DataType[]>([]);

  const columns: TableColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.orderNo' }),
      dataIndex: 'order_sn',
      fixed: 'left',
      render: (text: string) => (
        <span style={{ color: '#242833' }}>{text}</span>
      ),
    },
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.orderDate' }),
      dataIndex: 'date_purchased',
      render: (text: string) => (
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </span>
      ),
    },
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.orderStatus' }),
      dataIndex: 'biz_order_status',
      render: (value: number) => value == 100 ? <OrderWarningTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.processing' })} /> : value == 400 ? <OrderEmptyTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.cancelled' })} /> : <OrderDefaultTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.completed' })} />,
    },
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.paymentStatus' }),
      dataIndex: 'biz_pay_status',
      render: (value: number) => <>
        {value == 0?<OrderWarningTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.unpaid' })} />:value == 100?<OrderWarningTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.paying' })} />:value == 150?<OrderWarningTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.partialPaid' })} />:value == 200?<OrderDefaultTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.paid' })}/>:value == 650?<OrderDefaultTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.partialRefunded' })}/>:value==700?<OrderDefaultTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.refunded' })}/>:""}
      </>,
    },
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.shippingStatus' }),
      dataIndex: 'biz_delivery_status',
      render: (value: number) => <>
        {value === 100 ? <OrderWarningTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.readyToShip' })} /> : value === 150 ? <OrderWarningTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.partiallyShipped' })} /> : <OrderDefaultTag text={intl.formatMessage({ id: 'order.orderList.ordersListAjax.shipped' })} />}
      </>,
    },
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.paymentMethod' }),
      dataIndex: 'payment_method',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.paymentChannel' }),
      dataIndex: 'paymentchannel',
    },
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.consignee' }),
      dataIndex: 'delivery_name',
    },
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.mobile' }),
      dataIndex: 'tel',
      render: (tel: string) => {
        // 显示手机号的前两位和后两位，中间用星号(*)代替
        const maskedTel = `${tel.substring(0, 2)}****${tel.substring(tel.length - 2)}`;
        return <span>{maskedTel}</span>;
      },
    },
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.shippingMethod' }),
      dataIndex: 'shippingmethod',
    },
    {
      title: intl.formatMessage({ id: 'order.orderList.ordersListAjax.priceTotal' }),
      dataIndex: 'store_amount',
      align: 'right',
      render: (value: number, record: any, index: any) => {
        return <>
          {record.orderAmountSet.storeMoney.currencyCode == record.orderAmountSet.settleMoney.currencyCode?<>
            {getCurrencyAmount(record.orderAmountSet.storeMoney.currencyCode,record.orderAmountSet.storeMoney.amount)}
          </>:
            <Popover
              content={<>
                <div>店铺币种：{getCurrencyAmount(record.orderAmountSet.storeMoney.currencyCode,record.orderAmountSet.storeMoney.amount)}</div>
                <div>订单币种：{getCurrencyAmount(record.orderAmountSet.settleMoney.currencyCode,record.orderAmountSet.settleMoney.amount)}</div>
              </>}
              trigger="click"
              arrow={false}
              placement="bottomRight"
              open={record.order_id == popoverKey}
              onOpenChange={(open) => {
                setPopoverKey(open ? record.order_id : null)
              }}
            >
              <Flex className='cursor-pointer' justify='flex-end' gap={6} onClick={(e) => e.stopPropagation()}>
                {getCurrencyAmount(record.orderAmountSet.storeMoney.currencyCode,record.orderAmountSet.storeMoney.amount)}
                <DownIcon />
              </Flex>
            </Popover>
          }
        </>;
      },
    },
  ];

  const fetchData = (orderStatus?:string,languagesId?:string) => {
    setLoading(true);
    const limit = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
  
    // 构造查询字符串
    const searchParams = new URLSearchParams();
    if (page) searchParams.set('page', page.toString());
    if (limit) searchParams.set('limit', limit.toString());

    const signal = createAbortController();
    getOrderList({
      page:page,
      limit:limit,
      // orders_status_id:id?.toString(),
      languages_id:languagesId?.toString(),
      // order_type:"",
      condition:JSON.stringify(orderList.condition),
      // shipping_status_id:"150",
      // bizOrderStatuses:JSON.stringify(orderList.bizOrderStatuses),
    },signal).then((res) => {
        const newData: DataType[] = res.data?.map((item: any) => ({
          ...item,
        }));
        setData(newData); // 使用过滤后的数据
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: Number(res.count),
          },
        });
        // 获取当前页面订单ids
        const pageIds = res.data?.map((item:any)=>item.id)
        orderList.setCurrentPageOrderIds(pageIds)
    }).catch(error => {
    }).finally(()=>{
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData(id,orderList.languages);
    console.log(orderList.condition)
    console.log(orderList.bizOrderStatuses)
  }, [tableParams.pagination?.current,tableParams.pagination?.pageSize,id,orderList.languages,orderList.condition.saleStoreHandles,orderList.bizOrderStatuses]);




  const handleTableChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter: any) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination?.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Scoped>
      <SelectedActions fetchData={fetchData} />
      {/* 列表 */}
      <Table
        columns={columns}
        rowKey={(record) => record.order_id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
        onRow={(record) => ({
          onClick: () => history.push(`/orders/${record.order_id}/${orderList.languages}`), // 点击行时调用handleOrderClick
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
    height: 56px;
  }
  
  .ant-table{
    border: 1px solid #eef1f7;
    border-bottom: none;
    border-radius: 6px;
  }
`;


