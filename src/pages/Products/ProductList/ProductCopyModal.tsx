import { Checkbox, Flex, Form, Modal, Radio, Tooltip } from "antd";
import styled from "styled-components";
import { history } from '@umijs/max';
import { useEffect, useState } from "react";
import MyInput from "@/components/Input/MyInput";
import { QuestionCircleOutlined } from "@ant-design/icons";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";

function ProductCopyModal({
    open,
    setOpen,
    product
}:any) {

    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then((values:any)=>{
            setOpen(false)
            const params = new URLSearchParams({
                copyFrom: String(product?.id ?? ''),
                title: values.title ?? '',
                isImage: values.isImage ? '1' : '0',
                isInventory: values.isInventory ? '1' : '0',
                status: String(values.status ?? 1),
            });
            history.push({ pathname: '/products/new', search: `?${params.toString()}` });
        }).catch(()=>{
        })
    }

    const handleCancel = () => {
        setOpen(false)
    }

    useEffect(()=>{
        form.setFieldsValue({
            title:product?.title?`[Copy]${product.title}`:"",
            status:1,
            isImage:false,
            isInventory:false,
        })
    },[product])

    return (
        <MyModal
            centered
            title="复制商品"
            open={open}
            onCancel={handleCancel}
            footer={()=>(
                <Flex gap={12} justify='end'>
                    <DefaultButton text="取消" onClick={handleCancel} />
                    <PrimaryButton text="确认" onClick={handleOk} />
                </Flex>
            )}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="title" required={false} rules={[{ required: true, message: '请输入商品名称' }]} label={<div className="font-w-500">商品名称</div>}>
                    <MyInput style={{height:"36px"}} placeholder="请输入商品名称" />
                </Form.Item>
                <Form.Item style={{marginBottom:"0px"}} name="isImage" valuePropName="checked" label={false}>
                    <Checkbox>复制商品图片</Checkbox>
                    <Tooltip title="勾选该选项后，商品主图、属性值图、SKU图将会被一并复制">
                        <QuestionCircleOutlined />
                    </Tooltip>
                </Form.Item>
                <Form.Item name="isInventory" valuePropName="checked" label={false}>
                    <Checkbox>复制商品库存</Checkbox>
                </Form.Item>
                <Form.Item name="status" label={<div className="font-w-500">商品状态</div>}>
                    <Radio.Group 
                        options={[
                            {
                                label: '已上架',
                                value: 1,
                            },
                            {
                                label: '已下架',
                                value: 0,
                            },
                        ]}
                    >
                    </Radio.Group>
                </Form.Item>
            </Form>
        </MyModal>
    )
}


const MyModal = styled(Modal)`
`

export default ProductCopyModal;