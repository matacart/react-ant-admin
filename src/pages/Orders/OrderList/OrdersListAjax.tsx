import React, { useEffect, useState } from 'react';
import { Avatar, Button, Checkbox, GetProp, Input, message, Modal, Popover, Radio, Select, Switch, Table, TableColumnsType, TablePaginationConfig, TableProps, Tooltip } from 'antd';
import qs from 'qs';
import { CopyOutlined, EyeOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getOrderList,updateOrderStatus,batchdelOrders,batchshipOrders} from '@/services/y2/order';
import { history, useIntl } from '@umijs/max';
import Tag from 'antd/lib/tag';
import styles from './OrdersListAjax.scss';
// 表单项订单数据类型
interface DataType {
  orderid: string;
  orderdata: string;
  paymentmethod: string;
  deliveryname: string;
  shippingmethod: string;
  price: number;
  orderstate: string;
  paymentstate: string;
  deliverystate: string;
  paymentchannel: string;
  tel: string;
  [key: string]: string | number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface FilterCondition {
  id: string;
  filter_group_id: string;
  filter_name: React.ReactNode;
  filter_field: string;
  filter_value: string;
  module: string;
}

interface Props {
  filterCondition?: FilterCondition[];
}

const ovalShapeClass = 'oval-shape';
const ovalShapeClass2 = 'oval-shape2';
const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

export default function OrdersListAjax({ filterCondition }: Props) {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [data, setData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 新增的状态
  
  const renderCustomTag = (text: string) => (
    <Tag  className={styles[ovalShapeClass]}>
      {text}
    </Tag>
  );
  const renderCustomTag2 = (text: string) => (
    <Tag  className={styles[ovalShapeClass2]}>
      {text}
    </Tag>
  );
  const columns: TableColumnsType<DataType> = [
    {
      title: intl.formatMessage({ id: 'order.tableheader.orderid' }),
      dataIndex: 'orderid',
      width: 100,
      render: (text: string) => (
        <span style={{ color: '#242833' }}>{text}</span>
      ),
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.orderdata' }),
      dataIndex: 'orderdata',
      width: 100,
      render: (text: string) => (
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </span>
      ),
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.orderstate' }),
      dataIndex: 'orderstate',
      width: 100,
      render: (text: string) => renderCustomTag(text), // 使用自定义函数
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.paymenstate' }),
      dataIndex: 'paymentstate',
      width: 100,
      render: (text: string) => renderCustomTag(text), // 使用自定义函数
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.deliverystate' }),
      dataIndex: 'deliverystate',
      width: 100,
      render: (text: string) => renderCustomTag2(text), // 使用自定义函数
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.paymentmethod' }),
      dataIndex: 'paymentmethod',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.paymentchannel' }),
      dataIndex: 'paymentchannel',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.deliveryname' }),
      dataIndex: 'deliveryname',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.tel' }),
      dataIndex: 'tel',
      width: 100,
      render: (tel: string) => {
        // 显示手机号的前两位和后两位，中间用星号(*)代替
        const maskedTel = `${tel.substring(0, 2)}****${tel.substring(tel.length - 2)}`;
        return <span>{maskedTel}</span>;
      },
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.shippingmethod' }),
      dataIndex: 'shippingmethod',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'order.tableheader.pricetotal' }),
      dataIndex: 'price',
      width: 100,
      render: (value: any, record: any, index: any) => {
        let num = Number(value);
        return <>{`US$ ${num.toFixed(2)}`}</>;
      },
    },
  ];

  const fetchData = (condition?: FilterCondition[]) => {
    setLoading(true);
    const limit = getRandomuserParams(tableParams).results;
    const page = getRandomuserParams(tableParams).page;
    let finalCondition: FilterCondition[] = condition || [];
  
    // 确保 finalCondition 包含了 filterCondition 中的过滤条件
    if (filterCondition && filterCondition.length > 0) {
      finalCondition = filterCondition;
    }
  
    console.log('Fetching data with:', { page, limit, finalCondition });
  
    // 构造查询字符串
    const searchParams = new URLSearchParams();
    if (page) searchParams.set('page', page.toString());
    if (limit) searchParams.set('limit', limit.toString());
    finalCondition.forEach(cond => {
      searchParams.set(cond.filter_field, cond.filter_value);
    });
  
    getOrderList(page, limit, finalCondition)
      .then((res) => {
        console.log('Response from getOrderList:', res);
        const newData: DataType[] = res.data?.map((item: any) => ({
          orderid: item.id,
          orderdata: item.date_purchased,
          orderstate: translateStatus('order.status.name_' + item.orders_status_id, intl),
          paymentmethod: item.payment_method,
          payment_status_id: item.payment_status_id, // 确保这里使用的是最新的 payment_status_id
          paymentstate: translateStatus('order.status.name_' + item.payment_status_id, intl),
          deliverystate: translateStatus('order.status.name_' + item.delivery_status_id, intl),
          deliveryname: item.delivery_name,
          tel: item.tel,
          shippingmethod: item.shipping_method,
          paymentchannel: item.payment_method,
          price: item.order_total,
          
        }));
  
        console.log('New data after processing:', newData);
        setData(newData); // 使用过滤后的数据
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.count,
          },
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // 在这里监听 `filterCondition` 的变化，并重新获取数据
    fetchData(filterCondition);
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, filterCondition]);

  const translateStatus = (statusKey: string, intl: any): string => {
    return intl.formatMessage({ id: statusKey });
  };

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const handleOrderClick = (orderId: string) => {
    history.push(`/orders/${orderId}`);
  };

// 新增的组件以显示选择的数量和操作按钮
const { Option } = Select; // 解构出 Option 组件

const SelectedActions = ({ selectedRowKeys, setSelectedRowKeys }: { selectedRowKeys: React.Key[]; setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>> }) => {
  const selectedCount = selectedRowKeys.length;
  if (selectedCount === 0) return null;

  const handleClearSelection = () => {
    setSelectedRowKeys([]);
  };
  const handleBatchShipOrders = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择至少一项进行操作');
      return;
    }
  
    // 使用 Modal.confirm 弹出确认对话框
    Modal.confirm({
      title: '标记订单为已发货',
      content: (
        <div>
          <p>这些订单将被标记为“已发货”。</p>
          <div style={{ marginTop: '16px' }}>
            <Checkbox>
              给用户发送通知邮件
            </Checkbox>
          </div>
        </div>
      ),
      onOk: async () => {
        try {
          await batchshipOrders(selectedRowKeys as string[]);
          message.success('批量发货成功');
          // 清除选中状态
          setSelectedRowKeys([]);
          // 重新加载数据
          fetchData();
        } catch (error) {
          message.error('批量发货失败');
        }
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  };


const handleMoreActionsChange = (value: string) => {
  console.log('Selected more action:', value);
  // 根据 value 执行相应的操作
  if (value === 'delete-orders') {
    handleDeleteOrders();
  }
};

const handleDeleteOrders = async () => {
  console.log('Selected Row Keys:', selectedRowKeys);
  // 确保 selectedRowKeys 不为空
  if (selectedRowKeys.length === 0) {
    message.warning('请选择至少一项进行操作');
    return;
  }

  // 显示确认对话框
  Modal.confirm({
    title: '确认删除?',
    content: '您确定要删除这些订单吗?',
    onOk: async () => {
      try {
        // 将数字数组转换为字符串数组
        const stringSelectedRowKeys = selectedRowKeys.map(String);
        const response = await batchdelOrders(stringSelectedRowKeys);

        if (response && response.code === 0) { // 后端成功状态码应为200
          message.success('订单删除成功');
          // 清除选中状态
          setSelectedRowKeys([]);
          // 重新加载数据
          fetchData();
        } else if (response && response.code === 201) {
          message.error(`订单删除失败，后端返回错误：${response.msg}`);
        } else {
          message.error('订单删除失败，请检查后端响应');
        }
      } catch (error) {
        let errorMessage = '订单删除失败';
        if (error instanceof Error) {
          errorMessage += `：${error.message}`;
        }
        message.error(errorMessage);
      }
    },
    onCancel: () => {
      console.log('Cancel');
    },
  });
};
  



const handleAccountPayment = async () => {
  if (selectedRowKeys.length === 0) {
    message.warning('请选择至少一项进行操作');
    return;
  }

  // 使用 Modal.confirm 弹出确认对话框
  Modal.confirm({
    title: '标记订单为已付款',
    content: (
      <div>
        <p>自定义支付的订单，付款状态将被标记为“已付款"</p>
        <p>已授权未入账的订单，付款状态将标记为“已付款"</p>
        <div style={{ marginTop: '16px' }}>
          <Checkbox>
            给用户发送通知邮件
          </Checkbox>
        </div>
      </div>
    ),
    onOk: async () => {
      try {
        // 将所有选定项的键合并成一个字符串
        const combinedKey = selectedRowKeys;
        const response = await updateOrderStatus(combinedKey);
        if (response.code === 0) {
          message.success('订单状态更新成功');
          // 重新获取数据并更新界面
          fetchData(); // 直接调用 fetchData 来刷新数据
        } else {
          message.error('订单状态更新失败');
        }
      } catch (error) {
        message.error('订单状态更新失败');
      }
    },
    onCancel: () => {
      console.log('Cancel');
    },
  });
};
return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        checked={selectedCount > 0}
        onClick={(e) => {
          e.stopPropagation(); // 阻止点击事件冒泡到父元素
          handleClearSelection();
        }}
        style={{ marginLeft: 7 }}
      />
      <span style={{ marginLeft: 20 }}>已选择 {selectedCount} 项</span>
      <div style={{ margin: '10px' }}>
        <Button onClick={handleAccountPayment}>入账付款</Button>
        <Button style={{ margin: '10px' }} onClick={handleBatchShipOrders}>批量发货</Button> {/* 新增的批量发货按钮 */}
        <Select
          placeholder="更多操作"
          style={{ width: 120 }}
          onChange={handleMoreActionsChange}
        >
          <Option value="archive">归档订单</Option>
          <Option value="unarchive">取消归档订单</Option>
          <Option value="add-tag">添加标签</Option>
          <Option value="remove-tag">删除标签</Option>
          <Option value="delete-orders">删除订单</Option>
        </Select>
      </div>
    </div>
    );
  };

  return (
    <Scoped>
    <SelectedActions selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} /> {/* 显示选择的数量和操作按钮 */}
    {/* 列表 */}
    <Table
      columns={columns}
      rowKey={(record) => record.orderid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      scroll={{ x: 1300 }}
      onRow={(record) => ({
        onClick: () => handleOrderClick(record.orderid), // 点击行时调用handleOrderClick
      })}
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys, // 使用状态来记录选中的行
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setSelectedRowKeys(selectedRowKeys); // 更新状态
        },
      }}
      // 隐藏表头
      showHeader={selectedRowKeys.length === 0}
    />
  </Scoped>
  );
};

const Scoped = styled.div`
  .ant-table-thead > tr > th {
    background-color: #F5F8FC !important; // 设置表头背景色
  }

  .ant-table-tbody > tr > td {
    padding: 10px;
  }
  
`;


