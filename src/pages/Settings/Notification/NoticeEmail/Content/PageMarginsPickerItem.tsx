import { Flex } from "antd"
import styled from "styled-components"
import { settingType } from "@/store/settings/notification/noticeEmail";
import { useEffect, useState } from "react";
import MySelect from "@/components/Select/MySelect";

function PageMarginsPickerItem({setting,data,setSections}:{setting:settingType,data:any,setSections:(id:string,value:any)=>void}) {
    
    const [value,setValue] = useState();
    
    useEffect(()=>{
        setValue(data.value || setting?.default);
    },[]);
    
    return (
        <Scoped>
            <Flex className="title">
                <div className="font-14 color-474F5E">{setting.label}</div>
            </Flex>
            <MySelect 
                value={value} 
                style={{width:'100%',height:"36px"}} 
                options={[
                    {
                        id:1,
                        label:'默认页边距',
                        value:'600px'
                    },
                    {
                        id:2,
                        label:'无页边距',
                        value:'100%'
                    }
                ]}
                onChange={(value)=>{
                    setValue(value);
                    setSections(setting.id,{value: value});
                }}
            />
        </Scoped>
    )
}

export default PageMarginsPickerItem

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        margin-bottom: 12px;
    }
`
