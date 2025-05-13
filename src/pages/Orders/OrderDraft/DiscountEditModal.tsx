import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import NumberInput from "@/components/Input/NumberInput";
import order from "@/store/order/order";
import { Checkbox, Flex, Form, Input, Modal } from "antd"
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import cookie from 'react-cookies';

function DiscountEditModal({pricing}:{pricing:number}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const submit = ()=>{
        form.validateFields().then((values)=>{
            order.setOrderInfo({
                ...order.orderInfo,
                discountAmount:values.amount?values.amount:0,
                discountDesc:values.explanation?values.explanation:"",
                isDiscountAccumulation:values.isSuperposition?1:0
            })
            setIsModalOpen(false);
        }).catch(error=>{

        })
        // 更新订单数据
    }

    const cancel = () => {
        form.setFieldsValue({
            amount:order.orderInfo.discountAmount,
            explanation:order.orderInfo.discountDesc,
            isSuperposition:order.orderInfo.isDiscountAccumulation == 1
        })
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const remove = ()=>{
        order.setOrderInfo({
            ...order.orderInfo,
            discountAmount:0,
            discountDesc:"",
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
            amount:order.orderInfo.discountAmount,
            explanation:order.orderInfo.discountDesc,
            isSuperposition:order.orderInfo.isDiscountAccumulation == 1
        })
    },[])

    return (
        <>
            <a onClick={()=>setIsModalOpen(true)} style={{width:"20%"}}>编辑折扣</a>
            <Modal title={<div>编辑折扣</div>} centered open={isModalOpen} onOk={handleOk} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="space-between">
                        <DangerButton text={"移除折扣"} onClick={remove} />
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"更新"} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical">
                    <FormItem label="折扣金额" name="amount" rules={[
                        {
                            validator: (_, value) => 
                                value && value > pricing ? Promise.reject(new Error(`折扣金额不得大于当前订单商品金额`)) : Promise.resolve()
                        }
                    ]}>
                        <NumberInput min={0} prefix={cookie.load("symbolLeft") || ""} />
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