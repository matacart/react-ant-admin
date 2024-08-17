import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType, TablePaginationConfig, TableProps } from 'antd';
import styled from 'styled-components';
import Tag from 'antd/lib/tag';
import { getCustomerList } from '@/services/y2/customer';

// 表单项订单数据类型
interface DataType {
  realname: string;
  address: string;
  price: number;
  status: string;
  orderQuantity: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}

export default function OrdersListAjax() {
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [data, setData] = useState<DataType[]>([]);

  const renderCustomTag = (text: string) => (
    <Tag>
      {text}
    </Tag>
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: '真实姓名',
      dataIndex: 'realname',
      width: 100,
      render: (text: string) => (
        <span style={{ color: '#242833' }}>{text}</span>
      ),
    },
    {
      title: '邮箱订阅状态',
      dataIndex: 'status',
      width: 100,
      render: (text: string) => renderCustomTag(text),
    },
    {
      title: '地区',
      dataIndex: 'address',
      width: 100,
      render: (text: string) => (
        <span>{text}</span>
      ),
    },
    {
      title: '订单量',
      dataIndex: ' orderQuantity',
      width: 100,
      render: (text: string) => (
        <span>{text}</span>
      ),
    },
    {
      title: '消费金额',
      dataIndex: 'price',
      width: 100,
      render: (value: number, record: any, index: any) => {
        let num = Number(value);
        return <>{`US$ ${num.toFixed(2)}`}</>;
      },
    },
  ];

  const fetchData = () => {
    setLoading(true);

    getCustomerList(tableParams.pagination?.current, tableParams.pagination?.pageSize)
      .then((res) => {
        console.log('Response from getCustomerList:', res);

        const newData: DataType[] = res.data?.map((item: any) => ({
          realname: item.realname,
          address: item.address,
          price: item.price,
          orderQuantity: item.orderQuantity,
          status: item.status,
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
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange: TableProps['onChange'] = (pagination, sorter) => {
    setTableParams({
      pagination,
     
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <StyledTableWrapper>
      {/* 列表 */}
      <Table
        columns={columns}
        rowKey={(record) => record.realname}
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
    </StyledTableWrapper>
  );
};

const StyledTableWrapper = styled.div`
  .ant-table-thead > tr > th {
    background-color: #F5F8FC !important; // 设置表头背景色
  }

  .ant-table-tbody > tr > td {
    padding: 10px;
  }
`;