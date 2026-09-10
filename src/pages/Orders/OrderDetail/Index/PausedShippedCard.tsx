import { App, Card, Col, Divider, Flex, Form, Row } from "antd";
import { EllipsisOutlined, EnvironmentOutlined, HourglassOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { PauseSecondIcon, PendingSecondIcon, RiseIcon, SuccessSecondIcon, UnfoldIcon } from "@/components/Icons/Icons";
import order, { FulfillmentItemType } from "@/store/order/order";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { resumeOrderShipping } from "@/services/y2/api";
import { currencyPrecision, getSymbolLeft } from "@/utils/common";


function PausedShippedCard({groupIndex}:{groupIndex:number}) {
    
    const { message } = App.useApp();

    const symbolLeft = getSymbolLeft();

    const fulfillment = order.fulfillmentOrderList[groupIndex];

    const [loading,setLoading] = useState(false)

    // 开始发货
    const startShipping = ()=>{
        setLoading(true)
        resumeOrderShipping({
            orderId:order.orderInfo.orderSeq,
            fulfillmentId:fulfillment.fulfillmentOrder.fulfillmentOrderSeq
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
                <Flex gap={12} className="font-14" style={{marginBottom:"8px"}}>
                    <Flex gap={6}>
                    <EnvironmentOutlined className="color-7A8499" />
                    <div className="color-7A8499">{"地点"}</div>
                    </Flex>
                    <div className="color-242833">{"默认地点"}</div>
                </Flex>
                <Flex gap={12} className="font-14" style={{marginBottom:"8px"}}>
                    <Flex gap={6}>
                    <HourglassOutlined className="color-7A8499" />
                    <div className="color-7A8499">{"暂停原因"}</div>
                    </Flex>
                    <div className="color-242833">{fulfillment.fulfillmentOrder.fulfillmentHolds?.at(-1)?.reason??""}</div>
                </Flex>
                {fulfillment.fulfillmentItemList.map((item:FulfillmentItemType,index:number)=>{
                    return(
                    <Row key={index} style={{marginBottom:"20px"}}>
                        <Col span={14}>
                        <Flex style={{paddingRight:"40px"}}>
                            <img src={item.firstImage?item.firstImage+"?x-oss-process=image/resize,w_200":"/icons/ProductCoverBlank.svg"} alt={item.title} style={{ width: "60px", height: "60px", marginRight: "10px" }} />
                            <Flex vertical align="flex-start" justify="flex-start">
                            <div style={{ fontSize: "14px", color: "#474F5E",wordBreak:"break-all",marginBottom:"4px"}} className="font-w-500">{item.title}</div>
                            <div style={{ fontSize: "14px", color: "#474F5E" }}>{
                                item.attributes?.map((item:any)=>item.attributeValue??"").join("/")
                            }</div>
                            <div style={{ fontSize: "14px", color: "#474F5E" }}>model : </div>
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
            <Flex justify="flex-end" gap={12}>
                <PrimaryButton text={"开始发货"} loading={loading} onClick={startShipping}  />
            </Flex>
        </Form>
        </Card>
    );
}

export default observer(PausedShippedCard);
