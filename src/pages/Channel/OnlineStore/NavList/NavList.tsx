import React, { useEffect, useRef, useState } from 'react';
import { Flex } from 'antd';
import { history } from '@umijs/max';
import styled from 'styled-components';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import TableCard from './TableCard';
import { getNavList } from '@/services/y2/api';
import { useAbortController } from '@/hooks/customHooks';

function NavList(){

    const { createAbortController } = useAbortController();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [navData,setNavData] = useState<{count:string,list:any[]}>({
        count:"0",
        list:[]
    });

    // 初始化导航列表
    useEffect(()=>{
        const signal = createAbortController();
        getNavList({
            page:"1",
            limit:"10",
            languages_id:"2",
            pid:"0",
        },signal).then(res=>{
            if(res.code == 0){
                setNavData({
                    count:res.data.total || "0",
                    list:[...res.data.list]
                });
            }
        }).catch((err)=>{

        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='create-warp-flex'>
                <div className="create-warp">
                    <div className='create-title'>
                        <div className='create-title-left'>
                            <h3 style={{ position: 'relative', top: 0, display: 'inline-block' }}>菜单导航</h3>
                            <div className='font-14 color-474F5E'>你可以在此设置菜单，装修店铺顶部导航、页尾时，可手动关联对应的菜单。</div>
                        </div>
                        <div className='create-title-right'>
                            <Flex gap={12}>
                                <PrimaryButton text="创建导航" onClick={()=>history.push("/website/navList/add")} />
                            </Flex>
                        </div>
                    </div>
                    <div className='create-content'>
                        {/*  */}
                        <TableCard navData={navData} />
                    </div>
                </div>
            </div>}
        </Scoped>
        
    );
}

export default NavList;


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



