import React, { useEffect, useMemo, useState } from 'react';
import { Card, Divider, Form, Modal, Button, Input, Select, Row, Col, Flex } from 'antd';
import styled from 'styled-components';
import CreateCustomerModal from './CreateCustomerModal';
import DeliveryAddressModal from './DeliveryAddressModal';
import order from '@/store/order/order';
import { observer } from 'mobx-react-lite';
import BillingAddressModal from './BillingAddressModal';
import { DeleteIcon, EmailIcon, MailFilledIcon, TelIcon } from '@/components/Icons/Icons';

// 新增类型定义
interface ReceiverType {
  name: string;
  tel: string;
  address:string;
}

function CustomInformationEdit() {


  const [receiver,setReceiver] = useState<ReceiverType>({
    name: '',
    tel:'',
    address:''
  })

  const [billing,setBilling] = useState<ReceiverType>({
    name: '',
    tel:'',
    address:''
  })

  // useMemo(()=>{
  //   const address = [
  //     order.deliveryAddress.company,
  //     order.deliveryAddress.address,
  //     order.deliveryAddress.address2,
  //     order.deliveryAddress.cityLabel,
  //     order.deliveryAddress.provinceLabel,
  //     order.deliveryAddress.countryLabel
  //   ].filter(Boolean) // 过滤空值
  //   setReceiver({
  //     name: order.deliveryAddress.firstName+" "+order.deliveryAddress.lastName,
  //     tel: order.deliveryAddress.tel,
  //     address:address.join(",")
  //   })
  // },[order.deliveryAddress])

  // useMemo(()=>{
  //   const address = [
  //     order.payBillInfo.company,
  //     order.payBillInfo.address,
  //     order.payBillInfo.address2,
  //     order.payBillInfo.cityLabel,
  //     order.payBillInfo.provinceLabel,
  //     order.payBillInfo.countryLabel
  //   ].filter(Boolean) // 过滤空值
  //   setBilling({
  //     name: order.payBillInfo.firstName+" "+order.payBillInfo.lastName,
  //     tel: order.payBillInfo.tel,
  //     address:address.join(",")
  //   })
  // },[order.billingAddress])

  
  return (
    <Scoped>
      <Card>
        <div className='title font-16 font-w-600 color-242833'>客户</div>
        {JSON.stringify(order.customerInfo) == "{}" ? <CreateCustomerModal /> : <>
          <Flex style={{marginBottom:"8px"}} justify='space-between'>
            <div className='color-356DFF'>{order.customerInfo.realname || "未填写名称"}</div>
            <DeleteIcon className='font-20 cursor-pointer color-F86140' onClick={()=>{
              order.setCustomerInfo({})
            }} />
          </Flex>
          <Flex>
            <div style={{paddingTop:"2px",marginRight:"4px"}}><TelIcon className='font-20 color-AAB7CD' /></div>
            <div>{order.customerInfo.tel}</div>
          </Flex>
          <Flex>
            <div style={{paddingTop:"2px",marginRight:"4px"}}><EmailIcon className='font-20 color-AAB7CD' /></div>
            <div style={{overflowWrap:"anywhere"}} className='color-356DFF'>{order.customerInfo.email}</div>
          </Flex>
          <Flex>
            <div>历史购买：</div>
            <div className='color-356DFF'>无数据</div>
          </Flex>
        </>}
        {/* 收货地址 */}
        <Divider />
        <>
          <Flex justify='space-between' style={{marginBottom:"8px"}}>
            <div className='color-242833'>收货地址</div>
            <DeliveryAddressModal />
          </Flex>
          {/*  */}
          {JSON.stringify(order.deliveryAddress) !== "{}" ? <>
            <div>{receiver.name}</div>
            <div>{receiver.tel}</div>
            <div>{receiver.address}</div>
          </>:<div className='color-B8BECC'>暂无地址</div>}
        </>
        {/* 账单地址 */}
        <Divider />
        <>
          <Flex justify='space-between' style={{marginBottom:"8px"}}>
            <div className='color-242833'>账单地址</div>
            <BillingAddressModal />
          </Flex>
          {/*  */}
          {JSON.stringify(order.billingAddress) !== "{}" ? <>
            <div>{billing.name}</div>
            <div>{billing.tel}</div>
            <div>{billing.address}</div>
          </>:<div className='color-B8BECC'>暂无地址</div>}
        </>
      </Card>

    </Scoped>
  );
}

export default observer(CustomInformationEdit)

const { Option } = Select;

// 定义样式
const Scoped = styled.div`
  background-color: #f7f8fb;
  .title{
    margin-bottom: 20px;
  }
`
