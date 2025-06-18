import { Badge, Button, Card, Checkbox, Divider, Flex, Form, Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useEffect, useState } from "react";
import MyButton from "@/components/Button/MyButton";
import NumberInput from "@/components/Input/NumberInput";
import orderRefund from "@/store/order/orderRefund";
import { setOrderRefunded } from "@/services/y2/api";
import MyAlert from "@/components/Alert/MyAlert";
import { useNavigate } from "react-router-dom";

function RefundAmount() {

    const [loading,setLoading] = useState(false)

    const navigate  = useNavigate(); 
    // 需要退款总额
    const [refundAmount,setRefundAmount] = useState(0)
    // 是否全额退
    const [isFullRefund,setIsFullRefund] = useState(false)

    const submit = ()=>{

        const res = {
            orderId:orderRefund.orderInfo.order_id,
            refundNote:orderRefund.remarks,
            refundType:isFullRefund?1:2,
            // 
            refundAmount:orderRefund.refundAmount,
            refundProducts:JSON.stringify(orderRefund.refundProducts),
            // refundProducts:orderRefund.refundProducts
        }

        setLoading(true)
        setOrderRefunded(res).then(res=>{
            navigate(`/orders/${orderRefund.orderInfo.order_id}`)
        }).catch(err=>{

        }).finally(()=>{
            setLoading(false)
        })

    }

    useEffect(()=>{
        let countPrice = 0
        let newRefundProducts:any[] = []
        orderRefund.remainingProductGroup.forEach((item:any)=>{
            item.product.forEach((product:any)=>{
                if(product.num>0){
                    newRefundProducts.push({
                        ordersProductId:product.id,
                        refundQuantity:product.num,
                    })
                    countPrice += product.num*product.final_price
                }
            })
        })
        orderRefund.shippedProductGroup.forEach((item:any)=>{
            item.product.forEach((product:any)=>{
                if(product.num>0){
                    newRefundProducts.push({
                        ordersProductId:product.id,
                        refundQuantity:product.num,
                    })
                    countPrice += product.num*product.final_price
                }
            })
        })

        orderRefund.returnedProductGroup.forEach((item:any)=>{
            item.product.forEach((product:any)=>{
                if(product.num>0){
                    newRefundProducts.push({
                        ordersProductId:product.id,
                        refundQuantity:product.num,
                    })
                    countPrice += product.num*product.final_price
                }
            })
        })
       
        setRefundAmount(countPrice)
        setIsFullRefund(true)
        // 实际退款金额
        orderRefund.setRefundAmount(countPrice)
        orderRefund.setRefundProducts(newRefundProducts)

    },[orderRefund.remainingProductGroup,orderRefund.shippedProductGroup,orderRefund.returnedProductGroup])

    return (
        <Scoped>
            <Card className="card">
                <Flex justify="space-between" align="center" style={{marginBottom:"16px"}}>
                    <div className="font-w-500 font-16">退款金额</div>
                </Flex>
                <div className="font-12 color-474F5E" style={{marginBottom:"8px"}}>PayPal offline payment</div>
                <div style={{marginBottom:"8px"}}>
                    <NumberInput value={orderRefund.refundAmount} prefix="US$" min={0} style={{width:"100%"}} onChange={(value:number)=>{
                        orderRefund.setRefundAmount(value)
                        refundAmount == value ? setIsFullRefund(true):setIsFullRefund(false)
                    }} />
                </div>
                <div className="font-12 color-474F5E">最高可退 US$10000.00</div>
                <div style={{marginTop:"16px"}} className="color-474F5E">
                    <Checkbox>给客户发送通知</Checkbox>
                </div>
                <Divider/>
                {!isFullRefund && <MyAlert className="my-alert" message="您正在退款的金额与建议的退款总额不同。" showIcon type="info" />}
                <MyButton type="primary" text="退款" style={{width:"100%"}} loading={loading} onClick={submit} />
            </Card>
        </Scoped>
    );
}

const Scoped = styled.div`
    .card{
        background-color: #F7F8FB;
    }
    .my-alert{
        margin-bottom:20px;
        border: none;
        align-items: flex-start;
        background-color: #dfe8ff;
        .anticon{
            position: relative;
            top: 4px;
        }
    }
`

export default observer(RefundAmount);