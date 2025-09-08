import { ConfigProvider, Dropdown, MenuProps, theme } from "antd";
import React from "react";

const { useToken } = theme;
// 自定义下拉
export default function MyDropdownExpansion({tiggerEle,theme,...props}:any) {

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
                theme={theme}
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