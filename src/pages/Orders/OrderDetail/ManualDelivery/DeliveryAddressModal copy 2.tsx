
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { setOrderShippingAddress } from "@/services/y2/api";
import { getCityList, getProvinceList } from "@/services/y2/apiAppstore";
import { Checkbox, Col, Flex, Form, Input, Modal, Row, Select, Space } from "antd"
import { useEffect, useMemo, useState } from "react";
import { styled } from 'styled-components';
import orderManualDelivery from "@/store/order/orderManualDelivery";
import { CountryCodeToStringTemplateMap,StringTemplateMap } from "@/../public/json/template.json";


type AddressOption = {
    value: string;
    label: string;
    iso_code_2: string;
    iso_code_3: string;
};
  
type CountryList = AddressOption[];

type ProvinceList = AddressOption[];

// 解析 schema -> [[{name}, {name}], [{name}], ...]
function parseSchema(schema:string) {
  return schema.split('_').filter(Boolean).map((group) =>[...group.matchAll(/\{(\w+)\}/g)].map((m) => m[1]));
}


function DeliveryAddressModal(){

    const [open, setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const [countryOptions, setCountryOptions] = useState<AddressOption[]>([]);
    const [provinceOptions, setProvinceOptions] = useState<ProvinceList>([]);
    const [cityOptions, setCityOptions] = useState<AddressOption[]>([]);

    const [templateSchema,setTemplateSchema] = useState<string[][]>([]);

    // 区
    const [isZone,setIsZone] = useState(false);

    const submit = ()=>{
        
    }
    const cancel = () => {
        setOpen(false);
    };

    useEffect(()=>{
        const newCountry = JSON.parse(localStorage.getItem("MC_DATA_COUNTRY") || "[]").map((item:any)=>{
            return {
                value: item.country_id,
                label: item.country_name,
                iso_code_2:item.iso_code_2,
                iso_code_3:item.iso_code_3,
            }
        })
        setCountryOptions(newCountry)
        // orderDelivery.deliveryAddress.delivery_country_id && getProvinceList(orderDelivery.deliveryAddress.delivery_country_id).then(res=>{
        //     setProvinceOptions(res.data.map((item:any)=>{
        //         return {
        //             value: item.id,
        //             label: item.name,
        //         }
        //     }))
        // })
        // orderDelivery.deliveryAddress.delivery_state_id && getCityList(orderDelivery.deliveryAddress.delivery_state_id).then(res=>{
        //     setCityOptions(res.data.map((item:any)=>{
        //         return {
        //             value: item.id,
        //             label: item.name,
        //         }
        //     }))
        // })
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
                }}>
                    {templateSchema.map((fields, rowIdx) => {
                        // 单字段：独占一行
                        if (fields.length === 1) {
                            return (
                                <Form.Item>
                                    <MyInput style={{height:"36px"}} placeholder={""} />
                                </Form.Item>
                            );
                        }
                    })}
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
                        <MySelect placeholder="国家/地区" showSearch style={{height:"36px"}} options={countryOptions} onChange={(value:string,option)=>{
                            const iso = (option as AddressOption | undefined)?.iso_code_2;
                            const templateId = CountryCodeToStringTemplateMap[iso as keyof typeof CountryCodeToStringTemplateMap]
                            const template = StringTemplateMap[templateId.toString() as keyof typeof StringTemplateMap]
                            setTemplateSchema(parseSchema(template))
                        }} />
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