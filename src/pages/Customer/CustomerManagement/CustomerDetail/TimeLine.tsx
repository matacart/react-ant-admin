import React, { useEffect, useState } from 'react';
import { Timeline, Button, Flex } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import { getOrderLogs } from '@/services/y2/api';

const TimeLine = () => {

  const intl = useIntl();

  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const [orderLog, setOrderLog] = useState<any[]>([
   
  ]);

  const [remainingLogNumber,setRemainingLogNumber] = useState<number>(5);

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
   
  }

  useEffect(() => {
  }, []);


  return (
    <Scoped>
      {true && <Timeline pending={loading}>
        {orderLog.map((item: any, index: number) => (
          <Timeline.Item key={index} dot={
            <div className="timeline-item-head"></div>
          }>
            <div onClick={() => handleExpand(index)}>
              <Flex className='timeline-item-title font-w-500'>
              1
              </Flex>
              {/* <div className='font-12 color-7A8499'>{dayjs(item.operationTime*1000).format("YYYY-MM-DD HH:mm")}</div> */}
              {expandedItems.includes(index) && (
                <div className='font-12' style={{marginTop:"12px"}}>
                 123
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

export default observer(TimeLine);

const Scoped = styled.div`
  margin-top: 10px;
  .timeline-item-head{
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