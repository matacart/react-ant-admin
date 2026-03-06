import { ConfigProvider, Dropdown, MenuProps, theme } from "antd";
import React from "react";
import { styled } from 'styled-components';
import DefaultButton from "../Button/DefaultButton";
import { useIntl } from "@umijs/max";

const { useToken } = theme;
// 下拉排序
export default function DropdownSort(props:any) {

    const { token } = useToken();

    const intl = useIntl();

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
        <Scoped>
            <ConfigProvider
                theme={{
                    token: {
                        
                    },
                }}
            >
                <Dropdown menu={{ items,selectable: true }} popupRender={(menu)=>(
                    <div style={contentStyle}>
                        <div style={props.styled}>
                            <div className="font-12 color-B8BECC" style={{padding:"8px 12px"}}>{intl.formatMessage({ id: 'components.dropdown.dropdownSort.selectSortText' })}</div>
                            {React.cloneElement(
                                menu as React.ReactElement<{
                                    style: React.CSSProperties;
                                }>,
                                { style: menuStyle },
                            )}
                        </div>
                    </div>
                )} trigger={['click']} placement="bottomRight">
                    <DefaultButton text={intl.formatMessage({ id: 'components.dropdown.dropdownSort.sortText' })} />
                </Dropdown>
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
   
`