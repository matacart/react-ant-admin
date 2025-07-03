import SelectCheckBox from "@/components/Select/SelectCheckBox";
import { Checkbox, Select, Space } from "antd";
import React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";




// 自定义筛选框
React.memo(function SelectCheckBox({Ref,values,setConditionValue,...props}:any) {

    const [selectedValues,setSelectedValues] = useState(values);

    return (
        <MySelect
            {...props}
            mode={"multiple"}
            tagRender={(props)=>{
                return (
                    <div style={{marginLeft:"10px"}}>{props.label}</div>
                )
            }}
            onChange={()=>{
                console.log(selectedValues)
                setConditionValue("213");
            }}
            getPopupContainer={()=>Ref.current!}
            value={selectedValues}
            dropdownStyle={{padding:"6px 0"}}
            dropdownRender={(menu) => {
                const list = props.options.map((item,index)=>{
                    return (
                        <Checkbox checked={selectedValues.includes(item.value)} className="item" style={{padding:"8px 12px",width:"100%"}}
                        onChange={(e)=>{
                            const newValues = selectedValues.includes(item.value) ? selectedValues.filter((v) => v !== item.value) : [...selectedValues, item.value];
                            setSelectedValues(newValues);
                            setConditionValue(newValues);
                        }}
                        >{item.label}</Checkbox>
                    )
                })
                return (
                    <div style={{backgroundColor:"#FFF"}}>
                        {list}
                    </div>
                )
            }}
        />
    )
})

const MySelect = styled(Select)`
    margin-top: 8px;

`

export default SelectCheckBox