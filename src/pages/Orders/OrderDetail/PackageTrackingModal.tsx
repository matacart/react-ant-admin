import { useIntl } from "@/.umi/plugin-locale/localeExports";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { setOrderNumber } from "@/services/y2/api";
import order from "@/store/order/order";
import { Checkbox, Flex, Form, Modal } from "antd";
import { useEffect, useState } from "react";

function PackageTrackingModal({shipping}:{shipping:any}){
    
    const intl = useIntl();

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const [logistics,setLogistics] = useState([
        {value:'0',label:"其它"},
        {value:'1',label:"顺丰"},
    ])

    const [logisticsValue,setLogisticsValue] = useState('');

    const shippingInfo = shipping.shipment
    const submit = () => {
        form.validateFields().then((values)=>{
            setLoading(true)
            setOrderNumber({
                orderId:order.orderInfo.order_id,
                shippingSn:shipping.groupKey,
                shippingId:logisticsValue,
                shipmentId:shippingInfo.shipment_id,
                ...values,
            }).then(()=>{
                order.triggerRefresh();
            }).catch(()=>{

            }).finally(()=>{
                setOpen(false);
                setLoading(false)
            })
        })
    }

    const cancel = () => {
        setOpen(false);
    };

    useEffect(()=>{
        const newLogistics = JSON.parse(localStorage["MC_DATA_SHIPPING_COURIER"] || "[]").map((item:any)=>{
            return{
                value:item.id,
                label:item.courier_name
            }
        })
        setLogistics([...newLogistics,{
            value:'0',
            label:"其它"
        }])
    },[])


    return(
        <>
            {(shippingInfo?.shipping_no && shippingInfo?.shipping_no !== "") ? <>
                <a onClick={()=>{
                    form.setFieldsValue({
                        shippingNo:shippingInfo.shipping_no,
                        shippingUrl:shippingInfo.shipping_courier_url,
                        shippingName:shippingInfo.shipping_courier_name
                    })
                    setLogisticsValue(shippingInfo.shipping_courier_id)
                    setOpen(true)
                }}>编辑跟踪信息</a>            
            </>:<PrimaryButton text={intl.formatMessage({ id: "order.detail.addtracking" })} onClick={()=>setOpen(true)} />}
            <Modal open={open} width={520} title="更新运单号" centered onCancel={cancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Flex justify='end' align='center'>
                            <Flex gap={12}>
                                <DefaultButton text={"取消"} onClick={cancel} />
                                <PrimaryButton text={"更新"} onClick={submit} loading={loading} />
                            </Flex>
                        </Flex>
                    </>
                )}
            >
                <Form form={form} layout="vertical" style={{marginTop:"28px"}}>
                    <Form.Item label="运单号" name="shippingNo">
                        <MyInput style={{height:"36px"}} placeholder="运单号" suffix={<div className="color-356DFF">匹配</div>} />
                    </Form.Item>
                    <Form.Item label="物流服务商">
                        <MySelect placeholder="请填写快递公司名称" showSearch 
                        value={logisticsValue}
                        options={logistics} style={{height:"36px"}} onChange={(value:string)=>{
                            setLogisticsValue(value)
                            value == "0" && form.setFieldsValue({
                                ...form.getFieldsValue(),
                                shippingName:"",
                                shippingUrl:""
                            })
                        }} />
                        {logisticsValue !== "0" && <div style={{marginTop:"8px"}} className="font-12 color-7A8499">没有找到服务商？<span className="color-356DFF cursor-pointer" onClick={()=>{
                            setLogisticsValue("0")
                            form.setFieldsValue({
                                ...form.getFieldsValue(),
                                shippingName:"",
                                shippingUrl:""
                            })
                        }}>选择其他</span></div>}
                    </Form.Item>
                    {logisticsValue == "0" && <>
                        <Form.Item label="公司名称" name="shippingName">
                            <MyInput style={{height:"36px"}} placeholder="请输入公司名称" />
                        </Form.Item>
                        <Form.Item label="货件追踪链接URL" name="shippingUrl">
                            <MyInput style={{height:"36px"}} placeholder="https://" />
                        </Form.Item>
                    </>}
                    <Form.Item label={null} name="notice" valuePropName="checked">
                        <Checkbox>向客户发送通知</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default PackageTrackingModal;