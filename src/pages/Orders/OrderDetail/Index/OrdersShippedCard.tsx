import { App, Card, Col, Divider, Flex, Form, notification, Row, Tooltip, Typography } from "antd";
import { CalendarOutlined, ClockCircleOutlined, EllipsisOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useIntl } from "@umijs/max";
import { CopyIcon, SuccessSecondIcon } from "@/components/Icons/Icons";
import copy from "copy-to-clipboard";
import order from "@/store/order/order";
import dayjs from 'dayjs';
import MyDropdown from "@/components/Dropdown/MyDropdown";
import PackageTrackingModal from "../Modal/PackageTrackingModal";
import StatementModalSecondary from "@/components/Modal/StatementModalSecondary";
import CancelShippingModal from "../Modal/CancelShippingModal";
import { exportOrderTask } from "@/services/y2/api";
import { history } from "@umijs/max";
import { currencyPrecision, getSymbolLeft } from "@/utils/common";

const { Text,Link } = Typography;

function OrdersShippedCard({index}:{index:number}) {
  
  const { message } = App.useApp();

  const intl = useIntl();
  
  const symbolLeft = getSymbolLeft();

  const ordersPackage  = order.orderInfo.ordersPackageList[index];

  // const address = [
  //   shippedInfo.shipment.delivery_company,
  //   shippedInfo.shipment.delivery_suburb,
  //   shippedInfo.shipment.delivery_street_address,
  //   shippedInfo.shipment.delivery_city,
  //   shippedInfo.shipment.delivery_state,
  //   shippedInfo.shipment.delivery_postcode,
  //   shippedInfo.shipment.delivery_country
  // ]

  useEffect(()=>{
    // console.log(order.shippedProductsGroup[index]);
  },[])


  return (
    <Card
      title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
          <Flex align="center" gap={10}>
            <SuccessSecondIcon className="font-28" />
            <span className="font-w-500">{"已发货"}（{ ordersPackage.itemGroupList[0]?.itemList.reduce((acc,cur)=>Number(acc)+Number(cur.productNum),0)}）#{ordersPackage.appPackageSeq}</span>
            <Tooltip title="复制">
                <span style={{cursor:"pointer"}} onClick={()=>{
                  copy(ordersPackage.appPackageSeq)
                  message.success('复制成功')
                }}><CopyIcon className='color-7A8499 cursor-pointer' /></span>
            </Tooltip>
          </Flex>
          {ordersPackage.itemGroupList[0]?.requireShipping && (
            <MyDropdown
            tiggerEle={
              <div className="cursor-pointer"><EllipsisOutlined /></div>
            }
            placement="bottomRight"
            menu={{
              items:[
                {
                  key: "1", label: (
                    <PackageTrackingModal />
                  )
                },
                // {
                //     key: "2", label: (
                //         <div onClick={()=>{
                //           exportOrderTask({
                //             languages_id:order.orderInfo.languages_id,
                //             taskType:'shipping_slips',
                //             orderList:JSON.stringify([order.orderInfo.order_id]),
                //             range_type:3,
                //             condition:JSON.stringify({
                //               shipping_sn:shippedInfo.shipment.shipping_no
                //             }),
                //           }).then(res=>{
                //             notification.info({
                //               style:{width:"400px",marginBottom:"12px"},
                //               message: '正在导出',
                //               description: <div className='color-474F5E'>导出可能需要较长时间，请耐心等待，您亦可前往<Text underline className="color-356DFF cursor-pointer" onClick={()=>{
                //                   history.push("/analyse/batch")
                //               }}><span>批量处理进度</span></Text>页面查看进度。</div>,
                //             })
                //             console.log(res)
                //           }).catch(err=>{
                //             console.log(err)
                //           })
                //         }}>打印出货单</div>
                //     )
                // },
                
                
                // {
                //     key: "2", label: (
                //       <CancelShippingModal shipment={shippedInfo.shipment} />
                //     )
                // },
              ]
            }} />
          )}
        </Flex>
      }
    >
      <Form>
        <div className="font-w-400">
          <Flex gap={12} className="font-14" style={{marginBottom:"8px"}}>
            <Flex gap={6}>
              <EnvironmentOutlined className="color-7A8499" />
              <div className="color-7A8499">{"地点"}</div>
            </Flex>
            <div className="color-242833">{"默认地点"}</div>
          </Flex>
          <Flex gap={12} className="font-14" style={{marginBottom:"8px"}}>
            <Flex gap={6}>
              <ClockCircleOutlined className="color-7A8499" />
              <div className="color-7A8499">{"已发货"}</div>
            </Flex>
            <div className="color-242833">{dayjs(ordersPackage.sendTime).format("YYYY-MM-DD")}</div>
          </Flex>
          {ordersPackage.multiExpressInfo.map((item,index)=>{
            if(!item.expressCompany || !item.expressCode){
              return null
            }
            return(
              <Flex key={index} gap={12} className="font-14" style={{marginBottom:"8px"}}>
                <Flex gap={6}>
                  <CalendarOutlined className="color-7A8499" />
                  <div className="color-7A8499">{item.expressCompany}</div>
                </Flex>
                <div className="color-242833">{item.expressCode}</div>
              </Flex>
            )
          })}
          {ordersPackage.itemGroupList[0]?.itemList?.map((item,index)=>{
            return(
              <Row key={index} style={{ marginBottom: "20px" }}>
                <Col span={14}>
                  <Flex style={{paddingRight:"40px"}}>
                    <img src={item.firstImage?item.firstImage+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg"} alt={item.title} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                    <Flex vertical align="flex-start" justify="flex-start">
                      <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px" }} className="font-w-500">{item.title}</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                        item.attributes?.map((item:any)=>item.attributeValue??"").join("/")
                      }</div>
                      <div style={{ fontSize: "14px", color: "#474F5E" }}>model : {}</div>
                    </Flex>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>{symbolLeft}{currencyPrecision(item.productPrice)} X {item.productNum}</span>
                  </Flex>
                </Col>
                <Col span={5}>
                  <Flex justify="end" style={{height:"100%"}}>
                    <span style={{ fontSize: "14px", color: "#474F5E" }}>{symbolLeft}{currencyPrecision(Number(item.productAmount))}</span>
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
          {/* {shippedInfo.shipment.shipping_no == "" ?<>
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
          </Flex>} */}
        </div>
      </Form>
    </Card>
  );
}

export default observer(OrdersShippedCard);