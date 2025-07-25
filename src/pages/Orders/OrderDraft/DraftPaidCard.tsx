// DraftPaidCard.js
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { getAddonsConfigs, getAddonsList, getDeliveryList } from '@/services/y2/api';
import orderDraft from '@/store/order/orderDraft';
import MySelectIcon from '@/components/Select/MySelectIcon';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import MyDatePicker from '@/components/DatePicker/MyDatePicker';
function DraftPaidCard() {

  const [open,setOpen] = useState(false)

  // 成本价 US$0.00
  const [costPrice,setCostPrice] = useState(0);
  // 税费
  const [taxes,setTaxes] = useState(false);
  
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

  // 支付方式
  const [paymentList,setPaymentList] = useState()

  const symbolLeft = cookie.load("symbolLeft") || ""


  const isFirstRender = useRef(true);
  useMemo(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let newCostPrice = 0;
    let newPricing = 0;
    orderDraft.productInfo.forEach(element => {
      newCostPrice = newCostPrice + element.product_cost_price * element.product_quantity
      newPricing = newPricing + element.final_price * element.product_quantity
    });
    setCostPrice(newCostPrice)
    // 如果产品折扣大于小计，则修改折扣
    if(newPricing<orderDraft.orderInfo.orderDiscount){
      orderDraft.setOrderInfo({
        ...orderDraft.orderInfo,
        orderDiscount:newPricing,
        productTotal:newPricing,
        orderTotal:0+Number(orderDraft.orderInfo.shippingTotal),
      })
    }else{
      orderDraft.setOrderInfo({
        ...orderDraft.orderInfo,
        productTotal:newPricing,
        orderTotal:newPricing - orderDraft.orderInfo.orderDiscount + Number(orderDraft.orderInfo.shippingTotal),
      })
    }
  },[orderDraft.productInfo])



  useEffect(()=>{
    // 手动收款方式
    getAddonsConfigs().then(res=>{
      const newPaymentList = res.data.map(item=>{
        return {
          value: item.id,
          label: item.title,
        }
      })
      setPaymentList(newPaymentList)

    }).catch(err=>{
    })

    console.log(orderDraft.orderInfo)
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
            <div>{symbolLeft}{Number(orderDraft.orderInfo.productTotal).toFixed(2)}</div>
          </Flex>
          <Flex justify="space-between" style={orderDraft.productInfo.length>0 ? {}:{ pointerEvents: "none",opacity: 0.6 }}>
            <DiscountEditModal pricing={orderDraft.orderInfo.productTotal} disable={ orderDraft.productInfo.length>0 ? false : true} />
            <div style={{flex:1}}>{orderDraft.orderInfo.orderDiscountDesc==""?"-":orderDraft.orderInfo.orderDiscountDesc}</div>
            <div>-{symbolLeft}{orderDraft.orderInfo.orderDiscount?Number(orderDraft.orderInfo.orderDiscount).toFixed(2):Number(0).toFixed(2)}</div>
          </Flex>
          <Flex justify="space-between">
            <ShippingFeeEditingModal />
            <div style={{flex:1}}>{orderDraft.orderInfo.shippingId ? orderDraft.orderInfo.shippingMethod : "-"}</div>
            <div>{symbolLeft}{Number(orderDraft.orderInfo.shippingTotal).toFixed(2)}</div>
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
            <div className='font-w-600'>{symbolLeft}{Number(orderDraft.orderInfo.orderTotal).toFixed(2)}</div>
          </Flex>
        </Flex>
        <Divider />
        {/* 付款金额大于零 */}
        {orderDraft.orderInfo.orderTotal > 0 && <>
          <Checkbox checked={orderDraft.orderInfo.paymentTerm?true:false} onChange={(e)=>{
            orderDraft.setOrderInfo({
              ...orderDraft.orderInfo,
              paymentTerm:e.target.checked ? "full_payment_on_shipment" :""
            })
          }}>延期支付</Checkbox>
          {orderDraft.orderInfo.paymentTerm ? <>
            <div style={{margin:"8px 0"}}>付款期限</div>
            <Flex style={{width:"100%"}} gap={8}>
              <MySelectIcon style={{height:"36px",width:"252px"}} options={options} value={orderDraft.orderInfo.paymentTerm} placeholder="请选择" onChange={(value:string)=>{
                orderDraft.setOrderInfo({
                  ...orderDraft.orderInfo,
                  paymentTerm:value
                })
                if(value == "full_payment_on_invoice" || value == "full_payment_on_shipment"){

                }else{
                  orderDraft.setOrderInfo({
                    ...orderDraft.orderInfo,
                    paymentStartDate:dayjs(new Date()).add(1, 'day').unix().toString()
                  })
                }
              }} />
              {/*  */}
              {!(orderDraft.orderInfo.paymentTerm == "full_payment_on_invoice" || orderDraft.orderInfo.paymentTerm == "full_payment_on_shipment") && <MyDatePicker allowClear={false} value={orderDraft.orderInfo.paymentStartDate ? dayjs(parseInt(orderDraft.orderInfo.paymentStartDate)*1000) : ""} 
                onChange={(date)=>{
                  orderDraft.setOrderInfo({
                    ...orderDraft.orderInfo,
                    paymentStartDate:date ? date.unix().toString() : ""
                  })
                }}
                minDate={dayjs(new Date())}
              />}
            </Flex>
            {(orderDraft.orderInfo.paymentTerm == "full_payment_on_invoice" || orderDraft.orderInfo.paymentTerm == "full_payment_on_shipment") ? <div style={{marginTop:"8px"}} className="color-474F5E font-w-400">
              <span>客户应在账单发送后的24小时内完成付款。</span>
              设置付款<Link to="" className="color-356DFF">通知邮件</Link>
            </div>:<div style={{marginTop:"8px"}} className="color-474F5E font-w-400">
              <span>客户应在{dayjs(parseInt(orderDraft.orderInfo.paymentStartDate) * 1000).format("YYYY-MM-DD")}前完成付款。</span>
              设置付款<Link to="" className="color-356DFF">通知邮件</Link>
            </div>}
          </> : <Flex justify='space-between' align='end'>
            <Flex gap={20}>
              <div>
                <div style={{margin:"14px 0"}}>支付状态</div>
                <MySelect value={orderDraft.orderInfo.ordersStatus} onChange={(value:string)=>{
                  orderDraft.setOrderInfo({
                    ...orderDraft.orderInfo,
                    ordersStatus:value
                  })
                }} style={{width:"120px",height:"36px"}} options={[
                  { value: '0', label: '未付款' },
                  { value: '1', label: '已付款' },
                ]} />
              </div>
              <div>
                <div style={{margin:"14px 0"}}>支付方式</div>
                <MySelect value={orderDraft.orderInfo.paymentMethodNo == "0" ? "" : orderDraft.orderInfo.paymentMethodNo} onChange={(value:string,option:any)=>{
                  orderDraft.setOrderInfo({
                    ...orderDraft.orderInfo,
                    paymentMethodNo:value,
                    paymentMethod:option.label
                  })
                }} style={{width:"120px",height:"36px"}} options={paymentList} />
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
