import { Space, Select, Input, Tag, Button, ConfigProvider, Flex } from "antd";
import { useEffect, useRef, useState } from "react"
import { selectTags } from "@/services/y2/api";
import PriceRangeSelector from "@/components/Select/PriceRangeSelector";
import styled from "styled-components";
import DropdownSort from "@/components/Dropdown/DropdownSort";
import cookie from 'react-cookies';
import MySelect from "@/components/Select/MySelect";
import MySearch from "@/components/Input/MySearch";
import LangSelect from "@/pages/components/LangSelect";
import productList from "@/store/product/productList";
import { observer } from "mobx-react-lite";
import CommodityClassificationSelector from "./CommodityClassificationSelector";
import TagSelector from "./TagSelector";

const { Search } = Input;


// type TagRender = SelectProps['tagRender'];
const ProductsSelectCard = ()=>{

    const [searchType,setSearchType] = useState("SEARCH_TXT");
    const [searchText,setSearchText] = useState("");

    const [min,setMin] = useState();
    const [max,setMax] = useState();
    
    // 语言选择
    const setLang = (value: string) => {
        productList.setLanguagesId(value)
    };
    
    let str = ""

    return (
        <Scoped> 
            <div className="products-select" >
                <div className="products-select-items-wrap" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px 12px',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                }}>
                    <div className="products-select-items-left" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px 12px',
                    }}>
                        {/* 搜索 */}
                        <Space.Compact style={{width:"420px"}}>
                            <MySelect value={searchType} options={[
                                { value: "SEARCH_TXT", label: '全部' },
                                { value: "PRODUCT_MODEL", label: '商品型号' },
                                { value: "PRODUCT_NAME", label: '商品名称' },
                                { value: "PRODUCT_SKU", label: '商品SKU' },
                                { value: "BRAND_NAME", label: '商品厂商' },
                            ]} style={{height:"36px",minWidth:"110px"}} onChange={(value:string)=>{
                                setSearchType(value)
                            }} />
                            <MySearch placeholder="搜索" value={searchText}
                                onChange={(e:any)=>{
                                    setSearchText(e.target.value)
                                }} 
                                onSearch={(value:string)=>{
                                    productList.setCondition({
                                        ...productList.condition,
                                        searchType:searchType,
                                        keyword:value,
                                    })
                                }} 
                            />
                        </Space.Compact>
                        {/* 2 */}
                        <CommodityClassificationSelector />
                        {/* 标签 */}
                        <TagSelector/>
                        {/* 数量 */}
                        <TagSelector/>
                    </div>
                    <div
                        className="products-select-items-right"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px 12px',
                        }}>
                        {/*  */}
                        <LangSelect isLabel={true} lang={productList.languagesId} setLang={setLang} />
                        {/* 5 */}
                        {/* <MoreSelect /> */}
                        {/* 6 */}
                        {/* <EditTableHead /> */}
                        {/* 7 */}
                        <DropdownSort items={
                            [
                                { key: '0', label: <a onClick={()=>{
                                    productList.setSortCondition({
                                        ...productList.sortCondition,
                                        sortField:"TITLE",
                                        sortType:"ASC"
                                    })
                                }}>商品名称（A-Z）</a> },
                                { key: '1', label: <a onClick={()=>{
                                    productList.setSortCondition({
                                        ...productList.sortCondition,
                                        sortField:"TITLE",
                                        sortType:"DESC"
                                    })
                                }}>商品名称（Z-A）</a> },
                                { key: '2', label: <a onClick={()=>{
                                    productList.setSortCondition({
                                        ...productList.sortCondition,
                                        sortField:"STOCK",
                                        sortType:"ASC"
                                    })
                                }}>库存（从低到高）</a> },
                                { key: '3', label: <a onClick={()=>{
                                    productList.setSortCondition({
                                        ...productList.sortCondition,
                                        sortField:"STOCK",
                                        sortType:"DESC"
                                    })
                                }}>库存（从高到低）</a> },
                                { key: '4', label: <a onClick={()=>{
                                    productList.setSortCondition({
                                        ...productList.sortCondition,
                                        sortField:"SKU_MIN_PRICE",
                                        sortType:"ASC"
                                    })
                                }}>售价（从低到高）</a> },
                                { key: '5', label: <a onClick={()=>{
                                    productList.setSortCondition({
                                        ...productList.sortCondition,
                                        sortField:"SKU_MIN_PRICE",
                                        sortType:"DESC"
                                    })
                                }}>售价（从高到低）</a> },
                                { key: '6', label: <a onClick={()=>{
                                    productList.setSortCondition({
                                        ...productList.sortCondition,
                                        sortField:"CREATE_TIME",
                                        sortType:"ASC"
                                    })
                                }}>创建时间（从远到近）</a> },
                                { key: '7', label: <a onClick={()=>{
                                    productList.setSortCondition({
                                        ...productList.sortCondition,
                                        sortField:"CREATE_TIME",
                                        sortType:"DESC"
                                    })
                                }}>创建时间（从近到远）</a> },
                                { key: '7', label: <a onClick={()=>{
                                    productList.setSortCondition({
                                        ...productList.sortCondition,
                                        sortField:"UPDATE_TIME",
                                        sortType:"ASC"
                                    })
                                }}>更新时间（从远到近）</a> },
                                { key: '7', label: <a onClick={()=>{
                                    productList.setSortCondition({
                                        ...productList.sortCondition,
                                        sortField:"UPDATE_TIME",
                                        sortType:"DESC"
                                    })
                                }}>更新时间（从近到远）</a> },
                            ]
                        } styled={{maxHeight:"290px",overflowY:"auto"}} />
                    </div>
                </div>
            </div>
            {/* 标签 */}
            <Flex style={{marginBottom:"10px"}}>
                  {productList.condition.keyword !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
                        productList.setCondition({
                            ...productList.condition,
                            searchType:"SEARCH_TXT",
                            keyword:"",
                        })
                        setSearchType("SEARCH_TXT")
                        // 清空输入框
                        setSearchText("")
                  }}>
                      <span className="color-474F5E font-14">
                        {
                            productList.condition.searchType == "SEARCH_TXT"?"全部"
                            :productList.condition.searchType == "PRODUCT_MODEL"?"商品型号"
                            :productList.condition.searchType == "PRODUCT_NAME"?"商品名称"
                            :productList.condition.searchType == "PRODUCT_SPU"?"商品SPU"
                            :productList.condition.searchType == "PRODUCT_SKU"?"商品SKU"
                            :productList.condition.searchType == "BRAND_NAME"?"商品厂商"
                            :productList.condition.searchType == "BARCODE"?"商品条码"
                            :productList.condition.searchType == "ATTRIBUTE_VALUE"?"规格名称"
                            :productList.condition.searchType == "DESCRIPTION"?"商品描述"
                            :""
                        }
                        ：{productList.condition.keyword}
                      </span>
                  </Tag>}

                  {productList.condition.sortationId !== "" && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
                    productList.setCondition({
                        ...productList.condition,
                        sortationId:"",
                    })
                  }}>
                      <span className="color-474F5E font-14">
                        商品分类：{productList.condition.sortationId}
                      </span>
                  </Tag>}
                  {(productList.condition.startPrice !== 0 && productList.condition.endPrice!==0) && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
                    productList.setCondition({
                        ...productList.condition,
                        startPrice:0,
                        endPrice:0,
                    })
                    setMin(undefined)
                    setMax(undefined)
                  }}>
                      <span className="color-474F5E font-14">
                        价格区间：{cookie.load("symbolLeft") || ""}{productList.condition.startPrice} ～ {cookie.load("symbolLeft") || ""}{productList.condition.endPrice}
                      </span>
                  </Tag>}
            </Flex>
        </Scoped>
    );
}
export default observer(ProductsSelectCard)

const Scoped = styled.div`
    .ant-input{
        height: 36px;
    }
    .ant-btn{
        height: 36px;
    }
`;
