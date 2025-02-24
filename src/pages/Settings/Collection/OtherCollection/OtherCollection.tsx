import { ArrowLeftOutlined, DeleteOutlined, ExclamationCircleOutlined, ExportOutlined, LoadingOutlined, PlusOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Card, Checkbox, Divider, Flex, Form, Input, List, message, TabsProps, Upload } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react";
import { getAddonsConfigArray, setAddonsConfig } from "@/services/y2/api";
import { useForm } from "antd/es/form/Form";
import modal from "antd/es/modal";
import axios from "axios";

import otherData from "./otherCollection.json"
import { set } from 'lodash';
import SkeletonCard from "@/components/Skeleton/SkeletonCard";


const { TextArea } = Input;

function OtherCollection() {

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [supportPayments,setSupportPayments] = useState<any>();

    const [config,setConfig] = useState<any>({
        isAddressRequired:"0",
        isUploadCredentials:"0",
        credentialsText:"",
        credentialsImg:""
    });


    // const [paymentMethod,setPaymentMethod] = useState([
    //     {name:"Adyen Other",imgs:["https://img.myshopline.com/pay/logo/AfterPay.svg","https://img.myshopline.com/pay/logo/AfterPay.svg"]},
    //     {name:"Affirm",imgs:["https://img.myshopline.com/pay/logo/AffirmBNPL.svg"]},
    //     {name:"Afterpay BNPL (Australia)"},
    //     {name:"Afterpay BNPL (Canada)"},
    //     {name:"Afterpay BNPL (New Zealand)"},
    //     {name:"Afterpay BNPL (United States)"},
    //     {name:"Airwallex Afterpay Payments",imgs:["https://img.myshopline.com/pay/logo/AfterPay.svg","https://img.myshopline.com/pay/logo/AfterPay.svg"]},
    //     {name:"Airwallex Apple Pay Payments",imgs:["https://img.myshopline.com/image/shopline/653611a69ca34f1383ae241e105e6f7a.svg"]},
    //     {name:"Airwallex Google Pay Payments",imgs:["https://img.myshopline.com/image/shopline/e9e3a1ec63f34b81b7bf73ce83124bc9.svg"]},
    //     {name:"Airwallex Klarna Payments",imgs:["https://img.myshopline.com/image/shopline/e0302c547faa4e5d88b92d620147b573.svg"]},
    //     {name:"Airwallex Online Payments",otherNum:"43",imgs:["https://img.myshopline.com/image/shopline/1c05bf5aae2f4c7fb179a1b097e9a559.svg","https://img.myshopline.com/image/shopline/a3fa5eb289e54b1cbb1dc2fd5707cfac.svg","https://img.myshopline.com/pay/logo/Sofort.svg","https://img.myshopline.com/image/shopline/0dc3ccc5c01043c581393fc034132a46.svg"]},
    // ]);

    useEffect(()=>{
        getAddonsConfigArray().then(res=>{
            
        })

        setSupportPayments(otherData.data.supportPayments)
        // console.log(otherData.data.supportPayments)

        console.log(otherData)
        setIsSkeleton(false)
    },[])



    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/payments")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">其他收款方式</div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card classNames={{body:"card"}}>
                                <div style={{margin:"20px"}}>
                                    <Input prefix={<SearchOutlined />} style={{minWidth:"100px"}} placeholder="搜索支付提供商" />
                                    <List className="payment-list">
                                        {supportPayments.map(item=>(
                                            <List.Item className="payment-item" onClick={()=>history.push('/settings/payments/other/edit')}>
                                                <Flex align="center">
                                                    <div style={{marginRight:"8px"}} className="font-w-600">{item.channelName.value}</div>
                                                </Flex>
                                                <Flex>
                                                    {
                                                        item.channelDisplayIcons.displayIcons.length>4 ? (
                                                            <Flex>
                                                                {item.channelDisplayIcons.displayIcons.slice(0,4).map(res=>{
                                                                    return (
                                                                        <img src={res.iconImage} style={{width:"38px",height:"24px",marginRight:"8px"}} />
                                                                    )
                                                                })}
                                                                <div style={{width:"38px",height:"24px",lineHeight:"22px",textAlign:"center",border:"1px solid #ddddd8",borderRadius:"2px"}} className="font-12 color-356DFF">{"+"+(item.channelDisplayIcons.displayIcons.length-4)}</div>
                                                            </Flex>
                                                        ):(
                                                            <Flex>
                                                                {item.channelDisplayIcons.displayIcons.slice(0,4).map(res=><img src={res.iconImage} style={{width:"38px",height:"24px",marginRight:"8px"}} />)}
                                                            </Flex>
                                                        )
                                                    }
                                                    <RightOutlined style={{marginLeft:8}} />
                                                </Flex>
                                            </List.Item>
                                        ))}
                                    </List>
                                    <div style={{textAlign:"center",marginTop:20}} className="color-7A8499">没有合适的服务商？请联系您的客服经理</div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default OtherCollection

const Scoped = styled.div`

.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 880px;
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
                    /* display: flex; */
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
            flex: 9;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .card{
                padding: 0;
                .payment-list{
                    margin-top: 20px;
                    border: 1px solid #eef1f6;
                    border-radius: 6px;
                    .payment-item{
                        display: flex;
                        height: 65px;
                        justify-content: space-between;
                        padding:12px 24px;
                    }
                    .payment-item:hover{
                        background-color: #f0f7ff;
                        cursor: pointer;
                    }
                }
            }

        }
        
    }
}
`