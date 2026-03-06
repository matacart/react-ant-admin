import { ArrowLeftOutlined } from '@ant-design/icons'
import { Flex, Form, message } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history, useIntl, useParams } from '@umijs/max';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import LangSelect from '@/components/Select/LangSelect';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TitleCard from '../Blogs/TitleCard';
import SEOCard from '../Blogs/SEOCard';
import ThemeTemplate from '../Blogs/ThemeTemplate';
import CommentCard from '../Blogs/CommentCard';
import blogs from '@/store/channel/blogs/blogs';
import DeleteModal from '@/components/Modal/DeleteModal';
import DangerButton from '@/components/Button/DangerButton';
import { getArticleCategorysDetail, setArticleCategorys } from '@/services/y2/api';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';

function EditBlogs(){

    const intl = useIntl();

    const {id,languagesId} = useParams();

    const [loading,setLoading] = useState(false);

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [form] = Form.useForm();
    const setLang = (lang:string)=>{
        history.push(`/website/blogs/${id}/${lang}`)
    }

    const submit = ()=>{
       form.validateFields().then(values=>{
            setLoading(true);
            setArticleCategorys(blogs.blogs).then(res=>{
                res.code == 0 && message.success(intl.formatMessage({ id: 'components.message.success' }))
            }).catch(err=>{
                console.log(err);
            }).finally(()=>{
                setLoading(false);
            })
       }).catch(()=>{})
    }

    useEffect(()=>{
        // 获取博客集合
        getArticleCategorysDetail({
            id:id??"",
            languages_id:languagesId??"2"
        }).then(res=>{
            res.code == 0 && blogs.setBlogs({
                id: res.data.id,
                languages_id:res.data.languages_id,
                handle:res.data.handle,
                category_name:res.data.category_name,
                category_pid:res.data.pid,
                sort:res.data.sort,
                is_share:res.data.is_share,
                group_id:res.data.group_id,
                category_description:res.data.category_description,
                comment_mode:res.data.comment_mode,
                meta_title:res.data.meta_title,
                meta_keywords:res.data.meta_keywords,
                meta_description:res.data.meta_description,
                status:res.data.status,
                template_id:"0"
            })
        }).catch(err=>{
        }).finally(()=>{
            setIsSkeleton(false);
        });
        return () => {
            // 组件卸载时重置状态，避免内存泄漏
            blogs.reset();
        };
    },[languagesId])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push('/website/blogs')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">编辑博客集合</div>
                        </div>
                        <Flex className='mc-header-right' gap={12}>
                            {/* 语言 */}
                            <LangSelect lang={blogs.blogs.languages_id} setLang={setLang} />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <TitleCard form={form} />
                            <CommentCard form={form} />
                        </div>
                        <div className='mc-layout-extra'>
                            <SEOCard />
                            <ThemeTemplate />
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <PrimaryButton loading={loading} onClick={submit} text='更新' />
                        <DeleteModal tElement={
                            <DangerButton loading={loading} text="删除博客集合" />
                        }
                            removeFunc={()=>{
                                
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

export default observer(EditBlogs)

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
            justify-content: space-between;
        }
    }
}
`