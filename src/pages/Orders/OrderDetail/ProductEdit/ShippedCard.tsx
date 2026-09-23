import { Card, Col, Divider, Flex, Form, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import orderProductEdit from "@/store/order/orderProductEdit";

function OrdersShippedCard({index}:{index:number}) {

  const shippedInfo  = orderProductEdit.shippedProductGroup[index]

  useEffect(()=>{
  },[])


  return (
    <Card
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <span className="font-w-500">{"已发货"}（{shippedInfo.shipment.shipped_quantity}）#{orderProductEdit.orderInfo.order_sn}-F{index+1}</span>
          </Flex>
        </Flex>
      }
    >
      <Form>
        <div className="font-w-400">
            <Row style={{marginBottom:"20px"}}>
                <Col span={14}>商品</Col>
                <Col span={5}>数量</Col>
                <Col span={5} style={{textAlign:"right"}}>合计</Col>
            </Row>
          {/* 处理 productinfo 为 undefined 的情况 */}
          {shippedInfo.product?.map((item:any,index:number)=>{
            return(
              <Row key={index} style={{ marginBottom: "20px" }}>
                <Col span={14}>
                  <Flex style={{paddingRight:"40px"}}>
                    <img src={item.product_image ? item.product_image+"?x-oss-process=image/resize,w_200" : "/icons/ProductCoverBlank.svg?x-oss-process=image/resize,w_200"} alt={item.product_name} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                    <Flex vertical align="flex-start" justify="flex-start">
                      <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px" }} className="font-w-500">{item.product_name}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                        item.attributes?.map((item:any)=>item.product_option+" · "+item.product_option_values).join("/")
                      }</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>model : {item.product_model}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>US$ {parseInt(item.product_price+"").toFixed(4)}</div>
                    </Flex>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>{item.quantity_shipped}</span>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex justify="end" style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>US${(parseInt(item.product_price+"")*parseInt(item.quantity_shipped+"")).toFixed(4)}</span>
                  </Flex>
                </Col>
              </Row>
            )
          })}
        </div>
      </Form>
      <Divider />
      <div style={{textAlign:"right"}} className="color-7A8499">无法编辑已发货的商品</div>
    </Card>
  );
}

export default observer(OrdersShippedCard);