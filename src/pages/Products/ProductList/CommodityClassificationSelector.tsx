import { Button, Divider, Dropdown, Flex, Popover, Select } from 'antd';
import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';



export default function CommodityClassificationSelector() {

    const options = [
        {
            value: '1',
            label: '无分类商品',
        }
    ];

    const [isFocus,setIsFocus] = useState(false);

    return (
        <Scoped>
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
                onSelect={()=>{

                }}
            ></Select>
        </Scoped>
    )
}

const Scoped = styled.div`
`

