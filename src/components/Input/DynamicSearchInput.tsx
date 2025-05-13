import { SearchOutlined } from "@ant-design/icons"
import { ConfigProvider, Input } from "antd"
import styled from "styled-components"


// 
function DynamicSearchInput({...props}) {
  return (
    <ConfigProvider
        theme={{
            token: {
                /* 这里是你的全局 token */
                borderRadius:4
            },
        }}
        >
          <Scoped>
            <Input {...props} className="input"  />
          </Scoped>
    </ConfigProvider>
  )
}

export default DynamicSearchInput

const Scoped = styled.div`
    .input{
        height: 36px;
    }
`