import { Button, ConfigProvider, Dropdown, MenuProps, theme } from "antd";
import React, { useState } from "react";

const { useToken } = theme;
export default function MyDropDownSecondary({tiggerEle,...props}:any) {

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        paddingXXS:0 
                    },
                }}
            >
                <Dropdown {...props} trigger={['click']}>
                    {tiggerEle}
                </Dropdown>
            </ConfigProvider>
        </>
    )
}