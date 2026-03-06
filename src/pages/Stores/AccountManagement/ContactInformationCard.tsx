import { Card, Flex, Form, Input, Select, Space } from "antd";
import styled from "styled-components";
import accountManagement from "@/store/shops/accountManagementStore";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";


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
       
        let newList = JSON.parse(sessionStorage.getItem("country") || "[]").map(item=>{
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

        form.setFieldsValue({
            email: accountManagement.userInfo.contact_email,
            phone: accountManagement.userInfo.contact_phone
        })

    },[])

    return (
        <Scoped>
            <Card>
                <Form form={form} layout="vertical">
                    <Form.Item name="email" label={<div className="font-w-600 color-242833">账户联系邮箱</div>} rules={[
                        {required:true,message:"请输入账户联系邮箱"}
                    ]}>
                        <MyInput style={{width:"60%",height:"36px"}} onChange={(e)=>{
                            accountManagement.setUserInfo({...accountManagement.userInfo,contact_email: e.target.value})
                        }} defaultValue={accountManagement.userInfo.contact_email} placeholder="请输入账户联系邮箱" />
                    </Form.Item>
                    <Form.Item name="phone" label={<div className="font-w-600 color-242833">账户联系手机号</div>} rules={[
                        {required:true,message:"请输入账户联系手机号"}
                    ]}>
                        <Space.Compact style={{width:"60%"}}>
                            <MySelect style={{height:"36px",width:"fit-content"}} onChange={(e)=>{
                                const newUser = {...accountManagement.userInfo,contact_code: e}
                                accountManagement.setUserInfo(newUser)
                            }} defaultValue={accountManagement.userInfo.contact_code} options={countryList} />
                            <MyInput style={{height:"36px"}} onChange={(e)=>{
                                accountManagement.setUserInfo({...accountManagement.userInfo,contact_phone: e.target.value})
                            }} defaultValue={accountManagement.userInfo.contact_phone} placeholder="请输入账户联系手机号" />
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
