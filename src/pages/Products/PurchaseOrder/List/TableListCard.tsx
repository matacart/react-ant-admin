import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, Tag, Tooltip } from 'antd';
import type { GetProp, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import qs from 'qs';
import { CopyOutlined, ExclamationCircleOutlined, EyeOutlined, InfoCircleFilled, PictureOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { deleteProduct, getCountryList, getProductList, getPurchase, upDateProductStatus } from '@/services/y2/api';
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

function TableListCard({purchaseorderData}:{purchaseorderData:any}) {
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
  const [data, setData] = useState<DataType[]>([]);

  // 表头
  const columns: TableColumnsType<DataType> = [
    {
        title: '采购单号',
        dataIndex: 'name',
        width: 120,
    },
    {
        title: '供应商',
        dataIndex: 'supplier_name',
        width: 120,
    },
    {
        title: '收货地点',
        dataIndex: 'warehouse_name',
        width: 120,
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 120,
        render(value, record, index) {
            switch(value){
              case "1":
                return (
                  <Tag color="default" style={{borderRadius:"9999px",backgroundColor:"#f0f3f9",padding:"0 8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                      <div style={{height:"4px",width:"4px",backgroundColor: "#7a8499",borderRadius:"50%"}}></div>
                      <div className='font-12 color-474F5E'>草稿</div>
                    </div>
                  </Tag>
                )
              case "2":
                return (
                  <Tag color="warning" style={{borderRadius:"9999px",backgroundColor:"#ffedc9",padding:"0 8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                      <div style={{height:"4px",width:"4px",backgroundColor: "#FE9E0F",borderRadius:"50%"}}></div>
                      <div className='font-12 color-474F5E'>已订购</div>
                    </div>
                  </Tag>
                )
              case "3":
                return (
                  <Tag color="processing" style={{borderRadius:"9999px",backgroundColor:"#e2f0ff",padding:"0 8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                      <div style={{height:"4px",width:"4px",backgroundColor: "#356dff",borderRadius:"50%"}}></div>
                      <div className='font-12 color-474F5E'>部分收货</div>
                    </div>
                  </Tag>
                )
              case "4":
                return (
                  <Tag color="success" style={{borderRadius:"9999px",backgroundColor:"#D6FAE7",padding:"0 8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                      <div style={{height:"4px",width:"4px",backgroundColor: "#35C08E",borderRadius:"50%"}}></div>
                      <div className='font-12 color-474F5E'>收货完成</div>
                    </div>
                  </Tag>
                )
              case "5":
                return (
                  <Tag color="error" style={{borderRadius:"9999px",backgroundColor:"#FFEBE7",padding:"0 8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                      <div style={{height:"4px",width:"4px",backgroundColor: "#F86140",borderRadius:"50%"}}></div>
                      <div className='font-12 color-474F5E'>已关闭</div>
                    </div>
                  </Tag>
                )
            }
            
        },
    },
    {
        title: '收货数量',
        dataIndex: 'money',
        width: 120,
    },
    {
        title: '总计',
        dataIndex: 'order_total',
        width: 120,
        render(value, record, index) {
          return (
            <div>US${value}</div>
          )
      },
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



  useEffect(()=>{
    setData(purchaseorderData)

    console.log(purchaseorderData)

  },[purchaseorderData])

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
                getPurchase(record.id).then(res=>{
                  console.log(res)
                })
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