import MyAlert from "@/components/Alert/MyAlert";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import NumberInput from "@/components/Input/NumberInput";
import { Alert, Checkbox, Flex, Form, Input, Modal, Radio } from "antd"
import FormItem from "antd/es/form/FormItem";
import cookie from 'react-cookies';
import { useState } from "react";
import orderDraft from "@/store/order/orderDraft";


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom:20
};

function ShippingFeeEditingModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [freight,setFreight] = useState("FREE_SHIPPING")

    const [form] = Form.useForm();

    const submit = ()=>{
        form.submit()
        // 
        if(freight == "FREE_SHIPPING"){
            orderDraft.setOrderInfo({
                ...orderDraft.orderInfo,
                logisticsType:freight,
                logisticsName:"",
                logisticsAmount:0
            })
            form.setFieldsValue({
                name:"",
                cost:0
            })
        }
        if(freight == "CUSTOM_SHIPPING_AMOUNT"){
            orderDraft.setOrderInfo({
                ...orderDraft.orderInfo,
                logisticsType:freight,
                logisticsName:form.getFieldsValue().name,
                logisticsAmount:form.getFieldsValue().cost?form.getFieldsValue().cost:0
            })
        }
        // 更新订单数据
        setIsModalOpen(false);
    }

    const cancel = () => {
        setFreight(orderDraft.orderInfo.logisticsType)
        form.setFieldsValue({
            name:orderDraft.orderInfo.logisticsName,
            cost:orderDraft.orderInfo.logisticsAmount
        })
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <a onClick={()=>setIsModalOpen(true)} style={{width:"20%"}}>编辑运费</a>
            <Modal title={<div>编辑运费</div>} centered open={isModalOpen} onOk={handleOk} onCancel={cancel} 
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
                    options={[
                        { value: "FREE_SHIPPING", label: '免运费' },
                        { value: "CUSTOM_SHIPPING_AMOUNT", label: '自定义运费' },
                    ]}
                />
                {freight == "CUSTOM_SHIPPING_AMOUNT" && <Form form={form} layout="vertical">
                    <FormItem label="物流名称" name="name">
                        <DefaultInput placeholder="物流名称" />
                    </FormItem>
                    <FormItem label="费用" name="cost">
                        <NumberInput min={0} prefix={cookie.load("symbolLeft") || ""} />
                    </FormItem>
                </Form>}
            </Modal>
        </>
    )
}



export default ShippingFeeEditingModal