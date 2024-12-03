import newStore from "@/store/newStore";
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Checkbox, Col, Form, Input, InputNumber, InputNumberProps, InputProps, Row, Tooltip } from "antd"
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components"


// const onChangeSKU = (value) => {
//     console.log('changed', value);
//     // newStore.setSKU(value)
// };

// const onChangeISBN = (value:string) => {
//     console.log('changed', value);
// };
const onChange = (value:string) => {
    console.log('changed', value);
};



function StockCard() {
    useEffect(()=>{
        // console.log(newStore)
    })
    return (
        <Scoped>
            <Card title='库存' >
                <Form layout="vertical">
                    <Row>
                        <Col span={11}>
                            <Form.Item label="模型"
                                // rules={[{ required: true, message: 'Please input model!' }]}
                                validateStatus={newStore.validate.model as any}
                                help={newStore.validate.model == "success"?"":<span style={{ color: '#F86140' }}>请输入商品模型</span>}
                                name='model' required initialValue={newStore.model}>
                                <Input
                                    onChange={(e)=>{
                                        newStore.setModel(e.target.value)
                                        newStore.validate.model = "success"
                                        newStore.setEditStatus(true)
                                    }}
                                    value={newStore.model}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item label="条码(ISBN、UPC、GTIN等)"
                                name='ISBN'>
                                <Input
                                    defaultValue={newStore.ISBN}
                                    onChange={(e)=>{
                                        newStore.setISBN(e.target.value)
                                        newStore.setEditStatus(true)
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item
                            label="SKU"
                            name='SKU'
                                >
                                <Input
                                    onChange={(e)=>{
                                        newStore.setSKU(e.target.value)
                                        newStore.setEditStatus(true)
                                    }}
                                    value={newStore.SKU}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item label="库存数量"
                                name='stockQuantity' initialValue={newStore.inventory}>
                                <Input
                                    type='number'
                                    onChange={(e)=>{
                                        newStore.setInventory(Number(e.target.value))
                                        newStore.setEditStatus(true)
                                    }}
                                    value={newStore.inventory}
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
                        >
                        <Checkbox onChange={(e)=>{
                            console.log(e.target.checked)
                            newStore.setInventoryTracking(e.target.checked)
                        }}>开启库存追踪</Checkbox>
                    </Form.Item>
                    <Form.Item
                        valuePropName="checked"
                        name="continueSelling">
                        <Checkbox
                        onChange={(e)=>{
                            newStore.setContinueSell(e.target.checked)
                        }}
                        
                        >缺货后继续销售
                            <Tooltip title="此设置适用MataCart后台管理">
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
    } 
}
`