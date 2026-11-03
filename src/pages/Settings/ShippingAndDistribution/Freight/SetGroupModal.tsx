import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import MyInput from "@/components/Input/MyInput";
import customFreight, { ProductGroup } from "@/store/settings/ShippingAndDistribution/customFreight";
import { Flex, Form, Modal } from "antd";
import { useRef, useState } from "react";

function SetGroupModal({deliveryLocationGroup}:{deliveryLocationGroup?:ProductGroup}) {

    const scopedRef = useRef<HTMLDivElement>(null);

    const [form] = Form.useForm();

    const [open, setOpen] = useState(false);

    const submit = () => {
        form.validateFields().then((values) => {
            if(deliveryLocationGroup){
                // 更新
                const newDeliveryLocationGroup = {
                    ...deliveryLocationGroup,
                    groupName:values.groupName || "",
                };
                const newProductGroupList = customFreight.productGroupList.map((item)=>{
                    if(item.deliveryLocationGroupSeq === deliveryLocationGroup.deliveryLocationGroupSeq){
                        return newDeliveryLocationGroup;
                    }
                    return item;
                })
                customFreight.setProductGroupList(newProductGroupList);
                // 记录 -- 数据
                if(deliveryLocationGroup?.isNew){
                    const newCreateDeliveryLocationGroup = customFreight.createDeliveryLocationGroup.map((item)=>{
                        if(item.deliveryLocationGroupSeq === deliveryLocationGroup.deliveryLocationGroupSeq){
                            return {
                                ...item,
                                groupName:values.groupName || "",
                            } 
                        }
                        return item;
                    })
                    customFreight.setCreateDeliveryLocationGroup(newCreateDeliveryLocationGroup);
                }else{
                    const newDeliveryLocationGroup = customFreight.updateDeliveryLocationGroup;
                    if(newDeliveryLocationGroup.find((item)=>item.deliveryLocationGroupSeq === deliveryLocationGroup.deliveryLocationGroupSeq)){
                        // 替换
                        customFreight.setUpdateDeliveryLocationGroup(newDeliveryLocationGroup.map((item)=>{
                            if(item.deliveryLocationGroupSeq === deliveryLocationGroup.deliveryLocationGroupSeq){
                                return {
                                    ...item,
                                    groupName:values.groupName || "",
                                }
                            }
                            return item;
                        }))
                    }else{
                        // 第一次修改时
                        customFreight.setUpdateDeliveryLocationGroup([
                            ...newDeliveryLocationGroup,
                            {
                                ...deliveryLocationGroup,
                                areaPlansSetDetail: {
                                    createdAreaPlans: [],
                                    updatedAreaPlans: [],
                                    deletedAreaPlans: [],
                                },
                                groupName:values.groupName || "",
                            }
                        ])
                    }
                }
            }else{
                // 新增
                const newDeliveryLocationGroup = {
                    deliveryLocationGroupSeq:"DL"+new Date().getTime().toString(),
                    defaultTag:false,
                    groupName:values.groupName,
                    deliveryLocationSeqs:[],
                    isNew:true,
                }
                customFreight.setProductGroupList([
                    ...customFreight.productGroupList,
                    {...newDeliveryLocationGroup,areaPlanList:[]}
                ])
                // 记录 -- 数据
                customFreight.setCreateDeliveryLocationGroup([
                    ...customFreight.createDeliveryLocationGroup,
                    {
                        ...newDeliveryLocationGroup,
                        areaPlansSetDetail: {
                            createdAreaPlans: [],
                            updatedAreaPlans: [],
                            deletedAreaPlans: [],
                        }
                    }
                ])
            }
            setOpen(false);
        }).catch(()=>{
        });
    }

    return (
        <>
            <a onClick={()=>{
                setOpen(true);
                if(deliveryLocationGroup){
                    form.setFieldsValue({
                        groupName:deliveryLocationGroup.groupName,
                    })
                }else{
                    form.setFieldsValue({
                        groupName:"",
                    })
                }
            }}>{deliveryLocationGroup?"重命名分组":"添加分组"}</a>
            <Modal open={open} onCancel={() => setOpen(false)} getContainer={()=>scopedRef.current!} title={deliveryLocationGroup?"重命名分组":"添加分组"} width={620} centered footer={()=><>
                <Flex justify="flex-end" gap={12}>
                    <DefaultButton onClick={() => setOpen(false)} text="取消" />
                    <PrimaryButton onClick={submit} text="确定" />
                </Flex>
            </>}>
                <Form layout="vertical" form={form} style={{marginTop:"12px"}}>
                    <Form.Item className="mb-20" name="groupName" required={false} label="分组名称"
                        rules={[{ required: true, message: '请输入分组名称' }]}
                    >
                        <MyInput style={{height:"36px"}} placeholder="请输入分组名称" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default SetGroupModal
