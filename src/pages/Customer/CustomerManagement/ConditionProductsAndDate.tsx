import DefaultButton from "@/components/Button/DefaultButton";
import MyButton from "@/components/Button/MyButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyDropdown from "@/components/Dropdown/MyDropdown"
import { CloseIcon, UnfoldIcon } from "@/components/Icons/Icons";
import MySearch from "@/components/Input/MySearch";
import MySelect from "@/components/Select/MySelect";
import CommodityClassificationSelector from "@/pages/Products/ProductList/CommodityClassificationSelector";
import TagSelector from "@/pages/Products/ProductList/TagSelector";
import { getProductList } from "@/services/y2/api";
import cousomerManagement from "@/store/customer/cousomerManagement";
import { Checkbox, DatePicker, Divider, Flex, Input, Modal, Popover, Space, Table, TableProps, Tooltip } from "antd"
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";


interface conditionTypeOptions{
    label:string;
    value:string;
    tip:string;
}
interface conditionType{
    label:string,
    options?:conditionTypeOptions[],
    selectOptions:string[],
}
interface propsType{
    index:number,
    condition:conditionType[]
}

interface DataType {
    key: string;
    id:string;
    title: string;
    product_image:string;
}

const { RangePicker } = DatePicker;

function ConditionProductsAndDate({condition,index}:propsType){

    const [loading,setLoading] = useState(false);

    const conditionFirst = condition[0]

    const conditionSecond = condition[1]

    const [firstOpen,setFirstOpen] = useState(false);

    const [secondOpen,setSecondOpen] = useState(false);

    const [symbol,setSymbol] = useState("=");

    const myRef = useRef(null);

    // 条件
    const [checkList,setCheckList] = useState<string[]>(conditionFirst.selectOptions);

    // 条件 时间
    const [time,setTime] = useState("");

    const [options,setOptions] = useState([
        { label:"今天",value:"今天" },
        { label:"过去7天",value:"过去7天" },
        { label:"过去30天",value:"过去30天" },
        { label:"过去90天",value:"过去90天" },
        { label:"过去12个月",value:"过去12个月" },
    ])

    const contentSecond = (
        <div style={{minWidth:"128px"}}>
            <Flex gap={8}>
                <div style={{width:"100%"}}>
                    {options.map((item,index)=>(
                        <div className="item cursor-pointer" onClick={()=>{
                            setTime(item.value)
                            setSecondOpen(false)
                        }}>{item.label}</div>
                    ))}
                </div>
            </Flex>
            <div className="customTime">
                <div className="font-12 color-7A8499" style={{marginBottom:"8px"}}>自定义时间区间</div>
                <div>
                    <RangePicker style={{height:"36px"}} />
                </div>
            </div>
            <Flex align="center" justify="space-between" className="font-12" style={{padding:"12px"}}>
                <div className="color-474F5E cursor-pointer" onClick={()=>setTime("")}>重置</div>
                <MyButton className="font-12" type="primary" size="small" text="继续筛选" />
            </Flex>
        </div>
    )


    const columns: TableProps<DataType>['columns'] = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'index',
            width: "80px",
            render: (text,render,index) => <span>{index+1}</span>,
        },
        {
          title: '商品',
          dataIndex: 'id',
          key: 'name',
          render: (text,render) => <>
            <Flex gap={8}>
                <div style={{width:"60px",height:"60px"}}>
                    <img style={{width:"100%",height:"100%",objectFit:"contain",borderRadius:"4px"}} src={render.product_image ? render.product_image+"?x-oss-process=image/resize,m_fill,w_100,h_100" : "/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_100"} />
                </div>
                <Flex style={{flex:1,alignItems:"center"}}>{render.title}</Flex>
            </Flex>
          </>,
        },
        {
          title: '售价',
          dataIndex: 'specialprice',
          key: 'specialprice',
          width: "160px",
          render: (text) => <>
            <span>{text}</span>
          </>,
        },
        {
          title: '库存',
          dataIndex: 'quantity',
          key: 'quantity',
          width: "160px",
          render: (text) => <>
            <span>{text}</span>
          </>,
        },
    ];
    
    // 商品
    const [data,setData] = useState([])
    // 分页
    const [pagination,setPagination] = useState({
        current:1,
        pageSize:10,
        total:10,
        hasMore: true // 是否还有更多数据
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows,setSelectedRows] = useState<DataType[]>([])

    // 选中行
    const rowSelection: TableProps<DataType>['rowSelection'] = {
        selectedRowKeys:selectedRowKeys, // 同步选中状态
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            if(selectedRowKeys.length>100){
                setSelectedRowKeys(selectedRowKeys.slice(0,100))
                setSelectedRows(selectedRows.slice(0,100))
            }else{
                setSelectedRowKeys(selectedRowKeys)
                setSelectedRows(selectedRows)
            }
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: selectedRowKeys.length >= 100 && !selectedRowKeys.includes(record.id), // 已选满100条时禁用未选项
        }),
    };

    // 防抖函数
    const useDebounce = (fn: Function, delay: number) => {
        const timerRef = useRef<NodeJS.Timeout>();

        useEffect(() => {
            return () => {
              // 组件卸载时清除定时器
              clearTimeout(timerRef.current);
            };
        }, []);

        return (...args: any[]) => {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            fn(...args);
          }, delay);
        };
    };

    // 获取商品数据
    const fetchData = async (page:number,limit:number) => {
        if (loading) return; // 如果正在加载中，则直接返回
        setLoading(true);
        try{
            const res = {
                page:page,
                limit:limit,
                languagesId:"2",
            }
            const response = await getProductList(res);
            setPagination(prev => ({
                ...prev,
                current: page,
                pageSize: limit,
                total: response.count,
                hasMore: response.data.length >= limit // 判断是否还有更多数据
            }));
            
            // 如果是第一页就直接设置，否则追加数据
            setData(prev => page === 1 ? response.data : [...prev, ...response.data]);
        }catch(err){
        }finally{
            setLoading(false);
        }
    };


    // 使用防抖 300ms 执行一次
    const debouncedFetchData = useDebounce(fetchData, 300);
    // 表格滚动事件
    const handleTableScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 50; // 距离底部50px时触发
        
        if (isNearBottom && pagination.hasMore) {
          const nextPage = pagination.current + 1;
          debouncedFetchData(nextPage, pagination.pageSize);
        }
    };
    
    return(
        <Scoped ref={myRef}>
            {/*  */}
            <Flex className="select-item color-242833 cursor-pointer" align="center" >
                <Flex gap={8} style={{paddingRight:"6px"}} onClick={() => {
                    setFirstOpen(true)
                    fetchData(1,10)
                }}>
                    {conditionFirst.label}
                    {checkList.length > 0 && <div onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <MyDropdown
                            onOpenChange={(open:boolean)=>{
                                if (open) setFirstOpen(false); // 关闭Popover当Dropdown打开时
                            }}
                            tiggerEle={<div className="select-item-conditions"> {symbol} </div>}
                            menu={{
                                items:[
                                    {
                                        key: "1", label: (
                                            <a onClick={()=>setSymbol("=")}>等于</a>
                                        )
                                    },
                                    {
                                        key: "2", label: (
                                            <a onClick={()=>setSymbol("≠")}>不等于</a>
                                        )
                                    },
                                ]
                            }}
                        />
                    </div>
                    }
                    {checkList.length > 0 && (checkList.length > 1 ? <>
                        <Tooltip placement="top" title={checkList.join("、")}>
                            <div className="select-item-text">{checkList[0]+"...共"+checkList.length+"项"}</div>
                        </Tooltip>
                    </>:<>
                        <Tooltip placement="top" title={checkList[0]}>
                            <div className="select-item-text">{checkList[0]}</div>
                        </Tooltip>
                    </>)}
                </Flex>
                <Divider type="vertical" style={{height:"12px",borderColor:"#7A8499",position:"relative",top:"0px"}} />
                <Popover open={secondOpen} align={{offset:[-10,11]}} onOpenChange={(open)=>setSecondOpen(open)} className="popover" content={contentSecond} getPopupContainer={()=>myRef.current!} arrow={false} placement="bottomLeft" trigger="click">
                    <Flex gap={8} style={{paddingLeft:"6px"}}>
                        <div>{conditionSecond.label}</div>
                        {time && <div>{time}</div>}
                    </Flex>
                </Popover>
                {/*  */}
                <UnfoldIcon style={{marginLeft:"4px"}} className={firstOpen?"font-18 active":"font-18 no-active"} />
                {/* 移除 */}
                <div className="colse font-12" onClick={(e)=>{
                    e.stopPropagation()
                    const newConditionList = [...cousomerManagement.conditionList]
                    newConditionList.splice(index,1)
                    cousomerManagement.setConditionList(newConditionList)
                }}>
                    <CloseIcon />
                </div>
            </Flex>
            
            {/* 产品 */}
            <Modal open={firstOpen} 
                getContainer={()=>myRef.current!} 
                centered 
                width={860}
                title={<div>
                    选择商品（{selectedRowKeys.length}/100）
                </div>} 
                onCancel={()=>setFirstOpen(false)}
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={()=>setFirstOpen(false)} />
                            <PrimaryButton text={"保存"} onClick={()=>{
                                setFirstOpen(false)
                                setCheckList(selectedRows.map(item=>item.title))
                            }} />
                        </Flex>
                    </Flex>
                )}
            >
                <div style={{height:`calc(100vh - 300px)`}}>
                    <div className="product-preview">
                        <div className="color-7A8499">暂未选择商品</div>
                    </div>
                    <Flex style={{margin:"12px 0"}} justify="space-between">
                        <Flex gap={12}>
                            <Space.Compact style={{width:"320px"}} >
                                <MySelect defaultValue={0} options={[
                                    { value: 0, label: '全部' },
                                    { value: 1, label: '商品名称' },
                                    { value: 3, label: '商品SKU' },
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
                    <div className="table-box">
                        <Table<DataType> 
                            scroll={{ y: `calc(100vh - 450px)` }}
                            columns={columns}
                            rowKey={(record) => record.id}
                            rowSelection={{ type: "checkbox", ...rowSelection }} 
                            dataSource={data}
                            onScroll={handleTableScroll}
                            pagination={false}
                            loading={{
                                spinning: loading,
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </Scoped>
    )
}

export default ConditionProductsAndDate;

const Scoped = styled.div`
    .select-item{
        position: relative;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
        padding: 6px 8px;
        .select-item-conditions{
            padding: 0 4px;
        }
        .select-item-text{
            padding: 0 4px;
        }
        .active{
            color:rgb(0 0 0 / 25%);
            transform: rotate(180deg);
            transition: transform 0.3s;  // 添加旋转动画
        }
        .no-active{
            color:rgb(0 0 0 / 25%);
            transform: rotate(0deg);
            transition: transform 0.3s;  // 添加旋转动画
        }
    }
    .select-item:hover{
        border-color: #356dff;
        box-shadow: 0 0 12px rgba(53, 109, 255, 0.15);
        .select-item-conditions{
            padding: 0 4px;
            background-color: #f0f3f9;
            border-radius: 2px;
        }

        .select-item-text{
            padding: 0 4px;
            background-color: #f0f3f9;
            border-radius: 2px;
        }
    }

    .select-prefix{
        .ant-select-selector::before{
            content:"重点运营";
            margin-right: 12px;
            position: relative;
            top: 6px;
            font-weight: 400;
            color: #242833;
        }
    }

    .colse{
        display: none;
        position: absolute;
        top:0;
        right:0;
        padding: 2px;
        color:#FFF;
        background: #b8becc;
        border-radius: 20px;
        transform:translateX(6px) translateY(-6px);
    }

    .select-item:hover .colse{
        display: flex;
    }

    .ant-popover-inner {
        padding: 0;
    }
    /*  */
    .item{
        padding: 8px 12px;
    }
    .item:first-child{
        border-radius: 8px 8px 0 0;
    }
    .item:hover{
        background-color: #f7f8fb;
    }
    .customTime{
        border-top: 1px solid #eef1f6;
        border-bottom: 1px solid #eef1f6;
        padding: 12px;
    }

    /*  */
    .table-box{
        /* height: calc(100% - 220px); */
        .ant-table{
            border: 1px solid #eef1f7;
            border-radius: 6px;
            border-bottom: none;
        }
    }

`