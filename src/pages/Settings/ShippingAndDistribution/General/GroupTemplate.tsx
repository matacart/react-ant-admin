import DefaultButton from "@/components/Button/DefaultButton"
import { FoldIcon, PositionIcon, ReceiveGoodsIcon, UnfoldIcon } from "@/components/Icons/Icons"
import { Divider, Flex, List, Table } from "antd"
import generalFreight, { AreaPlan, ChangeDeliveryLocationGroup, ProductGroup } from "@/store/settings/ShippingAndDistribution/generalFreight"
import { useEffect, useMemo, useState } from "react"
import { EllipsisOutlined, EnvironmentOutlined } from "@ant-design/icons"
import styled from "styled-components"
import AddDeliveryLocationModal from "./AddDeliveryLocationModal"
import MyDropdown from "@/components/Dropdown/MyDropdown"
import MyButton from "@/components/Button/MyButton"
import DelAreaModal from "./DelAreaModal"
import { observer } from "mobx-react-lite"
import SetAreaModal from "./SetAreaModal"
import ShippingList from "./ShippingList"
import SetShoppingModal from "./SetShoppingModal"

// 查找国家

function GroupTemplate({deliveryLocationGroup}:{deliveryLocationGroup:ProductGroup}) {

    const [isExpansionDetails, setIsExpansionDetails] = useState(false);

    const [data,setData] = useState<any[]>([]);

    useEffect(()=>{
        setIsExpansionDetails(false)
        setData(deliveryLocationGroup.deliveryLocationSeqs.map((id:string)=>generalFreight.locationList[id]));
    },[deliveryLocationGroup.deliveryLocationSeqs])

    const areaPlanData = useMemo(()=>{
        return deliveryLocationGroup.areaPlanList || []
    },[deliveryLocationGroup.areaPlanList])

    return (
        <Scoped>
            <Flex justify="space-between">
                <Flex align="center">
                    <div className="position-box">
                        <PositionIcon className="font-20 color-356DFF" />
                    </div>
                    <div>发货地址</div>
                </Flex>
                <div>
                    <AddDeliveryLocationModal deliveryLocation={deliveryLocationGroup} />
                </div>
            </Flex>
            <Flex className="color-474F5E" style={{margin:"12px 0"}}>
                <div style={{marginRight:"8px"}}>{deliveryLocationGroup.defaultTag ? "全部地点(排除其他分组的发货地址)":`${deliveryLocationGroup.deliveryLocationSeqs.length}个地点`}</div>
                {!isExpansionDetails && <Flex align="center" className="cursor-pointer" onClick={()=>setIsExpansionDetails(true)} ><span className="color-356DFF">查看详情</span><UnfoldIcon className="font-20" /></Flex>} 
            </Flex>
            {isExpansionDetails && <>
                <List className="list" dataSource={data} renderItem={(item) => {
                    const addressParts = [item.detailed_address,item.address,item.district,item.city,item.country].filter(Boolean);
                    return (
                        <List.Item key={item.id}>
                            <Flex className="location-box">
                                <div className="location" style={{width:"48px",height:"48px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <EnvironmentOutlined className="font-24 color-7A8499" />
                                </div>
                                <Flex justify="center" vertical gap={4}>
                                    <div className="font-14 font-w-500">{item.name}</div>
                                    <div className="font-12">{addressParts.join("，") || "\u00A0"}</div>
                                </Flex>
                            </Flex>
                        </List.Item>
                    )
                }}>
                </List>
                <Flex align="center" className="cursor-pointer" onClick={()=>setIsExpansionDetails(false)}><span className="color-356DFF">隐藏详情</span><FoldIcon className="font-20" /></Flex>
            </>}
            <Divider />
            {/* 收货 */}
            <>
                <Flex justify="space-between">
                    <Flex align="center">
                        <div className="position-box">
                            <ReceiveGoodsIcon className="font-20 color-356DFF" />
                        </div>
                        <div>收货地址</div>
                    </Flex>
                    <SetAreaModal deliveryLocationGroup={deliveryLocationGroup} />
                </Flex>
                <List className="region-list" dataSource={areaPlanData} renderItem={(item) => {
                    const { shippingRegionSeq,shippingName,shippingAreas,deliveryPlans } = item
                    return (
                        <List.Item key={shippingRegionSeq} className="region-list-item">
                            <div style={{width:"100%"}}>
                                <Flex justify="space-between" align="center">
                                    <div>
                                        <div className="font-14 font-w-500">{shippingName}</div>
                                        <div style={{marginTop:"4px"}}>配送至：{123}</div>
                                    </div>
                                    <Flex gap={12} align="center">
                                        <SetShoppingModal deliveryLocationGroupSeq={deliveryLocationGroup?.deliveryLocationGroupSeq} areaPlan={item} />
                                        <MyDropdown
                                            tiggerEle={<MyButton style={{height:"36px"}} text={<EllipsisOutlined />}></MyButton>}
                                            menu={{
                                                items:[
                                                    {
                                                        key: "1", label: <SetAreaModal deliveryLocationGroup={deliveryLocationGroup} areaPlan={item} />
                                                    },
                                                    {
                                                        key: "2", label: <DelAreaModal deliveryLocationGroup={deliveryLocationGroup} areaPlan={item} />
                                                    }
                                                ]
                                            }}
                                        />
                                    </Flex>
                                </Flex>
                                <ShippingList />
                            </div>
                        </List.Item>
                    )
                }}>
                </List>
            </>
        </Scoped>
    )
}

const Scoped = styled.div`
    .list{
        margin: 12px 0;
    }
    .region-list{
        /* .region-list-item{
            margin-bottom: 12px;
        } */
    }
`

export default observer(GroupTemplate)