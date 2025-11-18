import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MySearch from "@/components/Input/MySearch";
import LangSelect from "@/components/Select/LangSelect";
import MySelect from "@/components/Select/MySelect";
import { useAbortController } from "@/hooks/customHooks";
import { getCategoryList, getCategorySelect } from "@/services/y2/api";
import product from "@/store/product/product";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Input, MenuProps, message, Modal, Space, Table, TableProps, Tag, TreeSelect } from "antd";
import React, { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";


interface DataType {
    id: string;
    name: string;
    title:string;
    age: number;
    category_image:string;
    delimiter:string;
    address: string;
}

export default function ProductCategoryModal() {

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const { createAbortController } = useAbortController();

    const [languagesId,setLanguagesId] = useState("2");

    // table
    const [data,setData] = useState<DataType[]>([]);

    // 分页
    const [pagination,setPagination] = useState({
        current:1,
        pageSize:10,
        total:10
    });

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '分类名称',
            dataIndex: 'id',
            width: 240,
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
            width: 80,
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
            width: 80,
            dataIndex: 'product_count',
            key: 'product_count',
            render: (value,record) => <div>
                {value}
            </div>,
        }
    ];

    // 获取分类列表
    const fetchData = async (page:number,limit:number) => {
        setLoading(true);
        const signal = createAbortController();
        const res = {
            languages_id:languagesId,
            page:page,
            limit:limit,
        }
        getCategoryList(res,signal).then(res=>{
          setPagination({
            current:page,
            pageSize:limit,
            total:Number(res.count || 0)
          })
          setData(res.data)
        }).catch(err=>{
            if (err.name !== 'CanceledError') {
                message.error('获取数据失败');
            }
        }).finally(()=>{
          setLoading(false)
        })
    };

    // 选中的分类集合
    const [categoryList,setCategoryList] = useState<any>([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        selectedRowKeys:selectedRowKeys, // 同步选中状态
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setCategoryList(selectedRows)
            setSelectedRowKeys(selectedRowKeys)
        },
    };

    const cancel = ()=>{
        setSelectedRowKeys([]);
        setCategoryList([]);
        setOpen(false);
    }

    // 提交
    const submit = ()=>{
        product.setProductInfo({
            ...product.productInfo,
            categoryIds:selectedRowKeys.join(","),
        });
        setSelectedRowKeys([]);
        setCategoryList([]);
        setOpen(false);
    }

    // 首次加载不执行语言切换逻辑
    const isFirstLanguages = useRef(true);
    useMemo(()=>{
        if (isFirstLanguages.current) {
            isFirstLanguages.current = false;
            return;
        }
        fetchData(pagination.current,pagination.pageSize);
    },[languagesId])


    return(
        <>  
            <a onClick={(e)=>{
                e.stopPropagation(); // 阻止点击事件冒泡到父组件
                setOpen(true);
                fetchData(1,10);
            }}>选择</a>
            {/* 清理所有标签 */}
            <MyModal open={open} width="860px" title="选择商品分类" centered 
                onCancel={cancel}
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <Flex className="conditional-warp" gap={40}>
                    <Flex style={{flex:1}}>
                        <MySearch placeholder="搜索" style={{height:"36px"}} onSearch={(value:string)=>{
                            console.log(value)
                        }} />
                    </Flex>
                    <LangSelect lang={languagesId} setLang={(value:string)=>setLanguagesId(value)} />
                </Flex>
                {/* table */}
                <Table<DataType>
                    className="category-table"
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
            </MyModal>
        </>
    )
}


const MyModal = styled(Modal)`
    .conditional-warp{
        margin-top: 20px;
    }
    .category-table{
        margin-top: 20px;
    }
    .ant-table{
        height: calc(50vh) ;
        overflow-y: auto;
        border: 1px solid #eef1f7;
        border-radius: 6px;
        border-bottom: none;
    }
`