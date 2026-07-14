import { App, Card, Col, Flex, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useIntl } from "@umijs/max";
import { PendingSecondIcon } from "@/components/Icons/Icons";
import abandonedOrder from "@/store/order/abandonedOrder/abandonedOrder";
import styled from "styled-components";


function Settlement() {
  
  const { message } = App.useApp();

  const intl = useIntl();

  useEffect(()=>{
  },[])


  return (
    <MyCard
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <PendingSecondIcon className="font-28" />
            <span className="font-w-500">{"待结算"}（）</span>
          </Flex>
        </Flex>
      }
    >
      <Flex gap={16} vertical>
      {abandonedOrder.abandonedOrderData?.orderProductItems.map((item, index) => (
        <Row key={index} className="product-item">
          <Col span={14}>
            <Flex style={{paddingRight:"40px"}}>
              <img src={item.images[0]?item.images[0]+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg"} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
              <Flex vertical align="flex-start" justify="flex-start">
                <div style={{ fontSize: "14px", color: "#356DFF",wordBreak:"break-all",marginBottom:"4px"}} className="font-w-500">{item.title}</div>
                <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                  item.attributes?.map((item:any)=>item.attributeName+" · "+item.attributeValue).join("/")
                }</div>
              </Flex>
            </Flex>
          </Col>
          <Col span={5}>
            <Flex style={{height:"100%"}}>
              <span style={{ fontSize: "14px", color: "#474F5E" }}>US${item.productPrice} X {item.productSource}</span>
            </Flex>
          </Col>
          <Col span={5}>
            <Flex justify="end" style={{height:"100%"}}>
              <span style={{ fontSize: "14px", color: "#474F5E" }}>US${item.finalPrice}</span>
            </Flex>
          </Col>
        </Row>
      ))}
      </Flex>
    </MyCard>
  );
}

const MyCard = styled(Card)`
`;

export default observer(Settlement);