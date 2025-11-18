import { ConfigProvider, Input, InputNumber } from "antd"


const {TextArea} = Input

// 文本输入
function DefaultTextArea({...props}) {
  return (
    <ConfigProvider
        theme={{
            token: {
                /* 这里是你的全局 token */
                borderRadius:4,
                controlHeight:36,
            },
        }}
        >
        <TextArea {...props} />
    </ConfigProvider>
  )
}
export default DefaultTextArea