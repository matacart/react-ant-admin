import DefaultButton from "@/components/Button/DefaultButton";
import DefaultButtonSecondary from "@/components/Button/DefaultButtonSecondary";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MySearch from "@/components/Input/MySearch";
import MySelect from "@/components/Select/MySelect";
import CommodityClassificationSelector from "@/pages/Products/ProductList/CommodityClassificationSelector";
import TagSelector from "@/pages/Products/ProductList/TagSelector";
import { getProductList } from "@/services/y2/api";
import orderDraft from "@/store/order/orderDraft";
import {Flex, Form, Input, Modal, Row, Select, Space, Table, TableProps } from "antd"
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";


interface DataType {
    key: string;
    id: string;
    title:string;
    model:string;
    product_id: string;
    product_image:string;
    specialprice:number;
    cost_price:number;
    product_quantity?:number;
    product_discount_amount?:string;
    product_discount_description?:string;
    product_discount_type?:string;
    age: number;
    address: string;
    variants:any[];
    attributes:any[];
}

// 添加转换函数
export const convertFlatToNested = (flatData: any[]) => {
    // 使用reduce将扁平数据按product_id分组
    const grouped = flatData.reduce((acc, item) => {
    const productId = item.product_id;
    
    // 提取通用字段
    const commonFields = {
        product_quantity: item.product_quantity,
        // 折扣信息
        product_discount_amount: item.product_discount_amount,
        product_discount_description: item.product_discount_description,
        product_discount_type: item.product_discount_type,
        // product_discount_type_from: null,
    };

    
    // 如果是首次遇到该product_id，初始化产品对象
    if (!acc[productId]) {
        acc[productId] = {
            ...commonFields,
            id: item.product_id, // 使用product_id作为主键
            product_id: item.product_id,
            title: item.product_name,
            model: item.product_model,
            product_image: item.proudct_imgage,
            specialprice: item.product_price,
            cost_price: item.product_cost_price,
            variants: [],
            attributes: item.attributes || [],
        };
    }
    
    // 如果当前项代表一个具体的variant，将其添加到variants数组
    if (item.sku_id && item.sku_id !== item.product_id) {
        // 这是一个variant项
        const variant = item.variants?.[0]; // 获取variant信息
        if (variant) {
            acc[productId].variants.push({...variant,...commonFields});
        }
    }
    
    return acc;
    }, {} as Record<string, DataType>);
    
    // 返回重组后的嵌套数据数组
    return Object.values(grouped);
};

function ProductTableModal(){

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [productList,setProductList] = useState<any>([]);

    const Ref = useRef(null)

    // 管理所有选中的项（包括父项和子项）
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[][]>([[],[]]);

    const [defaultChildKeys,setDefaultChildKeys] = useState<string[]>([]);
    // 将二维数组改为嵌套方式

    // selectedRowKeys[0]: 存储父表格的选中项（主商品 ID）
    // selectedRowKeys[1]: 存储子表格的选中项（子项 variant ID）
    // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '商品/款式',
          dataIndex: 'id',
          key: 'id',
          width: 500,
          render: (value,record) => <Flex gap={12} align="center">
            <div>
                <img style={{width:"40px",height:"40px",objectFit:"contain"}} src={record.product_image?record.product_image+"?x-oss-process=image/resize,w_100":"/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"} />
            </div>
            {record.title}
          </Flex>,
        },
        {
          title: '库存',
          dataIndex: 'quantity',
          key: 'quantity',
          width: 150,
          render: (value,record) => <div>
            {value}
          </div>,
        },
        {
          title: '价格',
          dataIndex: 'specialprice',
          key: 'specialprice',
          width: 150,
          render: (value,record) => <div>
            {value}
          </div>,
        }
    ];
    // table
    const [data,setData] = useState<DataType[]>([]);
    // 分页
    const [pagination,setPagination] = useState({
        current:1,
        pageSize:10,
        total:10
    })

    const cancel = () => {
        setOpen(false);
    };
    // 添加商品
    const handleOk = () => {
        console.log(productList)

        // 扁平化 -- 数据结构转化
        let newProductList = productList.reduce((acc: any[], item: DataType) => {
            if (item.variants?.length > 0) {
                // 如果有variants，为每个variant创建一个独立的商品项
                const variantItems = item.variants.map(variant => ({
                    attributes: item.attributes,
                    variants: [variant],
                    final_price: Number(item.specialprice) + Number(variant.price),
                    id: item.id,
                    product_id: item.id,
                    sku_id:variant.id,
                    proudct_imgage: item.product_image,
                    product_model: item.model,
                    product_name: item.title,
                    product_price: item.specialprice,
                    product_cost_price: variant.cost_price,
                    product_quantity: variant.product_quantity || 1,
                    product_source: "1",
                    // 折扣信息
                    product_discount_amount: variant.product_discount_amount || "",
                    product_discount_description: variant.product_discount_description || "",
                    product_discount_type: variant.product_discount_type || "",
                    product_discount_type_from: null,
                }));
                return [...acc, ...variantItems];
            } else {
                // 如果没有variants，直接使用原商品
                return [...acc, {
                    attributes: item.attributes,
                    variants: item.variants,
                    final_price: item.specialprice,
                    id: item.id,
                    sku_id: item.id,
                    product_id: item.id,
                    proudct_imgage: item.product_image,
                    product_model: item.model,
                    product_name: item.title,
                    product_price: item.specialprice,
                    product_cost_price: item.cost_price,
                    product_source: "1",
                    product_quantity: item.product_quantity || 1,
                    // 折扣信息
                    product_discount_amount: item.product_discount_amount || "",
                    product_discount_description: item.product_discount_description || "",
                    product_discount_type: item.product_discount_type || "",
                    product_discount_type_from: null,
                }];
            }
        }, []);

        console.log(newProductList)

        orderDraft.setProductInfo(newProductList)
        setOpen(false);
    };

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        selectedRowKeys:selectedRowKeys[0], // 同步选中状态
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {},
        onSelect: (record, selected, selectedRows) => {
            handleSelect(record, selected, selectedRows);
        },
        getCheckboxProps: (record: DataType) => {
            // 并检查子项是否部分选中
            const allChildrenSelected = record.variants?.every(variant => selectedRowKeys[1].includes(variant.id));
            const someChildrenSelected = record.variants?.some(variant => selectedRowKeys[1].includes(variant.id));
            const indeterminate = someChildrenSelected && !allChildrenSelected;
            return {
                indeterminate: indeterminate,
                disabled: orderDraft.productInfo.some(item => {
                    if(item.product_id === record.product_id){
                        if(record.variants?.length>0){
                            return item.variants?.length == record.variants.length
                        }else{
                            // 无变体
                            return true;
                        }
                    }else{
                        return false;
                    }
                }),
            };
        },
    };
    // 父项选中 → 子项自动选中
    const handleSelect = (record:DataType, selected:Boolean, selectedRows) => {
        // console.log(record, selected, selectedRows);
        let newParentKeys = [...selectedRowKeys[0]];
        let newChildKeys = [...selectedRowKeys[1]];

        // 半选 -- 选中全选
        const someChildrenSelected = record.variants?.some(variant =>
            newChildKeys.includes(variant.id)
        );
        const allChildrenSelected = record.variants?.every(variant =>
            newChildKeys.includes(variant.id)
        ) ?? true;

        if(!selected && allChildrenSelected){
            // 取消选中父项 → 移除父项 + 所有子项
            console.log("取消选中父项")
            let hasChildKeys = false;
            if (record.variants?.length > 0) {
                record.variants.forEach(variant => {
                    if (defaultChildKeys.includes(variant.id)) {
                        // 父项有子项，则不能取消选中父项
                        hasChildKeys = true;
                    }else{
                        newChildKeys = newChildKeys.filter(key => key !== variant.id);
                    }
                });
            }
            if (!hasChildKeys) {
                // 父项没有子项，则移除父项
                newParentKeys = newParentKeys.filter(key => key !== record.id);
                setProductList(productList.filter(item => item.id !== record.id))
            }
        }else{
            // 选中父项 → 添加父项 
            if (!newParentKeys.includes(record.id)) {
                newParentKeys.push(record.id);
                setProductList([...productList,record]);
            }
            // 所有子项
            if (record.variants?.length > 0) {
                record.variants.forEach(variant => {
                    if (!newChildKeys.includes(variant.id)) {
                        newChildKeys.push(variant.id);
                    }
                });
            }
        }

        setSelectedRowKeys([newParentKeys, newChildKeys]);
    };
   
    // 子表单展开项
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    // 嵌套表格
    const variantColumns = [
        {
          title: '商品/款式',
          dataIndex: 'option_values_names',
          key: 'option_values_names',
          width: 450,
        },
        {
          title: '库存',
          dataIndex: 'quantity',
          key: 'quantity',
          width:150
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          onCell: () => ({ style: { flex: 1 } }), // 设置比例为 2
          width:150
        },
    ];
    // 子表格
    const expandable = {
        expandedRowRender: (record: DataType) => (
            <Table
                rowKey="id"
                dataSource={record.variants}
                columns={variantColumns}
                pagination={false}
                showHeader={false}
                rowSelection={{
                    type: "checkbox",
                    selectedRowKeys: selectedRowKeys[1], // 子表格选中项
                    onChange:(keys,selectedRows,info) => {
                    },
                    onSelect:(childRecord, selected, selectedRows) => {
                        // 创建新数组，避免直接修改原数组
                        let newKeys = selectedRows.map(item=>item?.id).filter(item=>item);
                        const oldVariants = productList.filter(item => item.product_id == record.product_id)[0]?.variants || [];
                        let newVariants = oldVariants;
                        if(selected){
                            newVariants = [...oldVariants,childRecord];
                        }else{
                            newVariants = oldVariants.filter(item=>item.id != childRecord.id);
                        }
                        console.log(newVariants)

                        let allKeysExceptChildren = [...selectedRowKeys[0]];
                        // 确保父项仍保持选中
                        if (!allKeysExceptChildren.includes(record.id)) {
                            allKeysExceptChildren.push(record.id);
                            setProductList([...productList,{...record,variants:newVariants}]);
                        }else if(newKeys.length == 0){
                            allKeysExceptChildren = allKeysExceptChildren.filter(item=>item!= record.id);
                            setProductList(productList.filter((item:any)=>item.id!= record.id));
                        }else{
                            setProductList((pre:any)=>pre.map((item:any)=>item.id== record.id?{...item,variants:newVariants}:item))
                        }
                        // 移除该选项的所有子项
                        const updatedChildKeys = selectedRowKeys[1].filter(
                            (key) => !record.variants.some((variant) => variant.id === key)
                        );
                        // 合并非子项 key + 当前子项 key
                        setSelectedRowKeys([allKeysExceptChildren,[...updatedChildKeys,...newKeys]]);
                    },

                    renderCell: (checked, record, index, node) => {
                        return (
                          <div style={{ marginLeft: '50px' }}>
                            {node}
                          </div>
                        );
                    },
                    getCheckboxProps: (record: DataType) => {
                        // 并检查子项是否部分选中
                        return {
                            disabled: orderDraft.productInfo.some((item) => item.variants?.some((variant) => variant.id === record.id)),
                        };
                    },
                }}
            />
        ),
        rowExpandable: (record: DataType) => record.variants && record.variants.length > 0,
        expandedRowKeys:expandedRowKeys,
        onExpand: (expanded, record) => {
            const keys = expanded
              ? [...expandedRowKeys, record.id]
              : expandedRowKeys.filter(key => key !== record.id);
            setExpandedRowKeys(keys);
        },
        showExpandColumn:false, // 关键：隐藏展开图标
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
            // 当 data 更新时，自动将所有有 variants 的项的 key 加入 expandedRowKeys
            const keys = res.data.filter(item => item.variants?.length > 0).map(item => item.id);
            console.log(keys)
            setExpandedRowKeys(keys);
            setData(res.data)
            console.log(res)
        }).catch(err=>{
          console.log(err)
        }).finally(()=>{
          setLoading(false)
        })
    };

    

    return (
        <Scoped ref={Ref}>
            <DefaultButtonSecondary type="primary" text="添加商品" onClick={()=>{
                // 将扁平化数据转为原数据结构
                const nestedData = convertFlatToNested(orderDraft.productInfo);
                console.log(nestedData)
                setProductList(nestedData);

                const parentKeys = orderDraft.productInfo.map(item => item.product_id);
                const childKeys = orderDraft.productInfo.flatMap(item =>
                    item.variants?.map(variant => variant.id) || []
                );
                // 默认
                setDefaultChildKeys(childKeys);
                console.log(parentKeys,childKeys)
                setSelectedRowKeys([parentKeys,childKeys]);

                fetchData(1,10);
                setOpen(true)
            }} />
            {/* calc(100vh - 200px) */}
            <Modal styles={{body:{maxHeight: ''}}} getContainer={()=>Ref.current!} title={<div>选择商品/款式</div>} width={860} className="customer-modal" centered open={open} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={handleOk} />
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
                <Table<DataType>
                    className="product-table"
                    loading={loading}
                    rowKey={(record) => record.id}
                    rowSelection={{ type: "checkbox", ...rowSelection }} 
                    columns={columns}
                    dataSource={data}
                    pagination={{...pagination,
                        onChange(page, pageSize) {
                            fetchData(page,pageSize)
                        },
                    }}
                    expandable={expandable}
                />
            </Modal>
        </Scoped>
    )
}


const Scoped = styled.div`
    .conditional-warp{
        margin: 20px 0;
    }
    .product-table{
        height: calc(100vh - 300px) ;
        overflow-y: auto;

        /* 嵌套子表格 */
        .ant-table-expanded-row>.ant-table-cell{
            padding:0;
        }
        .ant-table-expanded-row .ant-table{
            margin: 0 !important;
            border: none;
        }
    }

    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }

`


export default  observer(ProductTableModal)