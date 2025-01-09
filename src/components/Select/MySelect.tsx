import { Checkbox, Dropdown, Select, Space } from "antd";
import { useEffect, useState } from "react";
import "./Myselect.scss"


// 自定义筛选框
function MySelect({options,setStatusOptions,text,style}:{options:any,setStatusOptions:any,text:string,style?:any}) {

    const [open,setOpen] = useState(false);

    useEffect(()=>{
        console.log(options)
        // setStatusOptions(options)
    },[options])

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
                            <Checkbox checked={item.checked} className="item" style={{padding:"8px 12px",width:"100%"}} onChange={(e)=>{
                                let newOption = [...options]
                                newOption[index].checked = e.target.checked
                                // e.target.checked?checkedList.push(item):checkedList.splice(checkedList.indexOf(item),1)
                                // setCheckedStatus(checkedList)
                                setStatusOptions(newOption)
                            }}>{item.label}</Checkbox>
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

export default MySelect