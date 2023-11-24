import NotOpen from '../../page/NotOpen/NotOpen';

const OrderRoute = [
    {
        path: '/admin/orders',
        name: 'orders',
        element: <NotOpen />,
        handle: { title: '订单列表' },
    },
    {
        path: '/admin/abandoningAnOrder',
        name: 'abandoningAnOrder',
        element: <NotOpen />,
        handle: { title: '弃单' },
    },
    {
        path: '/admin/draftForm',
        name: 'draftForm',
        element: <NotOpen />,
        handle: { title: '草稿单' },
    },
];

export default OrderRoute;
