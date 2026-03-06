import { Card, Flex } from "antd"
import styled from "styled-components"
import cookie from 'react-cookies';
import articles from "@/store/channel/articles/articles";
import SEOEdit from "./SEOEdit";
import { getPrimaryDomain } from "@/utils/dataStructure";

function SEOCard(){

    const parmainDomain = getPrimaryDomain();
    
    const previewPrefix = parmainDomain ? `${parmainDomain}/blogs/`: "";
    const setSEO = (title:string,description:string,keyword:string,handle:string,url:string)=>{
        articles.setArticles({
            ...articles.articles,
            meta_title:title,
            meta_description:description,
            meta_keywords:keyword,
            handle:handle,
        })
    }

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">搜索引擎优化</span>
                    <span className="more">
                        <SEOEdit seo={articles.articles} setSEO={setSEO} previewPrefix={previewPrefix} />
                    </span>
                </div>
                <Flex className="webUrl">{`${previewPrefix}${articles.articles.handle?articles.articles.handle.replace(new RegExp(" ","gm"),"-"):articles.articles.title.replace(new RegExp(" ","gm"),"-")}`}</Flex>
                <div className="webUrl">{cookie.load("domain").domainName}</div>
                <div className="webTitle">{articles.articles.meta_title==""?(articles.articles.title==""?"未填写标题":articles.articles.title):articles.articles.meta_title}</div>
                <div className="webDesc">{articles.articles.meta_description==""?"未填写描述":articles.articles.meta_description}</div>
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
    word-break: break-all;
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

