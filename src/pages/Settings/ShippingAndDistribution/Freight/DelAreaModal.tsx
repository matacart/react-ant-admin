import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import customFreight, { AreaPlan, ProductGroup } from "@/store/settings/ShippingAndDistribution/customFreight";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Flex, Modal } from "antd";
import { useState } from "react";
import { removeAreaPlan } from "./area";

function DelAreaModal({deliveryLocationGroup,areaPlan}:{deliveryLocationGroup:ProductGroup,areaPlan:AreaPlan}) {

    const [open, setOpen] = useState(false);

    const cancel = () => {
        setOpen(false);
    }

    const submit = () => {
        // 删除分组
        customFreight.delAreaPlanList(deliveryLocationGroup.deliveryLocationGroupSeq,areaPlan.shippingRegionSeq)
        // 记录删除的分组
        removeAreaPlan(deliveryLocationGroup.deliveryLocationGroupSeq,areaPlan)
        setOpen(false);
    }

    return (
        <>
            <a style={{color:"#F86140"}} onClick={()=>{
                setOpen(true);
            }}>删除区域</a>
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
                    <Flex className="font-16 font-w-500">确认要删除{areaPlan?.shippingName}吗？</Flex>
                </Flex>
            </Modal>
        </>
    )
}

export default DelAreaModal
