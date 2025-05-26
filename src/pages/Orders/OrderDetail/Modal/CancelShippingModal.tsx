import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { cancelOrderShipment } from "@/services/y2/api";
import order from "@/store/order/order";
import { Flex, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

function CancelShippingModal({shipment}:{shipment:any}){

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const cancel = ()=>{
        setOpen(false);
    }

    const submit = ()=>{
        setLoading(true)
        cancelOrderShipment({
            orderId:order.orderInfo.order_id,
            shippingSn:shipment.shipping_sn,
            shipmentId:shipment.shipment_id
        }).then(res=>{
            notification.success({
                message: <div className="font-14 font-w-500">已取消发货</div>,
            })
            order.triggerRefresh()
        }).catch(error=>{
            notification.error({
                message: <div className="font-14 font-w-500">取消发货失败</div>,
            })
        }).finally(()=>{
            setLoading(false)
            setOpen(false)
        })
    }

    return (
        <>
            <a className="cursor-pointer" onClick={() => setOpen(true)}><span className="color-F86140">取消发货</span></a>
            <MyModal title="申请取消发货" width={620} open={open} onCancel={cancel} centered
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"暂不取消"} onClick={cancel} />
                            <PrimaryButton text={"确认取消"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
               <div style={{marginTop:"24px",marginBottom:"24px"}}>
                    <div>取消发货后将向物流商发起取消寄件申请，请在[配送状态] 查看结果。</div>
                    <div>- 若成功取消，状态会转为[取消寄件]，你可以自由编辑订单</div>
                    <div>- 若取消失败，取消寄件按钮不会展示，代表物流商已不接受取消</div>
               </div>
            </MyModal>
        </>
    );

}

const MyModal = styled(Modal)`
   
`

export default CancelShippingModal;