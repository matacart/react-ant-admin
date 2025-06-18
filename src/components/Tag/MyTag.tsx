import { Tag, TagProps } from "antd"
import React from "react";
import styled from "styled-components"

interface MyTagProps extends TagProps {
    text?: React.ReactNode;
}

export default function MyTag({text,...props}:MyTagProps){
    return(
        <Scoped>
            <Tag {...props} style={{borderRadius:"9999px",padding:"0 8px"}}>
                {text}
            </Tag>
        </Scoped>
    )
}

const Scoped = styled.div`
    
`