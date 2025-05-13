import { ConfigProvider, Input, InputNumber } from "antd"
import styled from "styled-components"

function MyInput({...props}) {
  return (
    <ConfigProvider
        theme={{
            token: {
                /* 这里是你的全局 token */
                borderRadius:4
            },
        }}
        >
        <Input {...props} />
    </ConfigProvider>
  )
}
export default MyInput