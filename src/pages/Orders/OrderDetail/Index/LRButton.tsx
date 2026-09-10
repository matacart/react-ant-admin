import ButtonIcon from "@/components/Button/ButtonSvg"
import { LeftIcon, RightIcon } from "@/components/Icons/Icons"
import { getOrderSubIdScroll } from "@/services/y2/apiStore"
import order from "@/store/order/order"
import { history } from "@umijs/max"
import { App, Flex } from "antd"
import { useEffect, useState } from "react"

interface OrderSubIdScroll{
    nextDataList:string[],
    previousDataList:string[],
}

function LRButton({orderSeq}:{orderSeq:string}) {

    const { message } = App.useApp();

    const [orderSubIdScroll, setOrderSubIdScroll] = useState<OrderSubIdScroll>({
        nextDataList:[],
        previousDataList:[],
    });

    useEffect(()=>{
        getOrderSubIdScroll({
            sinceOrderSeq:orderSeq,
            languages_id:order.languages,
        }).then(res=>{
            setOrderSubIdScroll(res.data)
        }).catch(err=>{
            message.error("失败，请重试")
        })
    },[orderSeq])


    return (
        <Flex gap={12}>
            <ButtonIcon icon={<LeftIcon className='font-20' />} style={{backgroundColor:"#FFF",color:"#242833"}} disabled={(orderSubIdScroll?.previousDataList?.length ?? 0) === 0} onClick={()=>{
                const prevOrderSeq = orderSubIdScroll?.previousDataList?.[0]
                prevOrderSeq && history.push(`/orders/${prevOrderSeq}/${order.languages}`)
            }} />
            <ButtonIcon icon={<RightIcon className='font-20' />} style={{backgroundColor:"#FFF",color:"#242833"}} disabled={(orderSubIdScroll?.nextDataList?.length ?? 0) === 0} onClick={()=>{
                const nextOrderSeq = orderSubIdScroll?.nextDataList?.[0]
                nextOrderSeq && history.push(`/orders/${nextOrderSeq}/${order.languages}`)
            }} />
        </Flex>
    )
}
export default LRButton


