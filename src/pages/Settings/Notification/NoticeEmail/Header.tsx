
import { BackIcon, DesktopIcon, EditorRedoIcon, EditorRevokeIcon, MobileIcon } from '@/components/Icons/Icons';
import { getStoreInfo } from '@/services/y2/api';
import { Flex, App, Tooltip, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { history, useIntl } from '@umijs/max';
import MySelect from '@/components/Select/MySelect';
import { ExclamationCircleFilled } from '@ant-design/icons';
import DefaultButton from '@/components/Button/DefaultButton';
import DangerButton from '@/components/Button/DangerButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import noticeEmail from '@/store/settings/notification/noticeEmail';
import { sendTestEmailTemplate, saveFormalTemplate } from '@/services/y2/apiEmail';
import MinLang from '@/components/Lang/MinLang';
import { i18n } from '@/components/Lang/Lang';

export interface jsonTemplate{
    templateName:string;
    pageName:string;
    isDefaultTemplate:boolean;
}

function Header({spinning,setSpinning}:{spinning:boolean,setSpinning:(value:boolean) => void}) {
    
    const intl = useIntl();

    const [loading, setLoading] = useState(false);

    const [sendLoading, setSendLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const { modal, message } = App.useApp();

    const dropdownContainerRef = useRef<HTMLDivElement>(null);

    const [languages,setLanguages] = useState([]);

    // 测试邮件信息
    const [textEmailInfo,setTextEmailInfo] = useState({
        serviceEmail:"",
        storeName:"",
        storeLogo:"",
    });

    // 切换语言
    const setLang = (value:string) => {
        noticeEmail.setLanguagesId(value);
        noticeEmail.setActiveSectionID("");
    }

    // 发送测试邮件
    const sendTestEmail = async () => {
        // 获取客服邮件
        let serviceEmail = "";
        let storeName = "";
        let storeLogo = "";
        setLoading(true);
        await getStoreInfo({
            languages_id:noticeEmail.languagesId,
        }).then(res=>{
            if(res.code == 0){
                serviceEmail = res.data.service_email;
                storeName = res.data.store_name;
            }
        }).catch(err=>{
            message.error(intl.formatMessage({ id: 'components.message.error' }));
        }).finally(()=>{
            setLoading(false);
        })
        if(!serviceEmail){
            message.error(intl.formatMessage({ id: 'settings.notification.noticeEmail.header.error' }));
            return;
        }
        setTextEmailInfo({
            serviceEmail:serviceEmail,
            storeName:storeName,
            storeLogo:storeLogo,
        });
        setOpen(true);
    }

    // 保存模板
    const submit = ()=>{
        setSpinning(true);
        saveFormalTemplate({
            template_code:noticeEmail.templateCode,
            languages_id:noticeEmail.languagesId,
            user_languages_id:noticeEmail.useLanguagesId,
            oseid:noticeEmail.oseId,
        }).then(res=>{
            if(res.code == 0){
                message.success(intl.formatMessage({ id: 'components.message.success' }));
            }
        }).catch(err=>{
            message.error(intl.formatMessage({ id: 'components.message.error' }));
        }).finally(()=>{
            setSpinning(false);
        })
    }

    useEffect(()=>{
        const languagesList = JSON.parse(sessionStorage.getItem("languages") || "[]");
        setLanguages(languagesList.map((item:any) => {
            return {
                label:item.name,
                value:item.id,
            }
        }));
    },[]);

    // 国际化语言
    const firstRef = useRef(true);
    useMemo(()=>{
        // 获取当前语言
        if(firstRef.current){
            firstRef.current = false;
            return;
        }
        const lang = i18n.find(item => item.lang == intl.locale);
        noticeEmail.setUseLanguagesId(lang?.id || "2");
    },[intl.locale]);


    return(
        <Scoped ref={dropdownContainerRef} className='font-14'>
            {/* left */}
            <Flex className='left' justify="space-between">
                <Tooltip title={intl.formatMessage({id:'theme.design.header.backToAdmin'})} placement="right">
                    <BackIcon className='font-20' onClick={()=>{
                        const newModal = modal.confirm({
                            title: intl.formatMessage({ id: 'settings.notification.noticeEmail.header.confirm' }),
                            icon: <ExclamationCircleFilled style={{color:'#F86140'}} />,
                            centered: true,
                            footer: (
                                <Flex gap={12} justify="flex-end" style={{marginTop:"24px"}}>
                                    <DefaultButton text={intl.formatMessage({ id: 'settings.notification.noticeEmail.header.cancelText' })} onClick={()=>newModal.destroy()} />
                                    <DangerButton text={intl.formatMessage({ id: 'settings.notification.noticeEmail.header.confirmText' })} onClick={async ()=>{
                                        newModal.destroy();
                                        history.push(`/settings/notice`);
                                    }} />
                                </Flex>
                            )
                        });
                    }} />
                </Tooltip>
                {/*  */}
                <Flex className='operation_warp' style={{paddingRight:"20px"}} gap={12} align='center'>
                    <Tooltip title={intl.formatMessage({id:'theme.design.header.undo'})} placement="right">
                        <EditorRevokeIcon className={`font-20 cursor-pointer ${noticeEmail.operationHistory.length == 0 ? 'opacity_6':''}`} />
                    </Tooltip>
                    <Tooltip title={intl.formatMessage({id:'theme.design.header.redo'})} placement="right">
                        <EditorRedoIcon className={`font-20 cursor-pointer ${noticeEmail.redoHistory.length == 0 ? 'opacity_6':''}`} />
                    </Tooltip>
                </Flex>
            </Flex>
            {/* content */}
            <MySelect style={{width:120}} value={noticeEmail.languagesId} onChange={setLang} options={languages}  />
            <Flex className='main' justify='center'>
                <Flex align='center'>
                    <div className={noticeEmail.device == 'pc' ? 'icon active' : 'icon'} onClick={()=>{noticeEmail.setDevice('pc')}}>
                        <DesktopIcon />
                    </div>
                    <div className={noticeEmail.device == 'mobile' ? 'icon active' : 'icon'} onClick={()=>{noticeEmail.setDevice('mobile')}}>
                        <MobileIcon />
                    </div>
                </Flex>
            </Flex>
            {/* right */}
            <Flex className='right' align='center' justify="flex-end" gap={12}>
                <MinLang />
                <DefaultButton loading={loading} text={intl.formatMessage({ id: 'settings.notification.noticeEmail.header.sendTestEmail' })} onClick={sendTestEmail} />
                <PrimaryButton loading={spinning} text={intl.formatMessage({ id: 'settings.notification.noticeEmail.header.publish' })} onClick={submit} />
            </Flex>
            <Modal
                open={open}
                closable={false}
                title={<Flex gap={16} align="center">
                    <ExclamationCircleFilled className='font-20' style={{color:"#356DFF"}} />
                    <div>{intl.formatMessage({ id: 'settings.notification.noticeEmail.header.sendTestEmailConfirm' })}</div>
                </Flex>}
                width={420}
                centered={true}
                footer={
                    <Flex justify="flex-end" style={{marginTop:"24px"}} gap={12}>
                        <DefaultButton onClick={()=>setOpen(false)} text={intl.formatMessage({ id: 'settings.notification.noticeEmail.header.cancelText' })} />
                        <PrimaryButton loading={sendLoading} onClick={()=>{
                            setSendLoading(true);
                            sendTestEmailTemplate({
                                template_code:noticeEmail.templateCode,
                                languages_id:noticeEmail.languagesId,
                                user_languages_id:"1",
                                oseid:noticeEmail.oseId,
                                to_email:textEmailInfo?.serviceEmail || "",
                                test_data:{
                                    customer_name:"",
                                    store_name:textEmailInfo?.storeName || "",
                                    store_logo:textEmailInfo?.storeLogo || "",
                                    store_general_name:textEmailInfo?.storeName || "",
                                    store_primary_domain:'https://example.com',
                                    store_custom_email:'support@example.com',
                                    invite_customer_discount_value:'20% OFF',
                                },
                            }).then((res)=>{
                                if(res.code == 0){
                                    message.success("发送成功");
                                    setOpen(false);
                                }
                            }).catch((err)=>{
                                message.error("发送失败");
                            }).finally(()=>{
                                setSendLoading(false);
                            })
                        }} text={intl.formatMessage({ id: 'settings.notification.noticeEmail.header.confirmText' })} />
                    </Flex>
                }
            >
                <div style={{marginLeft:"36px"}}>{intl.formatMessage({ id: 'settings.notification.noticeEmail.header.sendTestEmailTo' })}{textEmailInfo?.serviceEmail || ""}</div>
            </Modal>
        </Scoped>
    )
}

export default observer(Header);

const Scoped = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    background-color: #fff;
    .left{
        padding-left: 16px;
        width: 320px;
    }
    .right{
        margin-right: 16px;
    }
    .main{
        flex: 1;
        .icon{
            align-items: center;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            flex: 1 1;
            height: 38px;
            justify-content: center;
            outline: none;
            position: relative;
            transition: .5s;
            width: 38px;
        }
        .active{
            background-color: #f0f7ff;
        }
    }
`