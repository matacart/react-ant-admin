import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Dropdown, Flex, MenuProps, message, Space, theme } from "antd";
import React, { ReactNode, useRef, useState } from "react";
import { styled } from 'styled-components';
import { UnfoldIcon } from "../Icons/Icons";

const { useToken } = theme;

interface ButtonDropdownProps {
  items: MenuProps['items'];
  text: string;
}

// 自定义下拉
function ButtonDropdown({items,text}:ButtonDropdownProps) {

    const Ref = useRef(null)

    const [open,setOpen] = useState(false)

    const onOpenChange = (open:boolean) => {
      setOpen(open)
    }

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
            <Dropdown onOpenChange={onOpenChange} getPopupContainer={()=>Ref.current!} menu={{items}} trigger={['click']}>
              <Button className="default-btn">
                <Flex align="center">
                  {text}
                  <UnfoldIcon className={"font-16"} />
                </Flex>
              </Button>
            </Dropdown>
          </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
  .default-btn{
    height: 36px;
    border-color: #d7dbe7;
  }
  .ant-dropdown-menu{
    padding: 8px 0;
  }
`

export default ButtonDropdown