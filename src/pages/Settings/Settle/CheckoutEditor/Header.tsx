
import { BackIcon, DesktopIcon, DownIcon, EditorRedoIcon, EditorRevokeIcon, MobileIcon } from '@/components/Icons/Icons';
import { Flex, App, Tooltip, Dropdown, Space } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { history, useIntl } from '@umijs/max';
import MySelect from '@/components/Select/MySelect';
import { ExclamationCircleFilled } from '@ant-design/icons';
import DefaultButton from '@/components/Button/DefaultButton';
import DangerButton from '@/components/Button/DangerButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import MinLang from '@/components/Lang/MinLang';
import checkoutEditor from '@/store/settings/settle/checkoutEditor';
import { setCheckoutEditorConfig } from '@/services/y2/apiCheckout';
import { toJS } from 'mobx';

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
    const [items,setItems] = useState<any[]>([]); 

    // 切换语言
    const setLang = (value:string) => {
        checkoutEditor.setLanguagesId(value);
    }
    // 保存模板
    const submit = ()=>{
        setSpinning(true);
        setCheckoutEditorConfig({
            languages_id:checkoutEditor.languagesId,
            profile_id:checkoutEditor.profileId,
            config:JSON.stringify(checkoutEditor.config),
            is_preview:"1",
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

    useEffect(() => {
        setItems([
            {
                key: '1',
                label: <span className='font-12'>{intl.formatMessage({id:'settings.settle.checkoutEditor.header.checkout'})}</span>,
                type: 'group',
                children: [
                    {
                        key: '1-1',
                        label: <span className={checkoutEditor.activeItem.key === "1-1"?"color-356DFF":""} onClick={()=>{
                            checkoutEditor.setActiveItem({
                                key:"1-1",
                                label:"checkoutPage",
                            });
                        }}>{intl.formatMessage({id:'settings.settle.checkoutEditor.header.checkoutPage'})}</span>,
                    },
                    {
                        key: '1-2',
                        label: <span className={checkoutEditor.activeItem.key === "1-2"?"color-356DFF":""} onClick={()=>{
                            checkoutEditor.setActiveItem({
                                key:"1-2",
                                label:"orderStatusPage",
                            });
                        }}>{intl.formatMessage({id:'settings.settle.checkoutEditor.header.orderStatusPage'})}</span>,
                    }
                ]
            },
            {
                key: '2',
                label: <span className='font-12'>{intl.formatMessage({id:'settings.settle.checkoutEditor.header.newCustomerCenter'})}</span>,
                type: 'group',
                children: [
                    {
                        key: '2-1',
                        label: <span className={checkoutEditor.activeItem.key === "2-1"?"color-356DFF":""} onClick={()=>{
                            checkoutEditor.setActiveItem({
                                key:"2-1",
                                label:"loginRegister",
                            });
                        }}>{intl.formatMessage({id:'settings.settle.checkoutEditor.header.loginRegister'})}</span>,
                    },
                    {
                        key: '2-2',
                        label: <span className={checkoutEditor.activeItem.key === "2-2"?"color-356DFF":""} onClick={()=>{
                            checkoutEditor.setActiveItem({
                                key:"2-2",
                                label:"personalCenterPage",
                            });
                        }}>{intl.formatMessage({id:'settings.settle.checkoutEditor.header.personalCenterPage'})}</span>,
                    }
                ]
            }
        ]);
    }, [checkoutEditor.activeItem.key,intl.locale]);

    useEffect(()=>{
        const languagesList = JSON.parse(sessionStorage.getItem("languages") || "[]");
        setLanguages(languagesList.map((item:any) => {
            return {
                label:item.name,
                value:item.id,
            }
        }));
    },[]);

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
                    <div>{intl.formatMessage({id:'settings.settle.checkoutEditor.header.title'})}</div>
                </Flex>
                <Flex className='operation_warp' style={{paddingRight:"20px"}} gap={12} align='center'>
                    <Tooltip title={intl.formatMessage({id:'theme.design.header.undo'})} placement="right">
                        <EditorRevokeIcon className={`font-20 cursor-pointer ${checkoutEditor.operationHistory.length == 0 ? 'opacity_6':''}`} onClick={()=>{
                            const lastOperation = checkoutEditor.getLastOperation();
                            if(lastOperation){
                                setCheckoutEditorConfig({
                                    languages_id:checkoutEditor.languagesId,
                                    profile_id:checkoutEditor.profileId,
                                    config:JSON.stringify(lastOperation.undoData),
                                    is_preview:"0",
                                }).then((res)=>{
                                    if(res.code == "0"){
                                        checkoutEditor.setConfig(toJS(lastOperation.undoData));
                                        checkoutEditor.removeLastOperation();
                                    }
                                })
                            }
                        }} />
                    </Tooltip>
                    <Tooltip title={intl.formatMessage({id:'theme.design.header.redo'})} placement="right">
                        <EditorRedoIcon className={`font-20 cursor-pointer ${checkoutEditor.redoHistory.length == 0 ? 'opacity_6':''}`} onClick={()=>{
                            const lastOperation = checkoutEditor.getLastRedoOperation();
                            if(lastOperation){
                                setCheckoutEditorConfig({
                                    languages_id:checkoutEditor.languagesId,
                                    profile_id:checkoutEditor.profileId,
                                    config:JSON.stringify(lastOperation.redoData),
                                    is_preview:"0",
                                }).then((res)=>{
                                    if(res.code == "0"){
                                        checkoutEditor.setConfig(toJS(lastOperation.redoData));
                                        checkoutEditor.removeLastRedoOperation();
                                    }
                                })
                            }
                        }} />
                    </Tooltip>
                </Flex>
            </Flex>
            {/* content */}
            <MySelect style={{width:120}} value={checkoutEditor.languagesId} onChange={setLang} options={languages}  />
            <Flex className='main' justify='center'>
                <Flex align='center'>
                    <Dropdown open={menuOpen} menu={{ items,style }} trigger={["click"]} placement="bottomLeft" onOpenChange={(open) => {
                        setMenuOpen(open)
                    }}>
                        <Space style={{marginRight:"20px",height:"100%"}}>
                            <Flex align='center' gap={8} className='cursor-pointer'>
                                <div>{intl.formatMessage({id:`settings.settle.checkoutEditor.header.${checkoutEditor.activeItem.label}`})}</div>
                                <DownIcon className={menuOpen?'rotated-up':'rotated-down'} />
                            </Flex>
                        </Space>
                    </Dropdown>
                    <div className={checkoutEditor.device == 'pc' ? 'icon active' : 'icon'} onClick={()=>{checkoutEditor.setDevice('pc')}}>
                        <DesktopIcon />
                    </div>
                    <div className={checkoutEditor.device == 'mobile' ? 'icon active' : 'icon'} onClick={()=>{checkoutEditor.setDevice('mobile')}}>
                        <MobileIcon />
                    </div>
                </Flex>
            </Flex>
            {/* right */}
            <Flex className='right' align='center' justify="flex-end" gap={12}>
                <MinLang />
                <DefaultButton text={intl.formatMessage({id:'settings.settle.checkoutEditor.header.preview'})} onClick={()=>{}} />
                <PrimaryButton loading={spinning} text={intl.formatMessage({id:'settings.settle.checkoutEditor.header.save'})} onClick={submit} />
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
        width: 350px;
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
    .operation_warp{
        .opacity_6{
            opacity: 0.6;
        }
    }

`