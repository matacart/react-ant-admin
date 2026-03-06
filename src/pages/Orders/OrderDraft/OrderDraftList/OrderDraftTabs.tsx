import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { useIntl } from '@umijs/max';
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
  
  const intl = useIntl();
  const [items, setItems] = useState<TabsProps['items']>([
    {
      label: intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftTabs.all' }),
      key: '1',
      children: <OrderDraftCard />,
    },
    {
      label: intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftTabs.pending' }),
      key: '2',
      children: <OrderDraftCard />,
    },
    {
      label: intl.formatMessage({ id: 'orders.orderDraft.orderDraftList.orderDraftTabs.completed' }),
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