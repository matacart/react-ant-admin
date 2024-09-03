import newStore from "@/store/newStore";
import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Checkbox, Col, Form, Input, InputNumber, InputNumberProps, InputProps, Row, Tooltip } from "antd"
import styled from "styled-components"


const onChange: InputProps['onChange'] = (value) => {
    console.log('changed', value);
};


export default function StockCard() {
    return (
        <Scoped>
            <Card title='库存' >
                <Form layout="vertical">
                    <Row>
                        <Col span={11}>
                            <Form.Item
                            required
                            label="SKU"
                                name='SKU'>
                                <Input
                                    onChange={onChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item label="条码(ISBN、UPC、GTIN等)"
                                name='SKU'>
                                <Input
                                    onChange={onChange}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="库存数量"
                                name='stockQuantity'>
                                <Input
                                    onChange={onChange}
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
                        <Checkbox>开启库存追踪</Checkbox>
                    </Form.Item>
                    <Form.Item
                        valuePropName="checked"
                        name="continueSelling">
                        <Checkbox
                        onChange={(e)=>{
                            newStore.setContinueSell(e.target.value)
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