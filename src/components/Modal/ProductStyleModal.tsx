import { addStyleName, getProductOption } from "@/services/y2/api";
import product from "@/store/product/product";
import { Form, Input, message, Modal, Select, Spin, Switch, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
export default function ProductStyleModal({inputRef,optionList,setOptionList,spec,specifications,setSpecifications}:any) {
    const [isOpen, setIsOpen] = useState(false);

    // 属性类型
    const [optionsType,setOptionsType] = useState([])
    
    const [form] = Form.useForm();

    const [isLoading,setIsLoading] = useState(false)

    const [languages,setLanguages] = useState([]);

    const [language,setLanguage] = useState("2");

    const handlClick = (language:string)=>{
        if(spec.optionId!== ""){
            setIsLoading(true)
            getProductOption(spec.optionId,language).then((res:any)=>{
                console.log(res)
                form.setFieldsValue({
                    name:res.data.option_name,
                    typeId:res.data.option_type_id
                })
                setIsLoading(false)
            })
        }else{
            message.error("加载失败")
        }
        setIsOpen(true)
    }

    const submit = ()=>{
        // console.log
        addStyleName(spec.optionId,language,form.getFieldsValue().name,form.getFieldsValue().typeId).then(res=>{
            console.log(res)
            if(res.code == 0){
                message.success("修改成功")
            }
            if(res.code == 201){
                message.info("内容未发生改变")
            }
        })
            // 修改父组件
            // console.log(inputRef)
        if(language == product.productInfo.languages_id){
            setSpecifications(specifications.map((item:any)=>{
                if(item.optionId===spec.optionId){
                    return {
                        ...item,
                        attributes:form.getFieldsValue().name
                    }
                }else{
                    return item
                }
            }))
            setOptionList(optionList.map((item:any)=>{
                if(item.value===spec.optionId){
                    return {
                        ...item,
                        label:form.getFieldsValue().name
                    }
                }else{
                    return item
                }
            }))
        }
        // console.log(optionList.map((item:any)=>{
        //     if(item.value===spec.optionId){
        //         return {
        //             ...item,
        //             label:form.getFieldsValue().name
        //         }
        //     }else{
        //         return item
        //     }
        // }))
        // console.log(specifications.map((item:any)=>{
        //     if(item.optionId===spec.optionId){
        //         return {
        //             ...item,
        //             attributes:form.getFieldsValue().name
        //         }
        //     }else{
        //         return item
        //     }
        // }))
        // setIsOpen(false)
    }
    useEffect(()=>{
        setOptionsType(JSON.parse(sessionStorage["productOptionType"] || "[]").map((item:any)=>{
            return {
                value:item.product_option_type_id,
                label:item.product_option_type_name
            }
        }))
        // 语言
        // sessionStorage["languages"]
        let tempList = JSON.parse(sessionStorage["languages"]).map((item:any)=>{
            return {
                value: item.id,
                label: item.name
            }
        })
        setLanguages(tempList)
    },[])
    // spec.optionId
    
    return(
        <>
            <span onClick={()=>{handlClick(language)}} className="edit-icon btn-icon__1h8Qx edit__3TiEz" style={{cursor: "pointer",position:'relative',zIndex:"99",marginLeft: "-30px",left:"0px"}}>
              <Tooltip title="编辑">
                <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-icon="SLIconEdit" font-size="20">
                  <path d="M13.551 2.47a.75.75 0 0 0-1.06 0l-9.9 9.9a.75.75 0 0 0-.22.53v4.242c0 .414.336.75.75.75h4.243a.75.75 0 0 0 .53-.22l9.9-9.899a.75.75 0 0 0 0-1.06L13.551 2.47Zm-9.68 10.74 9.15-9.15 3.182 3.183-9.15 9.15H3.873V13.21Zm13.807 4.682a.1.1 0 0 0 .1-.1v-1.3a.1.1 0 0 0-.1-.1h-6.8a.1.1 0 0 0-.1.1v1.3a.1.1 0 0 0 .1.1h6.8Z" fill="#474F5E"></path>
                </svg>
              </Tooltip>
            </span>
            {/* justifyContent:"space-between" */}
            <Modal width="600px" destroyOnClose closable={true} title={<div><div>属性编辑</div><div style={{fontWeight:500,fontSize:"14px",marginTop:"20px",marginBottom:"24px"}}>语言翻译：<Select
                defaultValue={language}
                onChange={(value)=>{
                    setLanguage(value)
                    handlClick(value);
                }}
                style={{ width: 120 }}
                options={languages}
            /></div></div> } 
            centered open={isOpen} onOk={submit} okText="更新" onCancel={()=>{
                setLanguage(product.productInfo.languages_id)
                setIsOpen(false);
            }}>
                <Spin spinning={isLoading}>
                    <Form form={form}>
                        <Form.Item
                            label={<div style={{width:"56px",textAlign:"right"}}>属性名称</div>}
                            name="name"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label={<div style={{width:"56px",textAlign:"right"}}>属性类型</div>}
                            name="typeId"
                        >
                            <Select
                                placeholder="请选择类型"
                                style={{ width: 120 }}
                                options={optionsType}
                            />
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </>
    )
}

const Scoped = styled.div`
    /* border-top: 1px solid #E5E9F2; */
    padding-top: 20px;
    /* padding: 20px 40px; */
    justify-content: space-between;

`