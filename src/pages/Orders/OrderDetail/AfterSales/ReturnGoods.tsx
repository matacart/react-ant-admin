import { Card, Checkbox, Col, Divider, Flex, Form, Row, Tooltip, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import orderReturnGoods from "@/store/order/orderReturnGoods";
import NumberInput from "@/components/Input/NumberInput";
import { toJS } from "mobx";
import MySelect from "@/components/Select/MySelect";
import styled from "styled-components";
import MyInput from "@/components/Input/MyInput";
import { CheckboxChangeEvent } from "antd/es/checkbox";

function ReturnGoods({groupIndex}:{groupIndex:number}) {

  const shippedInfo  = orderReturnGoods.shippedProductGroup[groupIndex]

  // const refundOptions = [
  //   {
  //       label:"尺寸太小",
  //       value:"SIZE_TOO_SMALL"
  //   },
  //   {
  //       label:"尺寸太大",
  //       value:"SIZE_TOO_LARGE"
  //   },
  //   {
  //       label:"客户改变了主意",
  //       value:"UNWANTED"
  //   },
  //   {
  //       label:"商品与描述不符",
  //       value:"NOT_AS_DESCRIBED"
  //   },
  //   {
  //       label:"收到了错误的商品",
  //       value:"WRONG_ITEM"
  //   },
  //   {
  //       label:"商品损坏或有缺陷",
  //       value:"DEFECTIVE"
  //   },
  //   {
  //       label:"款式问题",
  //       value:"STYLE"
  //   },
  //   {
  //       label:"颜色问题",
  //       value:"COLOR"
  //   },
  //   {
  //       label:"其它",
  //       value:"OTHER"
  //   },
  // ]

  const refundOptions = [
    {
        label:"损坏",
        value:"1"
    },
    {
        label:"有缺陷",
        value:"2"
    },
    {
        label:"错误的商品",
        value:"3"
    },
    {
        label:"其它",
        value:"0"
    },
  ]

  const returnOperation = [
    {
      label:"更换",
      value:"1"
    },
    {
      label:"退款",
      value:"2"
    },
    {
      label:"修理",
      value:"3"
    }
  ]

  useEffect(()=>{
    console.log(orderReturnGoods.shippedProductGroup[groupIndex])
  },[])

  return (
    <MyCard
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <div>
            <span className="font-w-500">{"已发货"}（{shippedInfo.shipment.shipped_quantity}）#{orderReturnGoods.orderInfo.order_sn}-F{groupIndex+1}</span>
          </div>
        </Flex>
      }
    >
    <Form>
        <div className="font-w-400">
          {shippedInfo.product?.map((item,index)=>{
            return(
              <div key={index} className="item">
                <Row>
                  <Col span={14}>
                    <Flex style={{paddingRight:"40px"}}>
                      <img src={item.product_image+"?x-oss-process=image/resize,w_200"} alt={item.product_name} style={{ width: "80px", height: "80px", marginRight: "20px" }} />
                      <Flex vertical align="flex-start" justify="flex-start" flex="1">
                        <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px" }} className="font-w-500">{item.product_name}</div>
                        <div style={{ fontSize: "14px", color: "#474F5E" }}>
                          {item.attributes?.map((item:any)=>item.product_option+" · "+item.product_option_values).join("/")}
                        </div>
                        <div style={{ fontSize: "14px", color: "#474F5E" }}>model:{item.product_model}</div>
                        
                      </Flex>
                    </Flex>
                  </Col>
                  <Col span={5}>
                    <div>
                      <span style={{ fontSize: "14px", color: "#474F5E" }}>US${item.product_price} X {item.quantity_shipped}</span>
                    </div>
                    <div style={{marginTop:"12px"}}>
                      <NumberInput style={{width:"120px"}} value={item.num} min={0} max={item.quantity_shipped} onChange={(value:number)=>{
                          const newShippedProductGroup = toJS(orderReturnGoods.shippedProductGroup)
                          newShippedProductGroup[groupIndex].product.forEach((product,index)=>{
                            if(product.id===item.id){
                              product.num=value??0
                            }
                          })
                          orderReturnGoods.setShippedProductGroup(newShippedProductGroup)
                      }} />
                    </div>
                  </Col>
                  <Col span={5}>
                    <Flex justify="end" style={{height:"100%"}}>
                      <span style={{ fontSize: "14px", color: "#474F5E" }}>US${(parseInt(item.product_price+"")*parseInt(item.num+"")).toFixed(4)}</span>
                    </Flex>
                  </Col>
                </Row>
                {item.num>0 && <Flex gap={20} vertical>
                  <div style={{marginTop:"12px",flex:1}}>
                    <div className="font-w-500" style={{marginBottom:"8px"}}>退货原因（可选）</div>
                    <Flex style={{width:"100%"}} gap={12}>
                      <MySelect style={{width:"40%"}} placeholder="请选择退货原因" options={refundOptions} onChange={(value:string)=>{
                        const newShippedProductGroup = toJS(orderReturnGoods.shippedProductGroup)
                        newShippedProductGroup[groupIndex].product.forEach((product,index)=>{
                          if(product.id===item.id){
                            product.returnReasonId=value??""
                          }
                        })
                        orderReturnGoods.setShippedProductGroup(newShippedProductGroup)
                      }} />
                      {item.returnReasonId == "4" && <MyInput style={{width:"40%"}} placeholder="添加原因" onChange={(e:any)=>{
                        orderReturnGoods.updateReturnReason(groupIndex,item.id,e.target.value)
                      }} />}
                    </Flex>
                  </div>
                  <div style={{marginTop:"12px",flex:1}}>
                    <div className="font-w-500" style={{marginBottom:"8px"}}>退货操作（可选）</div>
                    <MySelect style={{width:"40%"}} placeholder="请选择退货操作" options={returnOperation} onChange={(value:string)=>{
                      const newShippedProductGroup = toJS(orderReturnGoods.shippedProductGroup)
                      newShippedProductGroup[groupIndex].product.forEach((product,index)=>{
                        if(product.id===item.id){
                          product.returnActionId=value??""
                        }
                      })
                      orderReturnGoods.setShippedProductGroup(newShippedProductGroup)
                    }} />
                  </div>
                  <div style={{width:"120px",marginTop:"0px"}}>
                    <Checkbox onChange={(e:CheckboxChangeEvent)=>{
                      const newShippedProductGroup = toJS(orderReturnGoods.shippedProductGroup)
                      newShippedProductGroup[groupIndex].product.forEach((product,index)=>{
                        if(product.id===item.id){
                          product.opened=e.target.checked?1:0
                        }
                      })
                      orderReturnGoods.setShippedProductGroup(newShippedProductGroup)
                    }}>包装是否打开</Checkbox>
                  </div>
                </Flex>}
              </div>
            )
          })}
        </div>
      </Form>
      {/* <Divider /> */}
    </MyCard>
  );
}

const MyCard = styled(Card)`
  .item{
    border-bottom: 1px solid #EEF1F6;
    padding: 20px 0;
    &:first-child{
      padding-top: 0;
    }
  }

`;

export default observer(ReturnGoods);