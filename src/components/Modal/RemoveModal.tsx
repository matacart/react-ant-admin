import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";


// 删除 弹窗提示
export default function RemoveModal({removeFunc}:any){

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    return (
        <Scoped className="remove_modal">
            <span onClick={showModal} style={{cursor:"pointer",fontSize:"20px",color:"red"}}><DeleteOutlined /></span>
            <Modal
                title="Modal"
                open={open}
                onOk={()=>{
                    removeFunc();
                    setOpen(false);
                }}
                onCancel={hideModal}
                okText="确认"
                cancelText="取消"
            >
                <p>Bla bla ...</p>
            </Modal>
        </Scoped>
    )
}

const Scoped = styled.div`
    
`