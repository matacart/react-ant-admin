
import React, { useRef, useState } from 'react'
import { Button, Dropdown, Flex, message, Modal, Space, Upload } from 'antd';
import { Tabs } from 'antd'
import type {  TabsProps } from 'antd'
import OrdersSelectCard from '@/components/Card/OrdersSelectCard'
import './index.scss'
import styled from 'styled-components'
import Icon, { ImportOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import tabs from 'antd/es/tabs';
import { Card } from 'antd';
import  DTTabs from '@/components/Tabs/DTTabs'  
import ReactDOM from 'react-dom'; 
import { history, useIntl } from '@umijs/max';
interface MenuItem {
  key: string;
  label: React.ReactNode;
  onClick?: () => void; // 可选的点击事件处理函数
}

interface MenuProps {
  items: MenuItem[];
}

export default function Orders() {
  const intl = useIntl();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateTrackingModalVisible, setUpdateTrackingModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    message.success('导入成功');
  };

  const showUpdateTrackingModal = () => {
    setUpdateTrackingModalVisible(true);
  };

  const handleUpdateTrackingCancel = () => {
    setUpdateTrackingModalVisible(false);
  };

  const handleUpdateTrackingOk = () => {
    setUpdateTrackingModalVisible(false);
    message.success('导入成功');
  };

  const props: MenuProps['items'] = [
    {
      key: '1',
      label: intl.formatMessage({ id: 'orderlist.picking.list' }),
    },
    {
      key: '2',
      label: intl.formatMessage({ id: 'orderlist.shipping.list' }),
    },
    {
      key: '3',
      label: intl.formatMessage({ id: 'orderlist.order.detail' }),
    },
    {
      key: '4',
      label: intl.formatMessage({ id: 'orderlist.order.report' }),
    },
  ];

  const aItems: MenuProps['items'] = props;

  const beforeUpload = (file: any) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('文件大小不能超过10MB!');
    }
    return isLt10M;
  };

  const handleChange = ({ fileList }: { fileList: any[] }) => {
    console.log(fileList);
  };

  return (
    <div className="create-warp-flex" style={{ width: "100%" }}>
      <div className="create-warp">
        <div className="create-title">
          <div className="create-title-left">
            <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>
              {intl.formatMessage({ id: 'orderlist.header' })}
            </h3>
            <ImportOutlined style={{ position: 'relative', top: -24, left: -10 }} />
            <div style={{ position: 'relative', top: -44, left: 130 }}>
              <Dropdown menu={{ items: aItems }}>
                <a onClick={(e) => e.preventDefault()} style={{ color: '#242833' }}>
                  <Space>{intl.formatMessage({ id: 'orderlist.import.orders' })}</Space>
                </a>
              </Dropdown>
            </div>
          </div>
          <div className="button-container">
            <Button
              onClick={showModal}
              style={{ marginTop: "10px", backgroundColor: 'WHITE', marginRight: '12px', width: "90px", height: "36px", fontSize: "14px" }}
            >
              {intl.formatMessage({ id: 'order.button.bulkshipping' })}
            </Button>

            <Button
              onClick={showUpdateTrackingModal}
              style={{ marginTop: "10px", marginRight: '12px', backgroundColor: 'white', width: "118px", height: "36px", fontSize: "14px" }}
            >
              {intl.formatMessage({ id: 'order.button.updatetrackingnumber' })}
            </Button>

            <Button type="primary"
              onClick={() => { history.push('/orders/draftOrders/add') }}
              style={{ marginTop: "10px", width: "88px", height: "36px", fontSize: "16px", background: '#356DFF' }}
            >
              {intl.formatMessage({ id: 'order.button.createorder' })}
            </Button>
          </div>
        </div>

        <div className="create-content">
          <div>
            <DTTabs />
          </div>
          <Tabs defaultActiveKey="1" />
        </div>
      </div>

      {/* 模态框：批量发货 */}
      <Modal
        title="批量发货"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="上传并导入"
        cancelText="取消"
        footer={[
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button key="import-record" onClick={handleCancel}>
            导入记录
          </Button>,
          <div style={{ display: 'flex', gap: '8px' }}>
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            上传并导入
          </Button>,
          </div>
          </div>
        ]}
        width={600} // 设置 Modal 宽度
      >
        <p>
          请先下载批量导入模版，并按导入模版规范填写订单相关信息，再在本页导入表格，以更新订单包裹的发货状态。
        </p>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <Upload
      name="file"
      multiple
      action="your-upload-endpoint"
      listType="picture-card"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      style={{ width: '90%' }} // 尝试设置为模态框内容区域的 90%
    >
      <div>
        上传文件（或拖放上传）                
      </div>
    </Upload>
        </div>
      </Modal>

      {/* 模态框：更新订单追踪编号 */}
      <Modal
        title="更新订单追踪编号"
        visible={updateTrackingModalVisible}
        onOk={handleUpdateTrackingOk}
        onCancel={handleUpdateTrackingCancel}
        okText="上传并导入"
        cancelText="取消"
        footer={[
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button key="export-history" onClick={handleUpdateTrackingCancel} >
            导出历史记录
          </Button>,
          <div style={{ display: 'flex', gap: '8px' }}>
        <Button key="cancel" onClick={handleUpdateTrackingCancel} >
          取消
        </Button>,
        <Button key="ok" type="primary" onClick={handleUpdateTrackingOk}>
          上传并导入
        </Button>,
      </div>
          </div>
        ]}
        width={600} // 设置 Modal 宽度
      >
        <p>
          请先导出已发货订单，在表格中为订单包裹添加或修改运单号，再在本页导入表格，以更新订单包裹物流状态。
        </p>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <Upload
      name="file"
      multiple
      action="your-upload-endpoint"
      listType="picture-card"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      style={{ width: '90%' }} // 尝试设置为模态框内容区域的 90%
    >
      <div>
        上传文件（或拖放上传）                
      </div>
    </Upload>
        </div>
      </Modal>
    </div>
  );
}




















// import { Badge, Button, Card, Divider, Form, Input, Tooltip } from "antd";
// import { CheckCircleTwoTone, ConsoleSqlOutlined, CopyOutlined, EllipsisOutlined } from "@ant-design/icons";
// import { observer } from "mobx-react-lite";
// import order from "mock/order";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getOrderDetail } from "@/services/y2/order";
// import { useIntl } from "@umijs/max";
// interface productinfo{

//   id: string;
//   orders_id: string;
//   product_id: string;
//   productModel: string;
//   productImage: string;
//   productName: string;
//   productNum: string;
//   product_prid: string;
//   productOption: null | any;


// }
// interface OrderDetail {
//   id: string; // 订单ID
//   date_purchased:string;//订单日期
//   orders_status_id:string;//订单状态
//   delivery_status_id:string;//发货状态
//   payment_status_id:string;//支付状态
//   orders_name:string;
//   orders_price:string;
//   orders_total:string;
//   orders_num:string;
//   shipping_cost:string;
//   delivery_name:string;
//   email:string;
//   tel:string;
//   country:string;
//   province:string;
//   city:string;
//   address:string;
//   postcode:string;
//   productinfo:productinfo[];
// }
// const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     console.log('Change:', e.target.value);
// };
// const {TextArea} = Input
// interface OrdersShippedCardProps {
//   order: OrderDetail;
//   productInfo: productinfo[];
// }

// function OrdersShippedCard({ order, productInfo }: OrdersShippedCardProps) {
//   const intl = useIntl();
//   const translateStatus = (key: string) => {
//     return intl.formatMessage({ id: key });
//   };

//     return (
//       <Card
//       style={{ width: '980px' }}
//       title={
//         <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px', color: '#474F5E', justifyContent: 'space-between' }}>
//           <div>
//             <CheckCircleTwoTone twoToneColor="#52c41a" style={{ margin: '10px' }} />
//             {order && translateStatus(`order.status.name_${order.delivery_status_id}`)} #{order?.id}-F1
//             <Tooltip title="复制">
//               <CopyOutlined style={{ margin: '10px' }} />
//             </Tooltip>
//           </div>
//           <EllipsisOutlined />
//         </div>
//       }
//     >
//       <Form>
//         <div>
//           <p style={{ fontSize: '14px', color: '#7A8499' }}>{intl.formatMessage({ id: 'order.detail.location' })}</p>
//           <p style={{ fontSize: '14px', color: '#242833' }}>{intl.formatMessage({ id: 'order.detail.defaultlocation' })}</p>
//           <p style={{ fontSize: '14px', color: '#7A8499' }}>{order?.delivery_status_id}</p>
//           {/* <p style={{ fontSize: '14px', color: '#242833' }}>{order?.delivery_time}</p> */}

//           {productInfo.map((product) => (
//             <div key={product.id} style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'space-between' }}>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc', marginRight: '10px' }}></div>
//                 <img src={product.productImage} alt={product.productName} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
//                 <div style={{ display: 'flex', flexDirection: 'column' }}>
//                   <p style={{ fontSize: '14px', color: '#474F5E' }}>{product.productName}</p>
//                 </div>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 <p style={{ fontSize: '14px', color: '#474F5E' }}>US${order?.orders_price}X {product.productNum}</p>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <p style={{ fontSize: '14px', color: '#474F5E' }}>US${order?.orders_total}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Form>
//       <Divider />
//       <Form>
//         <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'space-between' }}>
//           <div style={{ fontSize: '14px', color: '#7A8499' }}>{intl.formatMessage({ id: 'order.detail.tracking' })}：无</div>
//           <Button
//             className='my-button'
//             style={{
//               marginTop: '10px',
//               backgroundColor: '#356DFF',
//               width: '116px',
//               height: '36px',
//               fontSize: '14px',
//               color: 'white',
//             }}
//           >
//             {intl.formatMessage({ id: 'order.detail.addtracking' })}
//           </Button>
//         </div>
//       </Form>
//     </Card>
// );
// }
// export default observer(OrdersShippedCard);