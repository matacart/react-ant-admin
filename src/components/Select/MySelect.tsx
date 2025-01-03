import { Checkbox, Dropdown, Select, Space } from "antd";
import { useState } from "react";
import "./Myselect.scss"


// 自定义筛选框


export default function MySelect({options,text,style}:{options:any,text:string,style?:any}) {

    const [open,setOpen] = useState(false);

    return (
        <>
            <Select mode={"multiple"} style={style} options={options} showSearch={false}
                labelRender={()=><div>{text}</div>}
                defaultValue="-1"
                tagRender={(props)=>{
                    return (
                        <div style={{marginLeft:"10px"}}>{props.label}</div>
                    )
                }}
                dropdownStyle={{padding:"6px 0"}}
                dropdownRender={(menu) => {
                    const list = options.map((item,index)=>{
                        return (
                            <Checkbox className="item" style={{padding:"8px 12px",width:"100%"}} onChange={()=>{}}>{item.label}</Checkbox>
                        )
                    })
                    return (
                        <>
                            {list}
                        </>
                    )
                }}
            />
        </>
    )
}