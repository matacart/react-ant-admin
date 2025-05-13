import { Checkbox, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// 自定义筛选框
function SelectCheckBox({options,setStatusOptions,text,style}:{options:any,setStatusOptions:any,text:string,style?:any}) {

    const [open,setOpen] = useState(false);

    const Ref = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        console.log(options)
        // setStatusOptions(options)
    },[options])

    return (
        <Scoped ref={Ref}>
            <Select mode={"multiple"} style={style} options={options} showSearch={false}
                labelRender={()=><div>{text}</div>}
                defaultValue="-1"
                tagRender={(props)=>{
                    return (
                        <div style={{marginLeft:"10px"}}>{props.label}</div>
                    )
                }}
                getPopupContainer={()=>Ref.current!}
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
        </Scoped>
    )
}

const Scoped = styled.div`
    .item:hover{
    background-color: #f0f7ff;
    }
`

export default SelectCheckBox