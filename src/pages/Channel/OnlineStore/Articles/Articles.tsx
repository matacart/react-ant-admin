import React, { useEffect, useState } from 'react';
import { history } from '@umijs/max';
import styled from 'styled-components';
import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import ArticlesListCard from './ArticlesListCard';
import { Flex } from 'antd';
import articlesList from '@/store/channel/articles/articlesList';
import cookie from 'react-cookies';


function Articles(){

    const [isSkeleton,setIsSkeleton] = useState(false);

    articlesList.setLanguagesId(cookie.load("shop_lang") || '2')

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='create-warp-flex'>
                <div className="create-warp">
                    <div className='create-title'>
                        <div className='create-title-left'>
                            <h3 style={{ position: 'relative', display: 'inline-block' }}>博客</h3>
                        </div>
                        <div className='create-title-right'>
                            <Flex gap={12}>
                                <DefaultButton text="管理博客评论" />
                                <DefaultButton text="管理博客集合" />
                                <PrimaryButton text="创建博客" onClick={()=>history.push("/website/articles/new")} />
                            </Flex>
                        </div>
                    </div>
                    <div className='create-content'>
                        <Flex className='create-content-app' justify='space-between' align='center' gap={12}>
                            <img style={{ width: "48px" }} src="https://cdn.myshopline.cn/sl/admin/ec2-admin-onlineshop/20250311110516973/imgs/easyRank.5de17.png" />
                            <div>
                                <div className='font-16 color-474F5E font-w-600 create-content-app-title'>使用EasyRank，AI创建博客</div>
                                <div className='font-14'>EasyRank集成GPT AI，通过GPT能高效智能的生成具有创意、符合SEO要求的博客文章，从而提高博客的搜索排名和自然流量。</div>
                            </div>
                            <div className='create-content-app-btn'>
                                <DefaultButton text="立即安装EasyRank" />
                            </div>
                        </Flex>
                        {/*  */}
                        <ArticlesListCard />
                    </div>
                </div>
            </div>}
        </Scoped>
        
    );
}

export default Articles;


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



