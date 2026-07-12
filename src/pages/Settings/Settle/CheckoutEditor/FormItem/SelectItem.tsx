import styled from "styled-components"
import { useEffect, useState } from "react";
import { useIntl } from "@umijs/max";
import MySelect from "@/components/Select/MySelect";


function SelectItem({options,item,data,setData}:{options:any,item:string,data:any,setData:(item:string,data:any)=>void}) {

    const intl = useIntl();

    const [value,setValue] = useState("");

    useEffect(()=>{
        setValue(data);
    },[data]);

    return (
        <Scoped>
            <MySelect style={{height:"36px",width:"100%"}} options={options} value={value} onChange={(val)=>{
                setData(item,val);
            }} />
        </Scoped>
    )
}

export default SelectItem

const Scoped = styled.div`
    
`
