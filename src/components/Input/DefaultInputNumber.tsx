import { ConfigProvider, InputNumber } from "antd"
// 数字输入框
function DefaultInputNumber({...props}) {
  return (
    <ConfigProvider
        theme={{
            token: {
                /* 这里是你的全局 token */
                borderRadius:4
            },
        }}
        >
        <InputNumber {...props} />
    </ConfigProvider>
  )
}

export default DefaultInputNumber