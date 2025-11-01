import { AddIcon } from "@/components/Icons/Icons";
import DefaultInput from "@/components/Input/DefaultInput";
import MySelect from "@/components/Select/MySelect";
import { Flex, Form, message, Modal } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { jsonTemplate } from "./Header";
import { createTemplateFile } from "@/services/y2/api";
import editor from "@/store/theme/editor";
import { useIntl } from "@umijs/max";
import CreateButton from "@/components/Button/CreateButton";
import CancelButton from "@/components/Button/CancelButton";

export interface optionType{
    value:string,
    label:string
}

interface templateInfo{
    templateId:string
    templateName:string,
}

const splitByLastDot = (str:string)=>{
    // 查找最后一个点的索引
    const lastDotIndex = str.lastIndexOf('.');
    if (lastDotIndex === -1) {
      // 如果字符串中没有点，返回包含原字符串的数组
      return [str];
    }
    // 分割字符串
    const firstPart = str.substring(0, lastDotIndex);
    const secondPart = str.substring(lastDotIndex + 1);
    return [firstPart, secondPart];
  }

export default function NewTemplateModal({templateInfo,templateList,isDefault}:{templateInfo:templateInfo,templateList:jsonTemplate[],isDefault:boolean}){

    const intl = useIntl();

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [form] = Form.useForm();

    const [options,setOptions] = useState<optionType[]>([]);

    useEffect(()=>{
        const newOptions = templateList.map(item=>{

            // 默认模板
            const isDefaultTemplate = item.isDefaultTemplate || (!isDefault && item.templateName == templateInfo.templateName);

            if(isDefaultTemplate){
                form.setFieldsValue({
                    source: item.templateName
                })
            }

            return {
                value: item.templateName,
                label: isDefaultTemplate ? intl.formatMessage({id:'theme.header.navigation.default'}):item.pageName,
            }
        })
        setOptions(newOptions)
    },[templateList])

    // 提交
    const confirm = () => {
        form.validateFields().then((values)=>{
            setLoading(true);
            const newTemplateName = splitByLastDot(values.source);
            createTemplateFile({
                template_id: templateInfo.templateId,
                template_name: newTemplateName[0]+'.'+values.name+"."+(newTemplateName[1] || 'json'),
                page_name: values.name,
                source_file_name: values.source,
                file_content:"",
                duplicate_flag: "true",
                mode: editor.mode,
                languages_id: editor.languagesId
            }).then((res)=>{
                if(res.code == 0){
                    message.success("success");
                }
            }).catch(error => {
                console.error('Failed to create template:', error);
            }).finally(()=>{
                form.resetFields();
                setOpen(false);
                setLoading(false);
            })
        }).catch(error => {
            // console.error('Failed to create template:', error);
        });
    };


    return (
        // 阻止父组件事件传递
        <>
            <div className="item" onClick={()=>setOpen(true)}>
                <Flex align='center' gap={8} className='color-356DFF' style={{padding: "4px 0"}} >
                    <AddIcon className='font-16' />
                    <span>{intl.formatMessage({id:'theme.header.navigation.createTemplate'})}</span>
                </Flex>
            </div>
           
            <Modal width="480px" title={intl.formatMessage({id:'theme.header.navigation.createTemplate'})} centered open={open} onCancel={()=>{
                setOpen(false);
                // 初始化
            }}
           
            footer={[
                <Flex gap={12} justify="flex-end">
                    <CancelButton key="back" onClick={()=>{
                        setOpen(false);
                        // 销毁
                    }} />
                    <CreateButton loading={loading} onClick={()=>confirm()} />
                </Flex>
            ]}
            >
                <Scoped>
                    <Form className="form" form={form} layout="vertical">
                        <Form.Item label={intl.formatMessage({id:'theme.header.modal.templateName'})} name="name" required={false} rules={[
                            { required: true },
                            { 
                                validator: (_, value) => {
                                    if (value && /[<>:"/\\|?*\x00-\x1F]/.test(value)) {
                                        return Promise.reject('不能包含以下字符: <>:"/\\|?*');
                                    }
                                    if(options.some(item=> item.label == value)){
                                        return Promise.reject('模板名称已被使用');
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}>
                            <DefaultInput maxLength={25} showCount placeholder={intl.formatMessage({id:'theme.header.modal.templateName.placeholder'})} /> 
                        </Form.Item>
                        <Form.Item label={intl.formatMessage({id:'theme.header.modal.basedOnTemplate'})} name="source">
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