import StoresTable from "@/components/Table/StoresTable";
import { Input, Select } from "antd";
import { useEffect } from "react";



const { Search } = Input;
export default function StoresCard(){
    
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
                        <Search placeholder="搜索店铺名称/handle/主域名" style={{ width: 320 }} />
                        {/*  */}
                        <Select
                            labelRender={()=><div>店铺状态</div>}
                            defaultValue="-1"
                            optionFilterProp="label"
                            style={{width:"120px"}}
                            // onChange={onChange}
                            // onSearch={onSearch}
                            options={[
                            {
                                value: '1',
                                label: '营业中',
                            },
                            {
                                value: '2',
                                label: '已打烊',
                            },
                            {
                                value: '3',
                                label: '已冻结',
                            },
                            {
                                value: '4',
                                label: '已停用',
                            },
                            {
                                value: '5',
                                label: '已注销',
                            },
                            ]}
                        />
                        {/*  */}
                        <Select
                            labelRender={()=><div>角色</div>}
                            style={{width:"120px"}}
                            defaultValue="-1"
                            optionFilterProp="label"
                            // onChange={onChange}
                            // onSearch={onSearch}
                            options={[
                            {
                                value: '1',
                                label: '店主',
                            },
                            {
                                value: '2',
                                label: '店长',
                            },
                            {
                                value: '3',
                                label: '员工',
                            },
                            ]}
                        />
                        {/*  */}
                        <Select
                            labelRender={()=><div>商家账号</div>}
                            style={{width:"120px"}}
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
                    <div className="products-select-items-right">
                        {/*  */}
                        <Select
                            placeholder="Select a person"
                            optionFilterProp="label"
                            defaultValue={"1"}
                            // onChange={onChange}
                            // onSearch={onSearch}
                            options={[
                            {
                                value: '1',
                                label: '店铺创建(最新创建)',
                            },
                            {
                                value: '2',
                                label: '店铺创建(最早创建)',
                            },
                            {
                                value: '3',
                                label: '店铺创建(最晚到期)',
                            },
                            {
                                value: '4',
                                label: '店铺创建(最早到期)',
                            },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <StoresTable/>
            {/* <ProductListAjax selectProps={{language:language,title:title,model:model,tags:tags}}  /> */}
        </>
    );
}

