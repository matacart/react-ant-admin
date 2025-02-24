
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
const onChange = (key: string) => {
  console.log(key);
};

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
export default function Index() {

  const intl = useIntl();
  const aItems: MenuProps['items'] = [
    {
      key: '1',
      label:intl.formatMessage({id:'orderlist.picking.list'}),
      onClick: handleLianHuoDanClick,
    },
    {
      key: '2',
      label: intl.formatMessage({id:'orderlist.shipping.list'}),
    },
    {
      key: '3',
      label: intl.formatMessage({id:'orderlist.order.detail'}),
    },
    {
      key: '4',
      label: intl.formatMessage({id:'orderlist.order.report'}),
    },
  ];


  return (
    <div>123</div>
   
//     <div className='create-warp-flex' style={{
//       width: "100%"
//     }}>
//       <div className="create-warp">
//         <div className='create-title'>
//           <div className='create-title-left'>
//             <h3 style={{
//               position: 'relative',
//               top: 10,
//               display: 'inline-block',
//             }}>{intl.formatMessage({ id:'order.draft.header'})}</h3>
//             <ImportOutlined style={{
//               position: 'relative',
//               top: -24,
//               left: -10,


//             }} />
//             <div style={{
//               position: 'relative',
//               top: -44,
//               left: 130,
//             }}>

//               <Dropdown menu={{ items: aItems }} >
//                 <a onClick={(e) => e.preventDefault()} style={{ color: '#242833' }}>
//                   <Space>
//                   {intl.formatMessage({ id:'order.import.draft'})}
//                   </Space>
//                 </a>
//               </Dropdown>
//             </div>
//           </div>
          
//           <div className='"button-container"'>
           


//           <Button type="primary"
//               onClick={() => { history.push('/orders/draftOrders/add') }}
//               style={{
//                 marginTop: "10px",
//                 width: "88px", height: "36px", fontSize: "16px",background:'#356DFF'

//               }}>
//                {intl.formatMessage({ id: 'order.button.createorder' })}
//             </Button>
          
   

          

//           </div>
          
//         </div>







        
//         <div className='create-content'>
       
//         <div  >
// //订单列表
// </div>
//        //
      
//         </div>
//       </div>
     
     





//     </div>

  )


}













function handleLianHuoDanClick(): void {
    throw new Error('Function not implemented.');
}

