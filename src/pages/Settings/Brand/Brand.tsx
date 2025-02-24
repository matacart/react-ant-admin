import { getAddWarehouseList, getFileList, getStoreInfo } from "@/services/y2/api"
import { ArrowLeftOutlined, EnvironmentOutlined, ExportOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import { Button, Card, Divider, Flex, Form, Input, message, Select, Skeleton, Upload } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react"
import baseInfoStore from "@/store/set-up/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import OnlineStore from "./OnlineStore"
import LogoCard from "./LogoCard"
import CoverPicture from "./CoverPicture"
import Slogan from "./Slogan"
import ShortDescription from "./ShortDescription"
import { truncate } from "lodash"


function Brand() {

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
                            <div className="mc-header-left-content">品牌</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <LogoCard />
                                <CoverPicture />
                                <Slogan />
                                <ShortDescription />
                            </div>
                            <div className="mc-layout-content-right">
                                <OnlineStore />
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
                    <div className="submit-btn">
                        <Button type="primary" style={{height: "36px"}} loading={isRenewal} onClick={()=>{
                        }}>更新</Button>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}
export default Brand

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
            margin-top: 20px;
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            gap:20px;
            &-left{
                flex: 1;
            }
            &-right{
                flex: 1;
            }
        }
        .submit-btn{
            display: flex;
            justify-content: right;
        }
    }
}
`