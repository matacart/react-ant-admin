import { HolderOutlined } from '@ant-design/icons';
import React, {forwardRef} from 'react';
import styled from 'styled-components';

// 拖拽手柄
export const Handle = forwardRef<HTMLDivElement, { className?: string; [key: string]: any }>(
  (props, ref) => {
    return (
      <Scoped
        ref={ref}
        {...props}
      >
        {/* 自定义拖拽图标 */}
        <HolderOutlined />
      </Scoped>
    );
  }
);

const Scoped = styled.div`
  cursor: move;
  font-size: 14px;
  font-weight: 600;
`
