import { ArrowLeftOutlined, ExportOutlined } from "@ant-design/icons"
import { history, useIntl } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import CustomerMail from "./CustomerMail"
import LocalDistribution from "./LocalDistribution"
import SiteToStore from "./SiteToStore"
import LogisticsUpdate from "./LogisticsUpdate"
import Customer from "./Customer"
import CustomerSubscription from "./CustomerSubscription"
import MerchantMail from "./MerchantMail"
import { getCustomTemplateConfig } from "@/services/y2/api"
import cookie from 'react-cookies';
import CustomerPaymentMethod from "./CustomerPaymentMethod"

function Notification() {

    const intl = useIntl();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [customTemplateConfig,setCustomTemplateConfig] = useState([
        {key:"CUSTOMER_INVITE_REGISTRY_DIY_EMAIL", title:"客户邀请", content:"在客户详情中发送此邮件，以转化客户注册成为会员",type:"customer"},
        {key:"CUSTOMER_REGISTRY_DIY_EMAIL", title:"客户注册成功", content:"客户注册成功后会收到此邮件",check:true,type:"customer"},
        {key:"ACTIVATED_SUCCESS_WITHOUT_DISCOUNT_EMAIL", title:"激活成功", content:"当COD订单创建和在线订单支付成功时，向客户发送此通知邮件",check:true,type:"customer"},
        {key:"ACTIVATED_SUCCESS_WITH_DISCOUNT_EMAIL", title:"激活优惠", content:"当订单内容发生变更时，向客户发送此通知邮件，告知订单的变更内容",type:"customer"},
        {key:"CUSTOMER_RESET_PASSWORD_FROM_ADMIN", title:"重置密码", content:"当订单发货确认或发货信息更新时，向客户发送此通知邮件",type:"customer"},
        {key:"CUSTOMER_SEND_MESSAGE_EMAIL", title:"联系客户", content:"当订单包裹配送信息更新时，向客户发送此通知邮件（如果您选择此项）",type:"customer"},
        {key:"COMPANY_VISITOR_NOTICE_NOTICE_EMAIL", title:"B2B访问电子邮件", content:"当订单被取消时，向客户发送此通知邮件",type:"customer"},
        {key:"GIFT_CARD_EMAIL", title:"礼品卡", content:"当订单产生退款时，向客户发送此通知邮件（如果您选择此项）",type:"customer"},
        {key:"ORDER_ACTION_EMAIL_ORDER_CONFIRM", title:"订单确认", content:"当COD订单创建和在线订单支付成功时，向客户发送此通知邮件",check:true,type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_ORDER_EDITED",title:"订单编辑", content:"当订单内容发生变更时，向客户发送此通知邮件，告知订单的变更内容",type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_DELIVERY_STATUS_UPDATED",title:"发货更新", content:"当订单发货确认或发货信息更新时，向客户发送此通知邮件",check:true,type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_OMS_STATUS_UPDATED",title:"配送更新", content:"当订单包裹配送信息更新时，向客户发送此通知邮件（如果您选择此项）",check:true,type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_ORDER_CANCELLED",title:"订单取消", content:"当订单被取消时，向客户发送此通知邮件",check:true,type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_ORDER_REFUND",title:"订单退款", content:"当订单产生退款时，向客户发送此通知邮件（如果您选择此项）",check:true,type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_RETURN_STATUS_UPDATED",title:"订单退货", content:"当发起退货时，向客户发送此通知邮件（如果您选择此项）",check:true,type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_ORDER_RETURN_CLOSED",title:"订单已退货", content:"当订单中退货已完成时，向客户发送此通知邮件",type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_ABANDONED_ORDER_RECALL",title:"弃单召回", content:"当客户在结算流程放弃结账，向客户发送召回邮件（适用于未归档弃单）",settingTitle:"高级设置",type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_PAYMENT_NOTIFY",title:"账单通知", content:"当订单逾期未入账时，可手动向客户发送此通知邮件",type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_REFUNDED_SUCCESS",title:"退款成功", content:"当订单退款成功时发送该邮件（如果您在发起退款时选择了发送退款邮件）",type:"customerMail"},
        {key:"ORDER_ACTION_EMAIL_BILL_OVERDUE",title:"账单逾期", content:"当订单未付款且账单到期或是逾期时发送给客户",settingTitle:"发送设置",type:"customerMail"},
        {key:"USER_SUBSCRIBE_EMAIL", title:"订阅成功", content:"在客户订阅店铺时推送",check:true,type:"customerSubscription"},
        {key:"USER_UNSUBSCRIBE_EMAIL", title:"取消订阅", content:"在客户取消订阅时推送",check:true,type:"customerSubscription"},
        {key:"USER_SUBSCRIBE_CONFIRM_EMAIL", title:"客户营销确认", content:"当客户订阅电子邮件营销（如果已启用电子邮件双重选择加入）时自动发送给客户进行订阅确认",settingTitle:"客户营销设置",type:"customerSubscription"},
        {key:"CUSTOMER_UPDATE_PAYMENT_EMAIL", title:"客户付款方式更新", content:"购买了订阅商品的客户，可通过邮件中的链接更新其付款方式",type:"customerPaymentMethod"},
        {key:"ORDER_ACTION_EMAIL_LOCAL_SHIPPING_START_EMAIL", title:"正在配送", content:"在客户的本地订单正在配送时发送给客户",type:"localDistribution"},
        {key:"ORDER_ACTION_EMAIL_LOCAL_SHIPPING_SUCCESS_EMAIL", title:"已送达", content:"在客户的本地订单已送达时发送给客户",type:"localDistribution"},
        {key:"ORDER_ACTION_EMAIL_LOCAL_SHIPPING_FAILED_EMAIL", title:"配送未成功", content:"在配送未成功时发送给客户",type:"localDistribution"},
        {key:"SHIPPING_UPDATE_OUT_FOR_DELIVERY_EMAIL", title:"正在派送", content:"在订单的运单号状态为正在配送时发送",type:"logisticsUpdate"},
        {key:"SHIPPING_UPDATE_DELIVERED_EMAIL", title:"已送达", content:"在订单的运单号状态为已送达时发送",type:"logisticsUpdate"},
        {key:"MERCHANT_ORDER_ACTION_EMAIL_ORDER_CREATED", title:"新订单", content:"当客户下单时，向收件人发送新订单通知",type:"merchantMail"},
        {key:"MERCHANT_ORDER_ACTION_EMAIL_ORDER_REFUND_FAILED", title:"订单退款失败", content:"当订单退款失败时发送该邮件",type:"merchantMail"},
        {key:"ORDER_ACTION_EMAIL_READY_PICKUP_NOTIFY", title:"准备取货", content:"通过POS或后台手动发送给客户，通知其订单可取货",type:"siteToStore"},
        {key:"ORDER_ACTION_EMAIL_HAD_BEEN_PICKUP_NOTIFY", title:"已取货", content:"当订单标记为已取货时发送给客户",type:"siteToStore"},
    ]);

    useEffect(()=>{
        getCustomTemplateConfig({
            languages_id:cookie.load("shop_lang") || '2'
        }).then(res=>{
            setCustomTemplateConfig(customTemplateConfig.map(item=>(
                {
                    ...item,
                    languages_id:cookie.load("shop_lang") || '2',
                    check:res.data.find((x:any)=>x.config_key === item.key)?.switchStatus && item?.check
                }
            )))
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
                            <div className="mc-header-left-content">{intl.formatMessage({id:"settings.notification.index.title"})}</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                            </div>
                        </div>
                    </div>
                    {/* 客户邮件通知 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">客户邮件通知</div>
                                <p className="font-14 color-474F5E desc line-h-20">在指定条件下，系统将自动向你的客户发送邮件提醒，你可以自定义每个特定场景下发送的邮件内容。邮件内容需遵守邮件运营商内容规则，不合规内容会被运营商屏蔽。<a>查看邮件模版规则<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <CustomerMail orderList={customTemplateConfig.filter(item=>item.type === "customerMail")} />
                            </div>
                        </div>
                    </div>
                    {/* 本地配送 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <LocalDistribution orderList={customTemplateConfig.filter(item=>item.type === "localDistribution")} />
                            </div>
                        </div>
                    </div>
                    {/* 到店取货 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <SiteToStore orderList={customTemplateConfig.filter(item=>item.type === "siteToStore")} />
                            </div>
                        </div>
                    </div>
                    {/* 物流更新 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <LogisticsUpdate orderList={customTemplateConfig.filter(item=>item.type === "logisticsUpdate")} />
                            </div>
                        </div>
                    </div>
                    {/* 客户 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <Customer orderList={customTemplateConfig.filter(item=>item.type === "customer")} />
                            </div>
                        </div>
                    </div>
                    {/* 客户订阅 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <CustomerSubscription orderList={customTemplateConfig.filter(item=>item.type === "customerSubscription")} />
                            </div>
                        </div>
                    </div>
                    {/* 客户付款方式 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                            </div>
                            <div className="mc-layout-content-right">
                                <CustomerPaymentMethod orderList={customTemplateConfig.filter(item=>item.type === "customerPaymentMethod")} />
                            </div>
                        </div>
                    </div>
                    {/* 商家邮件通知 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">商家邮件通知</div>
                                <p className="font-14 color-474F5E desc line-h-20">店铺在收到新订单时，向员工发送邮件通知，你可以自定义新订单通知邮件的内容，也可以自定义设置接收新通知的员工邮箱。邮件内容需遵守邮件运营商内容规则，不合规内容会被运营商屏蔽。<a>查看邮件模版规则<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <MerchantMail orderList={customTemplateConfig.filter(item=>item.type === "merchantMail")} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}
export default Notification

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