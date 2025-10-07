import { ArrowLeftOutlined, ExportOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import { Divider, message } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import RefundPolicy from "./RefundPolicy"
import PrivacyPolicy from "./PrivacyPolicy"
import TermsOfService from "./TermsOfService"
import ShippingPolicy from "./ShippingPolicy"
import rules from "@/store/settings/rules"
import StatementModal from "@/components/Modal/StatementModal"
import cookie from 'react-cookies';
import { useSleep } from "@/hooks/customHooks"
import { getRuleList, setRuleList } from "@/services/y2/api"
import LangSelect from "@/components/Select/LangSelect"
import { observer } from "mobx-react-lite"
import MyButton from "@/components/Button/MyButton"

function Rules() {

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [isRenewal,setIsRenewal] = useState(false)

    const sleep = useSleep();

    // 免责声明
    const content = (<div>
        <div className="disclaimerContainer">
            <div>以下材料仅供参考，不构成广告、征求或法律建议。</div>
            <div style={{marginTop: "16px"}}>在发布这些协议之前，您还应该咨询独立法律建议。您应仔细阅读生成的信息，并在必要时修改、删除或添加全部或任意区域。使用、访问或传输此类材料和信息或此处包含的任何链接并非用于创建，并且接收这些内容不会构成MATACATR 和用户或浏览器之间受代理人和客户的关系。</div>
            <div style={{marginTop: "16px"}}>在没有向您所在州或省的持证律师寻求法律建议的情况下，不应出于任何目的依赖此信息。所包含的信息仅作为一般信息提供，不一定能反映最新的法律进展；所以不能保证信息的正确性和完整性。MATACATR明确表示不对基于本网站的任何或所有内容执行或未执行的操作承担任何责任。</div>
            <div style={{marginTop: "16px"}}>此外，MATACATR不一定认可也不对可通过此信息访问的任何第三方内容负责。</div>
        </div>
    </div>)

    const setLang = (lang:string) => {
        rules.setLanguagesId(lang)
    }

    useEffect(()=>{
        // 默认语言
        rules.setLanguagesId(cookie.load("shop_lang") || '2');
    },[])

    useEffect(()=>{
        getRuleList("",rules.languagesId).then((res:any)=>{
            (res.data && res.data.length>0) && res.data.forEach((item:any)=>{
                switch (item.page_type) {
                    case "terms_of_service":
                        rules.setTermsofUse(item)
                        break;
                    case "refund_policy":
                        rules.setReturnPolicy(item)
                        break;
                    case "shipping_policy":
                        rules.setShippingPolicy(item)
                        break;
                    case "privacy_policy":
                        rules.setPrivacyPolicy(item)
                }
            })
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[rules.languagesId])

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
                                <LangSelect lang={rules.languagesId} setLang={setLang} />
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
                                <p className="font-14 color-474F5E desc line-h-20">使用这些模板表示您已经阅读并同意
                                    <StatementModal triggerObj={<a>免责声明</a>} content={content} title="免责声明" />。
                                </p>
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
                        <MyButton text="更新" type="primary" style={{height: "36px"}} loading={isRenewal} onClick={()=>{
                            setIsRenewal(true)
                            setRuleList(JSON.stringify([{...rules.privacyPolicy,is_sys:'0'},{...rules.returnPolicy,is_sys:'0'},{...rules.shippingPolicy,is_sys:'0'},{...rules.termsofUse,is_sys:'0'}]),rules.languagesId).then(async res=>{
                                // 重新获取规则
                                await sleep(2000)
                                setLang(rules.languagesId)
                                message.success('修改内容已更新')
                            }).catch(err=>{
                                console.log(err)
                            }).finally(()=>{
                                setIsRenewal(false)
                            })
                        }} />
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}
export default observer(Rules)

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
            &-right {
                display: flex;
                align-items: center;
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