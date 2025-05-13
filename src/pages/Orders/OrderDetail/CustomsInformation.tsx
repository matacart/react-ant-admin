import { Badge, Button, Card, Divider, Flex, Form, Input, Tooltip } from "antd";
import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import order from "@/store/order/order";
import { useEffect } from "react";

function CustomsInformation() {
    const intl = useIntl();


    return (
        <Card title={
            <Flex justify="space-between">
                <span style={{fontSize:'16px',color:'#242833'}}>{intl.formatMessage({ id:'order.detail.customer'})}</span> 
                <EllipsisOutlined />
            </Flex>
        }>
        <Form >
            <Flex vertical gap={4}>
                <span style={{fontSize:'14px',color:'#356DFF'}}>{order.customerInfo?.first_name}{order.customerInfo?.last_name}</span>
                <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>{intl.formatMessage({ id:'order.detail.sex'})}：{order.customerInfo?.sex == "1"?"男":order.customerInfo?.sex == "2"?"女":"未知"}</span> 
                <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>{"注册状态"}：否</span> 
                <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>会员优惠：{intl.formatMessage({ id:'order.detail.benefitstext'})}</span>
                <span className="font-14 color-242833">{intl.formatMessage({ id:'order.detail.historypurchase'})}：<span className="color-356DFF">2{intl.formatMessage({ id:'order.detail.numberpurchase'})}</span></span>
             </Flex>
        </Form>
        <Divider/>
        <Form>
            <>
                <div className="font-w-600" style={{marginBottom:"8px"}}>{intl.formatMessage({ id:'order.detail.contact'})}</div>
                <Flex align="center" justify="space-between">
                    <div style={{fontSize:'14px',color:'#356DFF', wordBreak: 'break-word', whiteSpace: 'pre-wrap',marginRight:"8px"}}>{order.customerInfo.email}</div>
                    <Tooltip title="复制">
                        <CopyOutlined />
                    </Tooltip>
                </Flex>
                <Flex align="center" justify="space-between">
                    <Flex>
                        <div style={{marginRight:"8px"}}>+86</div>
                        <div style={{fontSize:'14px', wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}>{order.customerInfo.tel}</div>
                    </Flex>
                    <Tooltip title="复制">
                        <CopyOutlined />
                    </Tooltip>
                </Flex>
            </>
        </Form>
        <Divider/>
        <Form>
            <div className="font-w-600" style={{marginBottom:"8px"}}>{intl.formatMessage({ id:'order.detail.deliveryaddress'})}</div>
            {JSON.stringify(order.deliveryAddress) == "{}" ?<>
                <div className="color-7A8499">暂无收货地址</div>
            </>:<>
                <span className="font-14 color-242833">{order.deliveryAddress.delivery_name}</span> 
            {/* <span className="font-14 color-242833">{orderStore.oldOrder?.delivery_street_address}</span>
            <span className="font-14 color-242833">{orderStore.oldOrder?.delivery_city}</span>
            <span className="font-14 color-242833">{orderStore.oldOrder?.delivery_country_code_2}</span>
            <span className="font-14 color-242833">{orderStore.oldOrder?.delivery_postcode}</span> */}
            </>}
        </Form>
        <Divider/>
        <Form>
            <div className="font-w-600" style={{marginBottom:"8px"}}>{intl.formatMessage({ id:'order.detail.billingaddress'})}</div>
            {JSON.stringify(order.billingAddress) == "{}" ?<>
                <div className="color-7A8499">暂无账单地址</div>
            </>:<>
                <span className="font-14 color-242833">{order.deliveryAddress?.delivery_name}</span> 
            </>}
        </Form>
        <Divider/>
        <Form>
            <div className="font-w-600" style={{marginBottom:"8px"}}>市场</div>
            <div>United States</div>
            <div>美国 (USD)</div>
        </Form>
    </Card>
);
}
export default observer(CustomsInformation);