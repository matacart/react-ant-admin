
import { Card, Flex, Form, Select, Switch } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { useEffect } from 'react';
import product from "@/store/product/product";
import DefaultSelect from "@/components/Select/DefaultSelect";


 function Subnumber(){
    
    const [form] = Form.useForm();


    useEffect(()=>{
        form.setFieldsValue({
            partsWarehouse:product.productInfo.is_sys,
            isShare:product.productInfo.is_share == '1' ? true : false
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
                    {/* <Link to='#'>编辑</Link> */}
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
                        <DefaultSelect
                            style={{ width: "100%", height: "36px" }}
                            placeholder="数据归属"
                            options={[
                                { value: '0', label: '商户自建' },
                                { value: '1', label: '平台自建' },
                            ]}
                            onChange={(e)=>{
                                product.setProductInfo({
                                    ...product.productInfo,
                                    is_sys:e
                                })
                            }}
                        />
                    </Form.Item>
                    <Flex align="center" justify="space-between" style={{ marginTop: "20px" }}>
                        <span>子号共享</span>
                        <Form.Item name="isShare" valuePropName="checked">
                            <Switch onChange={(e)=>{
                                product.setProductInfo({
                                    ...product.productInfo,
                                    is_share:e?'1':'0'
                                })
                            }} />
                        </Form.Item>
                    </Flex>
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
   
    a{
        font-weight: 400;
    }

    .ant-form-item {
        margin-bottom: 0;
    }

`
