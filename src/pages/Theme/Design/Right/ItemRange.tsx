import MyInput from "@/components/Input/MyInput"
import { useIntl } from "@umijs/max";
import { Flex, Slider } from "antd"
import { useMemo, useState } from "react";

function ItemRange({item,data,setData}:{item:any,data:number,setData:(item:any,value:number)=>void}){

    const intl = useIntl();

    // 默认数据
    const defaultData = item.default??undefined;

    const [value,setValue] = useState(data??defaultData);

    useMemo(()=>{
        setValue(data??defaultData)
    },[data])

    return (
        <Flex gap={20}>
            <Slider
                value={value}
                style={{flex:1}}
                min={item?.min}
                max={item?.max}
                onChange={(value:number)=>{
                    setData(item,value)
                    setValue(value)
                }}
            />
            <MyInput style={{ width: "80px",height:"36px" }} suffix={ item?.unit && intl.formatMessage({id: item.unit})} value={value}  />
        </Flex>
    )
}

export default ItemRange