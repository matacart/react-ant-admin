import React, { useEffect, useState } from 'react';
import { Timeline, Button, Flex } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import order from '@/store/order/order';

interface historys {
  id: string;
  orders_id: string;
  orders_status_id: string; // 国际化标识符
  pid: string;
  time: string;
  comments: string; // 国际化标识符
  children?: historys[];
}

const OrdersTimeline = () => {
  const intl = useIntl();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const handleExpand = (index: number) => {
    setExpandedItems(prevItems => {
      if (prevItems.includes(index)) {
        return prevItems.filter(item => item !== index);
      } else {
        return [...prevItems, index];
      }
    });
  };

  return (
    <Scoped>
      <Timeline>
        {(order.historyStatus || []).map((item: historys, index: number) => (
          <Timeline.Item key={index} dot={
            <div className="timeline-item-head"></div>
          }>
            <div onClick={() => handleExpand(index)}>
              <Flex className='timeline-item-title font-w-500'>您为3件商品安排了发货。{expandedItems.includes(index) ? <CaretDownOutlined className='font-10' /> : <CaretRightOutlined className='font-10' />}</Flex>
              <div className='font-12 color-7A8499'>2025-05-13 14:30</div>
              <p style={{ fontSize: '12px', color: '#7A8499' }}>{item.time}</p>
              {expandedItems.includes(index) && (
                <>
                  <p>{intl.formatMessage({ id: item.comments })}</p>
                  {item.children && item.children.map((childItem: historys) => (
                    <p key={childItem.id}>{intl.formatMessage({ id: childItem.comments })}</p>
                  ))}
                </>
              )}
            </div>
          </Timeline.Item>
        ))}
        {/* {itemsToShow < (orderStore.oldOrder.historys || []).length && (
          <Button type="link" onClick={handleLoadMore}>
            {intl.formatMessage({ id: 'app.order.timeline.load-more' })}
          </Button>
        )} */}
      </Timeline> 
    </Scoped>
    
  );
};

export default observer(OrdersTimeline);

const Scoped = styled.div`
  .timeline-item-head{
    /* border: 2px solid transparent; */
    background: #356dff;
    border-radius: 100px;
    height: 12px;
    position: absolute;
    top:-2px;
    width: 12px;
  }
  .timeline-item-title{
    &:hover{
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
`