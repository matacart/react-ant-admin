import SimpleCard from "@/components/Card/SimpleCard";
import { PendingSecondIcon } from "@/components/Icons/Icons";
import NumberInput from "@/components/Input/NumberInput";
import orderManualDelivery from "@/store/order/orderManualDelivery";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Form, Row, Col, Flex, Card } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import styled from "styled-components";

function UndispatchedGoods(){

    useEffect(()=>{

    },[])

    return (
        <Scoped>
            <SimpleCard title={<Flex justify="space-between">
                <Flex align="center" gap={10}>
                    <PendingSecondIcon className="font-28" />
                    <span className="font-w-500">未发货</span>
                </Flex>
                <Flex gap={6}>
                    <EnvironmentOutlined className="color-7A8499" />
                    <div className="color-242833">{"默认地点"}</div>
                </Flex>
            </Flex>} content={<div>
                <Form className="form">
                    {orderManualDelivery.fulfillmentItem?.fulfillmentItemList.map((item,index)=>{
                        return <Flex key={index} className="form-item-container">
                            <Flex style={{paddingRight:"10px"}}>
                                <img src={item.firstImage?item.firstImage+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_200"} alt={item.title} style={{ width: "80px", height: "80px", marginRight: "10px" }} />
                            </Flex>
                            <Flex style={{flex:1}} vertical>
                                <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all" }} className="font-w-500">{item.title}</div>
                                <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                                    item.attributes?.map((item:any)=>item.attributeValue??"").join("/")
                                }</div>
                                <div style={{ fontSize: "14px", color: "#474F5E" }}>sku:{item.productSku}</div>
                            </Flex>
                            <Flex justify="end" vertical style={{height:"100%"}}>
                                <NumberInput style={{width:"128px"}} min={0} max={item.productNum} value={1} onChange={(value:number)=>{
                                    // const newDeliveryProductList = toJS(orderDelivery.deliveryProductList)
                                    // orderDelivery.setDeliveryProductList(newDeliveryProductList.map((product,index)=>{
                                    //     if(product.id===item.id){
                                    //         product.quantity=value
                                    //     }
                                    //     return product
                                    // }))
                                }} />
                                <div className="color-242833" style={{textAlign:"right",marginTop:"8px"}}>最大数量为{item.productNum}</div>
                            </Flex>
                        </Flex>
                    })}
                </Form>
            </div>} />
        </Scoped>
    )
}

export default observer(UndispatchedGoods)

const Scoped = styled.div`
    .form{
        .form-item-container{
            border-bottom: 1px solid #EEF1F6;
            padding: 20px 0;
        }
        .form-item-container:first-child{
            padding-top: 0;
        }
    }
`
