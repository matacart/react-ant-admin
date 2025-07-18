import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, ButtonProps, ConfigProvider } from "antd";
import styled from "styled-components";

interface MyButtonProps extends ButtonProps {
    text: string;
}

export default function MyButton({text,...props}:MyButtonProps){
    
    return (
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
                    {text}
                </Button>
            </ConfigProvider>
    )
}

// const Scoped = styled.div`
//     display: flex;
// `