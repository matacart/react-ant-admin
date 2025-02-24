import { getAddonsConfigArray, getAddonsConfigs, getAddWarehouseList, getFileList, getStoreInfo, setAddonsConfig } from "@/services/y2/api"
import { ArrowLeftOutlined, EnvironmentOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import { Button, Card, Divider, Flex, Form, Input, message, Select, Skeleton, Upload } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import cookie from 'react-cookies';
import CollectionAccountCard from "./CollectionAccountCard"
import CreditCardCollection from "./CreditCardCollection"
import OtherCollection from "./OtherCollection"
import ManualCollection from "./ManualCollection"
import ReceivablesEntrySettings from "./ReceivablesEntrySettings"
import CustomizedSettings from "./CustomizedSettings"
import collection from "@/store/settings/collection"
import AccountReview from "./AccountReview"

function Collection() {

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [isRenewal,setIsRenewal] = useState(false)

    useEffect(()=>{
        // getAddonsConfigArray().then(res=>{
        //     console.log(res)
        // })

        getAddonsConfigs().then(res=>{
            setIsSkeleton(false)
            collection.setManualCollection(res.data)
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
                            <div className="mc-header-left-content">收款</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                            <div className='mc-layout-content'>
                                <CollectionAccountCard />
                                {/* <AccountReview /> */}
                                <div>
                                    <div className="font-16 color-242833 font-w-600">更多收款设置</div>
                                    <div className="font-12 color-474F5E" style={{marginTop:"8px"}}>您可为客户提供更多支付选项，提升客户支付体验和支付成功率</div>
                                </div>
                                <CreditCardCollection />
                                <OtherCollection />
                                <ManualCollection />
                            </div>
                            <div className='mc-layout-extra'>
                                <ReceivablesEntrySettings />
                                <CustomizedSettings />
                            </div>
                    </div>
                </div>
            </div>}
            {/* <OverlayEdit /> */}
        </Scoped>
    )
}
export default Collection

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
            gap:20px
        }
        &-extra {
            flex:4;
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
        .submit-btn{
            display: flex;
            justify-content: right;
        }
    }
}
`