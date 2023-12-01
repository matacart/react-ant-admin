import { Content as AntdContent } from 'antd/es/layout/layout';
import { theme as AntdTheme } from 'antd';
import { Outlet } from 'react-router';
import './Content.scss';

/**
 * admin 系统，主内容区域
 */
const Content = () => {
    const {
        token: { colorBgContainer },
    } = AntdTheme.useToken();

    return (
        <AntdContent
            className="antdContent"
            style={{
                minHeight: 'calc(100vh - 60px)',
                padding: 24,
                backgroundColor: '#EAEDF1',
            }}
        >
            <Outlet></Outlet>
        </AntdContent>
    );
};

export default Content;
