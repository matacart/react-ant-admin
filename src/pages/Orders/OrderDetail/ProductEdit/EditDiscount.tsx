import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { Col, Flex, Form, Modal, Row, Space } from "antd"
import { useEffect, useState } from "react";
import { styled } from 'styled-components';
import NumberInput from "@/components/Input/NumberInput";
import orderProductEdit from "@/store/order/orderProductEdit";
import { toJS } from "mobx";
import { getCurrencyAmount, getCurrencySymbol } from "@/utils/common";

function EditDiscount({item,index}:{item:any,index:number}){

    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();

    const discountType = Form.useWatch("discountType",form);

    const symbolLeft = getCurrencySymbol(item.finalPriceSet.settleMoney.currencyCode);

    useEffect(()=>{
        console.log(item)
    },[])

    const submit = ()=>{
        form.validateFields().then(values=>{
            const selectedProducts = toJS(orderProductEdit.fulfillmentItemList)
            selectedProducts[index] = {
                ...selectedProducts[index],
                manualDiscountInfo:{
                    ...selectedProducts[index].manualDiscountInfo,
                    discountType:values.discountType,
                    discountDesc:values.discountDesc,
                    settleDiscountValue:values.discountValue,
                }
            }
            orderProductEdit.setFulfillmentItemList(selectedProducts);
            setOpen(false);
        })
    }

    const cancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Flex>
                <div className="cursor-pointer color-356DFF" onClick={()=>{
                    // if(product.product_discount_type && product.product_discount_type !== "0"){
                    //     setDiscountType(parseInt(product.product_discount_type.toString()))
                    //     form.setFieldsValue({
                    //         discount_amount:product.product_discount_amount,
                    //         discount_explanation:product.product_discount_description
                    //     })
                    // }else{
                    //     setDiscountType(1)
                    //     form.resetFields()
                    // }
                    setOpen(true)
                }}>
                    <div>{getCurrencyAmount(item.finalPriceSet.settleMoney.currencyCode,item.finalPriceSet.settleMoney.amount)}</div>
                </div>
                {(item.finalPriceSet.settleMoney.amount !== item.productPriceSet.settleMoney.amount) && <div className="color-474F5E font-14 line-through">{getCurrencyAmount(item.productPriceSet.settleMoney.currencyCode,item.productPriceSet.settleMoney.amount)}</div>}
            </Flex>
            
            <Modal title={<div>编辑折扣</div>} width={480} centered open={open} onOk={submit} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" style={{margin:"20px 0 40px"}}>
                    <Row gutter={[20,0]}>
                        <Col span={12}>
                            <Form.Item label="折扣类型" name="discountType">
                                <MySelect style={{height:"36px"}} value={discountType} options={[
                                    { value: "DISCOUNT_AMOUNT_FIXED", label: '固定折扣' },
                                    { value: "DISCOUNT_AMOUNT_PERCENTAGE", label: '百分比折扣' },
                                ]} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="折扣额度" name="discountValue">
                                {discountType == "DISCOUNT_AMOUNT_FIXED" ? <NumberInput style={{height:"36px",width:"100%"}} min={0} max={123} prefix={symbolLeft} /> : 
                                    <NumberInput style={{height:"36px",width:"100%"}} min={0} max={100} formatter={(value:number) => `${value}%`} />
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="折扣说明" name="discountDesc">
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