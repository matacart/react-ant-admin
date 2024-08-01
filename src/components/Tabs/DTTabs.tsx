import React, { useState } from 'react';
import { Tabs, Button, Modal } from 'antd';
const { TabPane } = Tabs;
import OrdersSelectCard from '@/components/Card/OrdersSelectCard';
import { useIntl } from '@umijs/max';
;


// 假设我们有以下子组件
const ComponentA = () => <div><OrdersSelectCard /></div>;
const ComponentB = () => <div><OrdersSelectCard /></div>;
const ComponentC = () => <div><OrdersSelectCard /></div>;
const ComponentD = () => <div><OrdersSelectCard /></div>;
const ComponentE = () => <div><OrdersSelectCard /></div>;

function DynamicTabs() {
  const [activeKey, setActiveKey] = useState('1');
  const intl = useIntl();
  const [panes, setPanes] = useState([
    { title:intl.formatMessage({ id:'order.tabs.all'}), content: <ComponentA />, key: '1' },
    { title:intl.formatMessage({ id:'order.tabs.readytoship'}), content: <ComponentB />, key: '2' },
    { title: intl.formatMessage({ id:'order.tabs.cancelled'}),  content: <ComponentC />, key: '3' },
    { title:  intl.formatMessage({ id:'order.tabs.process'}), content: <ComponentD />, key: '4' },
    { title: intl.formatMessage({ id:'order.tabs.neworders'}),content: <ComponentE />, key: '5' },
  ]);

  const addNewTab = () => {
    Modal.info({
      title: '自定义框',
      content: <div></div>,
      onOk() {
        const newPanes = [...panes, { title: '新标签 ' + (panes.length + 1), content: <div></div>, key: (panes.length + 1).toString() }];
        setPanes(newPanes);
        setActiveKey((panes.length + 1).toString());
      },
    });
  };

  const onChange = (activeKey: React.SetStateAction<string>) => {
    if (activeKey === '7') {
      addNewTab();
    } else {
      setActiveKey(activeKey);
    }
  };

  const onEdit = (targetKey: string, action: string) => {
    if (action === 'add') {
      addNewTab();
    } else if (action === 'remove') {
      if (parseInt(targetKey) > 5) {
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        setPanes(newPanes);
      }
    } else if (action === 'rename') {
      const newPanes = panes.map(pane => {
        if (pane.key === targetKey) {
          pane.title = '重命名标签';
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
          <TabPane tab={pane.title} key={pane.key} closable={parseInt(pane.key) > 5}>
            {pane.content}
          </TabPane>
        ))}
        
      </Tabs>
     
    </div>
  );
}

export default DynamicTabs;
