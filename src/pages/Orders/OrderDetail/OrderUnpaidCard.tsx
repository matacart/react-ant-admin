import { Badge, Button, Card, Col, Divider, Flex, Form, Input, Row, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import orderStore from "@/store/order/orderStore";
import { PendingSecondIcon } from "@/components/Icons/Icons";
import order from "@/store/order/order";
import PrimaryButton from "@/components/Button/PrimaryButton";

function OrderUnpaidCard() {
    const intl = useIntl();

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
                    <span>没有付款期限</span>
                    <span className="color-356DFF cursor-pointer">添加期限</span>
                </Flex>
                <Flex gap={12}>
                    <PrimaryButton text="标记付款" />
                    <PrimaryButton text="发送账单" />
                </Flex>
            </Flex>
    </Card>
    );
}
export default observer(OrderUnpaidCard);