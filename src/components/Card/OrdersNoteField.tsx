// import React, { useState } from 'react';
// import { Button, Modal } from 'antd';

// interface OrdersNoteFieldProps {
//     isEditing: boolean;
//     initialValue?: string;
//     onSave: (value: string) => void;
//     onClose: () => void;
//   }
//   const OrdersNoteField: React.FC<OrdersNoteFieldProps> = ({ isEditing, initialValue, onSave }) =>{
//   const [loading, setLoading] = useState(false);
//   const [ setOpen] = useState(false);
//   if (!isEditing) return null;
//   const [value, setValue] = useState(initialValue || '');
//   const handleSave = () => {
//     onSave(value);
//     onClose();
//   };

//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleOk = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setOpen(false);
//     }, 3000);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
   
//       </Button>
//       <Modal
      
//         title="Title"
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>
//             Return
//           </Button>,
//           <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
//             Submit
//           </Button>,
//           <Button
//             key="link"
//             href="https://google.com"
//             type="primary"
//             loading={loading}
//             onClick={handleOk}
//           >
//             Search on Google
//           </Button>,
//         ]}
//       >
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//       </Modal>
//     </>
//   );
// };

// export default OrdersNoteField;

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