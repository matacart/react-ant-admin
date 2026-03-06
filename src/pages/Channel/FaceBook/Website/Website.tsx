import { ArrowLeftOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react"
import baseInfoStore from "@/store/setUp/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import WebsiteCard from "./WebsiteCard"

function Website() {

    const [isSkeleton,setIsSkeleton] = useState(true);

    useEffect(()=>{
        setIsSkeleton(false)
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>history.push("/channels/facebook")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">网域验证</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">网域验证</div>
                                <p className="font-14 color-474F5E desc line-h-20">完成网域验证有助于提高网站安全性、信任度和可用性，同时帮助您更好地管理和推广业务。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <WebsiteCard />
                            </div>
                        </div>
                    </div>
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
export default Website

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
