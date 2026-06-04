import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Form, Input, Space, Dropdown, Tabs, Modal, Flex } from 'antd';
import { history } from '@umijs/max';
import styled from 'styled-components';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { observer } from 'mobx-react-lite';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const Index = () => {

  const initialItems = [
    {
      label: <TabLabel>全部</TabLabel>,
      children: (<></>),
      key: '1',
      closable: false,
    },
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  useEffect(()=>{
  },[]);

  return (
    <Scoped>
      <div className='create-warp-flex' style={{ width: "100%" }}>
        <div className="create-warp">
          <div className='create-title'>
            <Flex className='create-title-left' align='center'>
                <h3>商品</h3>
            </Flex>
            <div className='create-title-right'>
              <PrimaryButton onClick={() => history.push('/gift-cards/products/new')} text='创建商品' />
            </div>
          </div>
          <div className='create-content'>
            <Tabs
              type="card"
              onChange={onChange}
              activeKey={activeKey}
              items={items}
              // tabBarExtraContent={operations}
            />
          </div>
        </div>
      </div>
    </Scoped>
  );
}

export default observer(Index);

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
          position: relative;
          padding: 5px 24px;
          border-radius: 6px;
          width: 100%;
          background-color: white;
          
      }
    }
  }
`