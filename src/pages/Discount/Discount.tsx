import { Flex } from "antd";
import styled from "styled-components";

export default function Discount() {
    return (
        <Scoped>
            <Flex align="center" justify="center" style={{height:"100%",fontSize:"20px",fontWeight:"600"}}>开发升级中</Flex>
        </Scoped>
    )
}

const Scoped = styled.div`
    height: calc(100vh - 128px);
`;