import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { EditIcon } from "@/components/Icons/Icons";
import DefaultInput from "@/components/Input/DefaultInput";
import DefaultSelect from "@/components/Select/DefaultSelect";
import { editCountry } from "@/services/y2/ApiCheckoutAdditional";
import country from "@/store/settings/additional/country";
import { setLocalStorageCountryList } from "@/utils/common";
import { App, Flex, Form, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DataType } from "./ListCard";

const EditCountry = ({countryInfo,data,setData}:{countryInfo:DataType,data:DataType[],setData:(value:DataType[])=>void}) => {

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [countryList, setCountryList] = useState([]);

    const [form] = Form.useForm();

    const submit = ()=>{
        form.validateFields().then((values)=>{
            setLoading(true);
            editCountry({
                languages_id: country.languagesId,
                ...values,
            }).then((res)=>{
                if(res.code === 0){
                    const newData = data.map((item:any)=>{
                        if(item.id === countryInfo.id){
                            return {
                                ...item,
                                ...values,
                            }
                        }
                        return item;
                    })
                    setData(newData);
                    setOpen(false);
                }
            }).finally(()=>{
                setLoading(false);
            })
        }).catch((error)=>{
        })
    }

    const cancel = ()=>{
        form.resetFields();
        setOpen(false);
    }

    const fetchCountryList = async () => {
        const newCountryList = await setLocalStorageCountryList();
        setCountryList(newCountryList.map((item:any)=>({
            label: item.country_name,
            value: item.iso_code_2,
        })));
    }

    useEffect(()=>{
        if(localStorage.getItem("MC_DATA_COUNTRY")){
            const newCountryList = JSON.parse(localStorage.getItem("MC_DATA_COUNTRY") || "[]");
            setCountryList(newCountryList.map((item:any)=>({
                key: item.country_id,
                label: item.country_name,
                value: item.iso_code_2,
            })));
        }else{
            fetchCountryList();
        }
    },[])

    return (
        <>
            <div className='wrap' onClick={()=>{
                form.setFieldsValue(countryInfo);
                setOpen(true);
            }}>
                <Tooltip title="编辑">
                    <EditIcon className="font-16 cursor-pointer" />
                </Tooltip>
            </div>
            <MyModal 
                title="编辑国家"
                width={620}
                centered 
                open={open}
                onCancel={cancel}
                footer={()=><>
                    <Flex gap={12} justify="flex-end">
                        <DefaultButton text="取消" onClick={cancel} />
                        <PrimaryButton text="保存" loading={loading} onClick={submit} />
                    </Flex>
                </>}
            >
                <Form className="my-form" form={form} layout="vertical">
                    <Form.Item label="国家" name="country_code" required={false} rules={[{ required: true, message: '请选择国家' }]}>
                        <DefaultSelect options={countryList} onChange={(value,option:any)=>{
                            form.setFieldValue("country_name", option?.label || "");
                        }} placeholder="请选择国家" />
                    </Form.Item>
                    <Form.Item label={<span>附件信息字段 <span className="color-7A8499">(将在结算页中展示)</span> </span>} name="additional_title" required={false} rules={[{ required: true, message: '请输入附件信息字段' }]}>
                        <DefaultInput placeholder="请输入附件信息字段,如税号、身份证号等简写" />
                    </Form.Item>
                    <Form.Item label="填写要求" name="required" initialValue="0">
                        <DefaultSelect options={[
                            {
                                label: "选填",
                                value: "0",
                            },
                            {
                                label: "必填",
                                value: "1",
                            },
                        ]} placeholder="填写要求" />
                    </Form.Item>
                    {/* 提交按钮 */}
                    <Form.Item name="id" hidden={true} initialValue=""></Form.Item>
                    <Form.Item name="country_name" hidden={true}></Form.Item>
                    <Form.Item name="validate_rule" hidden={true} initialValue=""></Form.Item>
                    <Form.Item name="type" hidden={true} initialValue="1"></Form.Item>
                    <Form.Item name="status" hidden={true} initialValue="1"></Form.Item>
                    <Form.Item name="flag" hidden={true} initialValue="0"></Form.Item>
                    <Form.Item name="valid" hidden={true} initialValue={true}></Form.Item>
                    <Form.Item name="sort_order" hidden={true} initialValue="0"></Form.Item>
                </Form>
            </MyModal>
        </>
    );
};

const MyModal = styled(Modal)`
    .my-form{
        margin-top: 20px;
    }

`;

export default EditCountry;