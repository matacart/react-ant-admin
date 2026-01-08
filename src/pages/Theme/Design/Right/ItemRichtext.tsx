import MinTinyMce from "@/components/MCE/MinTinyMce"
import { useIntl } from "@umijs/max";
import { useEffect, useState } from "react";

function ItemRichtext({itemId,item,data,setData}:{itemId:string,item:any,data:string,setData:(item:any,value:string)=>void}){

    const intl = useIntl();

    // 默认数据
    const defaultData = item.default || undefined;

    const [value,setValue] = useState(data || defaultData);

    useEffect(()=>{
        setValue(data || defaultData);
    },[data])

    return (
        <MinTinyMce content={value} setContent={(newValue:string)=>{
            if (newValue !== value) {
                setValue(newValue);
                setData(item, newValue);
            }
        }} />
    )
}


export default ItemRichtext

