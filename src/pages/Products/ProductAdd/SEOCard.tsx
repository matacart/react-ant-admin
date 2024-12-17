// import globalStore from "@/store/globalStore"
// import newStore from "@/store/newStore"
// import { Card } from "antd"
// import { observer } from "mobx-react"
// import styled from "styled-components"

import { Card } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import newStore from "@/store/newStore";
import SEOEdit from "../components/SEOEdit";

 function SEOCard(){
    
    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">搜索引擎优化</span>
                    <span className="more">
                        <SEOEdit seo={newStore}/>
                    </span>
                </div>
                <div className="webUrl">{cookie.load("domain").domainName}</div>
                <div className="webTitle">{newStore.metaTitle==""?(newStore.title==""?"未填写标题":newStore.title):newStore.metaTitle}</div>
                {/* 未填写标题 */}
                <div className="webDesc">{newStore.metaDescription==""?(newStore.content==""?"未填写描述":newStore.content?.replace(/<[^>]*>/g,"")):newStore.metaDescription}</div>
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

