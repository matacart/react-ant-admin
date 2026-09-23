import { App, Badge, Button, Card, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect } from "react";
import orderManualDelivery from "@/store/order/orderManualDelivery";
import DeliveryAddressModal from "@/pages/Orders/OrderDetail/Modal/DeliveryAddressModal";
import copy from "copy-to-clipboard";
import { currencyPrecision } from "@/utils/common";

function DeliveryAddress({languagesId}:{languagesId:string}) {

    const { message } = App.useApp();

    const copyAddress = () => {
        if(!orderManualDelivery.orderInfo.receiverInfo){
            return;
        }
        const str = [
            orderManualDelivery.orderInfo.receiverInfo?.receiverLastName+orderManualDelivery.orderInfo.receiverInfo?.receiverFirstName,
            orderManualDelivery.orderInfo.receiverInfo?.receiverCompany,
            orderManualDelivery.orderInfo.receiverInfo?.receiverAddress,
            orderManualDelivery.orderInfo.receiverInfo?.receiverAddressAdd,
            orderManualDelivery.orderInfo.receiverInfo?.receiverCity,
            orderManualDelivery.orderInfo.receiverInfo?.receiverProvince,
            orderManualDelivery.orderInfo.receiverInfo?.receiverPostcode,
            orderManualDelivery.orderInfo.receiverInfo?.receiverCountry,
            orderManualDelivery.orderInfo.receiverInfo?.receiverMobile,
        ]
        copy(str.filter(item => item).join(","))
        message.success("复制成功")
    }

    const success = () => {
        orderManualDelivery.triggerRefresh();
    }

    useEffect(()=>{
    },[])

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">收货地址</div>
                </Flex>
                <Form>
                    <>
                        <Flex style={{marginBottom:"8px"}} justify="space-between" align="center">
                            <div className="font-w-500">收货地址</div>
                            <DeliveryAddressModal orderSeq={orderManualDelivery.orderInfo?.orderSeq} languagesId={languagesId} receiverInfo={orderManualDelivery.orderInfo?.receiverInfo} success={success} />
                        </Flex>
                        {orderManualDelivery.orderInfo?.receiverInfo?.deliveryType ? <Tooltip title="复制地址与邮编">
                            <div className="cursor-pointer" onClick={()=>copyAddress()}>
                                <Flex gap={4}>
                                    <span className="font-14 color-242833">{orderManualDelivery.orderInfo.receiverInfo?.receiverFirstName}</span>
                                    <span className="font-14 color-242833">{orderManualDelivery.orderInfo.receiverInfo?.receiverLastName}</span>
                                </Flex>
                                <div><span className="font-14 color-242833">{orderManualDelivery.orderInfo.receiverInfo?.receiverCompany}</span></div>
                                <div><span className="font-14 color-242833">{orderManualDelivery.orderInfo.receiverInfo?.receiverAddress}</span></div>
                                <div><span className="font-14 color-242833">{orderManualDelivery.orderInfo.receiverInfo?.receiverAddressAdd}</span></div>
                                <div><span className="font-14 color-242833">{orderManualDelivery.orderInfo.receiverInfo?.receiverArea}</span></div>
                                <Flex wrap>
                                    <div className="font-14 color-242833" style={{marginRight:"8px"}}>{orderManualDelivery.orderInfo.receiverInfo?.receiverCity}</div>
                                    <div className="font-14 color-242833" style={{marginRight:"8px"}}>{orderManualDelivery.orderInfo.receiverInfo?.receiverProvince}</div>
                                    <div className="font-14 color-242833" style={{wordBreak:"break-all"}}>{orderManualDelivery.orderInfo.receiverInfo?.receiverPostcode}</div>
                                </Flex>
                                <div><span className="font-14 color-242833">{orderManualDelivery.orderInfo.receiverInfo?.receiverCountry}</span></div>
                                <div><span className="font-14 color-242833">{orderManualDelivery.orderInfo.receiverInfo?.receiverMobile}</span></div>
                            </div>
                        </Tooltip>:<div className="color-7A8499">暂无收货地址</div>}
                    </>
                </Form>
                <Divider />
                <Form>
                    <div className="font-w-500" style={{marginBottom:"8px"}}>客户结账时选择的物流方式</div>
                    <div className="color-474F5E">{orderManualDelivery.fulfillmentItem?.fulfillmentOrder?.deliveryMethod?.deliveryName}</div>
                    <div>运费：{orderManualDelivery.orderInfo?.priceSetInfo?.expressFeeInfo?.amountSet?.settleMoney?.currencyCode} {currencyPrecision(orderManualDelivery.orderInfo?.priceSetInfo?.expressFeeInfo?.amountSet?.settleMoney?.amount || 0)}</div>
                </Form>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
`

export default observer(DeliveryAddress);