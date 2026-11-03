import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput"
import generalFreight, { ProductGroup } from "@/store/settings/ShippingAndDistribution/generalFreight";
import { Checkbox, Flex, Form, List, Modal } from "antd"
import { toJS } from "mobx";
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components";

// 处理单一分组的更新与过滤
const updateSingleGroup = (group: ProductGroup,currentGroup:ProductGroup,checkedKeys:string[]) => {
    const isCurrent = group.deliveryLocationGroupSeq === currentGroup.deliveryLocationGroupSeq;
    // 1. 如果是当前正在操作的分组：直接覆盖选中的 ID
    if (isCurrent) {
        return {
            group:{...group, deliveryLocationSeqs: checkedKeys},
            change:true,
        };
    }
    // 2. 如果是其它分组（原有组或新建组）：执行全量过滤，踢出被选中的 ID
    const oldSeqs = group.deliveryLocationSeqs || [];
    const filteredSeqs = oldSeqs.filter(id => !checkedKeys.includes(id));
    // 如果长度发生变化，说明该分组的地点被“抢”走了，
    if(filteredSeqs.length !== oldSeqs.length){
        return {
            group:{...group, deliveryLocationSeqs: filteredSeqs},
            change:true,
        };
    }else{
        return {
            group:group,
            change:false,
        };
    }
};

function AddDeliveryLocationModal({deliveryLocation}:{deliveryLocation:ProductGroup}) {

    const [open, setOpen] = useState(false);

    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

    // 计算地点所属分组
    const locationToGroupMap = useMemo(() => {
        const map = new Map<string, string>();
        const allGroups = [...generalFreight.productGroupList];
        allGroups.forEach(group => {
            const isCurrent = group.deliveryLocationGroupSeq === deliveryLocation.deliveryLocationGroupSeq;
            const isDefaultGroup = group.defaultTag
            if (!isCurrent && !isDefaultGroup) {
                group.deliveryLocationSeqs?.forEach(id => {
                    map.set(id, group.groupName || '新建分组');
                });
            }
        });
        return map;
        // 依赖项
    }, [generalFreight.productGroupList, deliveryLocation]);

    const cancel = ()=>{
        setOpen(false)
    }

    const init = ()=>{
        setCheckedKeys(deliveryLocation.deliveryLocationSeqs);
        setOpen(true);
    }

    const submit = ()=>{
        if (checkedKeys.length == 0){
            return
        }
        const newDeliveryLocation = toJS(deliveryLocation);
        // 相同地点不添加
        if(JSON.stringify(newDeliveryLocation.deliveryLocationSeqs) == JSON.stringify(checkedKeys)){
            return
        }
        let changeIds:string[] = [];
        const newProductGroupList = generalFreight.productGroupList.map((item:ProductGroup)=>{
            const {group,change} = updateSingleGroup(item,newDeliveryLocation,checkedKeys);
            if(change && item.deliveryLocationGroupSeq){
                changeIds.push(item.deliveryLocationGroupSeq);
            }
            return group;
        });
        // 更新状态
        generalFreight.setProductGroupList(newProductGroupList);
        // 记录 -- 
        // const existingSet = new Set(generalFreight.updateDeliveryLocationGroupSeqs || []);
        // const toAdd = changeIds.filter(id => !existingSet.has(id));
        // if (toAdd.length) {
        //     generalFreight.setUpdateDeliveryLocationGroupSeqs([...new Set([...existingSet, ...toAdd])]);
        // }
        setOpen(false);
    }

    return (
        <>
            <DefaultButton text="添加" onClick={init}/>
            <MyModal 
                title="添加发货地址"
                open={open}
                width={620} 
                centered 
                onCancel={cancel}
                footer={()=><>
                    <Flex justify="space-between" align="center">
                        {checkedKeys.length == 0 ? <div className="color-F86140 font-12">至少选择 1 个地点</div> : <div className="font-12">已选择 {checkedKeys.length} 个地点</div>}
                        <Flex justify="flex-end" gap={12}>
                            <DefaultButton onClick={cancel} text="取消" />
                            <PrimaryButton onClick={submit} text="确定" />
                        </Flex>
                    </Flex>
                </>}
            >
                <div style={{marginBottom:"12px"}}>最多选中100个地点，未添加至分组的地点将使用默认分组运费方案</div>
                <MyInput style={{height:"36px",marginBottom:"8px"}} placeholder="搜索地点" />
                <Checkbox.Group 
                    style={{
                        display:"flex",
                        flexDirection:"column",
                        flexWrap: "nowrap", // 防止折列
                        maxHeight:"300px",
                        overflowY:"auto",
                    }}
                    value={checkedKeys} 
                    onChange={(checkedKeys)=>{
                        setCheckedKeys(checkedKeys)
                    }}>
                    {Object.entries(generalFreight.locationList).map(([key, location]) => (
                        <div key={key} className="item">
                            <Checkbox disabled={deliveryLocation.deliveryLocationSeqs.includes(key)} value={key}>{location.name}</Checkbox>
                            {locationToGroupMap.get(key) && <div className="color-7A8499 font-12" style={{marginLeft:"24px"}}>已存在于「{locationToGroupMap.get(key)}」</div>}
                        </div>
                    ))}
                </Checkbox.Group>
            </MyModal>
        </>
    )
}

const MyModal = styled(Modal)`
    .item{
        padding: 8px 0;
    }
`


export default AddDeliveryLocationModal