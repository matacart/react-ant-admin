import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';
import PrimaryButton from '../Button/PrimaryButton';

interface StatementModalProps {
    triggerObj:React.ReactNode;
    content: React.ReactNode;
    title: string;
}

const StatementModal = ({triggerObj,content,title}:StatementModalProps)=>{

  const [isModalOpen, setIsModalOpen] = useState(false);

  const mRef = useRef(null);

  return (
    <>
        <div style={{display:"inline-block"}} onClick={()=>setIsModalOpen(true)}>
            {triggerObj}
        </div>
        <ScopedModal title={title} width={620} getContainer={()=>mRef.current!} classNames={{header:"mtitle",body:"mbody",footer:"mfooted"}} centered open={isModalOpen} onOk={()=>setIsModalOpen(false)} onCancel={()=>setIsModalOpen(false)}
            footer = {(_, { OkBtn, CancelBtn }) => (
                <>
                    <PrimaryButton text="确定" onClick={()=>setIsModalOpen(false)} />
                </>
            )}
        >
            {content}
        </ScopedModal>
    </>
  );
};

const ScopedModal = styled(Modal)`
    display: inline-block;
    .ant-modal-content{
        padding: 20px 0;
    }
    .mtitle{
        padding: 0 24px;
    }
    .mbody{
        padding: 24px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-right: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-left: none;
    }
    .mfooted{
        padding: 0 24px;
    }

`

export default StatementModal;