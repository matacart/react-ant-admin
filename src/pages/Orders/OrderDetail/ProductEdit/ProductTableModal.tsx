import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MySearch from "@/components/Input/MySearch";
import MySelect from "@/components/Select/MySelect";
import { useSymbolLeft } from "@/hooks/customHooks";
import CommodityClassificationSelector from "@/pages/Products/ProductList/CommodityClassificationSelector";
import TagSelector from "@/pages/Products/ProductList/TagSelector";
import { getProductList } from "@/services/y2/apiStore";
import { FulfillmentItemType } from "@/store/order/order";
import orderProductEdit from "@/store/order/orderProductEdit";
import { ProductType } from "@/store/product/product";
import { currencyPrecision } from "@/utils/common";
import {Checkbox, Flex, Modal, Space, Table, TableProps } from "antd"
import { observer } from "mobx-react-lite";
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";


const isParent = (record:any) => {
    return Object.hasOwn(record,'variants');
};

const queryAttributes = (text:string,attributes:any[]) => {
    if(!text){
        return [];
    }
    const textIds = text.split(",");
    const result = textIds.map((id:string) => {
        const item = attributes.find((item:any) => item.option_values_id == id);
        if(item){
            return {
                attributeId: item.option_values_id,
                attributeValue: item.option_values_name,
                attributeName: item.option_name,
                attributeType: "SALE"
            };
        }
    }).filter(Boolean);
    return result;
}

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

    // 选中的key
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // 保存 key -> 商品/款式对象，跨页保留
    const selectedRowsMapRef = useRef<Map<React.Key, any>>(new Map());

    // 根据 key 从 record 拿到对应对象
    const getRowObjectByKey = (record: any, key: React.Key) => {
        // record 是父商品：从 variants 里取
        if (isParent(record) && record.variants?.length > 0) {
            const variant = record.variants.find((v: any) => v.id === key);
            return variant ? { ...variant, parent: record } : null;
        }
        // record 是子款式行：用 product_id 反查父商品
        const parent = data.find((p: any) => p.id === record.product_id);
        return parent ? { ...record, parent } : record;
    };

    // 获取可选择的key
    const getSelectableKeys = (record: any): React.Key[] => {
        // 有款式 → 用各款式 id
        if (isParent(record) && record.variants?.length > 0) {
            return record.variants.map((v: any) => v.id);
        }
        // 无款式的父级 / 款式行 → 用自己 id
        return [record.id];
    };

    // 当前页所有行 key（父 + 子）
    const currentPageKeys = useMemo(() => {
        const keys: React.Key[] = [];
        data.forEach((item: any) => keys.push(...getSelectableKeys(item)));
        return keys;
    }, [data]);

    // 表头全选状态
    const isAllChecked = currentPageKeys.length > 0 && currentPageKeys.every((k) => selectedRowKeys.includes(k));

    // 全选 / 取消全选（仅作用于当前页）
    const selectAll = (checked: boolean) => {
        if (checked) {
            data.forEach((item: any) => {
                getSelectableKeys(item).forEach((k) => {
                    const obj = getRowObjectByKey(item, k);
                    if (obj) selectedRowsMapRef.current.set(k, obj);
                });
            });
            setSelectedRowKeys((prev) => Array.from(new Set([...prev, ...currentPageKeys])));
        } else {
            currentPageKeys.forEach((k) => selectedRowsMapRef.current.delete(k));
            setSelectedRowKeys((prev) => prev.filter((k) => !currentPageKeys.includes(k)));
        }
    };
    // 单行选中
    const selectRow = (checked: boolean, record: any) => {
        const keys = getSelectableKeys(record);
        if (checked) {
            keys.forEach((k) => {
                const obj = getRowObjectByKey(record, k);
                if (obj) selectedRowsMapRef.current.set(k, obj);
            });
            setSelectedRowKeys((prev) => Array.from(new Set([...prev, ...keys])));
        } else {
            keys.forEach((k) => selectedRowsMapRef.current.delete(k));
            setSelectedRowKeys((prev) => prev.filter((k) => !keys.includes(k)));
        }
    };

    // 勾选状态
    const getRowCheckState = (record: any) => {
        const keys = getSelectableKeys(record);
        const checkedCount = keys.filter((k) => selectedRowKeys.includes(k)).length;
        return {
            checked: keys.length > 0 && checkedCount === keys.length,
            indeterminate: checkedCount > 0 && checkedCount < keys.length,
        };
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
        setSelectedRowKeys([])
        selectedRowsMapRef.current.clear()
        setOpen(false);
    };

    const submit = () => {
        // 新
        const newProducts:FulfillmentItemType[] = selectedRowKeys.map((k) => selectedRowsMapRef.current.get(k)).filter(Boolean)?.map((item)=>{
            return {
                groupId:"",
                fulfillmentOrderSeq: "",
                parentSkuId: "",
                productSeq: item.product_id,
                productSku: item.id,
                productNum: 1,
                productSource: "1",
                title: item?.parent?.title,
                firstImage: item?.parent?.product_image,
                productPrice:item?.specialprice || item?.price || 0,
                productAmount:item?.specialprice || item?.price || 0,
                version:"",
                attributes:queryAttributes(item?.option_values_ids || "",item?.parent?.attributes || []),
                images:item?.parent?.additional_image || [],
                businessFlagInfo:null
            }
        });
        orderProductEdit.setFulfillmentItemList([...orderProductEdit.fulfillmentItemList,...newProducts])
        setSelectedRowKeys([])
        selectedRowsMapRef.current.clear()
        setOpen(false);
    };

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
                            <PrimaryButton loading={loading} text={"保存"} onClick={submit} />
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