import { useState } from 'react';
import { getOrderList } from '../../api/orderApi';
import { Row, Col, Empty, Skeleton, Table } from 'antd';
import NoData from '../../assets/imgs/no_data.svg';
import ContentTab from '../ContentTab/ContentTab';
import DataProcessing from '../DataProcessing/DataProcessing';
import { getToken } from '../../util/auth';

import './MainContent.scss';

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
        // Column configuration not to be checked
        name: record.name,
    }),
};

const MainContent = ({ tabs, leftFilter, rightFilter, tableTitle }) => {
    const [data, setData] = useState(); // 存放整体请求返回的数据
    const [tableData, setTableData] = useState(null); // 存放处理后仅表格需要的数据
    const [loading, setLoading] = useState(true); // 存放第一次页面加载效果状态
    const [tableLoading, setTableLoading] = useState(); // 存放表格加载效果状态

    /**
     * 获取数据，处理数据
     */
    const getData = (page = 1, limit = 10) => {
        if (!tableLoading) setTableLoading(true);
        getOrderList(page, limit, getToken())
            .then(req => {
                let listData = req.data.data;
                setData(req.data);
                if (listData.length > 0) {
                    listData = listData.map(item => {
                        return {
                            key: item.id,
                            orderNumber: item.id,
                            productInfo: item.productinfo,
                            deliveryMethod: item.shipping_method,
                            paymentMethod: item.payment_method,
                            orderAmount: item.order_total,
                            orderTime: item.date_purchased,
                            state:
                                item.orders_status_name === '待处理'
                                    ? '待发货'
                                    : item.orders_status_name,
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

    return (
        <div className="mainContent">
            {/* 标签页标题 */}
            <ContentTab items={tabs} />

            {/* 搜索/筛选 */}
            <Row className="mainContent-filter" justify="space-between">
                <Col className="LeftButton">
                    <Row gutter={8}>
                        {leftFilter.map((item, index) => (
                            <Col>
                                {DataProcessing.Form({ ...item, key: index })}
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col className="RightButton">
                    <Row gutter={8}>
                        {rightFilter.map((item, index) => (
                            <Col>
                                {DataProcessing.Form({ ...item, key: index })}
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

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

            {/* 表格/空数据 */}
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

export default MainContent;
