import { Card } from "antd"
import styled from "styled-components"
import cookie from 'react-cookies';
import articles from "@/store/channel/website/articles";
import SEOEdit2 from "@/pages/components/SEOEdit2";


 function SEOCard(){

    const setSEO = (title:string,description:string,keyword:string,url:string)=>{
        articles.setNewArticles({
            ...articles.newArticles,
            metaTitle:title,
            metaDescription:description,
            metaKeywords:keyword,
            productUrl:url
        })
    }

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">搜索引擎优化</span>
                    <span className="more">
                        <SEOEdit2 seo={articles.newArticles} setSEO={setSEO} type="-a" />
                    </span>
                </div>
                <div className="webUrl">{cookie.load("domain").domainName}</div>
                <div className="webTitle">{articles.newArticles.metaTitle==""?(articles.newArticles.title==""?"未填写标题":articles.newArticles.title):articles.newArticles.metaTitle}</div>
                <div className="webDesc">{articles.newArticles.metaDescription==""?"未填写描述":articles.newArticles.metaDescription}</div>
            </Card>
        </Scoped>
    )
}
export default SEOCard

const Scoped = styled.div`
.gap{
    display: flex;
    flex-direction: column;
}
.header{
    display:flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .title{
        color: #000;
        font-size: 16px;
        font-weight:600;
    }
}
a{
    font-weight: 400;
}
.webUrl{
    font-size: 12px;
}
.webTitle{
    margin-top: 4px;
    margin-bottom: 0;
    color: #101aa4;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    -webkit-line-clamp: 2;
}
.webDesc{
    margin-top: 4px;
    margin-bottom: 0;
    color: #474f5e;
    font-size: 12px;
    -webkit-line-clamp: 3;
}`

