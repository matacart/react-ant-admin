import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Drawer, Flex, Form, FormInstance, Input, message, Select } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history, useSearchParams } from '@umijs/max';
import DefaultButton from '@/components/Button/DefaultButton';
import { observer } from 'mobx-react-lite';
import LangSelect from '@/pages/components/LangSelect';
import { addCustomerPage, createArticles, getCustomerPage } from '@/services/y2/api';
import { useSleep } from '@/hooks/customHooks';
import { useEffect, useRef, useState } from 'react';
import customPage from '@/store/channel/customPage/customPage';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import TitleCard from './TitleCard';
import ContentCard from './ContentCard';
import PublishPageCard from './PublishPageCard';
import SEOCard from './SEOCard';
import ThemeTemplate from './ThemeTemplate';

function EditPage(){

    const [loading,setLoading] = useState(false)

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams();

    const sleep = useSleep()

    const id = searchParams.get('id') ?? ""
    const langId = searchParams.get('langId') ?? "2"

    // 表单1
    const titleCardRef = useRef<FormInstance>(null);

    const setLang = (lang:string)=>{
        customPage.setOldCustomPage({
            ...customPage.oldCustomPage,
            languages_id:lang
        })
    }

    useEffect(()=>{
        getCustomerPage(id,langId).then(res=>{
            if(JSON.stringify(res.data) == "[]"){
                message.error('无权限')
                history.push('/website/page')
            }else{
                customPage.setOldCustomPage(res.data)
            }
                
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[])

    // 统一校验方法
    const validateAll = async () => {
        try {
            // 校验标题卡
            await titleCardRef.current?.validateFields();
            // 可添加其他表单组件的校验
            // await otherFormRef.current?.validateFields();
            // 全部校验通过后提交
            // console.log(customPage.oldCustomPage);
            setLoading(true)
            addCustomerPage(customPage.oldCustomPage).then(async res=>{
                // await sleep(2000)
                message.success('修改内容已更新')
                // history.push('/website/page')
            }).catch(err=>{
                message.error('更新失败')
            }).finally(()=>{
                setLoading(false)
            })
        } catch (error) {
            // console.error('Validation failed:', "表单验证未通过");
        }
    };
    


    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push('/website/page')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">{customPage.oldCustomPage.title}</div>
                        </div>
                        <Flex className='mc-header-right' gap={12}>
                            {/* 语言 */}
                            <LangSelect lang={customPage.oldCustomPage.languages_id} setLang={setLang} />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <TitleCard ref={titleCardRef} />
                            <ContentCard />
                        </div>
                        <div className='mc-layout-extra'>
                            <PublishPageCard />
                            <SEOCard />
                            <ThemeTemplate />
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <Button type='primary' loading={loading} onClick={()=>{validateAll()}}>更新</Button>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default observer(EditPage)

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: max(75%,1200px);
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