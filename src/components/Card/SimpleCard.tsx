import { Card } from "antd";
import React from "react";
import styled from "styled-components";

export default function SimpleCard({title,content,extra}:{title:React.ReactNode,content:React.ReactNode,extra?:React.ReactNode}){

    return (
        <Scoped>
            <Card title={title} extra={extra}>
                {content}
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`

    .ant-card-head{
        padding: 0;
        margin: 0 24px;
    }
    
`