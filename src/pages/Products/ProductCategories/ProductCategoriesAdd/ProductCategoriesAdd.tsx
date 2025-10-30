import { ArrowLeftOutlined } from '@ant-design/icons'
import { Form, message, Select } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import { useEffect, useState } from 'react';
import CategoriesInfo from './CategoriesInfo';
import CategoriesCover from './CategoriesCover';
import CategoriesBanner from './CategoriesBanner';
import { setCategory } from '@/services/y2/api';
import NewSeo from './NewSeo';
import Relevance from './Relevance';
import CategoriesSettings from './CategoriesSettiings';
import Recommendation from './Recommendation';
import CategoriesSubnumber from './CategoriesSubnumber';
import PrimaryButton from '@/components/Button/PrimaryButton';
import categories from '@/store/product/categories';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import CategroiesMethod from './CategroiesMethod';
import RelatedProduct from './RelatedProduct';
import { observer } from 'mobx-react-lite';
import ProductScreeningConditions from './ProductScreeningConditions';
import LangSelect from '@/components/Select/LangSelect';


function NewProductCategories(){
    
    const [loading,setLoading] = useState(false);

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [form] = Form.useForm();

    // 选择语言
    const setLang = (lang:string)=>{
        categories.setCategoriesInfo({
            ...categories.categoriesInfo,
            languages_id:lang
        })
    }

    // 表单验证
    const formValidation = ()=>{
        return form.validateFields().then(res=>{
            return true
        }).catch(e=>{
            if (e.errorFields.length > 0) {
                form.scrollToField(e.errorFields[0].name[0],{ block:"center" });
            }
            return false
        })
    }

    // 验证通过 -- 创建
    const onFinish = async () => {
        if(await formValidation()){
            setLoading(true)
            setCategory({...categories.categoriesInfo}).then(res=>{
                message.success("已添加成功")
                history.push("/products/categories")
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                setLoading(false)
            })
        }   
    };

    // 清空状态
    const fetch = async ()=>{
        await categories.reset()
        setIsSkeleton(false)
    }
    useEffect(()=>{
        fetch()
    },[])
   
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
                            <div className="mc-header-left-content">添加分类</div>
                        </div>
                        <div className='mc-header-right'>
                            {/* 语言 */}
                            <LangSelect lang={categories.categoriesInfo.languages_id} setLang={setLang} />
                        </div>
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
                            <NewSeo />
                            <ThemeTemplateCard/>
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <PrimaryButton loading={loading} text="创建" onClick={onFinish} />
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default observer(NewProductCategories)

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