import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Drawer, Form, Input, message, Select, Spin } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import { useEffect, useState } from 'react';
import SEOCard from '../../ProductAdd/SEOCard';
import ThirdPartyInfoCard from '../../ProductAdd/ThirdPartyInfoCard';
import ThemeTemplateCard from '../../ProductAdd/ThemeTemplateCard';
import CategoriesInfo from './CategoriesInfo';
import SalesChannel from './SalesChannel';
import CategoriesCover from './CategoriesCover';
import CategoriesBanner from './CategoriesBanner';
import { getCategoryDetail, upCategory } from '@/services/y2/api';
import newCategories from '@/store/categories/newCategories';
import editCategories from '@/store/categories/editCategories';
import { observer } from 'mobx-react-lite';
import EditSeo from './EditSeo';




// 表单项商品数据类型
interface DataType {
    key: React.Key;
    imgUrl?: string;
    product_image?: string;
    title?: string;
    content?: string;
    price?: number;
    costPrice?: number;
    ISBN?: string;
    inventory?: number;
    HSCode?:string;
    notion?: string;
    model?: string;
    state?: boolean;
    tag?: string;
    productid:string;
    languages_id:string
}

interface LocationState {
    copyProduct:DataType;
    copyProductImage?: boolean;
    copyProductInventory?: boolean;
    radioValue?:number;
    // 可以根据实际需求添加其他字段
}

function EditProductCategories(){
    const [styleId, setStyleId] = useState('');


    const [isLoading,setIsLoading] = useState(false);
    const categories = history.location.state;

    // 复制
    useEffect(()=>{
        // console.log(categories)
        getCategoryDetail(categories).then(res=>{
            console.log(res)
            editCategories.setId(res.data.id)
            editCategories.setCategoryPid(res.data.pid)
            editCategories.setCategoriesData(res.data)
            editCategories.setTitle(res.data.title)
            editCategories.setContent(res.data.content)
            editCategories.setCoverImg(res.data.category_image)

            editCategories.setMetaTitle(res.data.meta_title)
            editCategories.setMetaKeyword(res.data.meta_keyword)
            editCategories.setMetaDescription(res.data.meta_description)

        })
    },[])
    // 实现 onSecondInputChange 函数
    const handleSecondInputChange = (value: string) => {
        setStyleId(value);
        console.log(value)
        // 初始化参数
    };
    return (
        <Scoped>
            <Spin spinning={isLoading}>
            {editCategories.title!==""&& <div className='mc-layout-wrap'>
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
                        <div className='mc-header-right'>
                            <Button style={{height:"36px"}}>预览</Button>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <CategoriesInfo/>
                        </div>
                        <div className='mc-layout-extra'>
                            <SalesChannel />
                            <EditSeo />
                            <CategoriesCover />
                            <CategoriesBanner />
                            {/* <ThirdPartyInfoCard/> */}
                            <ThemeTemplateCard/>
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <Button type='primary' onClick={async ()=>{
                            console.log(editCategories);
                            setIsLoading(true)
                            upCategory(editCategories).then(res=>{
                                console.log(res)
                                if(res.code==0){
                                    setIsLoading(false)
                                    message.success('更新成功')
                                }else{
                                    message.error('noooo');
                                }
                            })
                        }}>更新</Button>
                    </div>
                </div>
            </div>}
            </Spin>
        </Scoped>
    )
}

export default observer(EditProductCategories);

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
                width: 70px;
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