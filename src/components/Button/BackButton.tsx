import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";

export default function BackButton(){
    
    return (
        <Scoped>
            {/* 回退 */}
            <Button className="header-backBtn" icon={<ArrowLeftOutlined />}
                onClick={() => {
                    window.history.back();
                }}
            >
            </Button>
        </Scoped>
    )
}

const Scoped = styled.div`
    display: flex;
    background-color: transparent;
`