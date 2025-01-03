import { QuestionCircleOutlined } from "@ant-design/icons"
import { Card, Checkbox, Col, DatePicker, Form, InputNumber, InputNumberProps, Row, Tooltip } from "antd"
import styled from "styled-components"
import newStore from "@/store/newStore";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
// 原价
const priceOnChange: InputNumberProps['onChange'] = (value) => {
    newStore.setPrice(value==null?0:value);
    newStore.setEditStatus(true)
};
const originPriceOnChange: InputNumberProps['onChange'] = (value) => {
    newStore.setOriginPrice(value==null?0:value);
    newStore.setEditStatus(true)
};
const costPriceOnChange: InputNumberProps['onChange'] = (value) => {
    newStore.setCostPrice(value==null?0:value);
    newStore.setEditStatus(true)
};

function FormatDate(time:string){
    const Time = new Date(parseInt(time)*1000)
    return Time.getFullYear()+"-"+(Time.getMonth()+1)+"-"+Time.getDate()+" "+Time.getHours()+":"+Time.getMinutes()+":"+Time.getSeconds()
}

const start = (newStore.startTime??="")==""?null:dayjs(FormatDate(newStore.startTime))
const end = (newStore.endTime??="")==""?null:dayjs(FormatDate(newStore.endTime))



export default function PriceOrTransactionCard() {
    return (
        <Scoped>
            <Card title='价格/交易'>
                <Form layout="vertical">
                    <Row>
                        <Col span={11}>
                            <Form.Item 
                            required
                            label={
                                <>
                                    特价特价
                                    <Tooltip title="当商品参与各类促销活动时，使用此价格进行结账，具体以实际活动售价为准">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } name='originPrice' className="price-item">
                                <InputNumber<number>
                                    prefix="US$"
                                    defaultValue={1000}
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
                                    生效时间
                                    <Tooltip title="特价活动时间">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                            } className="price-item">
                                <RangePicker defaultValue={[start,end]} showTime onOk={(value)=>{
                                    if( value[0]){
                                        let startTime = value[0].year()+"-"+(value[0].month())+1+"-"+value[0].date()+" "+value[0].hour()+":"+value[0].minute()+":"+value[0].second()
                                        newStore.setStartTime(startTime)
                                    }
                                    if( value[1]){
                                        let endTime = value[1].year()+"-"+(value[1].month())+1+"-"+value[1].date()+" "+value[1].hour()+":"+value[1].minute()+":"+value[1].second()
                                        newStore.setEndTime(endTime)
                                    }
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label={
                                <>
                                    原价
                                    <Tooltip title="请输入一个高于当前价格的数值显示降价。降价前的价格通常会显示为划线价。（例如$20.00）">
                                        <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                            <QuestionCircleOutlined />
                                        </span>
                                    </Tooltip>
                                </>
                                
                            } name='price' className="price-item">
                                <InputNumber<number>
                                    prefix="US$"
                                    defaultValue={newStore.price}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                                    onChange={priceOnChange}
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
                            } name='costPrice' className="price-item">
                                <InputNumber<number>
                                    prefix="US$"
                                    defaultValue={newStore.costPrice}
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
                            } name='price' className="price-item">
                                <InputNumber
                                    prefix="US$"
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
                            } name='price' className="price-item">
                                <InputNumber
                                    suffix="%"
                                    defaultValue={'--'}
                                    className="ant-input"
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Form.Item
                        valuePropName="checked"
                        wrapperCol={{
                            span: 5,
                        }}
                        name="needTaxes">
                        <Checkbox onChange={(e)=>{
                            newStore.setNeedTax(e.target.checked)
                            newStore.setEditStatus(true)
                        }}>是否需要税费</Checkbox>
                    </Form.Item> */}
                    <Form.Item
                        valuePropName="checked"
                        style={{
                            marginBottom: 0
                        }}
                    >
                        <Checkbox onChange={(e)=>{
                            console.log(e.target.checked)
                            newStore.setNeedTax(e.target.checked)
                        }}>是否需要税费</Checkbox>
                    </Form.Item>
                    <Form.Item
                        valuePropName="checked"
                    >
                        <Checkbox defaultChecked={newStore.inquiryStatus=="1"?true:false} onChange={(e)=>{
                            newStore.setInquiryStatus(e.target.checked?"1":"0")
                        }}>是否允许询盘</Checkbox>
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

