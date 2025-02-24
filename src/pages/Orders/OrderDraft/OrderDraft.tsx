
import React, { useRef, useState } from 'react'
import { Button, Dropdown, Flex, Space } from 'antd';
import { Tabs } from 'antd'
import type {  TabsProps } from 'antd'
import OrdersSelectCard from '@/components/Card/OrdersSelectCard'
import './index.scss'
import styled from 'styled-components'
import Icon, { ImportOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
const TabLabel = styled.div`
   font-size: 18px;
`

interface MenuItem {  
  key: string;  
  label: React.ReactNode;  
  onClick?: () => void; // 可选的点击事件处理函数  
}  
  
interface MenuProps {  
  items: MenuItem[];  
}  
  
const MenuComponent: React.FC<MenuProps> = ({ items }) => {  
  // 假设你有一个已有的函数或组件，这里我们模拟一个函数  
  const handleLianHuoDanClick = () => {  
    // 这里可以调用已有的组件或执行任何逻辑  
    console.log('练货单被点击了');  
    // 例如，你可以控制一个状态来显示Popup组件  
  };  
  
  // 你可以在这里预处理items，为特定的项添加事件处理函数，但通常直接在渲染时处理更简单  
  
  return (  
    <div>  
      {items.map(item => (  
        <div key={item.key} onClick={item.onClick}>  
          {item.label}  
        </div>  
      ))}  
      {/* 如果有需要，你可以在这里根据状态渲染Popup组件 */}  
    </div>  
  );  
};  


import {useIntl, useModel } from '@umijs/max';
export default function OrderDraft() {

//   const intl = useIntl();
//   const aItems: MenuProps['items'] = [
//     {
//       key: '1',
//       label:intl.formatMessage({id:'orderlist.picking.list'}),
//       onClick: handleLianHuoDanClick,
//     },
//     {
//       key: '2',
//       label: intl.formatMessage({id:'orderlist.shipping.list'}),
//     },
//     {
//       key: '3',
//       label: intl.formatMessage({id:'orderlist.order.detail'}),
//     },
//     {
//       key: '4',
//       label: intl.formatMessage({id:'orderlist.order.report'}),
//     },
//   ];


  return (
    <div>123</div>
  )
}









function handleLianHuoDanClick(): void {
    throw new Error('Function not implemented.');
}

