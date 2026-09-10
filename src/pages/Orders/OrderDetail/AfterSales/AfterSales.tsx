import { ArrowLeftOutlined } from '@ant-design/icons';
import { App, Flex, Form } from 'antd';
import styled from 'styled-components';
import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import PrimaryButton from '@/components/Button/PrimaryButton';
import ReturnDetails from './ReturnDetails';
import ReturnInformation from './ReturnInformation';
import { setOrderReturned } from '@/services/y2/api';
import { getOrderDetail } from '@/services/y2/apiStore';
import { history, useParams } from '@umijs/max';
import orderAfterSales from '@/store/order/orderAfterSales';
import AfterSalesGoods from './AfterSalesGoods';

function AfterSales() {

    const { message } = App.useApp();

    const [loading,setLoading] = useState(false)

    const [isSkeleton,setIsSkeleton] = useState(true)

    const { orderId="",languagesId="" } = useParams();

    const [form] = Form.useForm();

    // 验证通过 -- 
    const submit = async () => {
      // if(orderReturnGoods.returnGoodsInfo.returnedGoodsNum > 0){
      //   setLoading(true)
      //   let newReturnProducts:any[] = [];
      //   orderReturnGoods.shippedProductGroup.forEach((item:any)=>{
      //     console.log(item)
      //     item.product?.forEach((product:any)=>{
      //       if(product.num>0){
      //         newReturnProducts.push({
      //           ordersProductId:product.id,
      //           quantityReturned:product.num,
      //           opened:product.opened,
      //           returnActionId:product.returnActionId,
      //           returnReasonId:product.returnReasonId,
      //           returnReason:product.returnReason,
      //           shipmentId:item.shipment.shipment_id,
      //         })
      //       }
      //     })
      //   })
      //   let res = {
      //     orderId:orderReturnGoods.orderInfo.order_id,
      //     customerId:orderReturnGoods.orderInfo.customer_id,
      //     comment:"",
      //     firstname:orderReturnGoods.orderInfo.customer_firstname,
      //     lastname:orderReturnGoods.orderInfo.customer_lastname,
      //     email:orderReturnGoods.orderInfo.customer_email_address,
      //     telephone:orderReturnGoods.orderInfo.customer_telephone,
      //     shippingNo:orderReturnGoods.returnGoodsInfo.shippingNo,
      //     shippingId:orderReturnGoods.returnGoodsInfo.shippingId,
      //     shippingName:"",
      //     returnProducts:JSON.stringify(newReturnProducts),
      //     returnStatusId:"1"
      //   }
      //   setOrderReturned(res).then(res=>{
      //     navigate(`/orders/${orderId}`)
      //   }).catch(err=>{
      //     console.log(err)
      //   }).finally(()=>{
      //     setLoading(false)
      //   })
      // }else{
      //   message.error("请至少退一件商品")
      // }
    }

    useEffect(() => {
      getOrderDetail({order_id:orderId,languages_id:languagesId}).then(res=>{
        orderAfterSales.setOrderInfo(res.data || {})
        orderAfterSales.setOrdersPackageList(res.data?.ordersPackageList || [])
      }).catch(err=>{
        console.log(err);
      }).finally(()=>{
        setIsSkeleton(false)
      })

      // getReturnReasons("1").then(res=>{
      //   console.log(res)

      // })
      // getReturnActions("1").then(res=>{
      //   console.log(res)
      // })
      // getReturnStatuses("1").then(res=>{
      //   console.log(res)
      // })

    },[]);

    return (
        <>
            {isSkeleton?<SkeletonCard />:<Scoped>
            <div className="mc-layout">
                <div className='mc-layout-warp'>
                    <div className="mc-header">
                      <div className="mc-header-left">
                          <div className="mc-header-left-secondary" onClick={()=>history.push(`/orders/${orderId}/${languagesId}`)}>
                          <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                          </div>
                          <div className="mc-header-left-content">
                          <Flex style={{fontSize: '20px'}} gap={12} align='center'>
                              <div className='font-w-600'>退货</div>
                          </Flex>
                          </div>
                      </div>
                    </div>
                    <Flex gap={20}>
                    <Flex className='mc-layout-content' vertical gap={20}>
                      {orderAfterSales.ordersPackageList.map((item,index)=>{
                        return <AfterSalesGoods groupIndex={index} />
                      })}
                      {/* <ReturnInformation form={form} /> */}
                    </Flex>
                    <Flex className='mc-layout-extra' vertical gap={20}>
                      {/* <ReturnDetails /> */}
                    </Flex>
                    </Flex>
                    <Divider />
                    <Flex className='mc-footer' justify='flex-end'>
                      <PrimaryButton text="保存" loading={loading} onClick={submit} />
                    </Flex>
                </div>
            </div>
            </Scoped>}
        </>
    );
}

export default observer(AfterSales);

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

