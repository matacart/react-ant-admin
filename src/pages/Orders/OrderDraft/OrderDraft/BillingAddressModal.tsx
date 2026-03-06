import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { addAddress, getCityList, getProvinceList, setAddressEdit } from "@/services/y2/api";
import orderDraft from "@/store/order/orderDraft";
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

    const [loading,setLoading] = useState(false);

    const [countryOptions, setCountryOptions] = useState<CountryList>([]);
    const [provinceOptions, setProvinceOptions] = useState<ProvinceList>([]);
    const [cityOptions, setCityOptions] = useState<CityList>([]);

    const [isDelivery,setIsDelivery] = useState(false);

    // 区
    const [isZone,setIsZone] = useState(false);

    const [options,setOptions] = useState([
        {
            value: '0',
            label: '使用新地址',
        },
    ]);

    const [form] = Form.useForm();

    const submit = ()=>{
        form.validateFields().then(values=>{
            // 与账单地址相同
            if(values.id == "-1"){
                orderDraft.setPayBillInfo({
                    payBillId:orderDraft.receiverInfo?.receiverId ?? "",
                    payBillCountry:values?.country,
                    payBillCountryCode:values?.countryId,
                    payBillCountryCode2:values?.countryCode2,
                    payBillCountryCode3:values?.countryCode3,
                    payBillProvinceCode:values?.stateId,
                    payBillProvince:values?.state,
                    payBillCityCode:values?.cityId,
                    payBillCity:values?.city,
                    // zone:"",
                    payBillName:values?.firstName +  values?.lastName,
                    payBillFirstName:values?.firstName,
                    payBillLastName:values?.lastName,
                    payBillCompany:values?.company,
                    payBillAddress:values?.address,
                    payBillAddressAdd:values?.address2,
                    payBillPostcode:values?.postalCode,
                    payBillMobile:values?.tel,
                    is_same_delivery:values.id == "-1" ? "1":"0",
                })
                setOpen(false)
            }else{
                // 与账单地址不相同
                const newAddress = orderDraft.customerAddressList.find(item=>item.address_book_id == values.id) || {}
                if(JSON.stringify(newAddress) == "{}"){
                    // 创建客户历史地址
                    setLoading(true)
                    addAddress({
                        customer_id:orderDraft.customerInfo?.id,
                        entry_gender:"",
                        entry_firstname:values.firstName??"",
                        entry_lastname:values.lastName??"",
                        entry_company:values.company??"",
                        entry_country_id:values.countryId??"",
                        entry_country:values.country??"",
                        entry_country_code_2:values.countryCode2??"",
                        entry_country_code_3:values.countryCode3??"",
                        entry_state_id:values.stateId??"",
                        entry_state:values.state??"",
                        entry_city_id:values.cityId??"",
                        entry_city:values.city??"",
                        // entry_zone_id
                        entry_postcode:values.postalCode??"",
                        entry_suburb:values.address??"",
                        entry_street_address:values.address2??"",
                        entry_email:values.email??"",
                        entry_mobilephone:values.tel??"",

                        is_master:"0"
                    }).then(res=>{
                        orderDraft.setPayBillInfo({
                            payBillId:res.data.address_book_id,
                            payBillCountry:values?.country,
                            payBillCountryCode:values?.countryId,
                            payBillCountryCode2:values?.countryCode2,
                            payBillCountryCode3:values?.countryCode3,
                            payBillProvinceCode:values?.stateId,
                            payBillProvince:values?.state,
                            payBillCityCode:values?.cityId,
                            payBillCity:values?.city,
                            // zone:"",
                            payBillName:values?.firstName +  values?.lastName,
                            payBillFirstName:values?.firstName,
                            payBillLastName:values?.lastName,
                            payBillCompany:values?.company,
                            payBillAddress:values?.address,
                            payBillAddressAdd:values?.address2,
                            payBillPostcode:values?.postalCode,
                            payBillMobile:values?.tel,
                            is_same_delivery:"0",
                        })
                        setOpen(false);
                    }).catch(err=>{
                    }).finally(()=>{
                        setLoading(false)
                    })
                }else{
                    // 编辑客户历史地址
                    setLoading(true)
                    setAddressEdit({
                        ...newAddress,
                        entry_firstname:values.firstName??"",
                        entry_lastname:values.lastName??"",
                        entry_company:values.company??"",
                        entry_country_id:values.countryId??"",
                        entry_country:values.country??"",
                        entry_country_code_2:values.countryCode2??"",
                        entry_country_code_3:values.countryCode3??"",
                        entry_state_id:values.stateId??"",
                        entry_state:values.state??"",
                        entry_city_id:values.cityId??"",
                        entry_city:values.city??"",
                        entry_postcode:values.postalCode??"",
                        entry_suburb:values.address??"",
                        entry_street_address:values.address2??"",
                        entry_email:values.email??"",
                        entry_mobilephone:values.tel??"",
                        // 'entry_zone_id',
                    }).then(()=>{
                        orderDraft.setPayBillInfo({
                            payBillId:orderDraft.payBillInfo?.payBillId ?? "",
                            payBillCountry:values?.country,
                            payBillCountryCode:values?.countryId,
                            payBillCountryCode2:values?.countryCode2,
                            payBillCountryCode3:values?.countryCode3,
                            payBillProvinceCode:values?.stateId,
                            payBillProvince:values?.state,
                            payBillCityCode:values?.cityId,
                            payBillCity:values?.city,
                            // zone:"",
                            payBillName:values?.firstName +  values?.lastName,
                            payBillFirstName:values?.firstName,
                            payBillLastName:values?.lastName,
                            payBillCompany:values?.company,
                            payBillAddress:values?.address,
                            payBillAddressAdd:values?.address2,
                            payBillPostcode:values?.postalCode,
                            payBillMobile:values?.tel,
                            is_same_delivery:values.id == "-1" ? "1":"0",
                        })
                        setOpen(false);
                    }).catch(()=>{
                    }).finally(()=>{
                        setLoading(false)
                    })
                }
            }
        })
    }

    const cancel = () => {
        setOpen(false);
    };

    // 根据address_book_id 匹配地址信息
    const setFormInfo = (value:string)=>{
        if(value == "-1"){
            setIsDelivery(true)
            const address = orderDraft.receiverInfo
            form.setFieldsValue({
                id:"-1",
                countryId:address?.receiverCountryCode,
                country:address?.receiverCountry,
                countryCode2:address?.receiverCountryCode2,
                countryCode3:address?.receiverCountryCode3,
                stateId:address?.receiverProvinceCode,
                state:address?.receiverProvince,
                cityId:address?.receiverCityCode,
                city:address?.receiverCity,
                zone:"",
                lastName:address?.receiverLastName,
                firstName:address?.receiverFirstName,
                company:address?.receiverCompany,
                address:address?.receiverAddress,
                address2:address?.receiverAddressAdd,
                postalCode:address?.receiverPostcode,
                tel:address?.receiverMobile,
            })
        }else{
            setIsDelivery(false)
            const address = orderDraft.customerAddressList.filter(item=>item.address_book_id == value)[0]
            form.setFieldsValue({
                id:address?.address_book_id??"0",
                address:address?.entry_suburb,
                address2:address?.entry_street_address,
                country:address?.entry_country,
                countryId:address?.entry_country_id,
                countryCode2:address?.entry_country_code_2,
                countryCode3:address?.entry_country_code_3,
                state:address?.entry_state,
                stateId:address?.entry_state_id,
                city:address?.entry_city,
                cityId:address?.entry_city_id,
                company:address?.entry_company,
                firstName:address?.entry_firstname,
                lastName:address?.entry_lastname,
                tel:address?.entry_mobilephone,
                postalCode:address?.entry_postcode
            })
        }
    }

    // 表单初始化
    const formInit = ()=>{

        const newOptions = orderDraft.customerAddressList.map((item:any,index:number)=>{
            return {
                value: item.address_book_id,
                label: (item.entry_country?item.entry_country+"-":"")+(item.entry_suburb??"")+"("+item.entry_firstname+item.entry_lastname+")",
            }
        })

        setOptions([
            {
                label:"与收货地址相同",
                value:"-1"
            },
            ...newOptions,
            {
                label:"使用新地址",
                value:"0"
            },
        ])
        orderDraft.payBillInfo?.payBillCountryCode && getProvinceList(orderDraft.payBillInfo?.payBillCountryCode).then(res=>{
            setProvinceOptions(res.data.map((item:any)=>{
                return {
                    value: item.id,
                    label: item.name,
                }
            }))
        })
        orderDraft.payBillInfo?.payBillProvinceCode && getCityList(orderDraft.payBillInfo?.payBillProvinceCode).then(res=>{
            setCityOptions(res.data.map((item:any)=>{
                return {
                    value: item.id,
                    label: item.name,
                }
            }))
        })
        setFormInfo(orderDraft.payBillInfo?.is_same_delivery == "1" ? "-1" : orderDraft.payBillInfo?.payBillId)
    }

    useEffect(()=>{
        const newCountry = JSON.parse(sessionStorage.getItem("country") || "[]").map((item:any)=>{
            return {
                value: item.country_id,
                label: item.country_name,
                iso_code_2:item.iso_code_2,
                iso_code_3:item.iso_code_3,
            }
        })
        setCountryOptions(newCountry)
    },[])

    return (
        <>
            <div className='color-356DFF cursor-pointer' onClick={()=>{
                formInit()
                setOpen(true)
            }}>编辑</div>
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
                            <PrimaryButton text={"完成"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form form={form} layout="vertical" className="my-form" disabled={isDelivery}>
                    <Form.Item label="选择地址" name="id">
                        <MySelect style={{height:"36px"}} onChange={(value:string)=>setFormInfo(value)} options={options} disabled={false}  />
                    </Form.Item>
                    <Form.Item
                        label="国家/地区"
                        name="countryId"
                        rules={[{ message: '请选择国家/地区!' }]}
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
                                country:option.label,
                                countryCode2:option.iso_code_2,
                                countryCode3:option.iso_code_3,
                                stateId:"",
                                state:"",
                                city:"",
                                cityId:""
                            })
                        }} />
                    </Form.Item>
                    {provinceOptions.length>0 ? <Row gutter={[10,10]}>
                        <Col span={12}>
                            <Form.Item
                                label="省份"
                                name="stateId"
                                rules={[{ message: '请选择省份!' }]}
                            >
                                <MySelect placeholder="省份" showSearch style={{height:"36px"}} options={provinceOptions}onChange={(value:string,option:any)=>{
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
                                        state:option.label,
                                        city:"",
                                        cityId:""
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="城市"
                                name="cityId"
                                rules={[{ message: '请选择城市!' }]}
                            >
                                <MySelect placeholder="城市" showSearch style={{height:"36px"}} options={cityOptions} onChange={(value:string,option:any)=>{
                                    form.setFieldsValue({
                                        ...form.getFieldsValue(),
                                        city:option.label,
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>:<Row gutter={[10,10]}>
                        <Col span={24}>
                            <Form.Item
                                label="城市"
                                name="city"
                                rules={[{ message: '请选择城市!' }]}
                            >
                                <MyInput style={{height:"36px"}} placeholder="城市" onChange={(e)=>{
                                    form.setFieldsValue({
                                        ...form.getFieldsValue(),
                                        cityId:"",
                                    })
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>}
                    {isZone && <Row>
                        <Col span={24}>
                            <Form.Item
                                label="区"
                                name="zone"
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

                    {/* 隐藏表单项 */}
                    <Form.Item name="city" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="state" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="countryCode3" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="countryCode2" hidden>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="country" hidden>
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

export default BillingAddressModal