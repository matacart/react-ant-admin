import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Dropdown, Flex, MenuProps, message, Space, theme } from "antd";
import React, { ReactNode, useRef, useState } from "react";
import { styled } from 'styled-components';
import { UnfoldIcon } from "../Icons/Icons";

const { useToken } = theme;

interface ButtonDropdownProps extends React.ComponentProps<typeof Dropdown>{
  text: string;
  btnStyle?:any
}

// 自定义下拉
function ButtonDropdownSecondary({text,btnStyle,...props}:ButtonDropdownProps) {

    const Ref = useRef(null)

    const [open,setOpen] = useState(false)

    const onOpenChange = (open:boolean) => {
      setOpen(open)
    }

    return (
      <Scoped ref={Ref}>
        <ConfigProvider
          theme={{
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
          <Dropdown {...props} onOpenChange={onOpenChange} getPopupContainer={()=>Ref.current!} >
            <Button className="default-btn" style={btnStyle}>
              <Flex align="center" style={{width:"100%"}} justify="space-between">
                <div>{text}</div>
                <UnfoldIcon className={open?"font-16 unfold-icon":"font-16"} />
              </Flex>
            </Button>
          </Dropdown>
        </ConfigProvider>
      </Scoped>
    )
}

const Scoped = styled.div`
  display: flex;
  .default-btn{
    height: 36px;
    border-color: #d7dbe7;
  }
  .ant-dropdown-menu{
    padding: 8px 0;
  }
  .unfold-icon{
    transform: rotate(180deg);
  }
`

export default ButtonDropdownSecondary