import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Drawer, Flex, Form, FormInstance, Input, message, Select } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history } from '@umijs/max';
import articles from "@/store/channel/website/articles";
import { observer } from 'mobx-react-lite';
import { createArticles } from '@/services/y2/api';
import { useSleep } from '@/hooks/customHooks';
import { useEffect, useRef, useState } from 'react';
import { ExportIcon } from '@/components/Icons/Icons';
import PrimaryButton from '@/components/Button/PrimaryButton';
import ShopWebsiteCard from './ShopWebsiteCard';
import ShopAuthorizationCard from './ShopAuthorizationCard';

function Migrate(){

    const [loading,setLoading] = useState(false)

    const sleep = useSleep()
    

    const submit = async ()=>{
        setLoading(true)
        await sleep(2000)
        message.error("导入失败")
        setLoading(false)
    }
    
    useEffect(()=>{
        articles.resetNewArticles()
    },[])

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
                            <div className="mc-header-left-content">
                                一键导入Shopify商品
                                <a className='font-14 font-w-500' style={{marginLeft:"12px"}}>如何解决 <ExportIcon className='font-14' /></a>
                            </div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <ShopWebsiteCard />
                            <ShopAuthorizationCard />
                        </div>
                    </div>
                    <div className='mc-footer'>
                        <PrimaryButton text='马上导入' loading={loading} onClick={submit} />
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(Migrate)

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
            .mc-layout-content{
                width: 100%;
            }
        }
       
        .mc-footer{
            margin-top: 20px;
            display:flex;
            flex-direction: row-reverse;
        }
    }
}
`