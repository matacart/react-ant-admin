import { ArrowLeftOutlined, ExportOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Flex, List, TabsProps } from "antd"
import { history } from "@umijs/max"
import styled from "styled-components"
import ApplicableGoods from "./ApplicableGoods"
import ManagementGroup from "./ManagementGroup"
import { useEffect, useState } from "react"
import { getDeliveryList } from "@/services/y2/api"
import generalFreight from "@/store/settings/ShippingAndDistribution/generalFreight"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import LangSelect from "@/pages/components/LangSelect"
import { observer } from "mobx-react-lite"



function EditCustomLogistics() {

    const [isSkeleton,setIsSkeleton] = useState(true)
    const setLang = (lang:string)=>{
        getDeliveryList(lang).then(res=>{
            generalFreight.setDeliverys(res.data)
            generalFreight.setDeliverysLanguage(lang)
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
        })
    }

    useEffect(()=>{
        generalFreight.setDeliverysLanguage("2")
        getDeliveryList("2").then(res=>{
            generalFreight.setDeliverys(res.data)
        }).catch(err=>{
            console.log(err)
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
                                history.push("/settings/delivery")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">通用运费设置</div>
                        </div>
                        <div className="mc-header-right">
                            {/* 语言 */}
                            <LangSelect lang={generalFreight.deliverysLanguage} setLang={setLang} />
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <ApplicableGoods />
                            <ManagementGroup />
                        </div>
                    </div>
                    {/* <Divider className="divider" />
                    <div className="submit-btn">
                        <Button type="primary" style={{height: "36px"}} loading={false} onClick={()=>{
                        }}>更新</Button>
                    </div> */}
                </div>
            </div>}
        </Scoped>
    )
}

export default observer(EditCustomLogistics)

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

        }
        .submit-btn{
            display: flex;
            justify-content: right;
        }
    }
}
`