import { ConfigProvider, Input, InputProps  } from "antd"
import { forwardRef } from "react"

interface MyInputProps extends InputProps{
    ref?:any
}

const MyInput = forwardRef<HTMLInputElement, any>((props:MyInputProps, ref) => {
  return (
    <ConfigProvider
        theme={{
            token: {
                /* 这里是你的全局 token */
                borderRadius:4
            },
        }}
        >
        <Input ref={ref} {...props} />
    </ConfigProvider>
  )
})
export default MyInput