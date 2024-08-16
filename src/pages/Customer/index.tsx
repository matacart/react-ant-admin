import React, { useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, TableColumnsType, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import styled from 'styled-components';

import Tag from 'antd/lib/tag';
import styles from './index.scss';

// 表单项订单数据类型
interface DataType {
 name:string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
}


const ovalShapeClass = 'oval-shape';
const ovalShapeClass2 = 'oval-shape2';

export default function OrdersListAjax() {
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const renderCustomTag = (text: string) => (
    <Tag className={styles[ovalShapeClass]}>
      {text}
    </Tag>
  );

  const columns: TableColumnsType<DataType> = [
    {
      title:'姓名',
      dataIndex: 'orderid',
      width: 100,
      render: (text: string) => (
        <span style={{ color: '#242833' }}>{text}</span>
      ),
    },
    {
      title:'邮箱订阅状态',
      dataIndex: 'orderstate',
      width: 100,
      render: (text: string) => renderCustomTag(text),
    },
    {
      title: '地址',
      dataIndex: 'tel',
      width: 100,
    },
    {
      title: '订阅量',
      dataIndex: 'shippingmethod',
      width: 100,
    },
    {
      title:'消费金额',
      dataIndex: 'price',
      width: 100,
      render: (value: any, record: any, index: any) => {
        let num = Number(value);
        return <>{`US$ ${num.toFixed(2)}`}</>;
      },
    },
  ];

 


  return (
    <StyledTableWrapper>
      {/* 列表 */}
      <Table
        columns={columns}
        pagination={tableParams.pagination}
        loading={loading}
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