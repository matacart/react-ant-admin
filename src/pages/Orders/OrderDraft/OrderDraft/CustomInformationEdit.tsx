import React, { useEffect, useMemo, useState } from 'react';
import { Card, Divider, Form, Modal, Button, Input, Select, Row, Col, Flex } from 'antd';
import styled from 'styled-components';
import CreateCustomerModal from './CreateCustomerModal';
import DeliveryAddressModal from './DeliveryAddressModal';
import { observer } from 'mobx-react-lite';
import BillingAddressModal from './BillingAddressModal';
import { DeleteIcon, EmailIcon, TelIcon } from '@/components/Icons/Icons';
import orderDraft from '@/store/order/orderDraft';
import { getAddressList } from '@/services/y2/api';

// 新增类型定义
interface ReceiverType {
  name: string;
  tel: string;
  address: string;
}

function CustomInformationEdit() {


  const [receiver,setReceiver] = useState<ReceiverType | null>()

  const [billing,setBilling] = useState<ReceiverType | null>()

  useMemo(()=>{
    if(orderDraft.receiverInfo && orderDraft.receiverInfo.receiverId){
      const address = [
        orderDraft.receiverInfo.receiverCompany,
        orderDraft.receiverInfo.receiverAddress,
        orderDraft.receiverInfo.receiverAddressAdd,
        orderDraft.receiverInfo.receiverCity,
        orderDraft.receiverInfo.receiverProvince,
        orderDraft.receiverInfo.receiverCountry,
      ].filter(Boolean) // 过滤空值
      setReceiver({
        name: orderDraft.receiverInfo.receiverFirstName+" "+orderDraft.receiverInfo.receiverLastName,
        tel: orderDraft.receiverInfo.receiverMobile??"",
        address:address.join(",")
      })
    }else{
      setReceiver(null)
    }
  },[orderDraft.receiverInfo])

  useMemo(()=>{
    if(orderDraft.payBillInfo && orderDraft.payBillInfo.payBillId){
      const address = [
        orderDraft.payBillInfo.payBillCompany,
        orderDraft.payBillInfo.payBillAddress,
        orderDraft.payBillInfo.payBillAddressAdd,
        orderDraft.payBillInfo.payBillCity,
        orderDraft.payBillInfo.payBillProvince,
        orderDraft.payBillInfo.payBillCountry,
      ].filter(Boolean) // 过滤空值
      setBilling({
        name: orderDraft.payBillInfo.payBillFirstName+" "+orderDraft.payBillInfo.payBillLastName,
        tel: orderDraft.payBillInfo.payBillMobile??"",
        address:address.join(",")
      })
    }else{
      setBilling(null)
    }
  },[orderDraft.payBillInfo])

  
  // 获取客户的历史地址
  useEffect(()=>{
    if(orderDraft.customerInfo?.id){
      getAddressList({
        customer_id:orderDraft.customerInfo.id
      }).then(res=>{
          orderDraft.setCustomerAddressList(res.data)
      }).catch(err=>{ 
          console.log(err)
      })
    }
  },[])


  return (
    <Scoped>
      <Card>
        <div className='title font-16 font-w-600 color-242833'>客户</div>
        {orderDraft.customerInfo ? <>
          <Flex style={{marginBottom:"8px"}} justify='space-between'>
            <div className='color-356DFF'>{(orderDraft.customerInfo?.firstName+orderDraft.customerInfo?.lastName) || "未填写名称"}</div>
            <DeleteIcon className='font-20 cursor-pointer color-F86140' onClick={()=>{
              orderDraft.setCustomerInfo(null)
              orderDraft.setReceiverInfo(null)
              orderDraft.setPayBillInfo(null)
              orderDraft.orderInfo.shippingId !== "0" && orderDraft.setOrderInfo({
                ...orderDraft.orderInfo,
                shippingId:"",
                shippingMethod: "",
                shippingTotal: 0,
              })
            }} />
          </Flex>
          <Flex>
            <div style={{paddingTop:"2px",marginRight:"4px"}}><TelIcon className='font-20 color-AAB7CD' /></div>
            <div>{orderDraft.customerInfo?.mobile}</div>
          </Flex>
          <Flex>
            <div style={{paddingTop:"2px",marginRight:"4px"}}><EmailIcon className='font-20 color-AAB7CD' /></div>
            <div style={{overflowWrap:"anywhere"}} className='color-356DFF'>{orderDraft.customerInfo?.email}</div>
          </Flex>
          <Flex>
            <div>历史购买：</div>
            <div className='color-356DFF'>无数据</div>
          </Flex>
        </> : <CreateCustomerModal />}
        {/* 收货地址 */}
        <Divider />
        <>
          <Flex justify='space-between' style={{marginBottom:"8px"}}>
            <div className='color-242833 font-w-500'>收货地址</div>
            <DeliveryAddressModal />
          </Flex>
          {/*  */}
          {receiver ? <div className='color-62708D'>
            <div>{receiver?.name}</div>
            <div>{receiver?.tel}</div>
            <div>{receiver?.address}</div>
          </div>:<div className='color-B8BECC'>暂无地址</div>}
        </>
        {/* 账单地址 */}
        <Divider />
        <>
          <Flex justify='space-between' style={{marginBottom:"8px"}}>
            <div className='color-242833 font-w-500'>账单地址</div>
            <BillingAddressModal />
          </Flex>
          {/*  */}
          {orderDraft.payBillInfo?.is_same_delivery == "1" ? <>
            <div className='color-242833'>与收货地址相同</div>
          </>:billing?<>
            <div>{billing?.name}</div>
            <div>{billing?.tel}</div>
            <div>{billing?.address}</div>
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
