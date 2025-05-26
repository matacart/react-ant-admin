import { Badge, Button, Card, Divider, Flex, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
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
                <Form>
                    <Flex style={{marginBottom:"16px"}}>
                        <div className="font-w-600 font-16">{intl.formatMessage({ id:'order.detail.orderid'})}</div> 
                    </Flex>
                    <div style={{marginBottom:"4px"}}>{order.orderInfo.order_id}</div>
                    <Tooltip title="复制">
                        <Flex align="center" style={{display:"inline-block"}} className="cursor-pointer color-7A8499">
                            <span style={{marginRight:"6px"}}>{intl.formatMessage({ id:'order.detail.copy'})}</span>
                            <CopyIcon className=''/>
                        </Flex>
                    </Tooltip>
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

export default observer(OrdersIdCard);