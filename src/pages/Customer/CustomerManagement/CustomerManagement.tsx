
import React, { useRef, useState } from 'react'
import { Checkbox, Dropdown, Flex, Modal, Space } from 'antd';
import styled from 'styled-components'
import { ExportOutlined, ImportOutlined } from '@ant-design/icons'; 
import { UnfoldIcon } from '@/components/Icons/Icons';
import ScreeningConditionCard from './ScreeningConditionCard';
import CustmoerListCard from '../Components/CustomerListCard';
import UploadImportDrag from '@/components/UploadFile/UploadImportDrag';
import PrimaryButton from '@/components/Button/PrimaryButton';
import ButtonDropdown from '@/components/Dropdown/ButtonDropdown';
import { useNavigate } from 'react-router-dom';

interface MenuItem {  
  key: string;  
  label: React.ReactNode;  
  onClick?: () => void; // 可选的点击事件处理函数  
}  
  
interface MenuProps {  
  items: MenuItem[];  
}  
  
const MenuComponent: React.FC<MenuProps> = ({ items }) => {  
  // 假设你有一个已有的函数或组件，这里我们模拟一个函数  
  const handleLianHuoDanClick = () => {  
    // 这里可以调用已有的组件或执行任何逻辑  
    console.log('练货单被点击了');  
    // 例如，你可以控制一个状态来显示Popup组件  
  };  
  
  // 你可以在这里预处理items，为特定的项添加事件处理函数，但通常直接在渲染时处理更简单  
  
  return (  
    <div>  
      {items.map(item => (  
        <div key={item.key} onClick={item.onClick}>  
          {item.label}  
        </div>  
      ))}  
      {/* 如果有需要，你可以在这里根据状态渲染Popup组件 */}  
    </div>  
  );  
};  



export default function CustomerManagement() {

  const navigate = useNavigate();

  const controlsItems: MenuProps['items'] = [
    {
      label: <Flex align='center' gap={8}>
        <img style={{ width: '20px', height: '20px' }} src="/images/icons/smartPush.svg" />
        <span>使用 Smartpush 进行邮件营销</span>
      </Flex>,
      key: '1',
    },
    {
      label: <Flex align='center' gap={8}>
        <img style={{ width: '20px', height: '20px' }} src="/images/icons/invite-customer.svg" />
        <span>向客户发送账号激活邀请邮件</span>
      </Flex>,
      key: '2',
    },
    {
      label: <Flex align='center' gap={8}>
        <img style={{ width: '20px', height: '20px' }} src="/images/icons/promo-code.svg" />
        <span>为客户提供折扣码</span>
      </Flex>,
      key: '3',
    },
    {
      label: <Flex align='center' gap={8}>
        <img style={{ width: '20px', height: '20px' }} src="/images/icons/auto-coupon.svg" />
        <span>为客户提供自动折扣</span>
      </Flex>,
      key: '4',
    }
  ];

  const [modal, contextHolder] = Modal.useModal();

  // 
  const confirmExcel = () => {
    modal.confirm({
        width:620,
        title: '导入客户',
        icon: <></>,
        centered:true,
        destroyOnClose:true,
        content: <>
            <div style={{margin:"8px 0px"}}>下载<a style={{margin:"0 8px"}}>批量导入模板</a>以查看所需格式的示例。若表格导入出现问题，可查看<a style={{margin:"0 8px"}}>常见问题</a></div>
            <div>
                <UploadImportDrag size={10} />
            </div>
            <div style={{margin:"8px 0px"}}>支持 .xlsx，.xls，.csv 格式文件，大小不能超过10M</div>
            <div style={{margin:"8px 0px"}}>
                <Checkbox>覆盖拥有相同邮箱或电话的现有客户</Checkbox>
                {/* <span></span> */}
            </div>
        </>,
        okText: '上传并导入',
        cancelText: '取消',
    });
  };

  const confirmShopify = () => {
      modal.confirm({
        title: '通过Shopify csv批量导入客户',
        width:620,
        centered:true,
        icon: <></>,
        content: <>
              <div style={{margin:"8px 0px"}}>下载<a style={{margin:"0 8px"}}>批量导入模板</a>以查看所需格式的示例。若表格导入出现问题，可查看<a style={{margin:"0 8px"}}>常见问题</a></div>
              <div>
                  <UploadImportDrag size={10} />
              </div>
              <div style={{margin:"8px 0px"}}>支持 .xlsx，.xls，.csv 格式文件，大小不能超过10M</div>
              <div style={{margin:"8px 0px"}}>
                  <Checkbox>覆盖拥有相同邮箱或电话的现有客户</Checkbox>
                  {/* <span></span> */}
              </div>
          </>,
        okText: '上传并导入',
        cancelText: '取消',
      });
  };

  const confirmStoreRelocation = () => {
      modal.confirm({
        title: '店铺搬迁',
        centered:true,
        icon: <></>,
        content: '暂不支持',
        okText: '确认',
        cancelText: '取消',
      });
  };

  const aItems: MenuProps['items'] = [
    {
      key: '1',
      label:<div onClick={confirmExcel}>本地导入</div>,

    },
    {
      key: '2',
      label: "shopify表格导入",
    },
    {
      key: '3',
      label: "店铺搬迁导入",
    }
  ];


  return (
    <Scoped>
      <div className='create-warp-flex' style={{
        width: "100%"
      }}>
        <div className="create-warp">
          <div className='create-title'>
            <Flex className='create-title-left' align='center'>
              <h3>客户</h3>
              <Flex>
                <Dropdown menu={{ items: aItems }} trigger={['click']}>
                  <Flex className='cursor-pointer'>
                    <div style={{marginRight:"8px"}}><ImportOutlined /></div>
                    <Space>
                      导入
                    </Space>
                    <UnfoldIcon />
                  </Flex>
                </Dropdown>
                <Flex style={{marginLeft:"12px"}} className='cursor-pointer' onClick={()=>{}}>
                    <div style={{marginRight:"8px"}}><ExportOutlined /></div>
                    <div>导出</div>
                </Flex>
              </Flex>
            </Flex>
            <Flex gap={12}>
              <ButtonDropdown menu={{items:controlsItems}} placement="bottomRight" text="其它操作" />
              <PrimaryButton text="添加客户" onClick={()=>navigate(`/customer/management/operate/add`)} />
            </Flex>
          </div>
          <ScreeningConditionCard />
          <div style={{height:"20px"}}></div>
          <CustmoerListCard/>
        </div>
      </div>
      {/* Excel批量导入 */}
      {contextHolder}
    </Scoped>
  )

}

const Scoped = styled.div`
  .create-warp-flex {
    width: 80%;
    display: flex;
    justify-content: center;
    color: #474f5e;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  
    .create-warp {
      width: 80%;
      min-width: 500px;
      .create-title {
        color: #474f5e;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin-bottom: 20px;
        .create-title-left{
          h3 {
            color: #242833;
            font-size: 24px;
            font-weight: 600;
            margin:0;
            margin-right: 16px;
          }
        }
        .button-container {
          display: inline-block;
          justify-content: space-between;
        }
      }
    }
  }
`
















