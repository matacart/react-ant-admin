import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import styled from "styled-components";

export default function PrimaryButton({text,icon,loading,onClick}:{text:string,icon?:React.ReactNode,loading?:boolean,onClick?:()=>void}){


    
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
                <Button type="primary" loading={loading} className="default-btn" icon={icon} onClick={onClick}>
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