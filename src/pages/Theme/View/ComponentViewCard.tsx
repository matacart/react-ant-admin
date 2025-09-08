

import { useEffect, useState } from "react";
import sections from "../Editor/data/sections.json";
import styled from "styled-components";
import { Carousel, Col, Flex, Row } from "antd";
import MyButton from "@/components/Button/MyButton";
import { RightIcon } from "@/components/Icons/Icons";

function ComponentViewCard({componentData}:{componentData:any}){
    
    const [component,setComponent] = useState<any>({});

    useEffect(()=>{
        const newComponent = sections.data.list.filter(item=>item.type == componentData.componentType) || []
        if(newComponent.length > 0) {
            setComponent(newComponent[0])
        }
        console.log(newComponent)
    },[componentData])

    return(
        <Scoped>
            {(()=>{
                switch (component?.type) {
                    case "featured-slideshow":
                        return(
                            <div style={{backgroundColor:"rgba(44, 41, 36,0.6)"}}>
                                <Carousel autoplay draggable>
                                    <div>
                                        <div style={{position:"relative"}}>
                                            <img src="/img/banner.svg" />
                                            <div className="featured-slideshow color-FFFFFF" style={{position:"absolute",left:"80px",bottom:"80px"}}>
                                                <h2>
                                                    Highlight an<br/>image banner
                                                </h2>
                                                <span style={{border:"1px solid rgba(255,255,255,0.6)",borderRadius:"6px",display:"inline-block",padding:"8px 20px",marginTop:"40px"}}>Shop this</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{position:"relative"}}>
                                            <img src="/img/banner.svg" />
                                            <div className="featured-slideshow color-FFFFFF" style={{position:"absolute",left:"80px",bottom:"80px"}}>
                                                <h2>
                                                    Highlight an<br/>image banner
                                                </h2>
                                                <span style={{border:"1px solid rgba(255,255,255,0.6)",borderRadius:"6px",display:"inline-block",padding:"8px 20px",marginTop:"40px"}}>Shop this</span>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel>
                            </div>
                        )
                    case "collection-list":
                        return(
                            <div className="collection-list">
                                <h4 className="title">
                                    Collection list
                                </h4>
                                <div className="collection-list-container">
                                    <a className="collection-item-cover">
                                        <img style={{width:'100%'}} src="/img/clothing.svg" />
                                        <h5>Collection</h5>
                                    </a>
                                    <a className="collection-item-card">
                                        <div>
                                            <p className="title">Example collection</p>
                                            <span className="container">SHOP NOW</span>
                                        </div>
                                    </a>
                                    <a className="collection-item-card">
                                        <div>
                                            <p className="title">Example collection</p>
                                            <span className="container">SHOP NOW</span>
                                        </div>
                                    </a>
                                    <a className="collection-item-card">
                                        <div>
                                            <p className="title">Example collection</p>
                                            <span className="container">SHOP NOW</span>
                                        </div>
                                    </a>
                                    <a className="collection-item-card">
                                        <div>
                                            <p className="title">Example collection</p>
                                            <span className="container">SHOP NOW</span>
                                        </div>
                                    </a>
                                    <a className="collection-item-card">
                                        <div>
                                            <p className="title">Example collection</p>
                                            <span className="container">SHOP NOW</span>
                                        </div>
                                    </a>
                                </div>
                                <Flex className="collection-list-more" style={{marginTop:"40px"}} justify="center">
                                    <MyButton text={"View all"} style={{height:"40px",backgroundColor:"#000",color:"#FFF",fontWeight:"500"}}  />
                                </Flex>
                            </div>
                        )
                    case "featured-collection":
                        return(
                            <div className="featured-collection">
                                <div className="title">Featured collection</div>
                                <Flex className="collection-tabs" gap={20}>
                                    <div className="tab cursor-pointer">Collection</div>
                                    <div className="tab cursor-pointer">Collection</div>
                                    <div className="tab cursor-pointer">Collection</div>
                                </Flex>
                                <div className="collection-block">
                                    <Row gutter={[20,20]}>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="collection-block">
                                    <Row gutter={[20,20]}>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="collection-block">
                                    <Row gutter={[20,20]}>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={6}>
                                            <div className="card-main">
                                                <div className="card-inner">
                                                    <img src="/img/blank_img.svg" />
                                                    <div className="botton">
                                                        Sold out
                                                    </div>
                                                </div>
                                                <div className="card-content">
                                                    <h3 className="title">
                                                        Example Product Title
                                                    </h3>
                                                    <div className="content">
                                                        £19.99 GBP
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        )
                    case "picture-promotion":
                        return(
                            <Flex className="picture-promotion" gap={20}>
                                <div className="picture-promotion-image">
                                    <img src="/img/blank_img.svg" />
                                    <div className="text">
                                        <div className="title">BUY 3 get</div>
                                        <div className="sub">50% OFF</div>
                                    </div>
                                </div>
                                <div className="picture-promotion-image">
                                    <img src="/img/blank_img.svg" />
                                    <div className="text">
                                        <div className="title">BUY 3 get</div>
                                        <div className="sub">50% OFF</div>
                                    </div>
                                </div>
                            </Flex>
                        )
                    case "blog":
                        return(
                            <></>
                        )
                    case "video":
                        return(
                            <></>
                        )
                    case "sign-up-and-save":
                        return(
                            <></>
                        )
                    case "text-with-image":
                        return(
                            <></>
                        )
                    case "text-columns-with-image":
                        return(
                            <div className="text-columns-with-image">
                                <h2 className="title">Text columns with images</h2>
                                <Flex className="columns">
                                    {[0,1,2].map((item,index)=>{
                                        return (
                                            <div className="text-column">
                                                <div className="item">
                                                    <div className="title">Example title</div>
                                                    <div className="description">
                                                        Use this section to explain a set of product features, to link to a series of pages, or to answer common questions about your products. Add images for emphasis.
                                                    </div>
                                                    <a className="botton">
                                                        <span className="button-text">
                                                            Optional button
                                                        </span>
                                                        <span className="button-arrow">
                                                            <RightIcon />
                                                        </span>
                                                    </a>
                                                </div> 
                                            </div>
                                        )
                                    })}
                                    
                                </Flex>
                                <Flex style={{marginTop:"30px"}} justify="center">
                                    <MyButton text="Subscribe" style={{height:"48px",backgroundColor:"#000",color:"#FFF",fontWeight:"500"}}/>
                                </Flex>
                            </div>
                        )
                    case "slideshow":
                        return(
                            <></>
                        )
                    case "multi-media-splicing":
                        return(
                            <></>
                        )
                    case "multi-media-splicing":
                        return(
                            <></>
                        )
                    case "rich-text":
                        return(
                            <></>
                        )
                    case "image-with-text":
                        return(
                            <></>
                        )
                    case "image-banner":
                        return(
                            <></>
                        )
                    case "multilevel-filter":
                        return(
                            <></>
                        )
                    case "collection-list-new":
                        return(
                            <></>
                        )
                    case "featured-product":
                        return(
                            <></>
                        )
                    case "featured-recommend-products":
                        return(
                            <></>
                        )
                    case "shoppable-image":
                        return(
                            <></>
                        )
                    case "product-recently-viewed":
                        return(
                            <></>
                        )
                    case "count-down":
                        return(
                            <></>
                        )
                    case "contact-form":
                        return(
                            <></>
                        )
                    case "collapsible-content":
                        return(
                            <></>
                        )
                    case "icon-list":
                        return(
                            <></>
                        )
                    case "dividing-line":
                        return(
                            <></>
                        )
                    case "spacing":
                        return(
                            <></>
                        )
                    case "custom-html":
                        return(
                            <></>
                        )
                    case "custom-page":
                        return(
                            <></>
                        )
                }
                return (
                    <div>
                        <div>组件预览</div>
                    </div>
                )
            })()}
        </Scoped>
    )
}

const Scoped = styled.div`
    overflow: hidden;

    .collection-list{
        width: 100%;
        max-width: calc(60px + 1760px);
        margin: auto;
        padding: 80px 30px;
        .title{
            text-align: center;
            font-size: 30px;
        }
        .collection-list-container{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
            gap: 20px;
            .collection-item-cover{
                grid-row-end: span 2;
                position: relative;
                width: 100%;
                display: block;
                border-radius: 8px;
                overflow: hidden;
                padding: 20px;
                background-color: rgb(244, 247, 251);
                h5{
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 30px;
                    color: #000000;
                    width: 100%;
                    height: 100%;
                }
                
            }
            .collection-item-card{
                padding: 40px;
                min-height: 278px;
                background-color: rgb(244, 247, 251);
                border-radius: 8px;
                overflow: hidden;
                color:rgba(0, 0, 0);
                .title{
                    text-align: left;
                    font-size: 30px;
                    margin-bottom: 12px;
                }
                .container{
                    position: relative;
                    padding-bottom: 8px;
                    font-size: 18px;
                    &::after{
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        content: "";
                        width: 100%;
                        height: 1px;
                        background-color: currentColor;
                    }
                }
            }
        }
    }

    .picture-promotion{
        padding: 60px;
        .picture-promotion-image{
            background-color: rgb(244, 247, 251);
            flex: 1;
            min-width: 380px;
            text-align: center;
            position: relative;
            img{
                max-height: 700px;
            }
            .text{
                width: 100%;
                position: absolute;
                text-align: center;
                bottom: 40px;
                left: 0;
                color:#FFFFFF;
                .title{
                    font-size: 70px;
                    font-weight: 600;
                    -webkit-text-stroke-color: #000000;
                    -webkit-text-stroke-width: 0.02em;
                }
                .sub{
                    font-size: 110px;
                    font-weight: 600;
                    -webkit-text-stroke-color: #000000;
                    -webkit-text-stroke-width: 0.02em;
                }
            }
        }
    }

    .text-columns-with-image{
        width: 100%;
        max-width: calc(60px + 1760px);
        margin: auto;
        padding: 80px 30px;
        .title{
            text-align: center;
            margin-bottom: 30px;
        }
        .columns{
            .text-column{
                @media screen and (min-width: 960px) {
                    flex: 0 0 auto;
                    width: 33.3333333333%;
                }
                .item{
                    padding: 24px;
                    background: #FFF;
                    .title{
                        text-align: left;
                        font-weight: 500;
                        margin-bottom: 14px;
                        font-size: 24px;
                    }
                    .description{
                        margin-bottom: 14px;
                    }
                    .botton{
                        font-size: 14px;
                        color: #000000;
                        display: flex;
                        gap: 6px;
                        align-items: center;
                    }
                }
            }
        }
    }

    .featured-collection{
        width: 100%;
        max-width: calc(60px + 1760px);
        padding: 80px 30px;
        margin: auto;
        .title{
            margin-bottom: 40px;
            font-size: 36px;
            font-weight: 500;
        }
        .collection-tabs{
            margin-bottom: 50px;
            .tab{
                padding: 12px 24px;
                background-color: rgb(248, 248, 248);
                color:rgb(104, 104, 104);
                border-radius: 4px;
            }
            .active{
                background-color: rgb(225, 228, 232);
                color:rgb(0, 0, 0);
            }
        }
        .collection-block {
            display: none;
            opacity: 0;
        }

        .collection-block.fade-in{
            opacity: 1;
            display: block;
            animation: fadeIn 0.5s forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .card-main{
            .card-inner{
                position: relative;
                background-color: rgb(244, 247, 251);
                margin-bottom: 20px;
                border-radius: 6px;
                .botton{
                    padding: 6px 10px;
                    position: absolute;
                    bottom: 8px;
                    left: 8px;
                    border-radius: 4px;
                    background-color: #000000;
                    color:#FFFFFF;
                    font-weight: 500;
                }
            }

            .card-content{
                .title{
                    text-align: center;
                    margin-bottom: 12px;
                    font-size: 16px;
                    font-weight: 400;
                }
                .content{
                    text-align: center;
                    font-weight: 500;
                    font-size: 16px;
                }
            }
        }
    }

`

export default ComponentViewCard;