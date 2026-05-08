import { ArrowLeftOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { Flex } from "antd"
import GoogleAdsCard from "./GoogleAdsCard"
import GoogleRetargetingCard from "./GoogleRetargetingCard"
import GoogleAnalytics from "./GoogleAnalytics"
import CodeTrackerCard from "./CodeTrackerCard"

function DataTracking() {

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
                            <div className="mc-header-left-secondary" onClick={()=>history.push("/channels/google")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <Flex vertical>
                                <div className="font-20">数据追踪</div>
                                <div className="font-12 font-w-400">这有助于获取客户在网店中的行为数据，更好地了解客户喜好。</div>
                            </Flex>
                        </Flex>
                    </div>
                    <Flex vertical gap={24}>
                        <GoogleAdsCard />
                        <GoogleRetargetingCard />
                        <GoogleAnalytics />
                        <CodeTrackerCard />
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
export default DataTracking

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
