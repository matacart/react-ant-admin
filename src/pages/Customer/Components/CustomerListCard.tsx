import React, { useEffect, useState } from 'react';
import { Button, Card, Input, Table, TableColumnsType, TablePaginationConfig, TableProps } from 'antd';
import styled from 'styled-components';
import Tag from 'antd/lib/tag';
import { SearchOutlined } from '@ant-design/icons';
import DefaultTag from '@/components/Tag/DefaultTag';
import { useNavigate } from 'react-router-dom';
import { getCustomerList } from '@/services/y2/api';

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

export default function CustmoerListAjax() {

  const navigate = useNavigate();

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
      title: '姓名',
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
      render: (text: string) => <>
        <DefaultTag text='未订阅' />
      </>,
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

    getCustomerList(tableParams.pagination?.current, tableParams.pagination?.pageSize).then((res) => {
        setData(res.data)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.count,
          },
        });
      }).catch(error => {
        console.error('Error fetching data:', error);
      }).finally(() => {
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
    <Scoped>
      <Card>
        {/* 控制 */}
        <div className="control" style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Input className='control-input' placeholder="搜索用户名/邮箱/手机号/地区" prefix={<SearchOutlined />} />
          <Button style={{height:"36px"}}>排序</Button>
        </div>
        {/* 数据 */}
        <Table
          className='table'
          columns={columns}
          rowKey={(record) => record.realname}
          onRow={(record) => ({
            onClick: () => {
              console.log('Row clicked:', record);
              navigate(`/customer/management/${record.id}`)
            },
          })}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: 900 }}
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
          }}
        />
      </Card>
    </Scoped>
  );
};

const Scoped = styled.div`
  .control{
    padding: 16px 0;
    &-input{
      width: 480px;
      height: 36px;
    }
  }
  .table{
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
  }
  
`