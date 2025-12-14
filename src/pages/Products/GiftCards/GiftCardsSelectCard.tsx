import { Space, Select, Input, Tag, Button, Flex } from "antd";
import { useEffect, useState } from "react"
import PriceRangeSelector from "@/components/Select/PriceRangeSelector";
import MoreSelect from "@/components/Select/MoreSelect";
import styled from "styled-components";
import DropdownSort from "@/components/Dropdown/DropdownSort";
import cookie from 'react-cookies';
import { SearchOutlined } from "@ant-design/icons";
import MyDropdown from "@/components/Dropdown/MyDropdown";
import GiftCardsTableCard from "./GiftCardsTableCard";

const { Search } = Input;
// type TagRender = SelectProps['tagRender'];
export default function GiftCardsSelectCard(){
    // 默认语言
    const [language, setLanguage] = useState("2");
    const [languageData, setLanguageData] = useState([]);
    
    let timeTags:object[] = [];
   
    useEffect(()=>{
        // 添加语言
        let tempList = [];
        if(languageData.length==0){
            tempList = JSON.parse(sessionStorage["languages"] || "[]").map((item:any)=>{
                // console.log(item.code)
                // console.log(item.code == cookie.load("default_lang"))
                item.code == cookie.load("default_lang") && setLanguage(item.id)
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setLanguageData(tempList)
        };
        if(timeTags.length == 0){
            // getTags(language)
        }
    },[])
    
    // 语言选择
    const languageChange= (value: string) => {
        setLanguage(value)
    };
    
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
                        {/* style={{height:"36px"}} */}
                        <div>
                            <Input style={{height:"36px",width:"320px"}} prefix={<SearchOutlined />} placeholder="搜索代码/客户" />
                        </div>
                        {/* 状态 */}
                        <MyDropdown
                            tiggerEle={<Button style={{ height:"36px",width:"140px" }}>
                                <Flex justify="space-between" align="center" style={{width:"100%"}}>
                                    <div className='color-474F5E'>状态</div>
                                    <img src="/icons/Suffix1.svg" />
                                </Flex>
                            </Button>}
                            menu={{
                                items:[
                                    {
                                        key: "1", label: (
                                            <div onClick={() => { } }>已启用</div>
                                        )
                                    },
                                    {
                                        key: "2", label: (
                                            <div onClick={() => { } }>即将过期</div>
                                        )
                                    },
                                    {
                                        key: "3", label: (
                                            <div onClick={() => { } }>已过期</div>
                                        )
                                    },
                                    {
                                        key: "4", label: (
                                            <div onClick={() => { } }>已禁用</div>
                                        )
                                    }
                                ]
                            }}
                        />
                        {/*  */}
                        <MyDropdown
                            tiggerEle={<Button style={{ height:"36px",width:"140px" }}>
                                <Flex justify="space-between" align="center" style={{width:"100%"}}>
                                    <div className='color-474F5E'>余额</div>
                                    <img src="/icons/Suffix1.svg" />
                                </Flex>
                            </Button>}
                            menu={{
                                items:[
                                    {
                                        key: "1", label: (
                                            <div onClick={() => { } }>满余额或部分余额</div>
                                        )
                                    },
                                    {
                                        key: "2", label: (
                                            <div onClick={() => { } }>满余额</div>
                                        )
                                    },
                                    {
                                        key: "3", label: (
                                            <div onClick={() => { } }>部分余额</div>
                                        )
                                    },
                                    {
                                        key: "4", label: (
                                            <div onClick={() => { } }>无余额</div>
                                        )
                                    }
                                ]
                            }}
                        />
                        {/* 4 价格区间 */}
                        <PriceRangeSelector />
                    </div>
                    <div
                        className="products-select-items-right"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px 12px',
                        }}>
                        {/* 语言 */}
                        <Select 
                            // defaultValue={language}
                            value={language}
                            className="font-14"
                            style={{ width: 100,height:36 }}
                            listHeight={230}
                            onChange={languageChange}
                            options={languageData}
                            />
                        {/* 5 */}
                        <MoreSelect />
                        {/* 7 */}
                        <DropdownSort items={
                            [
                                { value: '商品名称（A-Z）', label: '商品名称（A-Z）' },
                                { value: '商品名称（Z-A）', label: '商品名称（Z-A）' },
                                { value: '库存（从低到高）', label: '库存（从低到高）' },
                                { value: '库存（从高到低）', label: '库存（从高到低）' },
                                { value: '售价（从低到高）', label: '售价（从低到高）' },
                                { value: '售价（从高到低）', label: '售价（从高到低）' },
                                { value: '创建时间（从远到近）', label: '创建时间（从远到近）' },
                                { value: '创建时间（从近到远）', label: '创建时间（从近到远）' },
                            ]
                        } styled={{maxHeight:"290px",overflowY:"auto"}} />
                    </div>
                </div>
            </div>
            {language && <GiftCardsTableCard selectProps={{language:language,title:"123",model:"213",tags:"213"}}  />}
        </Scoped>
    );
}

const Scoped = styled.div`
    .ant-btn{
        height: 36px;
    }
`;
