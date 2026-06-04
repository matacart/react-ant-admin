import { ColorPicker, Flex } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"

function ColorPickerItem({data}:{data:any}) {

    const [value,setValue] = useState();
            
    useEffect(()=>{
        setValue(data.value);
    },[data.value]);

    
    return (
        <Scoped>
            <Flex gap={8} align="center">
                <ColorPicker value={value} onChange={(value:any,css:string)=>{
                    const hexColor = value.toHexString();
                    setValue(hexColor);
               }} onChangeComplete={(colorValue:any)=>{
                    const hexColor = colorValue.toHexString();
               }}>
                    <div className="color-picker" style={{backgroundColor:value}}></div>
                </ColorPicker>
                <Flex vertical justify="center" gap={4}>
                    <div className="font-14 color-474F5E">{data.label}</div>
                    <div className="font-12 color-7A8499">{value}</div>
                </Flex>
            </Flex>
            {/* 描述信息 */}
            {data?.desc && <div className="font-12 color-7A8499">{data.desc}</div>}
        </Scoped>
    )
}

export default ColorPickerItem

const Scoped = styled.div`
    padding-bottom: 16px;
    .color-picker{
        height: 36px;
        width: 36px;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
        cursor: pointer;
    }
`
