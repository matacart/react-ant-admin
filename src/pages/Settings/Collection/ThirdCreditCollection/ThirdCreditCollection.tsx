import { ArrowLeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons"
import { Card, Flex, Form, Input, List, message, TabsProps, Upload } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { getAddonsList } from "@/services/y2/api";
import LangSelect from "@/pages/components/LangSelect";

function ThirdCreditCollection() {

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [supportPayments,setSupportPayments] = useState<any>([]);

    const [language,setLanguage] = useState("2");

    const setLang = (lang:string) => {
        getAddonsList(lang,"1","1").then(res=>{
            setSupportPayments(res.data)
            setLanguage(lang)
        }).catch(err=>{
        }).finally(()=>{
        })
    }

    useEffect(()=>{
        getAddonsList(language,"1","1").then(res=>{
            setSupportPayments(res.data)
        }).catch(err=>{
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[])



    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/payments")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">信用卡/借记卡收款</div>
                        </div>
                        <div className="mc-header-right">
                            {/* 语言 */}
                            <LangSelect lang={language} setLang={setLang} />
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <Card classNames={{body:"card"}}>
                                <div style={{margin:"20px"}}>
                                    <Input prefix={<SearchOutlined />} style={{minWidth:"100px"}} placeholder="搜索支付服务提供商" />
                                    <List className="payment-list">
                                        {supportPayments.map((item:any)=>(
                                            <List.Item className="payment-item" onClick={()=>{
                                                if(item.addons_config_id == ""){
                                                    history.push('/settings/payments/thirdCreditCard/add?addonsId='+item.id+"&lang="+language)
                                                }else{
                                                    // 编辑
                                                    history.push('/settings/payments/thirdCreditCard/detail?addonsId='+item.id+"&id="+item.addons_config_id+"&lang="+language)
                                                }
                                            }}
                                            >
                                                <Flex align="center">
                                                    <div style={{marginRight:"8px"}} className="font-w-600">{item.title}</div>
                                                </Flex>
                                                <Flex>
                                                    <RightOutlined style={{marginLeft:8}} />
                                                </Flex>
                                            </List.Item>
                                        ))}
                                    </List>
                                    <div style={{textAlign:"center",marginTop:20}} className="color-7A8499">没有合适的服务商？请联系您的客服经理</div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default ThirdCreditCollection

const Scoped = styled.div`

.mc-layout-wrap{
    display: flex;
    justify-content: center;
    min-width: 510px;
    .mc-layout {
        width: 100%;
        max-width: 880px;
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
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .card{
                padding: 0;
                .payment-list{
                    margin-top: 20px;
                    border: 1px solid #eef1f6;
                    border-radius: 6px;
                    .payment-item{
                        display: flex;
                        height: 65px;
                        justify-content: space-between;
                        padding:12px 24px;
                    }
                    .payment-item:hover{
                        background-color: #f0f7ff;
                        cursor: pointer;
                    }
                }
            }

        }
        
    }
}
`