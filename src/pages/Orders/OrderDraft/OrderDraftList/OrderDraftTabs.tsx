import React, { useEffect, useState } from 'react';
import { Tabs, Button, Modal, Tag, Input, Flex, TabsProps } from 'antd';
import OrdersDraftListAjax from './OrdersDraftListAjax';
import OrdersDraftSelectCard from './OrdersDraftSelectCard';


function OrderDraftCard() {
  return(
    <>
      <div>
        <OrdersDraftSelectCard />
      </div>
      <div>
        {/* 标签 */}
      </div>
      <OrdersDraftListAjax />
    </>
  )
}

function OrderDraftTabs() {
  
  const [items, setItems] = useState<TabsProps['items']>([
    {
      label: '全部',
      key: '1',
      children: <OrderDraftCard />,
    },
    {
      label: '未结',
      key: '2',
      children: <OrderDraftCard />,
    },
    {
      label: '已完成',
      key: '3',
      children: <OrderDraftCard />,
    },
  ]);

  return (
    <>
      <Tabs
        type="card"
        items={items}
      />
    </>
  );
}
export default OrderDraftTabs