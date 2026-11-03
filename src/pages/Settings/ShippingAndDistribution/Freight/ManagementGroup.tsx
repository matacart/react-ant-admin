import { DeleteIcon, UnfoldIcon } from "@/components/Icons/Icons";
import { Card, Dropdown, Flex, Tabs, TabsProps } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"
import customFreight, { ProductGroup } from "@/store/settings/ShippingAndDistribution/customFreight";
import { observer } from "mobx-react-lite";
import MyButton from "@/components/Button/MyButton";
import GroupTemplate from "./GroupTemplate";
import DelGroupModal from "./DelGroupModal";
import SetGroupModal from "./SetGroupModal";
import { toJS } from "mobx";

function ManagementGroup({loading}:{loading:boolean}) {

    const [currentGroup,setCurrentGroup] = useState<ProductGroup|undefined>(undefined);

    const operations = <Dropdown menu={{items:[
        {
            key: '1',
            label: <SetGroupModal />,
        },
        {
            key: '2',
            label: currentGroup && <SetGroupModal deliveryLocationGroup={currentGroup!} />,
            disabled: currentGroup?.defaultTag,
        },
        {
            key: '3',
            label: currentGroup && <DelGroupModal deliveryLocationGroup={currentGroup} />,
            disabled: currentGroup?.defaultTag,
        },
    ]}} trigger={["click"]}>
        <MyButton text={<Flex align="center">管理分组<UnfoldIcon className="font-20" /></Flex>} style={{height:"36px"}} />
    </Dropdown>

    const TabsItems = customFreight.productGroupList.map((item) => ({
        key: String(item.deliveryLocationGroupSeq),
        label: <div style={{ padding: "6px 0" }}>{item.groupName}</div>,
        children: <GroupTemplate deliveryLocationGroup={item} />,
    }));

    useEffect(()=>{
        const current = customFreight.productGroupList.find((item)=>item.defaultTag)
        current && setCurrentGroup(current)
    },[])
    
    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Tabs defaultActiveKey={currentGroup?.deliveryLocationGroupSeq.toString()} tabBarExtraContent={operations} items={TabsItems} onChange={(key)=>{
                    const productGroupList = [...customFreight.productGroupList];
                    setCurrentGroup(productGroupList.find((item)=>item.deliveryLocationGroupSeq == key))
                }} />
            </Card>
        </Scoped>
    )
}

export default observer(ManagementGroup)

const Scoped = styled.div`
    .card{
        padding-top: 0;
    }
`