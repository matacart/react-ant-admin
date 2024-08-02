import React, { useState } from 'react';
import { Tabs, Button, Modal, Form, Input } from 'antd';
import OrdersSelectCard from '@/components/Card/OrdersSelectCard';
import { useIntl } from '@umijs/max';

const ComponentA = () => <div><OrdersSelectCard /></div>;
const ComponentB = () => <div><OrdersSelectCard /></div>;
const ComponentC = () => <div><OrdersSelectCard /></div>;
const ComponentD = () => <div><OrdersSelectCard /></div>;
const ComponentE = () => <div><OrdersSelectCard /></div>;

function DTTabs() {
  const [activeKey, setActiveKey] = useState('1');
  const intl = useIntl();
  const [panes, setPanes] = useState([
    { title: intl.formatMessage({ id: 'order.tabs.all' }), content: <ComponentA />, key: '1' },
    { title: intl.formatMessage({ id: 'order.tabs.readytoship' }), content: <ComponentB />, key: '2' },
    { title: intl.formatMessage({ id: 'order.tabs.cancelled' }), content: <ComponentC />, key: '3' },
    { title: intl.formatMessage({ id: 'order.tabs.process' }), content: <ComponentD />, key: '4' },
    { title: intl.formatMessage({ id: 'order.tabs.neworders' }), content: <ComponentE />, key: '5' },
  ]);

  // 新增的状态变量来控制模态框的可见性
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 更新 addNewTab 方法以支持输入自定义标签名称
  const addNewTab = () => {
    setIsModalVisible(true);
  };

  // 处理模态框的确定事件
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const title = values.title;
        if (!title.trim()) {
          return false; // 如果用户没有输入任何内容，则阻止关闭模态框
        }

        const newPanes = [...panes, { title, content: <div></div>, key: (panes.length + 1).toString() }];
        setPanes(newPanes);
        setActiveKey((panes.length + 1).toString());
        setIsModalVisible(false);
        form.resetFields(); // 清空表单
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // 处理模态框的取消事件
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // 清空表单
  };

  const onChange = (activeKey: React.SetStateAction<string>) => {
    // 检查是否点击了新增标签
    if (activeKey === 'new' || activeKey === 'add') {
      addNewTab();
    } else {
      setActiveKey(activeKey);
    }
  };

  const onEdit = (targetKey: string, action: string) => {
    if (action === 'add') {
      addNewTab();
    } else if (action === 'remove') {
      // 确保只有当标签页不是前五个时才允许删除
      if (parseInt(targetKey) > 5) {
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        setPanes(newPanes);
      }
    } else if (action === 'rename') {
      const newPanes = panes.map(pane => {
        if (pane.key === targetKey) {
          pane.title = '重命名标签'; // 这里可以进一步优化为打开一个模态框让用户输入新名称
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
          <Tabs.TabPane tab={pane.title} key={pane.key} closable={parseInt(pane.key) > 5}>
            {pane.content}
          </Tabs.TabPane>
        ))}
      </Tabs>

      {/* 模态框 */}
      <Modal
        title="创建选项卡"
        visible={isModalVisible}
        okText="保存"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="选项卡名称"
          >
            <Input placeholder="请输入选项卡名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default DTTabs;