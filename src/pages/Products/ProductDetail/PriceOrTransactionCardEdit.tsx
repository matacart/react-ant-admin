import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Checkbox, Col, DatePicker, Form, InputNumber, InputNumberProps, Row, Tooltip, Typography } from "antd"
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components"
import dayjs from "dayjs";
import cookie from 'react-cookies';
import { useForm } from "antd/es/form/Form";
import product from "@/store/product/product";


const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

const { Text } = Typography;

const { RangePicker } = DatePicker;

function PriceOrTransactionCardEdit() {

    const [Time,setTime] = useState<any>([])

    const [form] = useForm();

    useEffect(()=>{
        // product.productInfo.start_time
        form.setFieldsValue({       
            specialprice:parseInt(product.productInfo.specialprice || "0"),
            costPrice:parseInt(product.productInfo.cost_price || "0"),
            price:parseInt(product.productInfo.price || "0"),
            needTax:product.productInfo.needTax == 1?true:false,
            inquiryStatus:product.productInfo.inquiry_status == 1?true:false,
            
            specialTime:[
                product.productInfo.start_time!==""?dayjs(product.productInfo.start_time):"",
                product.productInfo.end_time!==""?dayjs(product.productInfo.end_time):""
            ]
        })
    },[])

    return (
        <Scoped>
            <Card title='价格/交易'>
                <Form form={form} layout="vertical">
                    <Row>
                        <Col span={11}>
                            <Form.Item
                                name="specialprice"
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
                                    min={0}
                                    prefix={cookie.load("symbolLeft")}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                    className="ant-input"
                                    onChange={(value)=>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            specialprice:value?.toString() || ""
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item name="specialTime" label={
                                <>
                                    特价时间（{cookie.load("timeZone")?.time_zone_label??"UTC+08:00"}）
                                    <Tooltip title="特价活动时间">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } className="price-item">
                                <RangePicker showTime 
                                    onChange={(value)=>{
                                    let timeZone = "Asia/Shanghai"
                                    if(!cookie.load("timeZone") && cookie.load("timeZone")!=="undefined"){
                                        timeZone = cookie.load("timeZone").time_zone_name.replace(/^"|"$/g, '')
                                    }
                                    // 处理清空操作
                                    if (!value || value.length < 2) {
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            start_time: "",
                                            end_time: ""
                                        });
                                        return;
                                    }
                                    const startTime = value[0]?.tz(timeZone,true).unix()
                                    const endTime = value[1]?.tz(timeZone,true).unix()
                                    // console.log(startTime,endTime)
                                    product.setProductInfo({
                                        ...product.productInfo,
                                        start_time: dayjs.unix(startTime).format("YYYY-MM-DD HH:mm:ss"),
                                        end_time: dayjs.unix(endTime).format("YYYY-MM-DD HH:mm:ss")
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>
                                        
                    <Row>
                        <Col span={11}>
                            <Form.Item name="price" label={
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
                                    className="ant-input"
                                    min={0}
                                    prefix={cookie.load("symbolLeft")}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                    onChange={(value)=>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            price:value?.toString() || ""
                                        })
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col offset={2} span={11}>
                            <Form.Item name="costPrice" label={
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
                                    className="ant-input"
                                    min={0}
                                    prefix={cookie.load("symbolLeft")}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                    onChange={(value)=>{
                                        product.setProductInfo({
                                            ...product.productInfo,
                                            cost_price:value?.toString() || ""
                                        })
                                    }}
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
                        name="needTax"
                        valuePropName="checked"
                        style={{
                            marginBottom: 0
                        }}
                    >
                        <Checkbox  onChange={(e)=>{
                            product.setProductInfo({
                                ...product.productInfo,
                                needTax:e.target.checked?1:0
                            })
                        }}>是否需要税费</Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="inquiryStatus"
                        valuePropName="checked"
                    >
                        <Checkbox onChange={(e)=>{
                            product.setProductInfo({
                                ...product.productInfo,
                                inquiry_status:e.target.checked?1:0
                            })
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

