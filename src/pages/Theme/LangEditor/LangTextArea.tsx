import MyTextArea from "@/components/Input/MyTextArea";
import { memo, useEffect, useMemo, useState } from "react";

function LangTextArea({item,setItem}:{item:string,setItem:(value:string)=>void}){

    const [localValue, setLocalValue] = useState(item);

    useEffect(()=>{
        setLocalValue(item)
    },[item])

    return (
        <MyTextArea value={localValue} autoSize={{maxRows:3}} onChange={(e:any)=>{
            // setLocalValue(e.target.value)
            setItem(e.target.value)
        }} />
    );
}

export default LangTextArea;