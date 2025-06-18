import { SearchOutlined } from "@ant-design/icons"
import { ConfigProvider, InputNumber } from "antd"
import styled from "styled-components"

// 数字输入框
function NumberInput({...props}) {
  return (
    <ConfigProvider
        theme={{
            token: {
                /* 这里是你的全局 token */
                borderRadius:4
            },
        }}
        >
        <ScopedNumber {...props} />
    </ConfigProvider>
  )
}

export default NumberInput

const ScopedNumber = styled(InputNumber)`
  height: 36px;
`