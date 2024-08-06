// App.tsx
import React, { useState } from 'react';
import OrdersNewTabs from '@/components/Card/OrdersNewTabs';
import { TabsProvider, TabsContextValue } from '@/components/Card/TabsContext';

interface TabPane {
  title: string;
  key: string;
  content?: React.ReactNode; // 更具体的类型定义
}

const App: React.FC = () => {
  // 定义上下文值
  const [activeKey, setActiveKey] = useState('1'); // 初始激活的标签页
  const [panes, setPanes] = useState<TabPane[]>([]); // 示例值

  const updateFilter = (key: string, filter: string) => {
    console.log(`Updating filter for tab ${key}:`, filter);
  };

  const tabsContextValue: TabsContextValue = {
    activeKey,
    setActiveKey,
    panes,
    setPanes,
    updateFilter,
  };

  return (
    <TabsProvider value={tabsContextValue}>
      <OrdersNewTabs /> {/* 不再需要显式传递 setPanes 函数 */}
    </TabsProvider>
  );
};

export default App;