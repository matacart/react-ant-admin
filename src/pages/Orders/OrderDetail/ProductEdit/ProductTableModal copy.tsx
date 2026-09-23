import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MySearch from "@/components/Input/MySearch";
import MySelect from "@/components/Select/MySelect";
import { useSymbolLeft } from "@/hooks/customHooks";
import CommodityClassificationSelector from "@/pages/Products/ProductList/CommodityClassificationSelector";
import TagSelector from "@/pages/Products/ProductList/TagSelector";
import { getProductList } from "@/services/y2/api";
import { ProductType, VariantType } from "@/store/product/product";
import { currencyPrecision } from "@/utils/common";
import {Checkbox, Flex, Form, Input, Modal, Row, Select, Space, Table, TableProps } from "antd"
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";


const isParent = (record:any) => {
    return (record?.variants?.length || 0) > 0;
};

function ProductTableModal(){

    const [open, setOpen] = useState(false);

    const symbolLeft = useSymbolLeft();

    const [loading, setLoading] = useState(false);

    const Ref = useRef(null);

    // table
    const [data,setData] = useState<ProductType[]>([]);
    // 分页
    const [pagination,setPagination] = useState({
        current:1,
        pageSize:10,
        total:10
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // 当前页所有行 key（父 + 子）
    const currentPageKeys = useMemo(() => {
        const keys: React.Key[] = [];
        data.forEach((item: any) => {
            keys.push(item.id);
            if (isParent(item)) {
                item.variants?.forEach((v: any) => keys.push(v.id));
            }
        });
        return keys;
    }, [data]);

    // 表头全选状态
    const isAllChecked = currentPageKeys.length > 0 && currentPageKeys.every((k) => selectedRowKeys.includes(k));

    // 全选 / 取消全选（仅作用于当前页）
    const selectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRowKeys((prev) => Array.from(new Set([...prev, ...currentPageKeys])));
        } else {
            setSelectedRowKeys((prev) => prev.filter((k) => !currentPageKeys.includes(k)));
        }
    };

    // 选择行（父 + 子）
    const selectRow = (checked: boolean, record: any) => {
        const keys: React.Key[] = isParent(record)
            ? [record.id, ...(record.variants?.map((v: any) => v.id) || [])]
            : [record.id];

        if (checked) {
            setSelectedRowKeys((prev) => Array.from(new Set([...prev, ...keys])));
        } else {
            setSelectedRowKeys((prev) => prev.filter((k) => !keys.includes(k)));
        }
    };

    const getRowCheckState = (record: any) => {
        if (isParent(record)) {
            const allKeys = [record.id, ...(record.variants?.map((v: any) => v.id) || [])];
            const checkedCount = allKeys.filter((k) => selectedRowKeys.includes(k)).length;
            return {
                checked: checkedCount === allKeys.length,
                indeterminate: checkedCount > 0 && checkedCount < allKeys.length,
            };
        }
        return { checked: selectedRowKeys.includes(record.id), indeterminate: false };
    };
    

    

    const columns: TableProps<ProductType>['columns'] = [
        {
            key: 'id',
            title: (
                <Flex align="center" justify="flex-start" gap={12}>
                    <Checkbox checked={isAllChecked} onChange={(e)=>selectAll(e.target.checked)} />
                    <span>商品/款式</span>
                </Flex>
            ),
            render: (value,record:any) => <Flex align="center" gap={12}>
                <Checkbox {...getRowCheckState(record)} onChange={(e)=>selectRow(e.target.checked,record)} style={isParent(record)?{marginLeft:0}:{marginLeft:28}}  />
                {isParent(record)?<>
                    {record?.title}
                </>:<>
                    {record?.option_values_names}
                </>}
            </Flex>
        },
        {
          title: '库存',
          dataIndex: 'quantity',
          key: 'quantity',
          render: (value,record) => <div>
            {value}
          </div>,
        },
        {
          title: '价格',
          key: 'specialprice',
          render: (value,record) => <div>
            {isParent(record)?<>
                {symbolLeft+currencyPrecision(Number(record?.specialprice))}
            </>:<>
                {symbolLeft+currencyPrecision(Number(record?.price))}
            </>}
          </div>,
        }
    ];
    

    const cancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        // console.log(productList)
        // console.log(orderProductEdit.remainingProductGroup[0].product)
        // const newProduct = productList.map((item,index:number)=>{
        //     return {
        //         attributes:item.attributes,
        //         final_price:item.specialprice,
        //         group_id: "0",
        //         id: "",
        //         vid:(new Date().getTime()+index).toString(),
        //         latest_shipment_time:"",
        //         num: 1,
        //         product_discount_amount: "0",
        //         product_discount_description: null,
        //         product_discount_type: "0",
        //         product_discount_type_from: null,
        //         product_id:item.id,
        //         product_image:item.product_image,
        //         product_model:item.model,
        //         product_name:item.title,
        //         product_price:item.specialprice,
        //         product_quantity: 1,
        //         product_source: "1",
        //         remaining_quantity:1,
        //         shipped_quantity:0,
        //     }
        // })
        // orderProductEdit.setRemainingProductGroup([
        //     {
        //         product:[...orderProductEdit.remainingProductGroup[0].product,...newProduct],
        //         remaining:orderProductEdit.remainingProductGroup[0].remaining
        //     }
        // ])
        // orderProductEdit.setRemainingProductGroup
        // setProductList([])
        // setSelectedRowKeys([])
        // setOpen(false);
    };

    // const rowSelection: TableProps<ProductType>['rowSelection'] = {
    //     selectedRowKeys:selectedRowKeys, // 同步选中状态
    //     onChange: (selectedRowKeys: React.Key[], selectedRows: ProductType[]) => {
    //         setProductList(selectedRows)
    //         setSelectedRowKeys(selectedRowKeys)
    //         // console.log(order.productInfo)
    //     },
    // };

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
            total:Number(res.count || 0)
          })
          setData(res.data)
        }).catch(err=>{
          console.log(err)
        }).finally(()=>{
          setLoading(false)
        })
    };

    const expandedRowKeys = useMemo(() => {
        return data.filter(item => Array.isArray(item.variants) && item.variants.length > 0).map(item => item.id);
    }, [data]);

    return (
        <Scoped ref={Ref}>
            <DefaultButton text="选择商品" onClick={()=>{
                fetchData(1,10);
                setOpen(true)
            }} />
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
                <Table<ProductType>
                    className="product-table"
                    loading={loading}
                    rowKey={(record:any) => record.id}
                    columns={columns}
                    dataSource={data}
                    pagination={{...pagination,
                        onChange(page, pageSize) {
                            fetchData(page,pageSize)
                        }
                    }}
                    expandable={{
                        childrenColumnName:"variants",
                        expandedRowKeys,
                        showExpandColumn:false,
                    }}
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
        max-height: calc(100vh - 300px) ;
        overflow-y: auto;
    }

    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`


export default  observer(ProductTableModal)