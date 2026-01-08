import { useIntl } from "@umijs/max";
import { Input } from "antd";
import { useMemo, useState } from "react";

const { TextArea } = Input;

function ItemTextArea({item,data,setData}:{item:any,data:string,setData:(item:any,value:string)=>void}){

    const intl = useIntl();

    // 默认数据
    const defaultData = item.default || undefined;

    const [value,setValue] = useState(data || defaultData);

    useMemo(()=>{
        setValue(data || defaultData);
    },[data])

    return (
        <TextArea
            autoSize={{ minRows: 5, maxRows: 5 }}
            value={value} 
            placeholder={item?.placeholder || intl.formatMessage({id: 'theme.left.ItemText.placeholder'})}
            onChange={(e:any)=>{
                setData(item,e.target.value);
                setValue(e.target.value);
            }}
        />
    )
}

export default ItemTextArea