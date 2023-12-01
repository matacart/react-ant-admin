import { Space, Image } from 'antd';
import { useGetIntl } from '../../../locales/utils';
import MainHeader from '../../../component/MainHeader/MainHeader';
import MainContent from '../../../component/MainContent/MainContent';

const OrderList = () => {
    const getIntl = useGetIntl();
    const data = {
        header: { title: getIntl.get('OrderList_header_title') },
        content: {
            tabs: [
                {
                    key: '1',
                    label: getIntl.get('All'),
                    children: '',
                },
                {
                    key: '2',
                    label: getIntl.get('OrderList_content_tabs2'),
                    children: '',
                },
                {
                    key: '3',
                    label: getIntl.get('OrderList_content_tabs3'),
                    children: '',
                },
                {
                    key: '4',
                    label: getIntl.get('OrderList_content_tabs4'),
                    children: '',
                },
                {
                    key: '5',
                    label: getIntl.get('OrderList_content_tabs5'),
                    children: '',
                },
            ],
            leftFilter: [
                {
                    itemType: 'Search',
                    placeholder: getIntl.get(
                        'OrderList_content_leftFilter1_placeholder',
                    ),

                    itemStyle: {
                        minWidth: 400,
                    },
                },
                {
                    itemType: 'Select',
                    defaultValue: getIntl.get(
                        'OrderList_content_leftFilter2_defaultValue',
                    ),
                    popupMatchSelectWidth: false,
                    showSearch: true,
                    itemStyle: { width: 140, height: 36 },
                    // suffixIcon: <Funnel />,
                    // filterOption,
                    // filterSort,
                },
                {
                    itemType: 'Select',
                    defaultValue: getIntl.get(
                        'OrderList_content_leftFilter3_defaultValue',
                    ),
                    popupMatchSelectWidth: false,
                    showSearch: true,
                    itemStyle: { width: 140, height: 36 },
                    // suffixIcon: <Funnel />,
                    // filterOption,
                    // filterSort,
                },
            ],
            rightFilter: [
                {
                    itemType: 'Button',
                    itemChild: getIntl.get('Product_Filter'),
                    itemStyle: { height: 36 },
                    // onClick: showDrawer,
                },
                {
                    itemType: 'Button',
                    itemChild: getIntl.get('Product_EditTheTableHead'),
                    itemStyle: { height: 36 },
                    // onClick: showDrawer,
                },
                {
                    itemType: 'Select',
                    defaultValue: getIntl.get('Product_Sort'),
                    itemStyle: { height: 36 },
                    popupMatchSelectWidth: false,
                    placement: 'bottomRight',
                    options: [
                        {
                            label: '排序方式',
                            options: [
                                {
                                    lable: '商品名称（A-Z）',
                                    value: '商品名称（A-Z）',
                                },
                                {
                                    lable: '商品名称（Z-A）',
                                    value: '商品名称（Z-A）',
                                },
                                {
                                    lable: '库存（从低到高）',
                                    value: '库存（从低到高）',
                                },
                                {
                                    lable: '库存（从高到低）',
                                    value: '库存（从高到低）',
                                },
                                {
                                    lable: '售价（从低到高）',
                                    value: '售价（从低到高）',
                                },
                                {
                                    lable: '售价（从高到低）',
                                    value: '售价（从高到低）',
                                },
                                {
                                    lable: '创建时间（从远到近）',
                                    value: '创建时间（从远到近）',
                                },
                                {
                                    lable: '创建时间（从近到远）',
                                    value: '创建时间（从近到远）',
                                },
                                {
                                    lable: '更新时间（从远到近）',
                                    value: '更新时间（从远到近）',
                                },
                                {
                                    lable: '更新时间（从近到远）',
                                    value: '更新时间（从近到远）',
                                },
                            ],
                        },
                    ],
                },
            ],
            tableTitle: [
                // {
                //     title: getIntl.get('OrderList_content_tableTitle1_title:'),
                //     dataIndex: 'orderNumber',
                //     key: 'orderNumber',
                // },
                {
                    title: getIntl.get('OrderList_content_tableTitle2_title'),
                    dataIndex: 'productInfo',
                    key: 'productInfo',
                    render: item => {
                        return (
                            <Space>
                                <Image
                                    src={item[0].productImage}
                                    width={60}
                                    height={70}
                                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                                />
                                <span>{item[0].productName}</span>
                            </Space>
                        );
                    },
                    sorter: {
                        compare: (a, b) =>
                            a.productInfo[0].productName.localeCompare(
                                b.productInfo[0].productName,
                            ),
                        multiple: 2,
                    },
                },
                {
                    title: getIntl.get('OrderList_content_tableTitle3_title'),
                    dataIndex: 'deliveryMethod',
                    key: 'deliveryMethod',
                },
                {
                    title: getIntl.get('OrderList_content_tableTitle4_title'),
                    dataIndex: 'paymentMethod',
                    key: 'paymentMethod',
                },
                {
                    title: getIntl.get('OrderList_content_tableTitle5_title'),
                    dataIndex: 'orderAmount',
                    key: 'orderAmount',
                    render: text => <>{'US$ ' + Number(text).toFixed(2)}</>,
                    sorter: {
                        compare: (a, b) =>
                            Number(a.orderAmount) - Number(b.orderAmount),
                        multiple: 3,
                    },
                },
                {
                    title: getIntl.get('OrderList_content_tableTitle6_title'),
                    dataIndex: 'orderTime',
                    key: 'orderTime',
                    defaultSortOrder: 'descend',
                    sorter: {
                        compare: (a, b) =>
                            a.orderTime.localeCompare(b.orderTime),
                        multiple: 1,
                    },
                },
                {
                    title: getIntl.get('OrderList_content_tableTitle7_title'),
                    dataIndex: 'state',
                    key: 'state',
                },
                {
                    title: getIntl.get('OrderList_content_tableTitle8_title'),
                    dataIndex: 'operation',
                    key: 'operation',
                },
            ],
        },
    };

    return (
        <>
            <MainHeader {...data.header} />

            <MainContent {...data.content} />
        </>
    );
};

export default OrderList;
