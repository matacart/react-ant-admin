import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { AddIcon } from "@/components/Icons/Icons";
import DefaultInput from "@/components/Input/DefaultInput";
import MyInput from "@/components/Input/MyInput";
import MySelect from "@/components/Select/MySelect";
import { Flex, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";


import { jsonTemplate } from "./Header";
import { createTemplateFile } from "@/services/y2/api";
import editor from "@/store/theme/editor";

interface optionType{
    value:string,
    label:string
}

interface templateInfo{
    templateId:string
    templateName:string,
}

// 删除 弹窗提示
export default function NewTemplateModal({templateInfo,templateList}:{templateInfo:templateInfo,templateList:jsonTemplate[]}){

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const [options,setOptions] = useState<optionType[]>([]);

    useEffect(()=>{
        const newOptions = templateList.map(item=>{

            // if(item.)
            return {
                value: item.templateName,
                label: item.pageName,
            }
        })
        setOptions(newOptions)
    },[templateList])

    // 提交
    const confirm = () => {
        form.validateFields().then((values)=>{
            setLoading(false);
            createTemplateFile({
                template_id: templateInfo.templateId,
                template_name: templateInfo.templateName,
                page_name: values.name,
                source_file_name: values.source,
                file_content:"",
                duplicate_flag: "true",
                mode: editor.mode,
                languages_id: editor.languagesId
            }).then((res)=>{
                if(res.code == 0){
                    
                }
            }).catch(error => {
                console.error('Failed to create template:', error);
            }).finally(()=>{
                form.resetFields();
                setOpen(false);
                setLoading(false);
            })
        })
    };


    return (
        // 阻止父组件事件传递
        <>
            <a onClick={()=>setOpen(true)}>
                <Flex align='center' gap={8} className='color-356DFF' style={{padding: "4px 0"}} >
                    <AddIcon className='font-16' />
                    <span >创建模板</span>
                </Flex>
            </a>
           
            <Modal width="480px" title="创建模板" centered open={open} onCancel={()=>{
                setOpen(false);
                // 初始化
            }}
           
            footer={[
                <Flex gap={12} justify="flex-end">
                    <DefaultButton key="back" onClick={()=>{
                        setOpen(false);
                        // 销毁
                    }} text="取消" />
                    <PrimaryButton loading={loading} onClick={()=>confirm()} text="创建" />
                </Flex>
            ]}
            >
                <Scoped>
                    <Form className="form" form={form} layout="vertical">
                        <Form.Item label="模板名称" name="name">
                            <DefaultInput maxLength={25} showCount placeholder="请输入模版名称" /> 
                        </Form.Item>
                        <Form.Item label="基于模板" name="source">
                            <MySelect options={options} style={{height:"36px"}} />
                        </Form.Item>
                    </Form>
                </Scoped>
            </Modal>
        </>
    )
}

const Scoped = styled.div`
    .form{
        margin-top: 24px;
    }
`