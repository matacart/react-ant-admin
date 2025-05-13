// DraftPaidCard.js
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Form, InputNumber, Divider, Flex, Checkbox, Tooltip, Popover, Popconfirm } from 'antd';
import SimpleCard from '@/components/Card/SimpleCard';
import DefaultButton from '@/components/Button/DefaultButton';
import { QuestionCircleOutlined } from '@ant-design/icons';
import DiscountEditModal from './DiscountEditModal';
import ShippingFeeEditingModal from './ShippingFeeEditingModal';
import MyButton from '@/components/Button/MyButton';
import MySelect from '@/components/Select/MySelect';
import cookie from 'react-cookies';
import order from '@/store/order/order';
import { observer } from 'mobx-react-lite';
import { getAddonsList } from '@/services/y2/api';
function DraftPaidCard() {

  const [open,setOpen] = useState(false)

  // 成本价 US$0.00
  const [costPrice,setCostPrice] = useState(0);
  // 小计
  const [pricing,setPricing] = useState(0);

  // 税费
  const [taxes,setTaxes] = useState(false);

  const symbolLeft = cookie.load("symbolLeft") || ""

  useMemo(()=>{
    let newCostPrice = 0;
    let newPricing = 0;
    order.productInfo.forEach(element => {
      newCostPrice = newCostPrice + element.cost_price * element.quantity
      newPricing = newPricing + element.specialprice * element.quantity
    });
    setCostPrice(newCostPrice)
    setPricing(newPricing)

    // 如果产品折扣大于小计，则修改折扣
    if(newPricing<order.orderInfo.discountAmount){
      order.setOrderInfo({
        ...order.orderInfo,
        discountAmount:newPricing
      })
    }
    // console.log(order.discountAmount)
    // console.log(order.logisticsAmount)
  },[order.productInfo])


  useEffect(()=>{
    getAddonsList("2","1","0").then(res=>{
      console.log(res)
    })
  },[])


  return (
    <SimpleCard title={<div>收款</div>} content={
      <>
        <Flex gap={8} vertical>
          <Flex justify="space-between">
            <div>
              成本价
              <Tooltip title="成本价信息不会展示给消费者">
                  <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                      <QuestionCircleOutlined />
                  </span>
              </Tooltip>
            </div>
            <div>
              {symbolLeft}{costPrice}
              {/* <Tooltip title="成本价信息不会展示给消费者">
                  <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                      <QuestionCircleOutlined />
                  </span>
              </Tooltip> */}
            </div>
          </Flex>
          <Flex justify="space-between">
            <div>小计</div>
            <div>{symbolLeft}{pricing}</div>
          </Flex>
          <Flex justify="space-between">
            <DiscountEditModal pricing={pricing} />
            <div style={{flex:1}}>{order.orderInfo.discountDesc==""?"-":order.orderInfo.discountDesc}</div>
            <div>-{symbolLeft}{order.orderInfo.discountAmount?order.orderInfo.discountAmount:0}</div>
          </Flex>
          <Flex justify="space-between">
            <ShippingFeeEditingModal />
            <div style={{flex:1}}>{order.orderInfo.logisticsType == "FREE_SHIPPING"?"免运费":order.orderInfo.logisticsName==""?"-":order.orderInfo.logisticsName}</div>
            <div>{symbolLeft}{order.orderInfo.logisticsAmount}</div>
          </Flex>
          <Flex justify="space-between">
            <Popover 
              open={open}
              onOpenChange={(newOpen)=>{
                if(!newOpen){
                  setTaxes(order.orderInfo.isTaxe == 1)
                }
                setOpen(newOpen)
              }}
              content={
                <div>
                  <Checkbox checked={taxes} onChange={(e)=>{
                    setTaxes(e.target.checked)
                  }} style={{marginTop:"8px",marginBottom:"12px"}} >收税</Checkbox>
                  <Flex gap={8} justify='end'>
                    <MyButton text="取消" autoInsertSpace={false} className='font-12' style={{height:"28px",width:"44px"}} onClick={()=>{
                      setOpen(false)
                      setTaxes(order.orderInfo.isTaxe == 1)
                    }} />
                    <MyButton text="应用" autoInsertSpace={false} type='primary' className='font-12' style={{height:"28px",width:"44px"}} onClick={()=>{
                      order.setOrderInfo({
                        ...order.orderInfo,
                        isTaxe:taxes?1:0
                      })
                      setOpen(false)
                    }} />
                  </Flex>
                </div>
              } title="税费" trigger="click">
              <a style={{width:"20%"}} onClick={()=>setOpen(true)}>税费</a>
            </Popover>
            <div style={{flex:1}}>{order.orderInfo.isTaxe == 1?"-":"未征收"}</div>
            <div></div>
          </Flex>
          <Flex justify="space-between">
            <div className='font-w-600'>合计</div>
            <div className='font-w-600'>{symbolLeft}{pricing - order.orderInfo.discountAmount + order.orderInfo.logisticsAmount}</div>
          </Flex>
        </Flex>
        <Divider />
        {/* 付款金额大于零 */}
        {pricing - order.orderInfo.discountAmount + order.orderInfo.logisticsAmount > 0 && <>
          <Checkbox>延期支付</Checkbox>
          <Flex justify='space-between' align='end'>
            <Flex gap={20}>
              <div>
                <div style={{margin:"14px 0"}}>支付状态</div>
                <MySelect value={order.orderInfo.paymentStatus} onChange={(value:string)=>{
                  order.setOrderInfo({
                    ...order.orderInfo,
                    paymentStatus:value
                  })
                }} style={{width:"120px",height:"36px"}} options={[
                  { value: '0', label: '未付款' },
                  { value: '1', label: '已付款' },
                ]} />
              </div>
              <div>
                <div style={{margin:"14px 0"}}>支付方式</div>
                <MySelect style={{width:"120px",height:"36px"}} options={[
                  { value: '0', label: '未付款' },
                  { value: '1', label: '已付款' },
                ]} />
              </div>
            </Flex>
            <DefaultButton text={'发送账单'} />
          </Flex>
        </>
       }
      </>
    } />
  );
}

export default observer(DraftPaidCard)
