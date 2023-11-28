// import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
    Squares,
    ShoppingBag,
    DocumentText,
    Shop,
    LiveBroadcast,
    Image,
    News,
    Google,
    WhatsApp,
    Facebook,
    Telegram,
} from '../component/Icon/Icon';
import { get } from '../locales/utils';

// const SIDER = [
//     {
//         TITLE: '首页',
//         INDEX: 'sub1',
//         ICON: <AppstoreOutlined />,
//     },
//     {
//         TITLE: '订单',
//         INDEX: 'sub2',
//         ICON: <FileTextOutlined />,
//         CHILD: [
//             {
//                 TITLE: '弃单',
//                 INDEX: '1',
//             },
//             {
//                 TITLE: '草稿单',
//                 INDEX: '2',
//             },
//         ],
//     },
//     {
//         TITLE: '商品',
//         INDEX: 'sub3',
//         ICON: <ShoppingOutlined />,
//         CHILD: [
//             {
//                 TITLE: '商品管理',
//                 INDEX: '3',
//             },
//             {
//                 TITLE: '橱窗推荐',
//                 INDEX: '4',
//             },
//             {
//                 TITLE: '分类',
//                 INDEX: '5',
//             },
//             {
//                 TITLE: '礼品卡',
//                 INDEX: '6',
//             },
//         ],
//     },
//     {
//         TITLE: '客户',
//         INDEX: 'sub4',
//         ICON: <UserOutlined />,
//         CHILD: [
//             {
//                 TITLE: '细分',
//                 INDEX: '7',
//             },
//         ],
//     },
//     {
//         TITLE: '折扣',
//         INDEX: 'sub5',
//         ICON: <TagOutlined />,
//     },
//     {
//         TITLE: '营销',
//         INDEX: 'sub6',
//         ICON: <CodepenOutlined />,
//         CHILD: [
//             {
//                 TITLE: '宣传活动',
//                 INDEX: '8',
//             },
//             {
//                 TITLE: '自动化',
//                 INDEX: '9',
//             },
//         ],
//     },
//     {
//         TITLE: '分析',
//         INDEX: 'sub7',
//         ICON: <PieChartOutlined />,
//         CHILD: [
//             {
//                 TITLE: '报告',
//                 INDEX: '10',
//             },
//             {
//                 TITLE: '实时分析',
//                 INDEX: '11',
//             },
//         ],
//     },
//     {
//         TITLE: '广告',
//         INDEX: 'sub8',
//         ICON: <IdcardOutlined />,
//     },
// ];

const SIDER = [
    {
        TITLE: <Link to="home">{get('SiderPage_home')}</Link>,
        INDEX: '/admin/home',
        ICON: <Squares />,
    },
    {
        TITLE: get('SiderPage_orderForm'),
        ICON: <DocumentText />,
        CHILD: [
            {
                TITLE: (
                    <Link to="orders">{get('SiderPage_orderForm_list')}</Link>
                ),
                INDEX: '/admin/orders',
            },
            {
                TITLE: (
                    <Link to="abandoningAnOrder">
                        {get('SiderPage_orderForm_abandonedSingle')}
                    </Link>
                ),
                INDEX: '/admin/abandoningAnOrder',
            },
            {
                TITLE: (
                    <Link to="draftForm">
                        {get('SiderPage_orderForm_draftSheet')}
                    </Link>
                ),
                INDEX: '/admin/draftForm',
            },
        ],
    },
    {
        TITLE: get('SiderPage_commodity'),
        ICON: <ShoppingBag />,
        CHILD: [
            {
                TITLE: (
                    <Link to="product">
                        {get('SiderPage_commodity_merchandiseControl')}
                    </Link>
                ),
                INDEX: '/admin/product',
            },
            {
                TITLE: (
                    <Link to="stock">
                        {get('SiderPage_commodity_repertory')}
                    </Link>
                ),
                INDEX: '/admin/stock',
            },
            {
                TITLE: (
                    <Link to="transfer">
                        {get('SiderPage_commodity_shift')}
                    </Link>
                ),
                INDEX: '/admin/transfer',
            },
            {
                TITLE: (
                    <Link to="classification">
                        {get('SiderPage_commodity_classify')}
                    </Link>
                ),
                INDEX: '/admin/classification',
            },
            {
                TITLE: (
                    <Link to="giftCard">
                        {get('SiderPage_commodity_giftCard')}
                    </Link>
                ),
                INDEX: '/admin/giftCard',
            },
        ],
    },
    {
        TITLE: get('SiderPage_onlineStore'),
        ICON: <Shop />,
        CHILD: [
            {
                TITLE: (
                    <Link to="onlineStore">
                        {get('SiderPage_onlineStore_shopDesign')}
                    </Link>
                ),
                INDEX: '/admin/onlineStore',
            },
            {
                TITLE: (
                    <Link to="blog">{get('SiderPage_onlineStore_blog')}</Link>
                ),
                INDEX: '/admin/blog',
            },
            {
                TITLE: (
                    <Link to="customPage">
                        {get('SiderPage_onlineStore_customPage')}
                    </Link>
                ),
                INDEX: '/admin/customPage',
            },
            {
                TITLE: (
                    <Link to="menuNavigation">
                        {get('SiderPage_onlineStore_menuNavigation')}
                    </Link>
                ),
                INDEX: '/admin/menuNavigation',
            },
            {
                TITLE: (
                    <Link to="preferences">
                        {get('SiderPage_onlineStore_preferenceSetting')}
                    </Link>
                ),
                INDEX: '/admin/preferences',
            },
        ],
    },
    /* {
        TITLE: <Link to="liveSales">直播销售</Link>,
        INDEX: '/admin/liveSales',
        ICON: <LiveBroadcast />,
    },
    {
        TITLE: <Link to="graphicSales">贴文销售</Link>,
        INDEX: '/admin/graphicSales',
        ICON: <Image />,
    },
    {
        TITLE: <Link to="news">消息</Link>,
        INDEX: '/admin/news',
        ICON: <News />,
    },
    {
        TITLE: <Link to="Google">Google</Link>,
        INDEX: '/admin/Google',
        ICON: <Google />,
    },
    {
        TITLE: <Link to="WhatsApp">WhatsApp</Link>,
        INDEX: '/admin/WhatsApp',
        ICON: <WhatsApp />,
    },
    {
        TITLE: <Link to="Facebook">Facebook</Link>,
        INDEX: '/admin/Facebook',
        ICON: <Facebook />,
    },
    {
        TITLE: <Link to="Telegram">Telegram</Link>,
        INDEX: '/admin/Telegram',
        ICON: <Telegram />,
    }, */
];

export { SIDER };
