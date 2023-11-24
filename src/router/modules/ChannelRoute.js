import NotOpen from '../../page/NotOpen/NotOpen';

/**
 * 渠道链接
 */
const ChannelRoute = [
    {
        path: '/admin/liveSales',
        name: 'liveSales',
        element: <NotOpen />,
    },
    {
        path: '/admin/graphicSales',
        name: 'graphicSales',
        element: <NotOpen />,
    },
    {
        path: '/admin/news',
        name: 'news',
        element: <NotOpen />,
    },
    {
        path: '/admin/Google',
        name: 'Google',
        element: <NotOpen />,
    },
    {
        path: '/admin/WhatsApp',
        name: 'WhatsApp',
        element: <NotOpen />,
    },
    {
        path: '/admin/Facebook',
        name: 'Facebook',
        element: <NotOpen />,
    },
    {
        path: '/admin/Telegram',
        name: 'Telegram',
        element: <NotOpen />,
    },
];

export default ChannelRoute;
