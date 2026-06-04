import { AutoComplete, AutoCompleteProps, Button, ConfigProvider, Flex, Input, Select } from "antd";
import styled from "styled-components";
import { AddIcon, SearchIcon, UnfoldIcon } from "../Icons/Icons";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

interface MyAutoCompleteProps extends Omit<AutoCompleteProps, 'popupRender'> {
    onClick?: () => void; // 可选的 onClick 属性
}
export default function CustomerAutoComplete({onClick,placeholder,...props}:MyAutoCompleteProps){

    return (
        <Scoped>
            {/* 回退 */}
            <ConfigProvider
                theme={{
                    token: {
                        /* 这里是你的全局 token */
                        paddingXXS:0,
                    },

                    components: {
                        Input: {
                            borderRadius:4,
                        },
                    },
                }}
            >
                
                <AutoComplete {...props}
                    popupRender={(menu) => {
                        return (
                            <div style={{overflow: 'auto', maxHeight: 300,margin:"2px 0 8px 0"}}>
                                <Flex className="color-356DFF cursor-pointer" gap={8} style={{padding:"8px 12px",borderBottom:"1px solid #E6E6E6"}} onClick={onClick}>
                                    <AddIcon className="font-18" />
                                    <div>创建新客户</div>
                                </Flex>
                                {menu}
                            </div>
                        )
                    }}
                >
                {/*  */}
                    <Input className="input" placeholder={placeholder?.toString() || ""} suffix={<SearchOutlined />} />
                </AutoComplete>
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
    width: 100%;
    .input{
        height: 36px;
    }
    
`