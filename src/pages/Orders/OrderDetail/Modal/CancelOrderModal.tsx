import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { setCancelOrder } from "@/services/y2/api";
import order from "@/store/order/order";
import { Checkbox, Flex, Form, Input, Modal, Radio } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";


const { TextArea } = Input;

function CancelOrderModal(){

    const [form] = Form.useForm();

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [isRefund,setIsRefund] = useState(0)

    const cancel = ()=>{
        setOpen(false);
    }

    const submit = ()=>{
        form.validateFields().then(values=>{
            setLoading(true)
            setCancelOrder({
                orderId:order.orderInfo.order_id,
                restoreInventory:values.inventory ? 1 : 0,
                cancelReason:values.remarks
            }).then(res=>{
                order.triggerRefresh();
                setOpen(false)
            }).catch(()=>{
            }).finally(()=>{
                setLoading(false)
            })
        })
    }

    return (
        <>
            <a className="cursor-pointer" onClick={() => setOpen(true)}><span>取消订单</span></a>
            <MyModal title="取消订单" width={620} open={open} onCancel={cancel} centered
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"取消订单"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
               <Form form={form} layout="vertical" style={{marginTop:"24px",marginBottom:"40px"}}>
                    {order.orderInfo.payment_status == 1 ? <Form.Item className="item" label={<div className="font-w-500 color-242833">退款</div>}>
                            <Radio.Group className="radio-group" onChange={(e)=>{
                                setIsRefund(e.target.value)
                            }}>
                                <div style={{marginBottom:"8px"}}>
                                    <Radio value={0}>退款</Radio>
                                    {isRefund == 0 && <div style={{fontSize: 14 , marginLeft:"24px",marginTop:"4px"}}>{order.orderInfo.payment_method} {`(${order.orderTotal[2].text})`}</div>}
                                </div>
                                <div>
                                    <Radio value={1}>暂不退款</Radio>
                                    {isRefund == 1 && <div style={{fontSize: 14 , marginLeft:"24px",marginTop:"4px"}}>不立即向客户退款，请稍后处理。</div>}
                                </div>
                            </Radio.Group>
                        </Form.Item> : <>
                        <Form.Item label={<div className="font-w-500 color-242833">取消交易单</div>}>
                            <div>{order.orderInfo.payment_method} {`(${order.orderTotal[2].text})`}</div>
                        </Form.Item>
                    </>}
                    <Form.Item name="inventory" label={<div className="font-w-500 color-242833">库存</div>} valuePropName="checked">
                        <Checkbox>重新入库商品</Checkbox>
                    </Form.Item>
                    <div className="font-12 item" style={{marginLeft:"24px",marginTop:"4px"}}>取消勾选后，商品库存需要手动入库</div>
                    {isRefund == 0 && <Form.Item name="notice" className="item" label={<div className="font-w-500 color-242833">通知</div>} valuePropName="checked">
                        <Checkbox>给客户发送通知</Checkbox>
                    </Form.Item>}
                    <Form.Item label={<div className="font-w-500 color-242833">备注</div>} name="remarks">
                        <TextArea
                            showCount
                            maxLength={120}
                            placeholder="备注"
                            style={{ height: "90px", resize: 'none' }}
                        />
                    </Form.Item>
               </Form>
            </MyModal>
        </>
    );

}

const MyModal = styled(Modal)`

    .radio-group{
        display: flex;
        flex-direction: column;
        gap: 8;
    }
    .ant-form-item{
        margin-bottom: 0;
    }
    .item{
        margin-bottom: 20px;
    }
`

export default CancelOrderModal;