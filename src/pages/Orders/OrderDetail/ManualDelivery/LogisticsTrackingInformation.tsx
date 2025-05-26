import SimpleCard from "@/components/Card/SimpleCard";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import orderDelivery from "@/store/order/orderDelivery";
import { Form, Row, Col, Flex, Card } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

function LogisticsTrackingInformation({form}:{form:any}){

    const [logistics,setLogistics] = useState<any[]>([])

    const [logisticsValue,setLogisticsValue] = useState('0');

    useEffect(()=>{
        const newLogistics = JSON.parse(localStorage["MC_DATA_SHIPPING_COURIER"] || "[]").map((item:any)=>{
            return{
                value:item.id,
                label:item.courier_name
            }
        })

        setLogistics([...newLogistics,{
            value:'0',
            label:"其它"
        }])
    },[])

    return (
        <div>
            <SimpleCard title={<Flex justify="space-between">
                <div className="font-w-500">物流和跟踪信息</div>
            </Flex>} content={<div>
                <ScopedForm layout="vertical" form={form}>
                    <>
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="运单号">
                                    <MyInput style={{height:"36px"}} placeholder="运单号" suffix={<div className="color-356DFF">匹配</div>} onChange={(e:any)=>{
                                        orderDelivery.setDelivery({
                                            ...orderDelivery.delivery,
                                            shippingNo:e.target.value,
                                        })
                                    }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="物流服务商">
                                    <MySelect placeholder="请填写快递公司名称" showSearch 
                                    value={logisticsValue}
                                    options={logistics} style={{height:"36px"}} onChange={(value:any)=>{
                                        setLogisticsValue(value)
                                        orderDelivery.setDelivery({
                                            ...orderDelivery.delivery,
                                            shippingId:value,
                                        })
                                    }} />
                                    {logisticsValue !== "0" && <div style={{marginTop:"8px"}} className="font-12 color-7A8499">没有找到服务商？<span className="color-356DFF cursor-pointer" onClick={()=>{
                                        setLogisticsValue("0")
                                    }}>选择其他</span></div>}
                                </Form.Item>
                            </Col>
                        </Row>
                        {logisticsValue == "0" && <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="公司名称" name="shippingName">
                                    <MyInput style={{height:"36px"}} placeholder="请输入公司名称" onChange={(e:any)=>{
                                        orderDelivery.setDelivery({
                                            ...orderDelivery.delivery,
                                            shippingName:e.target.value,
                                        })
                                    }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="货件追踪链接URL" name="shipTrackUrl" rules={[
                                    {
                                        message: '请输入正确的网页链接格式',
                                        pattern: /^https?:\/\/.+/
                                    }
                                ]}>
                                    <MyInput style={{height:"36px"}} placeholder="http://" onChange={(e:any)=>{
                                        orderDelivery.setDelivery({
                                            ...orderDelivery.delivery,
                                            shippingUrl:e.target.value,
                                        })
                                    }} />
                                </Form.Item>
                            </Col>
                        </Row>}
                    </>
                </ScopedForm>
            </div>} />
        </div>
    )
}

const ScopedForm = styled(Form)`
    /* .ant-form-item{
        margin-bottom: 0;
    }
    .form-item{
        margin-bottom: 20px;
    } */
`

export default LogisticsTrackingInformation;