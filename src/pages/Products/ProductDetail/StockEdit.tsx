import newStore from "@/store/newStore";
import oldStore from "@/store/oldStore";
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Checkbox, Col, Form, Input, InputNumber, InputNumberProps, InputProps, Row, Tooltip } from "antd"
import e from "express";
import styled from "styled-components"


const onChange: InputProps['onChange'] = (value) => {
    console.log('changed', value);
    // 
    // newStore.setContinueSell(e.target.value)
};


export default function StockEdit() {
    return (
        <Scoped>
            <Card title='库存' >
                <Form layout="vertical">
                    <Row>
                        <Col span={11}>
                            <Form.Item
                            required
                            label="SKU"
                            initialValue={oldStore.SKU}
                                name='SKU'>
                                <Input
                                    onChange={(e) => oldStore.setSKU(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item label="条码(ISBN、UPC、GTIN等)"
                                name='ISBN' initialValue={oldStore.ISBN}>
                                <Input
                                    onChange={(e)=>oldStore.setISBN(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item initialValue={oldStore.inventory} label="库存数量"
                                name='quantity'>
                                <Input
                                    onChange={(e=>{
                                        oldStore.setInventory(Number(e.target.value))
                                    })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        valuePropName="checked"
                        name="enableInventoryTracking"
                        style={{
                            marginBottom: 0
                        }}
                        initialValue={oldStore.inventoryTracking}
                        >
                        <Checkbox onChange={(e)=>{
                            oldStore.setInventoryTracking(e.target.checked)
                        }}>开启库存追踪</Checkbox>
                    </Form.Item>
                    <Form.Item
                        valuePropName="checked"
                        initialValue={oldStore.continueSell}
                        name="continueSelling">
                        <Checkbox
                        onChange={(e)=>{
                            oldStore.setContinueSell(e.target.checked)
                        }}
                        
                        >缺货后继续销售
                            <Tooltip title="这里是关于用户名的额外信息">
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