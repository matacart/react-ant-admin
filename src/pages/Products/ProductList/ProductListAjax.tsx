import React, { ReactNode, useEffect, useState } from 'react';
import { App, Avatar, Flex, Popover, Switch, Table, Tooltip } from 'antd';
import type { GetProp,TableColumnsType, TableProps } from 'antd';
import { CopyOutlined, EyeOutlined, InfoCircleFilled } from '@ant-design/icons';
import { getProductList, upDateProductStatus } from '@/services/y2/apiStore';
import { history } from '@umijs/max';
import styled from 'styled-components';
import SelectedActions from './SelectedActions';
import productList from '@/store/product/productList';
import { observer } from 'mobx-react-lite';
import { useAbortController } from '@/hooks/customHooks';
import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { currencyPrecision } from '@/utils/common';
import { useSymbolLeft,usePrimaryDomain } from '@/hooks/customHooks';
import ProductCopyModal from './ProductCopyModal';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项商品数据类型
interface DataType {
  id: string;
  model: string;
  product_image: string;
  title: string;
  content?: string;
  specialprice:number;
  price?: number;
  costPrice?: number;
  quantity: number;
  status: string;
  handle:string;
  product_id:string;
  languages_id:string;
  domain_id:string;

  ISBN?: string;
  HSCode?:string;
  notion?: string;
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

// 分页参数适配器
const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function ProductListAjax(selectProps:any) {

  const { createAbortController } = useAbortController();

  const primaryDomain = usePrimaryDomain();

  const { modal, message } = App.useApp();  // 获取带有上下文的 modal 对象

  const symbolLeft = useSymbolLeft();

  const [loading, setLoading] = useState(false);
  // 控制开关加载防止重复点击  --- 开关之间独立
  const [onLoadingList, setOnLoadingList] = useState<any>([]);
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 新增的状态

  // 复制商品模态框状态
  const [open, setOpen] = useState(false);
  const [copyProduct, setCopyProduct] = useState<DataType | null>(null);

  // 分页器初始参数
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions:[10,20,50,100]
    },
  });
  // 商品状态弹窗
  const productStatusConfirm = (product:DataType,index:number,checked:boolean) => {
    const tempModal = modal.info({
      title: product.status == "1"?"确认下架此商品？":"确认上架此商品？",
      icon: <InfoCircleFilled />,
      content: product.status == "1"?"已下架的商品将在网店中隐藏，无法被客户看到。":"已上架的商品会在网店中展示，可供你的客户浏览及购买。",
      centered:true,
      footer:<Flex justify='flex-end' gap={12} style={{marginTop:"20px"}}>
        <DefaultButton onClick={()=>{
          tempModal.destroy();
          let tempSwitchList = [...onLoadingList];
          tempSwitchList[index] = false;
          setOnLoadingList(tempSwitchList);
        }} text='取消' />
        <PrimaryButton onClick={()=>{
          tempModal.destroy();
          // 修改商品状态
          upDateProductStatus(product.product_id,checked?"1":"0").then(res=>{
            onChangeSwich(index,checked)
          }).catch(()=>{
          }).finally(()=>{
            // 状态修改完成后，关闭加载状态
            let tempSwitchList = [...onLoadingList];
            tempSwitchList[index] = false;
            setOnLoadingList(tempSwitchList);
          })
        }} text="确认" />
      </Flex>,
    });
  };
  //列表数据
  const [data, setData] = useState<DataType[]>([]);
  // 状态
  const onChangeSwich = (index: number,checked:boolean) => {
    // 改变商品的状态
    let newData = [...data];
    newData[index].status = checked?"1":"0"
    setData(newData);
  };
  // 表头
  const columns: TableColumnsType<DataType> = [
    {
      title: '商品',
      dataIndex: 'title',
      width: 180,
      render: (value, record, index) => <div style={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignContent: 'center',
      }}>
        <Avatar shape="square" size="large" src={(record.product_image && record.product_image!=="")?record.product_image+"?x-oss-process=image/resize,w_100":"/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"} />
        <span style={{
          marginLeft: 10,
          alignContent: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth:'calc(100% - 48px)',
        }}>{record.title}</span>
      </div>
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: 120,
    },
    {
      title: '售价',
      dataIndex: 'specialprice',
      width: 150,
      render: (value, record, index) =>{
        return <>
          {`${symbolLeft} ${currencyPrecision(value)}`}
        </>
      } 
    },
    {
      title: '库存数',
      dataIndex: 'quantity',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      render: (value, record, index) =>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 9,
          alignContent: 'center',
        }}>
          {value !=="2"?<>
            <Switch loading={onLoadingList[index]} style={{
              position: 'relative',
              top: "3px",
            }} size='small' checked={value == "1"?true:false} onChange={(checked,event) => { 
              event.stopPropagation();
              let tempList = [...onLoadingList];
              tempList[index] = true;
              setOnLoadingList(tempList);
              productStatusConfirm(record,index,checked);
            }} />
            <Popover content={content} title="销售渠道" style={{
              width: '20px'
            }} trigger="click">
              {value == "1" ? '上架' : '下架'}
            </Popover>
          </>:<div>已存档</div>}
        </div>,
    },
    {
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (index,record) => {
        return (
          <div style={{
            color: '#474f5e',
            fontSize: 20,
            display: 'flex',

          }} >
            <ButtonIcon>
              <div className='wrap' onClick={(e) => {
                  e.stopPropagation()
                  primaryDomain && window.open(`${primaryDomain}/products/${record.handle}`)
                }}>
                <Tooltip title="预览">
                  <EyeOutlined />
                </Tooltip>
              </div>
            </ButtonIcon>
            <ButtonIcon>
              <Tooltip title="复制">
                <div className='wrap' onClick={(e) => {
                  e.stopPropagation()
                  setCopyProduct({...record})
                  setOpen(true);
                }}>
                  <CopyOutlined />
                </div>
              </Tooltip>
            </ButtonIcon>
          </div>
        )
      }
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    const signal = createAbortController();
    const limit  = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    getProductList({
      page:page?.toString() || "1",
      limit:limit?.toString() || "10",
      title:"",
      languages_id:productList.languagesId,
      tag:"",
      status:productList.flag || "",
      // 条件
      alliance_status:productList.isAlliance || "",
      hosted_status:productList.isHosted || "",
      // 条件
      condition:JSON.stringify(productList.condition)
    },signal).then((res)=>{
      let switchList:boolean[] = [];
      res.data?.forEach((item:any)=>{
        switchList.push(false)
      })
      // 初始化开关数组
      setOnLoadingList(switchList);
      setData(res.data || []);
      setLoading(false)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: Number(res.count),
        }
      });
      productList.setCount(Number(res.count))
    }).catch(()=>{
    }).finally(()=>{
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [productList.languagesId,productList.condition,productList.isAlliance,productList.isHosted,productList.flag,tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange = (pagination:any, filters:any, sorter:any) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleOrderClick = (record: DataType) => {
    history.push(`/products/edit/${record.id}/${productList.languagesId}`);
  };
  
  return (
    <Scoped>
      {/* 商品列表 */}
      <div className='table-box'>
        <Table
          columns={columns}
          components={
            productList.productList.length !== 0 ?{
              header: {
                wrapper:()=>{
                  return (
                    <thead>
                      <tr>
                        <th colSpan={7}>
                          {/* 显示选择的数量和操作按钮 */}
                          <SelectedActions onFetchData={fetchData}/>
                        </th>
                      </tr>
                    </thead>
                  )
                }
              },
            }:{}
          }
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          scroll={{
            y: 'calc(100vh - 410px)', // 垂直滚动
            x: 1300
          }}
          rowKey={(record) => record.id}
          onRow={(record) => ({
            onClick: () => {
              handleOrderClick(record); // 点击行时调用handleOrderClick
            },
          })}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys:productList.productList, // 使用状态来记录选中的行
            onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
              productList.setProductList(selectedRowKeys)
              if(productList.allSelected){
                productList.setAllSelected(false)
                message.success('已取消全选');
              }
            },
          }}
          // 隐藏表头
          // showHeader={selectedRowKeys.length === 0}
        />
      </div>
      {/* 复制商品模态框 */}
      <ProductCopyModal open={open} setOpen={setOpen} product={copyProduct} />
    </Scoped>
  );
};


export default observer(ProductListAjax)

const Scoped = styled.div`
  .full-width-header {
    display: block !important;
    width: 100% !important;
  }
  .ant-table-tbody > tr > td {
    padding: 10px; 
  }
  .ant-table{
    border: 1px solid #eef1f7;
    border-radius: 6px;
    border-bottom: none;
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