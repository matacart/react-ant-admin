import { EditorTextCenterAIcon, EditorTextCenterIcon, EditorTextLeftAIcon, EditorTextLeftIcon, EditorTextRightAIcon, EditorTextRightIcon } from "@/components/Icons/Icons";
import { useEffect, useState } from "react";
import styled from "styled-components";

// 对齐方式
function TextAlign({item,data,setData}:{item:any,data:string,setData:(item:any,value:string)=>void}){

    // 默认数据
    const defaultData = item.default || undefined;

    const [value,setValue] = useState(data || defaultData);

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

    useEffect(()=>{
        setValue(data || defaultData);
    },[data])

    return (
        <Scoped>
            {options.map(align=><div key={align.id} onClick={()=>{
                setData(item,align.value);
                setValue(align.value);
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