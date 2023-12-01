import { Space, Image, Switch, Button, message } from 'antd';
import { delProduct, changeProductStatus } from '../../api/productApi';
import { getToken } from '../../util/auth';
import MainHeader from '../../component/MainHeader/MainHeader';
import ContentTab from '../../component/ContentTab/ContentTab';
import Content from '../../component/Content/Content';
import { GetIntl, useGetIntl } from '../../locales/utils';
import './Product.scss';

/**
 * 产品管理页面
 */
const Product = () => {
    const getIntl = useGetIntl();

    const data = {
        header: {
            title: GetIntl('SiderPage_commodity_merchandiseControl'),
            uploadText: GetIntl('Product_Header1'),
            rButtonText: GetIntl('Product_Header_Button'),
            rHref: '/admin/product/new',
        },
        tab: {
            items: [
                {
                    label: GetIntl('Produc_tabs_All'),
                    children: '',
                    key: '1',
                },
                {
                    label: GetIntl('Product_tabs_OnTheShelves'),
                    children: '',
                    key: '2',
                },
                {
                    label: GetIntl('Product_tabs_OffTheShelf'),
                    children: '',
                    key: '3',
                },
                {
                    label: GetIntl('Product_tabs_Archived'),
                    children: '',
                    key: '4',
                },
            ],
            type: '',
        },
        tableTitle: [
            {
                title: GetIntl('SiderPage_commodity'),
                dataIndex: 'commodity',
                key: 'commodity',
                render: (_, record) => {
                    return (
                        <Space>
                            <Image
                                src={record.productImage}
                                width={60}
                                height={70}
                                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                            />
                            <span>{record.commodity}</span>
                        </Space>
                    );
                },
                sorter: {
                    compare: (a, b) => a.commodity.localeCompare(b.commodity),
                    multiple: 2,
                },
            },
            {
                title: GetIntl('Product_Table_Title2'),
                dataIndex: 'price',
                key: 'price',
                render: text => <>{'US$' + Number(text).toFixed(2)}</>,
                sorter: {
                    compare: (a, b) => Number(a.price) - Number(b.price),
                    multiple: 4,
                },
            },
            /*  {
                title: GetIntl('Product_Table_Title3'),
                dataIndex: 'inventory',
                key: 'inventory',
                sorter: {
                    compare: (a, b) => a.inventory.localeCompare(b.inventory),
                    multiple: 3,
                },
            }, */
            {
                title: GetIntl('Product_Table_Title4'),
                dataIndex: 'creationTime',
                key: 'creationTime',
                defaultSortOrder: 'descend',
                sorter: {
                    compare: (a, b) =>
                        a.creationTime.localeCompare(b.creationTime),
                    multiple: 1,
                },
            },
            {
                title: GetIntl('Product_Table_Title5'),
                dataIndex: 'state',
                key: 'state',
                render: (text, record) => {
                    return (
                        <>
                            <Switch
                                defaultChecked={text === '1' ? true : false}
                                onChange={async value => {
                                    const formData = new FormData();
                                    formData.append('id', record.key);
                                    formData.append(
                                        'status',
                                        value ? '1' : '0',
                                    );
                                    formData.append('access_token', getToken());
                                    try {
                                        const res =
                                            await changeProductStatus(formData);
                                        message.success(
                                            getIntl.get(
                                                'Message_success_StatusChange',
                                            ),
                                        );
                                    } catch (error) {
                                        message.error(
                                            getIntl.get(
                                                'Message_error_StatusChange',
                                            ),
                                        );
                                        throw error;
                                    }
                                }}
                            />
                            <span>
                                {text === '1'
                                    ? GetIntl('Product_Table_Title5_text1')
                                    : GetIntl('Product_Table_Title5_text2')}
                            </span>
                        </>
                    );
                },
            },
            {
                title: GetIntl('Product_Table_Title6'),
                dataIndex: 'operation',
                key: 'operation',
                render: (_, record) => {
                    return (
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => {
                                    window.open(
                                        'https://' +
                                            'r0201.demo.hdyshop.cn' +
                                            '/h-product-detail-p' +
                                            record.key +
                                            '.html',
                                        { replace: true },
                                    );
                                }}
                            >
                                {GetIntl('Product_Table_Title6_Button1')}
                            </Button>
                            <Button
                                type="primary"
                                danger
                                onClick={async () => {
                                    const formData = new FormData();
                                    formData.append('id', record.key);
                                    formData.append('access_token', getToken());
                                    try {
                                        const res = await delProduct(formData);
                                    } catch (error) {
                                        throw error;
                                    }
                                }}
                            >
                                {GetIntl('Product_Table_Title6_Button2')}
                            </Button>
                        </Space>
                    );
                },
            },
        ],
    };

    return (
        <>
            <MainHeader {...data.header} />
            <div className="pageContent">
                <ContentTab {...data.tab} />

                <Content tableTitle={data.tableTitle} />
            </div>
        </>
    );
};

export default Product;
