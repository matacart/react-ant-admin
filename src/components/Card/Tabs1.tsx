import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const App: React.FC = () => {

  return (
    <>

      <Tabs
        tabPosition="left"
        style={{
            // borderTop: "1px solid rgba(0, 0, 0, 0.1)"
        }}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      />
    </>
  );
};

export default App;