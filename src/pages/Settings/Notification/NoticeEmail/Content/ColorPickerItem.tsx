import { settingType } from "@/store/settings/notification/noticeEmail";
import { ColorPicker, Flex } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"

function ColorPickerItem({setting,data,setSections}:{setting:settingType,data:any,setSections:(id:string,value:any) => void}) {

    const [value,setValue] = useState();
            
    useEffect(()=>{
        setValue(data.value || setting?.default);
    },[]);

    
    return (
        <Scoped>
            <Flex gap={8} align="center">
                <ColorPicker value={value} onChange={(value:any,css:string)=>{
                    const hexColor = value.toHexString();
                    setValue(hexColor);
               }} onChangeComplete={(colorValue:any)=>{
                    const hexColor = colorValue.toHexString();
                    setSections(setting.id, {value: hexColor});
               }}>
                    <div className="color-picker" style={{backgroundColor:value}}></div>
                </ColorPicker>
                <Flex vertical justify="center" gap={4}>
                    <div className="font-14 color-474F5E">{setting.label}</div>
                    <div className="font-12 color-7A8499">{value}</div>
                </Flex>
            </Flex>
        </Scoped>
    )
}

export default ColorPickerItem

const Scoped = styled.div`
    padding-bottom: 24px;
    .color-picker{
        height: 36px;
        width: 36px;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
        cursor: pointer;
    }
`
