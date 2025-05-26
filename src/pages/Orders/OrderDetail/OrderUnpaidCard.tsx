import { Badge, Card, Col, Divider, Flex, Form, Modal, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import { PendingSecondIcon } from "@/components/Icons/Icons";
import order from "@/store/order/order";
import PrimaryButton from "@/components/Button/PrimaryButton";
import AddPaymentPeriod from "./Modal/AddPaymentPeriod";
import DefaultButton from "@/components/Button/DefaultButton";
import { setOrderPaid } from "@/services/y2/api";
import { useState } from "react";

function OrderUnpaidCard() {

    const intl = useIntl();

    const [loading,setLoading] = useState(false);

    return (
        <Card title={
            <Flex align="center" gap={10}>
            <PendingSecondIcon className="font-28" />
            <div className="font-w-500">未付款</div>
            </Flex>
            }
        >
            <Form>
                {/* 小计 */}
                <Row>
                    <Col span={5}>
                        <div style={{ fontSize: '14px', color: '#474F5E' }}>{intl.formatMessage({ id:'order.detail.subtotal'})}</div>
                    </Col>
                    <Col span={19}>
                        <Flex justify="space-between">
                            <div style={{ fontSize: '14px', color: '#474F5E'}}>{order.productInfo.length}{intl.formatMessage({ id:'order.detail.commodity'})}</div>
                            <div style={{ fontSize: '14px', color: '#474F5E' }}>US${order.orderTotal[0].value}</div>
                        </Flex>
                    </Col>
                </Row>
                {/* 运费 */}
                <Row style={{ marginTop: '8px' }}>
                    <Col span={5}>
                        <div style={{ fontSize: '14px', color: '#474F5E' }}>{intl.formatMessage({ id:'order.detail.shiping'})}</div>
                    </Col>
                    <Col span={19}>
                        <Flex justify="space-between">
                            <div style={{ fontSize: '14px', color: '#474F5E'}}>{order.orderTotal[1].title}</div>
                            <div style={{ fontSize: '14px', color: '#474F5E'}}>US${order.orderTotal[1].value}</div>
                        </Flex>
                    </Col>
                </Row>
                {/* 合计 */}
                <Row style={{ marginTop: '20px' }}>
                    <Col span={5}><span className="font-w-600 color-242833">{intl.formatMessage({ id:'order.detail.total'})}</span></Col>
                    <Col span={19}><div className="font-w-600 color-242833" style={{textAlign:"right"}}>US${order.orderTotal[2].value}</div></Col>
                </Row>
            </Form>
            <Divider/>
            <Form>
                <Row>
                    <Col span={5}>
                        <div className="font-w-600 color-242833">{intl.formatMessage({ id:'order.detail.customerpay'})}</div>
                    </Col>
                    <Col span={19}>
                        <Flex justify="space-between">
                            <div className="color-474F5E">{order.orderInfo.payment_method}</div>
                            <div className="color-242833 font-w-500">US$0.0000</div>
                        </Flex>
                    </Col>
                </Row>
            </Form>
            <Divider/>
            <Form>
                <Row>
                    <Col span={5}>
                        <div className="font-w-600 color-242833">{intl.formatMessage({ id:'order.detail.realpayment'})}</div>
                    </Col>
                    <Col span={19}>
                        <div className="color-242833 font-w-500" style={{textAlign:"right"}}>US$0.0000</div>
                    </Col>
                </Row>
            </Form>
            <Divider/>
            <Flex align="center" justify="space-between">
                <Flex gap={8}>
                    <span>
                        {
                            order.orderInfo.payment_term == "full_payment_on_shipment" ? "订单发货时全额付款":
                            order.orderInfo.payment_term == "full_payment_on_invoice" ? "发送账单时全额付款":
                            order.orderInfo.payment_term == "full_payment_by_date" ? "指定日期前全额付款":
                            order.orderInfo.payment_term == "full_payment_in_7_days" ? "7天内全额付款":
                            order.orderInfo.payment_term == "full_payment_in_15_days" ? "15天内全额付款":
                            order.orderInfo.payment_term == "full_payment_in_30_days" ? "30天内全额付款":
                            order.orderInfo.payment_term == "full_payment_in_45_days" ? "45天内全额付款":
                            order.orderInfo.payment_term == "full_payment_in_60_days" ? "60天内全额付款":
                            order.orderInfo.payment_term == "full_payment_in_90_days" ? "90天内全额付款":"没有付款期限"
                        }
                    </span>
                    <AddPaymentPeriod />
                </Flex>
                <Flex gap={12}>
                    <PrimaryButton text="标记付款" onClick={()=>{
                        const modalRef = Modal.info({
                            title: '标记订单为已付款',
                            centered:true,
                            content: (
                              <div style={{marginBottom:"12px"}}>
                                <p>当前订单的付款状态将被标记为“已付款"</p>
                              </div>
                            ),
                            footer: (_, { OkBtn, CancelBtn }) => (
                                <Flex gap={12} justify="end">
                                    <DefaultButton text={"取消"} onClick={()=>modalRef.destroy()} />
                                    <PrimaryButton text={"确定"} onClick={()=>{
                                        setLoading(true)
                                        setOrderPaid({
                                            orderId:order.orderInfo.order_id
                                        }).then(res=>{
                                            order.triggerRefresh()
                                        }).catch(err=>{ 
                                        }).finally(()=>{
                                            setLoading(false)
                                            modalRef.destroy()
                                        })
                                    }} />
                                </Flex>
                            ),
                        });
                    }} />
                    <PrimaryButton text="发送账单" />
                </Flex>
            </Flex>
    </Card>
    );
}
export default observer(OrderUnpaidCard);