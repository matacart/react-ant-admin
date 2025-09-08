import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { TabsProps, Tabs } from 'antd';
import MyStylesCard from './MyStylesCard';
import StylesStoreCard from './StylesStoreCard';
import { getTemplateInstanceUsing, getTemplateMallList } from '@/services/y2/api';
import shopSetting from '@/store/channel/shopSetting/shopSetting';

function ShopSetting(){

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [activeTab, setActiveTab] = useState('1'); // 添加状态控制当前激活的标签页

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

    const fetchData = async ()=>{
      try{
        const [usingRes, mallRes] = await Promise.all([
          getTemplateInstanceUsing() as any,
          getTemplateMallList({
            page: 1,
            limit:10
          }) as any
        ]);

        shopSetting.setTemplateMallList(mallRes.data)
        shopSetting.setTemplateInstanceUsing(usingRes.data)


        if(usingRes.data.toString() !== "[]"){
          console.log(usingRes)
        }

      }catch(err){
        console.log("获取数据失败",err)
      }finally{
        setIsSkeleton(false)
      }
    }

    useEffect(()=>{
      fetchData()
    },[]);

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
                    <Tabs activeKey={activeTab} onChange={(activeKey:string)=>setActiveTab(activeKey)} items={items} />
                </div>
            </div>
        </div>}
    </Scoped>
    
  );
}

export default ShopSetting;


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



