import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Flex, message, Select } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history, useParams } from '@umijs/max';
import DefaultButton from '@/components/Button/DefaultButton';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { delArticles, getArticle, upDateArticles } from '@/services/y2/api';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import DeleteModal from '@/components/Modal/DeleteModal';
import { useSleep } from '@/hooks/customHooks';
import cookie from 'react-cookies';
import TitleCard from '../Articles/TitleCard';
import ContentCard from '../Articles/ContentCard';
import PublishBlogCard from '../Articles/PublishBlogCard';
import TissueCard from '../Articles/TissueCard';
import CoverPictureCard from '../Articles/CoverPictureCard';
import ProtectionInformation from '../Articles/ProtectionInformation';
import ThirdPartyLink from '../Articles/ThirdPartyLink';
import SEOCard from '../Articles/SEOCard';
import ThemeTemplate from '../Articles/ThemeTemplate';
import articles from '@/store/channel/articles/articles';
import LangSelect from '@/components/Select/LangSelect';

function EditArticles(){

    const [isSkeleton,setIsSkeleton] = useState(true)

    const {id,languagesId} = useParams();

    const [language,setLanguage] = useState<string>(languagesId??"2");

    const sleep = useSleep()

    const setLang = (value:string)=>{
        setLanguage(value)
    }

    useEffect(()=>{
        getArticle(id,language).then((res:any)=>{
            if(res.code == 0){
                articles.setArticles(res.data)
                console.log(res)
            }
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[language])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push('/website/articles')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">{articles.articles.title}</div>
                        </div>
                        <Flex className='mc-header-right' align='center' gap={12}>
                            {/* 语言 */}
                            <LangSelect lang={language} setLang={setLang} />
                            <DefaultButton text='AI创建博客' />
                            <DefaultButton text='预览' onClick={()=>{
                                if(cookie.load("domain").domain_name && cookie.load("domain").domain_name!==""){
                                    window.open(`https://`+cookie.load("domain").domain_name+`/`+articles.articles.title.replace(/\s+/g, "-")+`-a`+articles.articles.id+`.html`)
                                }else{
                                    message.error("请先设置店铺")
                                }
                            }} />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <TitleCard />
                            <ContentCard />
                        </div>
                        <div className='mc-layout-extra'>
                            <PublishBlogCard />
                            <TissueCard />
                            <CoverPictureCard />
                            <SEOCard />
                            <ProtectionInformation />
                            <ThirdPartyLink />
                            <ThemeTemplate />
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <Button type='primary' onClick={async ()=>{
                            // console.log(articles.oldArticles.releaseTime)
                            upDateArticles(articles.articles).then(res=>{
                                message.success('已更新')
                            }).catch(err=>{
                                console.log(err)
                            })
                        }}>更新</Button>
                        <DeleteModal tElement={
                            <Button color="danger" variant="solid">删除</Button>
                        }
                        removeFunc={()=>{
                            delArticles(articles.articles.id).then(async res=>{
                                message.success('已删除')
                                await sleep(2000)
                                history.push('/website/articles')
                            }).catch(err=>{
                                console.log(err)
                            })
                        }}
                        title="确定删除吗？"
                        content="删除后将不能找回，请慎重操作！"
                        okText="完成"
                        />
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default observer(EditArticles)

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
                display: flex;
                flex-direction: row;
                align-items: center;
                &-secondary {
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
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
        }

        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }

        &-content {
            flex: 9;
            min-width: 510px;

            display: flex;
            flex-direction: column;
            gap:20px

        }

        &-extra {
            flex:1;
            min-width: 285px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .ant {
                &-card {
                    background-color: #f7f8fb;
                }
            }
        }
        .mc-footer{
            display:flex;
            flex-direction: row-reverse;
            justify-content: space-between;
        }
    }
}
a{
  font-weight: 400
}
`