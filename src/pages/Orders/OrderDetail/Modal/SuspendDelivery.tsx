import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import NumberInput from "@/components/Input/NumberInput";
import MySelect from "@/components/Select/MySelect";
import { pauseOrderShipping, setCancelOrder, splitOrderProducts } from "@/services/y2/api";
import order from "@/store/order/order";
import { Checkbox, Flex, Form, Input, message, Modal, Table, TableProps } from "antd";
import { cloneDeep } from "lodash";
import { toJS } from "mobx";
import { useEffect, useState } from "react";
import styled from "styled-components";


const reasonOptions = [
    {
        label:"缺货",
        value:"1",
    },
    {
        label:"地址错误",
        value:"2",
    },
    {
        label:"高欺诈风险",
        value:"3",
    },
    {
        label:"等待付款",
        value:"4",
    },
    {
        label:"其它",
        value:"0",
    }
]

function SplitPackage({groupIndex}:{groupIndex:number}){

    const [form] = Form.useForm();

    const [open,setOpen] = useState(false);

    const remainingInfo = order.remainingProductGroup[groupIndex]

    const [loading,setLoading] = useState(false);

    const [reasonValue,setReasonValue] = useState<string | undefined>(undefined);

    // 原因说明
    const [reasonDetail,setReasonDetail] = useState<string>("");
   
    const cancel = ()=>{
        setReasonValue(undefined);
        setReasonDetail("");
        setOpen(false);
    }

    const submit = ()=>{
        setLoading(true);
        pauseOrderShipping({
            orderId:order.orderInfo.order_id,
            fulfillmentId:remainingInfo.fulfillment.fulfillment_id,
            pauseReason:reasonValue??"",
            ...(reasonValue == "0" && {pauseReasonDetail:reasonDetail})
        }).then((res)=>{
            setOpen(false);
            order.triggerRefresh();
        }).catch((err)=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
      
    },[])

    return (
        <>
            <a className="cursor-pointer" onClick={() => setOpen(true)}><span>暂停发货</span></a>
            <MyModal title="暂停发货" width={620} open={open} onCancel={cancel} centered
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"暂停发货"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <div className="warp">
                    <div style={{marginTop:"24px",marginBottom:"8px"}} className="font-w-500">请选择暂停发货的原因</div>
                    <div>
                        <MySelect style={{width:"100%",height:"36px"}} value={reasonValue} placeholder="选择原因" onChange={(value:string)=>{
                            setReasonValue(value)
                        }} options={reasonOptions} />
                    </div>
                    <div style={{marginTop:"8px",marginBottom:"16px"}}>只有你和你的员工能看到此原因</div>
                    {reasonValue == "0" && <>
                        <div style={{marginBottom:"8px"}} className="font-w-500">填写原因(选填)</div>
                        <div>
                            <MyInput style={{width:"100%",height:"36px"}} value={reasonDetail} onChange={(e:any)=>{
                                setReasonDetail(e.target.value)
                            }} />
                        </div>
                    </>}
                </div>
            </MyModal>
        </>
    );

}

const MyModal = styled(Modal)`
   .warp{
       padding-bottom: 12px;
   }
`

export default SplitPackage;