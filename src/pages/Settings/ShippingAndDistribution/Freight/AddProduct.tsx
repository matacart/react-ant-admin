import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton";
import MySearch from "@/components/Input/MySearch";
import MySelect from "@/components/Select/MySelect";
import { queryProductInfo, queryProductList } from "@/services/y2/apiLogistics";
import customFreight from "@/store/settings/ShippingAndDistribution/customFreight";
import { Avatar, Flex, Modal, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ProductType } from "./ApplicableGoods";
import { observer } from "mobx-react-lite";
import { useParams } from "@umijs/max";

interface DataType{
    pId:number,
    // spuSeq:string,
    defaultTitle:string,
    images:string[],

    // 其他字段...
    productId:string,
    productGroupSeq:string,
    productGroupType:string,
    productGroupName:string,
}
// {goodsList}:{goodsList:ProductType[]}
function AddProduct() {

    const { id="" } = useParams();

    const scopedRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);

    // 商品列表
    const [data, setData] = useState<DataType[]>([]);

    const [pagination, setPagination] = useState({
        current:1,
        pageSize:10,
        total: 0,
    });

    const [defaultSelectedRowKeys, setDefaultSelectedRowKeys] = useState<string[]>([]);

    // 选中的商品ID
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    // 选中的商品
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);

    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: '商品',
            dataIndex: 'pId',
            key: 'pId',
            width: 200,
            render:(text:number,record:DataType)=>{
                return (
                    <>
                        <Flex align="center">
                            <Avatar 
                                style={{flex: '0 0 42px'}}
                                size={42} 
                                shape="square" 
                                src={record?.images?.[0] ? record?.images?.[0] + "?x-oss-process=image/resize,w_100" : "/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"}
                            />
                            <div style={{
                                marginLeft:"12px",
                                alignContent: 'center',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width:'320px',
                            }}>{record.defaultTitle}</div>
                        </Flex>
                    </>
                )
            }
        },
        {
            title: '分组',
            dataIndex: 'pId',
            key: 'pId',
            width: 100,
            render:(text:number,record:DataType)=>{
                return (
                    <>
                        <Flex align="center">
                            {record.productGroupName && <div>在 {record.productGroupName} 中</div>}
                        </Flex>
                    </>
                )
            }
        }
    ];

    const init = ()=>{
        setOpen(true);
        fetch();
    }

    const fetch = ()=>{
        // 初始化选中的商品ID
        let defaultSelectedRowKeys:string[] = customFreight?.createdProduct?.map((item:ProductType) => item.productId) || [];
        setLoading(true);
        queryProductList({
            languages_id: customFreight?.language,
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
        }).then(async res=>{
            setPagination({
                ...pagination,
                total:res.data.total,
            })
            const productIds = res.data.list.map((item:DataType) => item.pId).filter((item:string) => item);
            const productInfo = await queryProductInfo({
                languages_id: customFreight?.language,
                productIds: JSON.stringify(productIds)
            })
            const newData = res.data.list.map((item:DataType) => {
                const current = productInfo.data.productsRelatedGroups.find((info:any) => info.productId == item.pId)
                if(current?.productGroupSeq == id){
                    defaultSelectedRowKeys.push(current.productId.toString());
                }
                return {
                    ...item,
                    ...current,
                }
            })
            setSelectedRowKeys(defaultSelectedRowKeys);
            setDefaultSelectedRowKeys(defaultSelectedRowKeys);
            setData(newData)
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false)
        });
    }

    const firstRef = useRef(true);

    useEffect(()=>{
        if(firstRef.current){
            firstRef.current = false;
            return;
        }
        fetch();
    },[pagination.current,pagination.pageSize])

    const submit = ()=>{
        // 过滤出选中的商品
        const newCreatedProduct = selectedRows.filter((item:DataType) => !defaultSelectedRowKeys.includes(item.productId));
        customFreight.setCreatedProduct([...customFreight?.createdProduct || [], ...newCreatedProduct.map((item:DataType) => ({
            title: item.defaultTitle,
            productId: item.pId.toString(),
            image: item.images?.[0],
            productGroupSeq: item.productGroupSeq,
            productGroupName: item.productGroupName,
        }))]);
        setOpen(false);
    }

    return (
        <Scoped ref={scopedRef}>
            <DefaultButton text="编辑商品" onClick={init}  />
            <Modal open={open} onCancel={() => setOpen(false)} getContainer={()=>scopedRef.current!} title="选择商品" width={800} centered footer={()=><>
                <Flex justify="flex-end" gap={12}>
                    <DefaultButton onClick={() => setOpen(false)} text="取消" />
                    <PrimaryButton onClick={submit} text="确定" />
                </Flex>
            </>}>
                <Flex style={{marginBottom:"12px"}} justify="space-between">
                    <Flex gap={12}>
                        <Space.Compact style={{width:"320px"}} >
                            <MySelect  defaultValue={1} options={[
                                { value: 1, label: '商品名称' },
                                { value: 2, label: '商品SPU' },
                                { value: 3, label: '商品SKU' }
                            ]} style={{height:"36px",width:"90px"}} />
                            <MySearch placeholder="搜索" style={{height:"36px"}} onSearch={(value:string)=>{
                                console.log(value)
                            }} />
                        </Space.Compact>
                    </Flex>
                </Flex>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    scroll={{ y: 320 }}
                    onChange={(newPagination)=>{
                        setPagination({
                            ...pagination,
                            current: newPagination.current ?? 1,
                            pageSize: newPagination.pageSize ?? 10,
                        });
                    }}
                    rowKey={(record) => record.pId}
                    rowSelection={{
                        selectedRowKeys: selectedRowKeys,
                        getCheckboxProps: (record) => ({
                            disabled: defaultSelectedRowKeys.includes(record.productId),
                        }),
                        onChange: (selectedRowKeys, selectedRows) => {
                            setSelectedRowKeys(selectedRowKeys as string[]);
                            setSelectedRows(selectedRows);
                        },
                    }}
                />
            </Modal>
        </Scoped>
    )
}

const Scoped = styled.div`
    margin-top: 12px;
    .ant-table{
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`;

export default observer(AddProduct);
