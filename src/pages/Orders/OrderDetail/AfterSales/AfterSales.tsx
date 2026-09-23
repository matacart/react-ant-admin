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
import { createReturnOrder, getOrderDetail, getReturnReasonList } from '@/services/y2/apiStore';
import { history, useParams } from '@umijs/max';
import orderAfterSales from '@/store/order/orderAfterSales';
import AfterSalesGoods from './AfterSalesGoods';
import { FulfillmentItemType, ItemGroupType, OrdersPackageType, ReturnReasonType } from '@/store/order/order';

function AfterSales() {

    const { message } = App.useApp();

    const [loading,setLoading] = useState(false)

    const [isSkeleton,setIsSkeleton] = useState(true)

    const { orderId="",languagesId="" } = useParams();

    const [form] = Form.useForm();

    const [returnReasonList,setReturnReasonList] = useState<ReturnReasonType[]>([]);

    // 验证通过 -- 
    const submit = async () => {
      if(orderAfterSales.returnedProductNum === 0){
        message.error("退货商品不能为空")
        return
      }
      const values = form.getFieldsValue(true);
      setLoading(true);
      createReturnOrder({
        ...values,
        skuInfos:JSON.stringify(values.skuInfos.flat()),
        languages_id:languagesId,
        fromType:"2",
        orderSeq:orderId,
        storeId:values.storeId,
      }).then((res)=>{
        res.code == 0 && history.push(`/orders/${orderId}/${languagesId}`)
      }).catch(()=>{
        message.error("退货失败")
      }).finally(()=>{
        setLoading(false)
      })
    }

    useEffect(() => {
      getOrderDetail({order_id:orderId,languages_id:languagesId}).then(res=>{
        orderAfterSales.setOrderInfo(res.data || {})
        const newOrdersPackageList = res.data?.ordersPackageList.map((item:OrdersPackageType)=>{
          return{
            ...item,
            itemGroupList:item.itemGroupList.map((item:ItemGroupType)=>{
              return{
                ...item,
                itemList:item.itemList.map((item:FulfillmentItemType)=>{
                  return{
                    ...item,
                    productModifyNum:0,
                  }
                })
              }
            })
          }
        })
        orderAfterSales.setOrdersPackageList(newOrdersPackageList || [])
      }).catch(err=>{
        console.log(err);
      }).finally(()=>{
        setIsSkeleton(false)
      })
      // 获取退货原因
      getReturnReasonList(languagesId).then(res=>{
        setReturnReasonList(res.data || [])
      }).catch((e)=>{
        message.error('err')
      })
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
                          return <AfterSalesGoods key={index} groupIndex={index} returnReasonList={returnReasonList} form={form} />
                        })}
                        <ReturnInformation form={form} />
                      </Flex>
                      <Flex className='mc-layout-extra' vertical gap={20}>
                        <ReturnDetails form={form} />
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

