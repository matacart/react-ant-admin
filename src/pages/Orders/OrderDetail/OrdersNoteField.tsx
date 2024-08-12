
import React, { useState } from 'react';
import { Modal, Input } from 'antd';

interface OrdersNoteFieldProps {
    isEditing: boolean;
    initialValue?: string;
    onSave: (value: string) => void;
    onClose: () => void;
}

const OrdersNoteField: React.FC<OrdersNoteFieldProps> = ({ isEditing, initialValue, onSave, onClose }) => {
    const [value, setValue] = useState(initialValue || '');
    const [newNoteModalVisible, setNewNoteModalVisible] = useState(false);
    const [newNoteValue, setNewNoteValue] = useState('');
    const handleSaveAndShowNewNoteModal = () => {
        onSave(value); // 保存当前输入框的值
        onClose(); // 关闭当前模态框
        setNewNoteModalVisible(true); // 显示新的模态框
    };

    const handleNewNoteCancel = () => {
        setNewNoteModalVisible(false);
    };

    const handleNewNoteSubmit = () => {
        // 这里可以添加保存新备注的逻辑
        console.log('New Note Saved');
        setNewNoteModalVisible(false);
    };
    if (newNoteModalVisible) {
      console.log('New note modal should be visible');
  }
    return (
        <div>
            <Modal
                title="商家备注"
                open={isEditing}
                onOk={handleSaveAndShowNewNoteModal} // 使用新的函数
                onCancel={onClose}
                okText="新增备注"
                cancelText="取消"
            >
                {/* 添加输入框 */}
                111
            </Modal>

            <Modal
                title="新增备注"
                open={newNoteModalVisible}
                onOk={handleNewNoteSubmit}
                onCancel={handleNewNoteCancel}
                okText="保存"
                cancelText="取消"
            > 
            
                <Input value={newNoteValue} onChange={(e) => setNewNoteValue(e.target.value)} placeholder="请输入备注" />
            </Modal>
        </div>
    );
};

export default OrdersNoteField;