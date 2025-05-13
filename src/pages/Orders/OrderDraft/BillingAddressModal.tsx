import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { getCityList, getProvinceList } from "@/services/y2/api";
import order from "@/store/order/order";
import { Col, Flex, Form, Input, Modal, Row, Select, Space } from "antd"
import { useEffect, useState } from "react";
import { styled } from 'styled-components';


type AddressOption = {
    value: string;
    label: string;
};
  
type CountryList = AddressOption[];

type ProvinceList = AddressOption[];

type CityList = AddressOption[];

function BillingAddressModal(){

    const [open, setOpen] = useState(false);

    const [countryOptions, setCountryOptions] = useState<CountryList>([]);
    const [provinceOptions, setProvinceOptions] = useState<ProvinceList>([]);
    const [cityOptions, setCityOptions] = useState<CityList>([]);

    const [form] = Form.useForm();

    const submit = ()=>{
        form.submit()
        // 更新订单数据
        order.setPayBillInfo({
            ...form.getFieldsValue(),
            countryLabel:countryOptions.find(item=>item.value === form.getFieldsValue().country)?.label || "",
            provinceLabel:provinceOptions.find(item=>item.value === form.getFieldsValue().province)?.label || "",
            cityLabel:provinceOptions.length == 0 ? form.getFieldsValue().city : cityOptions.find(item=>item.value === form.getFieldsValue().city)?.label || "",
        })
        setOpen(false);
    }

    const cancel = () => {
        setOpen(false);
    };

    useEffect(()=>{
        const newCountry = JSON.parse(sessionStorage.getItem("country") || "[]").map((item:any)=>{
            return {
                value: item.country_id,
                label: item.country_name,
            }
        })
        setCountryOptions(newCountry)

        // 

        form.setFieldsValue({
            ...order.payBillInfo
        })
    },[])

    return (
        <>
            <div className='color-356DFF cursor-pointer' onClick={()=>setOpen(true)}>编辑</div>
            {/* 收货地址模态框 */}
            <MyModal
                title="账单地址"
                open={open}
                width={620}
                onCancel={cancel}
                classNames={{content:'my-modal-content',header:"my-modal-head",footer:"my-modal-foot",body:"my-modal-body"}}
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"完成"} onClick={submit} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" className="my-form">
                    <Form.Item label="选择地址">
                        <MySelect value={"1"} style={{height:"36px"}} options={[
                            {
                                value: '1',
                                label: '使用新地址',
                            },
                        ]} />
                    </Form.Item>
                    <Form.Item
                        label="国家/地区"
                        name="country"
                        rules={[{  message: '请选择国家/地区!' }]}
                        >
                        <MySelect placeholder="国家/地区" showSearch style={{height:"36px"}} options={countryOptions} onChange={(value:string)=>{
                            getProvinceList(value).then(res=>{
                                setProvinceOptions(res.data.map((item:any)=>{
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    }
                                }))
                            })

                            // 
                            form.setFieldsValue({
                                province:undefined,
                                city:undefined,
                            })
                        }} />
                    </Form.Item>
                    {provinceOptions.length>0 ? <Row gutter={[10,10]}>
                        <Col span={12}>
                            <Form.Item
                                label="省份"
                                name="province"
                                rules={[{ message: '请选择省份!' }]}
                            >
                                <MySelect placeholder="省份" showSearch style={{height:"36px"}} options={provinceOptions} onChange={(value:string)=>{
                                    getCityList(value).then(res=>{
                                        setCityOptions(res.data.map((item:any)=>{
                                            return {
                                                value: item.id,
                                                label: item.name,
                                            }
                                        }))
                                    })
                                    // 
                                    form.setFieldsValue({
                                        city:undefined,
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="城市"
                                name="city"
                                rules={[{ message: '请选择城市!' }]}
                            >
                                <MySelect placeholder="城市" showSearch style={{height:"36px"}} options={cityOptions} />
                            </Form.Item>
                        </Col>
                    </Row>:<Row gutter={[10,10]}>
                        <Col span={24}>
                            <Form.Item
                                label="城市"
                                name="city"
                                rules={[{ message: '请选择城市!' }]}
                            >
                                <MyInput style={{height:"36px"}} placeholder="城市" />
                            </Form.Item>
                        </Col>
                    </Row>}
                    

                    <Row gutter={[10,10]}>
                        <Col span={12}>
                            <Form.Item
                                label="名"
                                name="lastName"
                                rules={[{ message: '请输入您的名!' }]}
                            >
                                <MyInput style={{height:"36px"}} placeholder="名" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="姓"
                                name="firstName"
                                rules={[{ message: '请输入您的姓!' }]}
                            >
                                <MyInput style={{height:"36px"}} placeholder="姓" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="公司"
                        name="company"
                        rules={[{  message: '请输入公司名称!' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="公司" />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="address"
                        rules={[{  message: '请输入公司名称!' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="地址" />
                    </Form.Item>
                    <Form.Item
                        label="详细地址"
                        name="address2"
                    >
                        <MyInput style={{height:"36px"}} placeholder="详细地址" />
                    </Form.Item>
                    <Form.Item
                        label="邮政"
                        name="postalCode"
                        rules={[{ message: '请输入邮政编码!' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="邮政" />
                    </Form.Item>
                    <Form.Item
                        label="手机"
                        name="tel"
                        rules={[{message: '请输入手机号码!' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="手机" />
                    </Form.Item>
                </Form>
            </MyModal>
        </>
    )
}

const MyModal = styled(Modal)`
    .my-modal-content{
        padding: 0;
    }
    .my-modal-body{
        padding-left: 20px;
    }
    .my-modal-head{
        padding: 20px 20px 12px 20px;
    }
    .my-modal-foot{
        padding: 12px 20px 20px 20px;
    }
    
    .my-form{
        max-height: calc(100vh - 300px);
        /* 核心解决方案 */
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 3px;
        scrollbar-gutter: stable;
    }
  
`

export default BillingAddressModal