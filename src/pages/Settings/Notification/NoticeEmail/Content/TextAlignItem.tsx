import { EditorTextCenterAIcon, EditorTextCenterIcon, EditorTextLeftAIcon, EditorTextLeftIcon, EditorTextRightAIcon, EditorTextRightIcon } from "@/components/Icons/Icons"
import { settingType } from "@/store/settings/notification/noticeEmail"
import { Flex } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"

function TextAlignItem({setting,data,setSections}:{setting:settingType,data:any,setSections:(id:string,value:any) => void}) {
    
    const [value,setValue] = useState<string>('left');
    
    useEffect(()=>{
        setValue(data.value || setting?.default);
    },[]);

    const options = [
        {
            id:1,
            icon: <EditorTextLeftIcon style={{fontSize:32}} />,
            aIcon: <EditorTextLeftAIcon style={{fontSize:32}} className="color-356DFF" />,
            value: 'left'
        },
        {
            id:2,
            icon: <EditorTextCenterIcon style={{fontSize:32}} />,
            aIcon: <EditorTextCenterAIcon style={{fontSize:32}} className="color-356DFF" />,
            value: 'center'
        },
        {
            id:3,
            icon: <EditorTextRightIcon style={{fontSize:32}} />,
            aIcon: <EditorTextRightAIcon style={{fontSize:32}} className="color-356DFF" />,
            value: 'right'
        }
    ]

    return (
        <Scoped>
            <Flex className="title">
                <div className="font-14 color-474F5E">{setting.label}</div>
            </Flex>
            <Flex gap={12}>
                {options.map(align=><div key={align.id} onClick={()=>{
                    setValue(align.value);
                    setSections(setting.id, {value: align.value});
                }} className="item">
                    <div className="cursor-pointer">{align.value == value ? align.aIcon : align.icon}</div>
                </div> )}
            </Flex>
            
        </Scoped>
    )
}

export default TextAlignItem

const Scoped = styled.div`
    padding-bottom: 24px;
    .title{
        margin-bottom: 12px;
    }
`
