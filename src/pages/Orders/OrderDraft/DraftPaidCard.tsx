// DraftPaidCard.js
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Form, Divider, Flex, Checkbox, Tooltip, Popover, Popconfirm, DatePicker } from 'antd';
import SimpleCard from '@/components/Card/SimpleCard';
import DefaultButton from '@/components/Button/DefaultButton';
import { QuestionCircleOutlined } from '@ant-design/icons';
import DiscountEditModal from './DiscountEditModal';
import ShippingFeeEditingModal from './ShippingFeeEditingModal';
import MyButton from '@/components/Button/MyButton';
import MySelect from '@/components/Select/MySelect';
import cookie from 'react-cookies';
import { observer } from 'mobx-react-lite';
import { getAddonsList } from '@/services/y2/api';
import orderDraft from '@/store/order/orderDraft';
import MySelectIcon from '@/components/Select/MySelectIcon';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import MyDatePicker from '@/components/DatePicker/MyDatePicker';
function DraftPaidCard() {

  const [open,setOpen] = useState(false)

  // 成本价 US$0.00
  const [costPrice,setCostPrice] = useState(0);
  // 小计
  const [pricing,setPricing] = useState(0);
  // 税费
  const [taxes,setTaxes] = useState(false);
  // 付款期限方式
  const [paymentTerm,setPaymentTerm] = useState("");
  // 付款期限
  const [deadLine,setDeadLine] = useState("");
  const options = [
    {
        value: 'full_payment_on_invoice',
        label: '发送账单时全额付款',
    },
    {
        value: 'full_payment_on_shipment',
        label: '订单发货时全额付款',
    },
    {
        value: 'full_payment_by_date',
        label: '指定日期前全额付款',
    },
    {
        value: 'full_payment_in_7_days',
        label: '7天内全额付款',
    },
    {
        value: 'full_payment_in_15_days',
        label: '15天内全额付款',
    },
    {
        value: 'full_payment_in_30_days',
        label: '30天内全额付款',
    },
    {
        value: 'full_payment_in_45_days',
        label: '45天内全额付款',
    },
    {
        value: 'full_payment_in_60_days',
        label: '60天内全额付款',
    },
    {
        value: 'full_payment_in_90_days',
        label: '90天内全额付款',
    },
  ];

  const symbolLeft = cookie.load("symbolLeft") || ""

  useMemo(()=>{
    let newCostPrice = 0;
    let newPricing = 0;
    orderDraft.productInfo.forEach(element => {
      newCostPrice = newCostPrice + element.product_cost_price * element.product_quantity
      newPricing = newPricing + element.final_price * element.product_quantity
    });
    setCostPrice(newCostPrice)
    setPricing(newPricing)

    // 如果产品折扣大于小计，则修改折扣
    if(newPricing<orderDraft.orderInfo.discountAmount){
      orderDraft.setOrderInfo({
        ...orderDraft.orderInfo,
        discountAmount:newPricing
      })
    }
    // console.log(order.discountAmount)
    // console.log(order.logisticsAmount)
  },[orderDraft.productInfo])


  useEffect(()=>{
    getAddonsList("2","1","0").then(res=>{
      console.log(res)
    }).catch(err=>{
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
              {symbolLeft}{costPrice.toFixed(2)}
              {/* <Tooltip title="成本价信息不会展示给消费者">
                  <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                      <QuestionCircleOutlined />
                  </span>
              </Tooltip> */}
            </div>
          </Flex>
          <Flex justify="space-between">
            <div>小计</div>
            <div>{symbolLeft}{pricing.toFixed(2)}</div>
          </Flex>
          <Flex justify="space-between" style={orderDraft.productInfo.length>0 ? {}:{ pointerEvents: "none",opacity: 0.6 }}>
            <DiscountEditModal pricing={pricing} disable={ orderDraft.productInfo.length>0 ? false : true} />
            <div style={{flex:1}}>{orderDraft.orderInfo.orderDiscountDesc==""?"-":orderDraft.orderInfo.orderDiscountDesc}</div>
            <div>-{symbolLeft}{orderDraft.orderInfo.orderDiscount?Number(orderDraft.orderInfo.orderDiscount).toFixed(2):Number(0).toFixed(2)}</div>
          </Flex>
          <Flex justify="space-between">
            <ShippingFeeEditingModal />
            <div style={{flex:1}}>{orderDraft.orderInfo.logisticsType == "FREE_SHIPPING"?"免运费":orderDraft.orderInfo.logisticsName==""?"-":orderDraft.orderInfo.logisticsName}</div>
            <div>{symbolLeft}{orderDraft.orderInfo.logisticsAmount.toFixed(2)}</div>
          </Flex>
          <Flex justify="space-between">
            <Popover 
              open={open}
              onOpenChange={(newOpen)=>{
                if(!newOpen){
                  setTaxes(orderDraft.orderInfo.isTaxe == 1)
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
                      setTaxes(orderDraft.orderInfo.isTaxe == 1)
                    }} />
                    <MyButton text="应用" autoInsertSpace={false} type='primary' className='font-12' style={{height:"28px",width:"44px"}} onClick={()=>{
                      orderDraft.setOrderInfo({
                        ...orderDraft.orderInfo,
                        isTaxe:taxes?1:0
                      })
                      setOpen(false)
                    }} />
                  </Flex>
                </div>
              } title="税费" trigger="click">
              <a style={{width:"20%"}} onClick={()=>setOpen(true)}>税费</a>
            </Popover>
            <div style={{flex:1}}>{orderDraft.orderInfo.isTaxe == 1?"-":"未征收"}</div>
            <div></div>
          </Flex>
          <Flex justify="space-between">
            <div className='font-w-600'>合计</div>
            <div className='font-w-600'>{symbolLeft}{(pricing - orderDraft.orderInfo.orderDiscount + orderDraft.orderInfo.logisticsAmount).toFixed(2)}</div>
          </Flex>
        </Flex>
        <Divider />
        {/* 付款金额大于零 */}
        {pricing - orderDraft.orderInfo.orderDiscount + orderDraft.orderInfo.logisticsAmount > 0 && <>
          <Checkbox checked={orderDraft.orderInfo.deferredPayment} onChange={(e)=>{
            orderDraft.setOrderInfo({
              ...orderDraft.orderInfo,
              deferredPayment:e.target.checked
            })
          }}>延期支付</Checkbox>
          {orderDraft.orderInfo.deferredPayment ? <>
            <div style={{margin:"8px 0"}}>付款期限</div>
            <Flex style={{width:"100%"}} gap={8}>
              <MySelectIcon style={{height:"36px",width:"252px"}} options={options} value={paymentTerm} placeholder="请选择" onChange={(value:string)=>{
                setPaymentTerm(value)
                if(value == "full_payment_on_invoice" || value == "full_payment_on_shipment"){

                }else{
                  setDeadLine(dayjs(new Date()).add(1, 'day').format("YYYY-MM-DD"))
                }
              }} />
              {/*  */}
              {!(paymentTerm == "full_payment_on_invoice" || paymentTerm == "full_payment_on_shipment") && <MyDatePicker value={dayjs(deadLine)} onChange={(date)=>{
                setDeadLine(date.format("YYYY-MM-DD"))
              }} />}
            </Flex>
            {(paymentTerm == "full_payment_on_invoice" || paymentTerm == "full_payment_on_shipment") ? <div style={{marginTop:"8px"}} className="color-474F5E font-w-400">
              <span>客户应在账单发送后的24小时内完成付款。</span>
              设置付款<Link to="" className="color-356DFF">通知邮件</Link>
            </div>:<div style={{marginTop:"8px"}} className="color-474F5E font-w-400">
              <span>客户应在{deadLine}前完成付款。</span>
              设置付款<Link to="" className="color-356DFF">通知邮件</Link>
            </div>}
          </> : <Flex justify='space-between' align='end'>
            <Flex gap={20}>
              <div>
                <div style={{margin:"14px 0"}}>支付状态</div>
                <MySelect value={orderDraft.orderInfo.paymentStatus} onChange={(value:string)=>{
                  orderDraft.setOrderInfo({
                    ...orderDraft.orderInfo,
                    paymentStatus:value
                  })
                }} style={{width:"120px",height:"36px"}} options={[
                  { value: '0', label: '未付款' },
                  { value: '1', label: '已付款' },
                ]} />
              </div>
              <div>
                <div style={{margin:"14px 0"}}>支付方式</div>
                <MySelect value={orderDraft.orderInfo.paymentMethod} onChange={(value:string)=>{
                  orderDraft.setOrderInfo({
                    ...orderDraft.orderInfo,
                    paymentMethod:value
                  })
                }} style={{width:"120px",height:"36px"}} options={[
                  { value: '0', label: '货到付款' },
                ]} />
              </div>
            </Flex>
            <DefaultButton text={'发送账单'} />
          </Flex>}
        </>
       }
      </>
    } />
  );
}

export default observer(DraftPaidCard)
