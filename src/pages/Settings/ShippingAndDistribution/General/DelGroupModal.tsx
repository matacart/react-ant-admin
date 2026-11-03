import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import generalFreight, { ProductGroup } from "@/store/settings/ShippingAndDistribution/generalFreight";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Flex, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";

// 更新默认分组的地点
const upDateDefaultLocaltion = (locationGroup:string[],productGroupList:ProductGroup[])=>{
    const newProductGroup = productGroupList.map(item =>
        item.defaultTag ? {
            ...item,
            deliveryLocationSeqs: Array.from(
                new Set([...(item.deliveryLocationSeqs ?? []), ...locationGroup])
            ),
        } : item
    );
    return newProductGroup
}


function DelGroupModal({deliveryLocationGroup}:{deliveryLocationGroup:ProductGroup}) {

    const [open, setOpen] = useState(false);

    const cancel = () => {
        setOpen(false);
    }

    const submit = () => {
        // 默认分组 不能删除
        if(deliveryLocationGroup?.defaultTag){
            return
        }
        // 1. 找到删除分组的地点
        const locationGroup = deliveryLocationGroup.deliveryLocationSeqs
        // 2. 删除分组
        const newProductGroup = generalFreight.productGroupList.filter((item)=>item.deliveryLocationGroupSeq!==deliveryLocationGroup.deliveryLocationGroupSeq)
        generalFreight.setProductGroupList(upDateDefaultLocaltion(locationGroup,newProductGroup))
        // 记录删除的分组
        if(deliveryLocationGroup?.isNew){
            // 过滤删除的分组
            generalFreight.setCreateDeliveryLocationGroup(generalFreight.createDeliveryLocationGroup.filter((item)=>item.deliveryLocationGroupSeq!==deliveryLocationGroup.deliveryLocationGroupSeq))
        }else{
            generalFreight.setDeleteDeliveryLocationGroupSeqs([...new Set([...generalFreight.deleteDeliveryLocationGroupSeqs,deliveryLocationGroup.deliveryLocationGroupSeq])])
        }
        setOpen(false);
    }

    return (
        <>
            <a style={{color:"#F86140"}} onClick={()=>{
                setOpen(true);
            }}>删除分组</a>
            <Modal
                open={open}
                width={480}
                centered={true}
                closable={false}
                onCancel={cancel}
                footer={<Flex justify="flex-end" gap={12}>
                    <DefaultButton onClick={cancel} text="取消" />
                    <DangerButton onClick={submit} text="删除" />
                </Flex>}
            >
                <Flex align="flex-start" gap={8}>
                    <ExclamationCircleFilled className="color-F86140 font-24" />
                    <Flex className="font-16 font-w-500">确认要删除{deliveryLocationGroup?.groupName}吗？</Flex>
                </Flex>
            </Modal>
        </>
    )
}

const Scoped = styled.div`
    
`;

export default DelGroupModal
