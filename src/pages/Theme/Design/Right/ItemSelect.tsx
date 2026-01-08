import MySelect from "@/components/Select/MySelect"
import { useIntl } from "@umijs/max";
import { useEffect, useMemo, useState } from "react"

function ItemSelect({item,data,setData}:{item:any,data:string,setData:(item:any,value:string)=>void}){

    const intl = useIntl();

    // 默认数据
    const defaultData = item.default || undefined;

    const [value,setValue] = useState(data || defaultData);
    
    const options = item.options.map((item:any)=>{
        let label = item.label;
        if (typeof item.label === 'string' && item.label.trim() !== '') {
            // 检查是否有对应的国际化消息
            if (intl.messages[item.label]) {
                label = intl.formatMessage({ id: item.label });
            } else {
                // 如果没有对应的国际化消息，直接使用原值
                label = item.label;
            }
        }
        return {
            value:item.value,
            label:label
        }
    })

    useMemo(()=>{
        setValue(data || defaultData)
    },[data])

    return (
        <MySelect style={{height:"36px"}} options={options} value={value} onChange={async (value:any)=>{
            setData(item,value);
            setValue(value);
        }} />
    )
}

export default ItemSelect