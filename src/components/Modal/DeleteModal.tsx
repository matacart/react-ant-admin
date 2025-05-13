import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";


// 删除 弹窗提示
export default function DeleteModal({removeFunc,title,content,okText,tElement}:any){

    const [modal, contextHolder] = Modal.useModal();

    const confirm = () => {
        modal.confirm({
            title: title,
            icon: <ExclamationCircleFilled style={{color:"#F86140"}}/>,
            content: content,
            centered: true,
            okButtonProps:{style:{backgroundColor:"#F86140",color:"#FFFFFF"}},
            okText: okText,
            cancelText: '取消',
            onOk() {
                removeFunc()
            }
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