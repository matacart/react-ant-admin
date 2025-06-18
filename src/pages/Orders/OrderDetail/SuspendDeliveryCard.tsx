import { Badge, Button, Card, Col, Divider, Flex, Form, Input, message, Row, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { PauseSecondIcon, PendingSecondIcon, RiseIcon, SuccessSecondIcon, UnfoldIcon } from "@/components/Icons/Icons";
import order from "@/store/order/order";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { resumeOrderShipping } from "@/services/y2/api";


function SuspendDeliveryCard({groupIndex}:{groupIndex:number}) {

    const remainingInfo = order.remainingProductGroup[groupIndex]

    const [loading,setLoading] = useState(false)

    // 开始发货
    const startShipping = ()=>{
        setLoading(true)
        resumeOrderShipping({
            orderId:order.orderInfo.order_id,
            fulfillmentId:remainingInfo.fulfillment.fulfillment_id
        }).then(res=>{
            order.triggerRefresh()
            message.success("已解除暂停发货状态")
        }).catch(err=>{
        }).finally(()=>{
            setLoading(false)
        })
    }

    return (
        <Card
        title={
            <Flex style={{ fontSize: "16px", color: "#474F5E"}} align="center" justify="space-between" >
            <Flex align="center" gap={10}>
                <PauseSecondIcon className="font-28" />
                <span className="font-w-500">{"待处理"}</span>
            </Flex>
            </Flex>
        }
        >
        <Form>
            <div className="font-w-400">
                <div style={{ fontSize: "14px", color: "#7A8499",marginBottom:"4px" }} >{"暂停原因"}</div>
                <div style={{ fontSize: "14px", color: "#242833",marginBottom:"20px" }} >{remainingInfo.fulfillment.pause_reason}</div>
                <div style={{ fontSize: "14px", color: "#7A8499",marginBottom:"4px" }} >{"地点"}</div>
                <div style={{ fontSize: "14px", color: "#242833",marginBottom:"20px" }} >{"默认地点"}</div>
                {remainingInfo.product.map((item:any,index:number)=>{
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
                <PrimaryButton text={"开始发货"} loading={loading} onClick={startShipping}  />
            </Flex>
        </Form>
        </Card>
    );
}

export default observer(SuspendDeliveryCard);