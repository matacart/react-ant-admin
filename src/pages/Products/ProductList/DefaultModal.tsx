import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';
import PrimaryButton from '@/components/Button/PrimaryButton';

interface StatementModalProps {
    triggerObj:React.ReactNode;
    content: React.ReactNode;
    title: string;
}

const DefaultModal = ({triggerObj,content,title}:StatementModalProps)=>{

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
`

export default DefaultModal;