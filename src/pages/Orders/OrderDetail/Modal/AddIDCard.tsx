import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import { setOrderIdNumber } from "@/services/y2/api";
import order from "@/store/order/order";
import { Checkbox, Flex, Form, Input, Modal, Space } from "antd"
import { useEffect, useRef, useState } from "react";
import { styled } from 'styled-components';


function AddIDCard(){

    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();

    const [loading,setLoading] = useState(false);

    const submit = ()=>{
        // 更新订单数据
        form.validateFields().then((values)=>{
            setLoading(true)
            setOrderIdNumber({
                orderId: order.orderInfo.order_id,
                idNumber: values.IDCard
            }).then(()=>{
                order.triggerRefresh()
                setOpen(false);
            }).catch(()=>{

            }).finally(()=>{
                setLoading(false)
            })
        })
    }

    const cancel = () => {
        setOpen(false);
    };

    return (
        <>
            {order.orderInfo.customer_id_number ? <span onClick={()=>{
                setOpen(true)
            }} className="color-356DFF cursor-pointer">编辑</span>:<a onClick={()=>setOpen(true)} className="color-356DFF">添加护照号/身份证号</a>}
            <Modal title={<div>{order.orderInfo.customer_id_number ? "编辑":"添加"}护照号/身份证号</div>} width={620} centered open={open} onOk={submit} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" style={{margin:"20px 0 40px"}}>
                    <Form.Item required={false} label="护照号/身份证号" name="IDCard" rules={[
                        { required: true, message: '请输入护照号/身份证号' }
                    ]}>
                        <MyInput style={{height:"36px"}} placeholder="请输入护照号/身份证号" />
                    </Form.Item>
                    <Checkbox>向客户发送通知</Checkbox>
                </Form>
            </Modal>
        </>
    )
}


const Scoped = styled.div`
    
`



export default AddIDCard