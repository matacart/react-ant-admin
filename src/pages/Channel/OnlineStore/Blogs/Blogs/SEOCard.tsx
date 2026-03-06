import { Card, Flex } from "antd"
import styled from "styled-components"
import cookie from 'react-cookies';
import SEOEdit from "./SEOEdit";
import blogs from "@/store/channel/blogs/blogs";
import { getPrimaryDomain } from "@/utils/dataStructure";


 function SEOCard(){

    const parmainDomain = getPrimaryDomain();
        
    const previewPrefix = parmainDomain ? `${parmainDomain}/pages/`: "";
    const setSEO = (title:string,description:string,keyword:string,handle:string,url:string)=>{
        blogs.setBlogs({
            ...blogs.blogs,
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
                        <SEOEdit seo={blogs.blogs} setSEO={setSEO} previewPrefix={previewPrefix} />
                    </span>
                </div>
                <Flex className="webUrl">{`${previewPrefix}${blogs.blogs.handle?blogs.blogs.handle.replace(new RegExp(" ","gm"),"-"):blogs.blogs.category_name.replace(new RegExp(" ","gm"),"-")}`}</Flex>
                <div className="webUrl">{cookie.load("domain").domainName}</div>
                <div className="webTitle">{blogs.blogs.meta_title==""?(blogs.blogs.category_name==""?"未填写标题":blogs.blogs.category_name):blogs.blogs.meta_title}</div>
                <div className="webDesc">{blogs.blogs.meta_description==""?"未填写描述":blogs.blogs.meta_description}</div>
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

