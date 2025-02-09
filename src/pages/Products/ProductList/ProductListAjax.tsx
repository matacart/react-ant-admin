import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, Tooltip } from 'antd';
import type { GetProp, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import qs from 'qs';
import { CopyOutlined, ExclamationCircleOutlined, EyeOutlined, InfoCircleFilled, PictureOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { deleteProduct, getCountryList, getProductList, upDateProductStatus } from '@/services/y2/api';
import { history } from '@umijs/max';
import styled from 'styled-components';
import newStore from '@/store/newStore';
import SelectedActions from './SelectedActions';
import cookie from 'react-cookies';
import oldStore from '@/store/product/oldStore';

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

  const [tempTest,setTempTest] = useState("1");

  // 状态
  const onChangeSwich = (index: number,checked:boolean) => {
    // 改变商品的状态
    // let oldDataItem = data[index]
    // let newDataItem = {
    //   ...oldDataItem,
    //   state: !oldDataItem.state
    // }
    let newData = [...data];
    newData[index].state = checked?"1":"0"
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
        <Avatar shape="square" size="large" src={(record.imgUrl && record.imgUrl!=="")?record.imgUrl:"/icons/ProductCoverBlank.svg"} />
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
      title: '售价',
      dataIndex: 'price',
      width: 150,
      render: (value, record, index) =>{
        let num = Number(value);
        return <>
          {`${cookie.load("symbolLeft")} ${num.toFixed(2)}`}
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
          {data[index].state !=="2"?<>
            <Switch loading={onLoadingList[index]} style={{
              position: 'relative',
              top: "3px",
            }} size='small' checked={data[index].state == "1"?true:false} onChange={(checked,event) => { 
              event.stopPropagation();
              let tempList = [...onLoadingList];
              tempList[index] = true;
              setOnLoadingList(tempList);
              productStatusConfirm(record,index,checked);
            }} />
            <Popover content={content} title="销售渠道" style={{
              width: '20px'
            }} trigger="click">
              {data[index].state == "1" ? '下架' : '上架'}
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
              {/* <Link to={`https://`+globalStore.shop.domainName+`/h-product-detail-p`+record.productid+`.html`} target='_blank'> */}
                <div className='wrap' onClick={(e) => {
                    e.stopPropagation()
                    if(cookie.load("domain").domainName && cookie.load("domain").domainName!==""){
                      window.open(`https://`+cookie.load("domain").domainName+`/h-product-detail-p`+record.productid+`.html`)
                    }else{
                      message.error("请先设置店铺")
                    }
                  }}>
                  <Tooltip title="预览">
                    <EyeOutlined />
                  </Tooltip>
                </div>
              {/* </Link> */}
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

  const fetchData = async () => {
    setLoading(true);
    const limit  = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    try {
      const result = await getProductList(page,limit,selectProps.selectProps.title,selectProps.selectProps.model,selectProps.selectProps.language,selectProps.selectProps.tags,newStore.flag,newStore.isAlliance,newStore.isHosted)
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
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          }
        });
        return
      }
      throw new Error(result);
    }catch(error){
      message.error('获取数据失败');
    }
    setLoading(false);
  };
  useEffect(() => {
    // 初始化商品
    newStore.reset();
    oldStore.reset();
    fetchData();
  }, [newStore.isAlliance,newStore.isHosted,newStore.flag,tableParams.pagination?.current, tableParams.pagination?.pageSize,selectProps.selectProps.language,selectProps.selectProps.title,selectProps.selectProps.model,selectProps.selectProps.tags]);

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
              selectedRowKeys.length !== 0 ?{
                header: {
                  wrapper:()=>{
                    return (
                      <thead>
                        <tr>
                          <th colSpan={5}>
                            {/* 显示选择的数量和操作按钮 */}
                            <SelectedActions selectedRowKeys={selectedRowKeys} onFetchData={fetchData} setSelectedRowKeys={setSelectedRowKeys}/>
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
              selectedRowKeys, // 使用状态来记录选中的行
              onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                setSelectedRowKeys(selectedRowKeys); // 更新状态
              },
            }}
            // 隐藏表头
            // showHeader={selectedRowKeys.length === 0}
          />
        </div>
        
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
            <Input value={`[Copy]`+copyProduct.title} />
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
                <Tooltip title="勾选该选项后，商品主图、属性值图、SKU图将会被一并复制">
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
      {contextProductStatusModal}
    </Scoped>
  );
};


export default ProductListAjax;

const Scoped = styled.div`
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