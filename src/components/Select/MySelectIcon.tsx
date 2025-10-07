import { Checkbox, ConfigProvider, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UnfoldIcon } from "../Icons/Icons";

// 自定义筛选框
function MySelectIcon({...props}) {

    const Ref = useRef<HTMLDivElement>(null)

    const [open,setOpen] = useState(false)

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
                <Select getPopupContainer={() => Ref.current!} {...props}
                    onOpenChange={(open)=>{
                        setOpen(open)
                    }}
                    suffixIcon={
                        <UnfoldIcon className={open?"font-18 active":"font-18 no-active"} />
                    }
                />
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
    .ant-select-dropdown{
        padding: 8px 0;
    }
    .active{
        transform: rotate(180deg);
        transition: transform 0.3s;  // 添加旋转动画
    }
    .no-active{
        transform: rotate(0deg);
        transition: transform 0.3s;  // 添加旋转动画
    }
`

export default MySelectIcon