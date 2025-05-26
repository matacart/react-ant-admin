import { Button, ButtonProps, ConfigProvider } from "antd";
import styled from "styled-components";

interface ButtonIconProps extends ButtonProps {
    icon: any;
}

export default function ButtonIcon({icon,...props}:ButtonIconProps){
    
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
                <Button className="default-btn" {...props}>
                    {icon}
                </Button>
            </ConfigProvider>
        </Scoped>
    )
}

const Scoped = styled.div`
    display: flex;
    .default-btn{
        height: 36px;
        border-color: #d7dbe7;
    }
`