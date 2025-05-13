import React, { useState } from 'react';
import { ConfigProvider, Divider } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
// import  Collapse  from './Collapse';
import Drawer from '../Drawer/Drawer';
import { useIntl } from '@umijs/max';
import styled from 'styled-components';
import DefaultButton from '../Button/DefaultButton';
import NumberInput from '../Input/NumberInput';
import cookie from 'react-cookies';

export default function MoreSelect(){
  const intl = useIntl();
  const [open, setOpen] = useState(false);

  const [min,setMin] = useState(0);

  const [max,setMax] = useState(0);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '价格区间',
      children: (
        <div>
          <NumberInput 
                className="input" 
                placeholder='最小值'
                min={0}
                value={min}
                prefix={cookie.load("symbolLeft") || ""}
                onChange={(value:number)=>{
                    setMin(value)
                }}
            />
            <div className='divider-warp'><Divider className='divider'></Divider></div>
            <NumberInput 
                className="input"
                placeholder='最大值'
                prefix={cookie.load("symbolLeft") || ""}
                min={0}
                value={max}
                onChange={(value:number)=>{
                    setMax(value)
                }}
            />
          <div className={'cleanText'}>清除</div>
        </div>
      ),
    },
    {
      key: '2',
      label: '商品类型',
      children: (
      <>
        <div className={'cleanText'}>清除</div>
      </>)
      ,
    },
    {
      key: '3',
      label: '自定义商品类型',
      children: (
        <>
        <div className={'cleanText'}>清除</div>
        </>
      ),
    },{
      key: '4',
      label: '商品状态',
      children: (
        <>
        <div className={'cleanText'}>清除</div>
        </>
      ),
    },{
      key: '5',
      label: '自定义商品类型',
      children: (
        <>
        <div className={'cleanText'}>清除</div>
        </>
      ),
    },{
      key: '6',
      label: '自定义商品类型',
      children: (
        <>
        <div className={'cleanText'}>清除</div>
        </>
      ),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Scoped>
      <DefaultButton text={intl.formatMessage({ id:'order.button.moreselect'})} onClick={showDrawer} />
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
    </Scoped>
  );
};


const Scoped = styled.div`
  .cleanText{
    margin-top: 10px;
    color: #7a8499;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
  }
`;
