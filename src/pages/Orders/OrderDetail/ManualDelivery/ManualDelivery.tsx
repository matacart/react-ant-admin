import { ArrowLeftOutlined } from '@ant-design/icons'
import { App, Flex, Form } from 'antd'
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
import { setOrderShipped } from '@/services/y2/api';
import { getOrderDetail, sendOrderPackage } from '@/services/y2/apiStore';
import orderManualDelivery from '@/store/order/orderManualDelivery';
import { FulfillmentItemType, FulfillmentListType } from '@/store/order/order';

export interface ProductInfo{
    groupId:string,
    parentSkuId:string,
    productNum:number,
    productSeq:string,
    productSku:string,
    productSource:string,
    version:string,
}


// const temp = {
//                 languageId:languagesId,
//                 orderSeq:orderManualDelivery.orderInfo.orderSeq,
//                 fulfillmentOrderSeq:orderManualDelivery.fulfillmentItem.fulfillmentOrder.fulfillmentOrderSeq,
//                 logisticsType:"2",
//                 multiExpressInfo:JSON.stringify(res.multiExpressInfo),
//                 sendNotify:res.sendNotify,
//                 senderInfo:JSON.stringify({consigneeIdNo: null, consigneeIdType: null}),
//                 extInfo:{},
//                 productInfoList:JSON.stringify(productInfoList),
//             }


function ManualDelivery() {

    const intl = useIntl();

    const { message } = App.useApp();

    const [loading,setLoading] = useState(false)

    const [isSkeleton,setIsSkeleton] = useState(true)

    const { orderId="",fulfillmentId="",languagesId="" } = useParams();

    const [form] = Form.useForm();

    // 验证通过 -- 
    const submit = async () => {
        form.validateFields().then(res=>{
            const productInfoList = orderManualDelivery.fulfillmentItem.fulfillmentItemList.map((item:FulfillmentItemType)=>{
                return {
                    groupId:item.groupId,
                    parentSkuId:item.parentSkuId,
                    productNum:item?.productModifyNum || 0,
                    productSeq:item.productSeq,
                    productSku:item.productSku,
                    productSource:item.productSource,
                    version:item.version,
                }
            })
            if(productInfoList.reduce((pre:number,cur:any)=>Number(pre)+Number(cur.productNum),0) <= 0){
                return message.error("发货数量不能为空")
            }
            setLoading(true)
            sendOrderPackage({
                languageId:languagesId,
                orderSeq:orderManualDelivery.orderInfo.orderSeq,
                fulfillmentOrderSeq:orderManualDelivery.fulfillmentItem.fulfillmentOrder.fulfillmentOrderSeq,
                logisticsType:"2",
                multiExpressInfo:JSON.stringify(res.multiExpressInfo),
                sendNotify:res.sendNotify,
                senderInfo:JSON.stringify({consigneeIdNo: null, consigneeIdType: null}),
                extInfo:{},
                productInfoList:JSON.stringify(productInfoList),
            }).then(()=>{
                if(res.code == 0){
                    message.success("发货成功")
                    history.push(`/orders/${orderId}/${languagesId}`)
                }
            }).catch(()=>{
            }).finally(()=>{
                setLoading(false)
            })
        })
        // if(await formValidation()){
        //     setLoading(true)
        //     const ordersProductList = orderDelivery.deliveryProductList.map(item=>{
        //         return {
        //             ordersProductId:item.id,
        //             quantityShipped:item.quantity
        //         }
        //     })

            // setOrderShipped({
            //     orderId:orderId,
            //     groupId:orderDelivery.deliveryProductList[0].group_id,
            //     ordersProductList:JSON.stringify(ordersProductList),
            //     ...orderDelivery.delivery,
            //     deliveryAddressId:orderDelivery.deliveryAddress.delivery_address_id,
            //     deliveryName:orderDelivery.deliveryAddress.delivery_name,
            //     deliveryFirstname:orderDelivery.deliveryAddress.delivery_firstname,
            //     deliveryLastname:orderDelivery.deliveryAddress.delivery_lastname,
            //     deliveryCompany:orderDelivery.deliveryAddress.delivery_company,
            //     deliveryStreetAddress:orderDelivery.deliveryAddress.delivery_street_address,
            //     deliverySuburb:orderDelivery.deliveryAddress.delivery_suburb,
            //     deliveryPostcode:orderDelivery.deliveryAddress.delivery_postcode,
            //     deliveryCity:orderDelivery.deliveryAddress.delivery_city,
            //     deliveryCityId:orderDelivery.deliveryAddress.delivery_city_id,
            //     deliveryState:orderDelivery.deliveryAddress.delivery_state,
            //     deliveryStateId:orderDelivery.deliveryAddress.delivery_state_id,
            //     deliveryCountry:orderDelivery.deliveryAddress.delivery_country,
            //     deliveryCountryId:orderDelivery.deliveryAddress.delivery_country_id,
            //     deliveryCountryCode2:orderDelivery.deliveryAddress.delivery_country_code_2,
            //     deliveryCountryCode3:orderDelivery.deliveryAddress.delivery_country_code_3,
            //     deliveryAddressFormatId:orderDelivery.deliveryAddress.delivery_address_format_id,
            // }).then(res=>{
            //     history.push(`/orders/${orderId}`)
            // }).catch(err=>{
            // }).finally(()=>{
            //     setLoading(false)
            // })
        // }
    }

    useEffect(() => {
        getOrderDetail({
            order_id:orderId,
            languages_id:languagesId,
        }).then(res=>{
            if(res.code == 0){
                orderManualDelivery.setOrderInfo(res.data)
                const fulfillmentItem = res.data.fulfillmentOrderList.find((item:any)=>item.fulfillmentOrder?.fulfillmentOrderSeq == fulfillmentId)
                const newFulfillmentItemList = fulfillmentItem.fulfillmentItemList.map((item:FulfillmentItemType)=>{
                    return{
                        ...item,
                        productModifyNum:item.productNum,
                    }
                })
                orderManualDelivery.setFulfillmentItem({
                    ...fulfillmentItem,
                    fulfillmentItemList:newFulfillmentItemList,
                })
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
                            <div className="mc-header-left-secondary" onClick={() => history.push(`/orders/${orderId}/${languagesId}`)}>
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
                            <Abstract form={form} />
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

