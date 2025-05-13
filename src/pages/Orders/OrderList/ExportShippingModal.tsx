import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyRangePicker from "@/components/DatePicker/MyRangePicker";
import { exportOrderTask } from "@/services/y2/api";
import orderList from "@/store/order/orderList";
import { useIntl } from "@umijs/max";
import { Flex, Form, Modal, notification, Radio, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { history } from "@umijs/max";

const style: React.CSSProperties = {
    margin:"20px 0",
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
};

const { Text,Link } = Typography;

function ExportShippingModal(){

    const intl = useIntl();

    const [open,setOpen] = useState(false);

    const [form] = Form.useForm();

    const [exportMethod,setExportMethod] = useState(1);

    const cancel = () => {
        setExportMethod(1);
        form.resetFields()
        setOpen(false);
    };

    const submit = async ()=>{

        let order = {};

        switch (exportMethod) {
            case 1:
                order = {
                    languages_id:orderList.languages,
                    taskType:'shipping_slips',
                    orderList:JSON.stringify(orderList.currentPageOrderIds || []),
                    range_type:exportMethod
                }
                break;
            case 2:
                await form.validateFields().then((values)=>{
                    order = {
                        languages_id:orderList.languages,
                        taskType:'shipping_slips',
                        condition:JSON.stringify({
                            startTime:values.timer[0].unix(),
                            endTime:values.timer[1].unix()
                        }),
                        range_type:exportMethod
                    }
                }).catch(err=>{
                })
                break;
            case 3:
                order = {
                    languages_id:orderList.languages,
                    taskType:'shipping_slips',
                    orderList:JSON.stringify(orderList.orderIds || []),
                    range_type:exportMethod
                }
                break;
        }
        
        Object.keys(order).length !== 0 && exportOrderTask(order).then(res=>{
            notification.info({
                style:{width:"400px",marginBottom:"12px"},
                message: '正在导出',
                description: <div className='color-474F5E'>受导出文件行数限制，如果导出数据过多，可能会分多个文件导出；导出可能需要较长时间，请耐心等待，您亦可前往<Text underline className="color-356DFF cursor-pointer" onClick={()=>{
                    history.push("/analyse/batch")
                }}><span>批量处理进度</span></Text>页面查看进度。</div>,
            })
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setExportMethod(1);
            form.resetFields()
            setOpen(false);
        })
    }

    return (
        <>
            <a onClick={()=>setOpen(true)}>{intl.formatMessage({ id: 'orderlist.shipping.list' })}</a>
            <MyModal title="导出出货单" width={620} open={open} centered onCancel={cancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Flex justify='end' align='center'>
                            <Flex gap={12}>
                                <DefaultButton text={"取消"} onClick={cancel} />
                                <PrimaryButton text={"导出"} onClick={submit} />
                            </Flex>
                        </Flex>
                    </>
                  )}
            >
                <Form form={form}>
                    <Radio.Group
                        style={style}
                        value={exportMethod}
                        onChange={(e)=>{
                            setExportMethod(e.target.value)
                            form.resetFields()
                        }}
                        options={[
                            { value: 1, label: '当前页面' },
                            { value: 2, label: <>
                                <div style={{marginBottom:"8px"}}>订单日期</div>
                                <Form.Item name="timer" rules={[{ required: true, message: '请填写订单日期' }]}>
                                    <MyRangePicker showTime style={{height:"36px"}} disabled={exportMethod !== 2} />
                                </Form.Item>
                                <div style={{marginTop:"8px"}} className="font-12 color-7A8499">仅支持半年内订单数据的导出，最多支持200条订单数据的导出.</div>
                            </>},
                            { value: 3, label: '已选订单',disabled:orderList.orderIds.length==0 },
                        ]}
                    />
                </Form>
                
            </MyModal>
        </>
    )
}

const MyModal = styled(Modal)`

    .ant-form-item{
        margin-bottom: 0;
    }

    .ant-radio{
        display: flex;
        align-self: baseline;
        position: relative;
        top: 3px;
    }

`

export default ExportShippingModal