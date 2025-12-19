import { Card, Flex } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import cookie from 'react-cookies';
import categories from "@/store/product/categories";
import SEOEdit from "@/pages/Components/SEOEdit";

 function SEOCard(){

    // 预览域名
    const previewDomain = '.'+(JSON.parse(localStorage.getItem("MC_DATA_PLATFORM_INFO") || '{}')?.preview_domain || '');

    const previewPrefix = `https://${cookie.load("domain").second_domain}${previewDomain}/collections/`;

    const setSEO = (title:string,description:string,keyword:string,handle:string,url:string)=>{
        categories.setCategoriesInfo({
            ...categories.categoriesInfo,
            meta_title:title,
            meta_description:description,
            meta_keyword:keyword,
            handle:handle,
        })
    }

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">搜索引擎优化</span>
                    <span className="more">
                        <SEOEdit seo={categories.categoriesInfo} setSEO={setSEO} previewPrefix={previewPrefix} />
                    </span>
                </div>
                <Flex className="webUrl">{`${previewPrefix}${categories.categoriesInfo.handle?categories.categoriesInfo.handle.replace(new RegExp(" ","gm"),"-"):categories.categoriesInfo.title.replace(new RegExp(" ","gm"),"-")}`}</Flex>
                <div className="webTitle">{categories.categoriesInfo.meta_title==""?(categories.categoriesInfo.title==""?"未填写标题":categories.categoriesInfo.title):categories.categoriesInfo.meta_title}</div>
                {/* 未填写标题 */}
                <div className="webDesc">{categories.categoriesInfo.meta_description==""?(categories.categoriesInfo.content==""?"未填写描述":categories.categoriesInfo.content.replace(/<[^>]*>/g,"")):categories.categoriesInfo.meta_description}</div>
            </Card>
        </Scoped>
    )
}
export default observer(SEOCard)

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
    word-break: break-all;
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

