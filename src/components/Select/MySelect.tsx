import { ConfigProvider, Select, SelectProps } from "antd";

interface MySelectProps extends SelectProps {
    Ref?:React.RefObject<HTMLElement>
}

// 自定义筛选框
function MySelect({Ref,...props}:MySelectProps) {
    return (
        <ConfigProvider
            theme={{
                token: {
                /* 这里是你的全局 token */
                    borderRadius:4,
                    paddingXXS:0,
                    // paddingSM:12
                },
            }}
            >
            <Select getPopupContainer={()=>Ref?.current!} {...props} dropdownStyle={{
                padding: '8px 0',
            }} />
        </ConfigProvider>
    )
}

export default MySelect