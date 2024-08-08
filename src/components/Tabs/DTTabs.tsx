// import React, { useEffect, useReducer, useState } from 'react';
// import { Tabs, Button, Modal, Form, Input } from 'antd';
// import OrdersSelectCard from '@/components/Card/OrdersSelectCard';
// import { useIntl } from '@umijs/max';
// import { TabsProvider, useTabsContext, TabsContextValue } from '@/components/Card/TabsContext';
// import OrdersListAjax from '../List/OrderListAjax';
// import { Content } from 'antd/es/layout/layout';
// import { LoadingOutlined } from '@ant-design/icons/lib/icons';
// import { v4 as generateUUID } from 'uuid';  
// import OrdersNewTabs from '../Card/OrdersNewTabs';
// // 定义 reducer 的 action 类型
// type ActionType = 'ADD_PANE' | 'REMOVE_PANE' | 'RENAME_PANE' | 'SET_ACTIVE_KEY' | 'SET_PANES';

// // 定义 reducer 的 state 类型
// interface TabState {
//   panes: TabPane[];
//   activeKey: string;
// }

// // 定义 reducer 的 action 接口
// interface Action {
//   type: ActionType;
//   payload?: any;
// }

// // 定义 TabPane 接口
// interface TabPane {
//   title: string;
//   key: string;
//   filter?: string; // 过滤条件
// }

// // 创建一个适配器函数，用于将 TabPane 数组转换为 Action
// function createSetPanesAction(newPanes: TabPane[]): Action {
//   return {
//     type: 'SET_PANES',
//     payload: newPanes,
//   };
// }

// // 定义 reducer 函数
// const reducer = (state: TabState, action: Action): TabState => {
//   switch (action.type) {
//     case 'ADD_PANE':
//       return {
//         ...state,
//         panes: [...state.panes, action.payload],
//       };
//     case 'REMOVE_PANE':
//       return {
//         ...state,
//         panes: state.panes.filter((pane) => pane.key !== action.payload),
//       };
//     case 'RENAME_PANE':
//       const newPanes = state.panes.map((pane) => {
//         if (pane.key === action.payload.key) {
//           pane.title = action.payload.title;
//         }
//         return pane;
//       });
//       return { ...state, panes: newPanes };
//     case 'SET_ACTIVE_KEY':
//       return {
//         ...state,
//         activeKey: action.payload,
//       };
//     case 'SET_PANES':
//       // 确保 action.payload 是一个数组
//       if (!Array.isArray(action.payload)) {
//         throw new Error('Payload must be an array');
//       }
//       return {
//         ...state,
//         panes: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// function DTTabs() {
//   const [state, dispatch] = useReducer(reducer, {
//     panes: [],
//     activeKey: '0',
//   });
//   const intl = useIntl();

//   React.useEffect(() => {
//     // 初始化添加五个 TabPane
//     const initialPanes = [
//       {
//         title: intl.formatMessage({ id: 'order.tabs.all' }),
//         key: '0',
//         filter: 'archived',
//       },
//       {
//         title: intl.formatMessage({ id: 'order.tabs.readytoship' }),
//         key: '1',
//         filter: 'ready_to_ship',
//       },
//       {
//         title: intl.formatMessage({ id: 'order.tabs.cancelled' }),
//         key: '2',
//         filter: 'cancelled',
//       },
//       {
//         title: intl.formatMessage({ id: 'order.tabs.process' }),
//         key: '3',
//         filter: 'processing',
//       },
//       {
//         title: intl.formatMessage({ id: 'order.tabs.neworders' }),
//         key: '4',
//         filter: 'today',
//       },
//     ];

//     console.log('Initial panes:', initialPanes); // 添加调试输出
//     dispatch({ type: 'SET_PANES', payload: initialPanes });
//   }, []);

//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();

//   // 处理模态框的确定事件
//   const handleOk = (action?: string, targetKey?: string) => {
//     form
//       .validateFields()
//       .then(values => {
//         const title = values.title;
//         if (!title.trim()) {
//           return false; // 如果用户没有输入任何内容，则阻止关闭模态框
//         }

//         if (action === 'rename' && targetKey) {
//           dispatch({
//             type: 'RENAME_PANE',
//             payload: { key: targetKey, title },
//           });
//         } else {
//           // 生成唯一 key
//           const uniqueKey = generateUniqueKey(state.panes);

//           // 使用 TabPane 的 filter 属性
//           dispatch({
//             type: 'ADD_PANE',
//             payload: { title, key: uniqueKey, filter: '' },
//           });
//         }
//         setIsModalVisible(false);
//         form.resetFields(); // 清空表单
//       })
//       .catch(info => {
//         console.log('Validate Failed:', info);
//       });
//   };

//   // 处理模态框的取消事件
//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields(); // 清空表单
//   };

//   const onChange = (activeKey: string) => {
//     dispatch({ type: 'SET_ACTIVE_KEY', payload: activeKey });
//   };

//   const onEdit = (targetKey: string, action: string) => {
//     if (action === 'add') {
//       setIsModalVisible(true);
//     } else if (action === 'remove') {
//       // 确保只有当标签页不是前五个时才允许删除
//       if (parseInt(targetKey) > 5) {
//         dispatch({ type: 'REMOVE_PANE', payload: targetKey });
//       }
//     } else if (action === 'rename') {
//       // 打开模态框让用户输入新的标题
//       setIsModalVisible(true);
//       form.setFieldsValue({ title: state.panes.find(pane => pane.key === targetKey)?.title });
//     }
//   };

//   // 生成唯一 key 的辅助函数
//   function generateUniqueKey(panes: TabPane[]): string {
//     let key = generateUUID();
//     // 确保 key 是唯一的
//     while (panes.some(pane => pane.key === key)) {
//       key = generateUUID();
//     }
//     return key;
//   }

//   const tabsContextValue: TabsContextValue = {
//     activeKey: '',
//     setActiveKey: (key: string) => {
//       // 实现setActiveKey逻辑
//     },
//     panes: [],
//     setPanes: (newPanes: TabPane[]) => {
//       // 实现setPanes逻辑
//     },
//     updateFilter: (key: string, filter: string) => {
//       // 实现updateFilter逻辑
//     }
//   };
//   const [loading, setLoading] = useState(false); // 新增加载标志
//   useEffect(() => {
//     // 当 activeKey 改变时，加载对应的内容
//     setLoading(true); // 开始加载
//     // 示例：模拟数据加载
//     setTimeout(() => {
//       setLoading(false);
//     }, 500);
//   }, [state.activeKey]);

//   // 定义一个函数，根据 key 的值返回不同的内容
//   const getContentByKey = (key: string) => {
//     if (loading) {
//       return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//           <LoadingOutlined style={{ color: '#1890FF', fontSize: '30px' }} spin />
//         </div>
//       ); // 显示加载提示
//     }

//     const pane = state.panes.find(pane => pane.key === key);
//     if (pane) {
//       return <OrdersListAjax filterCondition={pane.filter || ''} />;
//     }
//     return null;
//   };

//   return (
//     <TabsProvider value={tabsContextValue}> {/* 包裹整个 DTTabs 组件 */}
//       <div>
//         <Tabs
//           activeKey={state.activeKey}
//           onChange={onChange}
//           type="editable-card"
//           onEdit={onEdit}
//         >
//           {state.panes.map(pane => (
//             <Tabs.TabPane
//               tab={pane.title}
//               key={pane.key}
//               closable={parseInt(pane.key) > 5}
//             >
//               {/* 根据 key 和过滤条件渲染不同的内容 */}
//               {getContentByKey(pane.key)}
//               <OrdersSelectCard/>
//               1
//               <OrdersNewTabs/>
//             </Tabs.TabPane>
//           ))}
//         </Tabs>

//         {/* 模态框 */}
//         <Modal
//           title="创建选项卡"
//           visible={isModalVisible}
//           okText="保存"
//           onCancel={handleCancel}
//           onOk={() => handleOk()}
//         >
//           <Form form={form} layout="vertical">
//             <Form.Item
//               name="title"
//               label="选项卡名称"
//               rules={[{ required: true, message: '请输入选项卡名称!' }]}
//             >
//               <Input placeholder="请输入选项卡名称" />
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     </TabsProvider >
//   );
// }

// export default DTTabs;
import React, { useState } from 'react';  
import { Tabs, Button, Modal, Tag } from 'antd';  
import { useIntl } from '@umijs/max';  
import OrdersSelectCard from '@/components/Card/OrdersSelectCard';  
import OrdersListAjax from '@/pages/Orders/OrderList/OrdersListAjax';  
import '@/components/Card/FilteRConditions.scss';  
  
const { TabPane } = Tabs;  
  
interface FilterCondition {  
  id: string;  
  filter_group_id: string;  
  filter_name: React.ReactNode;  
  filter_field: string;  
  filter_value: string;  
  module: string;  
}  
  
const filterConditions: FilterCondition[] = [  
  { id: '0', filter_group_id: '0', filter_name: '归档订单: 展示已归档的订单', filter_field: 'orders_status_id', filter_value: '1', module: 'orders_list' },
  { id: '1', filter_group_id: '1', filter_name: '归档订单: 展示已归档的订单', filter_field: 'orders_status_id', filter_value: '1', module: 'orders_list' },
  { id: '1', filter_group_id: '1', filter_name: '发货状态: 待发货, 部分发货', filter_field: 'orders_status_id', filter_value: '1', module: 'orders_list' },
  { id: '2', filter_group_id: '2', filter_name: '归档订单: 展示已归档的订单', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
  { id: '2', filter_group_id: '2', filter_name: '订单状态: 已取消', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
  { id: '3', filter_group_id: '3', filter_name: '归档订单: 展示已归档的订单', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
  { id: '3', filter_group_id: '3', filter_name: '订单状态: 处理中', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
  { id: '4', filter_group_id: '4', filter_name: '归档订单: 展示已归档的订单', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
  { id: '4', filter_group_id: '4', filter_name: '订单日期: 今天', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' }
];  
  
const filteredArr = (id: string) => filterConditions.filter(element => element.id === id);  
  
const FilteredOrdersComponent = ({ id }: { id: string }) => {  
  const elementsById = filteredArr(id);  
  const [filterValues, setFilterValues] = useState(elementsById.map(element => element.filter_value));  
  
  return (  
    <div>  
      <OrdersSelectCard />  
      {elementsById.length > 0 && (  
        <div>  
          <div>  
            {elementsById.map((element, index) => (  
              <Tag key={index} className='tag'>  
                {element.filter_name}  
              </Tag>  
            ))}  
            <Button className="button" type="primary" >  
              新建选项卡  
            </Button>  
          </div>  
          <OrdersListAjax filterCondition={filterValues} />  
        </div>  
      )}  
    </div>  
  );  
};  
  
function DTTabs() {  
  const [activeKey, setActiveKey] = useState('1');  
  const intl = useIntl();  
  const [panes, setPanes] = useState([  
    { title: intl.formatMessage({ id: 'order.tabs.all' }), content: <FilteredOrdersComponent id={'0'} />, key: '1' },
    { title: intl.formatMessage({ id: 'order.tabs.readytoship' }), content: <FilteredOrdersComponent id={'1'} />, key: '2' },
    { title: intl.formatMessage({ id: 'order.tabs.cancelled' }), content: <FilteredOrdersComponent id={'2'} />, key: '3' },
    { title: intl.formatMessage({ id: 'order.tabs.process' }), content: <FilteredOrdersComponent id={'3'} />, key: '4' },
    { title: intl.formatMessage({ id: 'order.tabs.neworders' }), content: <FilteredOrdersComponent id={'4'} />, key: '5' },
  ]);  
  
  const addNewTab = () => {  
    Modal.info({  
      title: '自定义框',  
      content: <div></div>,  
      onOk() {  
        const newPanes = [...panes, { title: '新标签 ' + (panes.length + 1), content: <div></div>, key: (panes.length + 1).toString() }];  
        setPanes(newPanes);  
        setActiveKey((panes.length + 1).toString());  
      },  
    });  
  };  
  
  const onChange = (newActiveKey: string) => {  
    if (newActiveKey === '7') {  
      addNewTab();  
    } else {  
      setActiveKey(newActiveKey);  
    }  
  };  
  
  const onEdit = (targetKey: string, action: string) => {  
    if (action === 'add') {  
      addNewTab();  
    } else if (action === 'remove') {  
      const newPanes = panes.filter(pane => pane.key !== targetKey);  
      setPanes(newPanes);  
    } else if (action === 'rename') {  
      const newPanes = panes.map(pane => {  
        if (pane.key === targetKey) {  
          return { ...pane, title: '重命名标签' };  
        }  
        return pane;  
      });  
      setPanes(newPanes);  
    }  
  };  
  
  return (  
    <div>  
      <Tabs  
        activeKey={activeKey}  
        onChange={onChange}  
        type="editable-card"  
        onEdit={onEdit}  
      >  
        {panes.map(pane => (  
          <TabPane tab={pane.title} key={pane.key} closable={parseInt(pane.key, 10) > 5}>  
            {pane.content}  
          </TabPane>  
        ))}  
      </Tabs>
    </div>
  );
}

export default DTTabs;