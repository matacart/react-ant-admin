import React, { useEffect, useRef, useState } from 'react';
import { history } from '@umijs/max';
import styled from 'styled-components';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { useSleep } from '@/hooks/customHooks';
import { TabsProps, Tabs } from 'antd';
import MyStylesCard from './MyStylesCard';
import StylesStoreCard from './StylesStoreCard';

function ShopSetting(){

    const [isSkeleton,setIsSkeleton] = useState(false)

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: <div className='font-16 color-242833'>我的主题</div>,
          children: <MyStylesCard />,
        },
        {
          key: '2',
          label: <div className='font-16 color-242833'>主题商城</div>,
          children: <StylesStoreCard />,
        }
    ];

    useEffect(()=>{
        // getNavList("1","10").then(res=>{
        //     setList(res.data)
        //     setCount(res.count)
        // }).catch((err)=>{

        // }).finally(()=>{
        //     setIsSkeleton(false)
        // })
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
                    <Tabs defaultActiveKey="1" items={items} />
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



