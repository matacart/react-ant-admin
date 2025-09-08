import { ArrowLeftOutlined } from "@ant-design/icons"
// import { history } from "@umijs/max"
import { Button, Divider, message } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react"
import SettlementCurrencyCard from "./SettlementCurrencyCard"
import BaseInfoCard from "./BaseInfoCard"
import ShopOperationInformation from "./ShopOperationInformation"
import ShopStatusCard from './ShopStatusCard';
import baseInfoStore from "@/store/setUp/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import OrderSetUpCard from "./OrderSetUpCard"
import cookie from 'react-cookies';
import { useNavigate } from "react-router-dom"

function Base() {

    const navigate = useNavigate();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [isRenewal,setIsRenewal] = useState(false);

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
                            <div className="mc-header-left-content">基础设置</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    {/* 商店基本资料 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">商店基本资料</div>
                                <p className="font-14 color-474F5E desc line-h-20">你的商店基本信息以及收信方式</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <BaseInfoCard />
                            </div>
                        </div>
                    </div>
                    {/* 商店经营信息 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">商店经营信息</div>
                                <p className="font-14 color-474F5E desc line-h-20">管理商店账单信息、商品种类以及经营所在地时区。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <ShopOperationInformation />
                            </div>
                        </div>
                    </div>
                    {/* 结算货币 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">结算货币</div>
                                <p className="font-14 color-474F5E desc line-h-20">设置商店收款的结算货币。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <SettlementCurrencyCard />
                            </div>
                        </div>
                    </div>
                    {/* 订单设置 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">订单设置</div>
                                <p className="font-14 color-474F5E desc line-h-20">设置订单编号前缀</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <OrderSetUpCard />
                            </div>
                        </div>
                    </div>
                    {/* 商店状态 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 font-w-600">商店状态</div>
                                <p className="font-14 color-474F5E desc line-h-20">若你希望在正式运行商店前或暂时需要关闭商店前台，可以将商店设置为“休息”状态，需要开始运营前台时，再将商店状态设置为“营业中”即可。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <ShopStatusCard />
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
                            setIsRenewal(true)
                            baseInfoStore.setStore().then((res:any)=>{
                                if(res.code==0){
                                    cookie.save('timeZone', JSON.stringify(JSON.parse(sessionStorage["timezones"]).filter(item=>item.time_zone_name == baseInfoStore.timezone)[0]), { path: '/' });
                                    message.success('更新成功')
                                }else{
                                    message.error('更新失败')
                                }
                                setIsRenewal(false)
                            })
                        }}>更新</Button>
                    </div>
                </div>
            </div>}
            {/* <OverlayEdit /> */}
        </Scoped>
    )
}
export default Base

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
//  function Base(){
    
    
//     return (
//         <Scoped>
//             <>

            
//             </>
//         </Scoped>
//     )
// }
// export default Base

// const Scoped = styled.div`
// .gap{
//     display: flex;
//     flex-direction: column;
// }
// .header{
//     display:flex;
//     justify-content: space-between;
//     margin-bottom: 8px;
//     .title{
//         color: #000;
//         font-size: 16px;
//         font-weight:600;
//     }
// }
// .item{
//         /* margin-bottom: 10px; */
//         margin-top: 12px;
// }
// .between{
//     display: flex;
//     justify-content: space-between;
// }
// a{
//     font-weight: 400;
// }
// `
