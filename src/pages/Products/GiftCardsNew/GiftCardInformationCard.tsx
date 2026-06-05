import DefaultInput from "@/components/Input/DefaultInput";
import giftCard from "@/store/product/giftCard";
import { Card, Form } from "antd";
import { useEffect, useState } from "react";

function GiftCardInformationCard() {
  
    useEffect(()=>{
       
    })
    return (
        <Card title={<div className="">礼品卡信息</div>} className='product-data-card'>
            <Form layout='vertical' className='product-form'>
                <Form.Item 
                    name="code"
                    required={false} 
                    rules={[{required:true}]}
                    label="礼品卡代码"
                >
                    <DefaultInput />
                </Form.Item>
                <Form.Item 
                    name="value"
                    required={false} 
                    rules={[{required:true}]}
                    label="礼品卡面额"
                >
                    <DefaultInput prefix={giftCard.symbolLeft} />
                </Form.Item>
            </Form>
        </Card>
    )
}

export default GiftCardInformationCard