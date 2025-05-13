import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, ButtonProps, ConfigProvider } from "antd";
import styled from "styled-components";


// onClick

interface DefaultButtonSecondaryProps extends ButtonProps {
    text: string;
}

export default function DefaultButtonSecondary({text,...prop}:DefaultButtonSecondaryProps){
    
    return (
        <Scoped>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            defaultActiveBorderColor:"#d7dbe7",
                            defaultBorderColor:"#d7dbe7",
                            defaultHoverBorderColor:"#d7dbe7",
                            defaultHoverColor:"#474F5E",
                            defaultActiveColor:"#474F5E",
                            defaultHoverBg:"#f7f8fb",
                            defaultActiveBg:"#f7f8fb",
                            borderRadius:4
                        },
                    },
                }}
                >
                <Button {...prop} className="default-btn">
                    {text}
                </Button>
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
    display: flex;
    .default-btn{
        height: 36px;
        min-width: 160px;
        border-color: #d7dbe7;
    }
`