// SortableItem.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Checkbox, Flex, List, Switch } from 'antd';
import { HolderOutlined } from '@ant-design/icons';

export const SortableItem = ({ id, content }: { id: string; content: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
    touchAction: 'none'
  };

  return (
    <List.Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
        <Flex justify='space-between' style={{width:"100%",padding:"6px 12px"}}>
            <Flex style={{width:"100%"}}>
                <HolderOutlined style={{fontSize:"20px",marginRight:"12px"}} />
                <Checkbox checked={true} />
                <div style={{marginLeft:"12px",textAlign:"center",flex:1}}>{content}</div>
            </Flex>
        </Flex>
      
    </List.Item>
  );
};