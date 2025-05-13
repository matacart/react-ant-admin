import React, { createContext, useEffect, useMemo, useRef, useState } from 'react';
import { Divider, Form, Cascader, Input, Select, Space, Button, Dropdown, Tabs, Modal, Flex } from 'antd';
import { ShopTwoTone, GlobalOutlined, NodeIndexOutlined, PayCircleOutlined, MailTwoTone, PhoneTwoTone, DownOutlined } from '@ant-design/icons';
import { ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { history } from '@umijs/max';
import ProductsSelectCard from '@/components/Card/ProductsSelectCard';
import styled from 'styled-components';
import newStore from '@/store/newStore';
import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import BlankPage from './BlankPage';
import { getArticleList, getCustomerPageList } from '@/services/y2/api';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import CustomPageListCard from './CustomPageListCard';

function CustomPage(){

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [customerPageList,setCustomerPageList] = useState([])

    const [count,setCount] = useState(0)

    useEffect(()=>{
        getCustomerPageList("1","10").then(res=>{
            setCustomerPageList(res.data)
            setCount(res.count)
        }).catch((err)=>{

        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[]);

  return (
    <Scoped>
        {isSkeleton?<SkeletonCard />:<div className='create-warp-flex'>
            <div className="create-warp">
                <div className='create-title'>
                    <div className='create-title-left'>
                        <h3 style={{ position: 'relative', display: 'inline-block' }}>自定义页面</h3>
                    </div>
                    <div className='create-title-right'>
                        <Flex gap={12}>
                            <PrimaryButton text="创建页面" onClick={()=>history.push("/website/page/new")} />
                        </Flex>
                    </div>
                </div>
                <div className='create-content'>
                    {/*  */}
                    {customerPageList.length == 0?<BlankPage />:<CustomPageListCard list={customerPageList} count={count} />}
                    
                </div>
            </div>
        </div>}
    </Scoped>
    
  );
}

export default CustomPage;


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
              /* margin: 0 24px 24px 0; */
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
            .create-content-app{
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
}
`;



