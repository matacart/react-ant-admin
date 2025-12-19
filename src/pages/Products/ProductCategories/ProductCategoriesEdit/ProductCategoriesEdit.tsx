import { ArrowLeftOutlined } from '@ant-design/icons'
import { Flex, Form, message, Spin } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history, useParams } from '@umijs/max';
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { getCategory, setCategory } from '@/services/y2/api';
import DefaultButton from '@/components/Button/DefaultButton';
import categories from '@/store/product/categories';
import PrimaryButton from '@/components/Button/PrimaryButton';
import LangSelect from '@/components/Select/LangSelect';
import SEOCard from '../ProductCategories/SEOCard';
import CategroiesMethod from '../ProductCategories/CategroiesMethod';
import RelatedProduct from '../ProductCategories/RelatedProduct';
import CategoriesInfo from '../ProductCategories/CategoriesInfo';
import ProductScreeningConditions from '../ProductCategories/ProductScreeningConditions';
import CategoriesCover from '../ProductCategories/CategoriesCover';
import CategoriesSubnumber from '../ProductCategories/CategoriesSubnumber';
import Relevance from '../ProductCategories/Relevance';
import CategoriesSettings from '../ProductCategories/CategoriesSettings';
import CategoriesBanner from '../ProductCategories/CategoriesBanner';
import ThemeTemplateCard from '../ProductCategories/ThemeTemplateCard';
import Recommendation from '../ProductCategories/Recommendation';
// 表单项商品数据类型

function EditProductCategories(){

    // 预览域名
    const previewDomain = '.'+(JSON.parse(localStorage.getItem("MC_DATA_PLATFORM_INFO") || '{}')?.preview_domain || '');

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
                                if(cookie.load("domain").domain_primary && cookie.load("domain").domain_primary!==""){
                                    window.open(`https://${cookie.load("domain").domain_primary}/collections/${categories.categoriesInfo.handle}`)
                                }else if(cookie.load("domain").handle){
                                    window.open(`https://${cookie.load("domain").handle}${previewDomain}/collections/${categories.categoriesInfo.handle}`)
                                }else{
                                    message.error("店铺缺少handle")
                                }
                            }} />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <CategoriesInfo form={form} />
                            <CategroiesMethod />
                            {/*  */}
                            {categories.method == 0 && <RelatedProduct />}
                            {categories.method == 1 && <ProductScreeningConditions />}
                        </div>
                        <div className='mc-layout-extra'>
                            <Relevance />
                            <CategoriesSettings />
                            <CategoriesCover />
                            <CategoriesBanner />
                            <Recommendation />
                            <CategoriesSubnumber />
                            <SEOCard />
                            <ThemeTemplateCard/>
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <PrimaryButton loading={loading} text="更新" onClick={()=>{
                            setLoading(true)
                            setCategory({...categories.categoriesInfo}).then(res=>{
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