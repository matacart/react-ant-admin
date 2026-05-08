import React, { useEffect, useState } from 'react';
import { App, Avatar, Checkbox, Input, Modal, Table, Tooltip } from 'antd';
import type { GetProp, TableColumnsType, TableProps } from 'antd';
import { CopyOutlined, DeleteOutlined, EyeOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import { deleteCategory, getCategoryList } from '@/services/y2/api';
import { history } from '@umijs/max';
import styled from 'styled-components';
import categoriesList from '@/store/product/categoriesList';
import { useAbortController } from '@/hooks/customHooks';
import { getPrimaryDomain } from '@/utils/dataStructure';
import DeleteModal from '@/components/Modal/DeleteModal';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

// 表单项数据类型
interface DataType {
  id: string;
  title:string;
  category_image:string;
  delimiter:string;
  languages_id:string
  handle:string;
}


interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

function CategoriesTable() {

  const { message } = App.useApp();

  // 预览域名默认
  const previewDomain = getPrimaryDomain();

  const [loading, setLoading] = useState(false);
  // 控制开关加载防止重复点击  --- 开关之间独立
  const [modalOpen, setModalOpen] = useState(false);

  const { createAbortController } = useAbortController();

  // 分页器初始参数
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions:[10,20,50,100]
    },
  });

  // 获取分页参数
  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
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

  // 删除分类
  const deleteCategoryItem = (record:any) => {
    setLoading(true);
    deleteCategory(record.id).then(res=>{
      if(res.code == 0){
        message.success("删除成功")
        const newData = data.filter((item) => item.id !== record.id);
        setData(newData);
        setLoading(false);
      }
    })
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
        <Avatar shape="square" size="large" src={record.category_image?record.category_image+"?x-oss-process=image/resize,w_100":"/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"} />
        <span style={{
          marginLeft: 10,
          alignContent: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth:"100%"
        }}>{record.delimiter+""+record.title}</span>
      </div>
    },
    {
      title: '类型',
      dataIndex: 'category_type',
      width: 120,
      render: (value, record, index) =>{
        if(value == "1"){
          return <div>手动</div>
        }
        if(value == "2"){
          return <div>智能</div>
        }
      }
    },
    {
      title: '商品数量',
      dataIndex: 'product_count',
      width: 150,
      render: (value, record, index) =>{
        let num = Number(value);
        return <>
          {num}
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
                <div className='wrap' onClick={(e) => {
                    e.stopPropagation();
                    const primaryDomain = getPrimaryDomain();
                    primaryDomain && window.open(`${primaryDomain}/collections/${record.handle}`)
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
              <DeleteModal 
                removeFunc={()=>deleteCategoryItem(record)} 
                title="确认要删除此分类吗？"
                content={"删除后，你的店铺将不再展示此分类。"}
                tElement={
                  <Tooltip title="删除">
                    <div className='wrap'>
                      <DeleteOutlined className="font-20 color-F86140 cursor-pointer" />
                    </div>
                  </Tooltip>
                } 
              />
            </ButtonIcon>
          </div>
        )
      }
    },
  ];
  
  // 
  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleOrderClick = (id: string,languages_id:string) => {
    history.push(`/products/categories/edit/${id}/${languages_id}`)
  };

  // 获取数据
  const fetchData = ()=>{
    setLoading(true);
    const limit  = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    const signal = createAbortController();
    getCategoryList({
      languages_id:categoriesList.languagesId,
      page:page?.toString() || "1",
      limit:limit?.toString() || "10",
    },signal).then((res)=>{
      setData(res.data);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: Number(res.count),
        }
      });
    }).catch((error) => {
      if (error.name !== 'CanceledError') {
        console.log(error)
      }
    }).finally(()=>{
      setLoading(false);
    })
  }

  useEffect(()=>{
    fetchData();
  },[categoriesList.languagesId,tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  return (
    <Scoped>
      {/* 分类 */}
      <Table
        columns={columns}
        // rowKey={(record) => record.key}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ 
          x: 1300,
          y: 'calc(100vh - 410px)', // 垂直滚动 
        }}
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
      </Modal>
    </Scoped>
  );
};


export default CategoriesTable;

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