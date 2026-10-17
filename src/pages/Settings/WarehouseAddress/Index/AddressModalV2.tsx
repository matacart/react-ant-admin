
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { getCityList, getProvinceList } from "@/services/y2/apiAppstore";
import { App, Flex, Form, Modal } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react";
import { styled } from 'styled-components';
import { CountryCodeToStringTemplateMap,StringTemplateMap,templates } from "@/../public/json/templateV2.json";
import { addWarehouse } from "@/services/y2/apiStore";


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

function DeliveryAddressModal({onRefresh}:{onRefresh:()=>void;}){
    
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
        getProvinceList(countryId).then((res) => {
            setProvinceOptions((res.data || []).map((it: any) => ({ value: it.id, label: it.name })));
        });
    }, []);

    // 加载城市
    const loadCity = useCallback(async (provinceId: string) => {
        if (!provinceId) {
            setCityOptions([]);
            return;
        }
        getCityList(provinceId).then((res) => {
            setCityOptions((res.data || []).map((it: any) => ({ value: it.id, label: it.name })));
        });
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

    // 提交表单
    const submit = ()=>{
        form.validateFields().then((value) => {
            const values = form.getFieldsValue(true); // 包含未注册字段
            setLoading(true);
            addWarehouse({
                name:values.locationName,
                code:values.code,
                capacity:values.capacity,
                country:values.receiverCountryName,
                country_id:values.receiverCountryCode,
                state:values.receiverProvinceName,
                state_id:values.province,
                city:values.city,
                city_id:"",
                district:values.district,
                postcode:values.postcode,
                address:values.address,
                detailed_address:values.address2,
                telephone:values.mobile,
                email_address:"",
            }).then((res) => {
                message.success("成功");
                onRefresh();
                setOpen(false);
            }).catch(() => {
            }).finally(() => {
                setLoading(false);
            });
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
            <PrimaryButton onClick={async () => {
                // 清空表单
                form.resetFields();
                // 初始化模板
                const template = StringTemplateMap[String(0) as keyof typeof StringTemplateMap];
                setTemplateSchema(parseSchema(template));
                setOpen(true);
            } } text={"添加库存地址"} />
            <MyModal
                title={"添加库存地址"}
                open={open}
                width={620}
                centered
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
                    {/* 地点名称（该名称用户在结账时可见） */}
                    <Form.Item key="locationName" label="仓库名称" name="locationName" required={false} rules={[{ required: true, message: '请输入仓库名称' }]}>
                        <MyInput placeholder="请输入仓库名称" style={{ height: 36, width: '100%' }} />
                    </Form.Item>
                    <Form.Item key="code" label="仓库编号" name="code" required={false} rules={[{ required: true, message: '请输入仓库编号' }]}>
                        <MyInput placeholder="请输入仓库编号" style={{ height: 36, width: '100%' }} />
                    </Form.Item>
                    <Form.Item key="capacity" label="仓库容量" name="capacity">
                        <MyInput placeholder="请输入仓库容量" style={{ height: 36, width: '100%' }} />
                    </Form.Item>
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