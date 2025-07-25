import { EditorTextCenterAIcon, EditorTextCenterIcon, EditorTextLeftAIcon, EditorTextLeftIcon, EditorTextRightAIcon, EditorTextRightIcon } from "@/components/Icons/Icons";
import editor from "@/store/theme/editor";
import { useState } from "react";
import styled from "styled-components";

function TextAlign({item,componentsData}:any){

    console.log(item);
    console.log(componentsData);

    const [value, setValue] = useState(componentsData[item.id]?.value || "left");

    const options = [
        {
            icon: <EditorTextLeftIcon style={{fontSize:32}} />,
            aIcon: <EditorTextLeftAIcon style={{fontSize:32}} className="color-356DFF" />,
            value: 'left'
        },
        {
            icon: <EditorTextCenterIcon style={{fontSize:32}} />,
            aIcon: <EditorTextCenterAIcon style={{fontSize:32}} className="color-356DFF" />,
            value: 'content'
        },
        {
            icon: <EditorTextRightIcon style={{fontSize:32}} />,
            aIcon: <EditorTextRightAIcon style={{fontSize:32}} className="color-356DFF" />,
            value: 'right'
        }
    ]

    return (

        <Scoped>
            {options.map(align=><div onClick={()=>{
                setValue(align.value)
                console.log(editor.component?.id);
                editor.updateComponentSettings(editor.component?.id,{
                    ...componentsData,
                    [item.id]: {value:align.value}
                })
            }} className="item">
                {align.value == value ? align.aIcon : align.icon}
            </div> )}
        </Scoped>
        
    )
}

const Scoped = styled.div`
    display: flex;
    gap: 12px;
    .item{
        cursor: pointer;
    }

`

export default TextAlign;