import { Card, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import product from "@/store/product/product";
import PTinymce from "@/components/MCE/PTinymce";
import { Editor } from "@tinymce/tinymce-react";

const {TextArea} = Input
function ProductData({form}:{form:any}) {

    const setContent = (content: string)=>{
      product.setProductInfo({...product.productInfo,content:content})
    }

    useEffect(()=>{
        form.setFieldsValue({
            title: product.productInfo.title,
            content: product.productInfo.content,
            content1: product.productInfo.content1,
        });
    },[])

    return (
        <Card title="商品信息" className='product-data-card'>
            <Form form={form} layout='vertical' className='product-form'>
                <Form.Item
                    name="title"
                    rules={[
                        { required: true, message: '请输入商品标题' }
                    ]}
                    required
                    label="商品标题"
                >
                    <Input
                        onChange={(e) => {
                            product.setProductInfo({...product.productInfo,title:e.target.value})
                        }}
                        placeholder="例如：冬季，毛衣" />
                    {/* 5 */}
                </Form.Item>
                <Form.Item 
                    name="content1"
                    label='商品摘要'>
                    <TextArea
                        showCount
                        autoSize={{ minRows: 1, maxRows: 6 }}
                        maxLength={400}
                        onChange={(e)=>{
                            product.setProductInfo({...product.productInfo,content1:e.target.value})
                        }}
                        style={{
                            resize: 'none',
                        }}
                        placeholder='请用简短的文字描述本商品'
                    />
                </Form.Item>
                <Form.Item label='商品描述' name="content">
                    <PTinymce content={product.productInfo.content} setContent={setContent} />
                </Form.Item>
            </Form>
        </Card>
    )
}

export default observer(ProductData);