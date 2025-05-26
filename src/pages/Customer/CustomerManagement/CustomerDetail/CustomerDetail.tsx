
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Flex, Form, Input, MenuProps, Tooltip } from 'antd';
import styled from 'styled-components';
import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { getCustomer, getOrderDetail } from '@/services/y2/api';
import orderReturnGoods from '@/store/order/orderReturnGoods';
import { useParams,useNavigate } from 'react-router-dom';
import DefaultButton from '@/components/Button/DefaultButton';
import ButtonIcon from '@/components/Button/ButtonSvg';
import { LeftIcon, RightIcon } from '@/components/Icons/Icons';
import ButtonDropdown from '@/components/Dropdown/ButtonDropdown';
import MyButton from '@/components/Button/MyButton';
import CustomerHeader from './CustomerHeader';
import OrderStatistics from './OrderStatistics';
import RecentOrderList from './RecentOrderList';
import TimeLine from './TimeLine';
import Label from './Label';
import Remarks from './Remarks';
import TaxExemptionManagement from './TaxExemptionManagement';
import Subscribe from './Subscribe';
import DangerButton from '@/components/Button/DangerButton';
import CustomerAddress from './CustomerAddress';
import CustomerInfo from './CustomerInfo';

function CustomerDetail() {


    const [customer,setCustomer] = useState({});

    const controlsItems: MenuProps['items'] = [
        {
          label: <div>合并客户</div>,
          key: '1',
        },
        {
          label: <div className='color-F86140'>删除个人数据</div>,
          key: '2',
        },
        {
          label: <div className='color-F86140'>删除客户</div>,
          key: '3',
        },
    ];

    const [loading,setLoading] = useState(false);

    const [isSkeleton,setIsSkeleton] = useState(false);

    const { customerId } = useParams();

    const navigate = useNavigate();

    const [form] = Form.useForm();

    // 表单验证
    const formValidation = ()=>{
      
    }

    // 验证通过 -- 
    const submit = async () => {
        
    }

    useEffect(() => {
        getCustomer().then(res=>{
        if(res.data){
          // 格式
          setCustomer(res.data)
        }
      }).catch(err=>{
        console.log(err);
      }).finally(()=>{
        setIsSkeleton(false)
      })
    },[]);

    return (
        <>
            {isSkeleton?<SkeletonCard />:<Scoped>
            <div className="mc-layout">
                <div className='mc-layout-warp'>
                    <div className="mc-header">
                    <div className="mc-header-left">
                        <div className="mc-header-left-secondary" onClick={() => {
                          navigate(`/customer/management`)
                        }}>
                        <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                        </div>
                        <div className="mc-header-left-content">
                            <Flex style={{fontSize: '20px'}} gap={12} align='center'>
                                <div className='font-w-600'>{customer.name}</div>
                            </Flex>
                        </div>
                    </div>
                    <Flex className='mc-header-right' gap={12} align='center'>
                        <MyButton style={{height:"36px"}} text="会员系统" icon={<img style={{height:"16px"}} src="https://cdn.myshopline.cn/sl/admin/ec2-admin-customer/20250515155818768/imgs/member-system.394a7.svg" />} />
                        <ButtonDropdown items={controlsItems} text="其它操作" />
                        <PrimaryButton text={"发送邀请"} />
                        <ButtonIcon icon={<LeftIcon className='font-20' />} onClick={()=>{
                        }} />
                        <ButtonIcon icon={<RightIcon className='font-20' />} onClick={()=>{
                        }} />
                    </Flex>
                    </div>
                    <Flex gap={20}>
                    <Flex className='mc-layout-content' vertical gap={20}>
                        <CustomerHeader />
                        <OrderStatistics />
                        <RecentOrderList />
                        <TimeLine />
                    </Flex>
                    <Flex className='mc-layout-extra' vertical gap={20}>
                      <CustomerInfo />
                      <CustomerAddress />
                      <Subscribe />
                      <TaxExemptionManagement />
                      <Label />
                      <Remarks />
                    </Flex>
                    </Flex>
                    <Divider />
                    <Flex className='mc-footer'>
                      <DangerButton text="删除客户" loading={loading} onClick={submit} />
                    </Flex>
                </div>
            </div>
            </Scoped>}
        </>
        
    );
}

export default observer(CustomerDetail);

const Scoped = styled.div`
  .mc-layout {
    width: 100%;
    max-width: max(75%,1200px);
    margin: auto;
    display: flex;
    justify-content: center;
    color: #474f5e;
    font-size: 16px;
    line-height: 20px;
      .mc-layout-warp{
        width: 100%;
        min-width: 500px;
        .mc-header {
          margin-bottom: 20px;
          color: #474f5e;
          font-size: 14px;
          line-height: 20px;
          display: flex;
          justify-content: space-between;
          align-content: center;
          &-left {
              display: flex;
              flex-direction: row;
              align-items: center;
              &-secondary {
                  height: 32px;
                  width: 32px;
                  border: #d7dbe7 1px solid;
                  border-radius: 4px;
                  display: flex;
                  justify-content: center;
                  align-content: center;
                  &:hover{
                      background-color:  #eaf0ff;
                      cursor: pointer;
                  }
                  &-icon {
                      font-size: 18px;
                  }
              }
  
              &-content {
                  margin-left: 12px;
                  font-size: 20px;
              }
          }
          &-right {
            margin-top: 24px;
          }
        }
        .mc-footer{
        }
        .mc-layout-content{
          flex:3
        }
        .mc-layout-extra{
          flex:1;
        }
      }
  }
`

