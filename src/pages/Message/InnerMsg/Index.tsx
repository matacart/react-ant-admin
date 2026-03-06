import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import InnerMsgTable from './InnerMsgTable';
import { Tabs, TabsProps } from 'antd';
import SelectCard from './SelectCard';
import innerMsg from '@/store/message/innerMsg/innerMsg';
import { useIntl } from '@umijs/max';


function Index(){

    const [isSkeleton,setIsSkeleton] = useState(false);
    const intl = useIntl();

    const items: TabsProps['items'] = [
        {
            key: 'all',
            label: intl.formatMessage({ id: 'innerMsg.index.tabs.all' }),
            children: <InnerMsgTable />,
        },
        {
            key: 'system',
            label: intl.formatMessage({ id: 'innerMsg.index.tabs.system' }),
            children: <InnerMsgTable />,
        },
        {
            key: 'user',
            label: intl.formatMessage({ id: 'innerMsg.index.tabs.user' }),
            children: <InnerMsgTable />,
        },
        {
            key: 'app',
            label: intl.formatMessage({ id: 'innerMsg.index.tabs.app' }),
            children: <InnerMsgTable />,
        },
    ];

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='create-warp-flex'>
                <div className="create-warp">
                    <div className='create-title'>
                        <div className='create-title-left'>
                            <h3 style={{ position: 'relative', display: 'inline-block' }}>{intl.formatMessage({ id: 'innerMsg.index.title' })}</h3>
                        </div>
                    </div>
                    <div className='create-content'>
                        <SelectCard />
                        {/* type="card" */}
                        <Tabs style={{marginBottom:"20px"}} defaultActiveKey="all" destroyOnHidden={true} items={items} onChange={(key:string)=>{innerMsg.setMsgType(key)}} />
                    </div>
                </div>
            </div>}
        </Scoped>
        
    );
}

export default Index;


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
              margin-bottom: 20px;
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
            border-radius: 6px;
            background-color: #FFF;
            padding: 12px 24px;
            margin-bottom: 16px;
            .create-content-app-title{
                margin-bottom: 8px;
            }
            .create-content-app-btn{
                flex: 1;
                text-align: right;
            }
        }
    }
}
`;
