// TabsContext.ts
import React, { createContext, useContext } from 'react';

interface TabPane {
  title: string;
  key: string;
  content?: any; // 内容可以是任意类型，且为可选
}

interface TabsContextValue {
  panes: TabPane[];
  setPanes: (newPanes: TabPane[]) => void;
  updateFilter: (key: string, filter: string) => void;
}

// 创建 TabsContext
const TabsContext = createContext<TabsContextValue | undefined>(undefined);

// TabsProvider 组件
const TabsProvider: React.FC<{ children: React.ReactNode; value: TabsContextValue }> = ({ children, value }) => {
  // 确保 value 符合 TabsContextValue 类型
  if (!Array.isArray(value.panes) || typeof value.setPanes !== 'function') {
    throw new Error('TabsProvider value prop must be a valid TabsContextValue object');
  }

  return (
    <TabsContext.Provider value={value}>
      {children}
    </TabsContext.Provider>
  );
};

// useTabsContext 钩子
const useTabsContext = (): TabsContextValue => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
};

export { TabsProvider, useTabsContext, TabsContextValue };