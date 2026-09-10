import { App, Card, Divider, Flex, Form, Tooltip } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import order from "@/store/order/order";
import styled from "styled-components";
import { CopyIcon } from "@/components/Icons/Icons";
import ContactInformation from "../Modal/ContactInformation";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import AddIDCard from "../Modal/AddIDCard";
import copy from "copy-to-clipboard";
import DeliveryAddressModal from "../Modal/DeliveryAddressModal";
import { useEffect, useState } from "react";
import { getUseOrderHistory } from "@/services/y2/apiStore";

function CustomsInformation() {

    const { message } = App.useApp();

    const intl = useIntl();

    const [historyCount, setHistoryCount] = useState(0);

    const copyAddress = () => {
        if(!order.orderInfo.receiverInfo){
            return;
        }
        const str = [
            order.orderInfo.receiverInfo?.receiverLastName+order.orderInfo.receiverInfo?.receiverFirstName,
            order.orderInfo.receiverInfo?.receiverCompany,
            order.orderInfo.receiverInfo?.receiverAddress,
            order.orderInfo.receiverInfo?.receiverAddressAdd,
            order.orderInfo.receiverInfo?.receiverCity,
            order.orderInfo.receiverInfo?.receiverProvince,
            order.orderInfo.receiverInfo?.receiverPostcode,
            order.orderInfo.receiverInfo?.receiverCountry,
            order.orderInfo.receiverInfo?.receiverMobile,
        ]
        copy(str.filter(item => item).join(","))
        message.success("复制成功")
    }

    useEffect(()=>{
        getUseOrderHistory({uids:JSON.stringify([order.orderInfo.orderSeq || ""]),languages_id:order.languages}).then(res=>{
            res.code == 0 && setHistoryCount(res?.data?.list?.[0]?.dealOrderCntTotal || 0)
        })
    },[order.orderInfo.orderSeq])


    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-600 font-16">{intl.formatMessage({ id:'order.orderDetail.customer'})}</div>
                    {!order.orderInfo.receiverInfo && <MyDropdown
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
                        <span style={{fontSize:'14px',color:'#356DFF'}}>{order.orderInfo.buyerInfo?.buyerNick || order.orderInfo.buyerInfo?.buyerId}</span>
                        <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>{intl.formatMessage({ id:'order.orderDetail.sex'})}：{order.orderInfo.buyerInfo?.gender == "1"?"男":order.orderInfo.buyerInfo?.gender == "2"?"女":"未知"}</span> 
                        <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>{"注册状态："}{order.orderInfo.buyerInfo?.activated?"是":"否"}</span> 
                        <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>{"是否登录："}{order.orderInfo.buyerInfo?.loginStatus?"是":"否"}</span> 
                        {/* <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>会员优惠：{intl.formatMessage({ id:'order.orderDetail.benefitstext'})}</span> */}
                        <span className="font-14 color-242833">{intl.formatMessage({ id:'order.orderDetail.historypurchase'})}：<span className="color-356DFF cursor-pointer" onClick={()=>{}}>{historyCount}{intl.formatMessage({ id:'order.orderDetail.numberpurchase'})}</span></span>
                    </Flex>
                </Form>
                <Divider/>
                <Form>
                    <Flex style={{marginBottom:"8px"}} justify="space-between" align="center">
                        <div className="font-w-600">{intl.formatMessage({ id:'order.orderDetail.contact'})}</div>
                        <ContactInformation />
                    </Flex>
                    <Flex style={{marginBottom:"6px"}} align="center" justify="space-between">
                        {order.orderInfo.buyerInfo?.buyerEmail ? <>
                            <div style={{fontSize:'14px',color:'#356DFF', wordBreak: 'break-word', whiteSpace: 'pre-wrap',marginRight:"8px"}}>{order.orderInfo.buyerInfo.buyerEmail}</div>
                            {/* <Tooltip title="复制">
                                <CopyIcon className='font-14 cursor-pointer'/>
                            </Tooltip> */}
                        </>:<div className="color-7A8499">未提供邮箱</div>}
                    </Flex>
                    <Flex align="center" justify="space-between">
                        {order.orderInfo.buyerInfo?.buyerPhone ? <>
                            <Flex>
                                <div style={{marginRight:"6px"}}>{order.orderInfo.buyerInfo?.buyerPhoneAreaCode ? "+"+order.orderInfo.buyerInfo?.buyerPhoneAreaCode : ""}</div>
                                <div style={{fontSize:'14px', wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}>{order.orderInfo.buyerInfo.buyerPhone}</div>
                            </Flex>
                            {/* <Tooltip title="复制">
                                <CopyIcon className='font-14 cursor-pointer'/>
                            </Tooltip> */}
                        </>:<div className="color-7A8499">未提供手机号</div>}
                    </Flex>
                </Form>
                <Divider/>
                <Form>
                    <Flex justify="space-between" style={{marginBottom:"8px"}}>
                        <div className="font-w-600">{intl.formatMessage({ id:'order.orderDetail.deliveryaddress'})}</div>
                        <DeliveryAddressModal />
                    </Flex>
                    {order.orderInfo?.receiverInfo?.deliveryType ? <Tooltip title="复制地址与邮编">
                        <div className="cursor-pointer" onClick={()=>copyAddress()}>
                            <Flex gap={4}>
                                <span className="font-14 color-242833">{order.orderInfo.receiverInfo?.receiverFirstName}</span>
                                <span className="font-14 color-242833">{order.orderInfo.receiverInfo?.receiverLastName}</span>
                            </Flex>
                            <div><span className="font-14 color-242833">{order.orderInfo.receiverInfo?.receiverCompany}</span></div>
                            <div><span className="font-14 color-242833">{order.orderInfo.receiverInfo?.receiverAddress}</span></div>
                            <div><span className="font-14 color-242833">{order.orderInfo.receiverInfo?.receiverAddressAdd}</span></div>
                            <div><span className="font-14 color-242833">{order.orderInfo.receiverInfo?.receiverArea}</span></div>
                            <Flex wrap>
                                <div className="font-14 color-242833" style={{marginRight:"8px"}}>{order.orderInfo.receiverInfo?.receiverCity}</div>
                                <div className="font-14 color-242833" style={{marginRight:"8px"}}>{order.orderInfo.receiverInfo?.receiverProvince}</div>
                                <div className="font-14 color-242833" style={{wordBreak:"break-all"}}>{order.orderInfo.receiverInfo?.receiverPostcode}</div>
                            </Flex>
                            <div><span className="font-14 color-242833">{order.orderInfo.receiverInfo?.receiverCountry}</span></div>
                            <div><span className="font-14 color-242833">{order.orderInfo.receiverInfo?.receiverMobile}</span></div>
                        </div>
                    </Tooltip>:<div className="color-7A8499">暂无收货地址</div>}
                </Form>
                <Divider/>
                <Form>
                    <Flex justify="space-between" style={{marginBottom:"8px"}}>
                        <div className="font-w-600">{intl.formatMessage({ id:'order.orderDetail.billingaddress'})}</div>
                    </Flex>
                    {order.orderInfo.payBillInfo ? order.orderInfo.payBillInfo.sameAsReceiver ? <div className="color-7A8499">与收货地址相同</div>:<>
                        <Flex>
                            <span className="font-14 color-242833">{order.orderInfo.payBillInfo?.billingFirstName}</span>
                            <span className="font-14 color-242833">{order.orderInfo.payBillInfo?.billingLastName}</span>
                        </Flex>
                        <div><span className="font-14 color-242833">{order.orderInfo.payBillInfo?.billingCompany}</span></div>
                        <div><span className="font-14 color-242833">{order.orderInfo.payBillInfo?.billingAddress}</span></div>
                        <div><span className="font-14 color-242833">{order.orderInfo.payBillInfo?.billingAddressAdd}</span></div>
                        <Flex wrap>
                            <div className="font-14 color-242833" style={{marginRight:"8px"}}>{order.orderInfo.payBillInfo?.billingCity}</div>
                            <div className="font-14 color-242833" style={{marginRight:"8px"}}>{order.orderInfo.payBillInfo?.billingProvince}</div>
                            <div className="font-14 color-242833" style={{wordBreak:"break-all"}}>{order.orderInfo.payBillInfo?.billingPostcode}</div>
                        </Flex>
                        <div><span className="font-14 color-242833">{order.orderInfo.payBillInfo?.billingCountry}</span></div>
                        <div><span className="font-14 color-242833">{order.orderInfo.payBillInfo?.billingMobile}</span></div>
                    </>:<div className="color-7A8499">暂无账单地址</div>}
                </Form>
                {/* <Form>
                    <div className="font-w-600" style={{marginBottom:"8px"}}>市场</div>
                    <div>United States</div>
                    <div>美国 (USD)</div>
                </Form> */}
                {order.orderInfo.receiverInfo?.receiverCertificatesNo && <>
                    <Divider/>
                    <Form>
                        <Flex style={{marginBottom:"8px"}} justify="space-between" align="center">
                            <div className="font-w-600">护照号/身份证号</div>
                            <AddIDCard />
                        </Flex>
                        <div>{order.orderInfo.receiverInfo?.receiverCertificatesNo}</div>
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