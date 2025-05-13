import product from "@/store/product/product";
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Checkbox, Col, Form, Input, InputNumber, InputNumberProps, InputProps, Row, Tooltip } from "antd"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components"


const onChange: InputProps['onChange'] = (value) => {
    console.log('changed', value);
    // 
};




function StockEdit({form}:{form:any}){

    useEffect(()=>{
        form.setFieldsValue({
            model: product.productInfo.model,
            ISBN:product.productInfo.barcode,
            SKU:product.productInfo.sku,
            quantity:product.productInfo.quantity,
            minimum:product.productInfo.minimum,
            salesCount:product.productInfo.sales_count,
            inventoryTracking:product.productInfo.inventoryTracking == 1?true:false,
            continueSell:product.productInfo.continueSell == 1?true:false
        })
    },[])

    return (
        <Scoped>
            <Card title='库存' >
                <Form layout="vertical" form={form}>
                    <Row>
                        <Col span={11}>
                            <Form.Item name="model" label="型号"
                                rules={[{ required: true, message: '请输入型号' }]}
                            >
                                <Input
                                    onChange={(e)=>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            model:e.target.value
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item name="ISBN" label="条码(ISBN、UPC、GTIN等)">
                                <Input
                                    onChange={(e)=>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            barcode:e.target.value
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                name="SKU"
                                label="SKU"
                            >
                                <Input
                                    onChange={(e) => {
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            sku:e.target.value
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item name="quantity" label="库存数量">
                                <InputNumber<number>
                                    className="ant-input"
                                    min={0}
                                    onChange={(value)=>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            quantity:value?.toString() || ""
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                name="minimum"
                                label="最少购买"
                            >
                                <InputNumber<number>
                                    className="ant-input"
                                    min={0}
                                    onChange={(value) =>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            minimum:value?.toString() || ""
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item name="salesCount" label="商品销量">
                                <InputNumber<number>
                                    className="ant-input"
                                    min={0}
                                    onChange={(value)=>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            sales_count:value?.toString() || ""
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="inventoryTracking"
                        style={{
                            marginBottom: 0
                        }}
                        >
                        <Checkbox onChange={(e)=>{
                            product.setProductInfo({
                                ...product.productInfo,
                                inventoryTracking:e.target.checked?1:0
                            })
                        }}>开启库存追踪</Checkbox>
                    </Form.Item>
                    <Form.Item name="continueSell">
                        <Checkbox
                            onChange={(e)=>{
                                product.setProductInfo({
                                    ...product.productInfo,
                                    continueSell:e.target.checked?1:0
                                })
                            }}
                        >
                            缺货后继续销售
                            <Tooltip title="此设置同时适用MataCart后台管理">
                                <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                    <QuestionCircleOutlined />
                                </span>
                            </Tooltip>
                        </Checkbox>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}


export default observer(StockEdit)


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
        &-number-input-wrap{
            height: 100%;
            display:flex;
            align-items: center;
        }
        &-number-input{
        }
    }
}
`