import { SearchOutlined } from "@ant-design/icons"
import { ConfigProvider, Input, InputNumber } from "antd"

function DefaultInput({...props}) {
  return (
        <ConfigProvider
            theme={{
                token: {
                    /* 这里是你的全局 token */
                    borderRadius:4
                },
            }}
        >
            <Input style={{height:"36px"}} {...props} />
        </ConfigProvider>
  )
}

export default DefaultInput