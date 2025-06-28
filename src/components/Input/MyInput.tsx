import { ConfigProvider, Input, InputProps  } from "antd"
import styled from "styled-components"

interface MyInputProps extends InputProps{
    ref?:any
}

function MyInput({...props}:MyInputProps) {
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