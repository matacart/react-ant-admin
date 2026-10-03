import { Badge, Button, Card, Checkbox, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import orderProductEdit from "@/store/order/orderProductEdit";
import { useSymbolLeft } from "@/hooks/customHooks";
import { currencyPrecision } from "@/utils/common";

function BillDetails() {

    const symbolLeft = useSymbolLeft();

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">账单明细</div>
                </Flex>
                <Flex vertical gap={12}>
                    <Flex className="color-474F5E font-w-400" justify="space-between">
                        <div>更新后的总额</div>
                        <div>{symbolLeft}{currencyPrecision(orderProductEdit.billDetails?.totalAmount || 0)}</div>
                    </Flex>
                    <Flex className="color-474F5E font-w-400" justify="space-between">
                        <div>实际付款</div>
                        <div>{symbolLeft}{currencyPrecision(orderProductEdit.billDetails?.paidAmount || 0)}</div>
                    </Flex>
                </Flex>
                <Divider/>
                <Form>
                    <Flex className="color-474F5E font-w-500" justify="space-between">
                        <div>待客户支付</div>
                        <div>{symbolLeft}{currencyPrecision(orderProductEdit.billDetails?.unpaidAmount || 0)}</div>
                    </Flex>
                </Form>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    
`

export default observer(BillDetails);