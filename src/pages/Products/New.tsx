import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Drawer, Form, Input, message, Select } from 'antd'
import ProductDataCard from '@/components/Card/ProductDataCard';
import ProductImgCard from '@/components/Card/ProductImgCard';
import PriceOrTransactionCard from '@/components/Card/PriceOrTransactionCard';
import StockCard from '@/components/Card/StockCard';
import CustomsDeclaration from '@/components/Card/CustomsDeclaration';
import MultipleStylesCard from '@/components/Card/MultipleStylesCard';
import styled from 'styled-components';
import ProductSettingsCard from '@/components/Card/ProductSettingsCard';
import SEOCard from '@/components/Card/SEOCard';
import ThirdPartyInfoCard from '@/components/Card/ThirdPartyInfoCard';
import ThemeTemplateCard from '@/components/Card/ThemeTemplateCard';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import newStore from '@/store/newStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import ProductStyleList from '@/components/Card/ProductStyleList';



function New(){


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
                            <MultipleStylesCard/>
                            <ProductStyleList/>
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
                            newStore.submitAddProduct()
                                .then(res=>{
                                    if(res.code==0)message.success('okkk');
                                    else message.error('noooo');
                                    history.push('/products/index')
                                })
                            ;
                        }}>创建</Button>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(New);

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
