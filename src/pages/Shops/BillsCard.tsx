import StoresTable from "@/components/Table/StoresTable";
import { DatePicker, Input, Select, Space } from "antd";
import { useEffect } from "react";



const { Search } = Input;

const { RangePicker } = DatePicker;
export default function BillsCard(){
    
    useEffect(()=>{
       
    },[])

    return (
        <> 
            <div className="products-select" >
                <div className="products-select-items-wrap" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px 12px',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                }}>
                    <div className="products-select-items-left" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px 12px',
                    }}>
                        {/*  */}
                        <Space.Compact>
                            <Select style={{width:"140px"}} defaultValue="1" options={[
                                {
                                    value: '1',
                                    label: '搜索账单编号',
                                },
                                {
                                    value: '2',
                                    label: '搜索店铺名称/handle',
                                },
                            ]} />
                            <Search placeholder="搜索店铺名称/handle/主域名" style={{ width: 280 }} />
                            {/* <Input defaultValue="Xihu District, Hangzhou" /> */}
                        </Space.Compact>
                        {/* <Search placeholder="搜索店铺名称/handle/主域名" style={{ width: 320 }} /> */}
                        {/*  */}
                        <Select
                            labelRender={()=><div>账单类型</div>}
                            defaultValue="-1"
                            optionFilterProp="label"
                            style={{width:"100px"}}
                            // onChange={onChange}
                            // onSearch={onSearch}
                            options={[
                                {
                                    value: '1',
                                    label: '订阅套餐',
                                },
                                {
                                    value: '2',
                                    label: '佣金',
                                },
                                {
                                    value: '3',
                                    label: '短信',
                                },
                                {
                                    value: '4',
                                    label: '渠道服务',
                                },
                                {
                                    value: '5',
                                    label: '增值功能',
                                },
                                {
                                    value: '6',
                                    label: '应用',
                                },
                            ]}
                        />
                        {/*  */}
                        <Select
                            labelRender={()=><div>账单状态</div>}
                            style={{width:"100px"}}
                            defaultValue="-1"
                            optionFilterProp="label"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            options={[
                            {
                                value: '1',
                                label: '待支付',
                            },
                            {
                                value: '2',
                                label: '已支付',
                            },
                            {
                                value: '3',
                                label: '已取消',
                            },
                            ]}
                        />
                        {/*  */}
                        <div>
                            <span style={{marginRight:"8px"}}>创建时间</span>
                            <RangePicker />
                        </div>
                        {/*  */}
                        <Select
                            labelRender={()=><div>商家账号</div>}
                            style={{width:"100px"}}
                            optionFilterProp="label"
                            defaultValue="-1"
                            onChange={()=>{

                            }}
                            // onSearch={onSearch}
                            options={[
                            {
                                value: '1',
                                label: '+86 123456789',
                            },
                            {
                                value: '2',
                                label: '+86 223456789',
                            },
                            {
                                value: '3',
                                label: '+86 323456789',
                            },
                            ]}
                        />
                    </div>
                </div>
            </div>
            {/* 暂无数据 */}
            <div style={{textAlign:"center",padding:"100px 24px"}}>
                <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-stores/20241216144306491/imgs/filter-empty.6a113.svg"></img>
                <div style={{fontSize:"20px",fontWeight:600}}>暂无数据</div>
            </div>
            {/* <StoresTable/> */}
        </>
    );
}

