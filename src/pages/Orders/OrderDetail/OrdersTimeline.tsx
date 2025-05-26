import React, { useEffect, useState } from 'react';
import { Timeline, Button, Flex } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import order from '@/store/order/order';
import dayjs from 'dayjs';
import { getOrderLogs } from '@/services/y2/api';

const OrdersTimeline = () => {

  const intl = useIntl();

  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const [orderLog, setOrderLog] = useState<any[]>([]);

  const [remainingLogNumber,setRemainingLogNumber] = useState<number>(0);

  const [loading,setLoading] = useState<boolean | React.ReactNode>(false);

  const [page,setPage] = useState(2);

  const handleExpand = (index: number) => {
    setExpandedItems(prevItems => {
      if (prevItems.includes(index)) {
        return prevItems.filter(item => item !== index);
      } else {
        return [...prevItems, index];
      }
    });
  };

  // 添加日志
  const getLogs = ()=>{
    setLoading(<div className='color-7A8499'>正在加载...</div>)
    const limit = remainingLogNumber >=5 ? 5 : remainingLogNumber;
    getOrderLogs({
      orderId:order.orderInfo.order_id,
      page:page,
      limit:limit
    }).then(res => {
      setOrderLog([
        ...orderLog,
        ...res.data
      ])
      setPage(page+1)
      setRemainingLogNumber(remainingLogNumber - limit)
    }).catch(err => {
      console.log("失败")
    }).finally(() => {
      setLoading(false)
    });
  }

  useEffect(() => {
    setOrderLog(order.orderLog);
    setRemainingLogNumber(order.orderLogCount - order.orderLog.length)
  }, []);


  return (
    <Scoped>
      {order.orderLog.length>0 && <Timeline pending={loading}>
        {orderLog.map((item: any, index: number) => (
          <Timeline.Item key={index} dot={
            <div className="timeline-item-head"></div>
          }>
            <div onClick={() => handleExpand(index)}>
              <Flex className='timeline-item-title font-w-500'>
                {item.me?"您":item.operator}
                {(()=>{
                  switch (item.action) {
                    case "CANCEL_SHIP":
                      return "为发货单8888-F8取消了发货"
                      break;
                    case "UPDATE_BUYER_CONTACT":
                      return "更新了联系方式"
                      break;
                    case "ADD_ORDER_REMARK":
                      return "添加了备注"
                      break;
                    case "SHIP":
                      return "为***件商品安排了发货"
                      break;
                    case "EDIT_SHIP":
                      return "编辑了发货单8888-F8的跟踪信息"
                      break;
                    case "EDIT_PAYMENT_TERMS":
                      return "更新 或 添加了支付条款"
                      break;
                  }
                })()}
                {expandedItems.includes(index) ? <CaretDownOutlined className='font-10' /> : <CaretRightOutlined className='font-10' />}
              </Flex>
              <div className='font-12 color-7A8499'>{dayjs(item.operationTime*1000).format("YYYY-MM-DD HH:mm")}</div>
              {expandedItems.includes(index) && (
                <div className='font-12' style={{marginTop:"12px"}}>
                  {(()=>{
                  switch (item.action) {
                    case "CANCEL_SHIP":
                      return <>
                        <div>
                          <div style={{marginBottom:"4px"}} className='color-242833 font-w-500'>商品</div>
                          {/* <div>已从 {item.actionDetails.beforeBuyerEmail} 更新为 {item.actionDetails.afterBuyerEmail} </div> */}
                        </div>
                      </>
                      break;
                    case "UPDATE_BUYER_CONTACT":
                      return <>
                        <div>
                          <div style={{marginBottom:"4px"}} className='color-242833 font-w-500'>电子邮箱</div>
                          <div>已从 {item.actionDetails.beforeBuyerEmail} 更新为 {item.actionDetails.afterBuyerEmail} </div>
                        </div>
                        <div style={{marginTop:"12px"}}>
                          <div style={{marginBottom:"4px"}} className='color-242833 font-w-500'>手机号码</div>
                          <div>已从 {item.actionDetails.beforeBuyerTelephone} 更新为 {item.actionDetails.afterBuyerTelephone} </div>
                        </div>
                      </>
                      break;
                    case "ADD_ORDER_REMARK":
                      return <>
                        <div>
                          <div style={{marginBottom:"4px"}} className='color-242833 font-w-500'>商家备注</div>
                          <div>{item.actionDetails.sellerRemark}</div>
                        </div>
                      </>
                      break;
                    case "SHIP":
                      return <>
                        <div>
                          <div style={{marginBottom:"4px"}} className='color-242833 font-w-500'>商品</div>
                        </div>
                      </>
                      break;
                    case "EDIT_SHIP":
                      return <>
                        <div>
                          <div style={{marginBottom:"4px"}} className='color-242833 font-w-500'>运单号</div>
                          <div>{item.actionDetails.expressCode}</div>
                        </div>
                        <div style={{marginTop:"12px"}}>
                          <div style={{marginBottom:"4px"}} className='color-242833 font-w-500'>物流服务商</div>
                          <div>{item.actionDetails.company}</div>
                        </div>
                      </>
                      break;
                    case "EDIT_PAYMENT_TERMS":
                      return <>
                        <div>
                          <div style={{marginBottom:"4px"}} className='color-242833 font-w-500'>运单号</div>
                          <div>{item.actionDetails.expressCode}</div>
                        </div>
                        <div style={{marginTop:"12px"}}>
                          <div style={{marginBottom:"4px"}} className='color-242833 font-w-500'>物流服务商</div>
                          <div>{item.actionDetails.company}</div>
                        </div>
                      </>
                      break;
                  }
                })()}
                  {/* <p>{12321312312}</p>
                  {item.children && item.children.map((childItem: historys) => (
                    // intl.formatMessage({ id: childItem.comments })
                    <p key={childItem.id}>{213213123213321}</p>
                  ))} */}
                </div>
              )}
            </div>
          </Timeline.Item>
        ))}
        {(!loading && remainingLogNumber>0) && <Timeline.Item dot={
          <div className="timeline-item-head"></div>
        }>
          <div className='color-356DFF font-w-500 cursor-pointer timeline-item-title' onClick={()=>getLogs()}>查看更多记录</div>
        </Timeline.Item>}
      </Timeline>}
    </Scoped>
    
  );
};

export default observer(OrdersTimeline);

const Scoped = styled.div`
  margin-top: 10px;
  .timeline-item-head{
    /* border: 2px solid transparent; */
    background: #356dff;
    border-radius: 100px;
    height: 12px;
    width: 12px;
    position: absolute;
    transform: translate(-50%, -50%);
  }
  .timeline-item-title{
    &:hover{
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
`