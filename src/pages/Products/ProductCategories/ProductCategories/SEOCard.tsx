import { Card } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import cookie from 'react-cookies';
import SEOEditSecond from "@/pages/components/SEOEditSecond";
import categories from "@/store/product/categories";
import SEOEdit from "@/pages/components/SEOEdit";

 function SEOCard(){
    const setSEO = (title:string,description:string,keyword:string,url:string)=>{
        categories.setCategoriesInfo({
            ...categories.categoriesInfo,
            meta_title:title,
            meta_description:description,
            meta_keyword:keyword
        })
    }

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">搜索引擎优化</span>
                    <span className="more">
                        <SEOEdit seo={categories.categoriesInfo} setSEO={setSEO} type="c" />
                    </span>
                </div>
                <div className="webUrl">{cookie.load("domain")?.domain_name}</div>
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

