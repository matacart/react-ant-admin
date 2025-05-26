import React, { useRef, useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import styled from 'styled-components';
import PrimaryButton from '../Button/PrimaryButton';


const StatementModalSecondary = ({content,event,...props})=>{

  const [isModalOpen, setIsModalOpen] = useState(false);

  const mRef = useRef(null);

  return (
    <>
        <div onClick={()=>setIsModalOpen(true)}>
            {event}
        </div>
        <ScopedModal {...props} centered open={isModalOpen} onOk={()=>setIsModalOpen(false)} onCancel={()=>setIsModalOpen(false)}
            footer = {(_, { OkBtn, CancelBtn }) => (
                <Flex justify="flex-end">
                    <PrimaryButton text="确认" onClick={()=>setIsModalOpen(false)} />
                </Flex>
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

export default StatementModalSecondary