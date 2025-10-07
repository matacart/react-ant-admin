import MyButton from "@/components/Button/MyButton";
import { RightIcon } from "@/components/Icons/Icons";
import MyInput from "@/components/Input/MyInput";
import { Carousel, Col, Flex, Form, Row } from "antd";
import { useEffect, useRef } from "react";
import styled from "styled-components";

function Main({templateData}:{templateData:any}){

    const mRef = useRef<any>(null);

    const mRef2 = useRef<any>(null);
    const tab = (ref:any)=>{
        const tabs = ref.current.querySelectorAll('.tab');

        const block = ref.current.querySelectorAll('.collection-block');

        // 默认激活第一个
        if (tabs.length > 0) {
            tabs.forEach((tab:any) => tab.classList.remove('active'));
            tabs[0].classList.add('active');
            block[0].classList.add('fade-in');
        }

        let isAnimating = false;
        // 单击
        const handleClick = (e:any,index:number) => {
            if (isAnimating) return; // 🔒 锁住动画
            isAnimating = true;

            tabs.forEach((tab:any) => tab.classList.remove('active'));
            e.currentTarget.classList.add('active');

            block.forEach((tab:any,itemIndex:number) => {
                itemIndex == index ? tab.classList.add('fade-in') : tab.classList.remove('fade-in');
            });

            // 动画结束后解锁
            setTimeout(() => {
                isAnimating = false;
            }, 500); // 和 CSS 中的 animation 时间一致
        };
        tabs.forEach((tab:any,index:number) => tab.addEventListener('click', (e:any)=>handleClick(e,index)));

        return () => {
            tabs.forEach((tab:any) => tab.removeEventListener('click', handleClick));
        };
    }

    useEffect(() => {
        // console.log(templateData);
    }, []);

    return (
        <Scoped>
            {templateData.order.map((block_order:string)=>{
                // console.log(templateData.sections[block_order]);
                switch (templateData.sections[block_order].type) {
                    case "featured-slideshow":
                        return (
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
                        return (
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
                        return (
                            <div className="featured-collection" ref={mRef}>
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
                    case "text-with-image":
                        return (
                            <div className="text-with-image">
                                <Flex className="container1" align="center" gap={120}>
                                    <div className="text">
                                        <div className="title">Image with text</div>
                                        <a className="botton">
                                            Optional button
                                        </a>
                                    </div>
                                    <div className="image">
                                        <img src="/img/blank_img.svg" />
                                    </div>
                                </Flex>
                                <Flex className="container2" align="center" gap={120}>
                                    <div className="image">
                                        <img src="/img/blank_img.svg" />
                                    </div>
                                    <div className="text">
                                        <div className="title">Pair text with an image to focus on your chosen product, collection, or blog post. Add details on availability, style, or even provide a review.</div>
                                    </div>
                                </Flex>
                            </div>
                        )
                    case "section-video":
                        return (
                            <div className="section-video">
                                <img src="/img/blank_img.svg" />
                            </div>
                        )
                    case "featured-collection2":
                        return (
                            <div className="featured-collection2" ref={mRef2}>
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
                        return (
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
                        return (
                            <div className="blog">
                                <h2 className="title">Blogs</h2>
                                <div className="blogs">
                                    <div className="blogs-item">
                                        <div className="image">
                                            <img src="/img/blank_img.svg" />
                                        </div>
                                        <div className="main">
                                            <div className="info">
                                                <h4 className="title">Blog post</h4>
                                                <Flex className="extra-info" justify="center">
                                                    <span>Jun 1, 2023</span>
                                                    <span className="separator">·</span>
                                                    <span>author</span>
                                                </Flex>
                                                <p className="description">Give your customers a summary of your blog post</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blogs-item">
                                        <div className="image">
                                            <img src="/img/blank_img.svg" />
                                        </div>
                                        <div className="main">
                                            <div className="info">
                                                <h4 className="title">Blog post</h4>
                                                <Flex className="extra-info" justify="center">
                                                    <span>Jun 1, 2023</span>
                                                    <span className="separator">·</span>
                                                    <span>author</span>
                                                </Flex>
                                                <p className="description">Give your customers a summary of your blog post</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blogs-item">
                                        <div className="image">
                                            <img src="/img/blank_img.svg" />
                                        </div>
                                        <div className="main">
                                            <div className="info">
                                                <h4 className="title">Blog post</h4>
                                                <Flex className="extra-info" justify="center">
                                                    <span>Jun 1, 2023</span>
                                                    <span className="separator">·</span>
                                                    <span>author</span>
                                                </Flex>
                                                <p className="description">Give your customers a summary of your blog post</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blogs-item">
                                        <div className="image">
                                            <img src="/img/blank_img.svg" />
                                        </div>
                                        <div className="main">
                                            <div className="info">
                                                <h4 className="title">Blog post</h4>
                                                <Flex className="extra-info" justify="center">
                                                    <span>Jun 1, 2023</span>
                                                    <span className="separator">·</span>
                                                    <span>author</span>
                                                </Flex>
                                                <p className="description">Give your customers a summary of your blog post</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blogs-item">
                                        <div className="image">
                                            <img src="/img/blank_img.svg" />
                                        </div>
                                        <div className="main">
                                            <div className="info">
                                                <h4 className="title">Blog post</h4>
                                                <Flex className="extra-info" justify="center">
                                                    <span>Jun 1, 2023</span>
                                                    <span className="separator">·</span>
                                                    <span>author</span>
                                                </Flex>
                                                <p className="description">Give your customers a summary of your blog post</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Flex className="collection-list-more" style={{marginTop:"40px"}} justify="center">
                                    <MyButton text={"View all"} style={{height:"40px",backgroundColor:"#000",color:"#FFF",fontWeight:"500"}}  />
                                </Flex>
                            </div>
                        )
                    case "sign-up-and-save":
                        return (
                            <div className="sign-up-and-save">
                                <h2 className="title">Sign up and save</h2>
                                <div className="desc">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</div>
                                <Flex justify="center" className="form">
                                    <Form>
                                        <Flex gap={12}>
                                            <MyInput style={{width:"260px",height:"48px"}}></MyInput>
                                            <MyButton text="Subscribe" style={{height:"48px",backgroundColor:"#000",color:"#FFF",fontWeight:"500"}}/>
                                        </Flex>
                                    </Form>
                                </Flex>
                            </div>
                        )
                }
            })}
            {/* Text columns with image */}
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

            {/* 轮播 */}
            {/* <Flex style={{marginTop:"24px"}} justify="center">
                <div style={{backgroundColor:"rgba(0,0,0)",borderRadius:"6px",height:"6px",width:"480px"}}></div>
            </Flex> */}
        </Scoped>
    )
}


const Scoped = styled.div`
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
    .featured-collection,.featured-collection2{
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

    .text-with-image{
        width: 100%;
        max-width: calc(60px + 1760px);
        padding: 80px 30px;
        margin: auto;

        .container1{
            .text{
                flex: 1 0 0%;
                .title{
                    margin-bottom: 16px;
                    font-size: 36px;
                    font-weight: 500;
                }
                .botton{
                    color:rgba(0, 0, 0);
                    font-size: 18px;
                    font-weight: 400;
                    padding-bottom: 8px;
                    position: relative;
                    &::after{
                        content: "";
                        position: absolute;
                        width: 100%;
                        height: 1px;
                        background-color: currentColor;
                        left: 50%;
                        bottom: 0;
                        transform: translateX(-50%);
                    }
                }
            }
            .image{
                flex: 1 0 0%;
                background-color: rgb(244, 247, 251);
                border-radius: 6px;
            }
        }
        .container2{
            .text{
                flex: 1 0 0%;
                .title{
                    font-size: 16px;
                    font-weight: 400;
                }
            }
            .image{
                margin-top: -100px;
                flex: 1 0 0%;
                background-color: rgb(244, 247, 251);
                border-radius: 6px;
            }
        }
    }

    .section-video{
        background-color: rgb(244, 247, 251);
        height: 70vh;
        text-align: center;
        img{
            height: 100%;
        }
    }

    .featured-collection2{
        .collection-tabs{
            margin-bottom: 50px;
            .active{
                background-color: rgb(0, 0, 0);
                color:rgb(205, 242, 77);
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

    .blog{
        width: 100%;
        max-width: calc(60px + 1760px);
        margin: auto;
        padding: 80px 30px;
        .title{
            margin-bottom: 40px;
            text-align: center;
            font-size: 36px;
        }
        .blogs{
            display: grid;
            grid-template-columns: repeat(4,1fr);
            .blogs-item{
                margin: 20px 10px 0 10px;
                .image{
                    margin-bottom: 20px;
                    background: rgb(244, 247, 251);
                    border-radius: 8px;
                }
                .main{
                    .info{
                        .title{
                            font-size: 22px;
                            margin-bottom: 0;
                        }
                        .extra-info{
                            margin:12px 0px;
                            font-size: 14px;
                            .separator{
                                margin: 0 12px;
                            }
                        }
                        .description{
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    .sign-up-and-save{
        width: 100%;
        max-width: calc(60px + 1760px);
        margin: auto;
        padding: 80px 30px;
        .title{
            font-size: 36px;
            text-align: center;
        }
        .desc{
            margin-top: 16px;
            font-size: 16px;
            text-align: center;
        }
        .form{
            margin-top: 16px;
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
`;


export default Main;