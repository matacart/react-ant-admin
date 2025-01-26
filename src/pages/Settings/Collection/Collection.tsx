import { getAddWarehouseList, getFileList, getStoreInfo } from "@/services/y2/api"
import { ArrowLeftOutlined, EnvironmentOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import { Button, Card, Divider, Flex, Form, Input, message, Select, Skeleton, Upload } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react"
import baseInfoStore from "@/store/set-up/baseInfoStore"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import cookie from 'react-cookies';
import CollectionAccountCard from "./CollectionAccountCard"

function Collection() {

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [isRenewal,setIsRenewal] = useState(false)

    useEffect(()=>{
        baseInfoStore.getStore().then(res=>{
            setIsSkeleton(!res)
        })
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>history.push("/settings/index")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">收款</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">

                            </div>
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                            <div className='mc-layout-content'>
                                <CollectionAccountCard />
                            </div>
                            <div className='mc-layout-extra'>
                            
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
                        <Button type="primary" style={{height: "36px"}} loading={isRenewal} onClick={()=>{
                            setIsRenewal(true)
                            baseInfoStore.setStore().then(res=>{
                                if(res.code==0){
                                    cookie.save('timeZone', JSON.stringify(JSON.parse(sessionStorage["timezones"]).filter(item=>item.id == baseInfoStore.timezone)[0]), { path: '/' });
                                    message.success('更新成功')
                                }else{
                                    message.error('更新失败')
                                }
                                setIsRenewal(false)
                            })
                        }}>更新</Button>
                    </div>
                </div>
            </div>}
            {/* <OverlayEdit /> */}
        </Scoped>
    )
}
export default Collection

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
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
    
            &-right {
                display: flex;
                align-items: center;
                width: 70px;
                > .selector{
                    height: 36px;
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
            gap:20px

        }

        &-extra {
            flex:1;
            min-width: 285px;
            display: flex;
            flex-direction: column;
            gap:20px;
            .ant {
                &-card {
                    background-color: #f7f8fb;
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