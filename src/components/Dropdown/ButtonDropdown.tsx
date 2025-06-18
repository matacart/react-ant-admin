import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Dropdown, DropdownProps, Flex, MenuProps, message, Space, theme } from "antd";
import React, { ReactNode, useRef, useState } from "react";
import { styled } from 'styled-components';
import { UnfoldIcon } from "../Icons/Icons";

const { useToken } = theme;

interface ButtonDropdownProps extends DropdownProps {
  text: string;
}

// 自定义下拉
function ButtonDropdown({text,...props}:ButtonDropdownProps) {

    const Ref = useRef(null)

    return (
        <Scoped ref={Ref}>
          <ConfigProvider
            theme={{
              token: {
                /* 这里是你的全局 token */
                controlItemBgHover:"#f0f7ff"
              },
              components: {
                  Button: {
                      defaultActiveBorderColor:"#d7dbe7",
                      defaultBorderColor:"#d7dbe7",
                      defaultHoverBorderColor:"#d7dbe7",
                      defaultHoverColor:"#474F5E",
                      defaultActiveColor:"#474F5E",
                      defaultHoverBg:"#f7f8fb",
                      defaultActiveBg:"#f7f8fb",
                      borderRadius:4
                  },
                  Dropdown:{
                    paddingXXS:0
                  }
              },
            }}
            >
            <Dropdown getPopupContainer={()=>Ref.current!} {...props} trigger={['click']}>
              <Button icon={<UnfoldIcon className={"font-16"} />} iconPosition={"end"} className="default-btn">
                <Flex align="center">
                  {text}
                </Flex>
              </Button >
            </Dropdown>
          </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
  font-size: 0;
  .default-btn{
    height: 36px;
    border-color: #d7dbe7;
  }
  .ant-dropdown-menu{
    padding: 8px 0;
  }
`

export default ButtonDropdown