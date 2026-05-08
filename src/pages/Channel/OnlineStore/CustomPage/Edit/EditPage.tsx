import { ArrowLeftOutlined } from '@ant-design/icons'
import { App, Flex, Form } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history, useSearchParams } from '@umijs/max';
import { observer } from 'mobx-react-lite';
import { addCustomerPage, getCustomerPage } from '@/services/y2/api';
import { useEffect, useState } from 'react';
import customPage from '@/store/channel/customPage/customPage';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import LangSelect from '@/components/Select/LangSelect';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TitleCard from '../Custompage/TitleCard';
import PublishPageCard from '../Custompage/PublishPageCard';
import ContentCard from '../Custompage/ContentCard';
import SEOCard from '../Custompage/SEOCard';
import ThemeTemplate from '../Custompage/ThemeTemplate';

function EditPage(){
    
    const { message } = App.useApp();

    const [searchParams, setSearchParams] = useSearchParams();

    const id = searchParams.get('id') ?? ""
    const langId = searchParams.get('langId') ?? "2"

    const [loading,setLoading] = useState(false);

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [form] = Form.useForm();

    // 语言切换
    const setLang = (lang:string)=>{
        setSearchParams({ id, langId: lang });
    }

    useEffect(()=>{
        getCustomerPage(id,langId).then(res=>{
            if(res.code == 0){
                customPage.setCustomPage(res.data)
            }
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[langId])


    const submit = ()=>{
        form.validateFields().then(values => {
            setLoading(true);
            addCustomerPage(customPage.customPage).then(res=>{
                res.code == 0 && message.success('修改内容已更新')
            }).catch(err=>{
                message.error('更新失败')
            }).finally(()=>{
                setLoading(false)
            })
        }).catch((errorInfo) => {
        });
    }

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
                            <div className="mc-header-left-content">{customPage.customPage.title}</div>
                        </div>
                        <Flex className='mc-header-right' gap={12}>
                            {/* 语言 */}
                            <LangSelect lang={langId} setLang={setLang} />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <TitleCard form={form} />
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
                        <PrimaryButton loading={loading} onClick={submit} text="保存" />
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