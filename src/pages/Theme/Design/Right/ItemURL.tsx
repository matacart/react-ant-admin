import MyInput from "@/components/Input/MyInput"
import { useIntl } from "@umijs/max";
import { useMemo, useState } from "react";

function ItemURL({item,data,setData}:{item:any,data:string,setData:(item:any,value:string)=>void}){

    const intl = useIntl();

    // 默认数据
    const defaultData = item.default || undefined;

    const [value,setValue] = useState(data || defaultData);

    const [error, setError] = useState<string | null>(null);

    // 定义 URL 校验规则
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        // 进行格式校验 (允许空字符串)
        if (inputValue && !urlPattern.test(inputValue)) {
            setError("格式如https://");
        } else {
            setError(null);
            setData(item, inputValue); // 空值或有效URL都更新父组件数据
        }
    };

    useMemo(()=>{
        setValue(data || defaultData)
    },[data])

    return (
        <>
            <MyInput 
                style={{ width:"100%",height:"36px" }}
                placeholder={item?.placeholder}
                value={value}
                onChange={handleChange}
            />
            {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
        </>
    )
}

export default ItemURL