import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { Divider, Form, Cascader, Input, Select, Space, Button, Dropdown, Tabs, Modal, Flex } from 'antd';
import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { history } from '@umijs/max';
import styled from 'styled-components';
import newStore from '@/store/newStore';
import productStore from '@/store/productStore';
import { Outlet } from 'react-router-dom';
import GiftCardsSelectCard from './GiftCardsSelectCard';
import { ExportIcon } from '@/components/Icons/Icons';



const aItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>本地导入</>
      ),
    },
    {
      key: '2',
      label: (
        <>Shopify表格导入
        </>
      )
    },
    {
      key: '3',
      label: (
        <>Shopify一键搬家
        </>
      ),
    },
];

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;



type PositionType = 'left' | 'right';

// const OperationsSlot: Record<PositionType, React.ReactNode> = {
//   left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
//   right: <Button>Right Extra Action</Button>,
// };

const App: React.FC = () => {
  const initialItems = [
    {
      label: <TabLabel>全部</TabLabel>,
      children: (<GiftCardsSelectCard/>),
      key: '1',
      closable: false,
    },
    {
      label: <TabLabel>可兑换</TabLabel>,
      children:  (<GiftCardsSelectCard/>),
      key: '2',
      closable: false,
    },
    {
      label: <TabLabel>满余额</TabLabel>,
      children:  (<GiftCardsSelectCard/>),
      key: '3',
      closable: false,
    },
    {
      label: <TabLabel>部分余额</TabLabel>,
      children:  (<GiftCardsSelectCard/>),
      key: '4',
      closable: false,
    },
    {
      label: <TabLabel>无余额</TabLabel>,
      children:  (<GiftCardsSelectCard/>),
      key: '5',
      closable: false,
    },
    {
      label: <TabLabel>已禁用</TabLabel>,
      children:  (<GiftCardsSelectCard/>),
      key: '6',
      closable: false,
    }
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  
  const [items, setItems] = useState(initialItems);
  
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    // if(newActiveKey == "5"){
    
    // }else if(newActiveKey == "6"){
     
    // }else{
    //   switch(newActiveKey){
    //     case '1':
    //       return newStore.setFlag("");
    //     case '2':
    //       return newStore.setFlag("1");
    //     case '3':
    //       return newStore.setFlag("0");
    //     case '4':
    //       return newStore.setFlag("2");
    //   }
    // }
  };

  useEffect(()=>{
    // 重新渲染初始化状态
   
  },[]);

  return (
    <Scoped>
      <div className='create-warp-flex' style={{ width: "100%" }}>
        <div className="create-warp">
          <div className='create-title'>
            <div className='create-title-left'>
                <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>礼品卡</h3>
                <Flex style={{ position: 'relative', top: -44, left: 93 }}>
                    <Flex>
                        <div style={{marginRight:"8px"}}><ImportOutlined /></div>
                        <div>导入</div>
                    </Flex>
                    <Flex style={{marginLeft:"12px"}}>
                        <div style={{marginRight:"8px"}}><ExportOutlined /></div>
                        <div>导出</div>
                    </Flex>
                </Flex>
            </div>
            <div className='create-title-right'>
              <Button type="primary" onClick={() => { history.push('/products/gift-cards/new') }} style={{ marginTop: "10px", height: "36px", fontSize: "14px" }}>创建礼品卡</Button>
            </div>
          </div>
          <div className='create-content'>
            <Tabs
              type="card"
              onChange={onChange}
              activeKey={activeKey}
              items={items}
              // !默认不销毁
              destroyInactiveTabPane
              // tabBarExtraContent={operations}
            />
          </div>
        </div>
      </div>
      <Outlet />
    </Scoped>
  );
}

export default App;

const TabLabel = styled.div`
    font-size: 16px;
`;

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
          padding-bottom: 0px;
          color: #474f5e;
          font-size: 14px;
          line-height: 20px;
          display: flex;
          justify-content: space-between;
          align-content: center;
        .create-title-left{
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
        .create-title-right{
          display: inline-block;

        }

      }
      .create-content{
          position: relative;
          top: -10px;
          padding: 5px 24px;
          border-radius: 6px;
          width: 100%;
          background-color: white;
          
      }
    }
  }
`