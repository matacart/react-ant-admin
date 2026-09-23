import { App, Card, Checkbox, Col, Divider, Flex, Form, Modal, Row, Tooltip } from "antd";
import { EllipsisOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { CopyIcon, ReturnCompletedSecondIcon, ReturnSecondIcon } from "@/components/Icons/Icons";
import order from "@/store/order/order";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultButton from "@/components/Button/DefaultButton";
import StatementModalSecondary from "@/components/Modal/StatementModalSecondary";
import PackageTrackingSecondModal from "../Modal/PackageTrackingSecondModal";
import { setMarkProductAsRefunded } from "@/services/y2/api";
import { history } from "@umijs/max";
import copy from "copy-to-clipboard";

function OrderReturned({groupIndex}:{groupIndex:number}) {

  const { message } = App.useApp();

  const [loading,setLoading] = useState(false)

  const afterSaleOrder  = order.afterSaleOrderList[groupIndex];

  return (
    <Card title={
        <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
            <Flex align="center" gap={10}>
                <ReturnSecondIcon className="font-28" />
                <span className="font-w-500">{"已退货"}（{afterSaleOrder.orderRefund?.orderRefundDetailInfoList?.reduce((pre:number,cur:any)=>pre+Number(cur.skuNum),0) || 0}）#{afterSaleOrder.afterSaleOrderSeq}</span>
                <Tooltip title="复制">
                    <span style={{cursor:"pointer"}} onClick={()=>{
                        copy(afterSaleOrder.afterSaleOrderSeq)
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
                        key: "1", 
                        label: (
                            // <PackageTrackingModal ordersPackage={ordersPackage} />
                            <div>321</div>
                        )
                    },
                    {
                        key: "2", 
                        label: (
                            <>123</>
                            // <CancelShippingModal packageSeq={ordersPackage.packageSeq} />
                        )
                    },
                ]
                }} 
            />
        </Flex>
    }>
        <Form>
            <div className="font-w-400">
                {afterSaleOrder.orderRefund?.orderRefundDetailInfoList.map((item,index:number)=>{
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
    </Card>
  );
}

export default observer(OrderReturned);