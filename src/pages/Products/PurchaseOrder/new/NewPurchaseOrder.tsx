import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Flex, Form, Row, Select } from "antd";
import styled from "styled-components";
import LocationsCard from "../LocationsCard";
import ShippingDetailsCard from "../ShippingDetailsCard";
import PurchaseGoodsCard from "../PurchaseGoodsCard";
import CostSummaryCard from "../CostSummaryCard";
import RemarkCard from "../RemarkCard";
import { history } from '@umijs/max';
import purchaseOrderStore from "@/store/product/purchaseOrder/purchaseOrderStore";

function NewPurchaseOrder(){

    return (
        <Scoped>
            <div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/purchase_orders")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">创建采购订单</div>
                        </div>
                        <div className='mc-header-right'>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <LocationsCard/>
                            <ShippingDetailsCard/>
                            <PurchaseGoodsCard/>
                            <Flex gap={20}>
                                <CostSummaryCard/>
                                <RemarkCard/>
                            </Flex>
                        </div>
                    </div>
                    <div className='mc-footer'>
                        <Button type='primary' onClick={async ()=>{
                            // console.log(321)
                            console.log(purchaseOrderStore.purchaseOrder)
                            purchaseOrderStore.purchaseOrderSubmit()
                        }}>创建</Button>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default NewPurchaseOrder

const Scoped = styled.div`
.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 1200px;
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
    
            &-right {
                display: flex;
                align-items: center;
                width: 70px;
                > .selector{
                    height: 36px;
                }
            }
        }
        .mc-layout-main{
            .mc-layout-content{
                
            }
        }
        .mc-footer{
            display:flex;
            flex-direction: row-reverse;

            /*  */
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid rgb(215, 219, 231);
        }
    }
}
a{
  font-weight: 400
}
`