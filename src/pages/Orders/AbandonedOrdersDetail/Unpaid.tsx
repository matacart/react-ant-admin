import { Badge, Card, Col, Divider, Flex, Form, Modal, Row } from "antd";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import { PendingSecondIcon } from "@/components/Icons/Icons";
import { useState } from "react";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultButton from "@/components/Button/DefaultButton";
import { currencyPrecision, getSymbolLeft } from "@/utils/common";
import abandonedOrder from "@/store/order/abandonedOrder/abandonedOrder";

function Unpaid() {

    const intl = useIntl();

    const symbolLeft = getSymbolLeft();

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
                        <div style={{ fontSize: '14px', color: '#474F5E' }}>小计</div>
                    </Col>
                    <Col span={19}>
                        <Flex justify="space-between">
                            <div style={{ fontSize: '14px', color: '#474F5E'}}>{abandonedOrder.abandonedOrderData.priceSetInfo.subtotalInfo.productNum}件商品</div>
                            <div style={{ fontSize: '14px', color: '#474F5E' }}>{symbolLeft}{currencyPrecision(abandonedOrder.abandonedOrderData.priceSetInfo.subtotalInfo?.amountSet?.settleMoney?.amount)}</div>
                        </Flex>
                    </Col>
                </Row>
                {/* 运费 */}
                <Row style={{ marginTop: '8px' }}>
                    <Col span={5}>
                        <div style={{ fontSize: '14px', color: '#474F5E' }}>运费</div>
                    </Col>
                    <Col span={19}>
                        <Flex justify="space-between">
                            <div style={{ fontSize: '14px', color: '#474F5E'}}>运费1</div>
                            <div style={{ fontSize: '14px', color: '#474F5E'}}>{symbolLeft}10</div>
                        </Flex>
                    </Col>
                </Row>
                {/* 合计 */}
                <Row style={{ marginTop: '20px' }}>
                    <Col span={5}><span className="font-w-600 color-242833">合计</span></Col>
                    <Col span={19}><div className="font-w-600 color-242833" style={{textAlign:"right"}}>{symbolLeft}110</div></Col>
                </Row>
            </Form>
            <Divider/>
            <Form>
                <Row>
                    <Col span={5}>
                        <div className="font-w-600 color-242833">待客户付款</div>
                    </Col>
                    <Col span={19}>
                        <div className="color-242833 font-w-500" style={{textAlign:"right"}}>{symbolLeft}0.0000</div>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
}
export default observer(Unpaid);