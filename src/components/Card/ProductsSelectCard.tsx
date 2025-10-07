import { Space, Select, Input, Tag, Button, ConfigProvider } from "antd";
import type { SearchProps } from 'antd/es/input/Search';
import type { SelectProps } from 'antd';
import PriceRangeSelector from "../Select/PriceRangeSelector";
import MoreSelect from "../Select/MoreSelect";
import ProductListAjax from "@/pages/Products/ProductList/ProductListAjax";
import { useEffect, useState } from "react"
import { selectTags } from "@/services/y2/api";
import EditTableHead from './../Select/EditTableHead';

const { Search } = Input;
// type TagRender = SelectProps['tagRender'];
export default function ProductsSelectCard(){
    const [language, setLanguage] = useState("2");
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
        selectTags({
            languages_id:language
        }).then(res=>{
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
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
        })
    }
    useEffect(()=>{
        // 添加语言
        let tempList = [];
        if(languageData.length==0){
            tempList = JSON.parse(sessionStorage["languages"]).map((item:any)=>{
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
                        <ConfigProvider
                            theme={{
                                // 2. 组合使用暗色算法与紧凑算法
                                // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
                                components: {
                                    Select: {
                                        // optionPadding: '0px 0px',
                                        // showArrowPaddingInlineEnd: '0px',
                                    }
                                },
                            }}>
                            <Select
                                size="large"
                                placeholder='标签'
                                mode="multiple"
                                style={{
                                    minWidth: 200
                                }}
                                open={openTagsList}
                                dropdownStyle={{padding:"0px"}}
                                dropdownRender={(menu) => (
                                    <>
                                    {menu}
                                    {/* 1px solid #d7dbe7 */}
                                        <div style={{width:"100%",height:"1px",backgroundColor:"#d7dbe7"}}></div>
                                        <div style={{textAlign:"right",padding:"10px"}}>
                                            {/* 解决失去焦点事件优先级较高的问题 */}
                                            <Button onMouseDown={()=>{
                                                setOpenTagsList(false)
                                                setTags(str.slice(1))
                                            }} type="primary">
                                            确认
                                            </Button>
                                        </div>
                                        
                                    </>
                                )}
                                options={options}
                                onChange={handleTagChange}
                                onFocus={()=>{setOpenTagsList(true)}}
                                onBlur={()=>{setOpenTagsList(false)}}
                            ></Select>
                        </ConfigProvider>
                        
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
                        <EditTableHead />
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
            <ProductListAjax selectProps={{language:language,title:title,model:model,tags:tags}}  />
        </>
    );
}
