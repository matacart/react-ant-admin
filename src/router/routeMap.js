import { createBrowserRouter } from 'react-router-dom';
import { RouterBeforeEach } from './RouterBeforeEach';

import UserRoute from './modules/UserRoute';
import Layout from '../layout/Layout';
import ShopsRoute from './modules/ShopsRoute';
import Home from '../page/Home/Home';
import OrderRoute from './modules/OrderRoute';
import ProductRoute from './modules/ProductRoute';
import ShopSettingRoute from './modules/ShopSettingRoute';
import ChannelRoute from './modules/ChannelRoute';
import Settings from '../page/Settings/Settings';

/* // 创建路由表(老版本)
const routeMap = [
    {
        path: '/',
        component: <Navigate to={'/admin/home'} />,
    },
    // 用户
    ...UserRoute,
    // 店铺管理
    ...ShopsRoute,
    // 后台管理
    {
        path: '/admin',
        name: 'admin',
        element: <Layout />,
        children: [
            // 首页
            {
                path: '/admin/home',
                name: 'home',
                element: <Home />,
                handle: { title: '首页' },
            },
            // 订单
            ...OrderRoute,
            // 商品
            ...ProductRoute,
            // 商店
            ...ShopSettingRoute,
            // 渠道链接
            ...ChannelRoute,
            // 设置
            {
                path: '/admin/settings',
                name: 'settings',
                element: <Settings />,
                handle: { title: '设置' },
            },
        ],
    },
]; */

// 创建路由表 https://juejin.cn/post/7185897452862439485
const routeMap = createBrowserRouter([
    {
        path: '/',
        element: <RouterBeforeEach />,
        children: [
            // 用户
            ...UserRoute,
            // 店铺管理
            ...ShopsRoute,
            // 后台管理
            {
                path: '/admin',
                name: 'admin',
                element: <Layout />,
                children: [
                    // 首页
                    {
                        path: '/admin/home',
                        name: 'home',
                        element: <Home />,
                        handle: { title: '首页' },
                    },
                    // 订单
                    ...OrderRoute,
                    // 商品
                    ...ProductRoute,
                    // 在线商店
                    ...ShopSettingRoute,
                    // 渠道链接
                    ...ChannelRoute,
                    // 设置
                    {
                        path: '/admin/settings',
                        name: 'settings',
                        element: <Settings />,
                        handle: { title: '设置' },
                    },
                ],
            },
        ],
    },
]);

export default routeMap;
