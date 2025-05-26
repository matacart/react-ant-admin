import { ConfigProvider, DatePicker } from "antd";

function MyDatePicker({...props}) {

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                    /* 这里是你的全局 token */
                        borderRadius:4,
                        paddingXXS:0,
                        // paddingSM:12
                    },
                }}
            >
                <DatePicker {...props} />
            </ConfigProvider>
        </>
    )
}

export default MyDatePicker