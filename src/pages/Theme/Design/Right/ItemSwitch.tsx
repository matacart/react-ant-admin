import { Switch } from "antd"
import { useMemo, useState } from "react"

function ItemSwitch({item,data,setData}:{item:any,data:boolean,setData:(item:any,value:boolean)=>void}){

    // 默认数据
    const defaultData = item.default??false;

    const [value,setValue] = useState(data??defaultData);

    useMemo(()=>{
        setValue(data??defaultData)
    },[data])

    return (
        <Switch value={value} onChange={(check:boolean)=>{
            setData(item,check)
            setValue(check)
        }} />
    )
}

export default ItemSwitch