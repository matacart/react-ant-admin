import React, { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, Tooltip } from 'antd';
import type { GetProp, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import { CopyOutlined, DeleteOutlined, InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { history, Link, useIntl } from '@umijs/max';
import styled from 'styled-components';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项商品数据类型
interface DataType {
  id: string;
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
        (urlObj.port ? ':' + urlObj.port : '') + urlObj.pathname + urlObj.search + urlObj.hash);
      
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


// 商品复制
function StoresTable() {
  const [loading, setLoading] = useState(false);
  // 控制开关加载防止重复点击  --- 开关之间独立
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
        title: '店铺名称',
        dataIndex: 'secondDomain',
        width: 120,
      },
    {
      title: 'handle',
      dataIndex: 'model',
      width: 120,
    },
    {
      title: '域名',
      dataIndex: 'domainName',
      width: 120,
    },
  //   <Tag className="tag tag-success" style={{
  //     display: 'flex',
  //     alignContent: 'center'
  // }}>
  //     <span className="tag-right">
  //         <span className={"tag-dot " + ((item?.status == 1) ? 'tag-dot-success ' : 'tag-dot-error')} />
  //     </span>
  //     {(item?.status == 1) ?intl.formatMessage({id:"menu.stores.running"}): intl.formatMessage({id:"menu.stores.stop"})}
  // </Tag>
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
      // render: (_, record) => (
      //   <div className="item between">
      //     <span>{(record?.status == 1) ? intl.formatMessage({ id: "menu.stores.running" }) : intl.formatMessage({ id: "menu.stores.stop" })}</span>
      //     <Switch defaultChecked={record?.status == 1 ? true : false} onChange={(checked) => {
      //       // console.log(checked);          }}/>
      //   </div>
      // )
      width: 120,
    },
    {
      title: '店铺套餐',
      dataIndex: 'model',
      width: 120,
    },
    {
      title: '商家账号',
      dataIndex: 'model',
      width: 120,
    },
    {
      title: <div>角色
      <Tooltip title={
        <div>
          <div>· 店主：店铺的创建人，拥有店铺的所有权限。</div>
          <div>· 店长：帮助店主管理店铺，拥有店铺绝大部分权限。</div>
          <div>· 员工：帮助店主管理店铺，仅拥有店主/店长授予的权限。</div>
        </div>
      }>
          <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
              <QuestionCircleOutlined />
          </span>
        </Tooltip>
      </div>,
      dataIndex: 'model',
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
            <Button onClick={()=>{
              // console.log(record)
            }}>进入后台</Button>
            {/* <ButtonIcon>
              <Tooltip title="复制">
                <div className='wrap' onClick={(e) => {
                  e.stopPropagation()
                //   setCopyProduct(record)
                //   setModalOpen(true);
                }}>
                  
                </div>
              </Tooltip>
            </ButtonIcon> */}
          </div>
        )
      }
    },

  ];

//   const fetchData = () => {
//     setLoading(true);
//     const limit  = getRandomuserParams(tableParams).results;
//     const page = getRandomuserParams(tableParams).page;
//   };
  
  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleOrderClick = (id: string,languages_id:string) => {
    console.log('Clicked product:', id); // 添加调试日志
    // 
    history.push(`/products/categories/edit?id=`+id+`&languages_id=`+languages_id)
  };

  useEffect(()=>{
    console.log(JSON.parse(sessionStorage["domain"]))
    setData(JSON.parse(sessionStorage["domain"]))
    // getCategoryList().then(res=>{
    //     console.log(res.data)
    //     setData([...res.data])
    //     setLoading(false);
    // })
  },[])


  return (
    <Scoped>
    {/* 商品列表 */}
      <Table
        columns={columns}
        // rowKey={(record) => record.key}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        // onChange={handleTableChange}
        scroll={{ x: 1300 }}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => {
            // 
            if(!window.location.hostname.startsWith("localhost")){
              const newUrl = replaceSubdomain(window.location.href,record.secondDomain,window.location.hostname.slice(0,window.location.hostname.indexOf(".")))
              window.open(newUrl)
            }
            // console.log('Row clicked:', record);
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