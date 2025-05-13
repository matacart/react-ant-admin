import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import styled from "styled-components";

export default function DangerButton({text,icon,loading,onClick}:{text:string,icon?:React.ReactNode,loading?:boolean,onClick?:()=>void}){
    
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
                <Button color="danger" variant="solid" loading={loading} icon={icon} onClick={onClick} className="danger-btn">
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