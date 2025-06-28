import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton"
import MyInput from "@/components/Input/MyInput"
import NumberInput from "@/components/Input/NumberInput"
import MySelect from "@/components/Select/MySelect"
import orderDraft from "@/store/order/orderDraft"
import { generateId } from "@/utils/dataStructure"
import { Checkbox, Col, Flex, Form, Modal, Row, Select, Space } from "antd"
import { useState } from "react"
import styled from "styled-components"

function AddCustomProducts(){

    const [loading,setLoading] = useState(false)

    const [form] = Form.useForm()

    const options = [
        {
            label:"千克",
            value:"kg"
        },
        {
            label:"克",
            value:"g"
        },
        {
            label:"磅",
            value:"b"
        },
        {
            label:"盎司",
            value:"an"
        }
    ]

    const [logistics,setLogistics] = useState(false)

    const [open, setOpen] = useState(false)

    const reset = ()=>{
        form.resetFields()
        setLogistics(false)
    }

    const submit = ()=>{
        form.validateFields().then((values)=>{
            const newProduct = {
                attributes:null,
                final_price:values.productPrice,
                // group_id: "0",
                // 虚拟id
                vid:generateId(),
                product_id:"",
                proudct_imgage:"",
                product_model:"",
                product_name:values.productName,
                product_price:values.productPrice,
                product_cost_price:0,
                product_quantity: values.productQuantity,
                product_source: "2",
                // 折扣信息
                product_discount_amount: "",
                product_discount_description: "",
                product_discount_type: "",
                product_discount_type_from:"",
                // istax
                isTax:values.productTax,
                isLogistics:logistics,
                product_weight:values.productWeight ?? 0,
            }
            orderDraft.setProductInfo([...orderDraft.productInfo,newProduct])
            reset()
            setOpen(false)
        }).catch(()=>{
            
        })
    }



    return (
        <Scoped>
            <span className="font-14 color-356DFF cursor-pointer" onClick={()=>setOpen(true)}>
                添加自定义商品
            </span>
            <MyModal title={<div>自定义商品</div>} open={open} centered width={620} onCancel={()=>{
                setOpen(false)
                reset()
            }}
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={()=>{
                                setOpen(false)
                                reset()
                            }} />
                            <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="商品名称" className="mb-12" name="productName" required={false} rules={[
                        { required: true, message: '请输入商品名称' }
                    ]}>
                        <MyInput placeholder="请输入商品名称" style={{height:"36px"}} />
                    </Form.Item>
                    <Row gutter={[12,0]} className="mb-12">
                        <Col span={12}>
                            <Form.Item label="商品价格" layout="vertical" name="productPrice" required={false} rules={[
                                {required:true,message:"请输入商品价格"}
                            ]}>
                                <NumberInput placeholder="请输入商品价格" style={{height:"36px",width:"100%"}} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="商品数量" layout="vertical" name="productQuantity" required={false} rules={[
                                { required: true, message: '请输入商品数量' }
                            ]}>
                                <NumberInput placeholder="请输入商品数量" style={{height:"36px",width:"100%"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={false} valuePropName="checked" name="productTax">
                        <Checkbox>商品应缴税</Checkbox>
                    </Form.Item>
                    <Form.Item label={false}>
                        <Checkbox value={logistics} onChange={(event)=>{
                            setLogistics(event.target.checked)
                        }}>商品需要物流运输</Checkbox>
                    </Form.Item>
                    {logistics && <Form.Item label={<div>
                        <div>商品重量</div>
                        <div className="font-12 color-7A8499">用于准确地计算运费</div>
                    </div>} className="mt-12" name="productWeight">
                        <Space.Compact style={{width:"100%"}}>
                            <MyInput placeholder="商品重量" style={{height:"36px",width:"70%"}} />
                            <MySelect options={options} defaultValue={"kg"} style={{height:"36px",width:"80px"}} />
                        </Space.Compact>
                    </Form.Item>}
                </Form>
            </MyModal>
        </Scoped>
    )
}

const Scoped = styled.div`
`
const MyModal = styled(Modal)`
    .mb-12{
        margin-bottom: 12px !important;
    }
    .mt-12{
        margin-top: 12px !important;
    }
    .ant-form-item{
        margin-bottom: 0;
    }
`

export default AddCustomProducts