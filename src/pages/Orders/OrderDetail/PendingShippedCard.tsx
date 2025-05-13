import { Badge, Button, Card, Col, Divider, Flex, Form, Input, message, Row, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { CopyIcon, DownIcon, PendingSecondIcon, RiseIcon, SuccessSecondIcon, UnfoldIcon } from "@/components/Icons/Icons";
import copy from "copy-to-clipboard";
import order from "@/store/order/order";
import { styled } from 'styled-components';
import MyDropdown from "@/components/Dropdown/MyDropdown";
import PackageTrackingModal from "./PackageTrackingModal";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyButton from "@/components/Button/MyButton";


function PendingShippedCard() {

  return (
    <Card
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <PendingSecondIcon className="font-28" />
            <span className="font-w-500">{"未发货"}（{order.productInfo.length || ""}）</span>
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
                        <div onClick={()=>{}}>暂停发货</div>
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
            <PrimaryButton text={"标记为已发货"}  />
        </Flex>
      </Form>
    </Card>
  );
}

export default observer(PendingShippedCard);