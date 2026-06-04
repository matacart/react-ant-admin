import { Card, CardProps, ConfigProvider } from "antd";
import React from "react";

export default function MyCard({...props}:CardProps){
    return (
        <ConfigProvider
            theme={{
                components: {
                    Card: {
                        borderRadiusLG:4
                    },
                },
            }}
            >
            <Card {...props} />
        </ConfigProvider>
    )
}