import OnlineStore from '../../page/OnlineStore/OnlineStore';
import NotOpen from '../../page/NotOpen/NotOpen';

/**
 * 在线商店
 */
const ShopRoute = [
    {
        path: '/admin/onlineStore',
        name: 'onlineStore',
        element: <OnlineStore />,
        handle: { title: '店铺设计' },
    },
    {
        path: '/admin/blog',
        name: 'blog',
        element: <NotOpen />,
        handle: { title: '博客' },
    },
    {
        path: '/admin/customPage',
        name: 'customPage',
        element: <NotOpen />,
        handle: { title: '自定义页面' },
    },
    {
        path: '/admin/menuNavigation',
        name: 'menuNavigation',
        element: <NotOpen />,
        handle: { title: '菜单导航' },
    },
    {
        path: '/admin/preferences',
        name: 'preferences',
        element: <NotOpen />,
        handle: { title: '偏好设置' },
    },
];

export default ShopRoute;
