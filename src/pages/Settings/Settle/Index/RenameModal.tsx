import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import { renameCheckoutConfig } from "@/services/y2/apiCheckout";
import shopSetting from "@/store/channel/shopSetting/shopSetting";
import { CheckoutTemplateConfig } from "@/store/settings/settle/settingsInfo";
import { Flex, Form, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";

function RenameModal({config,success}:{config:CheckoutTemplateConfig | null,success:()=>void}){

    const [loading,setLoading] = useState(false);

    const [open,setOpen] = useState(false);

    const [form] = Form.useForm();

    const submit = () => {
        form.validateFields().then(values=>{
            setLoading(true)
            renameCheckoutConfig({
                languages_id: shopSetting.languagesId,
                profile_id: config?.profile_id ?? "",
                profile_name: values.name,
            }).then(async res=>{
                await success();
                setOpen(false)
            }).catch(()=>{
                console.log("重命名失败")
            }).finally(()=>{
                setLoading(false)
            })
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
                    name: config?.profile_name??""
                })
            }}>重命名</Rename>
            <Modal
                open={open}
                centered
                title="重命名"
                onCancel={()=>setOpen(false)}
                footer={()=><Flex justify="flex-end" gap="12px">
                    <DefaultButton text={"取消"} onClick={()=>setOpen(false)} />
                    <PrimaryButton text={"确定"} loading={loading} onClick={submit} />
                </Flex>}
            >
                <Form layout="vertical" form={form} style={{margin:"20px 0 40px 0"}}>
                    <Form.Item name="name" label="主题配置名称" required={false} rules={[{ required: true }]}>
                        <DefaultInput placeholder="请输入" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

const Rename = styled.a`
    

`

export default RenameModal;