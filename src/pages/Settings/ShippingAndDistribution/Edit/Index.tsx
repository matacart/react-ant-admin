import { ArrowLeftOutlined } from "@ant-design/icons"
import { history, useParams } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { observer } from "mobx-react-lite"
import LangSelect from "@/components/Select/LangSelect"
import { deleteProductGroup, getProductGroup, getProductGroupDetail, queryProductGroupCountry, setProductGroup } from "@/services/y2/apiLogistics"
import customFreight, { LocationType } from "@/store/settings/ShippingAndDistribution/customFreight"
import GroupNameCard from "../Freight/GroupNameCard"
import { Flex, Form } from "antd"
import ApplicableGoods from "../Freight/ApplicableGoods"
import PrimaryButton from "@/components/Button/PrimaryButton"
import DangerButton from "@/components/Button/DangerButton"
import DeleteModal from "@/components/Modal/DeleteModal"
import ManagementGroup from "../Freight/ManagementGroup"
import { getAddWarehouseList } from "@/services/y2/apiStore"
import { toJS } from "mobx"
import { useSleep } from "@/hooks/customHooks"

function EditCustomLogistics() {

    const sleep = useSleep();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [loading,setLoading] = useState(false);

    const [refresh,setRefresh] = useState(false);

    const { id="" } = useParams();

    const [form] = Form.useForm();

    const submit = ()=>{
        form.validateFields().then((values)=>{
            const productGroup = {
                productGroupSeq: id,
                productGroupName: values.groupName,
                deletedProductIds: JSON.stringify(customFreight.deletedProductIds),
                createdProductIds: JSON.stringify(customFreight.createdProduct.map((item)=>item.productId)),
            }
            console.log({
                createDeliveryLocationGroup:toJS(customFreight.createDeliveryLocationGroup),
                updateDeliveryLocationGroup:toJS(customFreight.updateDeliveryLocationGroup),
                deleteDeliveryLocationGroupSeqs:toJS(customFreight.deleteDeliveryLocationGroupSeqs),
            })
            setLoading(true);
            setProductGroup({
                productGroup:JSON.stringify(productGroup),
                languages_id: customFreight.language,
                deliveryLocationGroupSetInfo:JSON.stringify({
                    createDeliveryLocationGroup:customFreight.createDeliveryLocationGroup,
                    updateDeliveryLocationGroup:customFreight.updateDeliveryLocationGroup,
                    deleteDeliveryLocationGroupSeqs:customFreight.deleteDeliveryLocationGroupSeqs,
                })
            }).then(()=>{
                // 清空本次提交的变更追踪，避免重复提交
                customFreight.setCreatedProduct([])
                customFreight.setDeletedProductIds([])
                customFreight.setCreateDeliveryLocationGroup([])
                customFreight.setUpdateDeliveryLocationGroup([])
                customFreight.setDeleteDeliveryLocationGroupSeqs([])
                // 拉最新数据覆盖
                sleep(1000).then(()=>{
                    setRefresh(!refresh);
                    customFreight.triggerProductGroupRefresh();
                })
            }).catch(()=>{
            }).finally(()=>{
                setLoading(false)
            })
        }).catch(()=>{
        })
    }

    const deleteHandle = ()=>{
        setLoading(true);
        deleteProductGroup({
            languages_id: customFreight.language,
            productGroupSeq: id
        }).then(()=>{
            history.push("/settings/delivery")
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
        Promise.all([
            // 分组信息详情
            getProductGroupDetail({
                languages_id: customFreight.language,
                productGroupSeq: id
            }),
            // 分组信息
            getProductGroup({
                languages_id:customFreight.language,
                productGroupSeq:id
            }),
            getAddWarehouseList(),
            queryProductGroupCountry({
                languages_id:customFreight.language,
            })
        ]).then((res)=>{
            if (res[0].data){
                customFreight.setProductGroupDetail(res[0].data)
            }
            if(res[1].data.list && res[1].data.list.length > 0){
                customFreight.setProductGroupList(res[1].data.list)
            }else{
                // 默认分组
                const newDeliveryLocationGroup = {
                    deliveryLocationGroupSeq:"DL"+new Date().getTime().toString(),
                    defaultTag:true,
                    groupName:"默认分组",
                    deliveryLocationSeqs:[],
                    isNew:true,
                }
                // 添加默认分组
                customFreight.setProductGroupList([
                    {
                        ...newDeliveryLocationGroup,
                        areaPlanList:[],
                    }
                ])
                // 添加变更记录
                customFreight.setCreateDeliveryLocationGroup([
                    {
                        ...newDeliveryLocationGroup,
                        areaPlansSetDetail: {
                            createdAreaPlans: [],
                            updatedAreaPlans: [],
                            deletedAreaPlans: [],
                        },
                    }
                ])
            }
            const warehouseMap = Object.fromEntries(res[2].data.map((item:LocationType) => [item.id, item])) as Record<string, LocationType>;
            customFreight.setLocationList(warehouseMap)
            customFreight.setCountryList(res[3].data || [])
        }).catch(()=>{
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[id,customFreight.language,refresh])

    useEffect(()=>{
        return ()=>{
            customFreight.reset()
        }
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
                            <div className="mc-header-left-content">{"编辑运费分组方案"}</div>
                        </div>
                        <div className="mc-header-right">
                            {/* 语言 */}
                            <LangSelect lang={customFreight.language} setLang={(lang:string)=>customFreight.setLanguage(lang)} />
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <GroupNameCard form={form} />
                            <ApplicableGoods />
                            <ManagementGroup loading={loading} />
                        </div>
                    </div>
                    {/* 提交按钮 */}
                    <Flex className="submit-btn" justify="space-between">
                        <DeleteModal 
                            loading={loading}
                            tElement={
                                <DangerButton text="删除分组 " />
                            }
                            removeFunc={deleteHandle} 
                            title="确认删除此自定义运费？" 
                            content={"删除后，此方案中的所有商品都将在结账时显示您通用的运费。"}
                        />
                        <PrimaryButton text="更新" style={{height: "36px"}} loading={loading} onClick={submit} />
                    </Flex>
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
            margin-top: 24px;
        }
    }
}
`