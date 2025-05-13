import { ConfigProvider, Input, InputNumber } from "antd"


const {TextArea} = Input

// 文本输入
function MyTextArea({...props}) {
  return (
    <ConfigProvider
        theme={{
            token: {
                /* 这里是你的全局 token */
                borderRadius:4
            },
        }}
        >
        <TextArea {...props} />
    </ConfigProvider>
  )
}
export default MyTextArea