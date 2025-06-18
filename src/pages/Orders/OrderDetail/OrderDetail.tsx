import { ArrowLeftOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons'
import { Flex, Form, MenuProps, message, Spin, Tooltip } from 'antd'
import styled from 'styled-components';
import { useNavigate,useSearchParams,useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import OrdersShippedCard from './OrdersShippedCard';
import AbstractCard from './AbstractCard';
import CustomsInformation from './CustomsInformation';
import FraudAnalysis from './FraudAnalysis';
import OrdersIdCard from './OrdersIdCard';
import OrdersLabelCard from './OrdersLabelCard';
import OrdersNotesCard from './OrdersNotesCard';
import OrdersPaidCard from './OrdersPaidCard';
import OrdersTimeline from './OrdersTimeline';
import OrderWarningTag from '@/components/Tag/OrderWarningTag';
import ButtonDropdown from '@/components/Dropdown/ButtonDropdown';
import ButtonIcon from '@/components/Button/ButtonSvg';
import { CopyIcon, LeftIcon, RightIcon } from '@/components/Icons/Icons';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import copy from 'copy-to-clipboard';
import { getOrderDetail } from '@/services/y2/api';
import order from '@/store/order/order';
import OrderDefaultTag from '@/components/Tag/OrderDefaultTag';
import PendingShippedCard from './PendingShippedCard';
import OrderUnpaidCard from './OrderUnpaidCard';
import { useSleep } from '@/hooks/customHooks';
import DefaultButton from '@/components/Button/DefaultButton';
import CancelOrderModal from './Modal/CancelOrderModal';
import ReturnInProgress from './ReturnInProgress';
import SuspendDeliveryCard from './SuspendDeliveryCard';


function OrderDetail() {

  const navigate = useNavigate();

  const { orderId } = useParams<{orderId:string}>();

  const sleep = useSleep();

  const [isSkeleton,setIsSkeleton] = useState(true)

  const [loading,setLoading] = useState(false)

  const [prev,setPrev] = useState<string | null>(null)
  const [next,setNext] = useState<string | null>(null)

  const controlsItems: MenuProps['items'] = [
    {
      label: <a onClick={()=>navigate(`/orders/${orderId}/productsEdit`)}>编辑商品</a>,
      key: '1',
    },
    {
      // navigate(`/orders/${orderId}?orderMark=`)
      label: <a onClick={()=>{}}>查看订单状态页</a>,
      key: '2',
    },
    {
      label: <>
        <CancelOrderModal />
      </>,
      key: '3',
      style: order.shippedProductsGroup.length > 0 ? { display: 'none' } : {  },
    },
    {
      label: <div>商品定制&产品选项&套装</div>,
      key: '4',
    },
    {
      label: <div>通过购物金退款</div>,
      key: '5',
    },
  ];

  useEffect(() => {
    getOrderDetail(orderId || "").then(res=>{
      if(res.data && JSON.stringify(res.data) != "[]"){
        // 未发货商品
        const remainingProductObj = (res.data.order_products??[]).filter((item: any) => parseInt(item.remaining_quantity) > 0).reduce((acc: any, item: any) => {
          const groupId = item.group_id;
          if (!acc[groupId]) {
            acc[groupId] = [];
          }
          acc[groupId].push({...item,num:item.remaining_quantity});
          return acc;
        }, {});
        let remainingList:any = []
        for(let i in remainingProductObj){
          let count = 0
          remainingProductObj[i].forEach((item:any)=>{
            count += item.remaining_quantity
          })
          remainingList.push({
            product:remainingProductObj[i],
            shipment:{
              remaining_quantity_count:count
            },
            fulfillment:remainingProductObj[i][0].fulfillment
          })
        }
        order.setRemainingProductGroup(remainingList || [])
        // 已发货商品
        order.setShippedProductsGroup(res.data.shipped_list || [])

        // 退货中商品
        order.setReturnInProductsGroup(res.data.return_list || [])

        order.setOrderInfo(res.data.order_info || {})
        order.setCustomerInfo(res.data.customer_info || {})
        order.setOrderTotal(res.data.order_total || [])
        order.setOrderLogCount(res.data.order_logs_count || 0)
        // order.setHistoryStatus(res.data.status_history || [])
        order.setOrderLog(res.data.order_logs || [])
        // 商家备注
        order.setMerchantNotes(res.data.seller_remarks || [])

        setPrev(res.data.previous_order_id)
        setNext(res.data.next_order_id)
      }
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      console.log(order)
      setIsSkeleton(false)
    })
  },[]);

  // 更新页面
  const update = async (orderId:string)=>{
    if(!isSkeleton){
      setLoading(true)
      await sleep(1000)
      getOrderDetail(orderId).then(res=>{
        if(res.data && JSON.stringify(res.data) != "[]"){
          // 未发货商品 --- 
          const remainingProductObj = res.data.order_products.filter((item: any) => parseInt(item.remaining_quantity) > 0).reduce((acc: any, item: any) => {
            const groupId = item.group_id;
            if (!acc[groupId]) {
              acc[groupId] = [];
            }
            acc[groupId].push({...item,num:item.remaining_quantity});
            return acc;
          }, {});
          let remainingList:any = []
          for(let i in remainingProductObj){
            let count = 0
            remainingProductObj[i].forEach((item:any)=>{
              count += item.remaining_quantity
            })
            remainingList.push({
              product:remainingProductObj[i],
              shipment:{
                remaining_quantity_count:count
              },
              fulfillment:remainingProductObj[i][0].fulfillment
            })
          }
          order.setRemainingProductGroup(remainingList)
          // 已发货商品
          order.setShippedProductsGroup(res.data.shipped_list || [])

          // 退货中商品
          order.setReturnInProductsGroup(res.data.return_list || [])

          order.setOrderInfo(res.data.order_info || {})
          order.setCustomerInfo(res.data.customer_info || {})
          order.setOrderTotal(res.data.order_total || [])

          order.setOrderLogCount(res.data.order_logs_count || 0)
          // order.setHistoryStatus(res.data.status_history || [])
          order.setOrderLog(res.data.order_logs || [])
          // 商家备注
          order.setMerchantNotes(res.data.seller_remarks || [])
          // 
          navigate(`/orders/${orderId}`)
          setPrev(res.data.previous_order_id)
          setNext(res.data.next_order_id)
        }
      }).catch(err=>{
        console.log(err);
      }).finally(()=>{
        setLoading(false)
      })
    }
  }

  useMemo(() => {
    update(orderId??"");
  }, [order.refreshKey]);

  return (
    <>
      {isSkeleton?<SkeletonCard />:<Scoped>
        <div className="mc-layout">
            <div className='mc-layout-warp'>
              <Spin spinning={loading} indicator={<LoadingOutlined spin />} size="large">
                <div className="mc-header">
                  <div className="mc-header-left">
                    <div className="mc-header-left-secondary" onClick={() => {
                      navigate('/orders/manages')
                    }}>
                      <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                    </div>
                    <div className="mc-header-left-content">
                      <Flex style={{fontSize: '20px',marginBottom:"6px"}} gap={12} align='center'>
                        <span className='font-w-500'>{order.orderInfo.order_sn}</span>
                        <Tooltip title="复制">
                          <span style={{cursor:"pointer"}} onClick={()=>{
                            copy(order.orderInfo.order_sn)
                            message.success('复制成功')
                          }}><CopyIcon className='color-7A8499 font-20 cursor-pointer' /></span>
                        </Tooltip>
                        <Flex>
                          {/* orders_status */}
                          <OrderWarningTag text="处理中" />
                          {order.orderInfo.payment_status == 0?<OrderWarningTag text="未付款" />:<OrderDefaultTag text="已付款" />}
                          {order.orderInfo.shipping_status == 0?<OrderWarningTag text="未发货" />:order.orderInfo.shipping_status == 1 ?<OrderDefaultTag text="已发货" />:<OrderWarningTag text="部分发货" />}
                        </Flex>
                      </Flex>
                      <div className="mc-time" style={{fontSize: '14px', color: '#474F5E' }}>
                        2025/04/09 12:24:03 通过 在线商店 下单
                      </div>
                    </div>
                  </div>
                  <Flex className='mc-header-right' gap={12} align='center'>
                    {order.orderInfo.payment_status !== 0 && <DefaultButton text="退款" onClick={()=>navigate(`/orders/${orderId}/refund`)} />}
                    {order.shippedProductsGroup.length>0 && <DefaultButton text="退货" onClick={()=>navigate("/orders/afterSales/launch/"+orderId)} />}
                    <ButtonDropdown menu={{items:controlsItems}} text="更多" />
                    <ButtonIcon icon={<LeftIcon className='font-20' />} disabled={prev == null} onClick={()=>{
                      prev && update(prev)
                    }} />
                    <ButtonIcon icon={<RightIcon className='font-20' />} disabled={next == null} onClick={()=>{
                      next && update(next)
                    }} />
                  </Flex>
                </div>
                <Flex gap={20}>
                  <Flex className='mc-layout-content' vertical gap={20}>
                    {/* 未发货 */}
                    {order.remainingProductGroup.map((item,index)=>item.fulfillment.fulfillment_status == "4" ? <SuspendDeliveryCard groupIndex={index} />:<PendingShippedCard groupIndex={index} />)}
                    {/* 已发货 */}
                    {order.shippedProductsGroup.map((item:any,index:number)=>{
                      return(
                        <OrdersShippedCard key={index} index={index} />
                      )
                    })}
                    {/* 退货中 */}
                    {order.returnInProductsGroup.map((item:any,index:number)=>{
                      return(
                        <ReturnInProgress key={index} groupIndex={index} />
                      )
                    })}
                    {order.orderInfo.payment_status == 0 ?<OrderUnpaidCard />:<OrdersPaidCard />}
                    <OrdersTimeline />
                  </Flex>
                  <Flex className='mc-layout-extra' vertical gap={20}>
                    <OrdersNotesCard />
                    <CustomsInformation />
                    <OrdersIdCard />
                    <FraudAnalysis />
                    <AbstractCard />
                    <OrdersLabelCard />
                  </Flex>
                </Flex>
              </Spin>
            </div>
        </div>
      </Scoped>}
    </>
    
  );
}

export default observer(OrderDetail);

const Scoped = styled.div`
  .mc-layout {
    width: 100%;
    max-width: max(75%,1200px);
    margin: auto;
    display: flex;
    justify-content: center;
    color: #474f5e;
    font-size: 16px;
    line-height: 20px;
      .mc-layout-warp{
        width: 100%;
        min-width: 500px;
        .mc-header {
          margin-bottom: 20px;
          color: #474f5e;
          font-size: 14px;
          line-height: 20px;
          display: flex;
          justify-content: space-between;
          align-content: center;
          &-left {
              display: flex;
              flex-direction: row;
              align-items: center;
              &-secondary {
                  height: 32px;
                  width: 32px;
                  border: #d7dbe7 1px solid;
                  border-radius: 4px;
                  display: flex;
                  justify-content: center;
                  align-content: center;
                  &:hover{
                      background-color:  #eaf0ff;
                      cursor: pointer;
                  }
                  &-icon {
                      font-size: 18px;
                  }
              }
  
              &-content {
                  margin-left: 12px;
                  font-size: 20px;
              }
          }
          &-right {
            margin-top: 24px;
          }
        }
        .mc-layout-content{
          width: 0;
          flex:3;
        }
        .mc-layout-extra{
          width: 0;
          flex:1;
        }
      }
  }
`

