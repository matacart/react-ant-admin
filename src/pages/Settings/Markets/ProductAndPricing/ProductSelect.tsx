import MySearch from "@/components/Input/MySearch"
import MySelect from "@/components/Select/MySelect"
import { Space } from "antd"
import { useState } from "react";

function ProductSelect() {

    const [searchType, setSearchType] = useState("PRODUCT_NAME");
    const [searchText, setSearchText] = useState("");

    return (
        <div className="products-select" >
            {/* 搜索 */}
            <Space.Compact style={{width:"100%"}}>
                <MySelect value={searchType} options={[
                    { value: "PRODUCT_NAME", label: '商品名称' },
                    { value: "PRODUCT_SPU", label: '商品SPU' },
                    { value: "PRODUCT_SKU", label: '商品SKU' },
                ]} style={{height:"36px",minWidth:"100px"}} onChange={(value:string)=>{
                    setSearchType(value)
                }} />
                <MySearch placeholder="搜索" value={searchText}
                    onChange={(e:any)=>{
                        setSearchText(e.target.value)
                    }} 
                    onSearch={(value:string)=>{
                        
                    }} 
                />
            </Space.Compact>
        </div>
    )
}


export default ProductSelect;
