import { Button, Dropdown, MenuProps, theme } from "antd";
import React from "react";
import { styled } from 'styled-components';

const { useToken } = theme;
// 下拉排序
export default function DropdownSort(props:any) {

    const { token } = useToken();

    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };

    const menuStyle: React.CSSProperties = {
        padding: 0,
        paddingBottom:"8px",
        boxShadow: 'none',
    };

    const items: MenuProps['items'] = props.items


    return (
        <>
            <Dropdown menu={{ items,selectable: true }} dropdownRender={(menu)=>(
                <div style={contentStyle}>
                    <div style={props.styled}>
                        <div className="font-12 color-B8BECC" style={{padding:"8px 12px"}}>选择排序方式</div>
                        {React.cloneElement(
                            menu as React.ReactElement<{
                                style: React.CSSProperties;
                            }>,
                            { style: menuStyle },
                        )}
                    </div>
                </div>
            )} trigger={['click']}>
                <Button>排序</Button>
            </Dropdown>
        </>
    )
}