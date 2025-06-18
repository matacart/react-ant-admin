
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { AddIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { getCityList, getProvinceList, setOrderShippingAddress } from "@/services/y2/api";
import { Checkbox, Col, Flex, Form, Input, Modal, Row, Select, Space } from "antd"
import { useEffect, useState } from "react";
import { styled } from 'styled-components';

const { TextArea } = Input;

function RemarksModal(){

    const [open, setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const submit = ()=>{
        // form.validateFields().then((values)=>{
        //     setLoading(true)
        //     setOrderShippingAddress({
        //         orderId:order.orderInfo.order_id,
        //         ...values,
        //         deliveryName:values.deliveryFirstname+values.deliveryLastname
        //     }).then(res=>{
        //         // 更新订单数据
        //         order.triggerRefresh();
        //         setOpen(false);
        //     }).catch(error=>{
        //         console.log(error)
        //     }).finally(()=>{
        //         setLoading(false)
        //     })
        // })
    }
    const cancel = () => {
        setOpen(false);
    };

    useEffect(()=>{
        
    },[])

    return (
        <>
            <>
                <Flex gap={4} className="cursor-pointer" style={{border:"1px dashed #d7dbe7",padding:"4px 8px",borderRadius:"4px",backgroundColor:"#FFF",width:"100%"}} onClick={()=>{
                    form.resetFields()
                    setOpen(true)
                }}>
                    <AddIcon className="font-16" />
                    <div>添加备注</div>
                </Flex>
            </>
            <MyModal
                title={"添加备注"}
                open={open}
                width={480}
                onCancel={cancel}
                centered
                classNames={{content:'my-modal-content',header:"my-modal-head",footer:"my-modal-foot",body:"my-modal-body"}}
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" className="my-form" initialValues={{
                }}>
                    <Form.Item label={false} name="remarks">
                        <TextArea
                            onChange={(e) => {}}
                            showCount
                            maxLength={1000}
                            placeholder="请输入"
                            autoSize={{ minRows: 5, maxRows: 5 }}
                        />
                        <div className="color-7A8499" style={{marginTop:"12px"}}>仅后台管理员可见，将不会展示给客户</div>
                   </Form.Item>
                </Form>
            </MyModal>
        </>
    )
}

const MyModal = styled(Modal)`
    .my-form{
        padding-top: 20px;
    }
`

export default RemarksModal