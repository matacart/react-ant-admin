import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { Divider, Form, Cascader, Input, Select, Space, Button, Dropdown, Tabs, Modal, Flex } from 'antd';
import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { history } from '@umijs/max';
import styled from 'styled-components';
import PrimaryButton from '@/components/Button/PrimaryButton';
import GiftCardsSelectCard from './GiftCardsSelectCard';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';

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

  const [isSkeleton, setIsSkeleton] = useState(true);

  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  
  const [items, setItems] = useState(initialItems);
  
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  useEffect(()=>{
    setIsSkeleton(false);
  },[]);

  return (
    <Scoped>
      {/* <BlankPage /> */}
      {isSkeleton?<SkeletonCard />:<div className='create-warp-flex' style={{ width: "100%" }}>
        <div className="create-warp">
          <div className='create-title'>
            <Flex className='create-title-left' align='center'>
              <h3>礼品卡</h3>
              <Flex align='center'>
                  <Flex>
                    <div style={{marginRight:"8px"}}><ImportOutlined /></div>
                    <div>导入</div>
                  </Flex>
                  <Flex style={{marginLeft:"12px"}}>
                    <div style={{marginRight:"8px"}}><ExportOutlined /></div>
                    <div>导出</div>
                  </Flex>
              </Flex>
            </Flex>
            <div className='create-title-right'>
              <PrimaryButton onClick={() => history.push('/gift-cards/new')} text='创建礼品卡' />
            </div>
          </div>
          <div className='create-content'>
            <Tabs
              type="card"
              onChange={onChange}
              activeKey={activeKey}
              items={items}
              // !默认不销毁
              destroyOnHidden
              // tabBarExtraContent={operations}
            />
          </div>
        </div>
      </div>}
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
        .create-title-left {
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
`