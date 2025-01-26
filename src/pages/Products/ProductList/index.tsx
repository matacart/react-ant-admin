import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { Divider, Form, Cascader, Input, Select, Space, Button, Dropdown, Tabs, Modal } from 'antd';
import { ImportOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { history } from '@umijs/max';
import styled from 'styled-components';
import newStore from '@/store/newStore';
import productStore from '@/store/productStore';
import ProductsSelectCard from './ProductsSelectCard';



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
      children: (<ProductsSelectCard/>),
      key: '1',
      closable: false,
    },
    {
      label: <TabLabel>已上架</TabLabel>,
      children:  (<ProductsSelectCard/>),
      key: '2',
      closable: false,
    },
    {
      label: <TabLabel>已下架</TabLabel>,
      children:  (<ProductsSelectCard/>),
      key: '3',
      closable: false,
    },
    {
      label: <TabLabel>已存档</TabLabel>,
      children:  (<ProductsSelectCard/>),
      key: '4',
      closable: false,
    },
    {
      label: <TabLabel>已精选</TabLabel>,
      children:  (<ProductsSelectCard/>),
      key: '5',
      closable: false,
    },
    {
      label: <TabLabel>已托管</TabLabel>,
      children:  (<ProductsSelectCard/>),
      key: '6',
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
    if(newActiveKey == "5"){
      newStore.setFlag("")
      newStore.setIsAlliance("1")
      newStore.setIsHosted("")
    }else if(newActiveKey == "6"){
      newStore.setFlag("")
      newStore.setIsAlliance("")
      newStore.setIsHosted("1")
    }else{
      newStore.setIsAlliance("0")
      newStore.setIsHosted("0")
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
    }
  };
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
    // 重新渲染初始化状态
    newStore.setFlag("");
    newStore.setIsAlliance("");
    newStore.setIsHosted("");
    productStore.setAttributes([]);
  },[]);

  return (
    <Scoped>
      <div className='create-warp-flex' style={{ width: "100%" }}>
        <div className="create-warp">
          <div className='create-title'>
            <div className='create-title-left'>
              <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>商品</h3>
              <ImportOutlined style={{ position: 'relative', top: -24, left: -10 }} />
              <div style={{ position: 'relative', top: -44, left: 83 }}>
                <Dropdown menu={{ items: aItems }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      导入商品
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className='create-title-right'>
              <Button type="primary" onClick={() => { history.push('/products/new') }} style={{ marginTop: "10px", width: "88px", height: "36px", fontSize: "16px" }}>创建商品</Button>
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
        <Modal
          title="创建选项卡"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form.Item label="选项卡名称" style={{ marginBottom: '16px' }}>
            <Input
              value={newTabName}
              onChange={(e) => setNewTabName(e.target.value)}
              placeholder="请输入选项卡名称"
            />
          </Form.Item>
        </Modal>
      </div>
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