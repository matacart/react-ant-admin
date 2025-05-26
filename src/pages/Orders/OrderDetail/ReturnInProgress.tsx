import { Badge, Card, Col, Divider, Flex, Form, Input, message, Row, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ReturnSecondIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { history } from '@umijs/max';
import order from "@/store/order/order";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultButton from "@/components/Button/DefaultButton";
import StatementModalSecondary from "@/components/Modal/StatementModalSecondary";
import PackageTrackingSecondModal from "./Modal/PackageTrackingSecondModal";


function ReturnInProgress({groupIndex}:{groupIndex:number}) {

  const returnInfo  = order.returnInProductsGroup[groupIndex]

  return (
    <Card
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <ReturnSecondIcon className="font-28" />
            <span className="font-w-500">{"退货中"}（{returnInfo.return.returned_quantity}）</span>
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
                      <PackageTrackingSecondModal shipping={returnInfo} />
                    )
                },
              ]
            }} />
        </Flex>
      }
    >
      <Form>
        <div className="font-w-400">
          {returnInfo.product.map((item:any,index:number)=>{
            return(
              <Row key={index} style={{marginBottom:"20px"}}>
                <Col span={14}>
                  <Flex style={{paddingRight:"40px"}}>
                    <img src={item.product_image+"?x-oss-process=image/resize,w_200"} alt={item.product_name} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                    <Flex vertical align="flex-start" justify="flex-start">
                      <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px"}} className="font-w-500">{item.product_name}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                        item.attributes?.map((item:any)=>item.product_option+" · "+item.product_option_values).join("/")
                      }</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>model : {item.product_model}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E",marginTop:"4px" }}>退货原因 : {item.product_model}</div>
                    </Flex>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>US${item.product_price}X {item.quantity_returned}</span>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex justify="end" style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>US${(parseInt(item.product_price+"")*parseInt(item.quantity_returned+"")).toFixed(4)}</span>
                  </Flex>
                </Col>
              </Row>
            )
          })}
        </div>
      </Form>
      <Divider />
      <Form>
        {returnInfo.return.shipping_no == "" ?<>
        <div style={{ fontSize: "14px", color: "#7A8499" }}>{"包裹跟踪信息"}: 无</div>
        {/* <PackageTrackingModal shipping={shippedInfo} /> */}
        </>:<Flex justify="space-between" align="center">
        <Flex>
            <div className="color-7A8499">{returnInfo.return.shipping_courier_name == ""?"包裹跟踪信息":returnInfo.return.shipping_courier_name}：</div>
            <StatementModalSecondary
                width={620}
            title={"跟踪信息"}
            event={
            <div className="color-356DFF cursor-pointer">{returnInfo.return.shipping_no}</div>
            } content={
            <>
                <Flex vertical gap={8} className="color-474F5E" style={{marginTop:"20px",marginBottom:"40px",minHeight:"140px"}}>
                    <div className="color-474F5E font-w-500">没有物流轨迹！</div>
                </Flex>
            </>
            } />
        </Flex>
        <Flex justify="flex-end" gap={12}>
            <DefaultButton text={"标记为已退货"} onClick={()=>{}} />
            <PrimaryButton text={"退款"} onClick={()=>{}}  />
        </Flex>
        </Flex>}
      </Form>
    </Card>
  );
}

export default observer(ReturnInProgress);