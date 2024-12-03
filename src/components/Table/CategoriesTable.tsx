import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Checkbox, Input, message, Modal, Popover, Radio, Switch, Table, Tooltip } from 'antd';
import type { GetProp, RadioChangeEvent, TableColumnsType, TableProps } from 'antd';
import qs from 'qs';
import { CopyOutlined, DeleteOutlined, ExclamationCircleOutlined, EyeOutlined, InfoCircleFilled, PictureOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { deleteCategory, deleteProduct, getCategoryList, getCountryList, getProductList, upDateProductStatus } from '@/services/y2/api';
import { history, Link, useIntl } from '@umijs/max';
import styled from 'styled-components';
import newStore from '@/store/newStore';
import globalStore from '@/store/globalStore';
import modal from 'antd/es/modal';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项商品数据类型
interface DataType {
  id: string;
//   model?: string;
//   imgUrl?: string;
//   product_image?: string;
//   category_name?: string;
//   content?: string;
//   price?: number;
//   costPrice?: number;
//   ISBN?: string;
//   inventory?: number;
//   HSCode?:string;
//   notion?: string;
//   state?: string;
//   productid:string;
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

function CategoriesTable() {
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
  // 复制商品模态框
  const [radioValue, setRadioValue] = useState(1)
  // 复制商品的数据
  const [copyProduct, setCopyProduct] = useState<any>({});
  // 是否复制商品图片
  const [copyProductImage, setCopyProductImage] = useState(false);
  // 是否复制商品库存
  const [copyProductInventory, setCopyProductInventory] = useState(false);
  
 
  //列表数据
  const [data, setData] = useState<DataType[]>([]);
  const [tempTest,setTempTest] = useState("1");

  const confirm = (record:any) => {
    modal.confirm({
        title: "确认要删除此分类吗？",
        centered:true,
        icon: <ExclamationCircleOutlined />,
        content: '删除后，你的店铺将不再展示此分类',
        okText: '删除',
        cancelText: '取消',
        onOk(){
          setLoading(true);
          deleteCategory(record.id).then(res=>{
            if(res.code == 0){
              message.success("删除成功")
              const newData = data.filter((item) => item.id !== record.id);
              console.log(newData);
              setData(newData);
              setLoading(false);
            }
          })
        }
    });
};

  // 表头
  const columns: TableColumnsType<DataType> = [
    {
      title: '分类名称',
      dataIndex: 'title',
      width: 180,
      render: (value, record, index) => <div style={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignContent: 'center',
      }}>
        <Avatar shape="square" size="large" src={record.category_image} icon={<PictureOutlined />} />
        <span style={{
          marginLeft: 10,
          alignContent: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth:"100%"
        }}>{record.delimiter+""+record.category_name}</span>
      </div>
    },
    {
      title: '类型',
      dataIndex: 'model',
      width: 120,
    },
    {
      title: '商品数量',
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
                    // if(globalStore.shop.domainName && globalStore.shop.domainName!==""){
                    //   window.open(`https://`+globalStore.shop.domainName+`/h-product-detail-p`+record.productid+`.html`)
                    // }else{
                    //   message.error("请先设置店铺")
                    // }
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
                //   setCopyProduct(record)
                //   setModalOpen(true);
                }}>
                  <CopyOutlined />
                </div>
              </Tooltip>
            </ButtonIcon>
            <ButtonIcon>
              <Tooltip title="删除">
                <div className='wrap' onClick={(e) => {
                  e.stopPropagation()
                  confirm(record)
                //   setCopyProduct(record)
                //   setModalOpen(true);
                }}>
                  <DeleteOutlined style={{color:"red"}} />
                </div>
              </Tooltip>
            </ButtonIcon>
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
    history.push(`/products/categories/edit`,{id,languages_id})
  };

  useEffect(()=>{
    setLoading(true);
    getCategoryList().then(res=>{
        console.log(res.data)
        setData([...res.data])
        setLoading(false);
    })
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
        onChange={handleTableChange}
        scroll={{ x: 1300 }}
        rowKey={(record) => record.id}
        onRow={(record) => ({
        onClick: () => {
          console.log('Row clicked:', record);
          handleOrderClick(record.id,record.languages_id); // 点击行时调用handleOrderClick
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
        </Content>
      </Modal>
      {contextProductStatusModal}
    </Scoped>
  );
};


export default CategoriesTable;

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