import { Table, Checkbox, Button, Tag, Card } from 'antd';
import DefaultButton from "@/components/Button/DefaultButton";
import DefaultButtonSecondary from "@/components/Button/DefaultButtonSecondary";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MySearch from "@/components/Input/MySearch";
import MySelect from "@/components/Select/MySelect";
import CommodityClassificationSelector from "@/pages/Products/ProductList/CommodityClassificationSelector";
import TagSelector from "@/pages/Products/ProductList/TagSelector";
import { getProductList } from "@/services/y2/api";
import orderDraft from "@/store/order/orderDraft";
import {Flex, Form, Input, Modal, Row, Select, Space, TableProps } from "antd"
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";



interface DataType {
    key: string;
    id:string;
    title:string;
    specialprice:number;
    price:number;
    quantity:number;
    option_values_names?:string;
    variants:any[] | null;
}

const ProductTableModal = () => {


    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [productList,setProductList] = useState<any>([]);

    const Ref = useRef(null);

  // 商品数据
  const productData = [
    {
      id: 'p1',
      name: 'pp11111aa',
      stock: 8,
      price: 'US$333.00',
      type: 'product',
      children: null
    },
    {
      id: 'p2',
      name: 'pp333aa',
      stock: -1,
      price: 'US$333.00',
      type: 'product',
      children: null
    },
    {
      id: 'spu1',
      name: '1Example T-Shirt2',
      type: 'spu',
      children: [
        { id: 'sku1-1', spec: 'RED-L', stock: 100, price: 'US$333.00' },
        { id: 'sku1-2', spec: 'YELLOW-M', stock: null, price: 'US$333.00' },
        { id: 'sku1-3', spec: 'BLUE-S', stock: null, price: 'US$333.00' }
      ]
    },
    {
      id: 'spu2',
      name: 'Example dress',
      type: 'spu',
      children: [
        { id: 'sku2-1', spec: 'RED-L', stock: null, price: 'US$333.00' },
        { id: 'sku2-2', spec: 'YELLOW-M', stock: null, price: 'US$333.00' },
        { id: 'sku2-3', spec: 'BLUE-S', stock: null, price: 'US$333.00' }
      ]
    },
    {
      id: 'spu3',
      name: 'ddd3333ddd Hat36',
      type: 'spu',
      children: [
        { id: 'sku3-1', spec: 'RED-L', stock: null, price: 'US$333.00' }
      ]
    }
  ];

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [indeterminateKeys, setIndeterminateKeys] = useState<string[]>([]);
  const [submittedItems, setSubmittedItems] = useState<string[]>([]);

    // table
    const [data,setData] = useState<DataType[]>([]);
    // 分页
    const [pagination,setPagination] = useState({
        current:1,
        pageSize:10,
        total:10
    })

    // 获取SPU下所有SKU的ID
    const getSkuIdsBySpu = (spuId) => {
        const spu = data.find(item => item.id === spuId);
        return spu && spu.children ? spu.children.map(sku => sku.id) : [];
    };

    // 获取SPU的选中状态
    const getSpuCheckState = (spuId:string) => {
        const skuIds = getSkuIdsBySpu(spuId);
        if (skuIds.length === 0) {
        return selectedKeys.includes(spuId) ? 'checked' : 'unchecked';
        }
        
        const selectedCount = skuIds.filter(id => selectedKeys.includes(id)).length;
        if (selectedCount === 0) return 'unchecked';
        if (selectedCount === skuIds.length) return 'checked';
        return 'indeterminate';
    };

    // 处理SPU选择变化
    const handleSpuChange = (spuId, checked) => {
        const skuIds = getSkuIdsBySpu(spuId);
        const newSelectedKeys = [...selectedKeys];
        
        if (checked) {
        // 选中SPU时添加所有SKU
        skuIds.forEach(id => {
            if (!submittedItems.includes(id) && !newSelectedKeys.includes(id)) {
            newSelectedKeys.push(id);
            }
        });
        // 添加SPU本身（如果是独立商品）
        if (!submittedItems.includes(spuId) && !newSelectedKeys.includes(spuId)) {
            newSelectedKeys.push(spuId);
        }
        
        // 更新半选状态
        setIndeterminateKeys(prev => prev.filter(id => id !== spuId));
        } else {
        // 取消SPU时移除所有SKU
        skuIds.forEach(id => {
            const index = newSelectedKeys.indexOf(id);
            if (index > -1) newSelectedKeys.splice(index, 1);
        });
        // 移除SPU本身
        const spuIndex = newSelectedKeys.indexOf(spuId);
        if (spuIndex > -1) newSelectedKeys.splice(spuIndex, 1);
        }
        
        setSelectedKeys(newSelectedKeys);
    };

    // 处理SKU选择变化
    const handleSkuChange = (skuId, spuId, checked) => {
        const newSelectedKeys = [...selectedKeys];
        const skuIds = getSkuIdsBySpu(spuId);
        
        if (checked) {
        // 添加SKU
        if (!submittedItems.includes(skuId) && !newSelectedKeys.includes(skuId)) {
            newSelectedKeys.push(skuId);
        }
        } else {
        // 移除SKU
        const index = newSelectedKeys.indexOf(skuId);
        if (index > -1) newSelectedKeys.splice(index, 1);
        }
        
        // 检查SPU状态
        const selectedCount = skuIds.filter(id => newSelectedKeys.includes(id)).length;
        
        // 更新半选状态
        const newIndeterminateKeys = [...indeterminateKeys];
        const spuIndex = newIndeterminateKeys.indexOf(spuId);
        
        if (selectedCount > 0 && selectedCount < skuIds.length) {
        if (spuIndex === -1) newIndeterminateKeys.push(spuId);
        } else {
        if (spuIndex > -1) newIndeterminateKeys.splice(spuIndex, 1);
        }
        
        setIndeterminateKeys(newIndeterminateKeys);
        setSelectedKeys(newSelectedKeys);
        
        // 如果SPU本身被选中但SKU被取消，取消SPU
        if (newSelectedKeys.includes(spuId) && selectedCount < skuIds.length) {
        const spuIndex = newSelectedKeys.indexOf(spuId);
        if (spuIndex > -1) newSelectedKeys.splice(spuIndex, 1);
        }
    };

    // 提交选中的项目
    const handleSubmit = () => {
        if (selectedKeys.length === 0) {
        alert('请至少选择一个商品或规格');
        return;
        }
        
        

        const newSubmittedItems = [...submittedItems, ...selectedKeys];
        setSubmittedItems(newSubmittedItems);

        console.log('提交选中的项目：', newSubmittedItems);

        setSelectedKeys([]);
        setIndeterminateKeys([]);
    };

    // 表格列配置
    const columns = [
        {
        title: '商品/规格',
        dataIndex: 'title',
        key: 'title',
        width: '40%',
        render: (text:string, record:DataType) => {
            if (record?.variants == null) {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            disabled={submittedItems.includes(record.id)}
                            checked={selectedKeys.includes(record.id)}
                            onChange={e => handleSpuChange(record.id, e.target.checked)}
                        />
                        <span style={{ marginLeft: 8, fontWeight: 600 }}>{text}</span>
                    </div>
                );
            }

            // SPU行
            const checkState = getSpuCheckState(record.id);
            return (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            disabled={submittedItems.includes(record.id)}
                            checked={checkState === 'checked'}
                            indeterminate={checkState === 'indeterminate'}
                            onChange={e => handleSpuChange(record.id, e.target.checked)}
                        />
                        <span style={{ marginLeft: 8, fontWeight: 600 }}>{text}</span>
                    </div>

                     {/* 子项（SKU）显示 option_values_names */}
                    {record.variants.map((variant, index) => (
                    <div key={index} style={{ marginLeft: 24, marginTop: 4 }}>
                        <Checkbox
                        disabled={submittedItems.includes(variant.id)}
                        checked={selectedKeys.includes(variant.id)}
                        onChange={e => handleSkuChange(variant.id, record.id, e.target.checked)}
                        />
                        <span style={{ marginLeft: 8 }}>{variant.option_values_names}</span>
                    </div>
                    ))}
                </div>
            );
        }
        },
        {
            title: '库存',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '20%',
            render: (text:number, record:DataType) => {
                if (record?.variants == null) {
                    return text === null ? '-' : text;
                }
                
                return (
                    <div key={record.id} style={{ marginTop: 8 }}>
                        {record.quantity === null ? '-' : record.quantity}
                    </div>
                );
            }
        },
        {
            // specialprice
            title: '价格',
            dataIndex: 'specialprice',
            key: 'specialprice',
            width: '20%',
            render: (text:number, record:DataType) => {
                if (!record?.variants == null) {
                    return text;
                }
                if (!record?.variants) {
                    return (
                        <div key={record.id} style={{ marginTop: 8 }}>
                            {record.price}
                        </div>
                    );
                }
                return (
                    <div key={record.id} style={{ marginTop: 8 }}>
                        {record.specialprice}
                    </div>
                );
            }
        },
    ];

    // 获取已选中的项目详情
    const getSelectedItemsDetails = () => {
        return selectedKeys.map(key => {
        // 查找独立商品
        const product = data.find(item => item.id === key && item.type === 'product');
        if (product) return { id: key, name: product.name, type: 'product' };
        
        // 查找SPU
        const spu = data.find(item => item.id === key && item.type === 'spu');
        if (spu) return { id: key, name: spu.name, type: 'spu' };
        
        // 查找SKU
        for (const spuItem of data.filter(item => item.type === 'spu')) {
            const sku = spuItem.children?.find(child => child.id === key);
            if (sku) {
            return { 
                id: key, 
                name: `${spuItem.name} - ${sku.spec}`, 
                type: 'sku',
                spec: sku.spec,
                price: sku.price
            };
            }
        }
        
        return null;
        }).filter(item => item !== null);
    };

    const selectedItems = getSelectedItemsDetails();

    const cancel = () => {
        // setProductList(orderDraft.productInfo)
        setOpen(false);
    };
    
    // 获取商品列表
    const fetchData = async (page:number,limit:number) => {
        setLoading(true);
        const res = {
          page:page,
          limit:limit,
          languagesId:"2",
          allianceStatus:"",
          hostedStatus:""
        }
        getProductList(res).then(res=>{
          setPagination({
            current:page,
            pageSize:limit,
            total:res.count
          })
          const data = res.data.map(item=>{
            return {
              ...item,
              children:item?.variants || false
            }
          })
          // 当 data 更新时，自动将所有有 variants 的项的 key 加入 expandedRowKeys
          const keys = res.data.filter(item => item.variants?.length > 0).map(item => item.id);
          setExpandedRowKeys(keys);
          console.log(data)
          setData(data)
        }).catch(err=>{
          console.log(err)
        }).finally(()=>{
          setLoading(false)
        })
    };

    // 子表单展开项
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>(['spu1']);

    useEffect(() => { 
    }, []);

  return (
    <Scoped ref={Ref}>
        <DefaultButtonSecondary type="primary" text="添加商品" onClick={()=>{
            fetchData(1,10);
            setOpen(true)
        }} />
        {/* calc(100vh - 200px) */}
        <Modal styles={{body:{maxHeight: ''}}} getContainer={()=>Ref.current!} title={<div>选择商品/款式</div>} width={860} className="customer-modal" centered open={open} onCancel={cancel} 
            footer = {(_, { OkBtn, CancelBtn }) => (
                <Flex justify="end">
                    <Flex gap={12}>
                        <DefaultButton text={"取消"} onClick={cancel} />
                        {/* <PrimaryButton text={"保存"} onClick={handleOk} /> */}
                    </Flex>
                </Flex>
            )}
        >
            <Flex className="conditional-warp" justify="space-between">
                <Flex gap={12}>
                    <Space.Compact style={{width:"320px"}} >
                        <MySelect  defaultValue={0} options={[
                            { value: 0, label: '全部' },
                            { value: 1, label: '商品名称' },
                            { value: 2, label: '商品SPU' },
                            { value: 3, label: '商品SKU' },
                            { value: 4, label: '商品厂商' },
                            { value: 5, label: '商品条码' },
                            { value: 6, label: '规格名称' },
                            { value: 7, label: '商品描述' },
                        ]} style={{height:"36px",width:"90px"}} />
                        <MySearch placeholder="搜索" style={{height:"36px"}} onSearch={(value:string)=>{
                            console.log(value)
                        }} />
                    </Space.Compact>
                    {/* 2 */}
                    <CommodityClassificationSelector />
                    {/* 标签 */}
                    <TagSelector/>
                </Flex>
                <DefaultButton text="重置" />
            </Flex>
            {/* table */}
            <Table
                className="product-table"
                dataSource={data}
                columns={columns}
                rowKey="id"
                pagination={false}
                bordered
                rowClassName={(record) => record.type === 'spu' ? 'spu-row' : ''}
                expandable={{
                    showExpandColumn:false, // 关键：隐藏展开图标
                    defaultExpandAllRows:true,
                    expandedRowKeys:expandedRowKeys,
                }}
                childrenColumnName={
                    
                }
            />

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3>已选项目 ({selectedItems.length}):</h3>
            <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #f0f0f0', padding: 12, borderRadius: 4 }}>
              {selectedItems.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {selectedItems.map(item => (
                    <li key={item.id} style={{ marginBottom: 8 }}>
                      {item.type === 'spu' ? (
                        <span><Tag color="blue">SPU</Tag> {item.name} (全选)</span>
                      ) : item.type === 'sku' ? (
                        <span><Tag color="green">SKU</Tag> {item.name} - {item.price}</span>
                      ) : (
                        <span><Tag color="orange">商品</Tag> {item.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: '#999', textAlign: 'center' }}>未选择任何项目</div>
              )}
            </div>
          </div>
          
          <Button 
            type="primary" 
            size="large" 
            onClick={handleSubmit}
            style={{ height: 40 }}
          >
            提交选中项
          </Button>
        </div>
        
        <div style={{ marginTop: 24 }}>
          <h3>已提交项目 ({submittedItems.length}):</h3>
          <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #f0f0f0', padding: 12, borderRadius: 4 }}>
            {submittedItems.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {submittedItems.map(id => {
                  // 查找独立商品
                  const product = data.find(item => item.id === id && item.type === 'product');
                  if (product) return <li key={id} style={{ marginBottom: 8 }}><Tag color="orange">商品</Tag> {product.name}</li>;
                  
                  // 查找SPU
                  const spu = data.find(item => item.id === id && item.type === 'spu');
                  if (spu) return <li key={id} style={{ marginBottom: 8 }}><Tag color="blue">SPU</Tag> {spu.name}</li>;
                  
                  // 查找SKU
                  for (const spuItem of data.filter(item => item.type === 'spu')) {
                    const sku = spuItem.children?.find(child => child.id === id);
                    if (sku) {
                      return (
                        <li key={id} style={{ marginBottom: 8 }}>
                          <Tag color="green">SKU</Tag> {spuItem.name} - {sku.spec} ({sku.price})
                        </li>
                      );
                    }
                  }
                  return null;
                }).filter(item => item !== null)}
              </ul>
            ) : (
              <div style={{ color: '#999', textAlign: 'center' }}>暂无已提交项目</div>
            )}
          </div>
        </div>
        </Modal>
    </Scoped>
  );
};
const Scoped = styled.div`

    .conditional-warp{
        margin: 20px 0;
    }
    .product-table{
        height: calc(100vh - 300px) ;
        overflow-y: auto;
    }

    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }

    .spu-row {
        background-color: #fafafa;
    }
    .spu-row + .spu-row {
        border-top: 2px solid #e8e8e8;
    }
    .ant-table-thead > tr > th {
        background-color: #f5f7fa;
        font-weight: 600;
    }
    .ant-tag {
        border-radius: 4px;
        font-size: 13px;
    }

`


export default ProductTableModal;