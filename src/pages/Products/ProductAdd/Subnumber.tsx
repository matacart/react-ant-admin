
import { Card, Form, Select, Switch, Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import product from "@/store/product/product";


 function Subnumber(){
    
    const [form] = Form.useForm();


    useEffect(()=>{
        form.setFieldsValue({
            partsWarehouse:parseInt(product.productInfo.is_sys),
            isShare:true
        })
    },[])

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">共享信息
                        {/* <Tooltip title="上架信息">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined />
                            </span>
                        </Tooltip> */}
                    </span>
                    <Link to='#'>编辑</Link>
                </div>
                <Form layout="vertical" form={form}>
                    <Form.Item
                        className="moreLink"
                        name="partsWarehouse"
                        label={
                            <div className="label-content between">
                                <span>数据归属</span>
                            </div>
                        } >
                        <Select
                            style={{ width: "100%", height: "36px" }}
                            placeholder="数据归属"
                            options={[
                                { value: 0, label: '商户自建' },
                                { value: 1, label: '平台自建' },
                            ]}
                            onChange={(e)=>{
                                product.setProductInfo({
                                    ...product.productInfo,
                                    is_sys:e
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="isShare">
                        <div className="item between">
                            <span>子号共享</span>
                            <Switch checked={product.productInfo.is_share == 1?true:false} onChange={(e)=>{
                                product.setProductInfo({
                                    ...product.productInfo,
                                    is_share:e?1:0
                                })
                            }} />
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}
export default observer(Subnumber)

const Scoped = styled.div`
.gap{
    display: flex;
    flex-direction: column;
}
.header{
    display:flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .title{
        color: #000;
        font-size: 16px;
        font-weight:600;
    }
}
.item{
        /* margin-bottom: 10px; */
        margin-top: 16px;
}
.between{
    display: flex;
    justify-content: space-between;
}
a{
    font-weight: 400;
}

:where(.css-dev-only-do-not-override-no4izc).ant-form-item {
    margin-bottom: 0;
}

`
