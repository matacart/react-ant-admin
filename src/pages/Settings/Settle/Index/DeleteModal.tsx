import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultInput from "@/components/Input/DefaultInput";
import { CheckoutTemplateConfig } from "@/store/settings/settle/settingsInfo";
import { Flex, Form, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";

function DeleteModal({config}:{config:CheckoutTemplateConfig | null}){

    const [open,setOpen] = useState(false)

    return (
        <>
            <a style={{color:"#F86140"}} onClick={()=>{
                setOpen(true)
            }}>删除</a>
            <Modal
                open={open}
                centered
                title="重命名"
                onCancel={()=>setOpen(false)}
                footer={()=><Flex justify="flex-end" gap="12px">
                    <DefaultButton text={"取消"} onClick={()=>setOpen(false)} />
                    <PrimaryButton text={"确定"} onClick={()=>{
                        setOpen(false)
                    }} />
                </Flex>}
            >
                <p>确认删除吗？</p>
            </Modal>
        </>
    )
}

const Rename = styled.a`
    

`

export default DeleteModal;
