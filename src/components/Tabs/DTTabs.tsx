import React, { useReducer, useState } from 'react';
import { Tabs, Button, Modal, Form, Input } from 'antd';
import OrdersSelectCard from '@/components/Card/OrdersSelectCard';
import { useIntl } from '@umijs/max';
import { TabsProvider, useTabsContext, TabsContextValue } from '@/components/Card/TabsContext'; 
import OrdersListAjax from '../List/OrderListAjax';
import { Content } from 'antd/es/layout/layout';
import OrdersNewTabs from '../Card/OrdersNewTabs';
import { filter } from 'lodash';

// 定义 reducer 的 action 类型
type ActionType = 'ADD_PANE' | 'REMOVE_PANE' | 'RENAME_PANE' | 'SET_ACTIVE_KEY' | 'SET_PANES' | 'UPDATE_FILTER';

// 定义 reducer 的 state 类型
interface TabState {
  panes: TabPane[];
  activeKey: string;
  filterConditions: Record<string, string>;
}

// 定义 reducer 的 action 接口
interface Action {
  type: ActionType;
  payload?: any;
}

// 定义 TabPane 接口
interface TabPane {
  title: string;
  key: string;
  content?: React.ReactNode; // 可选属性
  filter?: string; // 新增过滤条件
}

// 创建一个适配器函数，用于将 TabPane 数组转换为 Action
function createSetPanesAction(newPanes: TabPane[]): Action {
  return {
    type: 'SET_PANES',
    payload: newPanes,
  };
}

// 定义 reducer 函数
const reducer = (state: TabState, action: Action): TabState => {
  switch (action.type) {
    case 'ADD_PANE':
      return {
        ...state,
        panes: [...state.panes, action.payload],
      };
    case 'REMOVE_PANE':
      return {
        ...state,
        panes: state.panes.filter((pane) => pane.key !== action.payload),
      };
    case 'RENAME_PANE':
      const newPanes = state.panes.map((pane) => {
        if (pane.key === action.payload.key) {
          pane.title = action.payload.title;
        }
        return pane;
      });
      return { ...state, panes: newPanes };
    case 'SET_ACTIVE_KEY':
      return {
        ...state,
        activeKey: action.payload,
      };
    case 'SET_PANES':
      // 确保 action.payload 是一个数组
      if (!Array.isArray(action.payload)) {
        throw new Error('Payload must be an array');
      }
      return {
        ...state,
        panes: action.payload,
      };
    case 'UPDATE_FILTER':
      return {
        ...state,
        filterConditions: {
          ...state.filterConditions,
          [action.payload.key]: action.payload.filter,
        },
      };
    default:
      return state;
  }
};

function DTTabs() {
  const [state, dispatch] = useReducer(reducer, {
    panes: [],
    activeKey: '1',
    filterConditions: {},
  });

  const intl = useIntl();

  React.useEffect(() => {
    // 初始化添加五个 TabPane
    const initialPanes = [
      {
        title: intl.formatMessage({ id: 'order.tabs.all' }),
        key: '0',
        filter: 'archived',
      },
      {
        title: intl.formatMessage({ id: 'order.tabs.readytoship' }),
        key: '1',
        filter: 'ready_to_ship',
      },
      {
        title: intl.formatMessage({ id: 'order.tabs.cancelled' }),
        key: '2',
        filter: 'cancelled',
      },
      {
        title: intl.formatMessage({ id: 'order.tabs.process' }),
        key: '3',
        filter: 'processing',
      },
      {
        title: intl.formatMessage({ id: 'order.tabs.neworders' }),
        key: '4',
        filter: 'today',
      },
    ];
    console.log('Initial panes:', initialPanes); // 添加调试输出
    dispatch({ type: 'SET_PANES', payload: initialPanes });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 处理模态框的确定事件
  const handleOk = (action?: string, targetKey?: string) => {
    form
      .validateFields()
      .then(values => {
        const title = values.title;
        if (!title.trim()) {
          return false; // 如果用户没有输入任何内容，则阻止关闭模态框
        }

        if (action === 'rename' && targetKey) {
          dispatch({
            type: 'RENAME_PANE',
            payload: { key: targetKey, title },
          });
        } else {
          // 生成唯一 key
          const uniqueKey = generateUniqueKey(state.panes);

          // 定义默认过滤条件
          const newFilterCondition = '';

          dispatch({
            type: 'ADD_PANE',
            payload: { title, key: uniqueKey, content: <OrdersListAjax filterCondition={newFilterCondition} /> },
          });
        }
        setIsModalVisible(false);
        form.resetFields(); // 清空表单
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // 处理模态框的取消事件
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // 清空表单
  };

  const onChange = (activeKey: string) => {
    dispatch({ type: 'SET_ACTIVE_KEY', payload: activeKey });
  };

  const onEdit = (targetKey: string, action: string) => {
    if (action === 'add') {
      setIsModalVisible(true);
    } else if (action === 'remove') {
      // 确保只有当标签页不是前五个时才允许删除
      if (parseInt(targetKey) > 5) {
        dispatch({ type: 'REMOVE_PANE', payload: targetKey });
      }
    } else if (action === 'rename') {
      // 打开模态框让用户输入新的标题
      setIsModalVisible(true);
      form.setFieldsValue({ title: state.panes.find(pane => pane.key === targetKey)?.title });
    }
  };

  // 生成唯一 key 的辅助函数
  function generateUniqueKey(panes: TabPane[]): string {
    let key = uuidv4(); // 使用 uuidv4 生成唯一键

    while (panes.some(pane => pane.key === key)) {
      key = uuidv4();
    }
    return key;
  }

  const tabsContextValue: TabsContextValue = {
    panes: state.panes,
    setPanes: (newPanes) => {
      dispatch(createSetPanesAction(newPanes));
    },
    updateFilter: (key: string, filter: string) => {
      dispatch({
        type: 'UPDATE_FILTER',
        payload: { key, filter },
      });
    },
  };

  // 定义一个函数，根据 key 的值返回不同的内容
  const getContentByKey = (key: string) => {
    switch (key) {
      case '0': // 对应 "归档订单: 展示已归档的订单"
        return <OrdersListAjax filterCondition={state.filterConditions[key] || 'archived'} />;
      case '1': // 对应 "发货状态: 待发货, 部分发货"
        return <OrdersListAjax filterCondition={state.filterConditions[key] || 'ready_to_ship'} />;
      case '2': // 对应 "订单状态: 已取消"
        return <OrdersListAjax filterCondition={state.filterConditions[key] || 'cancelled'} />;
      case '3': // 对应 "订单状态: 处理中"
        return <OrdersListAjax filterCondition={state.filterConditions[key] || 'processing'} />;
      case '4': // 对应 "订单日期: 今天"
        return <OrdersListAjax filterCondition={state.filterConditions[key] || 'today'} />;
      default: // 其他自定义标签页
        return <OrdersListAjax filterCondition={state.filterConditions[key] || ''} />;
    }
  };

  return (
    <TabsProvider value={tabsContextValue}> {/* 包裹整个 DTTabs 组件 */}
      <div>
        <Tabs
          activeKey={state.activeKey}
          onChange={onChange}
          type="editable-card"
          onEdit={onEdit}
        >
          {state.panes.map(pane => (
            <Tabs.TabPane
              tab={pane.title}
              key={pane.key}
              closable={parseInt(pane.key) > 5}
            >
              {/* 根据 key 和过滤条件渲染不同的内容 */}
              
              <OrdersSelectCard />
              <OrdersNewTabs/>
              {getContentByKey(pane.key)}
            </Tabs.TabPane>
          ))}
        </Tabs>

        {/* 模态框 */}
        <Modal
          title="创建选项卡"
          visible={isModalVisible}
          okText="保存"
          onCancel={handleCancel}
          onOk={() => handleOk()}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="选项卡名称"
              rules={[{ required: true, message: '请输入选项卡名称!' }]}
            >
              <Input placeholder="请输入选项卡名称" />
            </Form.Item>
          </Form>
        </Modal>
        
        {/* <OrdersListAjax filterCondition={state.filterConditions[state.activeKey]} /> */}

      </div>
    </TabsProvider >
  );
}

export default DTTabs;

function uuidv4(): any {
  throw new Error('Function not implemented.');
}
