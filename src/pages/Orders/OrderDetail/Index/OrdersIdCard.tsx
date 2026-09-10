import { Card, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import order from "@/store/order/order";
import styled from "styled-components";
import { CopyIcon } from "@/components/Icons/Icons";

function OrdersIdCard() {

    const intl = useIntl();

    return (
        <Scoped>
            <Card className="card">
                <Flex style={{marginBottom:"16px"}}>
                    <div className="font-w-600 font-16">{intl.formatMessage({ id:'order.orderDetail.orderid'})}</div> 
                </Flex>
                <Flex align="center" justify="space-between">
                    <div>{order.orderInfo.orderSeq}</div>
                    <Tooltip title="复制">
                        <CopyIcon className=''/>
                    </Tooltip>
                </Flex>
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
`

export default observer(OrdersIdCard);