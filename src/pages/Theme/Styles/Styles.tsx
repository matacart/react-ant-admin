import MyButton from "@/components/Button/MyButton";
import { ExportIcon, LeftIcon, RightIcon } from "@/components/Icons/Icons";
import { Col, Flex, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Fooder from "./Fooder";
import { installTemplate } from "@/services/y2/api";
import { useParams } from "react-router-dom";


interface styleType{
    category: string,
    styleName: string,
    styleConfig:any
}

function Styles(){

    const params  = useParams();

    const [currentIndex, setCurrentIndex] = useState(0);
    const coverRef = useRef<HTMLDivElement>(null);
    const handleNext = () => {
        if (coverRef.current && currentIndex < coverGroups.length - 1) {
            const nextIndex = (currentIndex + 1) % coverGroups.length;
            setCurrentIndex(nextIndex);
            coverRef.current.scrollTo({
                left: nextIndex * coverRef.current.clientWidth,
                behavior: 'smooth'
            });
        }
    };
    const handlePrev = () => {
        if (coverRef.current && currentIndex > 0) {
            const prevIndex = (currentIndex - 1 + coverGroups.length) % coverGroups.length;
            setCurrentIndex(prevIndex);
            coverRef.current.scrollTo({
                left: prevIndex * coverRef.current.clientWidth,
                behavior: 'smooth'
            });
        }
    };
    // 风格
    const [currentStyle,setCurrentStyle] = useState<styleType | null>();
    // 封面图
    const [coverGroups,setCoverGroups] = useState<any[]>([]);
    const styleList = [
        {
            category: "流行服装",
            styleName: "Default",
            styleConfig: {
                title: "简约",
                color: "#B19460",
                themeHomeMobilePreviewImg: "https://img.myshopline.com/image/shopline/4eed021fca034b6eb75181a0ad435a47.jpeg",
                themeHomePcPreviewImg: "https://img.myshopline.com/image/shopline/c540d1c306b040789bead710af861371.jpeg",
                themePdpMobilePreviewImg: "https://img.myshopline.com/image/shopline/335bf1965470411a93f5d91d09774618.jpeg",
                themePdpPcPreviewImg: "https://img.myshopline.com/image/shopline/da06d99543f247369297ab634a19d8e9.jpeg",
            }
        },
        {
            category: "食品饮料",
            styleName: "Food",
            styleConfig: {
                title: "食物",
                color: "#FF0F00",
                themeHomeMobilePreviewImg: "https://img.myshopline.com/image/shopline/dc20075fce4d49b7b1610cba412da7ff.jpeg",
                themeHomePcPreviewImg: "https://img.myshopline.com/image/shopline/80dda01943be4ab185144ad63d0de624.jpeg",
                themePdpMobilePreviewImg: "https://img.myshopline.com/image/shopline/84cf007a1fe148b387a659a7fde5dc00.jpeg",
                themePdpPcPreviewImg: "https://img.myshopline.com/image/shopline/4e0e63dcf73c471084acd87e90c50e1b.jpeg",
            }
        },
        {
            category: "生活家居",
            styleName: "Hammer",
            styleConfig: {
                title: "机械",
                color: "#FFE46A",
                themeHomeMobilePreviewImg: "https://img.myshopline.com/image/shopline/de2359c6aef44d95905f513a93e3ce7c.png",
                themeHomePcPreviewImg: "https://img.myshopline.com/image/shopline/f0701559d0d74d4c9a75d681ba409721.png",
                themePdpMobilePreviewImg: "https://img.myshopline.com/image/shopline/1afab517f057467db26fe96363afad0a.png",
                themePdpPcPreviewImg: "https://img.myshopline.com/image/shopline/8f507d9bd4964fe693e2f755a8a088ac.png",
            }
        }
    ]
    const setStyle = (style:any)=>{
        setCurrentStyle(style)
        setCoverGroups([
            {
                pcImage: style.styleConfig.themeHomePcPreviewImg,
                mobileImage: style.styleConfig.themeHomeMobilePreviewImg
            },
            {
                pcImage: style.styleConfig.themePdpPcPreviewImg,
                mobileImage: style.styleConfig.themePdpMobilePreviewImg,
            }
        ])
    }

    // 
    const features = [
        {
            title:"扩大你的品牌影响力",
            desc:"展示你的品牌故事和价值，与客户缔造连接，塑造品牌形象。",
            img:"https://img.myshopline.com/image/official/a54bfba376944e8a9bc09bae11eb6da7.jpeg"
        },
        {
            title:"扩大你的品牌影响力",
            desc:"展示你的品牌故事和价值，与客户缔造连接，塑造品牌形象。",
            img:"https://img.myshopline.com/image/official/a54bfba376944e8a9bc09bae11eb6da7.jpeg"
        },
        {
            title:"扩大你的品牌影响力",
            desc:"展示你的品牌故事和价值，与客户缔造连接，塑造品牌形象。",
            img:"https://img.myshopline.com/image/official/a54bfba376944e8a9bc09bae11eb6da7.jpeg"
        }
    ]

    // 
    const featureList = [
        {
            title:"加购与支付",
            tags:[
                {
                    text:"色板快速加购"
                },
                {
                    text:"商品快速加购"
                },
                {
                    text:"抽屉式购物车"
                }
            ]
        },
        {
            title:"营销与推广",
            tags:[
                {
                    text:"博客"
                },
                {
                    text:"商品标签"
                },
                {
                    text:"折扣推广"
                },
                {
                    text:"购物车商品推荐"
                }
            ]
        },
        {
            title:"商品展示",
            tags:[
                {
                    text:"画廊"
                },
                {
                    text:"购物图片"
                },
                {
                    text:"多款式选项"
                },
                {
                    text:"商品视频"
                },
                {
                    text:"轮播图"
                },
                {
                    text:"动效"
                }
            ]
        },
        {
            title:"检索和导航",
            tags:[
                {
                    text:"超级菜单"
                },
                {
                    text:"商品筛选和排序"
                },
                {
                    text:"悬浮置顶页头"
                },
                {
                    text:"面包屑"
                }
            ]
        }
    ]
    // 推荐主题
    const recommendedTopics = [
        {
            template_name: "Jewel",
            template_version: "1.0.0",
            os_version: "OS_2.1",
            styles:[
                {
                    category: "流行服装",
                    styleName: "Default",
                    styleConfig: {
                        title: "简约",
                        color: "#B19460",
                        themeHomeMobilePreviewImg: "https://img.myshopline.com/image/shopline/4eed021fca034b6eb75181a0ad435a47.jpeg",
                        themeHomePcPreviewImg: "https://img.myshopline.com/image/shopline/c540d1c306b040789bead710af861371.jpeg",
                        themePdpMobilePreviewImg: "https://img.myshopline.com/image/shopline/335bf1965470411a93f5d91d09774618.jpeg",
                        themePdpPcPreviewImg: "https://img.myshopline.com/image/shopline/da06d99543f247369297ab634a19d8e9.jpeg",
                    }
                },
                {
                    category: "食品饮料",
                    styleName: "Food",
                    styleConfig: {
                        title: "食物",
                        color: "#FF0F00",
                        themeHomeMobilePreviewImg: "https://img.myshopline.com/image/shopline/dc20075fce4d49b7b1610cba412da7ff.jpeg",
                        themeHomePcPreviewImg: "https://img.myshopline.com/image/shopline/80dda01943be4ab185144ad63d0de624.jpeg",
                        themePdpMobilePreviewImg: "https://img.myshopline.com/image/shopline/84cf007a1fe148b387a659a7fde5dc00.jpeg",
                        themePdpPcPreviewImg: "https://img.myshopline.com/image/shopline/4e0e63dcf73c471084acd87e90c50e1b.jpeg",
                    }
                },
            ]
        },
        {
            template_name: "Jewel",
            template_version: "1.0.0",
            os_version: "OS_2.1",
            styles:[
                {
                    category: "流行服装",
                    styleName: "Default",
                    styleConfig: {
                        title: "简约",
                        color: "#B19460",
                        themeHomeMobilePreviewImg: "https://img.myshopline.com/image/shopline/4eed021fca034b6eb75181a0ad435a47.jpeg",
                        themeHomePcPreviewImg: "https://img.myshopline.com/image/shopline/c540d1c306b040789bead710af861371.jpeg",
                        themePdpMobilePreviewImg: "https://img.myshopline.com/image/shopline/335bf1965470411a93f5d91d09774618.jpeg",
                        themePdpPcPreviewImg: "https://img.myshopline.com/image/shopline/da06d99543f247369297ab634a19d8e9.jpeg",
                    }
                },
                {
                    category: "食品饮料",
                    styleName: "Food",
                    styleConfig: {
                        title: "食物",
                        color: "#FF0F00",
                        themeHomeMobilePreviewImg: "https://img.myshopline.com/image/shopline/dc20075fce4d49b7b1610cba412da7ff.jpeg",
                        themeHomePcPreviewImg: "https://img.myshopline.com/image/shopline/80dda01943be4ab185144ad63d0de624.jpeg",
                        themePdpMobilePreviewImg: "https://img.myshopline.com/image/shopline/84cf007a1fe148b387a659a7fde5dc00.jpeg",
                        themePdpPcPreviewImg: "https://img.myshopline.com/image/shopline/4e0e63dcf73c471084acd87e90c50e1b.jpeg",
                    }
                },
            ]
        },
        {
            template_name: "Jewel",
            template_version: "1.0.0",
            os_version: "OS_2.1",
            styles:[
                {
                    category: "流行服装",
                    styleName: "Default",
                    styleConfig: {
                        title: "简约",
                        color: "#B19460",
                        themeHomeMobilePreviewImg: "https://img.myshopline.com/image/shopline/4eed021fca034b6eb75181a0ad435a47.jpeg",
                        themeHomePcPreviewImg: "https://img.myshopline.com/image/shopline/c540d1c306b040789bead710af861371.jpeg",
                        themePdpMobilePreviewImg: "https://img.myshopline.com/image/shopline/335bf1965470411a93f5d91d09774618.jpeg",
                        themePdpPcPreviewImg: "https://img.myshopline.com/image/shopline/da06d99543f247369297ab634a19d8e9.jpeg",
                    }
                },
                {
                    category: "食品饮料",
                    styleName: "Food",
                    styleConfig: {
                        title: "食物",
                        color: "#FF0F00",
                        themeHomeMobilePreviewImg: "https://img.myshopline.com/image/shopline/dc20075fce4d49b7b1610cba412da7ff.jpeg",
                        themeHomePcPreviewImg: "https://img.myshopline.com/image/shopline/80dda01943be4ab185144ad63d0de624.jpeg",
                        themePdpMobilePreviewImg: "https://img.myshopline.com/image/shopline/84cf007a1fe148b387a659a7fde5dc00.jpeg",
                        themePdpPcPreviewImg: "https://img.myshopline.com/image/shopline/4e0e63dcf73c471084acd87e90c50e1b.jpeg",
                    }
                },
            ]
        }
    ]

    const heroRef = useRef<HTMLDivElement>(null)
    // 展示底部
    const [showFooder, setShowFooder] = useState(false); // 添加状态控制 Fooder 显示

    // 使用 IntersectionObserver 监听 heroRef 元素可见性
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // 当元素不可见时设置 showFooder 为 true
                setShowFooder(!entry.isIntersecting);
            },
            {
                // 配置选项：当元素完全不可见时触发
                threshold: 0,
                rootMargin: "0px 0px 0px 0px"
            }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        // 清理观察器
        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, []);

    const install = ()=>{

        // console.log(params)
        installTemplate(params.templateId??"").then((res)=>{
            console.log(res)
        })
    }

    useEffect(()=>{
        setStyle(styleList[0])
    },[])

    return (
        <Scoped>
            {/*  */}
            {/* <Header setHeight={undefined} url={""} initialState={undefined}></Header> */}
            {/* section */}
            <div className="hero" ref={heroRef}>
                <div className="container">
                    <Flex className="hero-info" justify="space-between">
                        <div>
                            <h1 className="font-48 color-242833 title">Arise Pro</h1>
                            <p className="desc">别致简约的设计，舒适百搭的页面布局，适合通用品类站点。</p>
                            <Flex className="tag-list" gap={8}>
                                <div className="tag-item">面包屑</div>
                                <div className="tag-item">面包屑</div>
                                <div className="tag-item">面包屑</div>
                            </Flex>
                        </div>
                        <Flex vertical align="flex-end">
                            <p className="font-28 color-242833 font-w-600 price">免费</p>
                            <p className="474F5E developer">OS 2.1 · 由 <a style={{textDecoration:"underline",color:"#474F5E"}}>MATACART</a> 开发</p>
                            <Flex gap={24}>
                                <MyButton icon={<ExportIcon />} style={{ height: "42px",fontWeight:"600" }} text={"预览模板"} />
                                <MyButton type="primary" style={{ height: "42px",fontWeight:"600" }} text={"添加模板"} onClick={install} />
                            </Flex>
                        </Flex>
                    </Flex>
                </div>
                <div className="cover-wrap">
                    <div className="cover" ref={coverRef}>
                        {coverGroups.map((item, index) => (
                            <Flex key={index} className="cover-group" justify="space-between" gap={32}>
                                <div className="cover-pc">
                                    <img src={item?.pcImage} alt="Arise Pro" />
                                </div>
                                <div className="cover-mobile">
                                    <img src={item?.mobileImage} alt="Arise Pro" />
                                </div>
                            </Flex>
                        ))}
                    </div>
                    <div className={`cover-btn prev ${currentIndex === 0 ? 'disabled' : ''}`} onClick={handlePrev}>
                        <LeftIcon className="font-24" />
                    </div>
                    <div className={`cover-btn next ${currentIndex === coverGroups.length - 1 ? 'disabled' : ''}`} onClick={handleNext}>
                        <RightIcon className="font-24" />
                    </div>
                </div>
                <Flex className="cover-style" align="center">
                    <div className="font-w-600">风格:</div>
                    <Flex className="cover-style-list" gap={16}>
                        {styleList.map((style:any,index:number)=>{
                            return (
                                <Flex key={index} className={`cover-style-item ${style.styleName == currentStyle?.styleName ? 'active':''}`} onClick={()=>setStyle(style)}>
                                    <a className="paragraph" style={{color:"#474F5E"}}>
                                        <div className="style-color" style={{background:style.styleConfig.color}}></div>
                                        <div className="style-info">
                                            <p className="title font-14 font-w-500">{style.styleConfig.title}</p>
                                            <p className="desc font-12 font-w-400">{style.category}</p>
                                        </div>
                                    </a>
                                </Flex>
                            )
                        })}
                    </Flex>
                </Flex>
            </div>
            <div style={{backgroundColor:"#FFF"}}>
                <Flex className="features" gap={32}>
                    {features.map(item=>(
                        <div className="features-item">
                            <div className="img-warp">
                                <img src={item.img} alt=""/>
                            </div>
                            <div className="detail">
                                <p className="title font-w-600 font-20">{item.title}</p>
                                <div className="desc color-474F5E">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </Flex>
            </div>
            {/*  */}
            <div style={{backgroundColor:"#FFF"}}>
                <div className="feature-list">
                    <div className="title font-w-600 font-24">主题功能</div>
                    <Row className="list">
                        {featureList.map(feature=>(
                            <Col span={6} className="item">
                                <p className="title font-w-600 font-20">{feature.title}</p>
                                <ul className="tag-list">
                                    {feature.tags.map(tag=>(
                                        <li className="paragraph font-w-400">{tag.text}</li>
                                    ))}
                                </ul>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div style={{backgroundColor:"#FFF",paddingBottom:"80px"}}>
                <div className="recommendation">
                    <div className="title font-24 font-w-600">更多主题推荐</div>
                    <Flex className="recommendation-list" gap={32}>
                        {recommendedTopics.map((topic,index)=>(
                            <div className="recommendation-item">
                                <a className="card-img">
                                    <img className="img-cover" src="https://img.myshopline.com/image/shopline/550800a871004b6db29c5ee651c0d79f.png" />
                                </a>
                                <div className="card-info">
                                    <Flex justify="space-between">
                                        <p className="card-info-title font-w-600">{topic.template_name}</p>
                                        <p className="card-info-version font-14 font-w-400">{topic.os_version}</p>
                                    </Flex>
                                    <Flex className="style-switch" gap={10}>
                                        {topic.styles.map(item=>(
                                            <div className="style-switch-item active"></div>
                                        ))}
                                    </Flex>
                                </div>
                            </div>
                        ))}
                    </Flex>
                </div>
            </div>
            {/*  */}
            {/* 使用 CSS 过渡而不是条件渲染来避免闪烁 */}
            <Fooder show={showFooder} />
        </Scoped>
    )
}

const Scoped = styled.div`
    background: #f7f8fb;
    font-size: 16px;
    .hero{
        margin: auto;
        max-width: 1280px;
        padding: 40px;
        .container{
            margin-bottom: 24px;
            .hero-info{
                .title{
                    margin-bottom: 2px;
                }
                .desc{
                    margin-bottom: 24px;
                }

                .price{
                    margin-bottom: 12px;
                }
                .developer{
                    margin-bottom: 24px;
                }
                .tag-list{
                    flex-wrap: wrap;
                    .tag-item{
                        font-size: 14px;
                        background-color: #f7f8fb;
                        border: 1px solid #d7dbe7;
                        border-radius: 4px;
                        padding: 4px 12px;
                    }
                }
            }
        }
        .cover-wrap{
            position: relative;
            padding: 20px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 24px 0 #959da533;
            margin-bottom: 24px;
            height: 580px;
            .cover{
                height: 100%;
                display: flex;
                overflow-x: auto;
                scrollbar-width: none;
                .cover-group{
                    flex: 0 0 100%; /* 不放大、不缩小、基础宽度1000px */
                    .cover-pc{
                        flex:3;
                        overflow-y: auto;
                    }
                    .cover-mobile{
                        flex:1;
                        overflow-y: auto;
                    }
                    img{
                        width: 100%;
                        object-fit: cover;
                        object-position: top;
                        border-radius: 8px;
                    }
                }
            }
            .cover-btn{
                position: absolute;
                top: 50%;
                width: 42px;
                height: 42px;
                background: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                &.disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            }
            .prev{
                left: -12px;
                transform: translate(-100%, -50%);
            }
            .next{
                right: -12px;
                transform: translate(100%, -50%);
            }
        }

        .cover-style{
            &-list{
                margin-left: 12px;
            }
            .active{
                border-color: #000;
            }
            &-item{
                background: #fff;
                border: 1px solid #d7dbe7;
                border-radius: 48px;
                height: 48px;
                cursor: pointer;
                padding: 4px 30px 4px 10px;
                &:hover{
                    border-color: #000;
                }
                .paragraph{
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .style-color{
                    
                    border-radius: 50%;
                    flex-shrink: 0;
                    height: 30px;
                    width: 30px;
                }
                .style-info{
                    .title,.desc{
                        margin-bottom: 0;
                    }
                }
                
            }
        }
    }

    .features{
        margin: auto;
        max-width: 1280px;
        padding: 40px;
        .features-item{
            flex: 1; /* 允许项目增长 */
            flex-basis: 33.33%;
            max-width: 33.33%; /* 限制最大宽度为父容器的 1/3 */
            .img-warp{
                border-radius: 12px;
                box-shadow: 0 1px 4px 0 #00000029;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .detail{
                margin-top: 16px;
                .title{
                    margin-bottom: 8px;
                }
            }
        }
    }
    .feature-list{
        margin: auto;
        max-width: 1280px;
        padding: 40px;
        .list{
            margin-top: 32px;
            .item{
                .title{
                    margin-bottom: 12px;
                }
                .tag-list{
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    .paragraph{
                        list-style-type: disc;
                        line-height: 24px;
                    }
                }
                
            }
        }
    }

    .recommendation{
        margin: auto;
        max-width: 1280px;
        padding: 40px;
        .recommendation-list{
            margin-top: 32px;
            .recommendation-item{
                flex-basis: 33.33%;
                max-width: 33.33%; /* 限制最大宽度为父容器的 1/3 */
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 1px 4px 0 #00000029;
                overflow: hidden;
                transition: all .2s;
                .card-img{
                    position: relative;
                    display: block;
                    overflow: hidden;
                    padding-bottom: 100%;
                    .img-cover{
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                        object-position: top;
                        transition: all .2s;
                    }
                }
                .card-info{
                    padding: 12px 16px;
                    border-top: 1px solid #eef1f6;

                    .card-info-title,.card-info-version{
                        margin-bottom: 0px;
                    }

                    .style-switch{
                        margin-top: 8px;
                        .active{
                            box-shadow: 0 0 0 1px currentColor;
                            /*  */
                            border: 2px solid #fff;
                        }
                        .style-switch-item{
                            height: 16px;
                            width: 16px;
                            background-color: currentColor;
                            border-radius: 50%;
                            box-sizing: initial;
                            cursor: pointer;
                            transition: all .2s;
                        }
                    }
                }
            }
        }


    }

    // 添加 Fooder 包装器的样式
    /* .fooder{
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(100%);
        position: fixed;
        bottom: 0;
        z-index: 1000;
        pointer-events: none; // 隐藏时不影响页面交互
        &.show {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto; // 显示时可以交互
        }
    } */
`

export default Styles;