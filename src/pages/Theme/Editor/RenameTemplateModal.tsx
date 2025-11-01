import CancelButton from "@/components/Button/CancelButton";
import CreateButton from "@/components/Button/CreateButton";
import { EditIcon } from "@/components/Icons/Icons";
import DefaultInput from "@/components/Input/DefaultInput";
import WarningTagText from "@/components/Tag/WarningTagText";
import { useIntl } from "@umijs/max";
import { Flex, Form, message, Modal, Tooltip } from "antd";
import { Dispatch, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { jsonTemplate } from "./Header";
import { optionType } from "./NewTemplateModal";
import { renameTemplateFile } from "@/services/y2/api";
import editor from "@/store/theme/editor";

interface templateInfo{
    templateId:string
    templateName:string,
    pageName:string;
}

export default function RenameTemplateModal({
    templateInfo,
    templateList,
    isDefault,
    backMainItems,
}:{
    templateInfo:templateInfo,
    templateList:jsonTemplate[],
    isDefault:boolean,
    backMainItems:()=>void,
}){

    const intl = useIntl();

    const [open,setOpen] = useState(false);

    const [isLoading,setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const [options,setOptions] = useState<optionType[]>([]);

    // 控制按钮是否禁用
    const [isSameName, setIsSameName] = useState(true);

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
            setOpen(false);
            setIsLoading(true);

            const lastIndex  = templateInfo.templateName.lastIndexOf(".");
            const lastTwoIndex = templateInfo.templateName.lastIndexOf(".",lastIndex - 1);

            if(lastIndex==lastTwoIndex){
                message.info("默认文件不可操作")
                return;
            }
            const part1 = templateInfo.templateName.substring(0, lastTwoIndex+1);
            const part2 = templateInfo.templateName.substring(lastIndex);
            renameTemplateFile({
                templateId:templateInfo.templateId, 
                mode:editor.mode, 
                languagesId:editor.languagesId,
                oldFileName:templateInfo.templateName, 
                newFileName:part1+values.name+part2, 
            }).then((res)=>{
                if(res.code == 0){
                    message.success(intl.formatMessage({id:'component.message.success'}));
                }
            }).catch((err)=>{
                console.log(err);
            }).finally(()=>{
                setIsLoading(false);
            })
            // 销毁
        }).catch(()=>{

        })
    }

    return (
        // 阻止事件冒泡到父级div
        <Scoped onClick={(e)=>e.stopPropagation()}>
            <Tooltip title={intl.formatMessage({id:'theme.header.navigation.tip.rename'})}>
                <EditIcon
                    style={{marginRight: '6px'}}
                    onClick={(e) => {
                        backMainItems();
                        // 添加
                        setOpen(true);
                        // 初始化
                        form.setFieldsValue({
                            name: templateInfo.pageName
                        })
                        setIsSameName(true);
                    }}
                />
            </Tooltip>
            <Modal width="480px" title={intl.formatMessage({id:'theme.header.navigation.renameTemplate'})} centered open={open} 
                onCancel={()=>setOpen(false)}
                footer={[
                    <Flex gap={12} justify="flex-end">
                        <CancelButton key="back" onClick={()=>{
                            setOpen(false);
                            // 销毁
                        }} />
                        <CreateButton disabled={isSameName} loading={isLoading} onClick={confirm} />
                    </Flex>
                ]} 
            >
                <div style={{marginTop:"24px"}}>
                    <WarningTagText content={<span className="color-242833 font-14">{intl.formatMessage({id:'theme.header.renameTemplateModal.warningText'})}</span>} />
                </div>
                <MyForm 
                    form={form} 
                    layout="vertical"
                    onValuesChange={(changedValues, allValues) => {
                        // 监听表单值变化，判断name是否与原pageName相同
                        if ('name' in changedValues) {
                            setIsSameName(changedValues.name === templateInfo.pageName);
                        }
                    }}
                >
                    <Form.Item label={intl.formatMessage({id:'theme.header.modal.templateName'})} name="name" required={false} rules={[
                        { required: true },
                        { 
                            validator: (_, value) => {
                                if (value && /[<>:"/\\|?*\x00-\x1F]/.test(value)) {
                                    return Promise.reject('不能包含以下字符: <>:"/\\|?*');
                                }
                                if(options.some(item=> item.label == value && (item.label != templateInfo.pageName))){
                                    return Promise.reject('模板名称已被使用');
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}>
                        <DefaultInput maxLength={25} showCount placeholder={intl.formatMessage({id:'theme.header.modal.templateName.placeholder'})} /> 
                    </Form.Item>
                </MyForm>
            </Modal>

        </Scoped>
    )
}

const Scoped = styled.div``

const MyForm = styled(Form)`
    margin-top: 16px;
`;