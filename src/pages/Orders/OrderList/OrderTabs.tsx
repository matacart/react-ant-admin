import React, { useEffect, useState } from 'react';
import { Tabs, Button, Modal, Tag, Input, Flex, Dropdown, Radio, Popover } from 'antd';
import OrdersListAjax from '@/pages/Orders/OrderList/OrdersListAjax';
import OrdersSelectCard from './OrdersSelectCard';
import orderList from '@/store/order/orderList';
import { observer } from 'mobx-react-lite';
import { useIntl } from '@umijs/max';
import { DownIcon } from '@/components/Icons/Icons';

const { TabPane } = Tabs;

interface FilterCondition {
  id: string;
  languagesId:string;
}

// 获取今天的开始和结束时间
const getTodayStart = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTodayEnd = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day} 23:59:59`;
};

const FilteredOrdersComponent = observer(({ id, activeKey }: { id: string; activeKey: string }) => {
  const [filterCondition,setFilterCondition] = useState(
    {
      id:id,
      languagesId: '2',
    }
  )

  const handleRemoveCondition = (conditionId: string) => {
    const updatedConditions = filterCondition.filter(condition => condition.id !== conditionId);
    setFilterCondition(updatedConditions);
  };


  // 定义模态框的状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 定义选项卡名称的状态
  const [tabName, setTabName] = useState('');

  // 处理点击事件，显示模态框
  const addNewTab = () => {
    setIsModalVisible(true);
  };

  // 关闭模态框
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(()=>{
    setFilterCondition({
      id:id,
      languagesId: orderList.languages
    })
  },[orderList.tagsStatusList,orderList.languages])

  return (
    <div>
      <div>
        <OrdersSelectCard />
      </div>
      <div>
        {/* 标签 */}
        <Flex style={{marginBottom:"10px"}}>
          {orderList.optionLabel.map((item,index)=>(
            item.value && <Tag key={index} style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{}}>
                <span className="color-474F5E font-14">
                  {item.title}：{item.label}
                </span>
            </Tag>
          ))}
          {/* 订单状态 */}
          {orderList.bizOrderStatuses && orderList.bizOrderStatuses.length > 0 && <Tag style={{padding:"4px 10px"}} color="processing" bordered={false} closable onClose={()=>{
            orderList.setBizOrderStatuses([])
          }}>
              <span className="color-474F5E font-14">
                {"订单状态"}：{orderList.bizOrderStatuses.map((item,index)=>{
                  switch (item) {
                    case "-1":
                      return "已归档"
                    case "0":
                      return "已取消"
                    case "1":
                      return "处理中"
                  }
                }).join(",")}
              </span>
          </Tag>}
        </Flex>
        {/* {filterCondition.map((element) => (
          <Tag
            key={element.id}
            className='tag'
            closable
            onClose={() => handleRemoveCondition(element.id)}
          >
            {element.filter_name}
          </Tag>
        ))} */}
        {/* <Button  onClick={addNewTab}>
          新建选项卡
        </Button> */}
        <Modal
          title="新建选项卡"
          visible={isModalVisible}
          onOk={() => {
          
            handleCancel();
          }}
          onCancel={handleCancel}
        >
          <p>选项卡名称</p>
          <Input></Input>
        </Modal>
      </div>
        <OrdersListAjax {...filterCondition} />
    </div>
  );
})

function OrderTabs() {
  const [newTabName, setNewTabName] = useState('');
  const [activeKey, setActiveKey] = useState('');
  const intl = useIntl();
  const [panes, setPanes] = useState([
    { title: intl.formatMessage({ id: 'order.tabs.all' }), content: <FilteredOrdersComponent id={''} activeKey={activeKey} />, key: '' },
    { title: intl.formatMessage({ id: 'order.tabs.readytoship' }), content: <FilteredOrdersComponent id={'4'} activeKey={activeKey} />, key: '4' },
    { title: intl.formatMessage({ id: 'order.tabs.cancelled' }), content: <FilteredOrdersComponent id={'3'} activeKey={activeKey} />, key: '3' },
    { title: intl.formatMessage({ id: 'order.tabs.process' }), content: <FilteredOrdersComponent id={'2'} activeKey={activeKey} />, key: '2' },
    { title: intl.formatMessage({ id: 'order.tabs.neworders' }), content: <FilteredOrdersComponent id={'5'} activeKey={activeKey} />, key: '5' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addNewTab = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newPanes = [
      ...panes,
      {
        title: newTabName,
        content: <FilteredOrdersComponent id={(panes.length + 1).toString()} activeKey={activeKey} />,
        key: (panes.length + 1).toString(),
      }
    ];
    setPanes(newPanes);
    setActiveKey((panes.length + 1).toString());
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
        destroyInactiveTabPane={true}
        type="editable-card"
        onEdit={onEdit}
        tabBarExtraContent={<>
          <Dropdown placement="bottomRight" trigger={["click"]} menu={{items:[
            {
              key: '1',
              label: <>
                <Radio.Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                  options={[
                    { value: 1, label: '全部地点' },
                    { value: 2, label: '默认地点' },
                  ]}
                />
              </>,
            }
          ]}}>
            <Flex gap={6} className='cursor-pointer'>
              <div className='color-474F5E'>全部地点</div>
              <DownIcon className='color-474F5E font-12' />
            </Flex>
          </Dropdown>
        </>}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key} closable={parseInt(pane.key, 10) > 5} >
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
      <Modal
        title="创建新选项卡"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="请输入选项卡名称"
          value={newTabName}
          onChange={e => setNewTabName(e.target.value)}
        />
      </Modal>
    </div>
  );
}
export default OrderTabs