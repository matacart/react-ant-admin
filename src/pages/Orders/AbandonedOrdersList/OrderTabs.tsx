import React, { useEffect, useState } from 'react';
import { Flex, Tabs, TabsProps, Tag } from 'antd';
import SelectCard from './SelectCard';
import OrderTable from './OrderTable';
import abandonedOrderList from '@/store/order/abandonedOrder/abandonedOrderList';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';


const OrderDraftCard = observer(() => {
  return(
    <Scoped>
      <div style={{marginBottom:"12px"}}>
        <SelectCard />
      </div>
      {/* 标签 */}
      <Flex className="condition-box" wrap gap={8} style={{marginTop:"12px",marginBottom:"12px"}}>
        {abandonedOrderList.keyword !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
          abandonedOrderList.setKeyword("")
        }}>
            <span className="color-474F5E font-14">
              关键字：{abandonedOrderList.keyword}
            </span>
        </Tag>}
      </Flex>
      {/* <Flex style={{margin:"160px 0"}} justify='center' align='center' vertical>
        <div>
          <img src="https://cdn.myshopline.cn/sl/admin/ec2-admin-order/20250424181143651/imgs/empty.ede02.png" />
        </div>
        <div style={{marginTop:"32px"}} className='font-20 font-w-600'>暂无数据</div>
      </Flex> */}
      <OrderTable />
    </Scoped>
  )
})

const Scoped = styled.div`
    
`

function OrderTabs() {
  
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
export default OrderTabs