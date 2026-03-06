import { ArrowLeftOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react"
import baseInfoStore from "@/store/setUp/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { Flex } from "antd"
import WebsiteReportingCard from "./WebsiteReportingCard"
import OfflineReportingCard from "./OfflineReportingCard"
import SocialReportingCard from "./SocialReportingCard"

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
                                <div className="font-20">数据追踪</div>
                                <div className="font-12 font-w-400">通过 Meta Pixel、Conversion API 将转化事件回传给 Meta 用以评估和优化您的广告效果。</div>
                            </Flex>
                        </Flex>
                    </div>
                    <Flex vertical gap={24}>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">Website 上报</div>
                                <p className="font-14 color-474F5E desc line-h-20">Pixel 和 Conversion API 绑定成功后，Shopline 将在转化事件发生时把数据上报到 Meta，整个过程无需您编写代码。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <WebsiteReportingCard />
                            </div>
                        </div>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">Offline 上报</div>
                                <p className="font-14 color-474F5E desc line-h-20">借助线下转化量来衡量通过 Meta 投放的广告带来的实际成效，如店铺购物。除此之外，还可以创建类似受众，将广告投放给与您的线下客户具有相似特征的用户。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <OfflineReportingCard />
                            </div>
                        </div>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">社交电商转化事件上报</div>
                                <p className="font-14 color-474F5E desc line-h-20">在直播销售、贴文销售、消息中心达成的转化事件上报给Meta。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <SocialReportingCard />
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
