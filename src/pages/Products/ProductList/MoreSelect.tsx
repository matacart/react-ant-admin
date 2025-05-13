import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Divider, Drawer, Flex, Tag } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
// import  Collapse  from './Collapse';
import { useIntl } from '@umijs/max';
import styled from 'styled-components';
import DefaultButton from '@/components/Button/DefaultButton';
import NumberInput from '@/components/Input/NumberInput';
import cookie from 'react-cookies';
import SelectCheckBox from '@/components/Select/SelectCheckBox';
import CheckSelectClear from '@/components/Select/CheckSelectClear';
import CheckSelectSubmit from '@/components/Select/CheckSelectSubmit';
import { getPlatformCategorySelect } from '@/services/y2/api';

// 修改第20行状态声明
interface OptionType {
  value: string | number;
  label: string;
  checked: boolean;
}

export default function MoreSelect(){

  const Ref = React.useRef(null);
  const intl = useIntl();
  const [open, setOpen] = useState(false);

  const [min,setMin] = useState<number | undefined>(undefined);

  const [max,setMax] = useState<number | undefined>(undefined);

  const [productTypeOption,setProductTypeOption] = useState<OptionType[]>([])

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <div className='font-w-600 font-16'>价格区间</div>,
      children: (
        <div className='price-rang'>
          <Flex>
            <NumberInput 
                className="input" 
                placeholder='最小值'
                min={0}
                value={min}
                prefix={cookie.load("symbolLeft")}
                onChange={(value:number | undefined)=>{
                    setMin(value)
                }}
            />
            <div className='divider-warp'><Divider className='divider'></Divider></div>
            <NumberInput 
                className="input"
                placeholder='最大值'
                prefix={cookie.load("symbolLeft")}
                min={0}
                value={max}
                onChange={(value:number | undefined)=>{
                    setMax(value)
                }}
            />
          </Flex>
          <div className={'cleanText'} onClick={()=>{
            setMin(undefined)
            setMax(undefined)
          }}>清除</div>
        </div>
      ),
    },
    {
      key: '2',
      label: <div className='font-w-600 font-16'>商品类型</div>,
      children: (
      <>
        <CheckSelectSubmit options={productTypeOption} setOptions={setProductTypeOption} placeholder="商品类型" style={{width:"100%",height:"36px"}}/>
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
        </Flex>
        <div className={'cleanText'} onClick={()=>{
          setProductTypeOption(prev => 
            prev.map(item => ({ ...item, checked: false }))
          );
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
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  useEffect(()=>{
    // 平台类型 --- 平台多语言
    getPlatformCategorySelect("2").then(res=>{
      const newProductTypeOption = res.data.map(item=>{
        return {
          value: item.id,
          label: item.category_name,
          checked:false
        }
      })
      setProductTypeOption(newProductTypeOption)
    })
  },[])


  const Footed = () => {
    return (
      <Flex justify="flex-end" style={{padding:"12px 0"}}>
        <div>
          <Button style={{marginRight:"12px"}}>取消</Button>
          <Button type="primary">保存</Button>
        </div>
      </Flex>
    )
  }

  return (
    <Scoped ref={Ref}>
      <DefaultButton text={intl.formatMessage({ id:'order.button.moreselect'})} onClick={()=>setOpen(true)} />
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
            // size='small'
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
