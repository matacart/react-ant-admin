import { App, Divider } from "antd"
import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import LoginAccountCard from "./LoginAccountCard";
import QuickLoginCard from "./QuickLoginCard";
import ContactInformationCard from "./ContactInformationCard";
import AccountLanguage from "./AccountLanguage";
import LoginDevice from "./LoginDevice";
import { getUserInfo, setUserInfo } from "@/services/y2/apiAppstore";
import AgreementAndPolicy from "./AgreementAndPolicy";
import accountManagement from "@/store/shops/accountManagement";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import MyButton from "@/components/Button/MyButton";
import { setLocale, useIntl } from "@umijs/max";
import { i18n } from "@/components/Lang/Lang";


function Index(){

    const { message } = App.useApp();

    const intl = useIntl();

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [isRenewal,setIsRenewal] = useState(false)

    const contactFormRef = useRef();

    useEffect(()=>{
        getUserInfo().then((res:any)=>{
            accountManagement.setLoginRecord(res.data.login_record??[])
            accountManagement.setUserInfo(res.data.user)
        }).catch(()=>{
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
                            <h3 style={{ position: 'relative', top: 10, display: 'inline-block' }}>{intl.formatMessage({ id: 'stores.accountManagement.index.accountManagement' })}</h3>
                        </div>
                    </div>
                    <div className='create-content'>
                        {/* 登录账号 */}
                        <div className='mc-layout-main'>
                            <div className='mc-layout-content'>
                                <div className="mc-layout-content-left">
                                    <div className="font-20 font-w-600">{intl.formatMessage({ id: 'stores.accountManagement.index.loginAccount' })}</div>
                                    <p className="font-14 color-474F5E desc line-h-20">{intl.formatMessage({ id: 'stores.accountManagement.index.loginAccountDesc' })}</p>
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
                                    <div className="font-20 font-w-600">{intl.formatMessage({ id: 'stores.accountManagement.index.quickLoginService' })}</div>
                                    <p className="font-14 color-474F5E desc line-h-20">{intl.formatMessage({ id: 'stores.accountManagement.index.quickLoginServiceDesc' })}</p>
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
                                    <div className="font-20 font-w-600">{intl.formatMessage({ id: 'stores.accountManagement.index.contactInformation' })}</div>
                                    <p className="font-14 color-474F5E desc line-h-20">{intl.formatMessage({ id: 'stores.accountManagement.index.contactInformationDesc' })}</p>
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
                                    <div className="font-20 font-w-600">{intl.formatMessage({ id: 'stores.accountManagement.index.accountLanguage' })}</div>
                                    <p className="font-14 color-474F5E desc line-h-20">{intl.formatMessage({ id: 'stores.accountManagement.index.accountLanguageDesc' })}</p>
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
                                    <div className="font-20 font-w-600">{intl.formatMessage({ id: 'stores.accountManagement.index.loginDevice' })}</div>
                                    <p className="font-14 color-474F5E desc line-h-20">{intl.formatMessage({ id: 'stores.accountManagement.index.loginDeviceDesc' })}</p>
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
                                    <div className="font-20 font-w-600">{intl.formatMessage({ id: 'stores.accountManagement.index.agreementAndPolicy' })}</div>
                                    <p className="font-14 color-474F5E desc line-h-20">{intl.formatMessage({ id: 'stores.accountManagement.index.agreementAndPolicyDesc' })}</p>
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
                                let isPass = true;
                                await contactFormRef.current?.validate().then().catch(() => {
                                    isPass = false;
                                    return;
                                });
                                if (isPass) {
                                    setIsRenewal(true);
                                    setUserInfo(accountManagement.userInfo).then(res => {
                                        const languagesId = accountManagement.userInfo.languages_id
                                        localStorage.setItem("USE_LANG",languagesId);
                                        // 设置语言
                                        const language = i18n.find(item => item.id == languagesId)?.lang ?? "en-US";
                                        setLocale(language,false);
                                        message.success("更新成功");
                                    }).catch(()=>{
                                    }).finally(() => {
                                        setIsRenewal(false);
                                    });
                                }
                            } } text={intl.formatMessage({ id: 'stores.accountManagement.index.update' })} />
                        </div>
                        {/* 注销 */}
                        {/* <a className="color-356DFF"> 注销账号 </a> */}
                        <div className="sign-out color-7A8499 font-14">
                            {intl.formatMessage(
                                { id: 'stores.accountManagement.index.signOutAccountDesc' },
                                {
                                    action: intl.formatMessage({ id: 'stores.accountManagement.index.signOutAccount' }),
                                    accountLink: (
                                        <a className="color-356DFF">
                                            {intl.formatMessage({ id: 'stores.accountManagement.index.signOutAccount' })}
                                        </a>
                                    ),
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default Index

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