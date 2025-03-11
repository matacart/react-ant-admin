import { Button, Dropdown, MenuProps, theme } from "antd";
import React, { useState } from "react";
import { styled } from 'styled-components';

const { useToken } = theme;
// 自定义下拉
export default function MyDropdown({component,itemList,styled,position}:{component:any,itemList:any,styled:any,position:any}) {

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

    const items: MenuProps['items'] = itemList

    return (
        <>
            <Dropdown menu={{ items }} dropdownRender={(menu)=>(
                <div style={contentStyle}>
                    <div style={styled}>
                        {/* <div className="font-12 color-B8BECC" style={{padding:"8px 12px"}}>选择排序方式</div> */}
                        {React.cloneElement(
                            menu as React.ReactElement<{
                                style: React.CSSProperties;
                            }>,
                            { style: menuStyle },
                        )}
                    </div>
                </div>
            )} trigger={['click']} placement={position}>
                {component}
            </Dropdown>
        </>
    )
}