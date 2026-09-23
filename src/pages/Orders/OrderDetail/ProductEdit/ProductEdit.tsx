import { ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons'
import { Flex, Form } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { editOrderProducts } from '@/services/y2/api';
import { getOrderDetail } from '@/services/y2/apiStore';
import orderProductEdit from '@/store/order/orderProductEdit';
import ShippedCard from './ShippedCard';
import BillDetails from './BillDetails';
import Notice from './Notice';
import { useSleep } from '@/hooks/customHooks';
import { history, useParams } from '@umijs/max';
import { FulfillmentItemType, FulfillmentListType } from '@/store/order/order';
import NotShipped from './NotShipped';

function ProductEdit() {

    const [loading,setLoading] = useState(false);

    const [isSkeleton,setIsSkeleton] = useState(true);

    const { orderId="",languagesId="" } = useParams();

    // 表单验证
    const formValidation = ()=>{
      
    }

    // 验证通过 -- 
    const submit = async () => {
      // 数量/则扣
      // const res = {
      //   orderId:orderProductEdit.orderInfo.order_id,
      //   products:JSON.stringify(orderProductEdit.remainingProductGroup[0].product),
      //   // products:orderProductEdit.remainingProductGroup[0].product,
      //   deleteProductIds:JSON.stringify(orderProductEdit.deleteProductIds),
      //   sendPaymentEmail:orderProductEdit.billNotification
      // }
      // setLoading(true)
      // editOrderProducts(res).then(async res=>{
      //   await sleep(1000)
      //   navigate(`/orders/${orderId}`)
      // }).catch(err=>{
      //   console.log(err)
      // }).finally(()=>{
      //   setLoading(false)
      // })
    }

    useEffect(() => {
      getOrderDetail({
        order_id:orderId,
        languages_id:languagesId,
      }).then(res=>{
        if(res.code == 0){
          orderProductEdit.setOrderInfo(res.data)
          const fulfillmentItemList = (res.data?.fulfillmentOrderList || []).map((item:FulfillmentListType)=>item.fulfillmentItemList || []).flat();
          orderProductEdit.setFulfillmentItemList(fulfillmentItemList)
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
                        <div className='font-w-600'>编辑商品</div>
                      </Flex>
                      </div>
                    </div>
                    </div>
                    <Flex gap={20}>
                      <Flex className='mc-layout-content' vertical gap={20}>
                        {/* 未发货 */}
                        <NotShipped />
                      </Flex>
                      <Flex className='mc-layout-extra' vertical gap={20}>
                        <BillDetails />
                        <Notice />
                      </Flex>
                    </Flex>
                    <Divider />
                    <Flex className='mc-footer' justify='flex-end'>
                      <PrimaryButton text="更新订单" loading={loading} onClick={submit} />
                    </Flex>
                </div>
            </div>
          </Scoped>}
        </>
        
    );
}

export default observer(ProductEdit);

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

