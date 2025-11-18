import { ConfigProvider, DatePicker } from "antd";


const { RangePicker } = DatePicker;
function MyRangePicker({...props}) {

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                    /* 这里是你的全局 token */
                        borderRadius:4,
                        paddingXXS:0,
                        // paddingSM:12
                    }
                }}
            >
                <RangePicker {...props} />
            </ConfigProvider>
        </>
    )
}

export default MyRangePicker