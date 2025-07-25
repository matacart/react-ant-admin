import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components';
import { Divider, Flex, message, Spin } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import CustomInformationEdit from '../CustomInformationEdit';
import DraftPaidCard from '../DraftPaidCard';
import { observer } from 'mobx-react-lite';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import { delDraftOrder, editDraftOrder, getDraftDetail } from '@/services/y2/api';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import DangerButton from '@/components/Button/DangerButton';
import orderDraft from '@/store/order/orderDraft';
import AddProductCard from '../AddProductCard';
import DefaultButton from '@/components/Button/DefaultButton';
import ButtonIcon from '@/components/Button/ButtonSvg';
import { LeftIcon, RightIcon, WarningIcon } from '@/components/Icons/Icons';
import MaketCard from '../MaketCard';
import OrderNotesLable from '../OrderNotesLable';
import OrderDraftLabel from '../OrderDraftLabel';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import DeleteModal from '@/components/Modal/DeleteModal';
import Overlay from '@/components/Overlay/Overlay';
import MyAlert from '@/components/Alert/MyAlert';
import { convertFlatToNested } from '../ProductTableModal';

  
function OrderDraftEdit() {

    const navigate= useNavigate();

    const { draftOrderId } = useParams<{draftOrderId:string}>();

    const [isSkeleton,setIsSkeleton] = useState<boolean>(true);

    // 新增一个ref用于标记是否是初始渲染
    const initialRender = useRef(true);

    const [spinning,setSpinning] = useState(false);

    // 提示
    const [isOverlay,setIsOverlay] = useState(false)

    const [loading, setLoading] = useState(false);
    const [delLoading, setDelLoading] = useState(false);

    // 验证提示
    const [isAlert,setIsAlert] = useState<{isProduct:boolean,isCustomer:boolean} | null>(null);

    // 保存
    const submit = ()=>{
        const productInfo = convertFlatToNested(orderDraft.productInfo);
        console.log(productInfo)
        if(orderDraft.customerInfo && orderDraft.productInfo?.length>0){
            setIsAlert(null)
            setLoading(true)
            console.log(orderDraft.orderInfo)
            editDraftOrder({
                draft_id :orderDraft.orderInfo.id,
                orderInfo:JSON.stringify(orderDraft.orderInfo),
                products:JSON.stringify(productInfo),
                customerInfo:JSON.stringify(orderDraft.customerInfo),
                receiverInfo: JSON.stringify(orderDraft.receiverInfo),
                payBillInfo: JSON.stringify(orderDraft.payBillInfo)
            }).then(res=>{
                setIsOverlay(false)
                message.success('修改内容已更新')
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

    const fetchDraftDetail = ()=>{
        setSpinning(true)
        getDraftDetail(draftOrderId??"").then(res=>{
            orderDraft.setOrderInfo({
                ...res.data.orderInfo,
                isTaxe: 0,
            })
            orderDraft.setNextDraftId(res.data.orderInfo.nextDraftId)
            orderDraft.setPrevDraftId(res.data.orderInfo.prevDraftId)
            orderDraft.setCustomerInfo(res.data.customerInfo??null)
            // 扁平化 -- 数据结构转化
            let newProductList = res.data.products.reduce((acc: any[], item: any) => {
                if (item.variants?.length > 0) {
                    
                    // 如果有variants，为每个variant创建一个独立的商品项
                    const variantItems = item.variants.map(variant => {
                        // 如果没有variants，直接使用原商品
                        let finalAmount = item.specialprice + Number(variant.price);

                        if(variant.product_discount_type == "1"){
                            finalAmount = finalAmount - variant.product_discount_amount
                        }
                        // 百分比折扣
                        if(variant.product_discount_type == "2"){
                            // console.log(product.product_price)
                            finalAmount = finalAmount * (100 - variant.product_discount_amount)/100
                        }

                        return {
                            attributes: item.attributes,
                            variants: [variant],
                            final_price: finalAmount,
                            id: item.id,
                            product_id: item.id,
                            sku_id:variant.id,
                            proudct_imgage: item.product_image,
                            product_model: item.model,
                            product_name: item.title,
                            product_price: item.specialprice,
                            product_cost_price: variant.cost_price,
                            product_quantity: variant.product_quantity || 1,
                            product_source: "1",
                            // 折扣信息
                            product_discount_amount: variant.product_discount_amount || "",
                            product_discount_description: variant.product_discount_description || "",
                            product_discount_type: variant.product_discount_type || "",
                            product_discount_type_from: null,
                        };
                    });
                    return [...acc, ...variantItems];
                } else {
                    // 如果没有variants，直接使用原商品
                    let finalAmount = item.specialprice;

                    if(item.product_discount_type == "1"){
                        finalAmount = finalAmount - item.product_discount_amount
                    }
                    // 百分比折扣
                    if(item.product_discount_type == "2"){
                        // console.log(product.product_price)
                        finalAmount = finalAmount * (100 - item.product_discount_amount)/100
                    }

                    return [...acc, {
                        attributes: item.attributes,
                        variants: item.variants,
                        final_price:finalAmount,
                        id: item.id,
                        sku_id: item.id,
                        product_id: item.id,
                        proudct_imgage: item.product_image,
                        product_model: item.model,
                        product_name: item.title,
                        product_price: item.specialprice,
                        product_cost_price: item.cost_price,
                        product_source: "1",
                        product_quantity: item.product_quantity || 1,
                        // 折扣信息
                        product_discount_amount: item.product_discount_amount || "",
                        product_discount_description: item.product_discount_description || "",
                        product_discount_type: item.product_discount_type || "",
                        product_discount_type_from: null,
                    }];
                }
            }, []);
            orderDraft.setProductInfo(newProductList)
            orderDraft.setPayBillInfo(res.data.payBillInfo??null)
            orderDraft.setReceiverInfo(res.data.receiverInfo??null)
        }).catch(err=>{
        }).finally(()=>{
            setIsSkeleton(false)
            setSpinning(false)
        })
    }

    useMemo(()=>{
        if(initialRender.current) {
            initialRender.current = false;
            return;
        }
        if(spinning){
            return;
        }
        if(!isSkeleton && !initialRender.current){
            setIsOverlay(true)
        }
    },[orderDraft.productInfo,orderDraft.customerInfo,orderDraft.payBillInfo,orderDraft.receiverInfo,orderDraft.orderInfo])


    useEffect(()=>{
        fetchDraftDetail()
    },[draftOrderId])

    return (
        <>
            {isSkeleton ? <SkeletonCard /> : <Scoped>
                <div className='mc-layout-wrap'>
                    <div className="mc-layout">
                        <Spin indicator={<LoadingOutlined spin />} spinning={spinning} >
                            <div className="mc-header">
                                <div className="mc-header-left">
                                    <div className="mc-header-left-secondary" onClick={()=>{
                                        navigate(`/orders/draftOrders`)
                                    }}>
                                        <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                    </div>
                                    <div className="mc-header-left-content">#{orderDraft.orderInfo.id}</div>
                                </div>
                                <Flex align='center' gap={10}>
                                    <DefaultButton text="分享" />
                                    <ButtonIcon icon={<LeftIcon className='font-20' />} style={{backgroundColor:"#FFF",color:"#242833"}} disabled={orderDraft.prevDraftId ?false : true} onClick={()=>{
                                        setIsOverlay(false)
                                        navigate(`/orders/draftOrders/edit/${orderDraft.prevDraftId}`)
                                    }} />
                                    <ButtonIcon icon={<RightIcon className='font-20' />} style={{backgroundColor:"#FFF",color:"#242833"}} disabled={orderDraft.nextDraftId ?false : true} onClick={()=>{
                                        setIsOverlay(false)
                                        navigate(`/orders/draftOrders/edit/${orderDraft.nextDraftId}`)
                                    }} />
                                </Flex>
                            </div>
                            {/*  */}
                            {isAlert && <MyAlert message={<div className='font-14 color-242833 font-w-600'>要保存订单，请完成以下修改：</div>}
                                description={(
                                    <>
                                        {!isAlert.isProduct && <div className='font-14'>至少添加1件商品。</div>}
                                        {!isAlert.isCustomer && <div className='font-14'>选择或创建客户。</div>}
                                    </>
                                )}
                                showIcon={true}
                                icon={<WarningIcon style={{fontSize:"20px"}} />}
                                type="error"  
                                style={{
                                    marginBottom:"16px",
                                    backgroundColor:"#FDE6E0"
                                }} 
                            />}
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
                            <Flex justify='space-between'>
                                <DeleteModal
                                    loading={delLoading}
                                    tElement={
                                        <DangerButton text="删除草稿单" />
                                    }
                                    removeFunc={()=>{
                                        setDelLoading(true)
                                        delDraftOrder(orderDraft.orderInfo.id).then(()=>{
                                            message.success("删除成功")
                                            navigate('/orders/draftOrders')
                                        }).catch(()=>{
                                        }).finally(()=>{
                                            setDelLoading(false)
                                        })
                                    }} 
                                    title="确认要删除草稿订单吗？" 
                                    content={<div style={{color:"rgba(0, 0, 0, 0.65)"}}>此操作无法撤销。</div>}
                                />
                                <ConfirmModal
                                    tElement={
                                        <PrimaryButton text="创建订单" />
                                    }
                                    confirmFun={()=>{
                                        console.log("创建订单")
                                        
                                    }} 
                                    title="确认要创建订单吗？" 
                                    content={<div style={{color:"rgba(0, 0, 0, 0.65)"}}>客户将不可修改订单内容，但你可以在订单详情中管理发货、付款和编辑订单商品。</div>}
                                    okText="创建"
                                />
                            </Flex>
                        </Spin>
                    </div>
                </div>
            </Scoped>}
            {isOverlay && <Overlay status={loading} okText="保存" onExit={()=>{
                navigate(`/orders/draftOrders`)
            }} onSubmit={submit} />}
        </>
    )
}

export default observer(OrderDraftEdit);

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
            margin: 8px 0px 20px;
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
    }
}
`
