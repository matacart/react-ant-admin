import React, { useEffect, useState } from 'react';
import { Tabs, Modal, Tag, Input, Flex, Dropdown, Radio, Popover, TabsProps } from 'antd';
import OrdersListAjax from '@/pages/Orders/OrderList/OrdersListAjax';
import OrdersSelectCard from './OrdersSelectCard';
import orderList from '@/store/order/orderList';
import { observer } from 'mobx-react-lite';
import { useIntl } from '@umijs/max';
import { DownIcon } from '@/components/Icons/Icons';


const FilteredOrdersComponent = observer(({ id, activeKey }: { id: string; activeKey: string }) => {

  const intl = useIntl();

  const [filterCondition,setFilterCondition] = useState(
    {
      id:id,
      languagesId: '2',
    }
  )

  // const handleRemoveCondition = (conditionId: string) => {
  //   const updatedConditions = filterCondition.filter(condition => condition.id !== conditionId);
  //   setFilterCondition(updatedConditions);
  // };


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
                {intl.formatMessage({ id: 'orders.orderList.orderTabs.orderstatus' })}：{orderList.bizOrderStatuses.map((item,index)=>{
                  switch (item) {
                    case "-1":
                      return intl.formatMessage({ id: 'orders.orderList.orderTabs.archived' })
                    case "0":
                      return intl.formatMessage({ id: 'orders.orderList.orderTabs.cancelled' })
                    case "1":
                      return intl.formatMessage({ id: 'orders.orderList.orderTabs.process' })
                  }
                }).join(",")}
              </span>
          </Tag>}
        </Flex>
        <Modal
          title={intl.formatMessage({ id: 'orders.orderList.orderTabs.newTabTitle' })}
          open={isModalVisible}
          onOk={() => {
          
            handleCancel();
          }}
          onCancel={handleCancel}
        >
          <p>{intl.formatMessage({ id: 'orders.orderList.orderTabs.tabName' })}</p>
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


  const [items,setItems] = useState<TabsProps['items']>([
    { 
      key:'',
      label: intl.formatMessage({ id: 'orders.orderList.orderTabs.all' }), 
      children: <FilteredOrdersComponent id={''} activeKey={''} />,
      closable:false
    },
    { 
      key:'4',
      label: intl.formatMessage({ id: 'orders.orderList.orderTabs.readytoship' }), 
      children: <FilteredOrdersComponent id={'4'} activeKey={'4'} />,
      closable:false
    },
    { 
      key:'3',
      label: intl.formatMessage({ id: 'orders.orderList.orderTabs.cancelled' }), 
      children: <FilteredOrdersComponent id={'3'} activeKey={'3'} />,
      closable:false
    },
    { 
      key:'2',
      label: intl.formatMessage({ id: 'orders.orderList.orderTabs.process' }), 
      children: <FilteredOrdersComponent id={'2'} activeKey={'2'} />,
      closable:false
    },
    { 
      key:'5',
      label: intl.formatMessage({ id: 'orders.orderList.orderTabs.neworders' }), 
      children: <FilteredOrdersComponent id={'5'} activeKey={'5'} />,
      closable:false
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const addNewTab = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newItems = [
      ...(items || []),
      { 
        key: ((items || []).length + 1).toString(),
        label: newTabName, 
        children: <FilteredOrdersComponent id={''} activeKey={''} />,
        closable: true
      },
    ];
    setItems(newItems);
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

  const onEdit = (targetKey: any, action: string) => {
    console.log(targetKey, action);
    if (action === 'add') {
      addNewTab();
    }else if(action === 'remove'){
      setItems((items || []).filter(item => item.key !== targetKey));
      setActiveKey('');
    }
  };

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        destroyOnHidden={true}
        type="editable-card"
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
                    { value: 1, label: intl.formatMessage({ id: 'orders.orderList.orderTabs.alllocations' }) },
                    { value: 2, label: intl.formatMessage({ id: 'orders.orderList.orderTabs.defaultlocation' }) },
                  ]}
                />
              </>,
            }
          ]}}>
            <Flex gap={6} className='cursor-pointer'>
              <div className='color-474F5E'>{intl.formatMessage({ id: 'orders.orderList.orderTabs.alllocations' })}</div>
              <DownIcon className='color-474F5E font-12' />
            </Flex>
          </Dropdown>
        </>}
        onEdit={onEdit}
        items={items}
      />
      <Modal
        title={intl.formatMessage({ id: 'orders.orderList.orderTabs.createNewTab' })}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder={intl.formatMessage({ id: 'orders.orderList.orderTabs.enterTabName' })}
          value={newTabName}
          onChange={e => setNewTabName(e.target.value)}
        />
      </Modal>
    </div>
  );
}
export default OrderTabs