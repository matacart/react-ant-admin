import { getCategorySelect } from '@/services/y2/api';
import productList from '@/store/product/productList';
import { Button, ConfigProvider, Divider, Dropdown, Flex, Popover, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';



export default function CommodityClassificationSelector() {

    const [options,setOptions] = useState([])

    const [isFocus,setIsFocus] = useState(false);

    useEffect(()=>{
        getCategorySelect().then(res=>{
            const newOption = res.data.map((item:any)=>{
                return {
                    value: item.id,
                    label: item.category_name,
                }
            })
            newOption && setOptions(newOption)
        })
    },[])

    return (
        <Scoped>
            <ConfigProvider
                theme={{
                    token: {
                        /* 这里是你的全局 token */
                        paddingXXS:0,
                    },
                    components: {
                        Select: {
                            borderRadius:4,
                        },
                    },
                }}
                >
                <Select
                    placeholder={<div className='color-474F5E font-14'>商品分类</div>}
                    showSearch
                    suffixIcon={isFocus?<img src="/icons/Search1.svg" />:<img src="/icons/Suffix1.svg" />}
                    style={{
                        minWidth: 140,
                        height:36,
                        lineHeight:36,
                        fontSize:14
                    }}
                    value={"商品分类"}
                    dropdownStyle={{padding:"6px 0px"}}
                    options={options}
                    onDropdownVisibleChange={(open)=>{
                        open?setIsFocus(true):setIsFocus(false)
                    }}
                    onSelect={(value:string)=>{
                        productList.setCondition({
                            ...productList.condition,
                            sortationId:value
                        })
                    }}
                ></Select>
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
`

