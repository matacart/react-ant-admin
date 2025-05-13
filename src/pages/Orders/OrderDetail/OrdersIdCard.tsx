import { Badge, Button, Card, Divider, Flex, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import order from "@/store/order/order";

function OrdersIdCard() {
    const intl = useIntl();
    return (
    <Card title={
        <Flex>   
            <span style={{fontSize:'16px',color:'#242833'}}>{intl.formatMessage({ id:'order.detail.orderid'})}</span> 
        </Flex>
    }>
        <Form>
            <p style={{fontSize:'14px',color:'#474F5E',margin:'0'}}>{order.orderInfo.id}</p>
            <Tooltip title="复制">{intl.formatMessage({ id:'order.detail.copy'})}
                <CopyOutlined style={{margin:'10PX'}}/>
            </Tooltip>
        </Form>
    </Card>
);
}
export default observer(OrdersIdCard);