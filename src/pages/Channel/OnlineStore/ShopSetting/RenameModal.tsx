import DefaultInput from "@/components/Input/DefaultInput";
import { templateRename } from "@/services/y2/api";
import shopSetting, { TemplateInstance } from "@/store/channel/shopSetting/shopSetting";
import { Form, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";

function RenameModal({template}:{template:TemplateInstance | null}){

    const [open,setOpen] = useState(false)

    const [form] = Form.useForm();

    const submit = () => {

        form.validateFields().then(values=>{
            if(template){
                templateRename(template?.id??"",values.name).then(res=>{
                    const newData =  shopSetting.templateInstanceList.filter((item:TemplateInstance)=>item.id == template?.id)
                    if(newData.length>0){
                        const newTemplateInstanceList = shopSetting.templateInstanceList.map((item:TemplateInstance)=>{
                            if(item.id == template?.id){
                                return {...item,template_name:values.name}
                            }
                            return item
                        })
                        shopSetting.setTemplateInstanceList(newTemplateInstanceList)
                    }else{
                        shopSetting.setTemplateInstanceUsing({...template,template_name:values.name})
                    }
                })
            }
            setOpen(false)
        }).catch(()=>{
            // 表单未通过
            console.log("表单未通过")
        })
    }

    return (
        <>
            <Rename onClick={()=>{
                setOpen(true)
                form.setFieldsValue({
                    name: template?.template_name??""
                })
            }}>重命名</Rename>
            <Modal
                open={open}
                centered
                title="模板重命名"
                onCancel={()=>setOpen(false)}
                onOk={submit}
            >
                <Form layout="vertical" form={form} style={{margin:"20px 0 40px 0"}}>
                    <Form.Item name="name" label="模板名称：" required={false} rules={[{ required: true }]}>
                        <DefaultInput placeholder="请输入模板名称" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

const Rename = styled.a`
    

`

export default RenameModal;