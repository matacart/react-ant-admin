import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { setOrderIdNumber } from "@/services/y2/api";
import { Checkbox, Col, Flex, Form, Input, Modal, Row, Space } from "antd"
import { useEffect, useRef, useState } from "react";
import { styled } from 'styled-components';
import cookie from 'react-cookies';
import NumberInput from "@/components/Input/NumberInput";
import { toJS } from "mobx";
import orderDraft from "@/store/order/orderDraft";
import { currencyPrecision, getPrecision, getSymbolLeft } from "@/utils/common";

function EditDiscount({index}:{index:number}){

    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();

    const [loading,setLoading] = useState(false);

    const [discountType,setDiscountType] = useState(1);

    const symbolLeft = getSymbolLeft();
    const { decimals,amountRule } = getPrecision();

    const product = orderDraft.productInfo[index]

    const submit = ()=>{
        // 更新订单数据
        form.validateFields().then((values)=>{
            setLoading(true)
            // 固定折扣
            let finalAmount = 1
            if(discountType == 1){
                finalAmount = product.product_price - Number(values.discount_amount)*amountRule
            }
            // 百分比折扣
            if(discountType == 2){
                // console.log(product.product_price)
                finalAmount = product.product_price * (100 - values.discount_amount)/100
            }
            const newProductInfo = toJS(orderDraft.productInfo)
            newProductInfo[index].final_price = finalAmount
            newProductInfo[index].product_discount_amount=(values.discount_amount*amountRule).toString()
            newProductInfo[index].product_discount_type=discountType.toString()
            newProductInfo[index].product_discount_description=values.discount_explanation
            orderDraft.setProductInfo(newProductInfo)

            setLoading(false)
            setOpen(false)
        })
    }

    const cancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Flex>
                <div onClick={()=>{
                    console.log(product)
                    if(product.product_discount_type && product.product_discount_type !== "0"){
                        setDiscountType(parseInt(product.product_discount_type.toString()))
                        form.setFieldsValue({
                            discount_amount:Number(product.product_discount_amount)/amountRule,
                            discount_explanation:product.product_discount_description
                        })
                    }else{
                        setDiscountType(1)
                        form.resetFields()
                    }
                    setOpen(true)
                }} className="cursor-pointer color-356DFF">{symbolLeft}{currencyPrecision(Number(product.final_price))}</div>
                {(product.product_discount_type && product.product_discount_type!=="0") && <div style={{marginLeft:"6px",textDecoration:"line-through"}} className="color-7A8499">{symbolLeft}{currencyPrecision(Number(product.product_price))}</div>}
            </Flex>
            
            <Modal title={<div>编辑折扣</div>} width={480} centered open={open} onOk={submit} onCancel={cancel} 
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
                    <Row gutter={[20,0]}>
                        <Col span={12}>
                            <Form.Item label="折扣类型">
                                <MySelect style={{height:"36px"}} value={discountType} options={[
                                    { value: 1, label: '固定折扣' },
                                    { value: 2, label: '百分比折扣' },
                                ]} onChange={(value:any)=>{
                                    setDiscountType(value)
                                    form.setFieldsValue({
                                        ...form.getFieldsValue(),
                                        discount_amount:0
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="折扣额度" name="discount_amount">
                                {discountType == 1 ? <NumberInput precision={decimals} style={{height:"36px",width:"100%"}} min={0} max={product.product_price/amountRule} prefix={symbolLeft} /> : 
                                    <NumberInput style={{height:"36px",width:"100%"}} min={0} max={100} formatter={(value:number) => `${value}%`} />
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="折扣说明" name="discount_explanation">
                        <MyInput style={{height:"36px"}} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}


const Scoped = styled.div`
    
`



export default EditDiscount