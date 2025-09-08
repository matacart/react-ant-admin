import { ArrowLeftOutlined } from "@ant-design/icons"
import styled from "styled-components"
import { useEffect, useState } from "react"
import baseInfoStore from "@/store/setUp/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import StoreManagerAccount from "./StoreManagerAccount"
import Employee from "./Employee"
import BusinessPartner from "./BusinessPartner"
import DualVerification from "./DualVerification"
import { useNavigate } from "react-router-dom"

function AdministratorsPermissions() {

    const navigate = useNavigate()

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
                            <div className="mc-header-left-secondary" onClick={()=>navigate("/settings/index")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">管理员和权限</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    {/* 权限 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-16 color-242833">权限</div>
                                <p className="font-14 color-474F5E desc line-h-20">管理员工可在商店中查看的内容或执行的操作。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <StoreManagerAccount />
                            </div>
                        </div>
                    </div>
                    {/* 员工 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <Employee />
                            </div>
                        </div>
                    </div>
                    {/* 合作伙伴 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <BusinessPartner />
                            </div>
                        </div>
                    </div>
                    {/* 双重验证 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-16 color-242833">双重验证</div>
                                <p className="font-14 color-474F5E desc line-h-20">为你的店铺管理后台设置登录双重验证，以确保安全性。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <DualVerification />
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}
export default AdministratorsPermissions

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
            margin-top: 20px;
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