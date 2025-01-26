import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Checkbox, Col, DatePicker, Form, InputNumber, InputNumberProps, Row, Tooltip, Typography } from "antd"
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components"
import dayjs from "dayjs";
import oldStore from "@/store/product/oldStore";
import cookie from 'react-cookies';


const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

const priceOnChange: InputNumberProps['onChange'] = (value) => {
    oldStore.setPrice(value==null?0:value);
};
const originPriceOnChange: InputNumberProps['onChange'] = (value) => {
    oldStore.setOriginPrice(value==null?0:value);
};
const costPriceOnChange: InputNumberProps['onChange'] = (value) => {
    oldStore.setCostPrice(value==null?0:value);
};

const { Text } = Typography;

const { RangePicker } = DatePicker;

function PriceOrTransactionCardEdit() {

    const [Time,setTime] = useState<any>([])
    useEffect(()=>{
        setTime([oldStore.startTime || null,oldStore.endTime || null])
    },[oldStore.productId])

    return (
        <Scoped>
            <Card title='价格/交易'>
                <Form layout="vertical">
                    <Row>
                        <Col span={11}>
                            <Form.Item 
                            label={
                                <>
                                    特价
                                    <Tooltip title="当商品参与各类促销活动时的价格">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } 
                            className="price-item">
                                <InputNumber<number>
                                     prefix={cookie.load("symbolLeft")}
                                     defaultValue={1000}
                                     value={oldStore.originPrice}
                                     // defaultValue={oldStore.originPrice}
                                     formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                     parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                     onChange={originPriceOnChange}
                                     className="ant-input"
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item label={
                                <>
                                    特价时间（{cookie.load("timeZone").time_zone_label}）
                                    <Tooltip title="特价活动时间">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } className="price-item">
                                <RangePicker value={Time || []} showTime onOk={(value)=>{
                                    if(value[0]){
                                        let startTime = value[0].tz(cookie.load("timeZone").time_zone_name.replace(/^"|"$/g, ''),true).unix()
                                        oldStore.setStartTime(dayjs.unix(startTime).format("YYYY-MM-DD HH:mm:ss"))
                                    }
                                    if(value[1]){
                                        let endTime = value[1].tz(cookie.load("timeZone").time_zone_name.replace(/^"|"$/g, ''),true).unix()
                                        oldStore.setEndTime(dayjs.unix(endTime).format("YYYY-MM-DD HH:mm:ss"))
                                    }
                                    setTime(value)
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>
                                        
                    <Row>
                        <Col span={11}>
                            <Form.Item label={
                                <>
                                    原价
                                    <Tooltip title={<>
                                        请输入一个高于当前价格的数值显示降价。降价前的价格通常会显示为划线价。（例如<Text className="color-FFFFFF" style={{textDecoration: "line-through"}}>$20.00</Text>）
                                    </>}>
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } className="price-item">
                                <InputNumber<number>
                                    prefix={cookie.load("symbolLeft")}
                                    defaultValue={1000}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                    onChange={priceOnChange}
                                    value={oldStore.price}
                                    className="ant-input"
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item label={
                                <>
                                    成本价
                                    <Tooltip title="成本价信息不会展示给消费者">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } className="price-item">
                                <InputNumber<number>
                                    prefix={cookie.load("symbolLeft")}
                                    defaultValue={oldStore.costPrice}
                                    value={oldStore.costPrice}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                    onChange={costPriceOnChange}
                                    className="ant-input"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5}>
                            <Form.Item label={
                                <>
                                    利润
                                    <Tooltip title="利润=售价 - 成本价">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } className="price-item">
                                <InputNumber
                                    prefix={cookie.load("symbolLeft")}
                                    defaultValue={'--'}
                                    className="ant-input"
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Form.Item label={
                                <>
                                    利润率
                                    <Tooltip title="利润率=利润 / 售价">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } className="price-item">
                                <InputNumber
                                    suffix="%"
                                    defaultValue={'--'}
                                    className="ant-input"
                                    disabled
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
                        <Checkbox checked={oldStore.needTax} onChange={(e)=>{
                            console.log(e.target.checked)
                            oldStore.setNeedTax(e.target.checked)
                        }}>是否需要税费</Checkbox>
                    </Form.Item>
                    <Form.Item
                        valuePropName="checked"
                    >
                        <Checkbox checked={oldStore.inquiryStatus=="1"?true:false} onChange={(e)=>{
                            oldStore.setInquiryStatus(e.target.checked?"1":"0")
                            // console.log(e.target.checked?"1":"0")
                        }}>是否允许询盘</Checkbox>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )
}
export default observer(PriceOrTransactionCardEdit)

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
                height:36px;
                display:flex;
                align-content: center;

            }
            &-number-input{
                position:relative;
                top: -1px;
            }
    }
}

`

