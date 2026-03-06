import SearchInput from "@/components/Input/SearchInput";
import MySelect from "@/components/Select/MySelect";
import { Flex, Space } from "antd";
import type { MenuProps } from 'antd';
import React, { useState } from "react";
import { useEffect } from "react"
import CategoriesTable from "./CategoriesTable";
import categoriesList from "@/store/product/categoriesList";
import DropdownSort from "@/components/Dropdown/DropdownSort";
import { observer } from "mobx-react-lite";
import LangSelect from "@/components/Select/LangSelect";
import MySearch from "@/components/Input/MySearch";

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a>
          商品分类名称（A-Z）
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a>
          商品分类名称（Z-A）
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a>
          分类创建时间（从远到近）
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a>
          分类创建时间（从近到远）
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <a>
          分类关联商品数量（从低到高）
        </a>
      ),
    },
    {
      key: '6',
      label: (
        <a>
          分类关联商品数量（从高到低）
        </a>
      ),
    },
    {
      key: '7',
      label: (
        <a>
          更新时间（从近到远）
        </a>
      ),
    },
    {
      key: '8',
      label: (
        <a>
          更新时间（从远到近）
        </a>
      ),
    },
];

function CategoriesSelect(){

  const [searchType,setSearchType] = useState("SEARCH_NAME");
  const [searchText,setSearchText] = useState("");
  // 语言选择
  const setLang = (value: string) => {
    categoriesList.setLanguagesId(value)
  };

  useEffect(()=>{
      // 添加语言
  },[])
   
    return (
        <> 
            <div className="products-select" >
                <div className="products-select-items-wrap" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px 12px',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                }}>
                    <Flex gap={12}>
                      <Space.Compact style={{width:"420px"}}>
                        <MySelect value={searchType} options={[
                            { value: "SEARCH_NAME", label: '分类名称' },
                            { value: "SEARCH_ID", label: '分类ID' },
                     ]} style={{height:"36px",minWidth:"110px"}} onChange={(value:string)=>{
                            setSearchType(value)
                        }} />
                        <MySearch placeholder={searchType == "SEARCH_NAME" ? "搜索分类名称" : "搜索分类ID"} value={searchText}
                            onChange={(e:any)=>{
                                setSearchText(e.target.value)
                            }} 
                            onSearch={(value:string)=>{
                              
                            }} 
                        />
                    </Space.Compact>
                        <MySelect placeholder="类型" style={{height:"36px",width:"120px"}} options={[
                          {
                            value: '1',
                            label: '手动'
                          },
                          {
                            value: '2',
                            label: '智能'
                          },
                        ]} />
                    </Flex>
                    <Flex gap={12}>
                      <LangSelect lang={categoriesList.languagesId} setLang={setLang} />
                      <DropdownSort items={items} />
                    </Flex>
                </div>
            </div>
            <CategoriesTable />
        </>
    );
}

export default observer(CategoriesSelect)