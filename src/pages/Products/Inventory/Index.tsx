import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { Divider, Form, Cascader, Input, Select, Space, Button, Dropdown, Tabs, Modal, Flex } from 'antd';
import { ShopTwoTone, GlobalOutlined, NodeIndexOutlined, PayCircleOutlined, MailTwoTone, PhoneTwoTone, DownOutlined, ExportOutlined } from '@ant-design/icons';
import { ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import ProductsSelectCard from '@/components/Card/ProductsSelectCard';
import styled from 'styled-components';
import { UnfoldIcon } from '@/components/Icons/Icons';
import ExportProductModal from '../ProductList/ExportProductModal';
import ProductCard from './ProductCard';
const TabLabel = styled.div`
    font-size: 16px;
`;

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

function Index(){
  const initialItems = [
    {
      label: <TabLabel>全部</TabLabel>,
      children: (<ProductCard />),
      key: '1',
      closable: false,
    }
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  

  useEffect(()=>{
    // 重新渲染初始化状态
    
  },[]);

  return (
    <Scoped>
        <div className='create-warp-flex' style={{ width: "100%" }}>
          <div className="create-warp">
            <div className='create-title'>
              <Flex className='create-title-left'>
                <h3>库存</h3>
                <Flex className='cursor-pointer'>
                  <div style={{marginRight:"6px"}}><ImportOutlined /></div>
                  <Space>导入</Space>
                </Flex>
                <Flex className='cursor-pointer' style={{marginLeft:"12px"}}>
                  <div style={{marginRight:"6px"}}><ExportOutlined /></div>
                  <Space>导出</Space>
                </Flex>
              </Flex>
              <div className='create-title-right'>
                {/* <Select></Select> */}
              </div>
            </div>
            <div className='create-content'>
              <Tabs
                type="editable-card"
                activeKey={activeKey}
                items={items}
                destroyInactiveTabPane
              />
            </div>
          </div>
        </div>
    </Scoped>
    
  );
}

export default Index;


const Scoped = styled.div`
.create-warp-flex{
    width: 100%;
    display: flex;
    justify-content: center;
    color: #474f5e;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    .create-warp{
        width: 100%;
        min-width: 500px;
        .create-title{
          color: #474f5e;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-content: center;
          margin-bottom: 20px;
          .create-title-left{
            h3 {
              color: #242833;
              font-size: 24px;
              font-weight: 600;
              margin:0;
              margin-right: 16px;
            }
          }
          .create-title-right{
            display: inline-block;
          }
        }
        .create-content{
            padding: 5px 24px;
            border-radius: 6px;
            width: 100%;
            background-color: white;
            
        }
    }
}





`;



