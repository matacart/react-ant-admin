import { SearchOutlined } from "@ant-design/icons"
import { ConfigProvider, Input } from "antd"
import styled from "styled-components"


// 带有搜索Icon的输入框
function SearchInput({...props}) {
  return (
    <ConfigProvider
        theme={{
            token: {
                /* 这里是你的全局 token */
                borderRadius:4
            },
        }}
        >
        <ScopedInput className="search-input" {...props} prefix={<SearchOutlined />} />
    </ConfigProvider>
  )
}

export default SearchInput

const ScopedInput = styled(Input)`
    width: 100%;
    &.search-input{
        height: 36px;
    }
`