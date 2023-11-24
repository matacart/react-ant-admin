import { Content as AntdContent } from 'antd/es/layout/layout';
import { theme as AntdTheme } from 'antd';
import { Outlet } from 'react-router';

/**
 * admin 系统，主内容区域
 */
const Content = () => {
    const {
        token: { colorBgContainer },
    } = AntdTheme.useToken();

    return (
        <AntdContent
            style={{
                minHeight: 'calc(100vh - 60px)',
                padding: 24,
                marginLeft: 239,
                // background: colorBgContainer,
                backgroundColor: '#EAEDF1',
            }}
        >
            <Outlet></Outlet>
        </AntdContent>
    );
};

export default Content;
