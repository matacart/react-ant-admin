import { Breadcrumb as AntdBreadcrumb } from 'antd';

/**
 * admin 系统，内容头部导航
 *
 */
const Breadcrumb = () => {
    return (
        <AntdBreadcrumb
            style={{
                margin: '16px 0',
            }}
        >
            <AntdBreadcrumb.Item>Home</AntdBreadcrumb.Item>
            <AntdBreadcrumb.Item>List</AntdBreadcrumb.Item>
            <AntdBreadcrumb.Item>App</AntdBreadcrumb.Item>
        </AntdBreadcrumb>
    );
};

export default Breadcrumb;
