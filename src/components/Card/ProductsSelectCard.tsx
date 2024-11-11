import { Space, Select, Input, Tag, Button } from "antd";
import type { SearchProps } from 'antd/es/input/Search';
import type { SelectProps } from 'antd';
import PriceRangeSelector from "../Select/PriceRangeSelector";
import MoreSelect from "../Select/MoreSelect";
// import { useEffect, useState } from 'react';
import ProductListAjax from "@/pages/Products/ProductList/ProductListAjax";

import { useEffect, useImperativeHandle, useState } from "react"
import { getLanguages } from "@/services/y2/api";
import { set } from "lodash";


const { Search } = Input;




type TagRender = SelectProps['tagRender'];


const options: SelectProps['options'] = [
    {
        value: 'gold',
        label: undefined
    },
    {
        value: 'lime',
        label: undefined
    },
    {
        value: 'green',
        label: undefined
    },
    {
        value: 'cyan',
        label: undefined
    },
];






const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <div>
            <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginInlineEnd: 4 }}
        >
            {label}
        </Tag>
        </div>
        
    );
};

export default function ProductsSelectCard(){
    const [language, setLanguage] = useState("2");
    const [languageData, setLanguageData] = useState([]);
    const [searchType,setSearchType] = useState(0);
    // const [selectProps,setSelectProps] = useState({
    //     languagesId: "2",
    //     title: "",
    //     model: ""
    // })
    const [title,setTitle] = useState("");
    const [model,setModel] = useState("");

    useEffect(()=>{
        let tempList = [];
        if(languageData.length==0){
            getLanguages().then(res=>{
                tempList = res.data.map((item:any)=>{
                    return {
                        value: item.id,
                        label: item.name
                    }
                })
                // console.log(tempList);
                setLanguageData(tempList)
            })
        }
    })
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
    };
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
                    <div className="products-select-items-left" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px 12px',
                    }}>
                        <Space.Compact>
                            <Select
                                size='large'
                                defaultValue={0}
                                style={{ width: 100}}
                                listHeight={230}
                                options={[
                                    { value: 0, label: '全部' },
                                    { value: 1, label: '商品名称' },
                                    { value: 2, label: '商品SPU' },
                                    { value: 3, label: '商品SKU' },
                                    { value: 4, label: '商品厂商' },
                                    { value: 5, label: '商品条码' },
                                    { value: 6, label: '规格名称' },
                                    { value: 7, label: '商品描述' },
                                ]}
                                onChange={selectSearch}
                            />
                            <Search
                                size='large'
                                placeholder="" onSearch={onSearch} style={{ width: 200 }} />
                        </Space.Compact>
                        {/* 2 */}
                        <Select
                            size='large'
                            showSearch
                            style={{
                                minWidth: 140,
                            }}
                            placeholder="商品分类"
                            optionFilterProp="children"
                            dropdownMatchSelectWidth={false}
                            dropdownStyle={{ width: 190 }}
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                {
                                    value: '1',
                                    label: '无分类商品',
                                    style: { width: '100%' }, // 设置 option 宽度
                                },
                            
                            ]}
                        />
                        {/* 3 */}
                        <Select
                            size="large"
                            placeholder='标签'
                            mode="multiple"
                            // tagRender={tagRender}
                            defaultValue={['gold', 'cyan']}
                            style={{
                                minWidth: 140
                            }}
                            options={options}
                        />
                        {/* 4 */}
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
                            size='large'
                            defaultValue="English"
                            style={{ width: 100 }}
                            listHeight={230}
                            onChange={languageChange}
                            options={languageData}
                            />
                        {/* 5 */}
                        <MoreSelect />
                        {/* 6 */}
                        <Button size="large">编辑表头</Button>
                        {/* 7 */}
                        <Select
                            size='large'
                            defaultValue="全部"
                            style={{ width: 100 }}
                            listHeight={230}
                            options={[
                                { value: '全部', label: '全部' },
                                { value: '商品名称（A-Z）', label: '商品名称（A-Z）' },
                                { value: '商品名称（Z-A）', label: '商品名称（Z-A）' },
                                { value: '库存（从低到高）', label: '库存（从低到高）' },
                                { value: '库存（从高到低）', label: '库存（从高到低）' },
                                { value: '售价（从低到高）', label: '售价（从低到高）' },
                                { value: '售价（从高到低）', label: '售价（从高到低）' },
                                { value: '创建时间（从远到近）', label: '创建时间（从远到近）' },
                                { value: '创建时间（从近到远）', label: '创建时间（从近到远）' },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <ProductListAjax selectProps={{language:language,title:title,model:model}}  />
        </>
    );
}
// // 测试 ----- 
// export default function ProductsSelectCard(lan:any){
//     useEffect(()=>{
//         console.log(lan)
//     },[lan])
//     return <div>{lan.lan}</div>
// }
