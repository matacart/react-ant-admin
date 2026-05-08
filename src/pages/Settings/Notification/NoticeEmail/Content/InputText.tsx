import { Flex } from "antd"
import styled from "styled-components"
import MyTextArea from "@/components/Input/MyTextArea";
import { settingType } from "@/store/settings/notification/noticeEmail";
import { useEffect, useState } from "react";

function InputText({setting,data,setSections}:{setting:settingType,data:any,setSections:(id:string,value:any)=>void}) {
    
    const [value,setValue] = useState();
    
    useEffect(()=>{
        setValue(data.value || setting?.default);
    },[]);
    
    return (
        <Scoped>
            <Flex className="title">
                <div className="font-14 color-474F5E">{setting.label}</div>
            </Flex>
            <MyTextArea autoSize={{ minRows: 1, maxRows: 6 }} placeholder={setting?.placeholder || ""} value={value || ""} onChange={(e:any)=>{
                setValue(e.target.value);
                setSections(setting.id, {value: e.target.value});
            }} />
        </Scoped>
    )
}

export default InputText

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        margin-bottom: 12px;
    }
`
