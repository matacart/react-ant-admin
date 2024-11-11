import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { Divider, Form, Cascader, Input, Select, Space, Button, Dropdown, Tabs, Modal } from 'antd';
import './index.scss';
import { ShopTwoTone, GlobalOutlined, NodeIndexOutlined, PayCircleOutlined, MailTwoTone, PhoneTwoTone, DownOutlined } from '@ant-design/icons';
import { ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { history } from '@umijs/max';
import ProductsSelectCard from '@/components/Card/ProductsSelectCard';
import productStore from '@/store/productStore';
import { autorun } from 'mobx';
import styled from 'styled-components';
import { get } from 'lodash';
import { getLanguages } from '@/services/y2/api';

const TabLabel = styled.div`
    font-size: 16px;
`;

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

  // const [language,setLanguage] = useState(2);
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
    }
  ];

  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTabName, setNewTabName] = useState('');

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
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
      children: <ProductsSelectCard />,
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

  // useEffect(()=>{
  //   let temp:any = []
    
  //   getLanguages().then((res)=>{
  //     // console.log(res.data);
  //     res.data.forEach((item:any)=>{
  //       temp.push({
  //         value: item.id,
  //         label: item.name
  //       })
  //       })
  //     })
  //     console.log(temp);
  //     // setlanguagesData(temp)
  // }]);

  return (
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
            // tabBarExtraContent={operations}
          />
        </div>
      </div>
      {/* <div style={{display:"none"}}>
        <ProductsSelectCard  lang={language}></ProductsSelectCard>
      </div> */}

      {/* Modal for adding new tab */}
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
  );
}

export default App;

