import { ConfigProvider, Select, SelectProps } from "antd";
import styled from "styled-components";
import { UnfoldIcon } from "../Icons/Icons";
import { useRef, useState } from "react";

interface DefaultSelectProps extends SelectProps {
    
}

export default function DefaultSelect({...props}:DefaultSelectProps){
    
    const Ref = useRef(null)

    const [open,setOpen] = useState(false)

    return (
        <Scoped>
            <div ref={Ref}></div>
            <ConfigProvider
                theme={{
                    token: {
                        /* 这里是你的全局 token */
                        paddingXXS:0,
                    },
                    components: {
                        Select: {
                            borderRadius:4,
                        },
                    },
                }}
                >
                    <Select
                        {...props}
                        open={open}
                        className="default"
                        styles={{
                            popup: {
                              root: {
                                padding: "8px 0"
                              }
                            }
                        }}
                        getPopupContainer={() => Ref.current!}
                        suffixIcon={
                            <UnfoldIcon onClick={()=>setOpen(!open)} className={open?"font-18 active":"font-18 no-active"} />
                        }
                        onOpenChange={(open)=>setOpen(open)}
                    />
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
    .default{
        height: 36px;
    }

    .ant-select-dropdown{
        padding: 8px 0;
    }
    .active{
        transform: rotate(180deg);
        transition: transform 0.3s;  // 添加旋转动画
    }
    
`