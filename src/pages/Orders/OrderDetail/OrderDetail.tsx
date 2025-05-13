import { ArrowLeftOutlined, CopyOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Drawer, Flex, Form, Input, MenuProps, message, Select, TableProps, Tooltip } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history, useIntl, useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
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

function OrderDetail() {
  const intl = useIntl();

  const { orderId } = useParams<{ orderId: string }>();

  const [isSkeleton,setIsSkeleton] = useState(true)

  const controlsItems: MenuProps['items'] = [
    {
      label: <div>编辑商品</div>,
      key: '1',
    },
    {
      label: <div>查看订单状态页</div>,
      key: '2',
    },
    {
      label: <div>取消订单</div>,
      key: '3',
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
    getOrderDetail(orderId).then(res=>{
      if(res.data && JSON.stringify(res.data) != "[]"){
        order.setOrderInfo(res.data.order_info || {})
        order.setProductInfo(res.data.order_products || [])
        order.setCustomerInfo(res.data.customer_info || {})
        order.setDeliveryAddress(res.data.delivery_address || {})
        order.setBillingAddress(res.data.billing_address || {})
        order.setOrderTotal(res.data.order_total || [])
        order.setHistoryStatus(res.data.status_history || [])
      }
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      setIsSkeleton(false)
    })

  },[]);

  return (
    <>
      {isSkeleton?<SkeletonCard />:<Scoped>
      <div className="mc-layout">
        <div className='mc-layout-warp'>
          <div className="mc-header">
            <div className="mc-header-left">
              <div className="mc-header-left-secondary" onClick={() => {
                history.push('/orders/manages')
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
                    {order.orderInfo.payment_status?<OrderDefaultTag text="已付款" />:<OrderWarningTag text="未付款" />}
                    {order.orderInfo.shipping_status?<OrderDefaultTag text="已发货" />:<OrderWarningTag text="待发货" />}
                  </Flex>
                </Flex>
                <div className="mc-time" style={{fontSize: '14px', color: '#474F5E' }}>
                  2025/04/09 12:24:03 通过 在线商店 下单
                </div>
              </div>
            </div>
            <Flex className='mc-header-right' gap={12} align='center'>
              <ButtonDropdown items={controlsItems} text="更多" />
              <ButtonIcon icon={<LeftIcon className='font-20' />} />
              <ButtonIcon icon={<RightIcon className='font-20' />} />
            </Flex>
          </div>
          <Flex gap={20}>
            <Flex className='mc-layout-content' vertical gap={20}>
              {order.orderInfo.payment_status?<OrdersShippedCard />:<PendingShippedCard />}
              {order.orderInfo.shipping_status?<OrdersPaidCard />:<OrderUnpaidCard />}
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
          flex:9
        }
        .mc-layout-extra{
          flex:1;
        }
      }
  }
`

