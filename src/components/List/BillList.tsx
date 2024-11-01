import React, { ReactNode, useEffect, useState } from 'react';
import { Avatar, Button, Checkbox, DatePicker, Dropdown, Flex, Input, message, Modal, Popover, Radio, Select, Space, Switch, Table, Tooltip } from 'antd';
import type { GetProp, MenuProps, RadioChangeEvent, SelectProps, TableColumnsType, TableProps } from 'antd';
import qs from 'qs';
import { CopyOutlined, DownOutlined, EyeOutlined, QuestionCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { result } from 'lodash';
import axios from 'axios';
import { deleteProduct, getProductList } from '@/services/y2/api';
import { Response } from 'express';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项账号数据类型
interface DataType {
  key: React.Key;
  imgUrl?: string;
  name?: string;
  price?: number;
  inventory?: number;
  state?: boolean;
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

// 账单类型
const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const billGeneratedItems: MenuProps['items'] = [
  {
    label: '订阅菜单',
    key: '1',
  },
  {
    label: '佣金',
    key: '2',
  },
  {
    label: '短信',
    key: '3'
  },
  {
    label: '渠道服务',
    key: '4',
    // icon: <UserOutlined />,
    // danger: true,
    // disabled: true,
  },
  {
    label: '增值功能',
    key: '5',
  },
  {
    label: '应用',
    key: '5',
  }
];

const menuProps = {
  items:billGeneratedItems,
  onClick: handleMenuClick,
};



export default function ProductListAjax() {

  const [loading, setLoading] = useState(false);

  // 分页器初始参数
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  //列表数据
  const [data, setData] = useState<DataType[]>([]);

  // 状态
  const onChangeSwich = (index: number) => {
    let oldDataItem = data[index]
    let newDataItem = {
      ...oldDataItem,
      state: !oldDataItem.state
    }
    let newData = [...data];
    newData[index].state = !oldDataItem.state
    setData(newData);
  };

  // 表头
  const columns: TableColumnsType<DataType> = [
    {
      title: '账单编号',
      dataIndex: 'name',
      width: 130,
    },
    {
      title: '账单类型',
      dataIndex: 'price',
      width: 120,
    },
    {
      title: '项目',
      dataIndex: 'inventory',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'state',
      width: 120,
    },
    {
      title: '账单总额',
      dataIndex: 'state',
      width: 120
    },
    {
      title: '状态',
      dataIndex: 'total',
      width: 150
    }
  ];

  const fetchData = () => {
    setLoading(true);
    const limit = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

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
  const { RangePicker } = DatePicker;
  return (
    <Scoped>
      <Flex gap={20} style={{ marginBottom: "20px", marginTop: "10px" }}>
        <Input placeholder='搜索账单编号' suffix={<SearchOutlined />}
          style={{ width: 320 }}
        />
        <Dropdown 
        menu={menuProps}>
          <Button style={{ width: 160,  height: 36 }}>
            账单类型
          </Button>
        </Dropdown>
        <Dropdown 
        menu={menuProps}>
          <Button style={{ width: 160,  height: 36 }}>
            账单状态
          </Button>
        </Dropdown>
        <RangePicker />
      </Flex>

      <div className='list'>
        {/* 账单列表 */}
        <Table
          columns={columns}
          rowKey={(record) => record.key}
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
      </div>
    </Scoped>
  );
};


const Scoped = styled.div`

  .ant-input-affix-wrapper{
      height:36px;
      background-color: #fff;
      background-image: none;
      border: 1px solid #d7dbe7;
      border-radius: 4px;
      caret-color: #356dff;
      color: #474f5e;
      display: inline-block;
      display: inline-flex;
      font-size: 14px;
      line-height: 1.5715;
      min-width: 0;
      padding: 6px 11px;
      position: relative;
      -webkit-transition: all .3s;
      transition: all .3s;
      width: 100%;
      &:hover{
        border-color: #356dff;
      }
    }
  .ant-input-affix-wrapper-focused{
      border-color: #5e91ff;
      border-right-width: 1px!important;
      box-shadow: 0 0 12px 0 rgba(53,109,255,0);
      outline: 0;
  }
  .ant-select-selector{
    height:32px;
    width:180px;
    background-color: #fff;
      background-image: none;
      border: 1px solid #d7dbe7;
      border-radius: 4px;
      caret-color: #356dff;
      color: #474f5e;
      display: inline-block;
      display: inline-flex;
      font-size: 14px;
      line-height: 1.5715;
      min-width: 0;
      padding: 6px 11px;
      position: relative;
      -webkit-transition: all .3s;
      transition: all .3s;
      width: 100%;
  }
`
