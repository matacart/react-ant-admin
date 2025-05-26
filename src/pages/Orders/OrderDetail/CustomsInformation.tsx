import { Badge, Button, Card, Divider, Flex, Form, message, Tooltip } from "antd";
import { CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import order from "@/store/order/order";
import styled from "styled-components";
import { CopyIcon } from "@/components/Icons/Icons";
import ContactInformation from "./Modal/ContactInformation";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import AddIDCard from "./Modal/AddIDCard";
import copy from "copy-to-clipboard";
import DeliveryAddressModal from "./Modal/DeliveryAddressModal";

function CustomsInformation() {

    const intl = useIntl();

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-600 font-16">{intl.formatMessage({ id:'order.detail.customer'})}</div>
                    {!order.orderInfo.customer_id_number && <MyDropdown
                        tiggerEle={
                            <div className="cursor-pointer"><EllipsisOutlined /></div>
                        }
                        placement="bottom"
                        menu={{
                            items:[
                                {
                                    key: "1", label: (
                                        <AddIDCard />
                                    )
                                },
                            ]
                        }} 
                    />}
                </Flex>
                <Form>
                    <Flex vertical gap={4}>
                        <span style={{fontSize:'14px',color:'#356DFF'}}>{order.customerInfo?.first_name}{order.customerInfo?.last_name}</span>
                        <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>{intl.formatMessage({ id:'order.detail.sex'})}：{order.customerInfo?.sex == "1"?"男":order.customerInfo?.sex == "2"?"女":"未知"}</span> 
                        <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>{"注册状态："}{order.orderInfo.customer_id?"是":"否"}</span> 
                        <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>会员优惠：{intl.formatMessage({ id:'order.detail.benefitstext'})}</span>
                        <span className="font-14 color-242833">{intl.formatMessage({ id:'order.detail.historypurchase'})}：<span className="color-356DFF cursor-pointer" onClick={()=>{}}>{order.customerInfo.order_history_count}{intl.formatMessage({ id:'order.detail.numberpurchase'})}</span></span>
                    </Flex>
                </Form>
                <Divider/>
                <Form>
                    <>
                        <Flex style={{marginBottom:"8px"}} justify="space-between" align="center">
                            <div className="font-w-600">{intl.formatMessage({ id:'order.detail.contact'})}</div>
                            <ContactInformation />
                        </Flex>
                        <Flex align="center" justify="space-between">
                            <div style={{fontSize:'14px',color:'#356DFF', wordBreak: 'break-word', whiteSpace: 'pre-wrap',marginRight:"8px"}}>{order.orderInfo.customer_email_address}</div>
                            <Tooltip title="复制">
                                <CopyIcon className='font-14 cursor-pointer'/>
                            </Tooltip>
                        </Flex>
                        <Flex align="center" justify="space-between">
                            <Flex>
                                {/* <div style={{marginRight:"6px"}}>+86</div> */}
                                <div style={{fontSize:'14px', wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}>{order.orderInfo.customer_telephone}</div>
                            </Flex>
                            <Tooltip title="复制">
                                <CopyIcon className='font-14 cursor-pointer'/>
                            </Tooltip>
                        </Flex>
                    </>
                </Form>
                <Divider/>
                <Form>
                    <Flex justify="space-between">
                        <div className="font-w-600" style={{marginBottom:"8px"}}>{intl.formatMessage({ id:'order.detail.deliveryaddress'})}</div>
                        {order.shippedProductsGroup.length == 0 && <DeliveryAddressModal />}
                    </Flex>
                    {order.orderInfo.delivery_name == "" ?<>
                        <div className="color-7A8499">暂无收货地址</div>
                    </>:<>
                        <Flex>
                            <span className="font-14 color-242833">{order.orderInfo.delivery_lastname}</span>
                            <span className="font-14 color-242833">{order.orderInfo.delivery_firstname}</span>
                        </Flex>
                        <div><span className="font-14 color-242833">{order.orderInfo.delivery_company}</span></div>
                        <div><span className="font-14 color-242833">{order.orderInfo.delivery_suburb}</span></div>
                        <div><span className="font-14 color-242833">{order.orderInfo.delivery_street_address}</span></div>
                        {/* 区 */}
                        {/* <div><span className="font-14 color-242833">{order.orderInfo.delivery_street_address}</span></div> */}
                        <Flex wrap>
                            <div className="font-14 color-242833" style={{marginRight:"8px"}}>{order.orderInfo.delivery_city}</div>
                            <div className="font-14 color-242833" style={{marginRight:"8px"}}>{order.orderInfo.delivery_state}</div>
                            <div className="font-14 color-242833" style={{wordBreak:"break-all"}}>{order.orderInfo.delivery_postcode}</div>
                        </Flex>
                        <div><span className="font-14 color-242833">{order.orderInfo.delivery_country}</span></div>
                        <div><span className="font-14 color-242833">{order.orderInfo.delivery_telephone}</span></div>
                        <Tooltip title="复制地址与邮编">
                            <Flex align="center" style={{display:"inline-block"}} className="cursor-pointer color-7A8499" onClick={()=>{
                                const str = [
                                    order.orderInfo.delivery_lastname+order.orderInfo.delivery_firstname,
                                    order.orderInfo.delivery_company,
                                    order.orderInfo.delivery_suburb,
                                    order.orderInfo.delivery_street_address,
                                    order.orderInfo.delivery_city,
                                    order.orderInfo.delivery_state,
                                    order.orderInfo.delivery_postcode,
                                    order.orderInfo.delivery_country,
                                    order.orderInfo.delivery_telephone,
                                ]
                                copy(str.filter(item => item).join(","))
                                message.success('复制成功')
                            }}>
                                <span style={{marginRight:"4px"}}>{intl.formatMessage({ id:'order.detail.copy'})}</span>
                                <CopyIcon className=''/>
                            </Flex>
                        </Tooltip>
                    </>}
                </Form>
                <Divider/>
                <Form>
                    <div className="font-w-600" style={{marginBottom:"8px"}}>{intl.formatMessage({ id:'order.detail.billingaddress'})}</div>
                    {parseInt(order.orderInfo.is_same_delivery) == 1 ? <div className="color-7A8499">与收货地址相同</div>:order.orderInfo.billing_name == "" ? <div className="color-7A8499">暂无账单地址</div> : <>
                        <span className="font-14 color-242833">{order.orderInfo.billing_name}</span>
                    </>}
                </Form>
                <Divider/>
                <Form>
                    <div className="font-w-600" style={{marginBottom:"8px"}}>市场</div>
                    <div>United States</div>
                    <div>美国 (USD)</div>
                </Form>
                {order.orderInfo.customer_id_number && <>
                    <Divider/>
                    <Form>
                        <Flex style={{marginBottom:"8px"}} justify="space-between" align="center">
                            <div className="font-w-600">护照号/身份证号</div>
                            <AddIDCard />
                        </Flex>
                        <div>{order.orderInfo.customer_id_number}</div>
                    </Form>
                </>}
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
`

export default observer(CustomsInformation);