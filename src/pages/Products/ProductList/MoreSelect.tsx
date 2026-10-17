import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Divider, Drawer, Flex, Radio, Tag } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useIntl } from '@umijs/max';
import styled from 'styled-components';
import DefaultButton from '@/components/Button/DefaultButton';
import NumberInput from '@/components/Input/NumberInput';
import CheckSelectSubmit from '@/components/Select/CheckSelectSubmit';
import { getPrecision } from '@/utils/common';
import { useSymbolLeft } from '@/hooks/customHooks';
import productList from '@/store/product/productList';
import { observer } from 'mobx-react-lite';
import MyButton from '@/components/Button/MyButton';

// 修改第20行状态声明
interface OptionType {
  value: string | number;
  label: string;
  checked: boolean;
}

function MoreSelect(){

  const Ref = React.useRef(null);
  const intl = useIntl();

  const [open, setOpen] = useState(false);
  // 条件
  const [condition, setCondition] = useState<{[key: string]: any}>();

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <div className='font-w-600 font-16'>价格区间</div>,
      children: (
        <div className='price-rang'>
          {/* <Flex>
            <NumberInput 
                className="input" 
                placeholder='最小值'
                min={0}
                value={min?min/amountRule:null}
                prefix={symbolLeft}
                precision={decimals}
                onChange={(value:number)=>{
                    value?setMin(Math.round(value*amountRule)):setMin(null)
                }}
            />
            <div className='divider-warp'><Divider className='divider'></Divider></div>
            <NumberInput 
                className="input"
                placeholder='最大值'
                prefix={symbolLeft}
                precision={decimals}
                min={0}
                value={max?max/amountRule:null}
                onChange={(value:number)=>{
                  value?setMax(Math.round(value*amountRule)):setMax(null)
                }}
            />
          </Flex> */}
          <div className={'cleanText'} onClick={()=>{
          }}>清除</div>
        </div>
      ),
    },
    {
      key: '2',
      label: <div className='font-w-600 font-16'>商品类型</div>,
      children: (
      <>
        {/* <CheckSelectSubmit options={productTypeOption} setOptions={setProductTypeOption} placeholder="商品类型" style={{width:"100%",height:"36px"}}/>
        <Flex wrap gap={8} style={{marginTop:"12px"}}>
          {productTypeOption.map((item:OptionType)=>{
            if(item.checked){
              return (
                <Tag style={{padding:"4px 10px",marginRight:0}} color="processing" bordered={false} closable onClose={()=>{
                    setProductTypeOption(prev =>{
                      return prev.map((i:OptionType)=> i.value === item.value ? { ...i, checked: false } : i)
                    })
                }}>
                  <span className="color-474F5E font-14">
                    {item.label}
                  </span>
                </Tag>
              )
            }
          })}
        </Flex> */}
        <div className={'cleanText'} onClick={()=>{
        }}>清除</div>
      </>)
      ,
    },
    {
      key: '3',
      label: <div className='font-w-600 font-16'>自定义商品类型</div>,
      children: (
        <>
        {/* <CustomizeProductTypeSelector/> */}
        <div className={'cleanText'}>清除</div>
        </>
      ),
    },
    {
      key: '4',
      label: <div className='font-w-600 font-16'>商品状态</div>,
      children: (
        <>
        {/* <CustomizeProductTypeSelector/> */}
        <div className={'cleanText'}>清除</div>
        </>
      ),
    },
    {
      key: '5',
      label: <div className='font-w-600 font-16'>礼品卡</div>,
      children: (
        <>
        {/* <CustomizeProductTypeSelector/> */}
        <div className={'cleanText'}>清除</div>
        </>
      ),
    },
    {
      key: '6',
      label: <div className='font-w-600 font-16'>销售渠道</div>,
      children: (
        <>
        {/* <CustomizeProductTypeSelector/> */}
        <div className={'cleanText'}>清除</div>
        </>
      ),
    },
    {
      key: '7',
      label: <div className='font-w-600 font-16'>商品创建时间</div>,
      children: (
        <>
        {/* <CustomizeProductTypeSelector/> */}
        <div className={'cleanText'}>清除</div>
        </>
      ),
    },
    {
      key: '8',
      label: <div className='font-w-600 font-16'>商品更新时间</div>,
      children: (
        <>
        {/* <CustomizeProductTypeSelector/> */}
        <div className={'cleanText'}>清除</div>
        </>
      ),
    },
    {
      key: '9',
      label: <div className='font-w-600 font-16'>店铺</div>,
      children: (
        <>
          <Radio.Group
            value={condition?.saleStoreHandles??1}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
            options={[
              { value: 0, label: "其它店铺" },
              { value: 1, label: intl.formatMessage({ id: 'orders.orderList.ordersMoreSelect.currentShop' }) },
            ]}
            onChange={(e)=>{
              setCondition({...condition,saleStoreHandles:e.target.value})
            }}
          />
          <div className={'cleanText'} onClick={()=>{
            setCondition({...condition,saleStoreHandles:null})
            }}
          />
          <div className={'cleanText'}>清除</div>
        </>
      ),
    },
  ];

  const init = () => {
    setOpen(true);
    setCondition(productList.condition)
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    productList.setCondition({...condition})
    setOpen(false);
  };

  const Footed = () => {
    return (
      <Flex justify="flex-end" style={{padding:"12px 0"}} gap={12}>
        <MyButton onClick={onClose} type="default" text="取消" />
        <MyButton onClick={onSubmit} type="primary" text="保存" />
      </Flex>
    )
  }

  return (
    <Scoped ref={Ref}>
      <DefaultButton text={"更多筛选"} onClick={init} />
      <Drawer getContainer={()=>Ref.current!} title={<div className="font-20">筛选</div>} styles={{body:{padding:"8px"}}} footer={<Footed/>} closeIcon={false} onClose={onClose} open={open}>
        <ConfigProvider 
          theme={{
            token: {
              /* 这里是你的全局 token */
              // paddingLG:8
            },
          }}
        >
          <Collapse
            expandIconPosition={'end'} 
            ghost
            items={items}
          />
        </ConfigProvider>
      </Drawer>
    </Scoped>
  );
};


export default observer(MoreSelect);

const Scoped = styled.div`
  .cleanText{
    margin-top: 10px;
    color: #7a8499;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: inline-block;
  }

  .price-rang{
    .input{
      flex: 1;
      width: 100%;
      height: 36px;
      line-height: 36px;
    }
    .divider-warp{
      margin: 0 8px;
      display: flex;
      align-items: center;
      .divider{
          width: 12px;
          margin: 0;
          background-color: #d7dbe7;
      }
    }
  }
`;
