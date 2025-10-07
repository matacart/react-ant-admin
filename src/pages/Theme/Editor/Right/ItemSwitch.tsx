import { Switch } from "antd"
import { useEffect, useState } from "react"

function ItemSwitch({item,data,setData}:{item:any,data:boolean,setData:(value:boolean)=>void}){

    const [checked,setChecked] = useState<boolean>();

    useEffect(()=>{
        setChecked(data)
    },[data])

    return (
        <Switch value={checked} onChange={(check:boolean)=>{
            setData(check)
            setChecked(check)
        }} />
    )
}

export default ItemSwitch