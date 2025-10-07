import { Checkbox, ConfigProvider, Flex, Select, Space } from "antd";
import { useRef, useState } from "react";
import styled from "styled-components";

interface CheckSelectProps extends React.ComponentProps<typeof Select> {
    options: any;
    setOptions:any;
  }
// 自定义筛选框
function SelectCheckBox({options,setOptions,...props}:CheckSelectProps) {

    const [open,setOpen] = useState(false);

    const Ref = useRef<HTMLDivElement>(null)

    const [customizeOptions,setCustomizeOptions] = useState(options.map((item:any) => ({ ...item })))

    const submit = () => {
        setOpen(false)
        setOptions([...customizeOptions])
    }

    return (
        <Scoped ref={Ref}>
            <ConfigProvider
                theme={{
                    token: {
                    /* 这里是你的全局 token */
                        borderRadius:4,
                        paddingXXS:0,
                        // paddingSM:12
                        // paddingXS:200
                    },
                }}
            >
                <Select
                    open={open}
                    onOpenChange={(open)=>{
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
                    popupRender={(menu) => {
                        const list = options.map((item:any,index:number)=>{
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
                            </>
                        )
                    }}
                />
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
    .ant-select-dropdown{
        padding: 8px 0;
    }
    .ant-select-selection-wrap{
        height: 100%;
    }
    .item:hover{
        background-color: #f0f7ff;
    }
`

export default SelectCheckBox