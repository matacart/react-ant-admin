import StoresTable from "./StoresTable";
import MySelectIcon from "@/components/Select/MySelectIcon";
import SelectCheckBox from "@/components/Select/SelectCheckBox";
import SearchInput from "@/components/Input/SearchInput";
import { useEffect, useState } from "react";
import { Flex, Tag } from "antd";
import shopsManagementStore from "@/store/shops/shopsManagementStore";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

interface StoresCardType{
    rolesList:any,
    employeeList:any
}

function StoresCard({rolesList,employeeList}:StoresCardType){

    return (
        <Scoped> 
            <div className="products-select" >
                <div className="products-select-items-wrap" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px 12px',
                    justifyContent: 'space-between',
                }}>
                    <div className="products-select-items-left" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px 12px',
                    }}>
                        {/*  */}
                        <SearchInput placeholder="搜索店铺名称/handle/主域名" style={{ width: 320 }} />
                        {/*  */}
                        <SelectCheckBox
                            labelRender={()=><div>店铺状态</div>}
                            defaultValue=""
                            options={[
                                {
                                    value: '1',
                                    label: '营业中',
                                },
                                {
                                    value: '0',
                                    label: '已打烊',
                                },
                                {
                                    value: '-1',
                                    label: '已冻结',
                                },
                                {
                                    value: '-2',
                                    label: '已停用',
                                },
                                {
                                    value: '-3',
                                    label: '已注销',
                                },
                            ]}
                            setOptions={undefined}
                            style={{ height:"36px",width:"120px" }}  
                        />
                        {/*  */}
                        <MySelectIcon
                            labelRender={()=><div>角色</div>}
                            style={{height:"36px",width:"120px"}}
                            value={shopsManagementStore.role.value}
                            optionFilterProp="label"
                            options={rolesList}
                            onChange={(value:string,option:any)=>{
                                shopsManagementStore.setRole(option)
                            }}
                        />
                        {/*  */}
                        <MySelectIcon
                            labelRender={()=><div>商家子账号</div>}
                            style={{height:"36px",width:"120px"}}
                            value={shopsManagementStore.employee}
                            optionFilterProp="label"
                            options={employeeList}
                            onChange={(value:string)=>{
                                shopsManagementStore.setEmployee(value)
                            }}
                        />
                    </div>
                    <div className="products-select-items-right">
                        {/*  */}
                        <MySelectIcon
                            style={{height:"36px"}}
                            defaultValue={"1"}
                            optionFilterProp="label"
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
            {/* 标签 */}
            <Flex wrap>
                {shopsManagementStore.role.label && <Tag style={{marginBottom:"10px",padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
                    shopsManagementStore.setRole({
                        label: "",
                        value: ""
                    });
                }}>
                    <span className="color-474F5E font-14">
                        角色：{shopsManagementStore.role.label}
                    </span>
                </Tag>}
                {shopsManagementStore.employee && <Tag style={{marginBottom:"10px",padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
                    shopsManagementStore.setEmployee("");
                }}>
                    <span className="color-474F5E font-14">
                        商家子账号：{shopsManagementStore.employee}
                    </span>
                </Tag>}
            </Flex>
            {/* 表格 */}
            <StoresTable/>
        </Scoped>
    );
}

const Scoped = styled.div`
    .products-select{
        margin-bottom: 10px;
    }
`;

export default observer(StoresCard);

