import { Badge, Button, Card, Col, Divider, Flex, Form, Input, message, notification, Row, Tooltip, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useIntl } from "@umijs/max";
import { CopyIcon, SuccessSecondIcon } from "@/components/Icons/Icons";
import copy from "copy-to-clipboard";
import order from "@/store/order/order";
import dayjs from 'dayjs';
import MyDropdown from "@/components/Dropdown/MyDropdown";
import PackageTrackingModal from "./PackageTrackingModal";
import StatementModalSecondary from "@/components/Modal/StatementModalSecondary";
import CancelShippingModal from "./Modal/CancelShippingModal";
import { exportOrderTask } from "@/services/y2/api";
import { history } from "@umijs/max";

const { Text,Link } = Typography;

function OrdersShippedCard({index}:{index:number}) {

  const intl = useIntl();

  const shippedInfo  = order.shippedProductsGroup[index]

  const address = [
    shippedInfo.shipment.delivery_company,
    shippedInfo.shipment.delivery_suburb,
    shippedInfo.shipment.delivery_street_address,
    shippedInfo.shipment.delivery_city,
    shippedInfo.shipment.delivery_state,
    shippedInfo.shipment.delivery_postcode,
    shippedInfo.shipment.delivery_country
  ]

  useEffect(()=>{
    console.log(order.shippedProductsGroup[index]);
  },[])


  return (
    <Card
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <SuccessSecondIcon className="font-28" />
            <span className="font-w-500">{"已发货"}（{shippedInfo.shipment.shipped_quantity}）#{order.orderInfo.order_sn}-F{index+1}</span>
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
                // 编辑跟踪信息
                shippedInfo.shipment.shipping_no !== "" && {
                  key: "3", label: (
                    <PackageTrackingModal shipping={shippedInfo} />
                  )
                },
                {
                    key: "1", label: (
                        <div onClick={()=>{
                          exportOrderTask({
                            languages_id:order.orderInfo.languages_id,
                            taskType:'shipping_slips',
                            orderList:JSON.stringify([order.orderInfo.order_id]),
                            range_type:3,
                            condition:JSON.stringify({
                              shipping_sn:shippedInfo.shipment.shipping_no
                            }),
                          }).then(res=>{
                            notification.info({
                              style:{width:"400px",marginBottom:"12px"},
                              message: '正在导出',
                              description: <div className='color-474F5E'>导出可能需要较长时间，请耐心等待，您亦可前往<Text underline className="color-356DFF cursor-pointer" onClick={()=>{
                                  history.push("/analyse/batch")
                              }}><span>批量处理进度</span></Text>页面查看进度。</div>,
                            })
                            console.log(res)
                          }).catch(err=>{
                            console.log(err)
                          })
                        }}>打印出货单</div>
                    )
                },
                {
                    key: "2", label: (
                      <CancelShippingModal shipment={shippedInfo.shipment} />
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
          <div style={{ fontSize: "14px", color: "#242833",marginBottom:"20px" }} >{""+dayjs(shippedInfo.shipment.shipment_time*1000).format("YYYY-MM-DD")}</div>
          {/* 处理 productinfo 为 undefined 的情况 */}
          {shippedInfo.product?.map((item,index)=>{
            return(
              <Row key={index} style={{ marginBottom: "20px" }}>
                <Col span={14}>
                  <Flex style={{paddingRight:"40px"}}>
                    <img src={item.product_image?item.product_image+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg"} alt={item.product_name} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                    <Flex vertical align="flex-start" justify="flex-start">
                      <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px" }} className="font-w-500">{item.product_name}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                        item.attributes?.map((item:any)=>item.product_option+" · "+item.product_option_values).join("/")
                      }</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>model : {item.product_model}</div>
                    </Flex>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>US${item.product_price}X {item.quantity_shipped}</span>
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
      <Form>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {shippedInfo.shipment.shipping_no == "" ?<>
            <div style={{ fontSize: "14px", color: "#7A8499" }}>{intl.formatMessage({ id: "order.detail.tracking" })}: 无</div>
            <PackageTrackingModal shipping={shippedInfo} />
          </>:<Flex>
            <div className="color-7A8499">{shippedInfo.shipment.shipping_courier_name == ""?"包裹跟踪信息":shippedInfo.shipment.shipping_courier_name}：</div>
            <StatementModalSecondary
              width={620}
              title={"跟踪信息"}
              event={
                <div className="color-356DFF cursor-pointer">{shippedInfo.shipment.shipping_no}</div>
              } content={
                <>
                  <Flex vertical gap={8} className="color-474F5E" style={{marginTop:"20px"}}>
                    <div className="color-242833 font-w-500">包裹收货地址</div>
                    <Flex gap={4}>
                      <span className="color-242833">{shippedInfo.shipment.delivery_lastname}</span>
                      <span className="color-242833">{shippedInfo.shipment.delivery_firstname}</span>
                    </Flex>
                    <span className="color-242833">{shippedInfo.shipment.delivery_telephone}</span>
                    <span className="color-242833">{address.filter(item => item).join(",")}</span>
                  </Flex>
                  <Flex vertical gap={8} className="color-474F5E" style={{marginTop:"20px"}}>
                    <div className="color-242833 font-w-500">物流服务商</div>
                    <div>{shippedInfo.shipment.shipping_courier_name}（{shippedInfo.shipment.shipping_no}<span style={{marginLeft:"8px"}} className="color-356DFF cursor-pointer" onClick={()=>{
                      copy(shippedInfo.shipment.shipping_no)
                      message.success("运单号已复制")
                    }}>复制</span>）</div>
                    <div className="font-12 color-7A8499">物流查询官网：<span className="color-356DFF cursor-pointer" onClick={()=>window.open(shippedInfo.shipment.shipping_courier_url)}>{shippedInfo.shipment.shipping_courier_url}</span></div>
                  </Flex>
                  <Flex vertical gap={8} className="color-474F5E" style={{marginTop:"20px",marginBottom:"40px"}}>
                    <div className="color-242833 font-w-500">物流轨迹</div>
                  </Flex>
                </>
              } />
          </Flex>}
        </div>
      </Form>
    </Card>
  );
}

export default observer(OrdersShippedCard);