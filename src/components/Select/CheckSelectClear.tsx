import { Checkbox, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface optionType{
    value:string,
    label:string,
    checked:boolean
}
// 自定义筛选框
function CheckSelectClear({options,setStatusOptions,text,style}:{options:optionType[],setStatusOptions:any,text:string,style?:any}) {

    const [open,setOpen] = useState(false);

    const Ref = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        // setStatusOptions(options)
    },[options])

    return (
        <Scoped ref={Ref}>
            <Select mode={"multiple"} style={style} className="select" options={options} showSearch={false}
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
                                setStatusOptions(newOption)
                            }}>{item.label}</Checkbox>
                        )
                    })
                    return (
                        <>
                            {list}
                            <div style={{padding:"8px 12px"}}>
                                <span className="color-7A8499 cursor-pointer" onClick={()=>{
                                    let newOption = options.map(item=>({...item,checked:false}))
                                    setStatusOptions(newOption)
                                }}>清除</span>
                            </div>
                        </>
                    )
                }}
            />
        </Scoped>
    )
}

const Scoped = styled.div`
    .ant-select-selector{
        border-radius: 4px;
    }

    .item:hover{
        background-color: #f0f7ff;
    }
`

export default CheckSelectClear