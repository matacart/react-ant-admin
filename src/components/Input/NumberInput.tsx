import { ConfigProvider, InputNumber } from "antd"
import styled from "styled-components"

// 数字输入框  ???待修改
function NumberInput({...props}) {
  return (
    <ConfigProvider
        theme={{
            token: {
                /* 这里是你的全局 token */
                borderRadius:4,
                controlHeight: 36,
            },
        }}
        >
        <InputNumber {...props} />
    </ConfigProvider>
  )
}

export default NumberInput
