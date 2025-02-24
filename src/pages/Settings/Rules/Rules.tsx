import { getAddWarehouseList, getFileList, getStoreInfo } from "@/services/y2/api"
import { ArrowLeftOutlined, EnvironmentOutlined, ExportOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import { Button, Card, Divider, Flex, Form, Input, message, Select, Skeleton, Upload } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react"
import baseInfoStore from "@/store/set-up/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import RefundPolicy from "./RefundPolicy"
import PrivacyPolicy from "./PrivacyPolicy"
import TermsOfService from "./TermsOfService"
import ShippingPolicy from "./ShippingPolicy"

function Rules() {

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
                            <div className="mc-header-left-content">规则</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    {/* 管理你店铺的规则页面 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">管理你店铺的规则页面</div>
                                <p className="font-14 color-474F5E desc line-h-20">您可以创建自己的规则页面，或从模板中创建这些页面并进行自定义。这些模板不是法律建议，需要针对您的商店进行自定义。</p>
                                <p className="font-14 color-474F5E desc line-h-20">保存的政策会作为链接显示在结账页面的页脚中。如果您需要将政策添加到在线商店的菜单中，请查看<a>设置指引<ExportOutlined style={{position:"relative",top:"1px",margin:"0 4px"}} /></a>。</p>
                                <p className="font-14 color-474F5E desc line-h-20">使用这些模板表示您已经阅读并同意<a>免责声明</a>。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <RefundPolicy />
                            </div>
                        </div>
                    </div>
                    {/* 隐私政策 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <PrivacyPolicy />
                            </div>
                        </div>
                    </div>
                    {/* 服务条款 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <TermsOfService />
                            </div>
                        </div>
                    </div>
                    {/* 发货政策 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <ShippingPolicy />
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
export default Rules

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