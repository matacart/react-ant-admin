
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Flex, message, Modal, Space, Upload } from 'antd';
import styled from 'styled-components'
import { ExportOutlined } from '@ant-design/icons';
import { history, useIntl } from '@umijs/max';
import OrderTabs from '../OrderList/OrderTabs';
import DefaultButton from '@/components/Button/DefaultButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import ExportPickingModal from './ExportPickingModal';
import ExportShippingModal from './ExportShippingModal';
import orderList from '@/store/order/orderList';
import ExportOrderPageModal from './ExportOrderPageModal';
import ExportOrderDetailModal from './ExportOrderDetailModal';
import cookie from 'react-cookies';

interface MenuItem {
  key: string;
  label: React.ReactNode;
  onClick?: () => void; // 可选的点击事件处理函数
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
    message.success(intl.formatMessage({ id: 'orders.orderList.index.uploadAndImport' }));
  };

  const showUpdateTrackingModal = () => {
    setUpdateTrackingModalVisible(true);
  };

  const handleUpdateTrackingCancel = () => {
    setUpdateTrackingModalVisible(false);
  };

  const handleUpdateTrackingOk = () => {
    setUpdateTrackingModalVisible(false);
    message.success(intl.formatMessage({ id: 'orders.orderList.index.uploadAndImport' }));
  };

  const props = [
    {
      key: '1',
      label: <ExportPickingModal />,
    },
    {
      key: '2',
      label: <ExportShippingModal />,
    },
    {
      key: '3',
      label: <ExportOrderPageModal />,
    },
    {
      key: '4',
      label: <ExportOrderDetailModal />,
    },
  ];

  const aItems = props;

  const beforeUpload = (file: any) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error(intl.formatMessage({ id: 'orders.orderList.index.fileSizeError' }));
    }
    return isLt10M;
  };

  const handleChange = ({ fileList }: { fileList: any[] }) => {
    console.log(fileList);
  };


  useEffect(() => {
    orderList.setLanguages(cookie.load("shop_lang") || '2');
    orderList.setOrderIds([])
  }, []);

  return (
    <Scoped>
      <div className="create-warp-flex" style={{ width: "100%" }}>
        <div className="create-warp">
          <div className="create-title">
            <Flex className="create-title-left" align='center' gap={12}>
              <h3>
                {intl.formatMessage({ id: 'orders.orderList.index.orderList' })}
              </h3>
              <div style={{paddingTop:"4px"}}>
                <Dropdown menu={{ items: aItems }} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()} style={{ color: '#242833' }}>
                    <ExportOutlined style={{marginRight:"6px"}} />
                    <Space>{intl.formatMessage({ id: 'orders.orderList.index.exportOrder' })}</Space>
                  </a>
                </Dropdown>
              </div>
            </Flex>
            <Flex gap={12}>
              <DefaultButton onClick={showModal} text={intl.formatMessage({ id: 'orders.orderList.index.batchDelivery' })} />
              <DefaultButton onClick={showUpdateTrackingModal} text={intl.formatMessage({ id: 'orders.orderList.index.updateTrackingNumber' })} />
              <PrimaryButton text={intl.formatMessage({ id: 'orders.orderList.index.createOrder' })} onClick={() => { history.push('/orders/draftOrders/add') }} />
            </Flex>
          </div>

          <div className="create-content">
            <div>
              <OrderTabs />
            </div>
          </div>
        </div>
        {/* 模态框：批量发货 */}
        <Modal
          title={intl.formatMessage({ id: 'orders.orderList.index.bulkDelivery' })}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={intl.formatMessage({ id: 'orders.orderList.index.uploadAndImport' })}
          cancelText={intl.formatMessage({ id: 'orders.orderList.index.cancel' })}
          footer={[
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button key="import-record" onClick={handleCancel}>
                {intl.formatMessage({ id: 'orders.orderList.index.importRecord' })}
              </Button>,
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button key="cancel" onClick={handleCancel}>
                  {intl.formatMessage({ id: 'orders.orderList.index.cancel' })}
                </Button>,
                <Button key="ok" type="primary" onClick={handleOk}>
                  {intl.formatMessage({ id: 'orders.orderList.index.uploadAndImport' })}
                </Button>,
              </div>
            </div>
          ]}
          width={600} // 设置 Modal 宽度
        >
          <p>
            {intl.formatMessage({ id: 'orders.orderList.index.downloadTemplate' })}
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
                {intl.formatMessage({ id: 'orders.orderList.index.uploadFile' })}                
              </div>
            </Upload>
          </div>
        </Modal>
        {/* 模态框：更新订单追踪编号 */}
        <Modal
          title={intl.formatMessage({ id: 'orders.orderList.index.updateTrackingNumberModalTitle' })}
          open={updateTrackingModalVisible}
          onOk={handleUpdateTrackingOk}
          onCancel={handleUpdateTrackingCancel}
          okText={intl.formatMessage({ id: 'orders.orderList.index.uploadAndImport' })}
          cancelText={intl.formatMessage({ id: 'orders.orderList.index.cancel' })}
          footer={[
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button key="export-history" onClick={handleUpdateTrackingCancel} >
              {intl.formatMessage({ id: 'orders.orderList.index.exportHistory' })}
            </Button>,
            <div style={{ display: 'flex', gap: '8px' }}>
          <Button key="cancel" onClick={handleUpdateTrackingCancel} >
            {intl.formatMessage({ id: 'orders.orderList.index.cancel' })}
          </Button>,
          <Button key="ok" type="primary" onClick={handleUpdateTrackingOk}>
            {intl.formatMessage({ id: 'orders.orderList.index.uploadAndImport' })}
          </Button>,
        </div>
            </div>
          ]}
          width={600} // 设置 Modal 宽度
        >
          <p>
            {intl.formatMessage({ id: 'orders.orderList.index.exportShippedOrders' })}
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
          {intl.formatMessage({ id: 'orders.orderList.index.uploadFile' })}                
        </div>
      </Upload>
          </div>
        </Modal>
      </div>
    </Scoped>
  );
}


const Scoped = styled.div`
  .create-warp-flex {
    width: 100%;
    display: flex;
    justify-content: center;
    color: #474f5e;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    .create-warp {
      width: 100%;
      min-width: 500px;
      .create-title {
        margin-bottom: 20px;
        color: #474f5e;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        .create-title-left {
          /* display: inline-block; */
          h3 {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            margin-bottom: 0;
            /* margin: 0 24px 24px 0; */
            overflow: hidden;
            color: #242833;
            font-size: 24px;
            font-weight: 600;
            line-height: 32px;
          }
        }
      }
      .create-content {
        padding: 5px 24px;
        border-radius: 6px;
        width: 100%;
        background-color: white;
      }
  
      .DynamicTabs{
        font-size: 18px;
      }
     
  
    }
  }
`