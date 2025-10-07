import { SearchOutlined } from "@ant-design/icons"
import { Button, ConfigProvider, Input, InputProps, InputRef } from "antd"
import { SearchProps } from "antd/es/input";
import { useState } from "react";
import styled from "styled-components"

const { Search } = Input;
// 自定义搜索框
const MySearch = ({...props})=>{
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
            <Search {...props} enterButton={
                <Button className="search-btn" icon={<SearchOutlined />} style={{width:"36px",height:"36px"}} />
            } />
          </Scoped>
    </ConfigProvider>
  )
}


export default MySearch

const Scoped = styled.div`
    width: 100%;
    .ant-input{
      height: 36px;
    }
`