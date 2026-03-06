import { ArrowLeftOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react"
import baseInfoStore from "@/store/setUp/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { Flex } from "antd"
import FanPageCard from "./FanPageCard"
import OtherFunctionsCard from "./OtherFunctionsCard"
import InstagramCard from "./InstagramCard"
import OneNotificationCard from "./OneNotificationCard"

function Tracking() {

    const [isSkeleton,setIsSkeleton] = useState(true);

    useEffect(()=>{
        setIsSkeleton(false)
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <Flex className="mc-header-left" gap={12}>
                            <div className="mc-header-left-secondary" onClick={()=>history.push("/channels/facebook")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <Flex vertical>
                                <div className="font-20">社群营销</div>
                                <div className="font-12 font-w-400">轻松管理多个粉丝主页的Messenger和Instagram消息、贴文内容。</div>
                            </Flex>
                        </Flex>
                    </div>
                    <Flex vertical gap={24}>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">粉丝主页</div>
                                <p className="font-14 color-474F5E desc line-h-20">连接您的粉丝主页后，您可通过消息中心、直播中心与粉丝页用户进行互动。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <FanPageCard />
                            </div>
                        </div>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600"></div>
                                <p className="font-14 color-474F5E desc line-h-20"></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <InstagramCard />
                            </div>
                        </div>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600"></div>
                                <p className="font-14 color-474F5E desc line-h-20"></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <OneNotificationCard />
                            </div>
                        </div>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">其他功能</div>
                                <p className="font-14 color-474F5E desc line-h-20">连接Facebook粉丝主页后，您可以使用消息中心、直播等功能实现和顾客的实时互动。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <OtherFunctionsCard />
                            </div>
                        </div>
                    </Flex>
                    {/*  */}
                    <div className="footer">
                        <span>用户协议</span>
                        <div className="divider-vertical" role="separator"></div>
                        <span>隐私政策</span>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}
export default Tracking

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
            font-weight: bold;
            margin: 8px 0px 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
            &-left {
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
            }
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
        .footer{
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            .divider-vertical{
                height: 16px;
                width: 1px;
                margin: 0px 20px;
                background-color: #00000064;
            }
        }
    }
}
`
