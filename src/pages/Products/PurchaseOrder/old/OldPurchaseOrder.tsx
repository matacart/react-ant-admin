import { ArrowLeftOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Card, Col, Dropdown, Flex, Form, message, Row, Select, Tag } from "antd";
import styled from "styled-components";
import PurchaseGoodsCard from "../PurchaseGoodsCard";
import CostSummaryCard from "../CostSummaryCard";
import { history } from '@umijs/max';
import { useEffect, useState } from "react";
import { getPurchase } from "@/services/y2/api";
import LocationsCard from "./LocationsCard";
import globalStore from "@/store/globalStore";
import ShippingDetailsCard from "./ShippingDetailsCard";
import purchaseOrderEdit from "@/store/product/purchaseOrder/purchaseOrderEditStore";
import { observer } from "mobx-react-lite";
import RemarkCard from "./RemarkCard";

function OldPurchaseOrder(){

    const PurchaseOrderId = history.location.pathname.substring(history.location.pathname.lastIndexOf('/')+1)

    // const [purchaseOrder,setPurchaseOrder] = useState({})

    useEffect(()=>{
        // 获取采购订单
        purchaseOrderEdit.getPurchaseOrder(PurchaseOrderId)
    },[])

    const statusText = (value:string) => {
        switch(value){
            case "1":
                return (
                    <Tag color="default" style={{borderRadius:"9999px",backgroundColor:"#f0f3f9",padding:"0 8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <div style={{height:"4px",width:"4px",backgroundColor: "#7a8499",borderRadius:"50%"}}></div>
                        <div className='font-12 color-474F5E'>草稿</div>
                    </div>
                    </Tag>
                )
            case "2":
                return (
                    <Tag color="warning" style={{borderRadius:"9999px",backgroundColor:"#ffedc9",padding:"0 8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <div style={{height:"4px",width:"4px",backgroundColor: "#FE9E0F",borderRadius:"50%"}}></div>
                        <div className='font-12 color-474F5E'>已订购</div>
                    </div>
                    </Tag>
                )
            case "3":
                return (
                    <Tag color="processing" style={{borderRadius:"9999px",backgroundColor:"#e2f0ff",padding:"0 8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <div style={{height:"4px",width:"4px",backgroundColor: "#356dff",borderRadius:"50%"}}></div>
                        <div className='font-12 color-474F5E'>部分收货</div>
                    </div>
                    </Tag>
                )
            case "4":
                return (
                    <Tag color="success" style={{borderRadius:"9999px",backgroundColor:"#D6FAE7",padding:"0 8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <div style={{height:"4px",width:"4px",backgroundColor: "#35C08E",borderRadius:"50%"}}></div>
                        <div className='font-12 color-474F5E'>收货完成</div>
                    </div>
                    </Tag>
                )
            case "0":
                return (
                    <Tag color="error" style={{borderRadius:"9999px",backgroundColor:"#FFEBE7",padding:"0 8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                        <div style={{height:"4px",width:"4px",backgroundColor: "#F86140",borderRadius:"50%"}}></div>
                        <div className='font-12 color-474F5E'>已关闭</div>
                    </div>
                    </Tag>
                )
        }
    }


    // 删除采购订单
    const deletePurchaseOrder = async () => {
        purchaseOrderEdit.deletePurchaseOrder().then(res=>{
            if(res.code == 0){
                message.success("删除成功")
                globalStore.sleep(2000)
                history.push("/products/purchase_orders")
            }
        })
    }

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
                            <div className="mc-header-left-content">
                                <div>{
                                    purchaseOrderEdit.orderNumber
                                }</div>
                                <div style={{marginLeft:"8px"}}>
                                    { statusText(purchaseOrderEdit.ordersStatusId) }
                                </div>
                            </div>
                        </div>
                        <div className='mc-header-right'>
                            <Dropdown menu={{ items:[
                                {
                                    label: (
                                      <span>导出PDF</span>
                                    ),
                                    key: '0',
                                },
                            ] }} trigger={['click']}>
                                <Button style={{height:"36px",marginRight:"10px"}}>
                                    <span className="font-w-600">
                                        其它操作
                                    </span>
                                    <DownOutlined className="font-12" />
                                </Button>
                            </Dropdown>
                            <Button onClick={()=>{}} type="primary" style={{height:"36px"}}>标记为已订购</Button>
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
                        <Button danger type="primary" onClick={deletePurchaseOrder}>删除采购订单</Button>
                        <Button type='primary' onClick={async ()=>{
                            // console.log(321)
                            // purchaseOrderStoreEdit.purchaseOrderSubmit()
                        }}>更新</Button>
                    </div>
                </div>
            </div>
        </Scoped>
    )
}

export default observer(OldPurchaseOrder)

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
                    display: flex;
                    align-items: center;
                }
            }
    
            &-right {
                display: flex;
                align-items: center;
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
            justify-content: space-between;
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