import React, { useEffect, useState } from 'react';
import { Avatar, Button, Checkbox, GetProp, Input, message, Modal, Popover, Radio, Switch, Table, TableColumnsType, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import qs from 'qs';
import { CopyOutlined, EyeOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getOrderList } from '@/services/y2/order';
import { history, useIntl } from '@umijs/max';
import Tag from 'antd/lib/tag';
import styles from './OrdersListAjax.scss';
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
  filter_group_id: string;
  filter_name: React.ReactNode;
  filter_field: string;
  filter_value: string;
  module: string;
}

interface Props {
  filterCondition?: FilterCondition[];
}

const ovalShapeClass = 'oval-shape';
const ovalShapeClass2 = 'oval-shape2';
const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

export default function OrdersListAjax({ filterCondition }: Props) {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [data, setData] = useState<DataType[]>([]);
  const renderCustomTag = (text: string) => (
    <Tag  className={styles[ovalShapeClass]}>
      {text}
    </Tag>
  );
  const renderCustomTag2 = (text: string) => (
    <Tag  className={styles[ovalShapeClass2]}>
      {text}
    </Tag>
  );
  const columns: TableColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'order.tableheader.orderid' }),
      dataIndex: 'orderid',
      width: 100,
      render: (text: string) => (
        <span style={{ color: '#242833' }}>{text}</span>
      ),
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
      render: (text: string) => renderCustomTag(text), // 使用自定义函数
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.paymenstate' }),
      dataIndex: 'paymentstate',
      width: 100,
      render: (text: string) => renderCustomTag(text), // 使用自定义函数
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.deliverystate' }),
      dataIndex: 'deliverystate',
      width: 100,
      render: (text: string) => renderCustomTag2(text), // 使用自定义函数
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
      render: (value: any, record: any, index: any) => {
        let num = Number(value);
        return <>{`US$ ${num.toFixed(2)}`}</>;
      },
    },
  ];

  const fetchData = (condition?: FilterCondition[]) => {
    setLoading(true);
    const limit = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    let finalCondition: FilterCondition[] = condition || [];

    // 确保 finalCondition 包含了 filterCondition 中的过滤条件
    if (filterCondition && filterCondition.length > 0) {
      finalCondition = filterCondition;
    }

    console.log('Fetching data with:', { page, limit, finalCondition });

    // 构造查询字符串
    const searchParams = new URLSearchParams();
    finalCondition.forEach(cond => {
      searchParams.set(cond.filter_field, cond.filter_value);
    });


  getOrderList(page, limit, finalCondition)
  .then((res) => {
    console.log('Response from getOrderList:', res);

    const newData: DataType[] = res.data?.map((item: any) => ({
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
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // 在这里监听 `filterCondition` 的变化，并重新获取数据
    fetchData(filterCondition);
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, filterCondition]);

  const translateStatus = (statusKey: string, intl: any): string => {
    return intl.formatMessage({ id: statusKey });
  };

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
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
  .ant-table-thead > tr > th {
    background-color: #F5F8FC !important; // 设置表头背景色
  }

  .ant-table-tbody > tr > td {
    padding: 10px;
  }
`;


