import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { TabsProps, Tabs } from 'antd';
import MyStylesCard from './MyStylesCard';
import StylesStoreCard from './StylesStoreCard';
import { getTemplateMallList } from '@/services/y2/api';
import shopSetting from '@/store/channel/shopSetting/shopSetting';
import LangSelect from '@/components/Select/LangSelect';
import cookie from 'react-cookies';
import { observer } from 'mobx-react-lite';
import { useAbortController } from '@/hooks/customHooks';


function ShopSetting(){

  const [isSkeleton,setIsSkeleton] = useState(true);

  const [activeTab, setActiveTab] = useState('1'); // 添加状态控制当前激活的标签页

  const { createAbortController } = useAbortController();

  const items: TabsProps['items'] = [
      {
        key: '1',
        label: <div className='font-16 color-242833'>我的模板</div>,
        children: <MyStylesCard onSwitchToStore={() => {
          setActiveTab('2');
        }} />,
      },
      {
        key: '2',
        label: <div className='font-16 color-242833'>模板商城</div>,
        children: <StylesStoreCard />,
      }
  ];

  useEffect(()=>{
    // 默认语言
    shopSetting.setLanguagesId(cookie.load("shop_lang") || '2');
    // 创建 AbortController 信号
    const signal = createAbortController();
    getTemplateMallList({
      page: 1,
      limit:10,
    },signal).then((res:any)=>{
      if(res.code == 0){
        shopSetting.setTemplateMallList(res.data)
      }
    }).catch(err=>{
      if (err.name !== 'CanceledError') {
        console.log(err)
      }
    }).finally(()=>{
      setIsSkeleton(false)
    })
  },[]);

  const setLang = (value:string)=>{
    shopSetting.setLanguagesId(value);
  }

  return (
    <Scoped>
        {isSkeleton?<SkeletonCard />:<div className='create-warp-flex'>
            <div className="create-warp">
                <div className='create-title'>
                    <div className='create-title-left'>
                      <h3>店铺设计</h3>
                    </div>
                </div>
                <div className='create-content'>
                  <Tabs activeKey={activeTab} onChange={(activeKey:string)=>setActiveTab(activeKey)} items={items} tabBarExtraContent={<LangSelect lang={shopSetting.languagesId} setLang={setLang} />} />
                </div>
            </div>
        </div>}
    </Scoped>
  );
}

export default observer(ShopSetting);


const Scoped = styled.div`
.create-warp-flex{
    width: 100%;
    max-width: max(75%,1200px);
    margin: auto;
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
              margin-bottom: 4px;
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
            margin-top: 24px;
        }
    }
}
`;



