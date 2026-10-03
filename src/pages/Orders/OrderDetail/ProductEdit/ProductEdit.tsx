import { ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons'
import { Card, Flex, Form, message } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { getOrderDetail, previewOrderProducts, updateOrderProducts } from '@/services/y2/apiOrders';
import orderProductEdit from '@/store/order/orderProductEdit';
import BillDetails from './BillDetails';
import Notice from './Notice';
import { history, useParams } from '@umijs/max';
import { FulfillmentItemType, FulfillmentListType } from '@/store/order/order';
import NotShipped from './NotShipped';
import { toJS } from 'mobx';

function ProductEdit() {

    const [loading,setLoading] = useState(false);

    const [isSkeleton,setIsSkeleton] = useState(true);

    const { orderId="",languagesId="" } = useParams();

    // 验证通过 -- 
    const submit = async () => {
      const selectedProducts = toJS(orderProductEdit.fulfillmentItemList).map((item:FulfillmentItemType)=>{
          return {
              customBusinessFlagInfo:item?.businessFlagInfo || null,
              groupId:item?.groupId || "",
              fulfillmentOrderSeq:item?.fulfillmentOrderSeq || "",
              productSource:item?.productSource || "",
              version:item?.version || "",
              productSeq:item?.productSeq || "",
              productSku:item?.productSku || "",
              productPrice:item?.productPrice || 0,
              productNum:item?.productNum || 1,
              manualDiscount:{
                discountDesc:item.manualDiscountInfo?.discountDesc || "",
                discountType:item.manualDiscountInfo?.discountType || "",
                discountValue:item.manualDiscountInfo?.settleDiscountValue || 0,
              },
          }
      })
      setLoading(true);
      updateOrderProducts({
        languages_id:orderProductEdit.languages,
        orderSeq:orderProductEdit.orderInfo?.orderSeq || "",
        mainOrderSeq:orderProductEdit.orderInfo?.mainOrderSeq || "",
        sendEmail:false,
        sendPaymentEmail:orderProductEdit.sendPaymentEmail,
        productInfoList:JSON.stringify(selectedProducts),
      }).then(res=>{
        message.success("更新成功");
      }).catch(err=>{
      }).finally(()=>{
        setLoading(false);
      })
    }

    useEffect(() => {
      getOrderDetail({
        order_id:orderId,
        languages_id:languagesId,
      }).then(res=>{
        orderProductEdit.setLanguages(languagesId);
        orderProductEdit.setOrderInfo(res.data);
        const fulfillmentItemList = (res.data?.fulfillmentOrderList || []).map((item:FulfillmentListType)=>item.fulfillmentItemList || []).flat();
        orderProductEdit.setFulfillmentItemList(fulfillmentItemList);
      }).catch(err=>{
        console.log(err);
      }).finally(()=>{
        setIsSkeleton(false)
      })
      return ()=>{
        orderProductEdit.reset();
      }
    },[]);
    
    // 自动计价处理
    useEffect(()=>{
      // 首屏未加载完，不执行更新
      if(isSkeleton) return;
      const selectedProducts = toJS(orderProductEdit.fulfillmentItemList).map((item:FulfillmentItemType)=>{
          return {
              customBusinessFlagInfo:item?.businessFlagInfo || null,
              groupId:item?.groupId || "",
              productSource:item?.productSource || "",
              version:item?.version || "",
              productSeq:item?.productSeq || "",
              productSku:item?.productSku || "",
              productPrice:item?.productPrice || 0,
              productNum:item?.productNum || 1,
              manualDiscount:{
                discountDesc:item.manualDiscountInfo?.discountDesc || "",
                discountType:item.manualDiscountInfo?.discountType || "",
                discountValue:item.manualDiscountInfo?.settleDiscountValue || 0,
              },
          }
      })
      setLoading(true);
      previewOrderProducts({
        languages_id:orderProductEdit.languages,
        orderSeq:orderProductEdit.orderInfo?.orderSeq || "",
        mainOrderSeq:orderProductEdit.orderInfo?.mainOrderSeq || "",
        productInfoList:JSON.stringify(selectedProducts),
      }).then((res)=>{
        orderProductEdit.setBillDetails({
          totalAmount:res.data?.totalAmount || 0,
          paidAmount:res.data?.paidAmount || 0,
          unpaidAmount:res.data?.unpaidAmount || 0,  
          status:"success",
        });
      }).catch(()=>{
        orderProductEdit.setBillDetails({
          totalAmount:0,
          paidAmount:0,
          unpaidAmount:0,
          status:"error",
        });
      }).finally(()=>{
          setLoading(false);
      });
    },[orderProductEdit.fulfillmentItemList])

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
                        {orderProductEdit.billDetails?.status == "success"?<>
                          <BillDetails />
                          <Notice />
                        </>:orderProductEdit.billDetails?.status == "error"?<>
                          <Card title="编辑商品摘要">
                            <div className='color-7A8499'>金额计算失败,重试</div>
                          </Card>
                        </>:<>
                          <Card title="编辑商品摘要">
                            <div className='color-7A8499'>暂未进行任何更改</div>
                          </Card>
                        </>}
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

