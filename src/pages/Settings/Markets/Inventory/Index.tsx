import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history, useParams } from "@umijs/max";
import { App, Flex } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getInventoryLocationList, getMarketDetail, getMarketInventory, getMarketPriceRule, getMarketProductList, updateMarketInventory } from "@/services/y2/apiSaleMarket";
import { observer } from "mobx-react-lite";
import LangSelect from "@/components/Select/LangSelect";
import InventoryCard from "./InventoryCard";
import PrimaryButton from "@/components/Button/PrimaryButton";
import inventory from "@/store/settings/markets/inventory";
import LocationList from "./LocationList";


export interface InventoryLocation{
    locationId:string,
    locationName:string,
}


function Index() {

    const { marketId="", langId="" } = useParams();

    const [isSkeleton, setIsSkeleton] = useState(true);

    const { message } = App.useApp();

    const [loading, setLoading] = useState(false);

    const [inventoryLocationList, setInventoryLocationList] = useState<InventoryLocation[]>([]);

    const submit = () => {
        if(inventory.inventoryConfig.status == 1 && inventoryLocationList.length == 0){
            message.error("请选择指定库存地点");
            return;
        }
        setLoading(true);
        updateMarketInventory({
            languages_id:langId,
            marketId:marketId,
            status:inventory.inventoryConfig.status,
            locationIds:JSON.stringify(inventory.inventoryConfig?.locationIds || []),
        }).then(()=>{
            message.success("更新成功");
        }).catch(()=>{}).finally(()=>{
            setLoading(false);
        })
    }

    // 初始化数据
    useEffect(() => {
        Promise.allSettled([
            getMarketInventory({
                languages_id:langId,
                marketId:marketId,
            }),
            getInventoryLocationList({
                languages_id:langId,
                marketId:marketId,
            }),
        ]).then(([marketInventory,inventoryLocationList])=>{
            marketInventory.status == "fulfilled" && inventory.setInventoryConfig(marketInventory.value.data || {});
            inventoryLocationList.status == "fulfilled" && setInventoryLocationList(inventoryLocationList.value.data?.locationList || []);
        }).catch(()=>{}).finally(()=>{
            setIsSkeleton(false);
        })
    }, [langId])

    return (
            <Scoped>
                {isSkeleton?<SkeletonCard />:<Flex className='mc-layout-wrap' align="center">
                    <div className="mc-layout">
                        <Flex className="mc-header" justify="space-between">
                            <Flex className="mc-header-left">
                                <div className="mc-header-left-secondary" onClick={()=>history.push(`/settings/markets/${marketId}/${langId}`)}>
                                    <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                </div>
                                <div style={{marginLeft:"12px"}}>
                                    <div className="font-20 font-w-500">{"库存"}</div>
                                    {/* <div style={{marginTop:"4px"}} className="font-12 font-w-400">{names(domainAndLang.otherInfo?.countryInfoList || [])}</div> */}
                                </div>
                            </Flex>
                            <Flex align="center">
                                <LangSelect lang={langId} setLang={(lang:string)=>history.push(`/settings/markets/inventory/${marketId}/${lang}`)} />    
                            </Flex>
                        </Flex>
                        {/* 主要内容 */}
                        <Flex gap={20} vertical>
                            <InventoryCard />
                            {inventory.inventoryConfig.status == 1 && <LocationList inventoryLocationList={inventoryLocationList} /> }
                        </Flex>
                        <Flex justify="right" className="submit-btn">
                            <PrimaryButton loading={loading} text="更新" onClick={submit}  />
                        </Flex>
                    </div>
                </Flex>}
            </Scoped>
        )
}

const Scoped = styled.div`
    .mc-layout-wrap{
        min-width: 510px;
        .mc-layout {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            .mc-header {
                color: rgb(36, 40, 51);
                margin: 8px 0px 24px;
                .mc-header-left-secondary {
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
                .mc-header-left-content {
                    margin-left: 12px;
                    font-size: 20px;
                }
            }
            .submit-btn {
                margin-top: 24px;
            }
        }
    }
`

export default observer(Index);
