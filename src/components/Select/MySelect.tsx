import { ConfigProvider, Select } from "antd";

// 自定义筛选框
function MySelect({...props}) {
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
            <Select {...props} dropdownStyle={{
                padding: '8px 0',
            }} />
        </ConfigProvider>
    )
}

export default MySelect