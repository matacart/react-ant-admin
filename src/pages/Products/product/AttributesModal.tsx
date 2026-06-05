import MyAutoComplete from "@/components/AutoComplete/MyAutoComplete";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { EditIcon } from "@/components/Icons/Icons";
import DefaultInput from "@/components/Input/DefaultInput";
import MySelect from "@/components/Select/MySelect";
import { addStyleName, getProductOption, getProductStyleValueList } from "@/services/y2/api";
import product from "@/store/product/product";
import { App, Flex, Form, Input, Modal } from "antd"
import FormItem from "antd/es/form/FormItem";
import _ from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";

function AttributesModal({optionsList,attributesOptionType,setOptionList,attributes,attributesMap,setAttributesMap}: {optionsList:any,setOptionList:any,attributesOptionType:any,attributes:any,attributesMap:any,setAttributesMap:any}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isCreate,setIsCreate] = useState(true);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const { message } = App.useApp();

    // 属性
    const [options,setOptions] = useState([]);

    // 语言
    const [languages,setLanguages] = useState([]);

    // 提交表单
    const submit = ()=>{
        form.validateFields().then((values)=>{
            setLoading(true)
            addStyleName(values.id,values.languageID,values.option_name,values.option_type).then(res=>{
                if(res?.code == 0){
                    if(isCreate){
                        setAttributesMap(attributesMap.map((item:any)=>item.value == attributes.value?{
                            label:values.option_name,
                            value:res?.id.toString(),
                            options:[],
                            optionValue:[],
                        }:item));
                        setOptionList([
                            ...optionsList,
                            {
                                option_id:res?.id.toString(),
                                option_name:values.option_name,
                            }
                        ])
                    }else{
                        setAttributesMap(attributesMap.map((item:any)=>item.value == attributes.value?{
                            ...item,
                            label:values.option_name,
                        }:item));
                        setOptionList(optionsList.map((item:any)=>item.option_id == values.id ? {
                            ...item,
                            option_name:values.option_name
                        }:item))
                    }
                }
            })
            // 提交表单数据
        }).catch((errorInfo) => {
            console.log(errorInfo)
        }).finally(()=>{
            setIsModalOpen(false);
            setLoading(false)
        });
    }

    // 取消
    const cancel = () => {
        setIsModalOpen(false);
    };

    // 创建属性
    const addAttributes = ()=>{
        form.setFieldsValue({
            id:"",
            languageID:product.productInfo.languages_id,
            option_name:"",
            option_type:"0",
            status:"1",
        })
        setIsCreate(true)
        setIsModalOpen(true)
    }

    // 编辑
    const editAttributes = ()=>{
        // 获取属性详情
        getProductOption(attributes.value,product.productInfo.languages_id).then(res=>{
            if(res?.code == 0){
                form.setFieldsValue({
                    id:res?.data?.option_id.toString(),
                    languageID:product.productInfo.languages_id,
                    option_name:res?.data?.option_name,
                    option_type:res?.data?.option_type_id,
                    status:"1",
                })
                setIsCreate(false)
                setIsModalOpen(true)
            }
        }).catch((errorInfo) => {
            console.log(errorInfo)
        }).finally(()=>{
            
        })
    }

    useEffect(()=>{
        setOptions(optionsList.map((item:any)=>({
            label:item.option_name,
            value:item.option_id
        })));
    },[optionsList])

    useEffect(()=>{
        // 语言
        let tempList = JSON.parse(sessionStorage["languages"] || '[]').map((item:any)=>{
            return {
                value: item.id,
                label: item.name
            }
        })
        setLanguages(tempList)
        
    },[])

    return (
        <Scoped>
            <MyAutoComplete
                text={"创建新属性"} 
                styles={{
                    root: {
                        width:"180px",
                        height:"42px",
                    }
                }}
                showSearch={false}
                value={attributes.label}
                onSelect={async (value,option)=>{
                    if(attributes.value == option.value) return;
                    // 是否存在重复值
                    if(attributesMap.some((item:any)=>item.value == option.value)){
                        message.error("不能选择重复的属性")
                        return;
                    }
                    const newOptions = await getProductStyleValueList(option.value as string,product.productInfo.languages_id).then(res=>{return res?.data || []})
                    const newAttributesMap = _.cloneDeep(attributesMap).map((item:any)=>item.value == attributes.value?{
                        label:option.label,
                        value:option.value,
                        options:newOptions || [],
                        optionValue:[]
                    }:item)
                    setAttributesMap(newAttributesMap)
                }} 
                placeholder="搜索或创建属性" 
                options={options} 
                onClick={addAttributes}
            />
            {attributes.value && <EditIcon className="icon" onClick={editAttributes} />}
            <MyModal title={<div>{isCreate?"创建属性":"编辑属性"}</div>} width={620} centered open={isModalOpen} onCancel={cancel} 
                footer = {(_, { OkBtn, CancelBtn }) => (
                    <Flex justify="end">
                        <Flex gap={12}>
                            <DefaultButton text={"取消"} onClick={cancel} />
                            <PrimaryButton text={"确认"} onClick={submit} loading={loading} />
                        </Flex>
                    </Flex>
                )}
            >
                <Form style={{marginTop:"24px"}} form={form} layout="vertical">
                    <FormItem name="id" label="属性ID" hidden={true}><Input hidden /></FormItem>
                    <FormItem name="languageID" label="语言" required={false} rules={[{ required: true, message: '请输入属性名称' }]}>
                        <MySelect style={{height:"36px"}} options={languages} />
                    </FormItem>
                    <FormItem name="option_name" label="属性名称" required={false} rules={[{ required: true, message: '请输入属性名称' }]}>
                        <DefaultInput placeholder="请输入属性名称" style={{ width:"100%",height:"36px" }} />
                    </FormItem>
                    <FormItem name="option_type" label="属性类型" required={false} rules={[{ required: true, message: '请选择属性类型' }]}>
                        <MySelect style={{height:"36px"}} options={attributesOptionType} />
                    </FormItem>
                    <FormItem name="status" label="状态" required={false} rules={[{ required: true, message: '请选择状态' }]}>
                        <MySelect style={{height:"36px"}} options={[
                            {label:"启用",value:"1"},
                            {label:"禁用",value:"0"}
                        ]} />
                    </FormItem>
                </Form>
            </MyModal>
        </Scoped>
    )
}


const Scoped = styled.div`
    position: relative;
    .ant-select-selection-search-input{
        padding-right: 32px;
    }
    .icon{
        position: absolute;
        font-size: 20px;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
    }
`


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


export default AttributesModal