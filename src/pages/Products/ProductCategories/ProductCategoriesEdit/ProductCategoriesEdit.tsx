import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Flex, Form, message, Select, Spin } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history, useParams } from '@umijs/max';
import { useEffect, useState } from 'react';
import CategoriesInfo from './CategoriesInfo';
import CategoriesCover from './CategoriesCover';
import CategoriesBanner from './CategoriesBanner';
import cookie from 'react-cookies';
import RelevanceEdit from './RelevanceEdit';
import RecommendationEdit from './RecommendationEdit';
import CategoriesSettingsEdit from './CategoriesSettingsEdit';
import CategoriesSubnumber from './CategoriesSubnumber';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { getCategory, setCategory } from '@/services/y2/api';
import DefaultButton from '@/components/Button/DefaultButton';
import categories from '@/store/product/categories';
import PrimaryButton from '@/components/Button/PrimaryButton';
import LangSelect from '@/components/Select/LangSelect';
import SEOCard from '../ProductCategories/SEOCard';
// 表单项商品数据类型

function EditProductCategories(){

    const {id,languageId} = useParams();

    const [loading,setLoading] = useState(false);

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [languagesId,setLanguagesId] = useState<string>(languageId && languageId!=='undefined' ? languageId : "2");

    const [form] = Form.useForm();

    useEffect(()=>{
        getCategory(id??"",languagesId).then(res=>{
            categories.setCategoriesInfo(res.data)
        }).catch(err=>{
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[languagesId])
   
    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push('/products/categories')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">编辑分类</div>
                        </div>
                        <Flex className='mc-header-right' gap={8}>
                            <LangSelect lang={languagesId} setLang={(value:string)=>setLanguagesId(value)} />
                            <DefaultButton text="预览" onClick={()=>{
                                if(cookie.load("domain").domainName && cookie.load("domain").domainName!==""){
                                    window.open(`https://`+cookie.load("domain").domainName+`/`+categories.categoriesInfo.title.replace(new RegExp(" ","gm"),"-")+`-c`+categories.categoriesInfo.id+`.html`)
                                }else{
                                message.error("找不到店铺名称，请刷新")
                                }
                            }} />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <CategoriesInfo form={form} />
                        </div>
                        <div className='mc-layout-extra'>
                            <RelevanceEdit />
                            <CategoriesSettingsEdit />
                            <CategoriesCover />
                            <CategoriesBanner />
                            <RecommendationEdit />
                            <CategoriesSubnumber />
                            <SEOCard />
                            {/* <ThirdPartyInfoCard/> */}
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <PrimaryButton loading={loading} text="更新" onClick={()=>{
                            setLoading(true)
                            setCategory({...categories.categoriesInfo}).then(res=>{
                                console.log(res)
                                message.success("修改内容已更新")
                            }).catch(err=>{
                                console.log(err)
                            }).finally(()=>{
                                setLoading(false)
                            })
                        }} />
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default EditProductCategories

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
    
            &-right {
                display: flex;
                align-items: center;
                > .selector{
                    height: 36px;
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