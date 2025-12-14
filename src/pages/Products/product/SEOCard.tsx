import { Card, Flex } from "antd"
import { observer } from "mobx-react-lite"
import styled from "styled-components"
import cookie from 'react-cookies';
import SEOEdit from "@/pages/components/SEOEdit";
import product from "@/store/product/product";

 function SEOCard(){

    // 预览域名
    const previewDomain = '.'+(JSON.parse(localStorage.getItem("MC_DATA_PLATFORM_INFO") || '{}')?.preview_domain || '');

    const previewPrefix = `https://${cookie.load("domain").second_domain}${previewDomain}/products/`;

    const setSEO = (title:string,description:string,keyword:string,handle:string,url:string)=>{

        product.setProductInfo({
            ...product.productInfo,
            meta_title:title,
            meta_description:description,
            meta_keyword:keyword,
            handle:handle,
            product_url:url
        })
    }

    return (
        <Scoped>
            <Card className="gap">
                <div className="header">
                    <span className="title">搜索引擎优化</span>
                    <span className="more">
                        <SEOEdit seo={product.productInfo} setSEO={setSEO} previewPrefix={previewPrefix} />
                    </span>
                </div>
                <Flex className="webUrl">{`${previewPrefix}${product.productInfo.handle?product.productInfo.handle.replace(new RegExp(" ","gm"),"-"):product.productInfo.title.replace(new RegExp(" ","gm"),"-")}`}</Flex>
                <div className="webTitle">{product.productInfo.meta_title==""?(product.productInfo.title==""?"未填写标题":product.productInfo.title):product.productInfo.meta_title}</div>
                {/* 未填写标题 */}
                <div className="webDesc">{product.productInfo.meta_description==""?"未填写描述":product.productInfo.meta_description}</div>
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

