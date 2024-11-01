import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Drawer, Form, Input, message, Select } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import newStore from '@/store/newStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import CustomsDeclaration from './CustomsDeclaration';
import MultipleStylesCard from './MultipleStylesCard';
import PriceOrTransactionCard from './PriceOrTransactionCard';
import ProductDataCard from './ProductDataCard';
import ProductImgCard from './ProductImgCard';
import ProductSettingsCard from './ProductSettingsCard';
import ProductStyleList from './ProductStyleList';
import SEOCard from './SEOCard';
import StockCard from './StockCard';
import ThemeTemplateCard from './ThemeTemplateCard';
import ThirdPartyInfoCard from './ThirdPartyInfoCard';



function AddNewProduct(){
    const [styleId, setStyleId] = useState('');
  // 实现 onSecondInputChange 函数
  const handleSecondInputChange = (value: string) => {
    setStyleId(value);
};
    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push('/products/index')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">添加商品</div>
                        </div>
                        <div className='mc-header-right'>
                            <Select className='selector' defaultValue="更多" />
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <ProductDataCard />
                            <ProductImgCard />
                            <PriceOrTransactionCard />
                            <StockCard/>
                            <CustomsDeclaration/>
                            <MultipleStylesCard onSecondInputChange={handleSecondInputChange} />
                            {styleId && <ProductStyleList styleId={styleId} />}
                        </div>
                        <div className='mc-layout-extra'>
                            <ProductSettingsCard/>
                            <SEOCard/>
                            <ThirdPartyInfoCard/>
                            <ThemeTemplateCard/>
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <Button type='primary' onClick={()=>{
                            console.log(newStore)
                            // newStore.submitAddProduct()
                            //     .then(res=>{
                            //         if(res.code==0)message.success('okkk');
                            //         else message.error('noooo');
                            //         history.push('/products/index')
                            //     })
                            // ;
                        }}>创建</Button>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(AddNewProduct);

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
