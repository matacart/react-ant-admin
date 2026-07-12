import MinTinyMce from "@/components/MCE/MinTinyMce"
import { useIntl } from "@umijs/max";
import { useEffect, useState } from "react";

function ItemRichtext({itemId,item,data,setData}:{itemId:string,item:any,data:any,setData:(item:any,value:any)=>void}){

    const intl = useIntl();

    // 默认数据
    const defaultData = item.default || undefined;

    const [value,setValue] = useState(data?.value || defaultData);

    useEffect(()=>{
        setValue(data?.value || defaultData);
    },[data?.value])

    return (
        <MinTinyMce content={value} setContent={(newValue:string)=>{
            if (newValue !== value) {
                setValue(newValue);
                setData(item,{
                    value: newValue
                });
            }
        }} />
    )
}


export default ItemRichtext

