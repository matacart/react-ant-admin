import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Flex, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";
import PrimaryButton from "../Button/PrimaryButton";
import DefaultButton from "../Button/DefaultButton";
import DangerButton from "../Button/DangerButton";


interface ModalProps {
  removeFunc: () => void;
  title: string;
  content: any;
  okText?: string;
  tElement: any;
  loading?: boolean;
}

// 删除 弹窗提示
export default function DeleteModal({removeFunc,title,content,okText,tElement,loading}:ModalProps){

    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
        const newModal = modal.confirm({
            title: title,
            icon: <ExclamationCircleFilled style={{color:"#F86140"}}/>,
            content: content,
            centered: true,
            okButtonProps:{style:{backgroundColor:"#F86140",color:"#FFFFFF"}},
            okText: okText,
            footer:()=>(
                <Flex gap={12} justify="flex-end" style={{marginTop:"24px"}}>
                    <DefaultButton text="取消" autoInsertSpace={false} onClick={()=>newModal.destroy()} />
                    <DangerButton text="删除" loading={loading} autoInsertSpace={false} onClick={async ()=>{
                        removeFunc();
                        newModal.destroy();
                    }} />
                </Flex>
            )
        });
    };
    return (
        // 阻止父组件事件传递
        <Scoped className="delete_modal" onClick={(e)=>e.stopPropagation()}>
            <span onClick={()=>confirm()}>{tElement}</span>
            {contextHolder}
        </Scoped>
    )
}

const Scoped = styled.div`
    
`