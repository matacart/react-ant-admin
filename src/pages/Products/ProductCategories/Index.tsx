

// function Index() {
//     return(
//         <>Index</>
//     )
// }

// export default Index;

import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { Divider, Form, Cascader, Input, Select, Space, Button, Dropdown, Tabs, Modal } from 'antd';
import './index.scss';
import { ShopTwoTone, GlobalOutlined, NodeIndexOutlined, PayCircleOutlined, MailTwoTone, PhoneTwoTone, DownOutlined } from '@ant-design/icons';
import { ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { history } from '@umijs/max';
import ProductsSelectCard from '@/components/Card/ProductsSelectCard';
import styled from 'styled-components';
import newStore from '@/store/newStore';
import { Switch } from 'antd/lib';
import { setFlag } from 'mobx/dist/internal';
import oldStore from '@/store/oldStore';
import CategoriesSelect from './CategoriesSelect';
import { reset } from '@/services/y2/api';
import newCategories from '@/store/categories/newCategories';
import editCategories from '@/store/categories/editCategories';
import globalStore from '@/store/globalStore';

const TabLabel = styled.div`
    font-size: 16px;
`;



type TargetKey = React.MouseEvent | React.KeyboardEvent | string;



const App: React.FC = () => {
  // const [activeKey, setActiveKey] = useState("1");
  
  // const [language,setLanguage] = useState(2);
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
  const newTabIndex = useRef(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTabName, setNewTabName] = useState('');
  
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    switch(newActiveKey){
      case '1':
        return newStore.setFlag("");
      case '2':
        return newStore.setFlag("1");
      case '3':
        return newStore.setFlag("0");
      case '4':
        return newStore.setFlag("2");
    }
  };

  // const switchLanguages = (value: number) => {
  //   // productStore.setLanguage(value);
  //   // setLanguage(value);
  //   // console.log(productStore.language);
  // };
  // let [languagesData,setlanguagesData] = useState([]);
  // const operations = <Select
  //   defaultValue={2}
  //   style={{ width: 120 }}
  //   onChange={switchLanguages}
  //   options={languagesData}
  // />;

  

  
  
  // const [position, setPosition] = useState<PositionType[]>(['left', 'right']);
  // const slot = useMemo(() => {
  //   if (position.length === 0) {
  //     return null;
  //   }
  //   return position.reduce(
  //     (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
  //     {},
  //   );
  // }, [position]);

  

  const add = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (newTabName.trim() === '') {
      return;
    }

    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: <TabLabel>{newTabName}</TabLabel>,
      children: <ProductsSelectCard key={newActiveKey} />,
      key: newActiveKey,
      closable: true
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
    setIsModalVisible(false);
    setNewTabName('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewTabName('');
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

  useEffect(()=>{
    // console.log(1111)
    // 重新渲染初始化状态
    newCategories.reset();
    editCategories.reset();
    globalStore.setCategoryList([]);
  },[]);

  return (
    <div className='create-container'>
        <div className='create-warp-flex' style={{ width: "100%" }}>
            <div className="create-warp">
                <div className='create-title'>
                    <div className='create-title-left'>
                        <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>分类</h3>
                    </div>
                    <div className='create-title-right'>
                        <Button type="primary" onClick={() => { history.push('/products/categories/new') }} style={{ marginTop: "10px", width: "88px", height: "36px", fontSize: "16px" }}>创建分类</Button>
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
    
  );
}

export default App;

