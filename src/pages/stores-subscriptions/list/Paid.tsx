import { ArrowLeftOutlined, BackwardOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from 'umi'
import { wrap } from 'lodash';
import Charges from "@/components/Card/Charges";
import { Divider } from "antd";
import { context } from './../../../.umi-production/core/helmetContext';


const funcArray = [  
    {  
        title: '社交电商',  
        // 如果社交电商下没有其他细分功能或描述，可以留空或者省略desc字段  
    },  
    {  
        title: '行业模板',  
        desc: '20+套热门行业品类精美模板'  
    },  
    {  
        title: '批量上传商品',  
        desc: '支持Excel表格、主流ERP导入商品'  
    },  
    {  
        title: '多语言',  
        desc: '支持34种语言，包括英语、德语、日语、法语、西语、泰语、俄语等'  
    },  
    {  
        title: 'Conversion Booster',  
        desc: '店铺转化率提升工具'  
    },  
    {  
        title: '智能落地页',  
        desc: '内置氛围组件库、精美皮肤，提供数据分析、页面优化建议'  
    },  
    {  
        title: 'Facebook数据上报助手',  
        desc: '回传店铺成效订单数据，解决Facebook漏报问题'  
    },  
    {  
        title: 'Facebook CAPI上报',  
        desc: '全新的Facebook数据上报解决方案，可支持多个...'  
    },  
    {  
        title: '丰富营销组件',  
        desc: '优惠码、自动优惠、限时促销、捆绑销售、短信服务'  
    },  
    {  
        title: '营销日历',  
        // 如果没有额外描述，可以留空或者省略desc字段  
    },  
    {  
        title: '博客功能',  
        desc: '支持站内SEO优化、社媒分析及RSS订阅，承载多元流量'  
    },  
    {  
        title: '分销系统',  
        desc: '可一键推广产品，自由配置四大佣金模式'  
    },  
    {  
        title: '智能商品推荐',  
        desc: '算法智能推荐热门商品，有效提升转化率'  
    },  
    {  
        title: '便捷多店铺管理',  
        desc: '支持多域名绑定、支持一个邮箱开通并且管理多个店铺；支持快速复制店铺。'  
    },  
    {  
        title: '实时视图',  
        desc: '实时店铺数据分析，了解业务走势'  
    },  
    {  
        title: '数据分析',  
        desc: '包含实时以及多维度数据分析报告'  
    },  
    {  
        title: '多结账流程配置',  
        desc: '灵活匹配不同业务场景，优化结算流程'  
    },  
    {  
        title: '多币种',  
        desc: '支持全球147种货币'  
    },  
    {  
        title: '全球售卖',  
        desc: '支持多市场设置，一站式制定多国家/地区的售卖策略。包括差异化的定价，营销优惠，和物流方案；'  
    },  
    {  
        title: '灵活结账',  
        desc: '支持一页/三页结账，灵活匹配不同业务场景'  
    },  
    {  
        title: '体检中心',  
        desc: '投放广告前网站自检，提高开户成功率'  
    },  
    {  
        title: '应用市场',  
        desc: '提供丰富的插件，满足卖家的不同需求。例：ShareASale、指纹科技、Instagram照片墙等'  
    },  
    {  
        title: '24/7 支持',  
        desc: '获得 24/7 365 天的帮助（政策可能因地点而异）'  
    }  
];

const layerText = [
    // 入门版
    [
        {
            title: '费率',
            desc: [
                'MataCart Payments费率：该版本不支持 MataCart Payments',
                '不使用MataCart Payments时，第三方交易费率：2%',
            ],
        }, {
            title: '功能',
            desc: [
                '员工账号数 10',
                'Facebook粉丝页数 5',
                '库存地点数量：100',
            ],
        }
    ],
    // 基础版
    [
        {
            title: '费率',
            desc: [
                'MataCart Payments费率：该版本不支持 MataCart Payments',
                '不使用MataCart Payments时，第三方交易费率：0.8%',
            ],
        }, {
            title: '功能',
            desc: [
                '员工账号数 100',
                'Facebook粉丝页数 5',
                '库存地点数量：100',
                // 'SHOPLINE FLOW'
            ]
        }
    ],
    // 旗舰版
    [
        {
            title: '费率',
            desc: [
                'MataCart Payments费率：3.3%+0.3 USD',
                '不使用MataCart Payments时，第三方交易费率：0.4%',
            ],
        }, {
            title: '功能',
            desc: [
                '员工账号数 100',
                'Facebook粉丝页数 5',
                '库存地点数量：100',
                // 'SHOPLINE FLOW'
            ]
        }
    ]
]

const priceMonth = {
    icon: '￥',
    start: 199,
    base: 499,
    flagship: 999,
    text: '月'
}
const priceYear = {
    icon: '￥',
    start: 1999,
    base: 4999,
    flagship: 9999,
    text: '年',
}

export default function Paid() {
    // swich num
    const [activeNum, setActiveNum] = useState(2);
    const [layer, setLayer] = useState(layerText);
    const [price, setPrice] = useState(priceYear);
    // current active card ,default 2 
    const [hover, setHoverNum] = useState(2);
    return (
        <Scoped>
            <div className="mc-layout">
                {/* 头部 */}
                <div className="mc-page-header">
                    {/* 回退 */}
                    <Button className="mc-page-header-back-btn" icon={<ArrowLeftOutlined />}
                        onClick={() => {
                            window.history.back();
                        }}
                    >
                    </Button>
                    {/* 标题 */}
                    <div className="mc-page-header-title">
                        选择套餐
                    </div>
                </div>
                {/* 内容 */}
                <div className="mc-page-content">
                    {/* 提醒 */}
                    <div className="text-box">
                        {/* info-icon */}

                        <div className="box">
                            店铺已无法使用，如果需要处理您的店内信息资产（如域名、账单等），请
                            {/* <Dropdown/> */}
                        </div>
                        <div className="box">
                            如果您不想再继续使用您的店铺，在处理完您的店内信息资产之后，可以选择
                            <span></span>
                        </div>
                    </div>
                    {/* 套餐 */}
                    <div className="introduction">
                        <div className="introduction-header">
                            <div>为店铺选择一个套餐</div>
                        </div>
                        <div className="introduction-body">
                            {/* swich */}
                            <div className="introductionPeriodContainer">
                                <ul className="introduction-period">
                                    <li className={"introduction-period__item " + (
                                        activeNum == 1 && 'active'
                                    )} onClick={() => {
                                        setActiveNum(1)
                                        setPrice(priceMonth)
                                    }
                                    }>
                                        月付
                                    </li>
                                    <li className={"introduction-period__item " + (
                                        activeNum == 2 && 'active'
                                    )} onClick={() => {
                                        setActiveNum(2)
                                        setPrice(priceYear)
                                    }}>
                                        年付
                                    </li>
                                </ul>
                            </div>
                            {/* Card */}
                            <div className="introduction-items ">
                                {/* 边框1 */}
                                <ul className={"introduction-packages " + (
                                    hover == 1 && 'hover'
                                )}
                                    onMouseOver={() => {
                                        setHoverNum(1);
                                    }}
                                    onMouseLeave={() => {
                                        setHoverNum(2);
                                    }}
                                >

                                    {/* 展示 */}
                                    <li className="introduction-packages_item">
                                        {/* 内容 */}
                                        <div className="introduction-packages_item-content onetop">
                                            <div className="introduction-packages__item__section">
                                                <div className="introduction-packages__item__title">
                                                    入门版
                                                </div>
                                                <div className="introduction-packages__item__introduction">
                                                    低成本体验建站 多重礼包助力业务启动
                                                </div>
                                                <div className="introduction-packages__item__charges">
                                                    <Charges icon={price.icon} price={price.start} text={price.text} origin={activeNum == 2 ? priceMonth.start : undefined} desc={activeNum == 2 ? '按年结算' : undefined} />
                                                </div>
                                                <a>
                                                    <Button type="primary" style={{
                                                        minWidth: "200px"
                                                    }}>选择套餐</Button>
                                                </a>
                                            </div>
                                            <div className="introduction-packages__item__section_layer">
                                                <div >
                                                    {layer[0]?.map(({ title, desc }) => (
                                                        <div className="introduction-packages__item__description">
                                                            <Divider />
                                                            <div className="introduction-packages__item__description__title">{title}</div>
                                                            {desc?.map((text) => (
                                                                <li className="introduction-packages__item__description__item">
                                                                    {text}
                                                                </li>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul className={"introduction-packages " + (
                                    hover == 2 && 'hover'
                                )}
                                >
                                    {/* 展示 */}
                                    <li className="introduction-packages_item">
                                        {/* 热门 */}
                                        <div className="introduction-packages__item--popular">
                                            热门
                                        </div>
                                        {/* 内容 */}
                                        <div className="introduction-packages_item-content twotop">
                                            <div className="introduction-packages__item__section">
                                                <div className="introduction-packages__item__title">
                                                    基础版
                                                </div>
                                                <div className="introduction-packages__item__introduction">
                                                    绝佳的启动方式 适合新手卖家快速上手
                                                </div>
                                                <div className="introduction-packages__item__charges">
                                                    <Charges icon={price.icon} price={price.base} text={price.text} origin={activeNum == 2 ? priceMonth.base : undefined} desc={activeNum == 2 ? '按年结算' : undefined} />
                                                </div>
                                                <a>
                                                    <Button type="primary" style={{
                                                        minWidth: "200px"
                                                    }}>选择套餐</Button>
                                                </a>
                                            </div>
                                            <div className="introduction-packages__item__section_layer">
                                                <div >
                                                    {layer[1]?.map(({ title, desc }) => (
                                                        <div className="introduction-packages__item__description">
                                                            <Divider />
                                                            <div className="introduction-packages__item__description__title">{title}</div>
                                                            {desc?.map((text) => (
                                                                <li className="introduction-packages__item__description__item">
                                                                    {text}
                                                                </li>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul className={"introduction-packages " + (
                                    hover == 3 && 'hover'
                                )}
                                    onMouseOver={() => {
                                        setHoverNum(3);
                                        console.log('focus');
                                    }}
                                    onMouseLeave={() => {
                                        setHoverNum(2);
                                        console.log('leave');
                                    }}
                                >

                                    {/* 展示 */}
                                    <li className="introduction-packages_item">

                                        {/* 内容 */}
                                        <div className="introduction-packages_item-content treetop">
                                            <div className="introduction-packages__item__section">
                                                <div className="introduction-packages__item__title">
                                                    旗舰版
                                                </div>
                                                <div className="introduction-packages__item__introduction">
                                                    玩转流量积聚品牌效应 长效赋能海外DTC业务
                                                </div>
                                                <div className="introduction-packages__item__charges">
                                                    <Charges icon={price.icon} price={price.flagship} text={price.text} origin={activeNum == 2 ? priceMonth.flagship : undefined} desc={activeNum == 2 ? '按年结算' : undefined} />
                                                </div>
                                                <a>
                                                    <Button type="primary" style={{
                                                        minWidth: "200px"
                                                    }}>选择套餐</Button>
                                                </a>
                                            </div>
                                            <div className="introduction-packages__item__section_layer">
                                                <div >
                                                    {layer[2]?.map(({ title, desc }) => (
                                                        <div className="introduction-packages__item__description">
                                                            <Divider />
                                                            <div className="introduction-packages__item__description__title">{title}</div>
                                                            {desc?.map((text) => (
                                                                <li className="introduction-packages__item__description__item">
                                                                    {text}
                                                                </li>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* super */}
                            <div className="enterpriseBanner">
                                {/* <img src='/icons/enterprise.svg' /> */}
                                <h2 style={{
                                    color: "white",
                                }}>MataCart 企业版</h2>
                                <div className="content">
                                    <div className="text1">专为具规模或高增长的企业而设</div>
                                    <div className="text2">MataCart Enterprise 是一个可以帮助中大型企业以低成本投入，获取更高转化率、更高效安全管理方式的全球领先跨境电商解决方案</div>
                                    <Button className="mc-button" type='primary' >查看详情</Button>
                                </div>
                            </div>

                            {/* func */}
                            <div className="introduction-features">
                                <div className="introduction-featuress__title">
                                    所有月付套餐均包括以下功能：
                                </div>
                                <ul className="introduction-features__list" >
                                    {funcArray.map(({title,desc}) => (
                                            <li className="introduction-features__list__item">
                                                <p className="introduction-features__list__item--title">
                                                    {title}
                                                </p>
                                                <p className="introduction-features__list__item--sub">
                                                    {desc}
                                                </p>
                                            </li>
                                    ))}
                                </ul>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </Scoped>
    )
}


const Scoped = styled.div`
display: flex;
width: 100%;
justify-content: center;
ul {  
    list-style-type: none; /* 移除项目符号 */  
    padding: 0; /* 移除内边距 */  
    margin: 0; /* 移除外边距 */  
}  
.mc-layout{
    min-width:510px;
    max-width: 1440px;
    width:100%; 



    .mc-page-header{
        display:flex;
        align-items: center;
        margin:24px 0;

        &-back-btn{
            width: 36px;
            height: 36px;
            background-color: transparent;
            margin-right:12px;
            &:hover{
                color: #4eafff;
                background-color:#ffffff;
            }

            .mc-btn-icon{
                position: absolute; left: 50%; top: 56%;
                transform: translate(-50%, -50%);
                font-size: 20px;
                color: #3b3b3b;
                transition: all 0.3s ease;

            }
        }

        &-title{
            color: #242833;
            font-size: 30px;
            font-size: 20px;
            font-weight: 600;
            line-height: 1.35;
            line-height: 28px;
            margin-bottom: 0;
        }
    }

    .mc-page-content{
        .text-box{
            display: none;
        }

        .introduction{
            display:flex;
            flex-direction: column;
            &-header{
                color: #00142d;
                font-size: 20px;
                font-style: normal;
                font-weight: 700;
                font-family: 'Roboto';
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding:10px 40px;
                background: linear-gradient(180deg, #e8eff7 0%, #fafcff 100%, rgba(233, 240, 248, 0) 100%);
                line-height: 150%;
            }
            &-body{
                padding-right: 20px;
                padding-bottom: 20px;
                padding-left: 20px;
                background-color: white;

                .introductionPeriodContainer{
                    display: flex;
                    margin-top: 7px;
                    margin-bottom: 10px;
                    .introduction-period{
                        margin: 0;
                        padding: 0;
                        list-style: none;
                        display: inline-flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        margin: auto;
                        padding: 4px;
                        border-radius: 6px;
                        background-color: #eaedf1;
                        .introduction-period__item{
                            color: #474f5e;
                            font-size: 16px;
                            font-style: normal;
                            font-weight: 600;
                            cursor: pointer;
                            user-select: none;
                            padding: 8px 16px;
                            border-radius: 4px;
                            line-height: 22px;

                            &:hover{
                                background-color: #f0f7ff;
                                color: #356dff;

                            }
                            
                        }
                        .active{
                            background-color: #ffffff;
                            color: #356dff;
                        }
                    }
                    
                }
                .introduction-items{
                    display:flex;
                    flex-wrap:wrap;
                    justify-content: center; 
                    gap:0 10px;
                    .introduction-packages{
                        flex:1 0 300px;
                        display: flex;
                        justify-content: center;
                        margin-top: 24px;
                        flex:1;
                        min-width:300px;
                        max-width: 430px;
                        position: relative;
                        top:0;
                        transition: all 0.3s ease;
                        &_item{
                            display: flex;
                            position: relative;
                            flex-direction: column;
                            align-items: center;
                            width: 100%;
                            /* padding: 12px 10px; */
                            overflow: hidden;
                            border-radius: 10px;
                            &::before{
                                content: '';
                                position: absolute;
                                z-index: 2;
                                top: 0;
                                right: 0;
                                bottom: 0;
                                left: 0;
                                transition: border-color 0.3s;
                                border: 1px solid #d7dbe7;
                                border-radius: 10px;
                                pointer-events: none;
                            }
                            &:hover {
                                &::before{
                                    border-width: 2px;
                                    border-color: #356dff;
                                    -webkit-box-shadow: 0 14px 50px rgba(0, 0, 0, 0.1);
                                    box-shadow: 0 14px 50px rgba(0, 0, 0, 0.1);
                                }
                            }

                            &-content{
                                display: flex;
                                position: relative;
                                flex-direction: column;
                                align-items: center;
                                width: 100%;
                                padding: 30px 12px 0 12px;
                                overflow: hidden;
                                border-radius: 10px;

                                
                                .introduction-packages__item__section{
                                    display:flex;
                                    align-items: center;
                                    padding-bottom: 20px;
                                    flex-direction: column;
                                    .introduction-packages__item{
                                       &__title{
                                            margin-bottom: 16px;
                                            color: #458fe2;
                                            font-size: 30px;
                                            font-style: normal;
                                            font-weight: 600;
                                        }
                                        &__introduction{
                                            margin-bottom:16px;
                                            max-width: 100%;
                                            color: #474f5e;
                                            font-size: 16px;
                                            font-style: normal;
                                            font-weight: 600;
                                            line-height: 22px;
                                            text-align: center;
                                            word-wrap: break-word;
                                        }
                                        &__charges{
                                            display: flex;
                                            width:100%;
                                            align-items: flex-start;
                                            margin-bottom: 16px;
                                        }

                                    }

                                }

                                .introduction-packages__item{
                                    &__description{
                                        &__title{
                                            margin-bottom: 0;
                                            padding-bottom: 8px;
                                            line-height: 16px;
                                            text-align: left;
                                            color: #7a8499;
                                            font-size: 12px;
                                            font-style: normal;
                                            font-weight: 500;
                                        }
                                        &__item{
                                            position: relative;
                                            margin-bottom: 10px;
                                            padding-left: 17px;
                                            line-height: 22px;
                                            text-align: left;
                                            word-wrap: break-word;
                                            color: #474f5e;
                                            font-size: 16px;
                                            font-style: normal;
                                            font-weight: 400;
                                            &::before{
                                                content: '';
                                                position: absolute;
                                                top: 11px;
                                                left: 0;
                                                width: 7px;
                                                height: 7px;
                                                -webkit-transform: translateY(-50%);
                                                transform: translateY(-50%);
                                                border-radius: 50%;
                                                background-color: #70adf3;
                                            }
                                        }
                                    }

                                }
                            }

                        }

                    }
                    .hover{
                        position:relative;
                        top: -16px;
                        .introduction-packages_item{
                            &::before{
                                border-width: 2px;
                                border-color: #356dff;
                            }
                        }
                        &::before{
                            content:'';
                            position:absolute;
                            width:100%;
                            height:100%;
                            -webkit-box-shadow: 0 14px 50px rgba(0, 0, 0, 0.1);
                            box-shadow: 0 14px 50px rgba(0, 0, 0, 0.1);
                        }
                    } 
                }

            }


        }
    }
}
.introduction-packages__item--popular{
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    z-index: 2;
    top: 20px;
    right: -30px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 120px;
    width: 130px;
    padding: 6px 0;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    background: #fcaf09;
    line-height: 16px;
    white-space: nowrap;
}
    
.onetop{
    &::before{
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        left: 0;
        height: 10px;
        background: linear-gradient(304.01deg, #5699e7 20.15%, #5cb1ff 79.85%);
    }
}
.twotop{
    &::before{
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        left: 0;
        height: 10px;
        background: linear-gradient(304.01deg, #50b5ff 20.15%, #5bd8ff 79.85%);
    }
}
.treetop{
    &::before{
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        left: 0;
        height: 10px;
        background: linear-gradient(304.01deg, #0027b0 20.15%, #0c4ff9 79.85%);    }

}
.enterpriseBanner{
    margin-top:20px;
    padding: 24px;
    border-radius: 6px;
    background: linear-gradient(94deg, #00142d -17.85%, #010d76 91.13%);
    .content{
        margin-top: 20px;
        color: #fff;
        .text1{
            font-size: 24px;
            font-weight: 700;
            line-height: 1;
        }
        .text2{
            margin-top: 10px;
            opacity: 0.8;
            font-weight: 400;
        }
        .mc-button{
            margin-top: 20px;
            padding: 7px 51px;
            min-width: 200px;
        }
    }
}
.introduction-featuress__title{
        color: #242833;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        margin-bottom: 40px;
        line-height: 28px;
    }
.introduction-features{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 40px;
    padding: 20px;
    border: 1px solid #eef1f7;
    border-radius: 6px;
    background: #fff;

    &__list{
        &___title{
            color: #242833;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            margin-bottom: 40px;
            line-height: 28px;
        }
        margin: 0;
        padding: 0;
        list-style: none;
        display:flex;
        flex-wrap:wrap;
        justify-content: start; 

        &__item{

            position:relative;
            padding-left:16px;
            flex: 0 0 calc(33.33%);
            box-sizing: border-box;  
            &--title{
                color: #474f5e;
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
                margin-bottom: 4px;
                line-height: 22px;
            }
            &--sub{
                color: #667281;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
            }
            &::before{
                content: '';
                position: absolute;
                top: 11px;
                left: 0;
                width: 7px;
                height: 7px;
                transform: translateY(-50%);
                border-radius: 50%;
                background-color: #ff9030;
            }

        }
    }
}
/* 媒体查询：12行2列 */  
@media (max-width: 900px) {  
  .introduction-features__list__item {  
    flex: 0 0 calc(50% - 10px);  
  }  
}  
  
/* 媒体查询：24行1列 */  
@media (max-width: 500px) {  
  .introduction-features__list__item {  
    flex: 0 0 calc(100% - 10px);  
    margin-bottom: 5px; /* 可以根据需要调整间距 */  
  }  
}

`