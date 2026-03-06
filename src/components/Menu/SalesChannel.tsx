import { Button, Flex, List, message, Modal, Spin, Tooltip } from "antd";
import styled from "styled-components";
import { AddIcon, ExportIcon, NailIcon, PinFiledIcon, RightIcon } from "../Icons/Icons";
import { ReactNode, useState, forwardRef, useEffect } from 'react';
import MyDropdown from "../Dropdown/MyDropdown";
import { getSaleChannelList, installSaleChannel, pinSaleChannel, uninstallSaleChannel } from "@/services/y2/api";
import { history, useIntl, useLocation } from "@umijs/max";
import { languageMap } from "@/locales/langMap";
import { EllipsisOutlined, ExclamationCircleFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import channels from "@/store/menu/channels";
import DefaultButton from "../Button/DefaultButton";
import DangerButton from "../Button/DangerButton";

interface salesChannelItem {
    id:string;
    appKey:string;
    isInstalled:boolean;
    channelName:string;
    channelHandle:string;
    menuLogo:string;
    domainAppId:string;
    isPinned:boolean;
    sort:number;
}


const SalesChannel = forwardRef<any, {dom:ReactNode}>(({dom}, ref) => {

    const intl = useIntl();
    const lang = languageMap[intl.locale];

    const location = useLocation();

    const [loading,setLoading] = useState(false);

    // const [
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [salesChannelList,setSalesChannelList] = useState<salesChannelItem[]>([]);

    const [notSalesChannelList,setNotSalesChannelList] = useState<salesChannelItem[]>([])

    // 安装渠道应用
    const installChannel = (sales:salesChannelItem)=>{
        setLoading(true);
        installSaleChannel(sales.id).then((res)=>{
            if(res.code == 0){
                setIsModalOpen(false);
                history.push(`/channels/${sales.channelHandle}`);
            }else{
                message.error(res.msg);
            }
        }).finally(()=>{
            setLoading(false);
        })
    }

    // 卸载渠道应用
    const uninstallChannelModal = (sales:salesChannelItem)=>{
        setIsModalOpen(false);
        const confirm = Modal.confirm({
            icon: <ExclamationCircleFilled style={{color:"#F86140"}} />,
            title: `确认卸载${JSON.parse(sales.channelName)[lang]}吗？`,
            content: "卸载前，请确认您已处理完所有待办内容，如有需要，您可再次安装使用。",
            centered:true,
            footer:()=>(
                <Flex justify="end" gap={12}>
                    <DefaultButton loading={loading} onClick={()=>confirm.destroy()} text="取消" />
                    <DangerButton loading={loading} onClick={()=>{
                        setLoading(true);
                        uninstallSaleChannel(sales.domainAppId).then((res)=>{
                            if(res.code == 0){
                                confirm.destroy();
                                channels.setChannelList(channels.channelList.filter((item:any)=>item.appId != sales.id));
                                if(`/channels/${sales.channelHandle}` == location.pathname){
                                    history.push(`/`);
                                }
                            }else{
                                message.error(res.msg);
                            }
                        }).finally(()=>{
                            setLoading(false);
                        })
                    }} text="卸载" />
                </Flex>
            )
        })

        
    }

    // 订到导航 is_pinned : 1 订到导航 0 取消订到导航
    const pinChannel = (sales:salesChannelItem)=>{
        // setLoading(true);
        pinSaleChannel({
            domain_app_id:sales.domainAppId,
            is_pinned:sales.isPinned ? "0" : "1",
        }).then((res)=>{
            if(res.code == 0){
                message.success("成功");
                setSalesChannelList(salesChannelList.map((item)=>item.id == sales.id ? {...item,isPinned:!item.isPinned} : item));
                // channels
                sales.isPinned ? channels.setChannelList(channels.channelList.filter((item:any)=>item.appId != sales.id)) : channels.setChannelList([...channels.channelList,{
                    ...sales,
                    appId:sales.id
                }]);
            }else{
                message.error(res.msg);
            }
        }).finally(()=>{
            // setLoading(false);
        })
    }

    const init = ()=>{
        setLoading(true);
        getSaleChannelList().then((res)=>{
            if(res?.code == 0){
                let channelList: salesChannelItem[] = [];
                let noChannelList: salesChannelItem[] = [];
                res.data?.channels?.map((item:salesChannelItem)=>{
                    item.isInstalled ? channelList.push(item) : noChannelList.push(item);
                })
                setSalesChannelList(channelList);
                setNotSalesChannelList(noChannelList);
            }
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    return (
        <Scoped>
            <Flex justify='space-between' align='center' style={{width:"100%"}} onClick={() => {
                setIsModalOpen(true);
                init();
                // test()
            }}>
                <Flex className='font-12'>
                    {dom}
                    <RightIcon style={{fontWeight:600,fontSize:"14px"}} />
                </Flex>
                <AddIcon className='font-12 color-7A8499' />
            </Flex>

            {/* 渠道 */}
            <Modal title="添加销售渠道" styles={{content:{paddingRight:"10px"},body:{height:"calc(100vh - 160px)",overflowY:"auto",paddingRight:"12px"}}} width={480} centered open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
                <ScopedList>
                    <Spin spinning={loading}>
                        <List className="sales-channel">
                        {notSalesChannelList.map((item,index)=>{
                            if(!item?.channelName){
                                return <></>
                            }
                            const name = JSON.parse(item.channelName)[lang];
                            return (
                                <List.Item key={index}>
                                    <Flex className="list-item-box" align="center">
                                        <div>
                                            <img width={25} height={25} src={item.menuLogo} />
                                        </div>
                                        <div className="list-item-content">
                                            <Flex className="title cursor-pointer color-242833">
                                                <div style={{marginRight:"6px"}} className="font-w-600">{name}</div>
                                                <ExportIcon className="font-18" />
                                            </Flex>
                                            {/* <div className="font-12">{item.desc}</div> */}
                                        </div>
                                        <div>
                                        {/* style={{fontSize:"20px"}} */}
                                            <Button style={{width:"48px"}} type="primary" icon={<AddIcon style={{fontSize:"20px"}}/>} onClick={()=>installChannel(item)}></Button>
                                        </div>
                                    </Flex>
                                </List.Item>
                            )
                        })}
                        </List>
                        <div className="line-text color-474F5E">已添加的渠道可进行删除</div>
                        <List className="sales-channel">
                            {salesChannelList.map((item,index)=>{
                                if(!item?.channelName){
                                    return <></>
                                }
                                const name = JSON.parse(item.channelName)[lang];
                                return (
                                    <List.Item key={index}>
                                        <Flex className="list-item-box" align="center">
                                            <div>
                                                <img width={25} height={25} src={item.menuLogo} />
                                            </div>
                                            <div className="list-item-content">
                                                <Flex className="title cursor-pointer color-242833">
                                                    <div style={{marginRight:"6px"}} className="font-w-600">{name}</div>
                                                    <ExportIcon className="font-18" />
                                                </Flex>
                                            </div>
                                            <Flex className="list-item-controls" gap={8}>
                                                <Tooltip title="将应用订到导航上">
                                                    {/* {isPinned} */}
                                                    <Flex justify="center" className="icon-box cursor-pointer" onClick={()=>pinChannel(item)}>
                                                        {item.isPinned ?<PinFiledIcon style={{color:"#E07000"}} />:<NailIcon />}
                                                    </Flex>
                                                </Tooltip>
                                                <MyDropdown
                                                    tiggerEle={<Flex justify="center" className="icon-box cursor-pointer"><EllipsisOutlined /></Flex>}
                                                    menu={{
                                                        items:[
                                                            {
                                                                key: "1", label: (
                                                                    <div onClick={() => uninstallChannelModal(item)} className="color-FF0000">卸载</div>
                                                                )
                                                            }
                                                        ]
                                                    }}
                                                />
                                            </Flex>
                                        </Flex>
                                    </List.Item>
                                )
                            })}
                        </List>
                    </Spin>
                </ScopedList>
            </Modal>



        </Scoped>
    )
});

export default SalesChannel

const Scoped = styled.div`
    width: 100%;
    .ant-modal-content{
        padding-right: 10px;
    }
`

const ScopedList = styled.div`
    width: 100%;
    .sales-channel{
        .ant-list-item{
            padding: 10px 0;
        }
        .list-item-box{
            /* margin: 10px 0; */
            width: 100%;
            .list-item-content{
                flex:1;
                margin: 0 14px;
                .title:hover{
                    color: #356DFF;
                }
            }
            .list-item-controls{
                .icon-box{
                    font-size: 16px;
                    width: 24px;
                    height: 24px;
                }
                .icon-box:hover{
                    width: 24px;
                    height: 24px;
                    border-radius: 2px;
                    background-color: #e2f0ff;
                }
            }
        }
        
    }
    .line-text{
        padding: 10px 0;
        border-top: 1px solid #eef1f6
    }

    
`