import { Switch } from "antd"
import { useMemo, useState } from "react"

function ItemSwitch({item,data,setData}:{item:any,data:any,setData:(item:any,value:any)=>void}){

    // 默认数据
    const defaultData = item.default??false;

    const [value,setValue] = useState(data?.value??defaultData);

    useMemo(()=>{
        setValue(data?.value??defaultData)
    },[data?.value])

    return (
        <Switch value={value} onChange={(check:boolean)=>{
            setData(item,{
                value: check
            });
            setValue(check)
        }} />
    )
}

export default ItemSwitch