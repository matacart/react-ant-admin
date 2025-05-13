import { SearchOutlined } from "@ant-design/icons"
import { ConfigProvider, Input, InputNumber } from "antd"
import styled from "styled-components"

function DefaultInput({...props}) {
  return (
    <Scoped>
        <ConfigProvider
            theme={{
                token: {
                    /* 这里是你的全局 token */
                    borderRadius:4
                },
            }}
            >
            <Input className="default-input" {...props} />
        </ConfigProvider>
    </Scoped>
  )
}

export default DefaultInput

const Scoped = styled.div`
    .default-input{
        height: 36px;
        width: 100%;
    }
`