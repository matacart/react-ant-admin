
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Tabs } from 'antd';
import { history } from '@umijs/max';
import CategoriesSelect from './CategoriesSelect';
import productList from '@/store/product/productList';
import styled from 'styled-components';
import PrimaryButton from '@/components/Button/PrimaryButton';
import categoriesList from '@/store/product/categoriesList';
import cookie from 'react-cookies';

const TabLabel = styled.div`
    font-size: 16px;
`;

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
const App: React.FC = () => {
  
  const initialItems = [
    {
      label: <TabLabel>全部</TabLabel>,
      children: (<CategoriesSelect/>),
      key: '1',
      closable: false,
    }
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    switch(newActiveKey){
      case '1':
        return productList.setFlag("");
      case '2':
        return productList.setFlag("1");
      case '3':
        return productList.setFlag("0");
      case '4':
        return productList.setFlag("2");
    }
  };

  const add = () => {
    setIsModalVisible(true);
  };
  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  // 
  categoriesList.setLanguagesId(cookie.load("shop_lang") || '2');

  return (
    <Scoped>
      <div className='create-container'>
        <div className='create-warp-flex' style={{ width: "100%" }}>
          <div className="create-warp">
            <div className='create-title'>
              <div className='create-title-left'>
                  <h3>分类</h3>
              </div>
              <div className='create-title-right'>
                <PrimaryButton onClick={() => { history.push('/products/categories/new') }} text='创建分类' />
              </div>
            </div>
            <div className='create-content'>
              <Tabs
                  type="editable-card"
                  onChange={onChange}
                  activeKey={activeKey}
                  onEdit={onEdit}
                  items={items}
                  // !默认不销毁
                  destroyInactiveTabPane
                  // tabBarExtraContent={operations}
              />
            </div>
          </div>
        </div>
      </div>
    </Scoped>
    
    
  );
}

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

export default App;

