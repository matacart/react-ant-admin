import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Flex, Form } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import ProductInformationCard from '../GiftCardsProduct/ProductInformationCard';
import ProductImg from '../GiftCardsProduct/ProductImg';
import DenominationSettings from '../GiftCardsProduct/DenominationSettings';
import Relevance from '../GiftCardsProduct/Relevance';
import ProductSettingsCard from '../GiftCardsProduct/ProductSettingsCard';
import LangSelect from '@/components/Select/LangSelect';
import SEOCard from '../GiftCardsProduct/SEOCard';
import ThemeTemplateCard from '../GiftCardsProduct/ThemeTemplateCard';
import PrimaryButton from '@/components/Button/PrimaryButton';

function Index(){

    // 表单
    const [form] = Form.useForm();

    const setLang = ()=>{

    }

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push('/gift-cards/products')
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">创建礼品卡商品</div>
                        </div>
                        <Flex className='mc-header-right' align='center' gap={12}>
                            <LangSelect lang={"2"} setLang={setLang} />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            {/* <CommodityInformationCard /> */}
                            <ProductInformationCard form={form} />
                            <ProductImg form={form} />
                            <DenominationSettings form={form} />
                        </div>
                        <div className='mc-layout-extra'>
                            <Relevance form={form} />
                            <ProductSettingsCard form={form} />
                            <SEOCard />
                            <ThemeTemplateCard />
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <PrimaryButton text="创建" />
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default Index

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