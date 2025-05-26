import MyAlert from "@/components/Alert/MyAlert";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { setOrderContact } from "@/services/y2/api";
import order from "@/store/order/order";
import { Flex, Form, Modal, Space } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

function ContactInformation() {

    const [open,setOpen] = useState(false);

    const [codes,setCodes] = useState("+86");

    const [countryList,setCountryList] = useState([]);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const [isInfo,setInfo] = useState(false);
   
    const cancel = ()=>{
        setOpen(false);
    }

    const submit = ()=>{
        form.validateFields().then((values)=>{
            if((values.email??"") == "" && (values.phone??"") == ""){
                setInfo(true);
                return;
            }else{
                setLoading(true);
                setOrderContact({
                    orderId:order.orderInfo.order_id,
                    customerTelephone:values.phone,
                    customerEmail:values.email
                }).then(()=>{
                    order.triggerRefresh()
                    setInfo(false);
                    setOpen(false);
                }).catch(()=>{
                }).finally(()=>{
                    setLoading(false);
                })
            }
        })
    }

    useEffect(()=>{
        // const country = JSON.parse(sessionStorage.getItem("country") || "[]").map(item=>{
        //     return {
        //         value: item.country_id,
        //         label: "+"+item.codes,
        //         country:item
        //     }
        // })
        // setCountryList(country)
    },[])

    return (
        <>
            <span className="color-356DFF cursor-pointer" onClick={() => {
                form.setFieldsValue({
                    email: order.orderInfo.customer_email_address,
                    phone: order.orderInfo.customer_telephone
                })
                setOpen(true)
            }}>编辑</span>
            <MyModal title="编辑联系信息" width={620} open={open} onCancel={cancel} centered
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <div className="color-474F5E" style={{marginTop:"20px"}}>更新的联系信息仅应用于本订单</div>
                {isInfo && <MyAlert message="请至少保留一种联系信息" showIcon type="warning" style={{
                    marginTop:"20px",
                    height:"38px",
                    backgroundColor:"#FFEDC9"
                }} />}
                <Form form={form} layout="vertical" style={{margin:"20px 0 40px"}}>
                    <Form.Item label="电子邮箱" name="email" rules={[
                        {
                            type: 'email',
                            message: '请输入正确的邮箱',
                        },
                    ]}>
                        <MyInput style={{height:"36px"}} placeholder="请输入电子邮箱" />
                    </Form.Item>
                    <Form.Item label="手机号码" className="phone-number">
                        <Space.Compact style={{width:"100%"}}>
                            {/* <MySelect value={codes} options={countryList} style={{height:"36px",width:"120px"}}
                            popupMatchSelectWidth={false}
                            optionRender={(option) => {
                                return <Space>
                                    {option.data.country.country_name}{"("+option.data.label+")"}
                                </Space>
                            }}
                            onChange={(value:string)=>{
                                setCodes(value)
                            }} /> */}
                            <Form.Item 
                                name="phone"
                                validateFirst={true}
                                style={{ flex: 1 }}
                                rules={[
                                    {
                                        pattern: /^\d+$/,
                                        message: '请输入正确的手机号码',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                        // 通用校验规则
                                        if (value && (value.length < 8 || value.length > 15)) {
                                            return Promise.reject('请输入正确的手机号码');
                                        }
                                        return Promise.resolve();
                                        }
                                    })
                                ]}
                            >
                                <MyInput placeholder="请输入手机号码" allowClear style={{height:"36px"}} />
                            </Form.Item>
                        </Space.Compact> 
                    </Form.Item>
                           
                </Form>
            </MyModal>
        </>
    );
}

const MyModal = styled(Modal)`
    .phone-number{
        /* .ant-form-item-explain-error{
            position: relative;
            left: -120px;
        } */
    }
`

export default ContactInformation;