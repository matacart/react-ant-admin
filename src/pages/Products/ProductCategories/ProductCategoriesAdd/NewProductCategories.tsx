import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Drawer, Form, Input, message, Select } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import { useEffect, useState } from 'react';
import ThemeTemplateCard from '../../ProductAdd/ThemeTemplateCard';
import CategoriesInfo from './CategoriesInfo';
import SalesChannel from './SalesChannel';
import CategoriesCover from './CategoriesCover';
import CategoriesBanner from './CategoriesBanner';
import newCategories from '@/store/categories/newCategories';
import { addCategory } from '@/services/y2/api';
import NewSeo from './NewSeo';
import Relevance from './Relevance';
import CategoriesSettings from './CategoriesSettiings';
import Recommendation from './Recommendation';
import CategoriesSubnumber from './CategoriesSubnumber';


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

function NewProductCategories(){
    const [styleId, setStyleId] = useState('');
    
    const [btnLoading,setBtnLoading] = useState(false);

    // 复制
    useEffect(()=>{
        
    },[])
    // 实现 onSecondInputChange 函数
    const handleSecondInputChange = (value: string) => {
        setStyleId(value);
        console.log(value)
        // 初始化参数
    };
    return (
        <Scoped>
            <div className='mc-layout-wrap'>
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
                            <Select className='selector' defaultValue="更多" />
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <CategoriesInfo/>
                        </div>
                        <div className='mc-layout-extra'>
                            <CategoriesSettings />
                            {/* <SalesChannel /> */}
                            <CategoriesCover />
                            <CategoriesBanner />
                            <Recommendation />
                            <Relevance />
                            {/* <RelevanceEdit /> */}
                            <CategoriesSubnumber />
                            <NewSeo />
                            {/* <ThirdPartyInfoCard/> */}
                            <ThemeTemplateCard/>
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <Button type='primary' loading={btnLoading} onClick={async ()=>{
                            setBtnLoading(true);
                            // console.log(newCategories);
                            addCategory(newCategories).then(res=>{
                                if(res.code == 0){
                                    message.success('创建成功');
                                    setBtnLoading(false);
                                    history.push('/products/categories')
                                }
                            });
                        }}>创建</Button>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default NewProductCategories;

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