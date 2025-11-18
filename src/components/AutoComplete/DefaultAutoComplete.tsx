import { AutoComplete, ConfigProvider } from "antd";

export default function DefaultAutoComplete({...props}){
    
    return (
        <ConfigProvider
            theme={{
                token: {
                    /* 这里是你的全局 token */
                    borderRadius:4,
                    controlHeight:36,
                },
            }}
        >
            <AutoComplete {...props} />
        </ConfigProvider>
    )
}