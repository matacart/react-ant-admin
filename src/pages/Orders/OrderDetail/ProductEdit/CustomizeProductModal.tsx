import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { AddIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import NumberInput from "@/components/Input/NumberInput";
import { useSymbolLeft } from "@/hooks/customHooks";
import { FulfillmentItemType } from "@/store/order/order";
import orderProductEdit from "@/store/order/orderProductEdit";
import { getPrecision } from "@/utils/common";
import {Checkbox, Col, Flex, Form, Modal, Row, Select, Space, Table, TableProps } from "antd"
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import styled from "styled-components";


interface DataType {
    key: string;
    name: string;
    title:string;
    age: number;
    address: string;
}

function CustomizeProductModal(){

    const [open, setOpen] = useState(false);

    const symbolLeft = useSymbolLeft();

    const {decimals,amountRule} = getPrecision();

    const [form] = Form.useForm();

    const [unit, setUnit] = useState<string>("kg");

    const Ref = useRef(null)

    const cancel = () => {
        setOpen(false);
    };
    const submit = () => {
        form.validateFields().then((values)=>{
            const newProducts:FulfillmentItemType = {
                groupId:"",
                fulfillmentOrderSeq: "",
                parentSkuId: "",
                productSeq: "vProductSeq",
                productSku: "vProductSku",
                productNum: values.productNum.toString(),
                productSource: "2",
                title: values.productName,
                firstImage: "",
                productPrice:Math.round(values.productPrice*amountRule).toString(),
                productAmount:(values.productPrice || 0).toString(),
                version:"",
                attributes:[],
                images:[],
                businessFlagInfo:{
                    shippingRequired:values.productTax || false,
                    taxable:values.productTax || false,
                },
                customLogistics:{
                    weight:values.weight || 0,
                    weightUnit:unit,
                }
            }
            orderProductEdit.setFulfillmentItemList([...orderProductEdit.fulfillmentItemList,newProducts])
            setOpen(false)
        }).catch((err)=>{
            console.log(err)
        })
    };
   
    return (
        <Scoped ref={Ref}>
            <Flex gap={4} className="cursor-pointer" align="center" style={{border:"1px dashed #d7dbe7",padding:"4px 8px",borderRadius:"4px",backgroundColor:"#FFF",width:"100%",height:"36px"}} onClick={()=>{
                form.resetFields()
                setOpen(true)
            }}>
                <AddIcon className="font-16" />
                <span className="font-14 font-w-400">自定义商品</span>
            </Flex>
            {/* calc(100vh - 200px) */}
            <Modal styles={{body:{maxHeight: ''}}} getContainer={()=>Ref.current!} title={<div>自定义商品</div>} width={620} className="customer-modal" centered open={open} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} className="myform" layout="vertical">
                    <Form.Item label="商品名称" name="productName" style={{marginBottom:"20px"}} required={false} rules={[
                        { required: true, message: '请输入商品名称' }
                    ]}>
                        <MyInput style={{height:"36px"}} placeholder="请输入商品名称" />
                    </Form.Item>
                    <Row gutter={12} style={{marginBottom:"20px"}}>
                        <Col span={12}>
                            <Form.Item label="商品价格" name="productPrice" required={false} rules={[
                                { required: true, message: '请输入商品价格' }
                            ]}>
                                <NumberInput style={{width:"100%"}} min={0} precision={decimals} prefix={symbolLeft} placeholder="请输入商品价格" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="商品数量" name="productNum" required={false} rules={[
                                { required: true, message: '请输入商品数量' }
                            ]}>
                                <NumberInput style={{width:"100%"}} min={1} placeholder="请输入商品数量" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label={false} valuePropName="checked" name="productTax">
                        <Checkbox>商品应缴税</Checkbox>
                    </Form.Item>
                    <Form.Item label={false} valuePropName="checked" style={{marginBottom:"20px"}} name="productLogistics">
                        <Checkbox>商品需要物流运输</Checkbox>
                    </Form.Item>
                    <Form.Item label="商品重量" name="productWeight" style={{marginBottom:"20px"}}>
                        <Space.Compact style={{width:"60%"}}>
                            <MyInput style={{height:"36px"}} placeholder="请输入商品重量"/>
                            <Select style={{height:"36px",width:"100px"}} value={unit} onChange={setUnit} options={[
                                {label:"kg",value:"kg"},
                                {label:"g",value:"g"},
                            ]} />
                        </Space.Compact>
                    </Form.Item>
                </Form>
            </Modal>
        </Scoped>
    )
}


const Scoped = styled.div`
    .myform{
        margin: 20px 0;

        .ant-form-item{
            margin-bottom: 0;
        }
    }
`


export default observer(CustomizeProductModal)