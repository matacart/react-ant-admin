
// export default DTTabs;
import React, { useEffect, useMemo, useState } from 'react';  
import { Tabs, Button, Modal, Tag } from 'antd';  
import { useIntl } from '@umijs/max';  
import OrdersSelectCard from '@/components/Card/OrdersSelectCard';  
import OrdersListAjax from '@/pages/Orders/OrderList/OrdersListAjax';  
import '@/components/Card/FilteRConditions.scss';  
import { CloseOutlined } from '@ant-design/icons';




  
const { TabPane } = Tabs;  
  
interface FilterCondition {  
  id: string;  
  filter_group_id: string;  
  filter_name: React.ReactNode;  
  filter_field: string;  
  filter_value: string;  
  module: string;  
}  
  
const filterCondition: FilterCondition[] = [  
  { id: '1', filter_group_id: '1', filter_name: '归档订单: 展示已归档的订单', filter_field: 'archive_status', filter_value: '0', module: 'orders_list' },

  { id: '2', filter_group_id: '2', filter_name: '发货状态: 待发货, 部分发货', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
 
  { id: '3', filter_group_id: '3', filter_name: '订单状态: 已取消', filter_field: 'orders_status_id', filter_value: '0', module: 'orders_list' },
 
  { id: '4', filter_group_id: '4', filter_name: '订单状态: 处理中', filter_field: 'orders_status_id', filter_value: '1', module: 'orders_list' },

  { id: '5', filter_group_id: '5', filter_name: '订单日期: 今天', filter_field: 'orders_status_id', filter_value: '1', module: 'orders_list' }
];  
  // 将对象数组转换为JSON字符串
const jsonString = JSON.stringify(filterCondition);
console.log(jsonString);
const filteredArr = (id: string): FilterCondition[] => {
  return filterCondition.filter(element => element.id === id);
};

const FilteredOrdersComponent = ({ id }: { id: string }) => {
  const elementsById = filteredArr(id);
  const [filterCondition, setFilterCondition] = useState<FilterCondition[]>([]);

  // 更新 state
  useEffect(() => {
    setFilterCondition(elementsById.map(element => ({
      ...element,
      // 如果需要转换成其他形式，可以在这里添加转换逻辑
    })));
  }, []); // 注意这里只依赖于 elementsById

  return (  
    <div>  
      <div>  
      <OrdersSelectCard />  
      </div>  
      {filterCondition.length > 0 && (  
        <div>  
          <div>  
            {filterCondition.map((element) => (  
              <Tag  
                key={element.id}  
                className='tag'  
              >  
                {element.filter_name}  
              </Tag>  
            ))}  
            <Button className="button" type="primary">  
              新建选项卡  
            </Button>  
          </div>  
          <OrdersListAjax filterCondition={filterCondition} />  
        </div>  
      )}  
    </div>  
  );  
};
  
function DTTabs() {  
  const [activeKey, setActiveKey] = useState('1');  
  const intl = useIntl();  
  const [panes, setPanes] = useState([  
    { title: intl.formatMessage({ id: 'order.tabs.all' }), content: <FilteredOrdersComponent id={'1'} />, key: '1' },
    { title: intl.formatMessage({ id: 'order.tabs.readytoship' }), content: <FilteredOrdersComponent id={'2'} />, key: '2' },
    { title: intl.formatMessage({ id: 'order.tabs.cancelled' }), content: <FilteredOrdersComponent id={'3'} />, key: '3' },
    { title: intl.formatMessage({ id: 'order.tabs.process' }), content: <FilteredOrdersComponent id={'4'} />, key: '4' },
    { title: intl.formatMessage({ id: 'order.tabs.neworders' }), content: <FilteredOrdersComponent id={'5'} />, key: '5' },
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

// const { TabPane } = Tabs;

// ;


// // 假设我们有以下子组件
// const ComponentA = () => <div><OrdersSelectCard /></div>;
// const ComponentB = () => <div><OrdersSelectCard /></div>;
// const ComponentC = () => <div><OrdersSelectCard /></div>;
// const ComponentD = () => <div><OrdersSelectCard /></div>;
// const ComponentE = () => <div><OrdersSelectCard /></div>;

// function DynamicTabs() {
//   const [activeKey, setActiveKey] = useState('1');
//   const [panes, setPanes] = useState([
//     { title: '全部', content: <ComponentA />, key: '1' },
//     { title: '代发货', content: <ComponentB />, key: '2' },
//     { title: '已取消', content: <ComponentC />, key: '3' },
//     { title: '处理中', content: <ComponentD />, key: '4' },
//     { title: '今日新订单', content: <ComponentE />, key: '5' },
//   ]);

//   const addNewTab = () => {
//     Modal.info({
//       title: '自定义框',
//       content: <div></div>,
//       onOk() {
//         const newPanes = [...panes, { title: '新标签 ' + (panes.length + 1), content: <div></div>, key: (panes.length + 1).toString() }];
//         setPanes(newPanes);
//         setActiveKey((panes.length + 1).toString());
//       },
//     });
//   };

//   const onChange = (activeKey: React.SetStateAction<string>) => {
//     if (activeKey === '7') {
//       addNewTab();
//     } else {
//       setActiveKey(activeKey);
//     }
//   };

//   const onEdit = (targetKey: string, action: string) => {
//     if (action === 'add') {
//       addNewTab();
//     } else if (action === 'remove') {
//       if (parseInt(targetKey) > 5) {
//         const newPanes = panes.filter(pane => pane.key !== targetKey);
//         setPanes(newPanes);
//       }
//     } else if (action === 'rename') {
//       const newPanes = panes.map(pane => {
//         if (pane.key === targetKey) {
//           pane.title = '重命名标签';
//         }
//         return pane;
//       });
//       setPanes(newPanes);
//     }
//   };


//   return (
//     <div>
//       <Tabs
//         activeKey={activeKey}
//         onChange={onChange}
//         type="editable-card"
//         onEdit={onEdit}
//       >
//         {panes.map(pane => (
//           <TabPane tab={pane.title} key={pane.key} closable={parseInt(pane.key) > 5}>
//             {pane.content}
//           </TabPane>
//         ))}
        
//       </Tabs>
//      <OrdersListAjax/>
//     </div>
//   );
// }

// export default DynamicTabs;
