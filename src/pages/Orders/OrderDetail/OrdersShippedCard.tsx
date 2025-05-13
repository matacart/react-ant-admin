import { Badge, Button, Card, Col, Divider, Flex, Form, Input, message, Row, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useIntl } from "@umijs/max";
import { CopyIcon, SuccessSecondIcon } from "@/components/Icons/Icons";
import PrimaryButton from "@/components/Button/PrimaryButton";
import copy from "copy-to-clipboard";
import order from "@/store/order/order";
import { styled } from 'styled-components';
import MyDropdown from "@/components/Dropdown/MyDropdown";
import PackageTrackingModal from "./PackageTrackingModal";



const { TextArea } = Input;

function OrdersShippedCard() {

  const intl = useIntl();
  

  return (
    <Card
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <SuccessSecondIcon className="font-28" />
            <span className="font-w-500">{"已发货"}（{order.productInfo.length || ""}）#{order.orderInfo.order_sn}-F1</span>
            <Tooltip title="复制">
                <span style={{cursor:"pointer"}} onClick={()=>{
                  copy(order.orderInfo.order_sn+`-F1`)
                  message.success('复制成功')
                }}><CopyIcon className='color-7A8499 cursor-pointer' /></span>
            </Tooltip>
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
                        <div onClick={()=>{}}>打印出货单</div>
                    )
                },
                {
                    key: "2", label: (
                        <div className="color-F86140" onClick={()=>{}}>取消发货</div>
                    )
                },
              ]
            }} />
        </Flex>
      }
    >
    <Form>
        <div className="font-w-400">
          <div style={{ fontSize: "14px", color: "#7A8499",marginBottom:"4px" }} >{intl.formatMessage({ id: "order.detail.location" })}</div>
          <div style={{ fontSize: "14px", color: "#242833",marginBottom:"16px" }} >{intl.formatMessage({ id: "order.detail.defaultlocation" })}</div>
          <div style={{ fontSize: "14px", color: "#7A8499",marginBottom:"4px" }} >{"已发货"}</div>
          <div style={{ fontSize: "14px", color: "#242833",marginBottom:"20px" }} >{"2025-05-12"}</div>
          {/* <p style={{ fontSize: "14px", color: "#7A8499" }}>{orderStore.oldOrder?.delivery_status_id}</p> */}
          {/* <p style={{ fontSize: "14px", color: "#242833" }}>{orderStore.oldOrder?.delivery_time}</p> */}
          {/* 处理 productinfo 为 undefined 的情况 */}
          {order.productInfo.map((item,index)=>{
            return(
              <Row key={index}>
                <Col span={14}>
                  <Flex style={{paddingRight:"40px"}}>
                    <img src={item.product_image} alt={item.product_name} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                    <Flex vertical align="flex-start" justify="flex-start">
                      <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all" }} className="font-w-500">{item.product_name}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>null</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>sku:{null}</div>
                    </Flex>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>US${item.product_price}X {item.product_quantity}</span>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex justify="end" style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>US${item.final_price}</span>
                  </Flex>
                </Col>
              </Row>
            )
          })}
        </div>
      </Form>
      <Divider />
      <Form>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "14px", color: "#7A8499" }}>{intl.formatMessage({ id: "order.detail.tracking" })}: 无</div>
          <PackageTrackingModal />
        </div>
      </Form>
    </Card>
  );
}

export default observer(OrdersShippedCard);