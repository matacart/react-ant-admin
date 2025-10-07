import { EditorTextCenterAIcon, EditorTextCenterIcon, EditorTextLeftAIcon, EditorTextLeftIcon, EditorTextRightAIcon, EditorTextRightIcon } from "@/components/Icons/Icons";
import editor from "@/store/theme/editor";
import { useState } from "react";
import styled from "styled-components";

function TextAlign(){

    const [value, setValue] = useState("left");

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
            value: 'content'
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
            {options.map(align=><div key={align.id} onClick={()=>{
                setValue(align.value)
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