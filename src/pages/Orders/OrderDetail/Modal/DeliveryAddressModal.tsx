
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { getCityList, getProvinceList, setOrderShippingAddress } from "@/services/y2/api";
import order from "@/store/order/order";
import { Checkbox, Col, Flex, Form, Input, Modal, Row, Select, Space } from "antd"
import { useEffect, useState } from "react";
import { styled } from 'styled-components';


type AddressOption = {
    value: string;
    label: string;
};
  
type CountryList = AddressOption[];

type ProvinceList = AddressOption[];

type CityList = AddressOption[];

function DeliveryAddressModal(){

    const [open, setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [countryOptions, setCountryOptions] = useState<CountryList>([]);
    const [provinceOptions, setProvinceOptions] = useState<ProvinceList>([]);
    const [cityOptions, setCityOptions] = useState<CityList>([]);

    // 区
    const [isZone,setIsZone] = useState(false);

    const [form] = Form.useForm();

    const submit = ()=>{
        form.validateFields().then((values)=>{
            setLoading(true)
            setOrderShippingAddress({
                orderId:order.orderInfo.order_id,
                ...values,
                deliveryName:values.deliveryFirstname+values.deliveryLastname
            }).then(res=>{
                // 更新订单数据
                order.triggerRefresh();
                setOpen(false);
            }).catch(error=>{
                console.log(error)
            }).finally(()=>{
                setLoading(false)
            })
        })
    }
    const cancel = () => {
        setOpen(false);
    };

    useEffect(()=>{
        const newCountry = JSON.parse(sessionStorage.getItem("country") || "[]").map((item:any)=>{
            return {
                value: item.country_id,
                label: item.country_name,
                iso_code_2:item.iso_code_2,
                iso_code_3:item.iso_code_3,
            }
        })
        order.orderInfo.delivery_country_id && getProvinceList(order.orderInfo.delivery_country_id).then(res=>{
            setProvinceOptions(res.data.map((item:any)=>{
                return {
                    value: item.id,
                    label: item.name,
                }
            }))
        })
        order.orderInfo.delivery_state_id && getCityList(order.orderInfo.delivery_state_id).then(res=>{
            setCityOptions(res.data.map((item:any)=>{
                return {
                    value: item.id,
                    label: item.name,
                }
            }))
        })
        setCountryOptions(newCountry)
    },[])

    return (
        <>
            <div className='color-356DFF cursor-pointer' onClick={()=>{
                form.resetFields()
                setOpen(true)
            }}>编辑</div>
            <MyModal
                title={"编辑收货地址"}
                open={open}
                width={620}
                onCancel={cancel}
                classNames={{content:'my-modal-content',header:"my-modal-head",footer:"my-modal-foot",body:"my-modal-body"}}
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" className="my-form" initialValues={{
                    deliveryTelephone:order.orderInfo.delivery_telephone,
                    deliveryFirstname:order.orderInfo.delivery_firstname,
                    deliveryLastname:order.orderInfo.delivery_lastname,
                    deliveryCompany:order.orderInfo.delivery_company,
                    deliveryStreetAddress:order.orderInfo.delivery_street_address,
                    deliverySuburb:order.orderInfo.delivery_suburb,
                    deliveryPostcode:order.orderInfo.delivery_postcode,
                    deliveryCity:order.orderInfo.delivery_city,
                    deliveryCityId:order.orderInfo.delivery_city_id,
                    deliveryState:order.orderInfo.delivery_state,
                    deliveryStateId:order.orderInfo.delivery_state_id,
                    deliveryCountryCode3:order.orderInfo.delivery_country_code_3,
                    deliveryCountryCode2:order.orderInfo.delivery_country_code_2,
                    deliveryCountry:order.orderInfo.delivery_country,
                    deliveryCountryId:order.orderInfo.delivery_country_id
                }}>
                    <Form.Item
                        label="收货人电话号码"
                        name="deliveryTelephone"
                        required={false}
                        rules={[{required: true,message: <span className="">请输入收货人电话号码</span> }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="请输入收货人电话号码" />
                    </Form.Item>
                    <Form.Item
                        label="国家/地区"
                        name="deliveryCountryId"
                        required={false}
                        rules={[{ required: true, message: '请选择国家/地区' }]}
                        >
                        <MySelect placeholder="国家/地区" showSearch style={{height:"36px"}} options={countryOptions} onChange={(value:string,option:any)=>{
                            getProvinceList(value).then(res=>{
                                setProvinceOptions(res.data.map((item:any)=>{
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    }
                                }))
                            })
                            parseInt(value) == 44 ? setIsZone(true) : setIsZone(false)
                            form.setFieldsValue({
                                ...form.getFieldsValue(),
                                deliveryCountry:option.label,
                                deliveryCountryCode2:option.iso_code_2,
                                deliveryCountryCode3:option.iso_code_3,
                                deliveryStateId:"",
                                deliveryState:"",
                                deliveryCity:"",
                                deliveryCityId:""
                            })
                        }} />
                    </Form.Item>
                    {provinceOptions.length>0 ? <Row gutter={[10,10]}>
                        <Col span={12}>
                            <Form.Item
                                label="省份"
                                name="deliveryStateId"
                                required={false}
                                rules={[{ required: true, message: '请选择省份' }]}
                            >
                                <MySelect placeholder="省份" showSearch style={{height:"36px"}} options={provinceOptions} onChange={(value:string,option:any)=>{
                                    getCityList(value).then(res=>{
                                        setCityOptions(res.data.map((item:any)=>{
                                            return {
                                                value: item.id,
                                                label: item.name,
                                            }
                                        }))
                                    })
                                    form.setFieldsValue({
                                        ...form.getFieldsValue(),
                                        deliveryState:option.label,
                                        deliveryCity:"",
                                        deliveryCityId:""
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="城市"
                                name="deliveryCityId"
                                required={false}
                                rules={[{ required: true, message: '请选择城市' }]}
                            >
                                <MySelect placeholder="城市" showSearch style={{height:"36px"}} options={cityOptions} onChange={(value:string,option:any)=>{
                                    form.setFieldsValue({
                                        ...form.getFieldsValue(),
                                        deliveryCity:option.label,
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>:<Row gutter={[10,10]}>
                        <Col span={24}>
                            <Form.Item
                                label="城市"
                                name="deliveryCity"
                                required={false}
                                rules={[{ required: true, message: '请输入城市!' }]}
                            >
                                <MyInput style={{height:"36px"}} placeholder="城市" onChange={(e)=>{
                                    form.setFieldsValue({
                                        ...form.getFieldsValue(),
                                        deliveryCityId:"",
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>}
                    {isZone && <Row>
                        <Col span={24}>
                            <Form.Item
                                label="区"
                                name="deliveryZone"
                                required={false}
                                rules={[{ required: true, message: '请输入区' }]}
                            >
                                <MyInput style={{height:"36px"}} placeholder="区" />
                            </Form.Item>  
                        </Col>
                    </Row>}
                    <Row gutter={[10,10]}>
                        <Col span={12}>
                            <Form.Item
                                label="名"
                                name="deliveryLastname"
                                required={false}
                                rules={[{ required: true, message: '请填写名' }]}
                            >
                                <MyInput style={{height:"36px"}} placeholder="名" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="姓"
                                name="deliveryFirstname"
                                required={false}
                                rules={[{ required: true, message: '请填写姓' }]}
                            >
                                <MyInput style={{height:"36px"}} placeholder="姓" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="公司"
                        name="deliveryCompany"
                    >
                        <MyInput style={{height:"36px"}} placeholder="公司" />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="deliverySuburb"
                        required={false}
                        rules={[{ required: true, message: '请填写地址' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="地址" />
                    </Form.Item>
                    <Form.Item
                        label="详细地址（公寓、门牌号等）"
                        name="deliveryStreetAddress"
                    >
                        <MyInput style={{height:"36px"}} placeholder="详细地址（公寓、门牌号等）" />
                    </Form.Item>
                    <Form.Item
                        label="邮政"
                        name="deliveryPostcode"
                    >
                        <MyInput style={{height:"36px"}} placeholder="邮政" />
                    </Form.Item>
                    <Form.Item label={false} name="isSendNotification" valuePropName="checked">
                        <Checkbox>向客户发送通知</Checkbox>
                    </Form.Item>

                    {/* 隐藏表单项 */}
                    <Form.Item name="deliveryCity" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="deliveryState" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="deliveryCountryCode3" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="deliveryCountryCode2" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="deliveryCountry" hidden>
                        <Input type="hidden" />
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

export default DeliveryAddressModal