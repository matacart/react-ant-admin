import React, { useEffect, useRef, useState } from 'react';
import { Modal, Popover, Switch, Table, Tooltip } from 'antd';
import type { GetProp, TableColumnsType, TableProps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getDomainList } from '@/services/y2/api';
import shopsManagement from "@/store/shops/shopsManagementStore";
import SuccessTag from '@/components/Tag/SuccessTag';
import DefaultTag from '@/components/Tag/DefaultTag';
import ErrorTag from '@/components/Tag/ErrorTag';
import WarningTag from '@/components/Tag/WarningTag';
import MyButton from '@/components/Button/MyButton';
import { useAbortController } from '@/hooks/customHooks';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项商品数据类型
interface DataType {
  id: string;
  store_name:string;
  second_domain:string;
  status:string;
}
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

function replaceSubdomain(url:string,newSubdomain:string,oldSubdomain:string) {
  try {
    // 创建一个新的URL对象
    const urlObj = new URL(url);
    // 获取主机名（包括子域名）
    const hostname = urlObj.hostname;
    // 使用replace方法替换子域名
    // 注意：这里使用正则表达式来确保只替换完整的子域名部分
    // 假设子域名和主域名之间只有一个点分隔
    const newHostname = hostname.replace(new RegExp(`^${oldSubdomain}\\.`), `${newSubdomain}.`);
    // 如果替换成功（即新的主机名与旧的不同），则更新URL对象的主机名
    if (newHostname !== hostname) {
      // 由于URL对象的hostname属性是只读的，我们需要创建一个新的URL对象
      // 这里通过重新设置协议、主机名、端口（如果有）、以及路径名来构建新URL
      const newUrlObj = new URL(urlObj.protocol + '//' + newHostname +
        (urlObj.port ? ':' + urlObj.port : '') + '/home' + urlObj.search + urlObj.hash);
        // urlObj.pathname
      // console.log(urlObj.pathname)
      // 返回新的URL字符串
      return newUrlObj.toString();
    }
    // 如果替换失败（即没有找到要替换的子域名），则返回原始URL
    return url;
  } catch (error) {
    // 如果URL无效，抛出错误或返回null/undefined等
    console.error('Invalid URL:', error);
    return null;
  }
}

function StoresTable() {

  const [loading, setLoading] = useState(false);

  const { createAbortController } = useAbortController();
  // 控制开关加载防止重复点击  --- 开关之间独立
  const [modalOpen, setModalOpen] = useState(false);

  const [productStatusModal, contextProductStatusModal] = Modal.useModal();
  // 分页器初始参数
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    }
  });
 
  //列表数据
  const [data, setData] = useState<DataType[]>([]);

  // 表头
  const columns: TableColumnsType<DataType> = [
    {
        title: '店铺名称',
        render: (_, record) => (
          <div>
            <img style={{width:"38px",marginLeft:"8px"}} src='/img/storeLogo.png' className="storeLogo" />
            <span style={{marginLeft:"8px"}}>{record.store_name}</span>
          </div>
        ),

        dataIndex: 'store_name',
        width: 160,
    },
    {
      title: 'handle',
      dataIndex: 'second_domain',
      width: 120,
    },
    {
      title: '域名',
      dataIndex: 'domain_name',
      width: 200,
    },
    {
      title: <div>店铺状态
        <Tooltip title={
          <div>
            <div>· 营业中：网店正常，顾客可下单购物</div>
            <div>· 已打烊：网店不可访问，顾客无法下单</div>
            <div>· 已冻结：因违规/异常原因，导致网店不可访问</div>
            <div>· 已停用：因套餐到期，导致店铺不可用"</div>
          </div>
        }>
          <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
              <QuestionCircleOutlined />
          </span>
        </Tooltip>
      </div>,
      dataIndex: 'status',
      render: (_, record) => {
        switch(record?.status) {
          case "0":
            return <DefaultTag text='已打烊' />;
          case "1":
            return <SuccessTag text='营业中' />;
          case "-1":
            return <WarningTag text='已冻结' />;
          case "-2":
            return <ErrorTag text='已停用' />;
          case "-3":
            return <ErrorTag text='已注销' />;
        }
      },
      width: 120,
    },
    {
      title: '店铺套餐',
      dataIndex: 'package_name',
      width: 120,
    },
    {
      title: '商家账号',
      dataIndex: 'employee_id',
      width: 120,
    },
    {
      title: <div>角色
      <Tooltip title={
        <div>
          {/* <div>· ：店铺的创建人，拥有店铺的所有权限。</div> */}
          <div>· 管理员：帮助店主管理店铺，拥有店铺绝大部分权限。</div>
          <div>· 操作员：帮助店主管理店铺，仅拥有店主/店长授予的权限。</div>
        </div>
      }>
          <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
              <QuestionCircleOutlined />
          </span>
        </Tooltip>
      </div>,
      dataIndex: 'employee_realname',
      width: 120,
    },
    {
      title: <div>30天访客总数
      <Tooltip title="该统计数据口径截止到昨天，可在“数据管理”面板查看实时更新数据">
          <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
              <QuestionCircleOutlined />
          </span>
      </Tooltip>
      </div>,
      dataIndex: 'model',
      width: 140,
    },
    {
      title: <div>30天订单总数
      <Tooltip title="该统计数据口径截止到昨天，可在“数据管理”面板查看实时更新数据">
          <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
              <QuestionCircleOutlined />
          </span>
      </Tooltip>
      </div>,
      dataIndex: 'model',
      width: 140,
    },
    {
      title: <div>30天订单总额
      <Tooltip title="该统计数据口径截止到昨天，可在“数据管理”面板查看实时更新数据">
          <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
              <QuestionCircleOutlined />
          </span>
      </Tooltip>
      </div>,
      dataIndex: 'model',
      width: 140,
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      render: (index,record) => {
        return (
          <div style={{
            color: '#474f5e',
            fontSize: 20,
            display: 'flex',

          }} >
            <MyButton text={'进入后台'} />
          </div>
        )
      }
    },

  ];
  
  const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  useEffect(()=>{
    setLoading(true);
    const signal = createAbortController();
    getDomainList({
      data:{
        page:tableParams?.pagination?.current,
        limit:tableParams?.pagination?.pageSize
      },
      signal:signal
    }).then((res)=>{
      shopsManagement.setEnalbeCount(res.count)
      setData(res.data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams?.pagination,
          total: Number(res.count)
        }
      });
    }).catch(err=>{
      if(err.name !== "AbortError"){
        console.log(err)
      }
    }).finally(()=>{
      setLoading(false)
    })
  },[tableParams?.pagination?.current,tableParams?.pagination?.pageSize,shopsManagement.employee,shopsManagement.role])

  return (
    <Scoped>
    {/* 商品列表 */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams?.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1300 }}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => {
            // 跳转店铺
            if(!window.location.hostname.startsWith("localhost")){
              const newUrl = replaceSubdomain(window.location.href,record.second_domain,window.location.hostname.slice(0,window.location.hostname.indexOf(".")))
              newUrl && window.open(newUrl)
            }
          },
        })}
        // rowSelection={{
        //   type: 'checkbox',
        //   onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //   },
        // }}
      />
    </Scoped>
  );
};


export default StoresTable;

const Scoped = styled.div`
  .ant-table-tbody > tr > td {
    padding: 10px; 
  }
  /* 确保加载指示器在表格容器内居中 */
  .ant-table-wrapper .ant-spin-nested-loading .ant-spin {
    position: absolute;
    left: 50%;
    top: calc(50% - 30px);
    transform: translate(-50%, -50%);
    z-index: 1000;
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
const TagStyle = styled.div`
  width: 72px;
  .tag{
    border-radius: 9999px;
    font-weight:400;
    .tag-right{
        display: flex;
        flex-wrap: wrap;
        align-content: center ;
        .tag-dot{
            display:inline-block;
            border-radius: 50%;
            margin-right: 5px;
            height: 4px;
            width: 4px;
        }
        .tag-dot-error{
            background-color: #f86140;
        }
        .tag-dot-success{
            background-color: #35c08e;
        }
    }
  }
  .tag-success{
    background-color: #d6fae7;
    border: 1px solid rgba(53,192,142,.2);
  }
  .tag-error{
    background-color: #ffebe7;
    border: 1px solid rgba(248,97,64,.2);
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