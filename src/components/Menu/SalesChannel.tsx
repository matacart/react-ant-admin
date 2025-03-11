import { Button, Flex, List, Modal, Tooltip } from "antd"
import styled from "styled-components"
import { AddIcon, ExportIcon, NailIcon, RightIcon } from "../Icons/Icons"
import { ReactNode, useState } from 'react';
import { includes } from 'lodash';
import { EllipsisOutlined } from "@ant-design/icons";
import MyDropdown from "../Dropdown/MyDropdown";


function SalesChannel({dom}:{dom:ReactNode}){

    // const [
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [notSalesChannelList,setNotSalesChannelList] = useState([
        {
            id:1,
            title:"Telegram",
            imgUrl:"/icons/TelegramApp.svg",
            desc:"MataCart X Telegram使企业能够展现自己的品牌故事并增加产品曝光度 —— 您可以在消息中心挑选商品、透过消息模板发送商品给您的顾客，为顾客提供从浏览商品到完成购物都无须离开MataCart 的原生购物体验。"
        },
        {
            id:2,
            title:"贴文销售",
            imgUrl:"/icons/PostSellingApp.svg",
            desc:"社媒贴文营销助手，支持多平台贴文关键字抓取下单，提升贴文营销的订单转化率！"
        },
        {
            id:3,
            title:"Facebook",
            imgUrl:"/icons/FaceBookApp.svg",
            desc:"MataCart Facebook 应用：与全球 20 亿用户互动，让您的产品被更多人发现。"
        },
        {
            id:4,
            title:"Buy Button",
            imgUrl:"/icons/BuyButtonApp.svg",
            desc:"通过在页面嵌入BuyButton按钮，灵活地将店铺之外任何与客户的触点变成销售页面。"
        },
        {
            id:5,
            title:"Pinterest",
            imgUrl:"/icons/PinterestApp.svg",
            desc:"绑定您的企业账户，实现Pinterest渠道的数据上报以及商品同步，快速开启广告营销。"
        },
        {
            id:6,
            title:"Microsoft channel",
            imgUrl:"/icons/MicrosoftChannelApp.svg",
            desc:"绑定您的企业账户，实现 Microsoft 渠道的域名验证、数据上报以及商品同步，快速开启广告营销。"
        },
        {
            id:7,
            title:"TikTok",
            imgUrl:"/icons/TikTokApp.svg",
            desc:"快捷关联店铺和TikTok，支持店铺与TikTok For Business以及TikTok小店连接，快速开启TikTok广告营销。"
        },
        {
            id:8,
            title:"Multichannel Connect",
            imgUrl:"/icons/MultichannelConnectApp.svg",
            desc:"将多个渠道（Amazon/eBay/Shopee/Lazada等）无缝连接到您的SHOPLINE商店，并在一个应用程序中集中管理商品、订单和库存。"
        },
        {
            id:9,
            title:"POS-Point of Sale",
            imgUrl:"/icons/POSPointOfSaleApp.svg",
            desc:"通过线下门店进行商品销售，支持客户享受和线上同等的权益、折扣。"
        },
        {
            id:10,
            title:"Google",
            imgUrl:"/icons/GoogleApp.svg",
            desc:"绑定Google账户后，实现Google渠道的投放、广告ga数据上报、Google feed的内容。"
        },
        {
            id:11,
            title:"LINE",
            imgUrl:"/icons/LineApp.svg",
            desc:"连接LINE账号，可让客户用LINE账号登录并用LINE与您联系。"
        }
    ])

    const [salesChannelList,setSalesChannelList] = useState([
        {
            id:1,
            title:"在线商店",
            imgUrl:"/icons/OnlineStoreApp.svg",
        },
        {
            id:2,
            title:"消息中心",
            imgUrl:"/icons/MessageCenterApp.svg",
        },
    ])

    return (
        <Scoped>
            <Flex justify='space-between' align='center' style={{width:"100%"}} onClick={() => setIsModalOpen(true)}>
                <Flex className='font-12'>
                    {dom}
                    <RightIcon style={{fontWeight:600,fontSize:"14px"}} />
                </Flex>
                <AddIcon className='font-12 color-7A8499' />
            </Flex>

            {/* 渠道 */}
            <Modal title="添加销售渠道" styles={{content:{paddingRight:"10px"},body:{height:"calc(100vh - 160px)",overflowY:"auto",paddingRight:"12px"}}} width={480} centered open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
                <ScopedList>
                    <List className="sales-channel">
                        {notSalesChannelList.map(item=>{
                            return (
                                <List.Item>
                                    <Flex className="list-item-box" align="center">
                                        <div>
                                            <img width={25} height={25} src={item.imgUrl} />
                                        </div>
                                        <div className="list-item-content">
                                            <Flex className="title cursor-pointer color-242833">
                                                <div style={{marginRight:"6px"}} className="font-w-600">{item.title}</div>
                                                <ExportIcon className="font-18" />
                                            </Flex>
                                            <div className="font-12">{item.desc}</div>
                                        </div>
                                        <div>
                                        {/* style={{fontSize:"20px"}} */}
                                            <Button style={{width:"48px"}} type="primary" icon={<AddIcon style={{fontSize:"20px"}} />}></Button>
                                        </div>
                                    </Flex>
                                </List.Item>
                            )
                        })}
                    </List>
                    <div className="line-text color-474F5E">已添加的渠道可进行删除</div>
                    <List className="sales-channel">
                        {salesChannelList.map(item=>{
                            return (
                                <List.Item>
                                    <Flex className="list-item-box" align="center">
                                        <div>
                                            <img width={25} height={25} src={item.imgUrl} />
                                        </div>
                                        <div className="list-item-content">
                                            <Flex className="title cursor-pointer color-242833">
                                                <div style={{marginRight:"6px"}} className="font-w-600">{item.title}</div>
                                                <ExportIcon className="font-18" />
                                            </Flex>
                                        </div>
                                        <Flex className="list-item-controls" gap={8}>
                                            <Tooltip title="将应用订到导航上">
                                                <Flex justify="center" className="icon-box cursor-pointer"><NailIcon /></Flex>
                                            </Tooltip>
                                            <MyDropdown
                                                component={<Flex justify="center" className="icon-box cursor-pointer"><EllipsisOutlined /></Flex>}
                                                itemList={[
                                                    {
                                                        key: "1", label: (
                                                            <div onClick={() => { } } className="color-FF0000">卸载</div>
                                                        )
                                                    }
                                                ]} 
                                                styled={undefined}
                                                position={undefined}
                                            />
                                        </Flex>
                                    </Flex>
                                </List.Item>
                            )
                        })}
                    </List>
                </ScopedList>
                
                
            </Modal>
        </Scoped>
    )

}

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