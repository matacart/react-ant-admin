import React from 'react';
import type { CollapseProps, ProgressProps } from 'antd';
import { Button, Collapse, ConfigProvider, Progress, Space } from 'antd';
import { ShopOutlined,CheckCircleFilled ,ShopTwoTone} from '@ant-design/icons';
import { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useIntl } from '@umijs/max';

// 改为使用相对路径（会基于 publicPath 解析）
const assetPaths = {
    addProductDone: 'icons/commons/addProductDone.svg',
    setupLogisticsDone: 'icons/commons/setupLogisticsDone.svg',
    setCollectionDone: 'icons/commons/setCollectionDone.svg',
    createPageDone: 'icons/commons/createPageDone.svg',
    organizeNavigation: 'icons/commons/organizeNavigation.svg',
};

// 渐变
const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
};

type Tab = {
    svg: React.ReactNode,
    name: string,
    title: string,
    desc: string,
    buttonText: string
    img: string
    done: boolean
    doneTitle: string,
    doneDesc: string,
    doneButtonText: string
    doneImg: string,
    url:string
}



const OpenStoreGuidance = () => {

    const init = useIntl();

    // 标签数据
    const tabs: Tab[] = [
        {
            svg: <ShopOutlined />,
            name: init.formatMessage({ id: 'openStoreGuidance.productTab.name' }),
            title: init.formatMessage({ id: 'openStoreGuidance.productTab.title' }),
            desc: init.formatMessage({ id: 'openStoreGuidance.productTab.desc' }),
            buttonText: init.formatMessage({ id: 'openStoreGuidance.productTab.buttonText' }),
            img: assetPaths.addProductDone,
            done: true,
            doneTitle: init.formatMessage({ id: 'openStoreGuidance.productTab.doneTitle' }),
            doneDesc: init.formatMessage({ id: 'openStoreGuidance.productTab.doneDesc' }),
            doneButtonText: init.formatMessage({ id: 'openStoreGuidance.productTab.doneButtonText' }),
            doneImg: assetPaths.addProductDone,
            url:"/products/index"
        },{
            svg: <ShopOutlined />,
            name: init.formatMessage({ id: 'openStoreGuidance.logisticsTab.name' }),
            title: init.formatMessage({ id: 'openStoreGuidance.logisticsTab.title' }),
            desc: init.formatMessage({ id: 'openStoreGuidance.logisticsTab.desc' }),
            buttonText: init.formatMessage({ id: 'openStoreGuidance.logisticsTab.buttonText' }),
            img: assetPaths.addProductDone,
            done: true,
            doneTitle: init.formatMessage({ id: 'openStoreGuidance.logisticsTab.doneTitle' }),
            doneDesc: init.formatMessage({ id: 'openStoreGuidance.logisticsTab.doneDesc' }),
            doneButtonText: init.formatMessage({ id: 'openStoreGuidance.logisticsTab.doneButtonText' }),
            doneImg: assetPaths.setupLogisticsDone,
            url:"/settings/delivery"
        },{
            svg: <ShopOutlined />,
            name: init.formatMessage({ id: 'openStoreGuidance.paymentMethodTab.name' }),
            title: init.formatMessage({ id: 'openStoreGuidance.paymentMethodTab.title' }),
            desc: init.formatMessage({ id: 'openStoreGuidance.paymentMethodTab.desc' }),
            buttonText: init.formatMessage({ id: 'openStoreGuidance.paymentMethodTab.buttonText' }),
            img: assetPaths.addProductDone,
            done: true,
            doneTitle: init.formatMessage({ id: 'openStoreGuidance.paymentMethodTab.doneTitle' }),
            doneDesc: init.formatMessage({ id: 'openStoreGuidance.paymentMethodTab.doneDesc' }),
            doneButtonText: init.formatMessage({ id: 'openStoreGuidance.paymentMethodTab.doneButtonText' }),
            doneImg: assetPaths.setCollectionDone,
            url:"/settings/payments"
        },{
            svg: <ShopOutlined />,
            name: init.formatMessage({ id: 'openStoreGuidance.customPageTab.name' }),
            title: init.formatMessage({ id: 'openStoreGuidance.customPageTab.title' }),
            desc: init.formatMessage({ id: 'openStoreGuidance.customPageTab.desc' }),
            buttonText: init.formatMessage({ id: 'openStoreGuidance.customPageTab.buttonText' }),
            img: assetPaths.addProductDone,
            done: true,
            doneTitle: init.formatMessage({ id: 'openStoreGuidance.customPageTab.doneTitle' }),
            doneDesc: init.formatMessage({ id: 'openStoreGuidance.customPageTab.doneDesc' }),
            doneButtonText: init.formatMessage({ id: 'openStoreGuidance.customPageTab.doneButtonText' }),
            doneImg: assetPaths.createPageDone,
            url:"/website/page"
        },{
            svg: <ShopOutlined />,
            name: init.formatMessage({ id: 'openStoreGuidance.navigationTab.name' }),
            title: init.formatMessage({ id: 'openStoreGuidance.navigationTab.title' }),
            desc: init.formatMessage({ id: 'openStoreGuidance.navigationTab.desc' }),
            buttonText: init.formatMessage({ id: 'openStoreGuidance.navigationTab.buttonText' }),
            img: assetPaths.addProductDone,
            done: false,
            doneTitle: init.formatMessage({ id: 'openStoreGuidance.navigationTab.doneTitle' }),
            doneDesc: init.formatMessage({ id: 'openStoreGuidance.navigationTab.doneDesc' }),
            doneButtonText: init.formatMessage({ id: 'openStoreGuidance.navigationTab.doneButtonText' }),
            doneImg: assetPaths.organizeNavigation,
            url:"/website/navList"
        },
    ]

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const navigator = useNavigate();
    //   头部
    const header = (
        <>
            {/* 标题 */}
            <h2 style={{
                fontWeight: 600
            }}>
                {init.formatMessage({ id: 'openStoreGuidance.title' })}
            </h2>
            {/* 进度 */}
            <div style={{
                display: "flex",
                width: '100%',
                alignItems: 'center'
            }}>
                <div style={{
                    display: "inline-block",
                    marginRight: "16px",
                    color: " #474f5e",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "22px",
                }}
                >
                    {init.formatMessage({ id: 'openStoreGuidance.progress' }, { num: "3/5" })}
                </div>
                {/* 条 */}
                <Progress
                    percent={50}
                    strokeColor={twoColors}
                    showInfo={false}
                    style={{
                        flex: 1,
                        margin: 0,
                    }}
                />
            </div>

        </>
    )
    // 内容
    const content = (
        <>
        {/*  */}
            <div 
                style={{
                    display: "flex",
                    width: "100%",
                }}
                className={'wrapper'}
            >
                {/* tab-space */}
                <Space.Compact direction='vertical'
                    style={{
                        width: 220
                    }}
                >
                    {
                        tabs.map((tab, index) => (
                            <div key={index}
                                onClick={() => {
                                    setActiveTab(tabs[index])
                                }}
                                className={`tab ${activeTab == tabs[index] ? "active" : ''}`}
                            >
                                <div className={'icon'}>
                                {tab.done ? <CheckCircleFilled style={{color: '#356dff'}} /> : tab.svg}
                                </div>
                                <div>
                                    {tab.name}
                                </div>
                            </div>
                        ))
                    }
                </Space.Compact>
                {/* pane-space */}
                <div className={'pane'}>
                  <div className={'content'}>
                    <div className={'title'}>
                        {activeTab.done ? activeTab.doneTitle : activeTab.title}
                    </div>
                    <div className={'desc'}>
                        {activeTab.done ? activeTab.doneDesc : activeTab.desc}
                    </div>
                    <div className={'buttonContainer'}>
                        <Button type='primary' onClick={()=>{
                            activeTab.url !== "" && navigator(activeTab.url)
                        }}>{activeTab.done ? activeTab.doneButtonText : activeTab.buttonText}</Button>
                        {/* <div className={'link'}>{activeTab.done? '':'跳过'}</div> */}
                    </div>
                  </div>
                  <div style={{
                    height: '100%',
                    width: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <img className={'icon'} src={activeTab.done ? activeTab.doneImg : activeTab.img} />
                  </div>
                </div>
            </div>
        </>
    )
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: header,
            children: content,
        },
    ];
    return (
        //组件主题
        <Scoped>
            <ConfigProvider
                theme={{
                    components: {
                        Collapse: {
                            contentPadding: "0"
                        }
                    }
                }}
            >
                {/* 折叠面板 */}
                <Collapse
                    items={items} bordered={false}
                    style={{
                        backgroundColor: "white",
                        overflow: "hidden"
                    }}
                    expandIconPosition="end"
                    defaultActiveKey={['1']}
                />
            </ConfigProvider>
        </Scoped>
        
    )
}

export default OpenStoreGuidance;

const Scoped = styled.div`
    .wrapper{
        background: linear-gradient(91.68deg, #f0f7ff 1.35%, rgba(240, 247, 255, 0) 98.51%);
    }
    .tab{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: relative;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 16px 12px 16px 25px;
        cursor: pointer;
        background-color: white;
        overflow: hidden;
        font-size: 16px;
        line-height: 120%;
        border-top: 2px solid rgba(190, 190, 190, 0.1);
        width: 220px;
        &:hover{
            background-color: #f7f8fb;
            // background-color: #f7f8fb;
            color: #356dff;
            
        }
        .icon{
            justify-content: center;
            width: 24px;
            height: 24px;
            margin-right: 8px;
            font-size: 24px;
        }
    }
    .active{
        background:transparent;
        font-weight: 600;
        color: #356dff;
        &:hover{
            background:transparent;
        }
    }
    .pane{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        width: 100%;
        min-height: 100%;
        background: rgba(0,0,0,0);
        display: flex;
        .content{
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            min-height: 100%;
            padding: 40px 20px 40px 40px;
            overflow: hidden;
            min-width: 220px;
            .title{
                margin-bottom: 8px;
                color: #242833;
                font-size: 24px;
                font-weight: 600;
                line-height: 32px;
            }
            .desc{
                margin-bottom: 20px;
                color: #242833;
                font-size: 14px;
                font-weight: 400;
                line-height: 20px;
            }
            .buttonContainer{
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                .link{
                    color:#356dff;
                    margin-left: 16px;
                    font-size: 14px;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }

        }
        .icon{
            // height: 188px;
            width: 100%;
        }

    }
`;
