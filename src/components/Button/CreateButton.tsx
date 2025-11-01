import { useIntl } from "@umijs/max";
import { Button, ButtonProps, ConfigProvider } from "antd";
import styled from "styled-components";


export default function CreateButton({...props}:ButtonProps){

    const intl = useIntl();
    
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
                <Button {...props} type="primary" className="default-btn">
                    {intl.formatMessage({id:'component.button.createButton'})}
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