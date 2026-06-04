import DefaultInput from "@/components/Input/DefaultInput";
import DefaultInputNumber from "@/components/Input/DefaultInputNumber";
import product from "@/store/product/product";
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Checkbox, Col, Flex, Form, Input, InputNumber, InputProps, Row, Tooltip } from "antd"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components"

function StockCard({form}:{form:any}){

    useEffect(()=>{
        form.setFieldsValue({
            model:product.productInfo.model,
            ISBN:product.productInfo.barcode,
            SKU:product.productInfo.sku,
            quantity:product.productInfo.quantity,
            minimum:product.productInfo.minimum,
            salesCount:product.productInfo.sales_count,
            inventoryManagement:product.productInfo.inventory_management == '1'?true:false,
            subtract:product.productInfo.subtract == '1'?true:false,
            inventoryPolicy:product.productInfo.inventory_policy == 'continue'?true:false,
        })
    },[])

    return (
        <Scoped>
            <Card title='库存'>
                <Form layout="vertical" form={form}>
                    <Row>
                        <Col span={11}>
                            <Form.Item name="model" label={<Flex>
                                <div>型号</div>
                                <Tooltip title="型号唯一不重复">
                                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                        <QuestionCircleOutlined />
                                    </span>
                                </Tooltip>
                            </Flex>}
                                rules={[{ required: true, message: '请输入型号' }]}
                            >
                                <DefaultInput
                                    onChange={(e:any)=>{
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
                                <DefaultInput
                                    placeholder="条码(ISBN、UPC、GTIN等)"
                                    onChange={(e:any)=>{
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
                            <Form.Item name="SKU" label="SKU">
                                <DefaultInput
                                    placeholder="SKU"
                                    onChange={(e:any)=>{
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
                                <DefaultInputNumber
                                    className="ant-input"
                                    placeholder="库存数量"
                                    min={0}
                                    onChange={(value:any)=>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            quantity:value
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item name="minimum" label="最少购买">
                                <DefaultInputNumber
                                    className="ant-input"
                                    placeholder="最少购买"
                                    min={0}
                                    onChange={(value:any)=>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            minimum:value
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item name="salesCount" label="商品销量">
                                <DefaultInputNumber
                                    className="ant-input"
                                    placeholder="商品销量"
                                    min={0}
                                    onChange={(value:any)=>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            sales_count:value
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="inventoryManagement"
                        style={{
                            marginBottom: 0
                        }}
                        valuePropName="checked"
                    >
                        <Checkbox onChange={(checked:any)=>{
                            product.setProductInfo({
                                ...product.productInfo,
                                inventory_management:checked?'1':'0'
                            })
                        }}>开启库存追踪</Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="subtract"
                        style={{
                            marginBottom: 0
                        }}
                        valuePropName="checked"
                    >
                        <Checkbox onChange={(checked:any)=>{
                            product.setProductInfo({
                                ...product.productInfo,
                                subtract:checked?'1':'0'
                            })
                        }}>是否扣减库存</Checkbox>
                    </Form.Item>
                    <Form.Item name="inventoryPolicy" valuePropName="checked">
                        <Checkbox onChange={(checked:any)=>{
                            product.setProductInfo({
                                ...product.productInfo,
                                inventory_policy:checked?'continue':'deny'
                            })
                        }}>
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

export default observer(StockCard)


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