import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, Tooltip } from 'antd';
import type { GetProp, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import qs from 'qs';
import { CopyOutlined, ExclamationCircleOutlined, EyeOutlined, InfoCircleFilled, PictureOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { deleteProduct, getCountryList, getProductList, upDateProductStatus } from '@/services/y2/api';
import styled from 'styled-components';
import newStore from '@/store/newStore';
import cookie from 'react-cookies';
import oldStore from '@/store/product/oldStore';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项商品数据类型
interface DataType {
//   key: React.Key;
//   model?: string;
//   imgUrl?: string;
//   product_image?: string;
//   title?: string;
//   content?: string;
//   price?: number;
//   costPrice?: number;
//   ISBN?: string;
//   inventory?: number;
//   HSCode?:string;
//   notion?: string;
//   state?: string;
//   productid:string;
//   languages_id:string
}

// ToolTip内容
const content: ReactNode = (<>
  <div>·在线商店</div>
  <div>·贴文销售</div>
  <div>·消息中心</div>
  <div>·Google</div>
  <div>·WhatsApp</div>
  <div>·Facebook</div>
  <div>·Telegram</div>

</>)

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

function TableListCard() {
  const [loading, setLoading] = useState(false);
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 新增的状态

  const [modalOpen, setModalOpen] = useState(false);

  const [productStatusModal, contextProductStatusModal] = Modal.useModal();
  // 分页器初始参数
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  //列表数据
//   const [data, setData] = useState<DataType[]>([]);

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sydney No. 1 Lake Park',
    },
  ];

  // 表头
  const columns: TableColumnsType<DataType> = [
    {
        title: '采购单号',
        dataIndex: 'name',
        width: 120,
    },
    {
        title: '供应商',
        dataIndex: 'money',
        width: 120,
    },
    {
        title: '收货地点',
        dataIndex: 'money',
        width: 120,
    },
    {
        title: '状态',
        dataIndex: 'money',
        width: 120,
    },
    {
        title: '收货数量',
        dataIndex: 'money',
        width: 120,
    },
    {
        title: '总计',
        dataIndex: 'money',
        width: 120,
    },
    {
        title: '预计到达日期',
        dataIndex: 'money',
        width: 120,
    },
  ];

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   setData([]);
    // }
  };

  return (
    <Scoped>
        {/* 商品列表 */}
        <Table
            columns={columns}
            // rowKey={(record) => record.key}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            scroll={{ x: 1300 }}
            onRow={(record) => ({
            onClick: () => {
                console.log('Row clicked:', record);
            },
            })}
            rowSelection={{
                type: 'checkbox',
                selectedRowKeys, // 使用状态来记录选中的行
                onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    setSelectedRowKeys(selectedRowKeys); // 更新状态
                },
            }}
            // 隐藏表头
            showHeader={selectedRowKeys.length === 0}
        />
    </Scoped>
  );
};


export default TableListCard;

const Scoped = styled.div`
  .ant-table-tbody > tr > td {
    padding: 10px; 
  }
`
const ButtonIcon = styled.div`
.wrap{
    height:36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-content: center;
    border-radius:4px;
    &:hover{
        background-color: rgba(60, 181, 218, 0.114);
        cursor:pointer;
    }
}
`

const Content = styled.div`
  display:flex;
  flex-direction: column;
  gap: 5px;
  span{
  font-size: 14px;
  color: #313131
  }
`