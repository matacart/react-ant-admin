import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, Tooltip } from 'antd';
import type { GetProp, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import { CopyOutlined, ExclamationCircleOutlined, EyeOutlined, InfoCircleFilled, PictureOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { deleteProduct, getCountryList, getProductList, upDateProductStatus } from '@/services/y2/api';
import { history } from '@umijs/max';
import styled from 'styled-components';
import SelectedActions from './SelectedActions';
import cookie from 'react-cookies';
import productList from '@/store/product/productList';
import { observer } from 'mobx-react-lite';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项商品数据类型
interface DataType {
  key: React.Key;
  model?: string;
  imgUrl?: string;
  product_image?: string;
  title?: string;
  content?: string;
  price?: number;
  costPrice?: number;
  ISBN?: string;
  inventory?: number;
  HSCode?:string;
  notion?: string;
  state?: string;
  productid:string;
  languages_id:string
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
// 商品复制



const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function ProductListAjax(selectProps:any) {
  const [loading, setLoading] = useState(false);
  // 控制开关加载防止重复点击  --- 开关之间独立
  const [onLoadingList, setOnLoadingList] = useState<any>([]);
  // 
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 新增的状态

  const [modalOpen, setModalOpen] = useState(false);

  const [productStatusModal, contextProductStatusModal] = Modal.useModal();
  // 分页器初始参数
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 50,
      pageSizeOptions:[50,200,400,600]
    },
  });
  // 复制商品模态框
  const [radioValue, setRadioValue] = useState(1)
  // 复制商品的数据
  const [copyProduct, setCopyProduct] = useState<any>({});
  // 是否复制商品图片
  const [copyProductImage, setCopyProductImage] = useState(false);
  // 是否复制商品库存
  const [copyProductInventory, setCopyProductInventory] = useState(false);
  // 商品状态弹窗
  const productStatusConfirm = (productData:any,index:number,checked:boolean) => {
    const tempModal = productStatusModal.info({
      title: productData.state == "1"?"确认下架此商品？":"确认上架此商品？",
      icon: <InfoCircleFilled />,
      content: productData.state == "1"?"已下架的商品将在网店中隐藏，无法被客户看到":"已上架的商品会在网店中展示，可供你的客户浏览及购买",
      centered:true,
      footer:<div style={{textAlign:"right"}}>
        <Button onClick={()=>{
          tempModal.destroy();
          let tempSwitchList = [...onLoadingList];
          tempSwitchList[index] = false;
          setOnLoadingList(tempSwitchList);
        }}>取消</Button>
        <Button type="primary" style={{marginLeft:"10px",marginTop:"10px"}} onClick={()=>{
          tempModal.destroy();
          // 修改商品状态
          upDateProductStatus(productData.productid,checked?"1":"0").then(res=>{
            if(res.code == 0){
              onChangeSwich(index,checked)
            }else{
              message.error("修改状态失败")
            }
            let tempSwitchList = [...onLoadingList];
            tempSwitchList[index] = false;
            setOnLoadingList(tempSwitchList);
          })
        }}>确认</Button>
      </div>,
    });
  };
  // 
  const onChangeRadio = (e: RadioChangeEvent) => {
    // console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };
  //列表数据
  const [data, setData] = useState<DataType[]>([]);

  // 状态
  const onChangeSwich = (index: number,checked:boolean) => {
    // 改变商品的状态
    let newData = [...data];
    newData[index].state = checked?"1":"0"
    setData(newData);
  };
  // 表头
  const columns: TableColumnsType<DataType> = [
    {
      title: '商品款式',
      dataIndex: 'title',
      width: 180,
      render: (value, record, index) => <div style={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignContent: 'center',
      }}>
        <Avatar shape="square" size="large" src={(record.imgUrl && record.imgUrl!=="")?record.imgUrl+"?x-oss-process=image/resize,w_100":"/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"} />
        <span style={{
          marginLeft: 10,
          alignContent: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth:"100%"
        }}>{record.title}</span>
      </div>
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: 120,
    },
    {
      title: '在线可售数量',
      dataIndex: 'specialprice',
      width: 150,
      render: (value, record, index) =>{
        let num = Number(value);
        return <>
          {`${cookie.load("symbolLeft")} ${num.toFixed(2)}`}
        </>
      } 
    },
    {
      title: '库存策略',
      dataIndex: 'state',
      width: 120,
      render: (text, record, index) => <></>
    },
    {
      title: '不可用',
      dataIndex: 'state',
      width: 120,
      render: (text, record, index) => <></>
    },
    {
      title: '承诺',
      dataIndex: 'state',
      width: 120,
      render: (text, record, index) => <></>
    },
    {
      title: '可售',
      dataIndex: 'state',
      width: 120,
      render: (text, record, index) => <></>
    },
    {
      title: '现货',
      dataIndex: 'state',
      width: 120,
      render: (text, record, index) => <></>
    },
    {
      title: '传入',
      dataIndex: 'state',
      width: 120,
      render: (text, record, index) => <></>
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    const limit  = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;

    const res = {
      page:page,
      limit:limit,
      title:"",
      languages_id:productList.languagesId,
      tag:"",
      status:productList.flag,
      alliance_status:productList.isAlliance,
      hosted_status:productList.isHosted,
      // 条件
      condition:JSON.stringify(productList.condition)
    }

    try {
      const result = await getProductList(res)
      setLoading(false);
      // 201 空
      if(result.code == 0 || result.code == 201){
        let newData:DataType[] = [];
        let switchList:boolean[] = [];
        result.data?.forEach((item:any)=>{
          newData.push({
            key:item.id,
            model: item.model,
            imgUrl: item.product_image,  //封面
            product_image: item.additional_image,
            price: item.price,
            // specialprice:item.specialprice,
            costPrice:item.cost_price,
            title: item.title,
            content:item.content,
            state: item.status,
            inventory: item.quantity,
            ISBN:item.barcode,
            HSCode:item.hs_code,
            notion:item.shipping_country_id,
            productid:item.id,  //产品id
            languages_id:item.languages_id,
            // 获取所有数据
          })
        switchList.push(false)
        })
        // 初始化开关数组
        setOnLoadingList(switchList);
        setData(newData);
        setLoading(false)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: result.count,
          }
        });
        productList.setCount(result.count)
        return
      }
      throw new Error(result);
    }catch(error){
      message.error('获取数据失败');
    }
    setLoading(false);
  };
  useEffect(() => {
    // fetchData();
  }, []);

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleOrderClick = (productId: string,languages_id:string) => {
    // console.log('Clicked product:', productId); // 添加调试日志
    // 
    // history.push(`/products/productId/edit`,{
    //   query: {
    //     productId:productId,
    //     languages_id:languages_id
    //   }
    // })
    // history.push(`/products/edit?productId=`+productId+`&languagesId=`+languages_id)
    history.push(`/products/edit/${productId}/${languages_id}`)
  };
  
  return (
    <Scoped>
      {/* 商品列表 */}
      <div className='table-box'>
        <Table
          columns={columns}
          // rowKey={(record) => record.key}
          components={
            productList.productList.length !== 0 ?{
              header: {
                wrapper:()=>{
                  return (
                    <thead>
                      <tr>
                        <th colSpan={7}>
                          {/* 显示选择的数量和操作按钮 */}
                          {/* <SelectedActions onFetchData={fetchData}/> */}
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
          // onChange={handleTableChange}
          scroll={{
            y: 'calc(100vh - 410px)', // 垂直滚动
            x: 1300
          }}
          rowKey={(record) => record.productid}
          onRow={(record) => ({
            onClick: () => {
              console.log('Row clicked:', record);
              handleOrderClick(record.productid,record.languages_id); // 点击行时调用handleOrderClick
            },
          })}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys:productList.productList, // 使用状态来记录选中的行
            onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
              productList.setProductList(selectedRowKeys)
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
      {contextProductStatusModal}
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