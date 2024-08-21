import React, { useEffect, useState } from 'react';
import { Tabs, Button, Modal, Tag, Input } from 'antd';
import { useIntl } from '@umijs/max';
import OrdersSelectCard from '@/components/Card/OrdersSelectCard';
import OrdersListAjax from '@/pages/Orders/OrderList/OrdersListAjax';
import '@/components/Card/FilteRConditions.scss';
import { CloseOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface FilterCondition {
  id: string;
  filter_group_id: string;
  filter_name: React.ReactNode;
  filter_field: string;
  filter_value: string;
  module: string;
}

// 获取今天的开始和结束时间
const getTodayStart = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTodayEnd = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day} 23:59:59`;
};

const todayStart = getTodayStart();
const todayEnd = getTodayEnd();

const filterCondition: FilterCondition[] = [
  { id: '1', filter_group_id: '1', filter_name: '归档订单: 展示已归档的订单', filter_field: 'archive_status', filter_value: '', module: 'orders_list' },
  { id: '2', filter_group_id: '2', filter_name: '发货状态: 待发货, 部分发货', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
  { id: '2', filter_group_id: '2', filter_name: '归档订单: 展示已归档的订单', filter_field: 'archive_status', filter_value: '', module: 'orders_list' },
  { id: '3', filter_group_id: '3', filter_name: '订单状态: 已取消', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
  { id: '3', filter_group_id: '3', filter_name: '归档订单: 展示已归档的订单', filter_field: 'archive_status', filter_value: '', module: 'orders_list' },
  { id: '4', filter_group_id: '4', filter_name: '订单状态: 处理中', filter_field: 'orders_status_id', filter_value: '1', module: 'orders_list' },
  { id: '4', filter_group_id: '4', filter_name: '归档订单: 展示已归档的订单', filter_field: 'archive_status', filter_value: '', module: 'orders_list' },
  { id: '5', filter_group_id: '5', filter_name: '订单日期: 今天', filter_field: 'startDate', filter_value: `${todayStart}`, module: 'orders_list' },
  { id: '5', filter_group_id: '5', filter_name: '订单日期: 今天', filter_field: 'endDate', filter_value: `${todayEnd}`, module: 'orders_list' },
  { id: '6', filter_group_id: '6', filter_name: '归档订单: 展示已归档的订单', filter_field: 'archive_status', filter_value: '', module: 'orders_list' },
];

const filteredArr = (id: string): FilterCondition[] => {
  return filterCondition.filter(element => element.id === id);
};

const FilteredOrdersComponent = ({ id, activeKey }: { id: string; activeKey: string }) => {
  const elementsById = filteredArr(id);
  const [filterCondition, setFilterCondition] = useState<FilterCondition[]>([]);
  const [isLoading, setIsLoading] = useState(false); // 添加加载状态

  // 更新 state
  useEffect(() => {
    setFilterCondition(elementsById.map(element => ({
      ...element,
      // 如果需要转换成其他形式，可以在这里添加转换逻辑
    })));
    setIsLoading(true); // 开始加载
  }, [id, activeKey]); // 添加 activeKey 作为依赖项

  useEffect(() => {
    // 模拟数据加载逻辑
    const fetchData = async () => {
      try {
        // 这里可以调用实际的数据加载函数
        console.log(`Loading data for id ${id} with activeKey ${activeKey}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟异步操作
      } finally {
        setIsLoading(false); // 完成加载
      }
    };

    fetchData();
  }, [id, activeKey, filterCondition]); // 监听 filterCondition 变化

  const handleRemoveCondition = (conditionId: string) => {
    const updatedConditions = filterCondition.filter(condition => condition.id !== conditionId);
    setFilterCondition(updatedConditions);
  };

  return (
    <div>
    <div>
      <OrdersSelectCard />
    </div>
    <div>
      {filterCondition.map((element) => (
        <Tag
          key={element.id}
          className='tag'
          closable
          onClose={() => handleRemoveCondition(element.id)}
        >
          {element.filter_name}
        </Tag>
      ))}
      <Button className="button" type="primary">
        新建选项卡
      </Button>
    </div>
    {filterCondition.length > 0 && ( // 使用逻辑与运算符来控制渲染
      <OrdersListAjax filterCondition={filterCondition} />
    )}
  </div>
  );
};

function DTTabs() {
  const [newTabName, setNewTabName] = useState('');
  const [activeKey, setActiveKey] = useState('1');
  const intl = useIntl();
  const [panes, setPanes] = useState([
    { title: intl.formatMessage({ id: 'order.tabs.all' }), content: <FilteredOrdersComponent id={'1'} activeKey={activeKey} />, key: '1' },
    { title: intl.formatMessage({ id: 'order.tabs.readytoship' }), content: <FilteredOrdersComponent id={'2'} activeKey={activeKey} />, key: '2' },
    { title: intl.formatMessage({ id: 'order.tabs.cancelled' }), content: <FilteredOrdersComponent id={'3'} activeKey={activeKey} />, key: '3' },
    { title: intl.formatMessage({ id: 'order.tabs.process' }), content: <FilteredOrdersComponent id={'4'} activeKey={activeKey} />, key: '4' },
    { title: intl.formatMessage({ id: 'order.tabs.neworders' }), content: <FilteredOrdersComponent id={'5'} activeKey={activeKey} />, key: '5' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addNewTab = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newPanes = [
      ...panes,
      {
        title: newTabName,
        content: <FilteredOrdersComponent id={(panes.length + 1).toString()} activeKey={activeKey} />,
        key: (panes.length + 1).toString(),
        // filter_name: '归档订单: 展示已归档的订单',
        // filter_field: 'archive_status'
      }
    ];
    setPanes(newPanes);
    setActiveKey((panes.length + 1).toString());
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (newActiveKey: string) => {
    if (newActiveKey === '7') {
      addNewTab();
    } else {
      setActiveKey(newActiveKey);
    }
  };

  const onEdit = (targetKey: string, action: string) => {
    if (action === 'add') {
      addNewTab();
    } else if (action === 'remove') {
      const newPanes = panes.filter(pane => pane.key !== targetKey);
      setPanes(newPanes);
    } else if (action === 'rename') {
      const newPanes = panes.map(pane => {
        if (pane.key === targetKey) {
          return { ...pane, title: '重命名标签' };
        }
        return pane;
      });
      setPanes(newPanes);
    }
  };

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        type="editable-card"
        onEdit={onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key} closable={parseInt(pane.key, 10) > 5}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
      <Modal
        title="创建新选项卡"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="请输入选项卡名称"
          value={newTabName}
          onChange={e => setNewTabName(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default DTTabs;