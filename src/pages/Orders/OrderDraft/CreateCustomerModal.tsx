import MyAutoComplete from "@/components/AutoComplete/MyAutoComplete";
import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import MyInput from "@/components/Input/MyInput";
import NumberInput from "@/components/Input/NumberInput";
import MySelect from "@/components/Select/MySelect";
import { getCustomerList } from "@/services/y2/api";
import order from "@/store/order/order";
import { Checkbox, Col, Flex, Form, Input, Modal, Row, Select, Space } from "antd"
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";


function CreateCustomerModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();


    const [customerList,setCustomerList] = useState([
       
    ]);


    const options = [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
        },
    ];

    const submit = ()=>{
        form.submit()
        console.log(form.getFieldsValue())
        // 更新订单数据
        setIsModalOpen(false);
    }

    const cancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    useEffect(()=>{
        getCustomerList(1,100).then(res=>{
            setCustomerList(res.data.map((item:any)=>({
                label:item.realname,
                value:item.id,
                info:{...item}
            })))
        })
    },[])

    return (
        <>
            <MyAutoComplete style={{width:"100%",height:"36px"}} onSelect={(value,option)=>{
                order.setCustomerInfo(option.info)
            }} placeholder="搜索或创建客户" options={customerList} onClick={()=>setIsModalOpen(true)} />
            <Modal title={<div>创建客户</div>} width={620} centered open={isModalOpen} onOk={handleOk} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={""} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form style={{marginTop:"24px"}} form={form} layout="vertical">
                    <Row gutter={[20,20]}>
                        <Col span={12}>
                            <FormItem label="名字" name="lastName">
                                <MyInput placeholder="请填写名字" style={{width:"100%",height:"36px"}} />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="姓氏" name="firstName">
                                <MyInput placeholder="请填写姓氏" style={{width:"100%",height:"36px"}} />
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="邮箱" name="email">
                        <MyInput placeholder="请填写邮箱" style={{width:"100%",height:"36px"}} />
                    </FormItem>
                    <FormItem label={"手机"} name="phone">
                        <Space.Compact style={{width:"100%"}}>
                            <MySelect defaultValue="Zhejiang" options={options} style={{width:"80px",height:"36px"}} />
                            <MyInput placeholder="请填写手机号" style={{width:"100%",height:"36px"}} />
                        </Space.Compact>
                    </FormItem>
                </Form>
            </Modal>
        </>
    )
}



export default CreateCustomerModal