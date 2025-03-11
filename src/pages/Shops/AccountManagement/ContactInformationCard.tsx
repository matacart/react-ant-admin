import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Flex, Form, Input, Select, Space } from "antd";
import styled from "styled-components";
import accountManagement from "@/store/shops/accountManagementStore";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { getCountryList } from "@/services/y2/api";


const ContactInformationCard = forwardRef((prop,ref)=>{

    // 区号表
    const [countryList,setCountryList] = useState([]);

    const [form] = Form.useForm();

    // form.submit()

    useImperativeHandle(ref, () => ({
        validate: () => form.validateFields(),
    }));
    // 暴露给父组件
   

    useEffect(()=>{
        getCountryList().then((res)=>{
            let newList = res.data.map(item=>{
                if(item.codes !== null){
                    return {
                        value: item.codes,
                        label: "+"+item.codes
                    }
                }
            }).filter(item=>item !== undefined)
            // 过滤相同的数据
            newList = Array.from(
                new Set(newList.map((item) => JSON.stringify(item)))
            ).map((item) => JSON.parse(item));
            setCountryList(newList);
        })

        form.setFieldsValue({
            email: accountManagement.user.contact_email,
            phone: accountManagement.user.contact_phone
        })

    },[])

    return (
        <Scoped>
            <Card>
                <Form form={form} layout="vertical">
                    <Form.Item name="email" label={<div className="font-w-600 color-242833">账户联系邮箱</div>} rules={[
                        {required:true,message:"请输入账户联系邮箱"}
                    ]}>
                        <Input style={{width:"60%"}} onChange={(e)=>{
                            accountManagement.setUser({...accountManagement.user,contact_email: e.target.value})
                        }} defaultValue={accountManagement.user.contact_email} placeholder="请输入账户联系邮箱" />
                    </Form.Item>
                    <Form.Item name="phone" label={<div className="font-w-600 color-242833">账户联系手机号</div>} rules={[
                        {required:true,message:"请输入账户联系手机号"}
                    ]}>
                        <Space.Compact style={{width:"60%"}}>
                            <Select onChange={(e)=>{
                                const newUser = {...accountManagement.user,contact_code: e}
                                accountManagement.setUser(newUser)
                            }} defaultValue={accountManagement.user.contact_code} options={countryList} style={{width:"fit-content"}} />
                            <Input onChange={(e)=>{
                                accountManagement.setUser({...accountManagement.user,contact_phone: e.target.value})
                            }} defaultValue={accountManagement.user.contact_phone} placeholder="请输入账户联系手机号" />
                        </Space.Compact>
                    </Form.Item>
                </Form>
            </Card>
        </Scoped>
    )

})

export default ContactInformationCard;

const Scoped = styled.div`
    margin-bottom: 20px;
`
