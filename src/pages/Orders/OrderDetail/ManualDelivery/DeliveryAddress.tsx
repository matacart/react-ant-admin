import { Badge, Button, Card, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect } from "react";
import orderDelivery from "@/store/order/orderDelivery";
import DeliveryAddressModal from "./DeliveryAddressModal";

function DeliveryAddress() {

    useEffect(()=>{
        console.log(orderDelivery.deliveryAddress)
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
                            <DeliveryAddressModal />
                        </Flex>
                        {orderDelivery.deliveryAddress?.delivery_name !== "" ?<>
                            <div>
                                <div><span className="font-14 color-242833">{orderDelivery.deliveryAddress.delivery_name}</span></div>
                                <div><span className="font-14 color-242833">{orderDelivery.deliveryAddress.delivery_company}</span></div>
                                <div><span className="font-14 color-242833">{orderDelivery.deliveryAddress.delivery_suburb}</span></div>
                                <div><span className="font-14 color-242833">{orderDelivery.deliveryAddress.delivery_street_address}</span></div>
                                    {/* <span className="font-14 color-242833">{orderDelivery.deliveryAddress.delivery_street_address}</span> */}
                                <Flex gap={8}>
                                    <span className="font-14 color-242833">{orderDelivery.deliveryAddress.delivery_city}</span>
                                    <span className="font-14 color-242833">{orderDelivery.deliveryAddress.delivery_state}</span>
                                    <span className="font-14 color-242833">{orderDelivery.deliveryAddress.delivery_postcode}</span>
                                </Flex>
                                <div><span className="font-14 color-242833">{orderDelivery.deliveryAddress.delivery_country}</span></div>
                                <div><span className="font-14 color-242833">{orderDelivery.deliveryAddress.customer_telephone}</span></div>
                            </div>
                        </>:<>
                            <div className="color-7A8499">暂无收货地址</div>
                        </>}
                    </>
                </Form>
                <Divider/>
                <Form>
                    <div className="font-w-500" style={{marginBottom:"8px"}}>客户结账时选择的物流方式</div>
                    <div className="color-474F5E">{orderDelivery.deliveryAddress.shipping_method}</div>
                    <div>运费：US$0.00</div>
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