import { ConfigProvider, DatePicker } from "antd"

const { RangePicker } = DatePicker;
// 文本输入
function MyRangePicker({...props}) {
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
        <RangePicker {...props} />
    </ConfigProvider>
  )
}
export default MyRangePicker