import React, { useState } from 'react';
import { Button, Modal, Input, Space, Popover } from 'antd';
import { useTabsContext } from '@/components/Card/TabsContext'; // 导入 useTabsContext
import { CloseOutlined } from '@ant-design/icons';

interface TabPane {
  title: string;
  key: string;
  content?: any; // 内容可以是任意类型，且为可选
}

interface FilterCondition {
  id: string;
  filter_group_id: string;
  filter_name: string;
  filter_field: string;
  filter_value: string;
  module: string;
}

const OrdersNewTabs: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { setPanes } = useTabsContext(); // 从 TabsContext 获取 setPanes

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    const newKey = `${Date.now()}`; // 使用当前时间戳作为唯一key
    const newTabPane: TabPane = {
      title: inputValue,
      key: newKey,
      content: <FilterContent filters={array} />, // 添加过滤条件内容
    };

    setPanes((prevPanes) => [...prevPanes, newTabPane]); // 添加新的选项卡
    setVisible(false);

    setInputValue('');
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const array: FilterCondition[] = [
    { id: '0', filter_group_id: '0', filter_name: '订单状态', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
    { id: '1', filter_group_id: '0', filter_name: '订单状态', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
    { id: '2', filter_group_id: '1', filter_name: '订单状态', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
    { id: '3', filter_group_id: '1', filter_name: '订单状态', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
    { id: '4', filter_group_id: '1', filter_name: '订单状态', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' }
  ];

  // 过滤条件的展示组件
  const FilterContent: React.FC<{ filters: FilterCondition[] }> = ({ filters }) => {
    return (
      <div>
        {filters.map((filter) => (
          <div key={filter.id}>
            <span>{filter.filter_name}: </span>
            <span>{filter.filter_value}</span>
          </div>
        ))}
      </div>
    );
  };

  // 处理关闭过滤条件
  const handleRemoveFilter = (id: string) => {
    // 逻辑处理：例如从数组中移除对应的过滤条件
    console.log(`Remove filter with ID: ${id}`);
  };

  // 过滤条件按钮
  const filterButtons = array.map((filter) => (
    <Popover
      key={filter.id}
      content={<CloseOutlined onClick={() => handleRemoveFilter(filter.id)} />}
      trigger="hover"
      placement="bottom"
    >
      <Button disabled size="small" style={{ marginRight: 8 }}>
        {filter.filter_name}
      </Button>
    </Popover>
  ));

  return (
    <div className="container">
      <Space>
        {filterButtons}
        <Button className='button' type="primary" onClick={showModal}>
          新建选项卡
        </Button>
      </Space>
      <Modal
        title="新建选项卡"
        visible={visible}
        okText="保存"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label htmlFor="tabName">选项卡名称</label>
        <Input id="tabName" value={inputValue} onChange={handleInputChange} />
      </Modal>
    </div>
  );
};

export default OrdersNewTabs;