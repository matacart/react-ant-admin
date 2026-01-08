import { SearchOutlined } from "@ant-design/icons";
import { useIntl } from "@umijs/max";
import { ConfigProvider, Input } from "antd";

function SearchAll(){

    const intl = useIntl();

    return (
        <ConfigProvider
            theme={{
                token: {
                    /* 这里是你的全局 token */
                    borderRadius:4
                },
            }}
        >
            <Input prefix={<SearchOutlined />} style={{maxWidth:"600px",minWidth:"100px"}} placeholder={intl.formatMessage({id: 'components.header.search'})} />
        </ConfigProvider>
    )
}

export default SearchAll;