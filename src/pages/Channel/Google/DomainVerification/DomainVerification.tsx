import { ArrowLeftOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import DomainVerificationCard from "./DomainVerificationCard"
import { Flex } from "antd"

function DomainVerification() {

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
                            <div className="mc-header-left-secondary" onClick={()=>history.push("/channels/google")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">网域验证</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <Flex className="content">
                      <DomainVerificationCard />
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
export default DomainVerification

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
        .content {
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
