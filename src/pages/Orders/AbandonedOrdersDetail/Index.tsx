import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { getAbandonedOrderDetail } from "@/services/y2/ApiAbandonedOrder";
import abandonedOrder from "@/store/order/abandonedOrder/abandonedOrder";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useParams } from "@umijs/max";
import { App, Divider, Flex, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Index = () => {

    const { id } = useParams();

    const { message } = App.useApp();

    const [isSkeleton,setIsSkeleton] = useState<boolean>(false);

    const [spinning,setSpinning] = useState(false);
    // 提示
    const [isOverlay,setIsOverlay] = useState(false)

    const [loading, setLoading] = useState(false);
    const [delLoading, setDelLoading] = useState(false);

    // 验证提示
    const [isAlert,setIsAlert] = useState<{isProduct:boolean,isCustomer:boolean} | null>(null);

    useEffect(()=>{
        getAbandonedOrderDetail({
            languages_id:"2",
            seq:id,
        }).then(res=>{
            abandonedOrder.setAbandonedOrderData(res.data)
        })
    },[id])


    return (
        <>
            {isSkeleton ? <SkeletonCard /> : <Scoped>
                <div className='mc-layout-wrap'>
                    <div className="mc-layout">
                        <Spin indicator={<LoadingOutlined spin />} spinning={spinning} >
                            <div className="mc-header">
                                <div className="mc-header-left">
                                    <div className="mc-header-left-secondary" onClick={()=>{
                                    }}>
                                        <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                    </div>
                                    <div className="mc-header-left-content">#{abandonedOrder.abandonedOrderData?.abandonedOrderSeq }</div>
                                </div>
                                {/* <Flex align='center' gap={10}>
                                    <DefaultButton text="分享" />
                                    <ButtonIcon icon={<LeftIcon className='font-20' />} style={{backgroundColor:"#FFF",color:"#242833"}} disabled={orderDraft.prevDraftId ?false : true} onClick={()=>{
                                        setIsOverlay(false)
                                        history.push(`/orders/draftOrders/edit/${orderDraft.prevDraftId}`)
                                    }} />
                                    <ButtonIcon icon={<RightIcon className='font-20' />} style={{backgroundColor:"#FFF",color:"#242833"}} disabled={orderDraft.nextDraftId ?false : true} onClick={()=>{
                                        setIsOverlay(false)
                                        history.push(`/orders/draftOrders/edit/${orderDraft.nextDraftId}`)
                                    }} />
                                </Flex> */}
                            </div>
                            {/*  */}
                            <div className='mc-layout-main'>
                                <div className='mc-layout-content'>
                                    
                                </div>
                                <div className='mc-layout-extra'>
                                    
                                </div>
                            </div>
                            <Divider/>
                            <Flex justify='space-between'>
                                
                               
                            </Flex>
                        </Spin>
                    </div>
                </div>
            </Scoped>}
            {/* {isOverlay && <Overlay status={loading} okText="保存" onExit={()=>{
                history.push(`/orders/draftOrders`)
            }} onSubmit={submit} />} */}
        </>
    );
};

export default observer(Index);

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