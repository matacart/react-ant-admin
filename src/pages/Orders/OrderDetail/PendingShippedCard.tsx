import { Badge, Button, Card, Col, Divider, Flex, Form, Input, message, Row, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { PendingSecondIcon, RiseIcon, SuccessSecondIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { history } from '@umijs/max';
import order from "@/store/order/order";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyButton from "@/components/Button/MyButton";
import SplitPackage from "./Modal/SplitPackage";
import SuspendDelivery from "./Modal/SuspendDelivery";


function PendingShippedCard({groupIndex}:{groupIndex:number}) {

  const shippedInfo  = order.remainingProductGroup[groupIndex]

  return (
    <Card
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <PendingSecondIcon className="font-28" />
            <span className="font-w-500">{"未发货"}（{shippedInfo.shipment.remaining_quantity_count}）</span>
          </Flex>
          <MyDropdown
            tiggerEle={
              <div className="cursor-pointer"><EllipsisOutlined /></div>
            }
            placement="bottomRight"
            menu={{
              items:[
                {
                    key: "1", label: (
                        <div onClick={()=>{}}>更改地点</div>
                    )
                },
                {
                  key: "2", label: (
                    <SuspendDelivery groupIndex={groupIndex} />
                  )
                },
                {
                  key: "3", label: (
                    <SplitPackage groupIndex={groupIndex} />
                  )
                },
              ]
            }} />
        </Flex>
      }
    >
      <Form>
        <div className="font-w-400">
          <div style={{ fontSize: "14px", color: "#7A8499",marginBottom:"4px" }} >{"地点"}</div>
          <div style={{ fontSize: "14px", color: "#242833",marginBottom:"20px" }} >{"默认地点"}</div>
          {/* 处理 productinfo 为 undefined 的情况 */}
          {shippedInfo.product.map((item:any,index:number)=>{
            return(
              <Row key={index} style={{marginBottom:"20px"}}>
                <Col span={14}>
                  <Flex style={{paddingRight:"40px"}}>
                    <img src={item.product_image?item.product_image+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg"} alt={item.product_name} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                    <Flex vertical align="flex-start" justify="flex-start">
                      <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px"}} className="font-w-500">{item.product_name}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                        item.attributes?.map((item:any)=>item.product_option+" · "+item.product_option_values).join("/")
                      }</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>model : {item.product_model}</div>
                    </Flex>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>US${item.product_price}X {item.remaining_quantity}</span>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex justify="end" style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>US${(parseInt(item.product_price+"")*parseInt(item.remaining_quantity+"")).toFixed(4)}</span>
                  </Flex>
                </Col>
              </Row>
            )
          })}
        </div>
      </Form>
      <Divider />
      <Form>
        <Flex justify="flex-end" gap={12}>
            <MyDropdown 
            tiggerEle={
                <MyButton text={"承运商发货"} style={{height:"36px"}} icon={<UnfoldIcon className="font-20" />} iconPosition={"end"} />
            }
            menu={{
                items:[
                    {
                        key: "1", label: (
                            <div onClick={() => { } } className="">使用Shipper迅朋物流发货</div>
                        )
                    }
                ]
            }} />
            <PrimaryButton text={"标记为已发货"} onClick={()=>history.push(`/orders/${order.orderInfo.order_id}/delivery`)}  />
        </Flex>
      </Form>
    </Card>
  );
}

export default observer(PendingShippedCard);