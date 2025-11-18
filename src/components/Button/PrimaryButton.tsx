import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, ButtonProps, ConfigProvider } from "antd";
import styled from "styled-components";

interface MyButtonProps extends ButtonProps {
    text: string;
    icon?:React.ReactNode;
}

export default function PrimaryButton({text,icon,...props}:MyButtonProps){

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
                <Button type="primary" className="default-btn" icon={icon} {...props}>
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
        border-color: #d7dbe7;
    }
`