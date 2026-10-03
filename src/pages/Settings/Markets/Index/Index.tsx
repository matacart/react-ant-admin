import { ArrowLeftOutlined, ExportOutlined } from "@ant-design/icons"
import { Flex } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react";
import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { history } from "@umijs/max";
import MarketsList from "./MarketsList";
import marketsList from "@/store/settings/markets/marketsList";
import { getMarketList } from "@/services/y2/apiSaleMarket";
import { observer } from "mobx-react-lite";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultButton from "@/components/Button/DefaultButton";

function Index() {

    const [isSkeleton,setIsSkeleton] = useState(true);

    useEffect(()=>{
        getMarketList({
            languages_id:marketsList.languagesId,
        }).then(res=>{
            marketsList.setMarketList(res.data?.marketInfoList || []);
        }).catch(()=>{
        }).finally(()=>{
            setIsSkeleton(false);
        })
    },[marketsList.languagesId])


    useEffect(()=>{
        return ()=>{
            marketsList.reset();
        }
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>{
                                history.push("/settings/index")
                            }}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">市场</div>
                        </div>
                        <Flex gap={12}>
                            <DefaultButton onClick={() => {}} text="偏好设置" />
                            <PrimaryButton onClick={() => {}} text="创建市场" />
                        </Flex>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <MarketsList />
                            <div style={{textAlign:"center"}}>
                                <span>详细了解 </span>
                                <span><a href='' target='_blank'>市场 <ExportOutlined /></a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}

export default observer(Index)

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
            
            .card{
                padding: 0;
                .list{
                    border: 1px solid #eef1f6;
                    border-radius: 4px;
                    margin: 20px;
                    margin-bottom: 40px;
                }
            }
            .divider{
                margin:0px;
            }
            .item{
                min-height: 90px;
                cursor: pointer;
                .item-icon{
                    width: 54px;
                    height: 36px;
                    line-height: 36px;
                    background: linear-gradient(111.34deg, rgb(56, 88, 201) 0%, rgb(89, 55, 188) 100%);
                    font-size: 18px;
                    min-width: 54px;
                    color: #FFFFFF;
                    text-align: center;
                    align-items: center;
                    border-radius: 4px;
                }
                .item-tag{
                    border: 1px solid #d7dbe7;
                    font-size: 12px;
                    border-radius: 10px;
                    padding: 2px 8px;
                    margin-left: 12px;
                }
                .item-right{
                    flex: 1;
                    justify-content: flex-end;
                    gap: 20px;
                    .item-right-content{
                        align-items: center;
                        min-width: 220px;
                    }
                }
            }
            .item:hover{
                background-color: #f0f7ff;
            }
        }
    }
}
`