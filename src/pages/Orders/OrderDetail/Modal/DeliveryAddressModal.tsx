
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { getCityList, getProvinceList } from "@/services/y2/apiAppstore";
import { App, Flex, Form, Modal } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react";
import { styled } from 'styled-components';
import { CountryCodeToStringTemplateMap,StringTemplateMap,templates } from "@/../public/json/template.json";
import { updateOrderReceiverInfo } from "@/services/y2/apiStore";


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

function DeliveryAddressModal({orderSeq,languagesId,receiverInfo,success}:{orderSeq:string,languagesId:string,receiverInfo:any,success:()=>void}){
    
    const [open, setOpen] = useState(false);

    const { message } = App.useApp();

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    // 表单配置项
    const [templateForm,setTemplateForm] = useState(templates["zh-CN"]);

    const [countryOptions, setCountryOptions] = useState<AddressOption[]>([]);
    const [provinceOptions, setProvinceOptions] = useState<ProvinceList>([]);
    const [cityOptions, setCityOptions] = useState<AddressOption[]>([]);

    const [templateSchema,setTemplateSchema] = useState<string[][]>([]);

    // 加载省份
    const loadProvince = useCallback(async (countryId: string) => {
        if (!countryId) {
            setProvinceOptions([]);
            return;
        }
        const res = await getProvinceList(countryId);
        setProvinceOptions((res.data || []).map((it: any) => ({ value: it.id, label: it.name })));
    }, []);

    // 加载城市
    const loadCity = useCallback(async (provinceId: string) => {
        if (!provinceId) {
            setCityOptions([]);
            return;
        }
        const res = await getCityList(provinceId);
        setCityOptions((res.data || []).map((it: any) => ({ value: it.id, label: it.name })));
    }, []);


    // 事件处理函数  国家 省份
    const handlers = useMemo<Record<string, (val: any, opt?: any) => void>>(() => ({
        country: (val, opt) => {
            // 清空依赖项
            form.setFields([
                { name: 'province', value: undefined, errors: [] },
                { name: 'city', value: undefined, errors: [] },
            ]);
            setProvinceOptions([]);
            setCityOptions([]);
            // 加载省份
            loadProvince(val);
            // 切换模板
            const countryObj = (opt as AddressOption | undefined);
            const iso = countryObj?.iso_code_2;
            if (iso) {
            const templateId = CountryCodeToStringTemplateMap[
                iso as keyof typeof CountryCodeToStringTemplateMap
            ];
            const template = StringTemplateMap[
                String(templateId) as keyof typeof StringTemplateMap
            ];
            if (template) setTemplateSchema(parseSchema(template));
            }
            // 切换国家代码
            form.setFieldsValue({
                receiverCountryName: countryObj?.label || "",
                receiverCountryCode: countryObj?.iso_code_2 || "",
            });
        },
        province: (val, opt) => {
            form.setFields([{ name: 'city', value: undefined, errors: [] }]);
            setCityOptions([]);
            loadCity(val);
            // 切换省份代码
            form.setFieldsValue({
                receiverProvinceName: (opt as AddressOption | undefined)?.label || "",
            });
        }
    }),[form, loadProvince, loadCity]);

    // options 映射：propKey -> options
    const optionsMap = useMemo<Record<string, AddressOption[]>>(() => ({
        country: countryOptions,
        province: provinceOptions,
        city: cityOptions,
    }),[countryOptions, provinceOptions, cityOptions]);

    /** 根据 interactionType 渲染对应控件 */
    const renderField = (item: any) => {
        const common:any = {
            placeholder: item.placeholder || '',
            style: { height: 36, width: '100%' }
        };
        // 绑定事件
        if(handlers[item.propKey]){common.onChange = (val: any, opt: any) =>handlers[item.propKey](val, opt)}
        switch (item.interactionType) {
            // 1 = 下拉/选择类
            case 1:
                return (
                    <MySelect
                        {...common}
                        options={optionsMap[item.propKey] || []}   // 有 options 就用，没有就空
                        allowClear
                    />
                );

            // 2 = 文本输入类
            case 2:
            default:
                return (
                    <MyInput {...common} maxLength={item.maxLength || undefined} />
                );
        }
    };

    const submit = ()=>{
        form.validateFields().then((value) => {
            const values = form.getFieldsValue(true); // 包含未注册字段
            setLoading(true);
            updateOrderReceiverInfo({
                languages_id:languagesId,
                addressSource:"",
                deliveryDescription:"",
                deliveryType:"HOME_STREET",
                localShipping:"",
                orderSeq:orderSeq,
                receiverFirstName:values.firstName,
                receiverLastName:values.lastName,
                receiverName:values.firstName + values.lastName,
                receiverAddress:values.address,
                receiverAddressAdd:values.address2,
                receiverArea:values.district,
                receiverAreaCode:"",
                receiverCertificatesNo:"",
                receiverCertificatesType:"",
                receiverCompany:values.company,
                receiverCountry:values.countryName,
                receiverCountryId:values.country,
                receiverCountryCode:values.countryCode,
                receiverProvince:values.provinceName,
                receiverProvinceCode:values.province,
                receiverCity:values.city,
                receiverCityCode:"",
                receiverMobile:values.mobile,
                receiverNeighborhood:"",
                receiverPostcode:values.postcode,
                receiverStoreCode:"",
                receiverStoreId:"",
                receiverStoreName:"",
                receiverUniqueKey:"",
                shippingType:"",
                taxNum:"",
                taxType:"",
            }).then((res)=>{
                if(res.code == 0){
                    success();
                    setOpen(false);
                }
            }).catch(()=>{
                message.error("err");
            }).finally(()=>{
                setLoading(false);
            })
        });
    }
    const cancel = () => {
        setOpen(false);
    };

    // 初始化国家选项
    useEffect(()=>{
        const newCountry = JSON.parse(localStorage.getItem("MC_DATA_COUNTRY") || "[]").map((item:any)=>{
            return {
                value: item.country_id,
                label: item.country_name,
                iso_code_2:item.iso_code_2,
                iso_code_3:item.iso_code_3,
            }
        })
        setCountryOptions(newCountry);
    },[])

    return (
        <>
            <div className='color-356DFF cursor-pointer' onClick={async ()=>{
                const countryObj = countryOptions.find((item:any)=>item.iso_code_2 == receiverInfo.receiverCountryCode);
                // 初始化省份选项
                if (countryObj?.value) {
                    await loadProvince(countryObj.value);
                }
                form.setFieldsValue({
                    firstName: receiverInfo?.receiverFirstName || "",
                    lastName: receiverInfo?.receiverLastName || "",
                    country: countryObj?.value || "",
                    countryCode: countryObj?.iso_code_2 || "",
                    countryName: countryObj?.label || "",
                    province: receiverInfo?.receiverProvinceCode || "",
                    provinceName: receiverInfo?.receiverProvince || "",
                    city: receiverInfo?.receiverCity || "",
                    district: receiverInfo?.receiverArea || "",
                    company: receiverInfo?.receiverCompany || "",
                    address: receiverInfo?.receiverAddress || "",
                    address2: receiverInfo?.receiverAddressAdd || "",
                    postcode: receiverInfo?.receiverPostcode || "",
                    mobile: receiverInfo?.receiverMobile || "",
                });
                // 初始化模板
                const templateId = CountryCodeToStringTemplateMap[countryObj?.iso_code_2 as keyof typeof CountryCodeToStringTemplateMap];
                const template = StringTemplateMap[String(templateId || 0) as keyof typeof StringTemplateMap];
                setTemplateSchema(parseSchema(template));
                setOpen(true);
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
                <Form form={form} layout="vertical" className="my-form">
                    {templateSchema.map((fields, rowIdx) => {
                        // 单字段：独占一行
                        if (fields.length === 1) {
                            const item = templateForm.find((item:any)=>item.propKey === fields[0])
                            return (
                                <Form.Item key={item?.propKey || rowIdx} label={item?.title || fields[0]} name={fields[0]}>
                                    {renderField(item)}
                                </Form.Item>
                            );
                        }
                        // 多字段：并排显示
                        return (<Flex style={{width:"100%"}} gap={20} key={rowIdx}>
                            {fields.map((name, colIdx) => {
                                const item = templateForm.find((item:any)=>item.propKey === name)
                                return(
                                    <Form.Item key={item?.propKey || name} label={item?.title || name} style={{flex:1}} name={name}>
                                        {renderField(item)}
                                    </Form.Item>
                                )
                            })}
                        </Flex>)
                    })}
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