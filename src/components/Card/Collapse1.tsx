import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import Tabs from './Tabs1'
const text = (
  <Tabs/>
);
const title = (
  <>
    <h2 style={{
    fontWeight: 600
  }}>新手引导</h2>
  <p style={{
    marginBottom: "0"
  }}>已完成3/5个任务</p>
  </>
)
const items: CollapseProps['items'] = [
  {
    key: '1',
    label: title,
    children: text,
  },
];

const App: React.FC = () => <Collapse 
items={items} bordered={false}
style={{
  backgroundColor: "white",
  borderBottom: "3px black"
}}
expandIconPosition="right"
defaultActiveKey={['1']} />;

export default App;