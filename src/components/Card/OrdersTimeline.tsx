import React, { ReactNode, useState } from 'react';
import { Timeline, Button, Collapse } from 'antd';
import { CaretDownOutlined, CaretRightOutlined, CheckCircleFilled, ClockCircleFilled, DownOutlined, ExclamationCircleFilled, SyncOutlined, UpOutlined } from '@ant-design/icons';

interface historyinfo {
  state: ReactNode;
  orders_id: string;
  pid: string;
  orders_status_id: string;
  time: string;
  comments: string;
  children?: historyinfo[];
}

const renderChildren = (children: historyinfo[], expandedItems: number[], handleExpand: (index: number) => void) => {
  return (
    <Timeline>
      {children.map((childItem, childIndex) => {
        const childExpandIcon = expandedItems.includes(childIndex) ? <CaretDownOutlined /> : <CaretRightOutlined />;
        return (
          <Timeline.Item key={childIndex}>
            <p onClick={() => handleExpand(childIndex)}>
              {childItem.orders_status_id} {childExpandIcon}
              <p style={{ fontSize: '12px', color: '#7A8499' }}>{childItem.time}</p>
              {expandedItems.includes(childIndex) && (
                <>
                  <p>{childItem.comments}</p>
                  {renderChildren(childItem.children || [], expandedItems, handleExpand)}
                </>
              )}
            </p>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

const OdersTimeline: React.FC<{ order: { historyinfo: historyinfo[] } }> = ({ order }) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [itemsToShow, setItemsToShow] = useState(4); // 初始只显示前四个数据项

  const handleExpand = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const handleLoadMore = () => {
    setItemsToShow(order.historyinfo.length); // 显示所有数据项
  };

  return (
    <Timeline>
      {(order.historyinfo || []).slice(0, itemsToShow).map((item: historyinfo, index: number) => {
        const ExpandIcon = expandedItems.includes(index) ? <CaretDownOutlined /> : <CaretRightOutlined />;
        return (
          <Timeline.Item key={index}>
            <p onClick={() => handleExpand(index)}>
              {item.orders_status_id} {ExpandIcon}
              <p style={{ fontSize: '12px', color: '#7A8499' }}>{item.time}</p>
              {expandedItems.includes(index) && (
                <>
                  <p>{item.comments}</p>
                  {item.children && renderChildren(item.children, expandedItems, handleExpand)}
                </>
              )}
            </p>
          </Timeline.Item>
        );
      })}
      {itemsToShow < order.historyinfo.length && (
        <Button type="link" onClick={handleLoadMore}>
          查看更多记录
        </Button>
      )}
    </Timeline>
  );
};

export default OdersTimeline;