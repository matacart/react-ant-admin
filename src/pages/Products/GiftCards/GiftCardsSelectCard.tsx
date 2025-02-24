import { Space, Select, Input, Tag, Button, ConfigProvider } from "antd";
import type { SearchProps } from 'antd/es/input/Search';
import type { SelectProps } from 'antd';
import ProductListAjax from "@/pages/Products/ProductList/ProductListAjax";
import { useEffect, useState } from "react"
import { selectTags } from "@/services/y2/api";
import PriceRangeSelector from "@/components/Select/PriceRangeSelector";
import MoreSelect from "@/components/Select/MoreSelect";
import styled from "styled-components";
import DropdownSort from "@/components/Dropdown/DropdownSort";
import cookie from 'react-cookies';

const { Search } = Input;
// type TagRender = SelectProps['tagRender'];
export default function GiftCardsSelectCard(){
    // 默认语言
    const [language, setLanguage] = useState();
    const [languageData, setLanguageData] = useState([]);
    const [searchType,setSearchType] = useState(0);
    
    let timeTags:object[] = [];
    const [tags,setTags] = useState("");
    const [tagsList, setTagsList] = useState<object[]>([]);
   
    const [title,setTitle] = useState("");
    const [model,setModel] = useState("");
    // 标签列表
    const options: SelectProps['options'] = tagsList;
    const [openTagsList,setOpenTagsList] = useState(false);
    // 添加标签 
    function getTags(language:string){
        selectTags(language).then(res=>{
            // console.log(res)
            if(res.code == 0){
                res.data.forEach((element:any) => {
                    timeTags.push({
                        label: element.tag,
                        value: element.id
                    })
                });
                setTagsList(timeTags)
            }else if(res.code == 201){
                setTagsList([])
            }
        })
    }
    useEffect(()=>{
        // 添加语言
        let tempList = [];
        if(languageData.length==0){
            tempList = JSON.parse(sessionStorage["languages"]).map((item:any)=>{
                console.log(item.code)
                console.log(item.code == cookie.load("default_lang"))
                item.code == cookie.load("default_lang") && setLanguage(item.id)
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setLanguageData(tempList)
        };
        if(timeTags.length == 0){
            getTags(language)
        }
    },[])
    // 搜索 0 - 7
    const selectSearch = (value: number) => {
        // console.log(`selected ${value}`);
        setSearchType(value)
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        // console.log(info?.source, value);
        switch(searchType){
            case 0:
                console.log("search")
                break;
            case 1:
                console.log("search by name"+value)
                setTitle(value)
                break;
            case 2:
                console.log("search by spu")
                break;
            case 3:
                console.log("search by sku")
                break;
            case 4:
                console.log("search by manufacturer")
                break;
            case 5:
                console.log("search by barcode")
                break;
        }
    }
    
    // 语言选择
    const languageChange= (value: string) => {
        setLanguage(value)
        getTags(value)
    };
    
    let str = ""
    // 标签选择
    const handleTagChange = (value: string,option:any)=>{
        console.log(option)
        str = ""
        option.forEach((element:any) => {
            // console.log(element.label)
            str+=","+element.label
        });
        // setTags(str.slice(1))
    }
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
                        {/*  */}
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
                        {/* 6 */}
                        {/* <EditTableHead /> */}
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
            {/* {language && <ProductListAjax selectProps={{language:language,title:title,model:model,tags:tags}}  />} */}
        </Scoped>
    );
}

const Scoped = styled.div`
    .ant-input{
        height: 36px;
    }
    .ant-btn{
        height: 36px;
    }
`;
