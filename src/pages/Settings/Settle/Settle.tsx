import { ArrowLeftOutlined, ExportOutlined } from "@ant-design/icons"
import { Button, Divider } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react"
import baseInfoStore from "@/store/setUp/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import TopicConfiguration from "./TopicConfiguration"
import CustomerAccountInformation from "./CustomerAccountInformation"
import CustomerContactInformation from "./CustomerContactInformation"
import CommodityInventoryDisposal from "./CommodityInventoryDisposal"
import ClosingForm from "./ClosingForm"
import AdditionalInformation from "./AdditionalInformation"
import Tip from "./Tip"
import OrderProcessing from "./OrderProcessing"
import UsePromoCode from "./UsePromoCode"
import CheckoutButton from "./CheckoutButton"
import CheckoutSecurityTrust from "./CheckoutSecurityTrust"
import { useNavigate } from "react-router-dom"


function Settle() {

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
                            <div className="mc-header-left-content">结账</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    {/* 主题配置 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">主题配置</div>
                                <p className="font-12 color-474F5E desc line-h-20">自定义结账流程和新客户账户的主题与应用。<a>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <TopicConfiguration />
                            </div>
                        </div>
                    </div>
                    {/* 客户账号信息 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">客户账号信息</div>
                                <p className="font-12 color-474F5E desc line-h-20">选择是否要在结账登录账号。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <CustomerAccountInformation />
                            </div>
                        </div>
                    </div>
                    {/* 客户联系方式 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">客户联系方式</div>
                                <p className="font-12 color-474F5E desc line-h-20">选择你的客户在结账时以及接受信息更新时使用的联系方式。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <CustomerContactInformation />
                            </div>
                        </div>
                    </div>
                    {/* 商品库存处理 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">商品库存处理</div>
                                <p className="font-12 color-474F5E desc line-h-20">使根据你的店铺需求，选择是否在消费者支付时（非自定义支付方式）进行库存锁定。锁定的库存将无法被销售或者移动。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <CommodityInventoryDisposal />
                            </div>
                        </div>
                    </div>
                    {/* 结账表单选项 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">结账表单选项</div>
                                <p className="font-12 color-474F5E desc line-h-20">选择你的结账表单是否需要客户提供额外的信息。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <ClosingForm />
                            </div>
                        </div>
                    </div>
                    {/* 附加信息 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">附加信息</div>
                                <p className="font-12 color-474F5E desc line-h-20">可用于对不同国家收集所需的相关履约信息，如税号、清关代号等。<a>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <AdditionalInformation />
                            </div>
                        </div>
                    </div>
                     {/* 小费 */}
                     <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">小费</div>
                                <p className="font-12 color-474F5E desc line-h-20">可选择供客户在结账时给小费的选项。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <Tip />
                            </div>
                        </div>
                    </div>
                     {/* 订单处理 */}
                     <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">订单处理</div>
                                <p className="font-12 color-474F5E desc line-h-20">根据您的店铺需求，选择是否对订单进行自动化处理，提升订单管理效率。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <OrderProcessing />
                            </div>
                        </div>
                    </div>
                    {/* 结账时使用优惠码 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">结账时使用优惠码</div>
                                <p className="font-12 color-474F5E desc line-h-20">如用户选购商品不支持使用优惠码，网站页面将不展示优惠码输入框。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <UsePromoCode />
                            </div>
                        </div>
                    </div>
                    {/* 结账按钮 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">结账按钮</div>
                                <p className="font-12 color-474F5E desc line-h-20">设置在商品详情页和购物车的结账按钮显示效果。<a>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <CheckoutButton />
                            </div>
                        </div>
                    </div>
                    {/* 结账安全与信任 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">结账安全与信任</div>
                                <p className="font-12 color-474F5E desc line-h-20">可定义在结账过程展示店铺的支付安全及售后保障信息，提高客户下单的信任感。</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <CheckoutSecurityTrust />
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
export default Settle

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