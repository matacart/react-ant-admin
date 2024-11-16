import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, Tooltip } from 'antd';
import type { GetProp, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import qs from 'qs';
import { CopyOutlined, ExclamationCircleOutlined, EyeOutlined, InfoCircleFilled, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { deleteProduct, getProductList, upDateProductStatus } from '@/services/y2/api';
import { history, useIntl } from '@umijs/max';
import styled from 'styled-components';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项商品数据类型
interface DataType {
  key: React.Key;
  imgUrl?: string;
  name?: string;
  price?: number;
  inventory?: number;
  state?: boolean;
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
  const [modalOpen, setModalOpen] = useState(false);

  const [productStatusModal, contextProductStatusModal] = Modal.useModal();
  // 分页器初始参数
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
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
  const productStatusConfirm = (productData:any,index:number) => {
    const tempModal = productStatusModal.info({
      title: '确认上架此商品？',
      icon: <InfoCircleFilled />,
      content: '已上架的商品会在网店中展示，可供你的客户浏览及购买',
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
          upDateProductStatus(productData.productid,!productData.state?"1":"0").then(res=>{
            if(res.code == 0){
              onChangeSwich(index)
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
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };
  //列表数据
  const [data, setData] = useState<DataType[]>([]);

  // 状态
  const onChangeSwich = (index: number) => {
    // 改变商品的状态
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
      title: '商品',
      dataIndex: 'name',
      width: 180,
      render: (value, record, index) => <div style={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignContent: 'center',
      }}>
        <Avatar shape="square" size="large" src={record.imgUrl} icon={<UserOutlined />} />
        <span style={{
          marginLeft: 10,
          alignContent: 'center',
          whiteSpace: 'nowrap',

          overflow: 'hidden',
          textOverflow: 'ellipsis',
          
          maxWidth:"100%"
        }}>{record.name}</span>
      </div>
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: 120,
    },
    {
      title: '售价',
      dataIndex: 'price',
      width: 150,
      render: (value, record, index) =>{
        let num = Number(value);
        return <>
          {`US$ ${num.toFixed(2)}`}
        </>
      } 
    },
    {
      title: '库存数',
      dataIndex: 'inventory',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 120,
      render: (text, record, index) =>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 9,
          alignContent: 'center',
        }}>
          <Switch loading={onLoadingList[index]} style={{
            position: 'relative',
            top: "3px",
          }} size='small' checked={data[index].state} onChange={(checked,event) => { 
            event.stopPropagation();
            let tempList = [...onLoadingList];
            tempList[index] = true;
            setOnLoadingList(tempList);
            // onLoadingList.splice(index)
            productStatusConfirm(record,index);
          }} />
          <Popover content={content} title="销售渠道" style={{
            width: '20px'
          }} trigger="click">
            {data[index].state ? '上架' : '下架'}
          </Popover>
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
                  history.push(`https://mall.live.hdyshop.cn/h-product-detail-p`+record.productid+`.html`);
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
                  setCopyProduct(record)
                  setModalOpen(true);
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

  const fetchData = () => {
    setLoading(true);
    // fetch(`/api/product/query/${qs.stringify(getRandomuserParams(tableParams))}`)
    // fetch(`/api/product/query`)
    //   .then((res) => res.json())
    //   .then(({ results }) => {
    //     setData(results);
    //     setLoading(false);
    //     setTableParams({
    //       ...tableParams,
    //       pagination: {
    //         ...tableParams.pagination,
    //         total: 200,
    //         // 200 is mock data, you should read it from server
    //         // total: data.totalCount,
    //       },
    //     });
    //     console.log(result);
    //   });
    const limit  = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    getProductList(page,limit,selectProps.selectProps.title,selectProps.selectProps.model,selectProps.selectProps.language)
      .then((res) => {
        let newData:DataType[] = [];
        let switchList:boolean[] = [];
        res.data?.forEach((item:any)=>{
          newData.push({
            key:item.id,
            model: item.model,
            imgUrl: item.product_image,
            price: item.price,
            name: item.title,
            state: item.status==1,
            inventory: item.quantity,
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
            total: res.count,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          }
        });
      })
  };
  useEffect(() => {
    // 
    console.log(selectProps.selectProps);
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize,selectProps.selectProps.language,selectProps.selectProps.title,selectProps.selectProps.model]);

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

  const handleOrderClick = (productId: string,languages_id:string) => {
    console.log('Clicked product:', productId); // 添加调试日志
    // 
    history.push(`/products/productId/edit`,{productId,languages_id})
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
        onChange={handleTableChange}
        scroll={{ x: 1300 }}
        rowKey={(record) => record.productid}
        onRow={(record) => ({
        onClick: () => {
          console.log('Row clicked:', record);
          handleOrderClick(record.productid,record.languages_id); // 点击行时调用handleOrderClick
        },
      })}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
        }}
      />
      
      {/* 复制商品模态框 */}
      <Modal
        centered
        title="复制商品"
        open={modalOpen}
        onOk={()=>{
          setModalOpen(false)
          history.push('/products/new',{copyProduct:copyProduct,copyProductImage:copyProductImage,copyProductInventory:copyProductInventory,radioValue:radioValue})
        }}
        onCancel={() => {
          setModalOpen(false);
          // 重置
          setRadioValue(1);
          setCopyProductImage(false);
          setCopyProductInventory(false);
        }}
      >
        <Content>
          <div>商品名称</div>
          <div>
            <Input value={`[Copy]`+copyProduct.name} />
          </div>
          <div>
            <Checkbox className='selectItem' checked={copyProductImage} onChange={(e)=>{setCopyProductImage(e.target.checked)}}>
              <span style={{
                  marginRight: '3px',
                  display: 'flex',
                  alignContent: 'center',
                  flexWrap: 'nowrap',
                  width: '200px'
                }}>
                <span style={{
                  marginRight: '3px',
                }}>复制商品图片</span>
                <Tooltip title="prompt text">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Checkbox>
          </div>
          <div>
            <Checkbox checked={copyProductInventory} onChange={(e)=>{setCopyProductInventory(e.target.checked)}}>
              <span>复制商品库存</span>
            </Checkbox>
          </div>
          <div>商品状态</div>
          <Radio.Group onChange={onChangeRadio} value={radioValue}>
            <div>
              <Radio value={1}>
                <span>已上架</span>
              </Radio>
            </div>
            <div>
              <Radio value={0}>
                <span>已下架</span>
              </Radio>
            </div>
          </Radio.Group>
        </Content>
      </Modal>
              

      {/* 商品状态提示 */}
      {contextProductStatusModal}
      {/* <Modal title={<div><span><InfoCircleFilled style={{display:"inlineBlock",width:"20px",marginRight:"10px"}} /></span><span>确认下架此商品？</span></div>} centered open={productStatusModalOpen} onOk={()=>{
        setProductStatusModalOpen(false);
      }} onCancel={()=>{
        setProductStatusModalOpen(false);
      }}>
        <p>已上架的商品会在网店中展示，可供你的客户浏览及购买</p>
      </Modal> */}
    </Scoped>

  );
};


export default ProductListAjax;

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