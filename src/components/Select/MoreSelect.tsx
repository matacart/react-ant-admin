import React, { useState } from 'react';
import { Button, ConfigProvider } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
// import  Collapse  from './Collapse';
import Drawer from '../Drawer/Drawer';
import PriceRangeSelector from './PriceRangeSelector';
import PriceRangeInput from '../Input/PriceRangeInput';
import './MoreSelect.scss'

import CustomizeProductTypeSelector from './CustomizeProductTypeSelector';
import ProductTypeSelector from './ProductTypeSelector';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;




const items: CollapseProps['items'] = [
  {
    key: '1',
    label: '价格区间',
    children: (
      <div>
        <PriceRangeInput />
        <div className={'cleanText'}>清除</div>
      </div>
    ),
  },
  {
    key: '2',
    label: '商品类型',
    children: (
    <>
      <ProductTypeSelector/>
      <div className={'cleanText'}>清除</div>
    </>)
    ,
  },
  {
    key: '3',
    label: '自定义商品类型',
    children: (
      <>
      <CustomizeProductTypeSelector/>
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },{
    key: '4',
    label: '商品状态',
    children: (
      <>
      <CustomizeProductTypeSelector/>
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },{
    key: '5',
    label: '自定义商品类型',
    children: (
      <>
      <CustomizeProductTypeSelector/>
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },{
    key: '6',
    label: '自定义商品类型',
    children: (
      <>
      <CustomizeProductTypeSelector/>
      <div className={'cleanText'}>清除</div>
      </>
    ),
  },
];

  

export default function MoreSelect(){

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button size='large' onClick={showDrawer}  >
        更多筛选
      </Button>
      <Drawer title='筛选' open={open} onClose={onClose} >
        <ConfigProvider 
          theme={{
            components:{
              Collapse:{
                headerPadding: '12px 40px 12px 16px',
                contentPadding: '0 40px 0 16px',
                headerBg: ''
              }
            }
          }}
        >
          <Collapse style={{
              color: '#242833',
              lineHeight: 1.5715,
              fontSize: "16px",
              fontWeight: 500,
              paddingBlock: 0,
          }} expandIconPosition={'end'} 
          defaultActiveKey={['1']} ghost 
          items={items}
          size='small'
          />
        </ConfigProvider>
      </Drawer>
    </>
  );
};
