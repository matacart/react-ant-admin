import React from 'react';
import { Card, Flex } from 'antd';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { DeleteIcon, EmailIcon, TelIcon } from '@/components/Icons/Icons';
import CreateCustomerModal from './CreateCustomerModal';
import giftCard from '@/store/giftCard/giftCard';

function CustomInformationEdit() {
  return (
    <Scoped>
      <Card>
        <div className='title font-16 font-w-600 color-242833'>客户</div>
        {giftCard.customer ? <>
          <Flex style={{marginBottom:"8px"}} justify='space-between'>
            <div className='color-356DFF'>{(giftCard.customer?.firstName + giftCard.customer?.lastName) || giftCard.customer?.id || "无"}</div>
            <DeleteIcon className='font-20 cursor-pointer color-F86140' onClick={()=>giftCard.setCustomer(null)} />
          </Flex>
          <Flex>
            <div style={{paddingTop:"2px",marginRight:"4px"}}><TelIcon className='font-20 color-AAB7CD' /></div>
            <div>{giftCard.customer?.mobile || "未填写"}</div>
          </Flex>
          <Flex>
            <div style={{paddingTop:"2px",marginRight:"4px"}}><EmailIcon className='font-20 color-AAB7CD' /></div>
            <div style={{overflowWrap:"anywhere"}} className='color-356DFF'>{giftCard.customer?.email || "未填写"}</div>
          </Flex>
        </> : <CreateCustomerModal />}
      </Card>
    </Scoped>
  );
}

export default observer(CustomInformationEdit)

// 定义样式
const Scoped = styled.div`
  background-color: #f7f8fb;
  .title{
    margin-bottom: 20px;
  }
`
