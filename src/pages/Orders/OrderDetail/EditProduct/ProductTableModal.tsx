import DefaultButton from "@/components/Button/DefaultButton";
import DefaultButtonSecondary from "@/components/Button/DefaultButtonSecondary";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MySearch from "@/components/Input/MySearch";
import MySelect from "@/components/Select/MySelect";
import CommodityClassificationSelector from "@/pages/Products/ProductList/CommodityClassificationSelector";
import TagSelector from "@/pages/Products/ProductList/TagSelector";
import { getProductList } from "@/services/y2/api";
import order from "@/store/order/order";
import {Flex, Form, Input, Modal, Row, Select, Space, Table, TableProps } from "antd"
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";


interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

function ProductTableModal(){

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [productList,setProductList] = useState<any>([])

    const Ref = useRef(null)

    const columns: TableProps<DataType>['columns'] = [
        {
          title: '商品/款式',
          dataIndex: 'id',
          key: 'id',
          render: (value,record) => <div>
            {record.title}
          </div>,
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
          dataIndex: 'specialprice',
          key: 'specialprice',
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
    const handleOk = () => {
        // order.setProductInfo([...productList])
        setOpen(false);
    };

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        selectedRowKeys: productList.map(item => item.id), // 同步选中状态
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setProductList(selectedRows)

            // console.log(order.productInfo)
        },
        getCheckboxProps: (record: DataType) => ({
        }),
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
            total:res.count
          })
          setData(res.data)
        }).catch(err=>{
          console.log(err)
        }).finally(()=>{
          setLoading(false)
        })
    };

    useMemo(()=>{
        setProductList([...order.productInfo])
    },[order.productInfo])

    return (
        <Scoped ref={Ref}>
            <DefaultButton text="选择商品" onClick={()=>{
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
    }

    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }

`


export default  observer(ProductTableModal)