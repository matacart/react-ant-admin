import MyInput from "@/components/Input/MyInput"
import { useIntl } from "@umijs/max";
import { useMemo, useState } from "react";

function ItemText({item,data,setData}:{item:any,data:string,setData:(item:any,value:string)=>void}){

    const intl = useIntl();

    // 默认数据
    const defaultData = item.default || undefined;

    const [value,setValue] = useState(data || defaultData);

    useMemo(()=>{
        setValue(data || defaultData)
    },[data])

    return (
        <MyInput style={{ width:"100%",height:"36px" }} value={value} placeholder={item?.placeholder || intl.formatMessage({id: 'theme.left.ItemText.placeholder'})}
            onChange={(e:any)=>{
                setData(item,e.target.value);
                setValue(e.target.value);
            }} 
        />
    )
}

export default ItemText