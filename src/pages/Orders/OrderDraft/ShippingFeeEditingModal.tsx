import MyAlert from "@/components/Alert/MyAlert";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import NumberInput from "@/components/Input/NumberInput";
import { Alert, Checkbox, Flex, Form, Input, Modal, Radio } from "antd"
import FormItem from "antd/es/form/FormItem";
import cookie from 'react-cookies';
import { useEffect, useState } from "react";
import orderDraft from "@/store/order/orderDraft";
import { getDeliveryList } from "@/services/y2/api";


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom:20,
    maxHeight:"240px",
    overflowY:"auto"
};

function ShippingFeeEditingModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [options,setOptions] = useState<any[]>([]);

    const [freight,setFreight] = useState("FREE_SHIPPING");

    const [form] = Form.useForm();

    const submit = ()=>{
        form.validateFields().then((values)=>{
            // 
            if(freight == "FREE_SHIPPING"){
                orderDraft.setOrderInfo({
                    ...orderDraft.orderInfo,
                    shippingId:"0",
                    shippingMethod:"免运费",
                    shippingModuleCode:null,
                    shippingTotal:0,
                    orderTotal:orderDraft.orderInfo.productTotal - orderDraft.orderInfo.orderDiscount + 0,
                })
            }else if(freight == "CUSTOM_SHIPPING_AMOUNT"){
                orderDraft.setOrderInfo({
                    ...orderDraft.orderInfo,
                    shippingId:"0",
                    shippingMethod:values.name,
                    shippingModuleCode:null,
                    shippingTotal:values.cost,
                    orderTotal:orderDraft.orderInfo.productTotal - orderDraft.orderInfo.orderDiscount + values.cost,
                })
            }else{
                const shipping = options.find(item=>item.id==freight)
                orderDraft.setOrderInfo({
                    ...orderDraft.orderInfo,
                    shippingId:shipping.id,
                    shippingMethod:shipping.label,
                    shippingModuleCode:null,
                    shippingTotal:0,
                    orderTotal:orderDraft.orderInfo.productTotal - orderDraft.orderInfo.orderDiscount + 0,
                })
            }
            // 更新订单数据
            setIsModalOpen(false);
        }).catch((errorInfo)=>{
        })
    }

    const cancel = () => {
        if(orderDraft.orderInfo.shippingId == "0"){
            orderDraft.orderInfo.shippingMethod == "免运费" ? setFreight("FREE_SHIPPING") : setFreight("CUSTOM_SHIPPING_AMOUNT")
        }else{
            setFreight(orderDraft.orderInfo.shippingId)
        }
        form.setFieldsValue({
            name:orderDraft.orderInfo.shippingMethod,
            cost:orderDraft.orderInfo.shippingTotal
        })
        setIsModalOpen(false);
    };

    const getDeliverys = ()=>{
        // 配送方式
        if(orderDraft.receiverInfo && orderDraft.receiverInfo.receiverId){
            setLoading(true)
            getDeliveryList("2").then(res=>{
                const newDeliveryList = res.data.map(item=>{
                    if(item.status == "1"){
                        return {
                            id:item.addons_config_id,
                            value:item.addons_config_id,
                            label:item.addons_config_title
                        }
                    }
                    return null
                }).filter((items:any)=>items)
                setOptions([
                    {
                        id:"FREE_SHIPPING",
                        value:"FREE_SHIPPING",
                        label:"免运费"
                    },
                    {
                        id:"CUSTOM_SHIPPING_AMOUNT",
                        value:"CUSTOM_SHIPPING_AMOUNT",
                        label:"自定义运费"
                    },
                    ...newDeliveryList
                ])
            }).catch(err=>{
            }).finally(()=>{
                setLoading(false)
            })
        }else{
            setOptions([
                {
                    id:"FREE_SHIPPING",
                    value:"FREE_SHIPPING",
                    label:"免运费"
                },
                {
                    id:"CUSTOM_SHIPPING_AMOUNT",
                    value:"CUSTOM_SHIPPING_AMOUNT",
                    label:"自定义运费"
                }
            ])
        }
    }

    return (
        <>
            <a onClick={()=>{
                setIsModalOpen(true)
                getDeliverys()
            }} style={{width:"20%"}}>编辑运费</a>
            <Modal title={<div>编辑运费</div>} centered loading={loading} open={isModalOpen} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"更新"} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <div style={{margin:"20px 0"}}>
                    <MyAlert type="info" showIcon message={"当填写客户收件地址后，可选择适用当地的运费方案。"} />
                </div>
                <Radio.Group
                    style={style}
                    value={freight}
                    onChange={(e)=>setFreight(e.target.value)}
                    options={options}
                />
                {freight == "CUSTOM_SHIPPING_AMOUNT" && <Form form={form} layout="vertical">
                    <FormItem label="物流名称" name="name">
                        <DefaultInput placeholder="物流名称" />
                    </FormItem>
                    <FormItem label="费用" name="cost">
                        <NumberInput style={{width:"100%"}} min={0} prefix={cookie.load("symbolLeft") || ""} />
                    </FormItem>
                </Form>}
            </Modal>
        </>
    )
}



export default ShippingFeeEditingModal