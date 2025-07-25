import { ArrowLeftOutlined } from '@ant-design/icons'
import styled from 'styled-components';
import { Divider, message } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import CustomInformationEdit from '../CustomInformationEdit';
import DraftPaidCard from '../DraftPaidCard';
import MaketCard from '../MaketCard';
import OrderDraftLabel from '../OrderDraftLabel';
import OrderNotesLable from '../OrderNotesLable';
import { observer } from 'mobx-react-lite';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import orderDraft from '@/store/order/orderDraft';
import { addDraftOrder, editDraftOrder } from '@/services/y2/api';
import AddProductCard from '../AddProductCard';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import Overlay from '@/components/Overlay/Overlay';
import { convertFlatToNested } from '../ProductTableModal';

  
function OrderDraftAdd() {

    const [loading, setLoading] = useState(false);
    
    // 提示
    const [isOverlay,setIsOverlay] = useState(false)

    // 验证提示
    const [isAlert,setIsAlert] = useState<{isProduct:boolean,isCustomer:boolean} | null>(null);

    // 新增一个ref用于标记是否是初始渲染
    const initialRender = useRef(true);

    const [isSkeleton,setIsSkeleton] = useState(true);

    const navigate = useNavigate(); // 使用 useNavigate 钩子
   
    const handleCreateOrder = async () => {
        console.log({
            order_info:orderDraft.orderInfo,
            order_products: orderDraft.productInfo,
            customer_info: orderDraft.customerInfo,
            receiverInfo: orderDraft.receiverInfo,
            payBillInfo: orderDraft.payBillInfo,
        })
    };

    // 保存
    const submit = ()=>{
        // 将扁平化数据转为原数据结构
        const productInfo = convertFlatToNested(orderDraft.productInfo);
        if(orderDraft.customerInfo && orderDraft.productInfo?.length>0){
            setIsAlert(null)
            setLoading(true)
            addDraftOrder({
                is_draft:true,
                orderInfo:JSON.stringify(orderDraft.orderInfo),
                products:JSON.stringify(productInfo),
                customerInfo:JSON.stringify(orderDraft.customerInfo),
                receiverInfo: JSON.stringify(orderDraft.receiverInfo),
                payBillInfo: JSON.stringify(orderDraft.payBillInfo)
            }).then(res=>{
                setIsOverlay(false)
                message.success('您的新建内容已添加成功')
                navigate('/orders/draftOrders')
            }).catch(err=>{

            }).finally(()=>{
                setLoading(false)
            })
        }else{
            setIsAlert({
                isProduct:orderDraft.productInfo?.length>0 ? true : false,
                isCustomer:orderDraft.customerInfo ? true : false
            })
        }
    }

    useEffect(()=>{
        const init = async () => {
            await orderDraft.reset()
            setIsSkeleton(false)
        }
        init()
    },[])

    useMemo(()=>{
        if(initialRender.current) {
            initialRender.current = false;
            return;
        }
        if(!isSkeleton && !initialRender.current){
            setIsOverlay(true)
        }
    },[orderDraft.productInfo,orderDraft.customerInfo,orderDraft.payBillInfo,orderDraft.receiverInfo])

    // addDraftOrder

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.go(-1)
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">创建订单</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <AddProductCard />
                            <DraftPaidCard />
                        </div>
                        <div className='mc-layout-extra'>
                            <CustomInformationEdit/>
                            <MaketCard/>
                            <OrderNotesLable/>
                            <OrderDraftLabel/>
                        </div>
                    </div>
                    <Divider/>
                    <div className='mc-footer'>
                        <PrimaryButton text="创建订单" loading={loading} onClick={handleCreateOrder} />
                    </div>
                </div>
            </div>}
            {isOverlay && <Overlay status={loading} okText="保存" onExit={()=>{
                navigate(`/orders/draftOrders`)
            }} onSubmit={submit} />}
        </Scoped>
    )
}

export default observer(OrderDraftAdd);

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: max(75%,1200px);
        margin: '0 auto';
        .mc-header {
            color: rgb(36, 40, 51);
            font-size: 30px;
            height: 42px;
            font-weight: bold;
            margin: 8px 0px 24px;
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
            
        }

        &-main {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }

        &-content {
            flex: 8;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px
        }

        &-extra {
            flex:1;
            min-width: 285px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .ant {
                &-card {
                    background-color: #f7f8fb;
                }
            }
        }
        .mc-footer{
            display:flex;
            flex-direction: row-reverse;
        }
    }
}
`
