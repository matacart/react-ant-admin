import { useState } from 'react';
import { Flex, Empty, Button, Table, Skeleton } from 'antd';
import { getProductList } from '../../api/productApi';
import { getToken } from '../../util/auth';
import { Funnel } from '../../component/Icon/Icon';
import NoData from '../../assets/imgs/no_data.svg';
import DataProcessing from '../../component/DataProcessing/DataProcessing';
import Drawer from '../../component/Drawer/Drawer';
import Collapse from '../../component/Collapse/Collapse';
import { useGetIntl } from '../../locales/utils';
import './Content.scss';

const filterOption = (input, option) => (option?.label ?? '').includes(input);
const filterSort = (optionA, optionB) =>
    (optionA?.label ?? '')
        .toLowerCase()
        .localeCompare((optionB?.label ?? '').toLowerCase());

/**
 * 复选框
 */
const rowSelection = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows,
        );
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
};

const Content = ({ tableTitle }) => {
    const getIntl = useGetIntl();
    const [open, setOpen] = useState(false);
    const [drawerData, setDrawerData] = useState({});
    const [data, setData] = useState();
    const [tableData, setTableData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState();

    // 发送请求，获取 商品列表
    const getData = (page = 1, limit = 10) => {
        if (!tableLoading) setTableLoading(true);
        getProductList(page, limit, getToken())
            .then(req => {
                let listData = req.data.data;
                setData(req.data);
                if (listData.length > 0) {
                    listData = listData.map(item => {
                        return {
                            key: item.id,
                            productImage: item.product_image,
                            commodity: item.title,
                            price: item.price,
                            inventory: 0 + '件在售',
                            creationTime: item.create_time,
                            state: item.status,
                            operation: 6,
                        };
                    });
                    setTableData(listData);
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
                setTableLoading(false);
            });
    };
    if (tableData === null) getData();

    /**
     * 响应分页事件
     */
    const jump = (page, pageSize) => {
        getData(page, pageSize);
    };

    // 抽屉事件与数据
    const showDrawer = event => {
        switch (event.target.innerText) {
            case '更多筛选':
                setDrawerData({
                    title: '筛选',
                    styles: {
                        header: {
                            fontSize: '10px',
                            color: 'red',
                        },
                    },
                    itemChild: (
                        <Collapse
                            ghost={true}
                            items={[
                                {
                                    key: '1',
                                    label: '价格区间',
                                    children: <p>{1}</p>,
                                },
                                {
                                    key: '2',
                                    label: '商品状态',
                                    children: <p>{1}</p>,
                                },
                                {
                                    key: '3',
                                    label: '礼品卡',
                                    children: <p>{1}</p>,
                                },
                                {
                                    key: '4',
                                    label: '销售渠道',
                                    children: <p>{1}</p>,
                                },
                            ]}
                        />
                    ),
                    footer: (
                        <>
                            <Button block>重置</Button>
                            <Button type="primary" block>
                                完成
                            </Button>
                        </>
                    ),
                });
                break;

            case '编辑表头':
                setDrawerData({
                    title: '编辑表头',
                    itemChild: (
                        <div>
                            <p>. 请至少保留两标头项，暂不支持编辑操作栏</p>
                        </div>
                    ),
                    footer: (
                        <>
                            <Button block>恢复默认</Button>
                            <Button block>取消</Button>
                            <Button type="primary" block>
                                更新
                            </Button>
                        </>
                    ),
                });
                break;

            default:
                setDrawerData({});
        }
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    // 筛选、搜索
    const items = {
        left: [
            {
                itemType: 'SpaceCompact',
                itemChild: [
                    {
                        itemType: 'Select',
                        popupMatchSelectWidth: false,

                        defaultValue: getIntl.get('Produc_tabs_All'),
                        options: [
                            {
                                value: getIntl.get('Produc_tabs_All'),
                                lable: getIntl.get('Produc_tabs_All'),
                            },
                            {
                                value: getIntl.get(
                                    'Product_SearchBand_CommodityName',
                                ),
                                lable: getIntl.get(
                                    'Product_SearchBand_CommodityName',
                                ),
                            },
                            {
                                value: getIntl.get(
                                    'Product_SearchBand_CommoditySPU',
                                ),
                                lable: getIntl.get(
                                    'Product_SearchBand_CommoditySPU',
                                ),
                            },
                            {
                                value: getIntl.get(
                                    'Product_SearchBand_CommoditySKU',
                                ),
                                lable: getIntl.get(
                                    'Product_SearchBand_CommoditySKU',
                                ),
                            },
                            {
                                value: getIntl.get(
                                    'Product_SearchBand_CommodityManufacturers',
                                ),
                                lable: getIntl.get(
                                    'Product_SearchBand_CommodityManufacturers',
                                ),
                            },
                            {
                                value: getIntl.get(
                                    'Product_SearchBand_CommodityBarCode',
                                ),
                                lable: getIntl.get(
                                    'Product_SearchBand_CommodityBarCode',
                                ),
                            },
                            {
                                value: getIntl.get(
                                    'Product_SearchBand_SpecificationsName',
                                ),
                                lable: getIntl.get(
                                    'Product_SearchBand_SpecificationsName',
                                ),
                            },
                            {
                                value: getIntl.get(
                                    'Product_SearchBand_CommodityDescription',
                                ),
                                lable: getIntl.get(
                                    'Product_SearchBand_CommodityDescription',
                                ),
                            },
                        ],
                        itemStyle: {
                            width: 120,
                            height: 36,
                        },
                        onDropdownVisibleChange: () => {
                            // console.log(1);
                        },
                    },
                    {
                        itemType: 'Search',
                        allowClear: true,
                        className: 'search',
                    },
                ],
            },
            {
                itemType: 'Select',
                defaultValue: getIntl.get('Product_CommodityClassification'),
                popupMatchSelectWidth: false,
                showSearch: true,
                itemStyle: { width: 140, height: 36 },
                suffixIcon: <Funnel />,
                filterOption,
                filterSort,
            },
            {
                itemType: 'Select',
                defaultValue: getIntl.get('Product_Tag'),
                popupMatchSelectWidth: false,
                showSearch: true,
                itemStyle: { width: 140, height: 36 },
                suffixIcon: <Funnel />,
                filterOption,
                filterSort,
            },
            {
                itemType: 'Select',
                defaultValue: getIntl.get('Product_PriceRange'),
                popupMatchSelectWidth: false,
                // showSearch: true,
                itemStyle: { width: 140, height: 36 },
                suffixIcon: <Funnel />,
                filterOption,
                filterSort,
            },
        ],
        right: [
            {
                itemType: 'Button',
                itemChild: getIntl.get('Product_Filter'),
                itemStyle: { height: 36 },
                onClick: showDrawer,
            },
            {
                itemType: 'Button',
                itemChild: getIntl.get('Product_EditTheTableHead'),
                itemStyle: { height: 36 },
                onClick: showDrawer,
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
    };

    return (
        <div>
            {/* 筛选、搜索 */}
            <Flex
                wrap="warp"
                gap="small"
                className="mc-product-searcher-complex-center"
            >
                <Flex
                    className="mc-product-searcher-complex-center-prefix"
                    gap="small"
                >
                    {items.left.map((item, index) =>
                        DataProcessing.Form({ ...item, key: index }),
                    )}
                </Flex>
                <Flex
                    className="mc-product-searcher-complex-center-suffix"
                    gap="small"
                >
                    {items.right.map((item, index) =>
                        DataProcessing.Form({ ...item, key: index }),
                    )}
                </Flex>
            </Flex>

            {/* 抽屉 */}
            <Drawer {...drawerData} open={open} onClose={onClose} />

            {/* 加载中 */}
            {loading && (
                <div className="example">
                    <Skeleton
                        loading={loading}
                        active
                        paragraph={{
                            rows: 10,
                            width: '75%',
                        }}
                    />
                </div>
            )}

            {/* 数据展示 */}
            {!loading &&
                (tableData != null && tableData.length > 0 ? (
                    <Table
                        loading={tableLoading}
                        rowSelection={{ ...rowSelection }}
                        columns={tableTitle}
                        dataSource={tableData}
                        style={{ border: '1px solid #eef1f7', borderRadius: 6 }}
                        pagination={{
                            defaultCurrent: 1,
                            total: data.count,
                            showQuickJumper: true,
                            position: ['bottomCenter'],
                            onChange: jump,
                        }}
                    />
                ) : (
                    <Empty
                        image={NoData}
                        imageStyle={{ height: 300, marginBottom: 32 }}
                        style={{ margin: '100px 0' }}
                        description={<h3 style={{ fontSize: 20 }}>暂无数据</h3>}
                    />
                ))}
        </div>
    );
};

export default Content;
