import DefaultButton from "@/components/Button/DefaultButton";
import DefaultButtonSecondary from "@/components/Button/DefaultButtonSecondary";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { AddIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import MySearch from "@/components/Input/MySearch";
import NumberInput from "@/components/Input/NumberInput";
import MySelect from "@/components/Select/MySelect";
import CommodityClassificationSelector from "@/pages/Products/ProductList/CommodityClassificationSelector";
import TagSelector from "@/pages/Products/ProductList/TagSelector";
import { getProductList } from "@/services/y2/api";
import orderProductEdit from "@/store/order/orderProductEdit";
import {Flex, Form, Input, Modal, Row, Select, Space, Table, TableProps } from "antd"
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef, useState } from "react";
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

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const Ref = useRef(null)

    const cancel = () => {
        setOpen(false);
    };
    const submit = () => {
        form.validateFields().then(values => {
            setLoading(true);
            const newProduct = {
                attributes:null,
                final_price:values.productPrice,
                group_id: "0",
                id: "",
                vid:new Date().getTime().toString(),
                latest_shipment_time:"",
                num: values.productQuantity,
                product_discount_amount: "0",
                product_discount_description: null,
                product_discount_type: "0",
                product_discount_type_from: null,
                product_id:"",
                product_image:"",
                product_model:"",
                product_name:values.productName,
                product_price:values.productPrice,
                product_quantity: values.productQuantity,
                product_source: "2",
                remaining_quantity:values.productQuantity,
                shipped_quantity:0,
            }
            orderProductEdit.setRemainingProductGroup([
                {
                    product:[...orderProductEdit.remainingProductGroup[0].product,newProduct],
                    remaining:orderProductEdit.remainingProductGroup[0].remaining
                }
            ])
            orderProductEdit.setRemainingProductGroup
            setLoading(false)
            setOpen(false);
        })
        // console.log(orderProductEdit.remainingProductGroup[0].product)
    };
   

    useEffect(()=>{
    },[])

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
            <Modal styles={{body:{maxHeight: ''}}} getContainer={()=>Ref.current!} title={<div>自定义商品</div>} width={480} className="customer-modal" centered open={open} onCancel={cancel} 
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
                    <Form.Item label="商品名称" name="productName" required={false} rules={[
                        { required: true, message: '请输入商品名称' }
                    ]}>
                        <MyInput style={{height:"36px"}} placeholder="请输入商品名称" />
                    </Form.Item>
                    <Form.Item label="商品价格" name="productPrice" required={false} rules={[
                        { required: true, message: '请输入商品名称' }
                    ]}>
                        <NumberInput style={{width:"100%"}} min={0} placeholder="请输入商品价格" />
                    </Form.Item>
                    <Form.Item label="商品数量" name="productQuantity" required={false} rules={[
                        { required: true, message: '请输入商品数量' }
                    ]}>
                        <NumberInput style={{width:"100%"}} min={1} placeholder="请输入商品数量" />
                    </Form.Item>
                </Form>
            </Modal>
        </Scoped>
    )
}


const Scoped = styled.div`
    .myform{
        margin: 20px 0;
    }
`


export default  observer(CustomizeProductModal)