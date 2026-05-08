import { App, Button, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";


// 修改 弹窗提示
export default function ModifyModal({okFun,title,content,okText,tElement}:any){

    const { modal } = App.useApp();  // 获取带有上下文的 modal 对象

    const confirm = () => {
        modal.confirm({
            title: title,
            width:"620px",
            content: content,
            icon:<></>,
            centered: true,
            okText: okText,
            cancelText: '取消',
            onOk() {
                okFun()
            }
        });
    };
    return (
        // 阻止父组件事件传递
        <Scoped className="delete_modal" onClick={(e)=>e.stopPropagation()}>
            <span onClick={()=>confirm()}>{tElement}</span>
        </Scoped>
    )
}

const Scoped = styled.div`
    
`