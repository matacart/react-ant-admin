import { Button, ConfigProvider, Select } from "antd";
import styled from "styled-components";
import { UnfoldIcon } from "../Icons/Icons";
import { useRef, useState } from "react";

export default function DefaultSelect({options,value,onChange,styled}:{options:any,value:any,onChange:(e:any,option?:any)=>void,styled?:any}){
    
    const Ref = useRef(null)

    const [open,setOpen] = useState(false)

    return (
        <Scoped>
            {/* 回退 */}
            <div ref={Ref}></div>
            <ConfigProvider
                theme={{
                    token: {
                        /* 这里是你的全局 token */
                        paddingXXS:0,
                    },
                    components: {
                        Select: {
                            // defaultActiveBorderColor:"#d7dbe7",
                            // defaultBorderColor:"#d7dbe7",
                            // defaultHoverBorderColor:"#d7dbe7",
                            // defaultHoverColor:"#474F5E",
                            // defaultActiveColor:"#474F5E",
                            // defaultHoverBg:"#f7f8fb",
                            // defaultActiveBg:"#f7f8fb",
                            borderRadius:4,
                        },
                    },
                }}
                >
                    <Select
                        open={open}
                        value={value}
                        className="default"
                        style={styled?styled:{ width: 180 }}
                        onChange={(e,option)=>onChange(e,option)}
                        options={options}
                        dropdownStyle={{padding:"8px 0"}}
                        getPopupContainer={() => Ref.current!}
                        suffixIcon={
                            <UnfoldIcon onClick={()=>setOpen(!open)} className={open?"font-18 active":"font-18 no-active"} />
                        }
                        onDropdownVisibleChange={(open)=>setOpen(open)}
                    />
                {/* <Select className="default" onClick={onClick}>
                    {text}
                </Select> */}
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
    .default{
        height: 36px;
        border-color: #d7dbe7;
    }
    .ant-select-dropdown{
        padding: 8px 0;
    }

    .active{
        transform: rotate(180deg);
        transition: transform 0.3s;  // 添加旋转动画
    }
    
`