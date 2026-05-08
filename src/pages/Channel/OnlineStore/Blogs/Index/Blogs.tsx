import React, { useEffect, useState } from 'react';
import { history } from '@umijs/max';
import styled from 'styled-components';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { App, Flex } from 'antd';
import cookie from 'react-cookies';
import { ArrowLeftOutlined } from '@ant-design/icons';
import BlogsList from './BlogsList';
import { getArticleCategorys } from '@/services/y2/api';


function Blogs(){
    
    const { message } = App.useApp();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const languagesId = cookie.load("shop_lang") || '2';

    const [blogs,setBlogs] = useState({});

    useEffect(()=>{
        getArticleCategorys({
            page:"1",
            limit:"10",
            languages_id:languagesId,
        }).then(res=>{
            res.code == 0 && setBlogs({
                data:res.data,
                count:res.count
            });
        }).catch((err)=>{
            message.error(err?.msg);
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
                            <div className="create-title-left-secondary" onClick={()=>{
                                history.push('/website/articles')
                            }}>
                                <ArrowLeftOutlined />
                            </div>
                            <div className="create-title-left-content">博客集合</div>
                        </div>
                        <div className='create-title-right'>
                            <Flex gap={12}>
                                <PrimaryButton text="创建博客集合" onClick={()=>history.push("/website/blogs/new")} />
                            </Flex>
                        </div>
                    </div>
                    <div className='create-content'>
                       <BlogsList blogs={blogs} langId={languagesId} />
                    </div>
                </div>
            </div>}
        </Scoped>
        
    );
}

export default Blogs;


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
                display: flex;
                gap: 12px;
                align-content: center;
                &-secondary{
                    height: 32px;
                    width: 32px;
                    border: #d7dbe7 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    &:hover{
                        background-color:  #eaf0ff;
                        cursor: pointer;
                    }
                    &-icon {
                        font-size: 18px;
                    }
                }
                &-content {
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



