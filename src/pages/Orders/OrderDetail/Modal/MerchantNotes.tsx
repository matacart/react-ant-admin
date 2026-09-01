import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { addOrderRemark } from "@/services/y2/api";
import order from "@/store/order/order";
import { Flex, Form, Input, Modal } from "antd";
import { useState } from "react";
import dayjs from 'dayjs';
import styled from "styled-components";

const { TextArea } = Input;

function MerchantNotes() {

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const cancel = ()=>{
        setOpen(false)
    }

    // 提交
    const submit = ()=>{
        form.validateFields().then((values)=>{
            setLoading(true)
            addOrderRemark({
                orderId:order.orderInfo.orderSeq,
                remark:values.notes
            }).then(res=>{
                order.triggerRefresh()
                form.resetFields();
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                setLoading(false)
                setOpen(false);
            })
        }).catch(err=>{
        })
    }

    return (
        <>
            <span className="color-356DFF cursor-pointer" onClick={() =>setOpen(true)}>编辑</span>
            <ScopedModal title="商家备注" width={620} open={open} onCancel={cancel} centered 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton loading={loading} text={"添加"} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <div>
                {order.orderInfo?.orderRemarks?.length > 0 && order.orderInfo?.orderRemarks.map((item:any,index)=>(
                    <div className="item" key={index}>
                        <div style={{marginBottom:"4px"}} className="color-474F5E">{item.actionDetails?.sellerRemark}</div>
                        <div className="color-7A8499">{dayjs(parseInt(item.operationTime)*1000).format("YYYY/MM/DD HH:mm:ss")}</div>
                    </div>
                ))}
                </div>
                <Form form={form} layout="vertical" className="warp">
                    <Form.Item required={false} name={"notes"} rules={[{ required: true, message: '请输入备注' }]}>
                        <TextArea
                            maxLength={1000}
                            showCount 
                            placeholder="输入备注内容"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>
                </Form>
            </ScopedModal>
        </>
    );
}

const ScopedModal = styled(Modal)`
    .warp{
        margin-top: 20px;
        max-height: 380px;
        overflow-y: auto;
        .item{
            padding: 8px 12px;
            background-color: #F7F8FB;
            margin-bottom: 12px;
        }
    }

`

export default MerchantNotes