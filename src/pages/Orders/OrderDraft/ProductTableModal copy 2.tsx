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
    product_id: string;
    product_image:string;
    age: number;
    address: string;
    variants:any[];
}

function ProductTableModal(){

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [productList,setProductList] = useState<any>([]);

    const Ref = useRef(null)

    // 管理所有选中的项（包括父项和子项）
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '商品/款式',
          dataIndex: 'id',
          key: 'id',
          onCell: () => ({ style: { flex: 2 } }), // 设置比例为 2
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
          onCell: () => ({ style: { flex: 1 } }), // 设置比例为 2
          render: (value,record) => <div>
            {value}
          </div>,
        },
        {
          title: '价格',
          dataIndex: 'specialprice',
          key: 'specialprice',
          onCell: () => ({ style: { flex: 1 } }), // 设置比例为 2
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
        let newProductList = productList.map(item=>{
            return {
                attributes:item.attributes,
                variants:item.variants,
                final_price:item.specialprice,
                // group_id: "0",
                id:item.id,
                product_id:item.id,
                proudct_imgage:item.product_image,
                product_model:item.model,
                product_name:item.title,
                product_price:item.specialprice,
                product_cost_price:item.cost_price,
                product_quantity: 1,
                product_source: "1",
                // 折扣信息
                product_discount_amount: "",
                product_discount_description: null,
                product_discount_type: "",
                product_discount_type_from: null,
            }
        })
        orderDraft.setProductInfo([...orderDraft.productInfo,...newProductList])

        console.log(newProductList)
        setOpen(false);
    };

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        selectedRowKeys:productList.map(item => item.product_id), // 同步选中状态
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {},
        onSelect: (record, selected, selectedRows) => {
            handleSelect(record, selected, selectedRows,selectedRowKeys);
        },
        getCheckboxProps: (record: DataType) => {
            // // 并检查子项是否部分选中
            // const allChildrenSelected = record.variants?.every(variant => selectedRowKeys[1].includes(variant.id));
            // const someChildrenSelected = record.variants?.some(variant => selectedRowKeys[1].includes(variant.id));
            // const indeterminate = someChildrenSelected && !allChildrenSelected;
            return {
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
    const handleSelect = (record:DataType, selected:Boolean, selectedRows,selectedRowKeys) => {
        console.log(selectedRowKeys)

        if (selected) {
            // 选中父项 → 添加父项 
            if (!newParentKeys.includes(record.id)) {
                newParentKeys.push(record.id);
            }
            // 所有子项
            if (record.variants?.length > 0) {
                record.variants.forEach(variant => {
                    if (!newChildKeys.includes(variant.id)) {
                        newChildKeys.push(variant.id);
                    }
                });
            }
        } else {
            // 取消选中父项 → 移除父项 + 所有子项
            newParentKeys = newParentKeys.filter(key => key !== record.id);
            if (record.variants?.length > 0) {
                record.variants.forEach(variant => {
                    newChildKeys = newChildKeys.filter(key => key !== variant.id);
                });
            }
        }


        setSelectedRowKeys([{
            pid: record.id,
            cid: record.variants?.map(variant => variant.id)
        }])
        setProductList(selectedRows);
    };
   
    // 子表单展开项
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

    // 嵌套表格
    const variantColumns = [
        {
          title: '商品/款式',
          dataIndex: 'option_values_names',
          key: 'option_values_names',
          onCell: () => ({ style: { flex: 2 } }), // 设置比例为 2
        },
        {
          title: '库存',
          dataIndex: 'quantity',
          key: 'quantity',
          width:158
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          onCell: () => ({ style: { flex: 1 } }), // 设置比例为 2
          width:177
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
                    onChange:(keys) => {
                        // 创建新数组，避免直接修改原数组
                        let newKeys = [...keys];

                        let newVariants = record.variants.map(variant => {
                            if (newKeys.includes(variant.id)) {
                                return variant
                            }
                        }).filter(item=>item);

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
                        console.log(record.id)
                        return {
                            disabled: orderDraft.productInfo.some((item) => item.variants?.some((variant) => variant.id === record.id)
                          ),
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
            setExpandedRowKeys(keys);
            console.log(keys)
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
                setProductList([])
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
                    // expandable={expandable}
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