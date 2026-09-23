import { CopyIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import { App, Button, Card, Flex, Space } from "antd";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import abandonedOrder from "@/store/order/abandonedOrder/abandonedOrder";
import RecallEmailModal from "./RecallEmailModal";
import { useEffect, useState } from "react";
import cookie from 'react-cookies';
import { usePrimaryDomain } from "@/hooks/customHooks";


const RecallOfMail = () => {

    const { message } = App.useApp();

    const [paymentUrl,setPaymentUrl] = useState("");


    const copyHandle = ()=>{
        copy(abandonedOrder.abandonedOrderData?.abandonedOrderPaymentUrl || "")
        message.success("复制成功")
    }

    useEffect(()=>{
        const domain = cookie.load("domain") || {};
        if(domain){
            const primaryDomain = usePrimaryDomain();
            setPaymentUrl(`${primaryDomain}/${domain?.id || ""}/checkouts/${abandonedOrder.abandonedOrderData?.checkoutsToken || ""}`);
        }
    },[])

    return (
        <MyCard>
            <div className='title'>
                发送链接给客户，以便于继续购买
            </div>
            <Flex gap={12}>
                <Space.Compact block className="input-space">
                    <MyInput style={{ width: '100%' }} disabled value={paymentUrl} />
                    <Button className="input-space-icon" icon={<CopyIcon />} onClick={copyHandle} />
                </Space.Compact>
                <RecallEmailModal />
            </Flex>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .title {
        margin-bottom: 12px;
        font-weight: 700;
    }

    .input-space-icon{
        width: 36px;
        height: 36px;
    }
`


export default RecallOfMail;