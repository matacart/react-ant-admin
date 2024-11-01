import React from 'react';
import type { CollapseProps, ProgressProps } from 'antd';
import { Button, Collapse, ConfigProvider, Progress, Space } from 'antd';
import styles from './OpenStoreGuidance.module.scss'
import { ShopOutlined,CheckCircleFilled ,ShopTwoTone} from '@ant-design/icons';
import { useState } from 'react';
import classNames from 'classnames';
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
    doneImg: string
}
// 标签数据
const tabs: Tab[] = [
    {
        svg: <ShopOutlined />,
        name: "添加商品",
        title: "添加商品",
        desc: "您还可以继续添加更多新产品",
        buttonText: "去添加",
        img: 'icons/addProductDone.svg',
        done: true,
        doneTitle: "您已添加了新产品",
        doneDesc: "您还可以继续添加更多新产品",
        doneButtonText: "去添加",
        doneImg: 'icons/addProductDone.svg'
    },{
        svg: <ShopOutlined />,
        name: "配置物流",
        title: "配置物流",
        desc: "您还可以继续添加更多新产品",
        buttonText: "去添加",
        img: 'icons/addProductDone.svg',
        done: true,
        doneTitle: "您已配置了物流",
        doneDesc: "SHOPLINE支持按重量等多个维度设置不同国家/地区的物流模版，也可同时支持多个方案。在后台也可以添加物流商",
        doneButtonText: "设置物流方式",
        doneImg: 'icons/setupLogisticsDone.svg'
    },{
        svg: <ShopOutlined />,
        name: "设定收款",
        title: "设定收款",
        desc: "您还可以继续添加更多新产品",
        buttonText: "去添加",
        img: 'icons/addProductDone.svg',
        done: true,
        doneTitle: "您已配置了收款方式",
        doneDesc: "可根据您售卖的地区设置合适的付款方式",
        doneButtonText: "设置收款方式",
        doneImg: 'icons/setCollectionDone.svg'
    },{
        svg: <ShopOutlined />,
        name: "创建自定义页面",
        title: "创建自定义页面",
        desc: "您还可以继续添加更多新产品",
        buttonText: "去添加",
        img: 'icons/addProductDone.svg',
        done: true,
        doneTitle: "创建自定义页面",
        doneDesc: "您已成功添加页面，您可以继续添加更多页面或者完善已有页面信息。",
        doneButtonText: "去设置",
        doneImg: 'icons/createPageDone.svg'
    },{
        svg: <ShopOutlined />,
        name: "整理导航",
        title: "整理导航",
        desc: "",
        buttonText: "去添加",
        img: 'icons/organizeNavigation.svg',
        done: false,
        doneTitle: "整理导航",
        doneDesc: "",
        doneButtonText: "",
        doneImg: ''
    },
]





const App: React.FC = () => {

    const [activeTab, setActiveTab] = useState(tabs[0]);


    //   头部
    const header = (
        <>
            {/* 标题 */}
            <h2 style={{
                fontWeight: 600
            }}>开店引导
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
                    已完成3/5个任务
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
            <div className={styles.wrapper}
                style={{
                    display: "flex",
                    width: "100%",
                    
                }}
            >
                {/* tab-space */}
                <Space.Compact direction='vertical'
                    style={{
                        width: 220
                    }}
                >
                    {
                        tabs.map((tab, index) => (
                            <div key={tab.name}
                                onClick={() => {
                                    setActiveTab(tabs[index])
                                }}
                                className={classNames(styles.tab, activeTab == tabs[index] ? styles.active : '')}
                            >
                                <div className={styles.icon}>
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
                <div className={styles.pane}>
                  <div className={styles.content}>
                    <div className={styles.title}>
                        {activeTab.done ? activeTab.doneTitle : activeTab.title}
                    </div>
                    <div className={styles.desc}>
                        {activeTab.done ? activeTab.doneDesc : activeTab.desc}
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button type='primary'>{activeTab.done ? activeTab.doneButtonText : activeTab.buttonText}</Button>
                        <div className={styles.link}>{activeTab.done? '':'跳过'}</div>
                    </div>
                  </div>
                  <div style={{
                    height: '100%',
                    width: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <img className={styles.icon} src={activeTab.done ? activeTab.doneImg : activeTab.img} />

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
                expandIconPosition="right"
                defaultActiveKey={['1']}
            />
        </ConfigProvider>
    )

}
export default App;