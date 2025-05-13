import React, { useEffect, useState } from 'react';
import { Tabs, Button, Modal, Tag, Input, Flex, TabsProps } from 'antd';
import RecallOrdersSelectCard from './RecallOrdersSelectCard';


function OrderDraftCard() {
  return(
    <>
      <div>
        <RecallOrdersSelectCard />
      </div>
      <div>
        {/* 标签 */}
      </div>
      <Flex style={{margin:"160px 0"}} justify='center' align='center' vertical>
        <div>
          <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-order/20250424181143651/imgs/empty.ede02.png" />
        </div>
        <div style={{marginTop:"32px"}} className='font-20 font-w-600'>暂无数据</div>
      </Flex>
      {/* <OrdersDraftListAjax /> */}
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
      label: '今日新弃单',
      key: '2',
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