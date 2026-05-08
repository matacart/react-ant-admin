import { settingType } from "@/store/settings/notification/noticeEmail";
import { Flex, Slider } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"

function RangeItem({setting,data,setSections}:{setting:settingType,data:any,setSections:(id:string,value:any) => void}) {

    const [value,setValue] = useState<number>(0);
        
    useEffect(()=>{
        setValue(data.value || setting?.default);
    },[]);


    return (
        <Scoped>
            <Flex className="title">
                <div className="font-14 color-474F5E">{setting.label}</div>
            </Flex>
            <Slider
                min={setting.min}
                max={setting.max}
                value={value}
                style={{flex:1}}
                onChange={value=>setValue(value)}
                onChangeComplete={(value)=>{
                    setSections(setting.id, {value: value});
                }}
            />
        </Scoped>
    )
}

export default RangeItem

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        padding-bottom: 12px;
    }
`
