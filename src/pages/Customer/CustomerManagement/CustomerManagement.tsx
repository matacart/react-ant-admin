
import React, { useRef, useState } from 'react'
import { Button, Dropdown, Flex, Space } from 'antd';
import { Tabs } from 'antd'
import styled from 'styled-components'
import Icon, { ExportOutlined, ImportOutlined } from '@ant-design/icons'; 
import { history } from '@umijs/max';
import {useIntl, useModel } from '@umijs/max';
import { UnfoldIcon } from '@/components/Icons/Icons';
import ScreeningConditionCard from './ScreeningConditionCard';
import CustmoerListCard from '../Components/CustomerListCard';

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



export default function CustomerManagement() {

  const intl = useIntl();
  const aItems: MenuProps['items'] = [
    {
      key: '1',
      label:"本地导入",

    },
    {
      key: '2',
      label: "shopify表格导入",
    },
    {
      key: '3',
      label: "店铺搬迁导入",
    }
  ];


  return (
    <Scoped>
      <div className='create-warp-flex' style={{
        width: "100%"
      }}>
        <div className="create-warp">
          <div className='create-title'>
            <div className='create-title-left'>
              <h3 style={{
                position: 'relative',
                top: 10,
                display: 'inline-block',
              }}>客户</h3>
              <Flex style={{ position: 'relative', top: -44, left: 70 }}>
                <Dropdown menu={{ items: aItems }} trigger={['click']}>
                  <Flex className='cursor-pointer'>
                    <div style={{marginRight:"8px"}}><ImportOutlined /></div>
                    <Space>
                      导入
                    </Space>
                    <UnfoldIcon />
                  </Flex>
                </Dropdown>
                <Flex style={{marginLeft:"12px"}} className='cursor-pointer' onClick={()=>{}}>
                    <div style={{marginRight:"8px"}}><ExportOutlined /></div>
                    <div>导出</div>
                </Flex>
              </Flex>
            </div>
            <div className="button-container">
              <Button 
                onClick={() => {  }}
                style={{
                  backgroundColor: 'WHITE',
                  marginRight: '12px',
                  width: "90px", height: "36px", fontSize: "14px",
                }}>
                其他操作
              </Button>
              <Button 
                type="primary"
                onClick={() => { history.push('/customer/management/operate/add') }}
                style={{ height: "36px", fontSize: "14px" }}
              >
                添加客户
              </Button>
            </div>
          </div>
          <ScreeningConditionCard />
          <div style={{height:"20px"}}></div>
          <CustmoerListCard/>
        </div>
      </div>
    </Scoped>
  )

}

const Scoped = styled.div`
  .create-warp-flex {
    width: 80%;
    display: flex;
    justify-content: center;
    color: #474f5e;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  
    .create-warp {
      width: 80%;
      min-width: 500px;
      .create-title {
        padding-bottom: 0px;
        color: #474f5e;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        .create-title-left {
          display: inline-block;
          h3 {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            margin: 0 24px 24px 0;
            overflow: hidden;
            color: #242833;
            font-size: 24px;
            font-weight: 600;
            line-height: 32px;
          }
        }
        .button-container {
          display: inline-block;
          justify-content: space-between;
        }
      }
    }
  }
`
















