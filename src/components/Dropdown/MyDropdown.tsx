import { Button, ConfigProvider, Dropdown, MenuProps, theme } from "antd";
import React, { useState } from "react";

const { useToken } = theme;
// 自定义下拉
export default function MyDropdown({tiggerEle,...props}:any) {

    const { token } = useToken();

    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };

    const menuStyle: React.CSSProperties = {
        padding: "8px 0",
        boxShadow: 'none',
    };

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        paddingXXS:0 
                    },
                }}
            >
                <Dropdown {...props}  
                    trigger={['click']} 
                    dropdownRender={(menu)=>{
                        return (
                            <div style={contentStyle}>
                                <div>
                                    {React.cloneElement(
                                        menu as React.ReactElement<{
                                            style: React.CSSProperties;
                                        }>,
                                        { style: menuStyle },
                                    )}
                                </div>
                            </div>
                        )
                    }}
                >
                    {tiggerEle}
                </Dropdown>
            </ConfigProvider>
        </>
    )
}