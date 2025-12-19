import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Form, Input, Space, Dropdown, Tabs, Modal, Flex } from 'antd';
import { ExportOutlined, ImportOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { history } from '@umijs/max';
import styled from 'styled-components';
import productStore from '@/store/productStore';
import { UnfoldIcon } from '@/components/Icons/Icons';
import PrimaryButton from '@/components/Button/PrimaryButton';
import productList from '@/store/product/productList';
import ImportProductModal from './ImportProductModal';
import ImportShopifyModal from './ImportShopifyModal';
import MyAlert from '@/components/Alert/MyAlert';
import { observer } from 'mobx-react-lite';
import ProductCard from './ProductCard';
import ExportProductModal from './ExportProductModal';
import cookie from 'react-cookies';


type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const App: React.FC = () => {

  const aItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <ImportProductModal />
      ),
    },
    {
      key: '2',
      label: (
        <ImportShopifyModal />
        
      )
    },
    {
      key: '3',
      label: <a onClick={()=>history.push("migrate")}>Shopify一键搬家</a>,
    },
  ];

  const initialItems = [
    {
      label: <TabLabel>全部</TabLabel>,
      children: (<ProductCard/>),
      key: '1',
      closable: false,
    },
    {
      label: <TabLabel>已上架</TabLabel>,
      children:  (<ProductCard/>),
      key: '2',
      closable: false,
    },
    {
      label: <TabLabel>已下架</TabLabel>,
      children:  (<ProductCard/>),
      key: '3',
      closable: false,
    },
    {
      label: <TabLabel>已存档</TabLabel>,
      children:  (<ProductCard/>),
      key: '4',
      closable: false,
    },
    {
      label: <TabLabel>已精选</TabLabel>,
      children:  (<ProductCard/>),
      key: '5',
      closable: false,
    },
    {
      label: <TabLabel>已托管</TabLabel>,
      children:  (<ProductCard/>),
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
      productList.setFlag("")
      productList.setIsAlliance("1")
      productList.setIsHosted("")
    }else if(newActiveKey == "6"){
      productList.setFlag("")
      productList.setIsAlliance("")
      productList.setIsHosted("1")
    }else{
      productList.setIsAlliance("0")
      productList.setIsHosted("0")
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
      children: <ProductCard key={newActiveKey} />,
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
    productList.setLanguagesId(cookie.load("shop_lang") || '2');
    // 重新渲染初始化状态
    productList.setFlag("");
    productList.setIsAlliance("");
    productList.setIsHosted("");
    productList.setAllSelected(false)
    productList.setProductList([]);
  },[]);

  return (
    <Scoped>
      <div className='create-warp-flex' style={{ width: "100%" }}>
        <div className="create-warp">
          <div className='create-title'>
            <Flex className='create-title-left' align='center'>
              <h3>商品</h3>
              <Flex align='center'>
                <Dropdown menu={{ items: aItems }} trigger={['click']}>
                  <Flex className='cursor-pointer'>
                    <div style={{marginRight:"8px"}}><ImportOutlined /></div>
                    <Space>
                      导入
                    </Space>
                    <UnfoldIcon />
                  </Flex>
                </Dropdown>
                <ExportProductModal />
              </Flex>
            </Flex>
            <div className='create-title-right'>
              <PrimaryButton onClick={() => { history.push('/products/new') }} text='创建商品' />
            </div>
          </div>
          {(productList.task.status == "done" && productList.task.isBackstage) && <div style={{marginBottom:"10px"}}>
            <MyAlert type="info" showIcon closable onClose={()=>{
              productList.setTask({
                status:""
              })
            }} message={<>系统正在后台处理数据中，您可以在批量处理进度中查看进度。<a onClick={()=>{history.push('/analyse/batch')}}>查看<ExportOutlined style={{position:"relative",left:"6px"}} /></a></>} />
          </div>}
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
      {/*  */}
      {/* <Outlet /> */}
    </Scoped>
  );
}

export default observer(App);

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