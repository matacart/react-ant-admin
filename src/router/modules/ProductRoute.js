import Product from '../../page/Product/Product';
import ProductsNew from '../../page/ProductsNew/ProductsNew';
import NotOpen from '../../page/NotOpen/NotOpen';

/**
 * 商品路由
 */
const ProductRoute = [
    {
        path: '/admin/product/',
        name: 'product',
        element: <Product />,
        handle: { title: '商品' },
    },
    {
        path: '/admin/product/new',
        name: 'productsNew',
        element: <ProductsNew />,
        handle: { title: '创建商品' },
    },
    {
        path: '/admin/stock',
        name: 'stock',
        element: <NotOpen />,
        handle: { title: '库存' },
    },
    {
        path: '/admin/transfer',
        name: 'transfer',
        element: <NotOpen />,
        handle: { title: '转移' },
    },
    {
        path: '/admin/classification',
        name: 'classification',
        element: <NotOpen />,
        handle: { title: '分类' },
    },
    {
        path: '/admin/giftCard',
        name: 'giftCard',
        element: <NotOpen />,
        handle: { title: '礼品卡' },
    },
];
export default ProductRoute;
