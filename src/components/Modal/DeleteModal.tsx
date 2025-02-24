import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";


// 删除 弹窗提示
export default function DeleteModal({removeFunc,content}:any){

    const [modal, contextHolder] = Modal.useModal();

    const confirm = () => {
        modal.confirm({
            title: '确定要删除吗？',
            icon: <ExclamationCircleFilled style={{color:"#F86140"}}/>,
            content: content,
            centered: true,
            okButtonProps:{style:{backgroundColor:"#F86140",color:"#FFFFFF"}},
            okText: '确认',
            cancelText: '取消',
            onOk() {
                removeFunc()
            }
        });
    };
    return (
        // 阻止父组件事件传递
        <Scoped className="delete_modal" onClick={(e)=>e.stopPropagation()}>
            <span onClick={()=>confirm()} style={{cursor:"pointer",fontSize:"20px",color:"red"}}><DeleteOutlined /></span>
            {contextHolder}
        </Scoped>
    )
}

const Scoped = styled.div`
    
`