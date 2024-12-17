// import globalStore from "@/store/globalStore"
// import newStore from "@/store/newStore"
// import { Card } from "antd"
// import { observer } from "mobx-react"
// import styled from "styled-components"

import { Card } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import oldStore from "@/store/oldStore"
import newCategories from "@/store/categories/newCategories"
import cookie from 'react-cookies';

 function NewSeo(){
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">搜索引擎优化</span>
                    <span className="more">
                        {/* <SEOEdit seo={newCategories}/> */}
                    </span>
                </div>
                <div className="webUrl">{cookie.load("domain")?.domainName}</div>
                <div className="webTitle">{newCategories.metaTitle==""?(newCategories.title==""?"未填写标题":newCategories.title):newCategories.metaTitle}</div>
                {/* 未填写标题 */}
                <div className="webDesc">{newCategories.metaDescription==""?(newCategories.content==""?"未填写描述":newCategories.content?.replace(/<[^>]*>/g,"")):newCategories.metaDescription}</div>
            </Card>
        </Scoped>
    )
}
export default observer(NewSeo)

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

