import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { Col, Flex, Form, Input, message, Modal, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MySelect from "@/components/Select/MySelect";
import MyInput from "@/components/Input/MyInput";
import { set } from 'lodash';
import product from "@/store/product/product";

export default function ThemeTemplateManagement() {

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const [currencyList,setCurrencyList] = useState<any>([]);
    const [languageList,setLanguageList] = useState<any>([]);
    
    const submit = ()=>{
        form.validateFields().then((values) => {
            product.setProductInfo({
                ...product.productInfo,
                template_id:values.themeId,
                cod_languages_id:values.themeLanguage,
                cod_currency:values.themeCurrency,
                cod_fb_pix_id:values.themeFBID,
                cod_gg_pix_id:values.themeGoogleId,
                cod_tk_pix_id:values.themeTikTokId,
            })
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            setOpen(false)
        })
    }
    
       
    const reset = ()=>{
        form.setFieldsValue({
            themeId:product.productInfo.template_id,
            themeLanguage:product.productInfo.cod_languages_id,
            themeCurrency:product.productInfo.cod_currency,
            themeFBID:product.productInfo.cod_fb_pix_id,
            themeGoogleId:product.productInfo.cod_gg_pix_id,
            themeTikTokId:product.productInfo.cod_tk_pix_id,
        })
    }

    useEffect(()=>{
        const currencies = JSON.parse(sessionStorage.getItem("currencies")??"[]")

        setCurrencyList(currencies.map((item:any)=>{
            return {label:item.title+" ("+item.code+")",value:item.id}
        }))
        const languages = JSON.parse(sessionStorage.getItem("languages")??"[]")
        setLanguageList(languages.map((item:any)=>{
            return {label:item.name,value:item.id}
        }))
    },[])
    
    return(
        <>
            <a className="font-14" onClick={()=>{
                setOpen(true)
                reset()
            }}>管理</a>
            <Modal width="620px" open={open} centered title={<div style={{display:'flex'}}>
                模板配置
            </div>}
            onCancel={()=>setOpen(false)}
            footer = {(_, { OkBtn, CancelBtn }) => (
                <Flex gap={12} justify="end">
                    <DefaultButton text={"取消"} onClick={()=>setOpen(false)} />
                    <PrimaryButton text={"保存"} onClick={submit} loading={loading} />
                </Flex>
            )}
            >
                <MyForm form={form} layout="vertical" style={{marginTop:"20px"}}>
                    <Form.Item label="主题" name="themeId">
                        <MySelect style={{height:"36px"}} placeholder="主题" options={[
                            { value: '0', label: '默认模板' },
                            { value: '1', label: 'v1' },
                            { value: '2', label: 'v2' },
                            { value: '3', label: 'v3' },
                        ]} />
                    </Form.Item>
                    <Form.Item label="语言" name="themeLanguage">
                        <MySelect style={{height:"36px"}} placeholder="语言" options={languageList} />
                    </Form.Item>
                    <Form.Item label="货币" name="themeCurrency">
                        <MySelect style={{height:"36px"}} placeholder="货币" options={currencyList} />
                    </Form.Item>
                    <Form.Item label="FB像素ID" name="themeFBID">
                        <MyInput style={{height:"36px"}} placeholder="FB像素ID" />
                    </Form.Item>
                    <Form.Item label="Google分析ID" name="themeGoogleId">
                        <MyInput style={{height:"36px"}} placeholder="Google分析ID" />
                    </Form.Item>
                    <Form.Item label="TikTok像素ID" name="themeTikTokId">
                        <MyInput style={{height:"36px"}} placeholder="TikTok像素ID" />
                    </Form.Item>
                </MyForm>
            </Modal>
        </>
    )
}

const MyForm = styled(Form)`
    max-height: 560px;
    overflow-y: auto;

`