import { App, Card, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import { useIntl } from "@umijs/max";
import order from "@/store/order/order";
import styled from "styled-components";
import { CopyIcon } from "@/components/Icons/Icons";
import copy from "copy-to-clipboard";
import abandonedOrder from "@/store/order/abandonedOrder/abandonedOrder";
import { useEffect } from "react";

function CustomsInformation() {

    const { message } = App.useApp();


    useEffect(()=>{

        // console.log(abandonedOrder.abandonedOrderData?.buyerInfo?.buyerSex);
    },[])

    const intl = useIntl();

    return (
        <MyCard
            title={<div className="font-w-600 font-16">客户</div>}
        >
            <Flex vertical gap={4}>
                <span style={{fontSize:'14px',color:'#356DFF'}}>{abandonedOrder.abandonedOrderData?.buyerInfo?.buyerNick}</span>
                <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>性别：{"2" == "2"?"女":"未知"}</span> 
                <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>客户邮箱：{abandonedOrder.abandonedOrderData?.buyerInfo?.buyerEmail}</span>
                <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>客户电话：-</span>
                <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>会员优惠：否</span>
                <span style={{fontSize:'14px',color:'#242833', margin:'0'}}>历史购买：0单</span>
            </Flex>
            <Divider/>
            <>
                <Flex style={{marginBottom:"8px"}} justify="space-between" align="center">
                    <div className="font-w-600">物流方式</div>
                </Flex>
                <Flex vertical gap={4}>
                    <div>运费：无运费</div>
                </Flex>
            </>
            <Divider/>
            <Flex justify="space-between">
                <div className="font-w-600" style={{marginBottom:"8px"}}>收货地址</div>
            </Flex>
            {abandonedOrder.abandonedOrderData.receiverInfo ? <>
                <Flex>
                    <span className="font-14 color-242833">{abandonedOrder.abandonedOrderData.receiverInfo?.receiverFirstName}</span>
                    <span className="font-14 color-242833">{abandonedOrder.abandonedOrderData.receiverInfo?.receiverLastName}</span>
                </Flex>
                <div><span className="font-14 color-242833">{abandonedOrder.abandonedOrderData.receiverInfo?.receiverCompany}</span></div>
                <div><span className="font-14 color-242833">{abandonedOrder.abandonedOrderData.receiverInfo?.receiverAddress}</span></div>
                <div><span className="font-14 color-242833">{abandonedOrder.abandonedOrderData.receiverInfo?.receiverAddressAdd}</span></div>
                <Flex wrap>
                    <div className="font-14 color-242833" style={{marginRight:"8px"}}>{abandonedOrder.abandonedOrderData.receiverInfo?.receiverArea}</div>
                    <div className="font-14 color-242833" style={{marginRight:"8px"}}>{abandonedOrder.abandonedOrderData.receiverInfo?.receiverCity}</div>
                    <div className="font-14 color-242833" style={{wordBreak:"break-all"}}>{abandonedOrder.abandonedOrderData.receiverInfo?.receiverProvince}</div>
                </Flex>
                <div><span className="font-14 color-242833">{abandonedOrder.abandonedOrderData.receiverInfo?.receiverCountry}</span></div>
                <div><span className="font-14 color-242833">{abandonedOrder.abandonedOrderData.receiverInfo?.receiverMobile}</span></div>
            </>:<div className="color-7A8499">暂无收货地址</div>}
            <Divider/>
            <div className="font-w-600" style={{marginBottom:"8px"}}>账单地址</div>
            {
                abandonedOrder.abandonedOrderData.payBillInfo ? parseInt(abandonedOrder.abandonedOrderData.payBillInfo?.is_same_delivery) == 1 ? <div className="color-7A8499">与收货地址相同</div>:
                <>
                    <span className="font-14 color-242833">{abandonedOrder.abandonedOrderData.payBillInfo?.billing_name}</span>
                </>:<div className="color-7A8499">暂无账单地址</div>
            }
        </MyCard>
    );
}

const MyCard = styled(Card)`
    
`

export default observer(CustomsInformation);