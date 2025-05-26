import { ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons'
import { Flex, Form, Input, MenuProps, message, Select, TableProps, Tooltip } from 'antd'
import styled from 'styled-components';
import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useParams,useNavigate } from 'react-router-dom';
import { getOrderDetail } from '@/services/y2/api';
import orderProductEdit from '@/store/order/orderProductEdit';
import ShippedCard from './ShippedCard';
import RemainingCard from './RemainingCard';
import BillDetails from './BillDetails';
import Notice from './Notice';

function EditProduct() {

    const [loading,setLoading] = useState(false);

    const [isSkeleton,setIsSkeleton] = useState(true);

    const { orderId } = useParams();

    const navigate = useNavigate();

    const [form] = Form.useForm();

    // 表单验证
    const formValidation = ()=>{
      
    }

    // 验证通过 -- 
    const submit = async () => {
        
    }

    useEffect(() => {
        // 清空状态
          getOrderDetail(orderId??"").then(res=>{
            if(res.data && JSON.stringify(res.data) != "[]"){
              // 未发货商品
              const remainingProductObj = res.data.order_products.filter((item: any) => parseInt(item.remaining_quantity) > 0).reduce((acc: any, item: any) => {
                const groupId = item.group_id;
                if (!acc[groupId]) {
                  acc[groupId] = [];
                }
                acc[groupId].push({...item,num:item.remaining_quantity});
                return acc;
              }, {});
              let remainingList:any = []
              for(let i in remainingProductObj){
                let count = 0
                remainingProductObj[i].forEach((item:any)=>{
                  count += item.remaining_quantity
                })
                remainingList.push({
                  product:remainingProductObj[i],
                  shipment:{
                    remaining_quantity_count:count
                  }
                })
              }
              orderProductEdit.setRemainingProductGroup(remainingList)
              // 已发货商品
              orderProductEdit.setShippedProductGroup(res.data.shipped_list || [])

              orderProductEdit.setOrderInfo(res.data.order_info || {})
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
                          navigate("/orders/"+orderId)
                        }}>
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
                      {orderProductEdit.remainingProductGroup.map((item,index)=>{
                        return(
                          <RemainingCard groupIndex={index} />
                        )
                      })}
                      {/* 已发货 */}
                      {orderProductEdit.shippedProductGroup.map((item:any,index:number)=>{
                        return(
                          <ShippedCard key={index} index={index} />
                        )
                      })}
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

export default observer(EditProduct);

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

