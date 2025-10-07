import { Checkbox, Flex, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MyButton from "../Button/MyButton";

interface CheckSelectSubmitProps extends React.ComponentProps<typeof Select> {
    options: any;
    setOptions:any;
  }
// 自定义筛选框
function CheckSelectSubmit({options,setOptions,...props}:CheckSelectSubmitProps) {

    const [open,setOpen] = useState(false);

    const Ref = useRef<HTMLDivElement>(null)

    const [customizeOptions,setCustomizeOptions] = useState(options.map((item:any) => ({ ...item })))

    const submit = () => {
        setOpen(false)
        setOptions([...customizeOptions])
    }

    return (
        <Scoped ref={Ref}>
            <Select
                open={open}
                onDropdownVisibleChange={(open)=>{
                    setOpen(open)
                }}
                {...props} 
                className="select" 
                showSearch={false}
                mode={"multiple"} 
                options={customizeOptions} 
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
                                let newOption = [...customizeOptions]
                                newOption[index].checked = e.target.checked
                                setCustomizeOptions(newOption)
                                console.log(options)
                            }}>{item.label}</Checkbox>
                        )
                    })
                    return (
                        <>
                            <div className="select-dropdown-warp">
                                {list}
                            </div>
                            <Flex className="select-dropdown-btn" justify="flex-end" style={{padding:"10px 12px"}}>
                                {/* <span className="color-7A8499 cursor-pointer" onClick={()=>{
                                    let newOption = options.map(item=>({...item,checked:false}))
                                }}>清除</span> */}
                                <MyButton className="font-12" style={{height:"28px",width:"52px"}} text="确认" type="primary" autoInsertSpace={false} onClick={submit}  />
                            </Flex>
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

    .select-dropdown-warp{
        max-height: 240px;
        overflow-y: auto;
      
    }
    .select{
        
    }

    .item:hover{
        background-color: #f0f7ff;
    }
`

export default CheckSelectSubmit