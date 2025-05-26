import { ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons'
import { Flex, Form, Input, MenuProps, message, Select, TableProps, Tooltip } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import { history, useIntl, useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import UndispatchedGoods from './UndispatchedGoods';
import DeliveryAddress from './DeliveryAddress';
import Abstract from './Abstract';
import PrimaryButton from '@/components/Button/PrimaryButton';
import LogisticsTrackingInformation from './LogisticsTrackingInformation';
import { getOrderDetail, setOrderShipped } from '@/services/y2/api';
import orderDelivery from '@/store/order/orderDelivery';

function ManualDelivery() {

    const intl = useIntl();

    const [loading,setLoading] = useState(false)

    const [isSkeleton,setIsSkeleton] = useState(true)

    const { orderId } = useParams();

    const [form] = Form.useForm();

    // 表单验证
    const formValidation = ()=>{
        return form.validateFields().then(res=>{
            return true
        }).catch(e=>{
            if (e.errorFields.length > 0) {
                form.scrollToField(e.errorFields[0].name[0],{ block:"center" });
            }
            return false
        })
    }

    // 验证通过 -- 
    const submit = async () => {
        if(await formValidation()){
            setLoading(true)
            const ordersProductList = orderDelivery.deliveryProductList.map(item=>{
                return {
                    ordersProductId:item.id,
                    quantityShipped:item.quantity
                }
            })
            setOrderShipped({
                orderId:orderId,
                ordersProductList:JSON.stringify(ordersProductList),
                ...orderDelivery.delivery,
                deliveryAddressId:orderDelivery.deliveryAddress.delivery_address_id,
                deliveryName:orderDelivery.deliveryAddress.delivery_name,
                deliveryFirstname:orderDelivery.deliveryAddress.delivery_firstname,
                deliveryLastname:orderDelivery.deliveryAddress.delivery_lastname,
                deliveryCompany:orderDelivery.deliveryAddress.delivery_company,
                
                deliveryStreetAddress:orderDelivery.deliveryAddress.delivery_street_address,
                deliverySuburb:orderDelivery.deliveryAddress.delivery_suburb,
                deliveryPostcode:orderDelivery.deliveryAddress.delivery_postcode,
                deliveryCity:orderDelivery.deliveryAddress.delivery_city,
                deliveryCityId:orderDelivery.deliveryAddress.delivery_city_id,
                deliveryState:orderDelivery.deliveryAddress.delivery_state,
                deliveryStateId:orderDelivery.deliveryAddress.delivery_state_id,

                deliveryCountry:orderDelivery.deliveryAddress.delivery_country,
                deliveryCountryId:orderDelivery.deliveryAddress.delivery_country_id,

                deliveryCountryCode2:orderDelivery.deliveryAddress.delivery_country_code_2,
                deliveryCountryCode3:orderDelivery.deliveryAddress.delivery_country_code_3,
                deliveryAddressFormatId:orderDelivery.deliveryAddress.delivery_address_format_id,
            }).then(res=>{
                history.push(`/orders/${orderId}`)
            }).catch(err=>{
            }).finally(()=>{
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        // 清空状态
        orderDelivery.reset()
        getOrderDetail(orderId).then(res=>{
            if(res.data && JSON.stringify(res.data) != "[]"){
                orderDelivery.setDeliveryAddress(res.data.order_info)
                const newDeliveryProduct = res.data.order_products.filter((item:any)=>item.remaining_quantity > 0).map((item:any) => ({
                    ...item,
                    quantity: item.remaining_quantity
                }))
                orderDelivery.setDeliveryProductList(newDeliveryProduct)
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
                        history.go(-1)
                        }}>
                        <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                        </div>
                        <div className="mc-header-left-content">
                        <Flex style={{fontSize: '20px'}} gap={12} align='center'>
                            <div className='font-w-600'>手动发货</div>
                        </Flex>
                        </div>
                    </div>
                    </div>
                    <Flex gap={20}>
                        <Flex className='mc-layout-content' vertical gap={20}>
                            <UndispatchedGoods />
                            <LogisticsTrackingInformation form={form} />
                        </Flex>
                        <Flex className='mc-layout-extra' vertical gap={20}>
                            <DeliveryAddress />
                            <Abstract />
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex className='mc-footer' justify='flex-end'>
                        <PrimaryButton text="标记为已发货" loading={loading} onClick={submit} />
                    </Flex>
                </div>
            </div>
            </Scoped>}
        </>
        
    );
}

export default observer(ManualDelivery);

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

