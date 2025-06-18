import MyAutoComplete from "@/components/AutoComplete/MyAutoComplete";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { createCustomer, getAddressList, getCustomerList } from "@/services/y2/api";
import orderDraft from "@/store/order/orderDraft";
import { Col, Flex, Form, Modal, Row, Select, Space } from "antd"
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import styled from "styled-components";


function CreateCustomerModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const [customerList,setCustomerList] = useState([]);

    const [country,setCountry] = useState("44");

    const countryList = JSON.parse(sessionStorage.getItem("country") || "[]").map((item:any)=>{
        return {
            value:item.country_id,
            label:"+"+item.codes,
            codes:item.codes,
            name:item.country_name
        }
    });

    // 自定义验证规则
    const validateContactInfo  = () => {
        return ({ getFieldValue }) => ({
            validator(_, __) {
                const email = getFieldValue('email');
                const phone = getFieldValue('phone');
                if (!email && !phone) {
                    return Promise.reject(new Error('邮箱和手机号至少填写一项'));
                }
                // 邮箱格式验证
                if (email && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
                    return Promise.reject(new Error('请输入有效的邮箱地址'));
                }
                // 手机号格式验证（简化版，可根据实际需求调整）
                if (phone && !/^\d{6,20}$/.test(phone)) {
                    return Promise.reject(new Error('请输入6-20位数字的手机号'));
                }
                return Promise.resolve();
            },
        });
    };

    const submit = ()=>{
        form.validateFields().then((values)=>{
            const codes = countryList.find((item:any)=>item.value==country)?.codes
            setLoading(true)
            // 更新订单数据
            createCustomer({
                id:0,
                languages_id:"",
                first_name:values.firstName,
                last_name:values.lastName,
                email:values.email,
                // tel:values.phone,
                realname:values.firstName+values.lastName,
                add_time:'',
                job:'',
                area_code:codes,
                mobile:values.phone,
                qq:'',
                wechat:'',
                country:'',
                city:'',
                address:'',
                postcode:'',
                source:'',
                remark:'',
                category_id:0,
                sex:0,
                is_share:0,
                status:0,
            }).then(res=>{
                setIsModalOpen(false);
            }).catch(()=>{
            }).finally(() => {
                setLoading(false);
            })
        }).catch((errorInfo) => { 
        });
    }

    const cancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    useEffect(()=>{
        getCustomerList(1,200).then(res=>{
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
                // 客户信息
                orderDraft.setCustomerInfo({
                    id:option.info.id,
                    country:option.info.country,
                    countryCode:"",
                    countryCode2:"",
                    province:"",
                    provinceCode:"",
                    city:option.info.city,
                    cityCode:"",
                    company:"",
                    firstName:option.info.first_name,
                    lastName:option.info.last_name,
                    name:option.info.first_name+option.info.last_name,
                    mobile:option.info.tel,
                    email:option.info.email,
                    postcode:option.info.postcode,
                    suburb:"",
                    address:option.info.address,
                })
                // 客户默认地址
                getAddressList({
                    customer_id:option.info.id
                }).then(res=>{
                    // 客户地址列表
                    orderDraft.setCustomerAddressList(res.data)
                    const address = res.data.filter((item:any)=>item.is_master == "1")[0]
                    if(address){
                        orderDraft.setReceiverInfo({
                            receiverId:address.address_book_id,
                            receiverAddress:address.entry_suburb,
                            receiverAddressAdd:address.entry_street_address,
                            receiverCountry:address.entry_country,
                            receiverCountryCode:address.entry_country_id,
                            receiverCountryCode2:"",
                            receiverCountryCode3:"",
                            receiverProvince:address.entry_state,
                            receiverProvinceCode:address.entry_state_id,
                            receiverCity:address.entry_city,
                            receiverCityCode:address.entry_city_id,
                            receiverCompany:address.entry_company,
                            receiverFirstName:address.entry_firstname,
                            receiverLastName:address.entry_lastname,
                            receiverMobile:address.entry_mobilephone,
                            receiverName:address.entry_firstname+address.entry_lastname,
                            receiverPostcode:address.entry_postcode
                        })
                        orderDraft.setPayBillInfo({
                            payBillId:address.address_book_id,
                            payBillAddress:address.entry_suburb,
                            payBillAddressAdd:address.entry_street_address,
                            payBillCountry:address.entry_country,
                            payBillCountryCode:address.entry_country_id,
                            payBillCountryCode2:"",
                            payBillCountryCode3:"",
                            payBillProvince:address.entry_state,
                            payBillProvinceCode:address.entry_state_id,
                            payBillCity:address.entry_city,
                            payBillCityCode:address.entry_city_id,
                            payBillCompany:address.entry_company,
                            payBillFirstName:address.entry_firstname,
                            payBillLastName:address.entry_lastname,
                            payBillMobile:address.entry_mobilephone,
                            payBillName:address.entry_firstname+address.entry_lastname,
                            payBillPostcode:address.entry_postcode,
                            is_same_delivery:"1"
                        })
                    }
                }).catch(err=>{ 
                    console.log(err)
                })
                
            }} placeholder="搜索或创建客户" options={customerList} onClick={()=>setIsModalOpen(true)} />
            <MyModal title={<div>创建客户</div>} width={620} centered open={isModalOpen} onOk={handleOk} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"创建"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form style={{marginTop:"24px"}} form={form} layout="vertical">
                    <Row gutter={[20,20]}>
                        <Col span={12}>
                            <FormItem label="名字" name="lastName" required={false} rules={[{required:true}]}>
                                <MyInput placeholder="请填写名字" style={{width:"100%",height:"36px"}} />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="姓氏" name="firstName" required={false} rules={[{required:true}]}>
                                <MyInput placeholder="请填写姓氏" style={{width:"100%",height:"36px"}} />
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="邮箱" name="email">
                        <MyInput placeholder="请填写邮箱" style={{width:"100%",height:"36px"}} rules={[
                            validateContactInfo()
                        ]} />
                    </FormItem>
                    <FormItem label="手机">
                        <Space.Compact style={{width:"100%",display:"flex"}} className="form-item-phone">
                            <MySelect
                                options={countryList}
                                value={country}
                                style={{width:"100px",height:"36px"}} 
                                popupMatchSelectWidth={false} 
                                onSelect={(value:string)=>{
                                    setCountry(value)
                                }}
                                optionRender={(option:any) => {
                                    return <Space>
                                        {option.data.name}{"(+"+option.data.codes+")"}
                                    </Space>
                                }} 
                            />
                            <FormItem label={false} name="phone" style={{flex:1}} rules={[
                                validateContactInfo()
                            ]}>
                                <MyInput placeholder="请填写手机号" style={{width:"100%",height:"36px"}} />
                            </FormItem>
                        </Space.Compact>
                    </FormItem>
                </Form>
            </MyModal>
        </>
    )
}


const MyModal = styled(Modal)` 
    .form-item-phone{
        position: relative;
        .ant-form-item-explain{
            color:#FFFFFF;
            position: absolute;
            left:-100px;
        }
    }
`


export default CreateCustomerModal