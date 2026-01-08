import { DeleteIcon } from '@/components/Icons/Icons';
import DeleteModal from '@/components/Modal/DeleteModal';
import { Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';

export interface RemoveProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void; // 添加 onClick 属性
}

export function Remove({onClick,...props}:RemoveProps) {
  return (
    <Scoped>
      <DeleteModal
          tElement={
            <Tooltip title="删除">
              <DeleteIcon />
            </Tooltip>
          }
          removeFunc={onClick || (()=>{})} 
          title="确认要删除此菜单项吗？" 
          okText="删除"
      />
    </Scoped>
  );
}

const Scoped = styled.div`
  cursor: pointer;
  font-size: 18px;
  color: #F86140;
`
