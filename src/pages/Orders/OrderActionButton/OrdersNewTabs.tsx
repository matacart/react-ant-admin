// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Input, Space, Popover, Tag } from 'antd';
// // import { useTabsContext } from '@/components/Card/TabsContext'; // 导入 useTabsContext
// import { CloseOutlined } from '@ant-design/icons';
// import './OrdersNewTabs.scss';

// interface TabPane {
//   title: string;
//   key: string;
//   content?: any; // 内容可以是任意类型，且为可选
// }

// interface FilterCondition {
//   id: string;
//   filter_group_id: string;
//   filter_name: string;
//   filter_field: string;
//   filter_value: string;
//   module: string;
// }
// interface Props {
//   groupID: string; // 新增 groupID 属性
//   filters: FilterCondition[]; // 新增 filters 属性
// }

// const OrdersNewTabs => {
//   const [visible, setVisible] = useState(false);
//   // const [inputValue, setInputValue] = useState('');
//   // const { setPanes, panes } = useTabsContext(); // 从 TabsContext 获取 setPanes 和 panes
//   const [filterConditions, setFilterConditions] = useState<Record<string, string>>({});
//   const initialConditions: FilterCondition[] = [
//     { id: '0', filter_group_id: '0', filter_name: '归档订单: 展示已归档的订单', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
//     { id: '1', filter_group_id: '1', filter_name: '发货状态: 待发货, 部分发货', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
//     { id: '2', filter_group_id: '1', filter_name: '订单状态: 处理中', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
//     { id: '3', filter_group_id: '1', filter_name: '订单状态: 已取消', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
//     { id: '4', filter_group_id: '1', filter_name: '订单日期: 今天', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' }
//   ];

//   const [array, setArray] = useState<FilterCondition[]>(initialConditions);
//   const [history, setHistory] = useState<FilterCondition[][]>([initialConditions]);

//   const showModal = () => {
//     setVisible(true);
//   };

//   const handleOk = () => {
//     // 清空当前过滤条件
//     setArray([]);

//   //   const newKey = `${Date.now()}`; // 使用当前时间戳作为唯一key
//   //   const newTabPane: TabPane = {
//   //     title: inputValue,
//   //     key: newKey,
//   //   };

//   //   // 添加新的选项卡
//   //   setPanes((prevPanes) => [...prevPanes, newTabPane]);

//   //   setFilterConditions((prevConditions) => ({
//   //     ...prevConditions,
//   //     [newKey]: inputValue,
//   //     // 添加过滤条件
//   //     [`${newKey}_filter`]: `orders_status_id=1`
//   //   }));
//   //   setVisible(false);

//   //   setInputValue('');
//   // };

//   // 处理关闭过滤条件
//   const handleRemoveFilter = (id: string) => {
//     // 更新 array 数组以移除对应的过滤条件
//     setArray((prevArray) => prevArray.filter((item) => item.id !== id));
//     // 从 filterConditions 中删除对应的过滤条件
//     setFilterConditions((prevConditions) => {
//       const newConditions = { ...prevConditions };
//       delete newConditions[id];
//       delete newConditions[`${id}_filter`];
//       return newConditions;
//     });
//     saveToHistory();
//   };

//   // 更新useEffect逻辑
//   useEffect(() => {
//     // 当过滤条件改变时，恢复最后一个保存的状态
//     if (Object.keys(filterConditions).length > 0) {
//       // 添加过滤条件到 array
//       const newConditions = Object.entries(filterConditions).reduce((acc, [key, value]) => {
//         if (key.endsWith('_filter')) {
//           const parts = value.split('=');
//           if (parts[0].includes(groupID)) { // 仅添加属于当前 groupID 的过滤条件
//             acc.push({
//               id: key,
//               filter_group_id: groupID,
//               filter_name: value,
//               filter_field: parts[0],
//               filter_value: parts[1],
//               module: 'orders_list'
//             });
//           }
//         }
//         return acc;
//       }, [] as FilterCondition[]);
//       setArray(newConditions);
//     }
//   }, [filterConditions, groupID]);

//   // 保存当前条件到历史
//   const saveToHistory = () => {
//     setHistory([...history, [...array]]);
//   };

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   setInputValue(e.target.value);
//   // };

//   // 过滤条件标签渲染
//   const filterTags = array.map((filter) => {
//     return (
//       <Tag
//         key={filter.id}
//         closable
//         onClose={() => handleRemoveFilter(filter.id)}
//         className='tag'
//       >
//         {filter.filter_name}
//       </Tag>
//     );
//   });

//   return (
//     <div className="container">
//       <div className="filter-and-button-container">
//         <Space direction="horizontal" size="middle">
//           {filterTags}
//           <Button className="button" type="primary" onClick={showModal}>
//             新建选项卡
//           </Button>
//         </Space>
//       </div>
//       <Modal
//         title="新建选项卡"
//         visible={visible}
//         okText="保存"
//         cancelText="取消"
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <label htmlFor="tabName">选项卡名称</label>
//         <Input id="tabName"  />
//       </Modal>
//     </div>
//   );
// };

// export default OrdersNewTabs;
// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Input, Space, Popover, Tag } from 'antd';
// import { CloseOutlined } from '@ant-design/icons';
// import './OrdersNewTabs.scss';

// interface TabPane {
//   title: string;
//   key: string;
//   content?: any; // 内容可以是任意类型，且为可选
// }

// interface FilterCondition {
//   id: string;
//   filter_group_id: string;
//   filter_name: string;
//   filter_field: string;
//   filter_value: string;
//   module: string;
// }

// const OrdersNewTabs: React.FC = () => {
//   const [visible, setVisible] = useState(false);

//   const [filterConditions, setFilterConditions] = useState<Record<string, string>>({});
//   const initialConditions: FilterCondition[] = [
//     { id: '0', filter_group_id: '0', filter_name: '归档订单: 展示已归档的订单', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
//     { id: '1', filter_group_id: '1', filter_name: '发货状态: 待发货, 部分发货', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
//     { id: '2', filter_group_id: '1', filter_name: '订单状态: 处理中', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
//     { id: '3', filter_group_id: '1', filter_name: '订单状态: 已取消', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
//     { id: '4', filter_group_id: '1', filter_name: '订单日期: 今天', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' }
//   ];

//   const [array, setArray] = useState<FilterCondition[]>(initialConditions);
//   const [history, setHistory] = useState<FilterCondition[][]>([initialConditions]);

//   const showModal = () => {
//     setVisible(true);
//   };

//   const handleOk = () => {
//     // 清空当前过滤条件
//     setArray([]);

//     const newKey = `${Date.now()}`; // 使用当前时间戳作为唯一key
//     const newTabPane: TabPane = {
//       title1,
//       key: newKey,

//     };
//     setFilterConditions((prevConditions) => ({ ...prevConditions,  }));
//     setVisible(false);

   
//   };

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    ;
//   };

//   // 处理关闭过滤条件
//   const handleRemoveFilter = (id: string) => {
//     // 更新 array 数组以移除对应的过滤条件
//     setArray((prevArray) => prevArray.filter((item) => item.id !== id));
//     saveToHistory();
//   };

//   // 保存当前条件到历史
//   const saveToHistory = () => {
//     setHistory([...history, [...array]]);
//   };

//   // 过滤条件标签渲染
//   const filterTags = array.map((filter) => {
//     return (
//       <Tag
//         key={filter.id}
//         closable
//         onClose={() => handleRemoveFilter(filter.id)}
//         className='tag'
//       >
//         {filter.filter_name}
//       </Tag>
//     );
//   });

//    // 更新useEffect逻辑
//    useEffect(() => {
//     // 当过滤条件改变时，恢复最后一个保存的状态
//     if (Object.keys(filterConditions).length > 0) {
//       setArray(initialConditions);
//     }
//   }, [filterConditions]);

//   return (
//     <div className="container">
//       <div className="filter-and-button-container">
//         <Space direction="horizontal" size="middle">
//           {filterTags}
//           <Button className="button" type="primary" onClick={showModal}>
//             新建选项卡
//           </Button>
//         </Space>
//       </div>
//       <Modal
//         title="新建选项卡"
//         visible={visible}
//         okText="保存"
//         cancelText="取消"
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <label htmlFor="tabName">选项卡名称</label>
//         <Input id="tabName" onChange={handleInputChange} />
//       </Modal>
//     </div>
//   );
// };

// export default OrdersNewTabs;