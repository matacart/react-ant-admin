// TreeNode.jsx - 树节点组件
import React, { useState, useRef, useEffect } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import './TreeNode.css';

export default function TreeNode({ 
  node, 
  depth = 0, 
  isExpanded, 
  onToggleExpand, 
  onEdit, 
  onDelete 
}) {
  const nodeRef = useRef(null);
  const [insertPosition, setInsertPosition] = useState(null);
  
  // 可拖拽配置
  const { 
    attributes, 
    listeners, 
    setNodeRef: setDragRef, 
    transform, 
    isDragging 
  } = useDraggable({
    id: node.id,
    data: {
      type: 'tree-node',
      node,
      depth,
    },
  });
  
  // 可放置区域配置
  const { 
    setNodeRef: setDropRef, 
    isOver 
  } = useDroppable({
    id: node.id,
    data: {
      node,
      accepts: ['tree-node'],
      // 这个数据会在拖拽过程中动态更新
      updateInsertPosition: (position) => {
        setInsertPosition(position);
        return { ...node, insertPosition: position };
      },
    },
  });
  
  // 合并拖拽和放置的ref
  const combinedRef = (element) => {
    setDragRef(element);
    setDropRef(element);
    nodeRef.current = element;
  };
  
  // 处理鼠标移动，计算插入位置
  useEffect(() => {
    if (!isOver || !nodeRef.current) {
      setInsertPosition(null);
      return;
    }
    
    const handleMouseMove = (e) => {
      if (!nodeRef.current) return;
      
      const rect = nodeRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const height = rect.height;
      
      // 将节点高度分为三个区域
      const topThreshold = height * 0.3;    // 上方30%
      const bottomThreshold = height * 0.7; // 下方30%
      
      let position;
      if (y < topThreshold) {
        position = 'before';
      } else if (y > bottomThreshold) {
        position = 'after';
      } else {
        position = 'inside';
      }
      
      setInsertPosition(position);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOver]);
  
  // 拖拽样式
  const dragStyle = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };
  
  // 处理节点点击（展开/折叠）
  const handleNodeClick = (e) => {
    // 如果点击的是按钮，不触发展开/折叠
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      return;
    }
    if (node.children && node.children.length > 0) {
      onToggleExpand(node.id);
    }
  };
  
  return (
    <div
      ref={combinedRef}
      className={`tree-node ${isDragging ? 'dragging' : ''} ${isOver ? 'over' : ''}`}
      style={{
        ...dragStyle,
        marginLeft: `${depth * 24}px`,
      }}
      data-depth={depth}
      data-node-id={node.id}
    >
      {/* 插入位置指示器 */}
      {isOver && insertPosition && (
        <div className={`insertion-indicator ${insertPosition}`} />
      )}
      
      <div 
        className="node-content"
        onClick={handleNodeClick}
      >
        {/* 展开/折叠按钮 */}
        {node.children && node.children.length > 0 ? (
          <button
            className="expand-button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(node.id);
            }}
            aria-label={isExpanded ? '折叠' : '展开'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        ) : (
          <span className="expand-placeholder" />
        )}
        
        {/* 拖拽手柄 */}
        <div 
          className="drag-handle"
          {...attributes}
          {...listeners}
          title="拖拽"
        >
          ⋮⋮
        </div>
        
        {/* 节点标题 */}
        <span className="node-title">
          {node.title}
          {node.children && node.children.length > 0 && (
            <span className="child-count"> ({node.children.length})</span>
          )}
        </span>
        
        {/* 操作按钮 */}
        <div className="node-actions">
          <button
            className="edit-button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(node);
            }}
            title="编辑"
          >
            编辑
          </button>
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id);
            }}
            title="删除"
          >
            删除
          </button>
        </div>
      </div>
      
      {/* 子节点 */}
      {isExpanded && node.children && node.children.length > 0 && (
        <div className="children-container">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              isExpanded={isExpanded}
              onToggleExpand={onToggleExpand}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}