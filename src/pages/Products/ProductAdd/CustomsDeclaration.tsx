import { getCountryList } from "@/services/y2/api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Card, Form, Input, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface CountryOption {
    label: string;
    value: string | number;
}

export default function CustomsDeclaration() {
    
    const [countryList,setCountryList] =  useState<CountryOption[]>([]);
    useEffect(()=>{
        
    })
    return (
        <Scoped>
            <Card title="海关信息">
                <Form layout="vertical">
                    <Form.Item 
                    required
                    label={
                        <>
                            发货国家/地区
                            <Tooltip title="产品制造或组装的地点">
                                <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                        </>
                    }>
                        <Select
                            showSearch
                            placeholder="选择国家"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={countryList}
                            onChange={(value)=>{
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        required                    
                        label="HS(协调制度) 代码">
                        <Input placeholder="请输入HS编码" onChange={(e)=>{
                        }} />
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
.ant{
    &-card{
        &-head-title{
            font-weight: 400;
        }
        &-body{
            padding-bottom: 0;
        }
        label{
            font-weight: 600;
        }
    }
    &-checkbox-wrapper{
        span{
            font-weight: 400;
        }
    }
    &-input{
            width: 100%;
            height: 36px;
    }
    &-select{
        width: 100%;
        height: 36px;
    }
}
`