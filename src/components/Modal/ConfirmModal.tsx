import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Flex, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";
import DefaultButton from "../Button/DefaultButton";
import PrimaryButton from "../Button/PrimaryButton";


// 删除 弹窗提示
export default function ConfirmModal({confirmFun,title,content,okText,tElement}:any){

    const [modal, contextHolder] = Modal.useModal();

    const confirm = () => {
        const newModal = modal.confirm({
            title: title,
            icon: <ExclamationCircleFilled style={{color:"#356DFF"}}/>,
            content: content,
            centered: true,
            okButtonProps:{style:{backgroundColor:"#356DFF",color:"#FFFFFF"}},
            styles:{
                content: {
                    padding:"32px 24px"
                }
            },
            footer:()=>(
                <Flex gap={12} justify="flex-end" style={{marginTop:"24px"}}>
                    <DefaultButton text="取消" autoInsertSpace={false} onClick={()=>newModal.destroy()} />
                    <PrimaryButton text="创建" autoInsertSpace={false} onClick={confirmFun} />
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