import { getAddWarehouseList, getFileList, getStoreInfo } from "@/services/y2/api"
import { ArrowLeftOutlined, EnvironmentOutlined, ExportOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import { Button, Card, Divider, Flex, Form, Input, message, Select, Skeleton, Upload } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react"
import baseInfoStore from "@/store/set-up/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import GeneralFreight from "./GeneralFreight"
import CustomFreight from "./CustomFreight"
import LocalDistribution from "./LocalDistribution"
import StorePickup from "./StorePickup"
import Parcel from "./Parcel"
import CarrierAccount from "./CarrierAccount"
import PlatformPopularChannels from "./PlatformPopularChannels"


function ShippingAndDistribution() {

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [isRenewal,setIsRenewal] = useState(false)

    useEffect(()=>{
        baseInfoStore.getStore().then(res=>{
            setIsSkeleton(!res)
        })
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>history.push("/settings/index")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">发货与配送</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    {/* 运费 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-16 color-242833">运费</div>
                                <p className="font-14 color-474F5E desc line-h-20">设置店铺可配送的区域，以及顾客在结算时可选择的运费方案。<a>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <GeneralFreight />
                            </div>
                        </div>
                    </div>
                    {/* 自定义运费 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <CustomFreight />
                            </div>
                        </div>
                    </div>
                    {/* 本地配送 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-16 color-242833">本地配送</div>
                                <p className="font-14 color-474F5E desc line-h-20">直接为本地客户配送订单。<a>了解更多 <ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <LocalDistribution />
                            </div>
                        </div>
                    </div>
                    {/* 到店取货 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-16 color-242833">到店取货</div>
                                <p className="font-14 color-474F5E desc line-h-20">允许本地客户自行取货。<a>了解更多 <ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <StorePickup />
                            </div>
                        </div>
                    </div>
                    {/* 承运商账户 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-16 color-242833">承运商账户</div>
                                <p className="font-14 color-474F5E desc line-h-20">如果您已有某个承运商的账户，请将其连接到您的商店，以使用您自己的费率。<a>了解更多 <ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <CarrierAccount />
                            </div>
                        </div>
                    </div>
                    {/* 包裹 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-16 color-242833">包裹</div>
                                <p className="font-14 color-474F5E desc line-h-20">用于运送您的产品的包裹尺寸和重量。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <Parcel />
                            </div>
                        </div>
                    </div>
                    {/* 平台物流 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-16 color-242833">平台物流</div>
                                <p className="font-14 color-474F5E desc line-h-20">全流程物流服务，省心省力</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <PlatformPopularChannels />
                            </div>
                        </div>
                    </div>
                    <Divider
                        style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                            textAlign: 'center',
                            color: '#666',
                            fontWeight: '500',
                        }}
                        orientationMargin="3em"
                    >
                    </Divider>
                    {/* <div className="submit-btn">
                        <Button type="primary" style={{height: "36px"}} loading={isRenewal} onClick={()=>{
                        }}>更新</Button>
                    </div> */}
                </div>
            </div>}
        </Scoped>
    )
}
export default ShippingAndDistribution

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
            gap:20px;
            &-left{
                flex: 1;
                margin-right: 20px;
                .desc{
                    margin-top: 8px;
                }
            }
            &-right{
                flex: 2;
                .availableLocation_box{
                    padding: 12px 0;
                    border-bottom: 1px solid #EEF1F7;
                    cursor: pointer;
                    .availableLocation{
                        margin-right: 12px;
                        background-color: #F7F8Fb;
                        border-radius: 4px;
                        border: 1px solid #EEF1F7;
                    }
                }
                .availableLocation_box:hover{
                    background-color: #F7F8Fb;
                }
            }
        }
        .submit-btn{
            display: flex;
            justify-content: right;
        }
    }
}
`