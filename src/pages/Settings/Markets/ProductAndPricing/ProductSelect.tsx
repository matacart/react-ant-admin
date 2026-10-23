import MySearch from "@/components/Input/MySearch"
import MySelect from "@/components/Select/MySelect"
import productAndPricing from "@/store/settings/markets/productAndPricing";
import { Flex, message, Space, Tag } from "antd"
import { observer } from "mobx-react-lite";
import { useState } from "react";

function ProductSelect() {

    const [searchType, setSearchType] = useState("PRODUCT_NAME");
    const [searchText, setSearchText] = useState("");

    return (
        <div className="products-select">
            <Flex gap={12}>
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
                {productAndPricing.marketDetail?.countryList?.length > 1 && <MySelect
                    style={{height:"36px"}}
                    value={"预览价格地区"}
                    options={productAndPricing.marketDetail?.countryList?.map((item:any)=>{
                        return {
                            value: item.code,
                            label: item.name,
                        }
                    })}
                    onChange={(value:string)=>{
                        if(productAndPricing.productPriceExchangeList.length > 0 || productAndPricing.skuPriceExchangeList.length > 0){
                            message.warning("当前有已编辑的价格，请先保存再切换预览价格地区");
                            return;
                        }else{
                            productAndPricing.setCountryCode(value);
                        }
                    }}
                />}
            </Flex>
            {productAndPricing.countryCode &&<Tag style={{padding:"4px 10px",marginTop:"12px"}} color="processing" bordered={false} closable onClose={()=>{
                productAndPricing.setCountryCode("");
            }}>
                <span className="color-474F5E font-14">
                预览价格地区：{productAndPricing.marketDetail?.countryList?.find((item:any)=>item.code == productAndPricing.countryCode)?.name || productAndPricing.countryCode}
                </span>
            </Tag>}
        </div>
    )
}


export default observer(ProductSelect);
