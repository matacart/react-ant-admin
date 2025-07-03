import MyDatePicker from "@/components/DatePicker/MyDatePicker";
import MySelectIcon from "@/components/Select/MySelectIcon";
import { Flex, Form, Modal, Popconfirm } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import styled from "styled-components";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { delOrderPaymentTerm, setOrderPaymentTerm } from "@/services/y2/api";
import order from "@/store/order/order";
import { WarningIcon } from "@/components/Icons/Icons";
import MyButton from "@/components/Button/MyButton";

function AddPaymentPeriod() {

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [paymentTerm,setPayMentTerm] = useState<string|undefined>(undefined);

    const [date,setDate] = useState<string>(dayjs().add(1,"day").format("YYYY-MM-DD"));

    const [deadline,setDeadline] = useState<string>(dayjs().add(1,"day").format("YYYY-MM-DD"));

    const options = [
        {
            value: 'full_payment_on_invoice',
            label: '发送账单时全额付款',
        },
        {
            value: 'full_payment_on_shipment',
            label: '订单发货时全额付款',
        },
        {
            value: 'full_payment_by_date',
            label: '指定日期前全额付款',
        },
        {
            value: 'full_payment_in_7_days',
            label: '7天内全额付款',
        },
        {
            value: 'full_payment_in_15_days',
            label: '15天内全额付款',
        },
        {
            value: 'full_payment_in_30_days',
            label: '30天内全额付款',
        },
        {
            value: 'full_payment_in_45_days',
            label: '45天内全额付款',
        },
        {
            value: 'full_payment_in_60_days',
            label: '60天内全额付款',
        },
        {
            value: 'full_payment_in_90_days',
            label: '90天内全额付款',
        },
    ];

    const cancel = ()=>{
        setPayMentTerm(undefined);
        setDate(dayjs().add(1,"day").format("YYYY-MM-DD"))
        setDeadline(dayjs().add(1,"day").format("YYYY-MM-DD"))
        setOpen(false);
    }

    const submit = ()=>{
        if(paymentTerm){
            setLoading(true)
            setOrderPaymentTerm({
                orderId:order.orderInfo.order_id,
                paymentTerm:paymentTerm,
                startDate:(paymentTerm == "full_payment_on_invoice" || paymentTerm == "full_payment_on_shipment") ? dayjs(new Date()).unix():dayjs(date).unix()
            }).then(res=>{
                setOpen(false)
                order.triggerRefresh()
            }).catch(e=>{ 
            }).finally(()=>{
                setLoading(false)
            })
        }
    }

    const remove = ()=>{
        delOrderPaymentTerm({
            orderId:order.orderInfo.order_id,
        }).then(res=>{
            order.triggerRefresh()
            setOpen(false)
        }).catch(e=>{ 
        }).finally(()=>{

        })
    }

    return (
        <Scoped>
            <span className="color-356DFF cursor-pointer text-hover-underline" onClick={() => {
                setOpen(true)
                if(order.orderInfo.payment_term){
                    setDate(dayjs(order.orderInfo.payment_start_date*1000).format('YYYY-MM-DD'))
                }else{
                    setDate(dayjs().add(1,"day").format("YYYY-MM-DD"))
                }
                setPayMentTerm(order.orderInfo.payment_term == "" ?undefined : order.orderInfo.payment_term)
            }}>{order.orderInfo.payment_term ? "编辑期限":"添加期限"}</span>
            <Modal title="添加付款期限" open={open} onCancel={cancel} centered 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    order.orderInfo.payment_term ? <>
                        <Flex justify="space-between">
                            <Popconfirm
                                title="你确认要删除该付款期限吗?"
                                okText="确定"
                                icon={<WarningIcon style={{ color: '#F86140' }} />}
                                cancelButtonProps={{style: { fontSize: '12px' }}}
                                okButtonProps={{style: { fontSize: '12px',backgroundColor:"#F86140" }}}
                                cancelText="取消"
                                onConfirm={remove}
                            >
                                <MyButton color="danger" variant="outlined" text={"删除期限"} style={{height:"36px"}} />
                            </Popconfirm>
                            <Flex gap={12} justify="end">
                                <DefaultButton text={"取消"} onClick={cancel} />
                                <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                            </Flex>
                        </Flex>
                    </>:<>
                        <Flex gap={12} justify="end">
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                        </Flex>
                    </>
                )}
            >
                <Form layout="vertical" style={{marginTop:"20px"}}>
                    <Form.Item label={<div className="font-w-500" style={{paddingBottom:"8px"}}>付款期限</div>}>
                        <MySelectIcon style={{height:"36px"}} options={options} placeholder="请选择" value={paymentTerm} onChange={(value:string)=>{
                            setPayMentTerm(value);
                            switch (value) {
                                case "full_payment_by_date":
                                    setDeadline(date);
                                    break;
                                case "full_payment_in_7_days":
                                    setDeadline(dayjs(date).add(7,"day").format("YYYY-MM-DD"));
                                    break;
                                case "full_payment_in_15_days":
                                    setDeadline(dayjs(date).add(15,"day").format("YYYY-MM-DD"));
                                    break;
                                case "full_payment_in_30_days":
                                    setDeadline(dayjs(date).add(30,"day").format("YYYY-MM-DD"));
                                    break;
                                case "full_payment_in_45_days":
                                    setDeadline(dayjs(date).add(45,"day").format("YYYY-MM-DD"));
                                    break;
                                case "full_payment_in_60_days":
                                    setDeadline(dayjs(date).add(60,"day").format("YYYY-MM-DD"));
                                    break;
                                case "full_payment_in_90_days":
                                    setDeadline(dayjs(date).add(90,"day").format("YYYY-MM-DD"));
                                    break;
                            }
                        }} />
                        {(paymentTerm == "full_payment_on_invoice" || paymentTerm == "full_payment_on_shipment") && <div style={{marginTop:"16px"}} className="color-474F5E">
                            <span className="font-w-600">客户应在账单发送后的24小时内完成付款。</span>
                            设置付款<Link to="" className="color-356DFF">通知邮件</Link>
                        </div>}
                    </Form.Item>
                    {(paymentTerm && paymentTerm !== "full_payment_on_invoice" && paymentTerm !== "full_payment_on_shipment") && <Form.Item label={<div className="font-w-500" style={{paddingBottom:"8px"}}>{paymentTerm == "full_payment_by_date"?"指定日期":"开始日期"}</div>}>
                        <MyDatePicker style={{height:"36px",width:"100%"}} minDate={dayjs(new Date())} value={dayjs(date)} allowClear={false} onChange={(date:any,dateString:string)=>{
                            setDate(dateString);
                            switch (paymentTerm) {
                                case "full_payment_by_date":
                                    setDeadline(dateString);
                                    break;
                                case "full_payment_in_7_days":
                                    setDeadline(date.add(7,"day").format("YYYY-MM-DD"));
                                    break;
                                case "full_payment_in_15_days":
                                    setDeadline(date.add(15,"day").format("YYYY-MM-DD"));
                                    break;
                                case "full_payment_in_30_days":
                                    setDeadline(date.add(30,"day").format("YYYY-MM-DD"));
                                    break;
                                case "full_payment_in_45_days":
                                    setDeadline(date.add(45,"day").format("YYYY-MM-DD"));
                                    break;
                                case "full_payment_in_60_days":
                                    setDeadline(date.add(60,"day").format("YYYY-MM-DD"));
                                    break;
                                case "full_payment_in_90_days":
                                    setDeadline(date.add(90,"day").format("YYYY-MM-DD"));
                                    break;
                            }
                        }} />
                        <div style={{marginTop:"16px"}} className="color-474F5E">
                            <span className="font-w-600">客户应在{deadline}前完成付款。</span>
                            设置付款<Link to="" className="color-356DFF">通知邮件</Link>
                        </div>
                    </Form.Item>}
                </Form>
            </Modal>
        </Scoped>
    );
}


const Scoped = styled.div`
    .text-hover-underline{
        &:hover{
            text-decoration: underline;
            text-underline-offset: 4px;
        }
    }

`

export default AddPaymentPeriod;