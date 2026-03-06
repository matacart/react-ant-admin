import { Card, Divider, Input, message, Select, Space } from "antd"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import LoginAccountCard from "./LoginAccountCard";
import QuickLoginCard from "./QuickLoginCard";
import ContactInformationCard from "./ContactInformationCard";
import AccountLanguage from "./AccountLanguage";
import LoginDevice from "./LoginDevice";
import { getUserInfo, setUserInfo } from "@/services/y2/api";
import AgreementAndPolicy from "./AgreementAndPolicy";
import accountManagement from "@/store/shops/accountManagementStore";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import MyButton from "@/components/Button/MyButton";
import globalStore from "@/store/globalStore";
import { setLocale } from "@umijs/max";


function AccountManagement(){

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [isRenewal,setIsRenewal] = useState(false)

    const contactFormRef = useRef();

    useEffect(()=>{
        getUserInfo().then((res:any)=>{
            if(res.code == 0){
                accountManagement.setLoginRecord(res.data.login_record??[])
                accountManagement.setUserInfo(res.data.user)
            }
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[])
    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='create-warp-flex' style={{ maxWidth: "100%" }}>
                <div className="create-warp">
                    <div className='create-title'>
                        <div className='create-title-left'>
                            <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>账户管理</h3>
                        </div>
                    </div>
                    <div className='create-content'>
                        {/* 登录账号 */}
                        <div className='mc-layout-main'>
                            <div className='mc-layout-content'>
                                <div className="mc-layout-content-left">
                                    <div className="font-20 font-w-600">登录账号</div>
                                    <p className="font-14 color-474F5E desc line-h-20">您的唯一登录凭证信息。您也可以修改未注册过MataCart的邮箱/手机号作为新的登录账号。</p>
                                </div>
                                <div className="mc-layout-content-right">
                                    <LoginAccountCard />
                                </div>
                            </div>
                        </div>
                        {/* 快捷登录服务 */}
                        <div className='mc-layout-main'>
                            <div className='mc-layout-content'>
                                <div className="mc-layout-content-left">
                                    <div className="font-20 font-w-600">快捷登录服务</div>
                                    <p className="font-14 color-474F5E desc line-h-20">您可以连接外部登录服务以快速安全地访问您的登录账号。</p>
                                </div>
                                <div className="mc-layout-content-right">
                                    <QuickLoginCard />
                                </div>
                            </div>
                        </div>
                        {/* 联系信息 */}
                        <div className='mc-layout-main'>
                            <div className='mc-layout-content'>
                                <div className="mc-layout-content-left">
                                    <div className="font-20 font-w-600">联系信息</div>
                                    <p className="font-14 color-474F5E desc line-h-20">MataCart会通过账户联系信息向您发送账户相关的电子账单或其他信息推送等。</p>
                                </div>
                                <div className="mc-layout-content-right">
                                    <ContactInformationCard ref={contactFormRef} />
                                </div>
                            </div>
                        </div>
                        {/* 账户语言 */}
                        <div className='mc-layout-main'>
                            <div className='mc-layout-content'>
                                <div className="mc-layout-content-left">
                                    <div className="font-20 font-w-600">账户语言</div>
                                    <p className="font-14 color-474F5E desc line-h-20">账户语言是您登录店铺后台时会看到的语言，也是您收到邮件的语言，它不会影响您的网店向客户显示的语言。</p>
                                </div>
                                <div className="mc-layout-content-right">
                                    <AccountLanguage />
                                </div>
                            </div>
                        </div>
                        {/* 登录设备 */}
                        <div className='mc-layout-main'>
                            <div className='mc-layout-content'>
                                <div className="mc-layout-content-left">
                                    <div className="font-20 font-w-600">登录设备</div>
                                    <p className="font-14 color-474F5E desc line-h-20">记录您登录MataCart后台历史记录的设备。如果某些设备不是您的常用登录地点或存在异常登录操作行为，请登出以保护账户安全。</p>
                                </div>
                                <div className="mc-layout-content-right">
                                    <LoginDevice />
                                </div>
                            </div>
                        </div>
                        {/* 用户协议与隐私政策 */}
                        <div className='mc-layout-main'>
                            <div className='mc-layout-content'>
                                <div className="mc-layout-content-left">
                                    <div className="font-20 font-w-600">用户协议与隐私政策</div>
                                    <p className="font-14 color-474F5E desc line-h-20">记录MataCart平台的相关协议与政策</p>
                                </div>
                                <div className="mc-layout-content-right">
                                    <AgreementAndPolicy />
                                </div>
                            </div>
                        </div>
                        <Divider />
                        {/* 更新 */}
                        <div className="submit-btn">
                            <MyButton type="primary" style={{ height: "36px" }} loading={isRenewal} onClick={async () => {
                                // console.log(contactFormRef.current.validate())
                                let isPass = true;
                                await contactFormRef.current?.validate().then().catch(() => {
                                    isPass = false;
                                    return;
                                });

                                if (isPass) {
                                    setIsRenewal(true);
                                    try {
                                        setUserInfo(accountManagement.userInfo).then(res => {
                                            if (res.code == "0") {
                                                const languagesId = accountManagement.userInfo.languages_id
                                                localStorage.setItem("use_lang",languagesId);
                                                // // 设置语言
                                                const language = globalStore.language.filter(item => item.id === languagesId)[0]?.code
                                                setLocale(language,false);
                                                message.success("更新成功");
                                            }
                                        });
                                    } catch (error) {
                                        message.error("失败，请重试");
                                    } finally {
                                        setIsRenewal(false);
                                    }
                                }
                            } } text={"更新"} />
                        </div>
                        {/* 注销 */}
                        <div className="sign-out color-7A8499 font-14">
                            若您的账号在正常使用，想要注销该账号，请点击<a className="color-356DFF"> 注销账号 </a>进行操作
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default AccountManagement

const Scoped = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 70%;
    .create-warp-flex{
        width: 100%;
        display: flex;
        justify-content: center;
        color: #474f5e;
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
        .create-warp{
            width: 100%;
            min-width: 500px;
            .create-title{
                padding-bottom: 0px;
                color: #474f5e;
                font-size: 14px;
                line-height: 20px;
                display: flex;
                justify-content: space-between;
                align-content: center;
                .create-title-left{
                    display: inline-block;
                    h3 {
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        margin: 0 24px 24px 0;
                        overflow: hidden;
                        color: #242833;
                        font-size: 24px;
                        font-weight: 600;
                        line-height: 32px;
                    }
                }
            }
            .create-content{
                .mc-layout-main {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                .mc-layout-content {
                    flex: 9;
                    min-width: 510px;
                    display: flex;
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
                .sign-out{
                    margin-top: 12px;
                    padding: 20px;
                    text-align: center;
                }
            }
        }
    }
`