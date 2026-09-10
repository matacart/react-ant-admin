import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { App, Flex, MenuProps, Spin, Tooltip } from 'antd'
import styled from 'styled-components';
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
import PendingShippedCard from './PendingShippedCard';
import OrderUnpaidCard from './OrderUnpaidCard';
import { getOrderDetail } from '@/services/y2/apiStore';
import order from '@/store/order/order';
import OrderDefaultTag from '@/components/Tag/OrderDefaultTag';
import OrderWarningTag from '@/components/Tag/OrderWarningTag';
import { CopyIcon } from '@/components/Icons/Icons';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import OrderEmptyTag from '@/components/Tag/OrderEmptyTag';
import LangSelect from '@/components/Select/LangSelect';
import { useSleep } from '@/hooks/customHooks';
import { useParams,history } from '@umijs/max';
import LRButton from './LRButton';
import DefaultButton from '@/components/Button/DefaultButton';
import ButtonDropdown from '@/components/Dropdown/ButtonDropdown';
import PausedShippedCard from './PausedShippedCard';
import copy from 'copy-to-clipboard';



function Index() {

  const { message } = App.useApp();

  const { orderId,languagesId } = useParams<{orderId:string,languagesId:string}>();

  const sleep = useSleep();

  const [isSkeleton,setIsSkeleton] = useState(true)

  const [loading,setLoading] = useState(false)

  const controlsItems: MenuProps['items'] = [
    {
      label: <a onClick={()=>history.push(`/orders/${orderId}/productsEdit`)}>编辑商品</a>,
      key: '1',
    },
    {
      label: <a onClick={()=>{}}>查看订单状态页</a>,
      key: '2',
    },
    // {
    //   label: <CancelOrderModal />,
    //   key: '3',
    //   style: order.shippedProductsGroup.length > 0 ? { display: 'none' } : {  },
    // },
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
    getOrderDetail({
      order_id:orderId || "",
      languages_id:languagesId || "",
    }).then(res=>{
      order.setOrderInfo(res.data)
      order.setFulfillmentOrderList(res.data?.fulfillmentOrderList || [])
      order.setOrdersPackageList(res.data?.ordersPackageList || [])
      order.setLanguages(languagesId || "")
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      setIsSkeleton(false)
    })
  },[languagesId,orderId]);

  // 更新页面
  const update = async (orderId:string,languagesId:string)=>{
    if(!isSkeleton){
      setLoading(true)
      await sleep(1000)
      getOrderDetail({
        order_id:orderId || "",
        languages_id:languagesId || "",
      }).then(res=>{
        order.setOrderInfo(res.data)
        order.setFulfillmentOrderList(res.data?.fulfillmentOrderList || [])
        order.setOrdersPackageList(res.data?.ordersPackageList || [])
        order.setLanguages(languagesId || "")
      }).catch(err=>{
        console.log(err);
      }).finally(()=>{
        setLoading(false)
      })
    }
  }

  useMemo(() => {
    update(orderId??"",languagesId??"2");
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
                      history.push('/orders/manages')
                    }}>
                      <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                    </div>
                    <div className="mc-header-left-content">
                      <Flex style={{fontSize: '20px',marginBottom:"6px"}} gap={12} align='center'>
                        <span className='font-w-500'>{order.orderInfo.appOrderSeq}</span>
                        <Tooltip title="复制">
                          <span style={{cursor:"pointer"}} onClick={()=>{
                            copy(order.orderInfo.appOrderSeq)
                            message.success('复制成功')
                          }}><CopyIcon className='color-7A8499 font-20 cursor-pointer' /></span>
                        </Tooltip>
                        <Flex>
                          {order.orderInfo.bizOrderStatus == 100 ? <OrderWarningTag text="处理中" />:order.orderInfo.bizOrderStatus == 400 ? <OrderEmptyTag text="已取消" />:<OrderDefaultTag text="已归档" />}
                          {order.orderInfo.bizPayStatus == 0?<OrderWarningTag text="未付款" />: order.orderInfo.bizPayStatus == 100 ?<OrderWarningTag text="付款中" />:order.orderInfo.bizPayStatus == 150 ?<OrderWarningTag text="部分付款" />:order.orderInfo.bizPayStatus == 200?<OrderDefaultTag text="已付款" />:order.orderInfo.bizPayStatus == 650 ?<OrderEmptyTag text="部分退款" />:order.orderInfo.bizPayStatus == 700 ?<OrderDefaultTag text="已退款" />:<OrderDefaultTag text="已授权" />}
                          {order.orderInfo.bizDeliveryStatus == 100?<OrderWarningTag text="未发货" />:order.orderInfo.bizDeliveryStatus == 150 ?<OrderEmptyTag text="部分发货" />:<OrderDefaultTag text="已发货" />}
                        </Flex>
                      </Flex>
                      <div className="mc-time" style={{fontSize: '14px', color: '#474F5E' }}>
                        2025/04/09 12:24:03 通过 在线商店 下单
                      </div>
                    </div>
                  </div>
                  <Flex className='mc-header-right' gap={12} align='center'>
                    <LangSelect lang={order.languages} setLang={(lang:string)=>history.push(`/orders/${orderId}/${lang}`)} />
                    {/* {order.orderInfo.payment_status !== 0 && <DefaultButton text="退款" onClick={()=>history.push(`/orders/${orderId}/refund`)} />} */}
                    {order.ordersPackageList.length>0 && <DefaultButton text="退货" onClick={()=>history.push(`/orders/afterSales/launch/${orderId}/${languagesId}`)} />}
                    <ButtonDropdown menu={{items:controlsItems}} text="更多" />
                    {order.orderInfo.orderSeq && <LRButton orderSeq={order.orderInfo.orderSeq} />}
                  </Flex>
                </div>
                <Flex gap={20}>
                  <Flex className='mc-layout-content' vertical gap={20}>
                    {/* 履约包裹 fulfillmentOrderList */}
                    {/* item.fulfillment_status == "4" ? <SuspendDeliveryCard groupIndex={index} />:<PendingShippedCard groupIndex={index} /> */}
                    {order.fulfillmentOrderList.map((item,index)=>{
                      return item.fulfillmentOrder.status == "on_hold" ? <PausedShippedCard groupIndex={index} />:<PendingShippedCard groupIndex={index} />
                    })}
                    {/* 已准备发货包裹 ordersPackageList */}
                    {order.ordersPackageList.map((item,index:number)=>{
                      return <OrdersShippedCard key={index} index={index} />
                    })}
                    {/* 退货包裹 afterSaleOrderList */}
                    {/* {order.returnInProductsGroup.map((item:any,index:number)=>{
                      return(
                        <ReturnInProgress key={index} groupIndex={index} />
                      )
                    })} */}
                    {/* 取消包裹 */}
                    {/* deletedItemList */}
                    {/* 未付款/已付款 */}
                    {
                      order.orderInfo.bizPayStatus == 0 ?<OrderUnpaidCard />:
                      order.orderInfo.bizPayStatus == 100 ?<div>付款中</div>:
                      order.orderInfo.bizPayStatus == 150 ?<div>部分付款</div>:
                      order.orderInfo.bizPayStatus == 200 ?<OrdersPaidCard />:
                      order.orderInfo.bizPayStatus == 650 ?<div>部分退款</div>:
                      order.orderInfo.bizPayStatus == 700 ?<div>已退款</div>:
                      <div>未知状态</div>
                    }
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

export default observer(Index);

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

