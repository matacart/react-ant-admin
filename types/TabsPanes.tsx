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
  const tabsContextValue: TabsContextValue = {
    panes: [], // 示例值
    setPanes: (newPanes: TabPane[]) => {
      // 实现 setPanes 函数逻辑
      console.log('Setting new panes:', newPanes);
    },
  };

  return (
    <TabsProvider value={tabsContextValue}>
      <OrdersNewTabs /> {/* 不再需要显式传递 setPanes 函数 */}
    </TabsProvider>
  );
};

export default App;