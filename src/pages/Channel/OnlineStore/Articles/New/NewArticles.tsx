import { ArrowLeftOutlined } from '@ant-design/icons'
import { App, Flex, Form } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import DefaultButton from '@/components/Button/DefaultButton';
import { observer } from 'mobx-react-lite';
import { createArticles } from '@/services/y2/api';
import { useSleep } from '@/hooks/customHooks';
import { useEffect, useState } from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';
import LangSelect from '@/components/Select/LangSelect';
import articles from '@/store/channel/articles/articles';
import PublishBlogCard from '../Articles/PublishBlogCard';
import ContentCard from '../Articles/ContentCard';
import TitleCard from '../Articles/TitleCard';
import TissueCard from '../Articles/TissueCard';
import CoverPictureCard from '../Articles/CoverPictureCard';
import SEOCard from '../Articles/SEOCard';
import ProtectionInformation from '../Articles/ProtectionInformation';
import ThirdPartyLink from '../Articles/ThirdPartyLink';
import ThemeTemplate from '../Articles/ThemeTemplate';

function NewArticles(){
    
    const { message } = App.useApp();

    const [loading,setLoading] = useState(false);
    const sleep = useSleep();

    const [form] = Form.useForm();
    const setLang = (lang:string)=>{
        articles.setArticles({
            ...articles.articles,
            languages_id:lang
        })
    }

    const submit = ()=>{
        form.validateFields().then(async values => {
            setLoading(true);
            createArticles(articles.articles).then(async res=>{
                await sleep(2000)
                message.success('创建成功')
                history.push('/website/articles')
            }).catch(err=>{
                message.error('创建失败')
            }).finally(()=>{
                setLoading(false)
            }) 
        })
    }

    useEffect(()=>{
        articles.reset()
    },[])

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push('/website/articles')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">创建博客</div>
                        </div>
                        <Flex className='mc-header-right' align='center' gap={12}>
                            {/* 语言 */}
                            <LangSelect lang={articles.articles.languages_id} setLang={setLang} />
                            <DefaultButton text='AI创建博客' />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <TitleCard form={form} />
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
                        <PrimaryButton loading={loading} onClick={submit} text='创建' />
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(NewArticles)

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
        }
    }
}
a{
  font-weight: 400
}
`