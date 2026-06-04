import styled from "styled-components"
import { useEffect, useState } from "react";
import { useIntl } from "@umijs/max";
import MySelect from "@/components/Select/MySelect";


function FontPicker({data}:{data:any}) {

    const intl = useIntl();

    const [options,setOptions] = useState<{label:string,value:string}[]>([
        {
            label: "白色",
            value: "white",
        },
        {
            label: "透明",
            value: "transparent",
        },
    ]);

    const [value,setValue] = useState("");

    useEffect(()=>{
        setValue(data?.color);
    },[]);

    return (
        <Scoped>
            <MySelect style={{height:"36px",width:"100%"}} options={options} value={value} onChange={setValue} />
        </Scoped>
    )
}

export default FontPicker

const Scoped = styled.div`
    
`
