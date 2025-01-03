import oldStore from '@/store/product/oldStore';
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Checkbox, Col, Form, Input, InputNumber, InputNumberProps, InputProps, Row, Tooltip } from "antd"
import e from "express";
import { observer } from "mobx-react-lite";
import styled from "styled-components"


const onChange: InputProps['onChange'] = (value) => {
    console.log('changed', value);
    // 
    // newStore.setContinueSell(e.target.value)
};


function StockEdit(){
    return (
        <Scoped>
            <Card title='库存' >
                <Form layout="vertical">
                    <Row>
                        <Col span={11}>
                            <Form.Item label="型号"
                                required initialValue={oldStore.model}
                                validateStatus={oldStore.validate.model as any}
                                help={oldStore.validate.model == "success"?"":<span style={{ color: '#F86140' }}>请输入商品模型</span>}>
                                <Input
                                    onChange={(e)=>{
                                        oldStore.setModel(e.target.value)
                                        newStore.validate.model = "success"
                                        newStore.setEditStatus(true)
                                    }}
                                    value={oldStore.model}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                        <Form.Item label="条码(ISBN、UPC、GTIN等)">
                                <Input
                                    value={oldStore.ISBN}
                                    defaultValue={oldStore.ISBN}
                                    onChange={(e)=>{
                                        oldStore.setISBN(e.target.value)
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                required
                                label="SKU"
                            >
                                <Input
                                    value={oldStore.SKU}
                                    onChange={(e) => oldStore.setSKU(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item initialValue={oldStore.inventory} label="库存数量">
                                <Input
                                    value={oldStore.inventory}
                                    onChange={(e=>{
                                        oldStore.setInventory(Number(e.target.value))
                                    })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                label="最少购买"
                            >
                                <Input
                                    value={oldStore.minimum}
                                    onChange={(e) => oldStore.setMinimum(Number(e.target.value))}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item label="商品销量">
                                <Input
                                    value={oldStore.salesCount}
                                    onChange={(e=>{
                                        oldStore.setSalesCount(Number(e.target.value))
                                    })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        valuePropName="checked"
                        style={{
                            marginBottom: 0
                        }}
                        >
                        <Checkbox checked={oldStore.inventoryTracking} onChange={(e)=>{
                            oldStore.setInventoryTracking(e.target.checked)
                        }}>开启库存追踪</Checkbox>
                    </Form.Item>
                    <Form.Item
                        valuePropName="checked"
                    >
                        <Checkbox
                        checked={oldStore.continueSell}
                        onChange={(e)=>{
                            oldStore.setContinueSell(e.target.checked)
                        }}
                        
                        >缺货后继续销售
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
    } 
}
`