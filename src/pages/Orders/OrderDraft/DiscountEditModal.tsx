import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import NumberInput from "@/components/Input/NumberInput";
import orderDraft from "@/store/order/orderDraft";
import { Checkbox, Flex, Form, Input, Modal } from "antd"
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import cookie from 'react-cookies';

function DiscountEditModal({pricing,disable}:{pricing:number,disable:boolean}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const submit = ()=>{
        form.validateFields().then((values)=>{
            orderDraft.setOrderInfo({
                ...orderDraft.orderInfo,
                orderDiscount:values.amount?values.amount:0,
                orderDiscountDesc:values.explanation?values.explanation:"",
                isDiscountAccumulation:values.isSuperposition?1:0
            })
            setIsModalOpen(false);
        }).catch(error=>{

        })
        // 更新订单数据
    }

    const cancel = () => {
        form.setFieldsValue({
            amount:orderDraft.orderInfo.orderDiscount,
            explanation:orderDraft.orderInfo.orderDiscountDesc,
            isSuperposition:orderDraft.orderInfo.isDiscountAccumulation == 1
        })
        setIsModalOpen(false);
    };

    const remove = ()=>{
        orderDraft.setOrderInfo({
            ...orderDraft.orderInfo,
            orderDiscount:0,
            orderDiscountDesc:"",
            isDiscountAccumulation:0
        })
        form.setFieldsValue({
            amount:undefined,
            explanation:"",
            isSuperposition:false
        })
        setIsModalOpen(false);
    }

    useEffect(()=>{
        form.setFieldsValue({
            amount:orderDraft.orderInfo.orderDiscount,
            explanation:orderDraft.orderInfo.orderDiscountDesc,
            isSuperposition:orderDraft.orderInfo.isDiscountAccumulation == 1
        })
    },[])

    return (
        <>
            <a onClick={()=>setIsModalOpen(true)} style={{width:"20%"}} className={disable?"color-B8BECC":"color-356DFF"}>编辑折扣</a>
            <Modal title={<div>编辑折扣</div>} centered open={isModalOpen} width={480} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="space-between">
                        {false?<DangerButton text={"移除折扣"} onClick={remove} />:<div></div>}
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"更新"} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" style={{marginTop:"20px"}}>
                    <FormItem label="折扣金额" name="amount" rules={[
                        {
                            validator: (_, value) => 
                                value && value > pricing ? Promise.reject(new Error(`折扣金额不得大于当前订单商品金额`)) : Promise.resolve()
                        }
                    ]}>
                        <NumberInput style={{width:"100%"}} min={0} prefix={cookie.load("symbolLeft") || ""} />
                    </FormItem>
                    <FormItem label="折扣说明" name="explanation">
                        {/* <Input /> */}
                        <DefaultInput placeholder="折扣说明" />
                    </FormItem>
                    <FormItem label={false} name="isSuperposition" valuePropName="checked">
                        <Checkbox style={{marginBottom:"12px"}}>允许与其它折扣叠加</Checkbox>
                    </FormItem>
                </Form>
            </Modal>
        </>
    )
}



export default DiscountEditModal