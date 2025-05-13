import { Alert, ConfigProvider } from "antd";

export default function MyAlert({...props}){

    return(
        <ConfigProvider
            theme={{
                token: {
                /* 这里是你的全局 token */
                    borderRadius:4
                },
            }}
            >
            <Alert {...props} />
        </ConfigProvider>
    )
}