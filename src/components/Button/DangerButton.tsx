import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, ButtonProps, ConfigProvider } from "antd";
import styled from "styled-components";

interface MyButtonProps extends ButtonProps {
    text: string;
    icon?:React.ReactNode;
}

export default function DangerButton({text,icon,...props}:MyButtonProps){
    
    return (
        <Scoped>
            {/* 回退 */}
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            // defaultBg:"#356DFF",
                            borderRadius:4
                        },
                    },
                }}
                >
                <Button color="danger" variant="solid" className="danger-btn" {...props}>
                    {text}
                </Button>
            </ConfigProvider>
            
        </Scoped>
    )
}

const Scoped = styled.div`
    display: flex;
    .danger-btn{
        height: 36px;
    }
`