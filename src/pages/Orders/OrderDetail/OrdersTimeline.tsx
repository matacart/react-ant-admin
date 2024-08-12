import React, { useState } from 'react';
import { Timeline, Button } from 'antd';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';

interface historyinfo {
  id: string;
  orders_id: string;
  orders_status_id: string; // 国际化标识符
  pid: string;
  time: string;
  comments: string; // 国际化标识符
  children?: historyinfo[];
}

const OdersTimeline: React.FC<{ order: { historyinfo: historyinfo[] } }> = ({ order }) => {
  const intl = useIntl();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [itemsToShow, setItemsToShow] = useState(4);

  const handleExpand = (index: number) => {
    setExpandedItems(prevItems => {
      if (prevItems.includes(index)) {
        return prevItems.filter(item => item !== index);
      } else {
        return [...prevItems, index];
      }
    });
  };

  const handleLoadMore = () => {
    setItemsToShow(order.historyinfo.length);
  };

  return (
    <Timeline>
      {(order.historyinfo || []).slice(0, itemsToShow).map((item: historyinfo, index: number) => (
        <Timeline.Item key={index}>
          <p onClick={() => handleExpand(index)}>
            {intl.formatMessage({ id: item.orders_status_id })}
            {expandedItems.includes(index) ? <CaretDownOutlined /> : <CaretRightOutlined />}
            <p style={{ fontSize: '12px', color: '#7A8499' }}>{item.time}</p>
            {expandedItems.includes(index) && (
              <>
                <p>{intl.formatMessage({ id: item.comments })}</p>
                {item.children && item.children.map((childItem: historyinfo) => (
                  <p key={childItem.id}>{intl.formatMessage({ id: childItem.comments })}</p>
                ))}
              </>
            )}
          </p>
        </Timeline.Item>
      ))}
      {itemsToShow < order.historyinfo.length && (
        <Button type="link" onClick={handleLoadMore}>
          {intl.formatMessage({ id: 'app.order.timeline.load-more' })}
        </Button>
      )}
    </Timeline>
  );
};

export default OdersTimeline;