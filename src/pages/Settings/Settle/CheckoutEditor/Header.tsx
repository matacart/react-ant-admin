
import { BackIcon, DesktopIcon, DownIcon, EditorHomeIcon, EditorRedoIcon, EditorRevokeIcon, MobileIcon } from '@/components/Icons/Icons';
import { getStoreInfo } from '@/services/y2/api';
import { Flex, App, Tooltip, Modal, Dropdown, Space } from 'antd';
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

const style: React.CSSProperties = {
    width: 220,
    padding: "6px 0",
    maxHeight:"350px",
};

function Header({spinning,setSpinning}:{spinning:boolean,setSpinning:(value:boolean) => void}) {
    
    const intl = useIntl();

    const { modal, message } = App.useApp();

    const dropdownContainerRef = useRef<HTMLDivElement>(null);

    // 店铺语言
    const [languages,setLanguages] = useState([]);

    const [menuOpen, setMenuOpen] = useState(false);

    // 页面
    const [items,setItems] = useState<any[]>([
        {
            key: '1',
            label: <span onClick={()=>{
                setActiveItem("结账页面");
            }}>结账页面</span>
        },
        {
            key: '2',
            label: <span onClick={()=>{
                setActiveItem("订单状态页面");
            }}>订单状态页面</span>
        }
    ]); 

    const [activeItem,setActiveItem] = useState("结账页面");

    // 切换语言
    const setLang = (value:string) => {
        noticeEmail.setLanguagesId(value);
        noticeEmail.setActiveSectionID("");
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
    },[intl.locale]);


    return(
        <Scoped ref={dropdownContainerRef} className='font-14'>
            {/* left */}
            <Flex className='left' justify="space-between">
                <Flex>
                    <Flex style={{width:'50px'}} justify='center'>
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
                                                history.push(`/settings/settle`);
                                            }} />
                                        </Flex>
                                    )
                                });
                            }} />
                        </Tooltip>
                    </Flex>
                    <div>结账编辑器</div>
                </Flex>
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
                    <Dropdown open={menuOpen} menu={{ items,style }} trigger={["click"]} placement="bottomLeft" onOpenChange={(open) => {
                        setMenuOpen(open)
                    }}>
                        <Space style={{marginRight:"20px",height:"100%"}}>
                            <Flex align='center' gap={8} className='cursor-pointer'>
                                <div>{activeItem}</div>
                                <DownIcon className={menuOpen?'rotated-up':'rotated-down'} />
                            </Flex>
                        </Space>
                    </Dropdown>
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
                <DefaultButton text={"查看店铺"} onClick={()=>{}} />
                <PrimaryButton loading={spinning} text={"保存"} onClick={submit} />
            </Flex>
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