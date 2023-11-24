import { Layout as AntdLayout } from 'antd';
import Header from './component/Header/Header';
import Sider from './component/Sider/Sider';
import Content from './component/Content/Content';

const Layout = adminMap => {
    return (
        <AntdLayout>
            <Header />

            <AntdLayout hasSider>
                <Sider />
                <AntdLayout>
                    <Content></Content>
                </AntdLayout>
            </AntdLayout>
        </AntdLayout>
    );
};
export default Layout;
