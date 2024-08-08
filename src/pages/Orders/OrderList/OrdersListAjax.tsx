import React, { ReactNode, useEffect, useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, Tooltip } from 'antd';
import type { GetProp, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import qs from 'qs';
import { CopyOutlined, EyeOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getOrderList } from '@/services/y2/order';
import { history, useIntl } from '@umijs/max';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

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
}
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface Props {
  filterCondition?: string[];
}

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

export default function OrdersListAjax({ filterCondition }: Props) {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  // 分页器初始参数
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // 列表数据
  const [data, setData] = useState<DataType[]>([]);

  // 表头
  const columns: TableColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'order.tableheader.orderid' }),
      dataIndex: 'orderid',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.orderdata' }),
      dataIndex: 'orderdata',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.orderstate' }),
      dataIndex: 'orderstate',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.paymenstate' }),
      dataIndex: 'paymentstate',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.deliverystate' }),
      dataIndex: 'deliverystate',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.paymentmethod' }),
      dataIndex: 'paymentmethod',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.paymentchannel' }),
      dataIndex: 'paymentchannel',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.deliveryname' }),
      dataIndex: 'deliveryname',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.tel' }),
      dataIndex: 'tel',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.shippingmethod' }),
      dataIndex: 'shippingmethod',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.pricetotal' }),
      dataIndex: 'price',
      width: 100,
      render: (value, record, index) => {
        let num = Number(value);
        return <>{`US$ ${num.toFixed(2)}`}</>;
      },
    },
  ];

  const fetchData = (condition?: string[]) => {
    setLoading(true);
    const limit = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    let finalCondition: string[] = condition ? condition : [];
    // 确保将过滤条件正确地传递给 getOrderList 方法
    getOrderList(page, limit, finalCondition)
      .then((res) => {
        let newData: DataType[] = [];
        res.data?.forEach((item: any) => {
          newData.push({
            orderid: item.id,
            orderdata: item.date_purchased,
            orderstate: translateStatus('order.status.name_' + item.orders_status_id, intl),
            paymentmethod: item.payment_method,
            paymentstate: translateStatus('order.status.name_' + item.payment_status_id, intl),
            deliverystate: translateStatus('order.status.name_' + item.delivery_status_id, intl),
            deliveryname: item.delivery_name,
            tel: item.tel,
            shippingmethod: item.shipping_method,
            paymentchannel: item.payment_method,
            price: item.order_total,
          });
        });
        setData(newData);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.count,
          },
        });
      });
  };

  const translateStatus = (statusKey: string, intl: any): string => {
    return intl.formatMessage({ id: statusKey });
  };

  useEffect(() => {
    // 在这里监听 `filterCondition` 的变化，并重新获取数据
    fetchData(filterCondition);
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, filterCondition]);

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
        rowKey={(record) => record.orderid}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1300 }}
        onRow={(record) => ({
          onClick: () => handleOrderClick(record.orderid), // 点击行时调用handleOrderClick
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
`;