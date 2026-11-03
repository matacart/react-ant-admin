import { ArrowLeftOutlined } from "@ant-design/icons"
import { history } from "@umijs/max"
import styled from "styled-components"
import { useEffect, useState } from "react"
import generalFreight, { LocationType } from "@/store/settings/ShippingAndDistribution/generalFreight"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import { observer } from "mobx-react-lite"
import LangSelect from "@/components/Select/LangSelect"
import { getProductGroup, queryProductGroupCountry, setProductGroup } from "@/services/y2/apiLogistics"
import ApplicableGoods from "./ApplicableGoods"
import ManagementGroup from "./ManagementGroup"
import { getAddWarehouseList } from "@/services/y2/apiStore"
import PrimaryButton from "@/components/Button/PrimaryButton"
import { toJS } from "mobx"
import { useSleep } from "@/hooks/customHooks"

function EditCustomLogistics() {

    const sleep = useSleep();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [loading,setLoading] = useState(false);

    const [refresh,setRefresh] = useState(false);

    const submit = ()=>{
        const productGroup = {
            productGroupSeq: 1,
            deletedProductIds: "[]",
            createdProductIds: "[]",
        }
        console.log({
            createDeliveryLocationGroup:generalFreight.createDeliveryLocationGroup,
            updateDeliveryLocationGroup:toJS(generalFreight.updateDeliveryLocationGroup),
            deleteDeliveryLocationGroupSeqs:generalFreight.deleteDeliveryLocationGroupSeqs,
        })
        setLoading(true)
        setProductGroup({
            languages_id: generalFreight.language,
            productGroup:JSON.stringify(productGroup),
            deliveryLocationGroupSetInfo:JSON.stringify({
                createDeliveryLocationGroup:generalFreight.createDeliveryLocationGroup,
                updateDeliveryLocationGroup:generalFreight.updateDeliveryLocationGroup,
                deleteDeliveryLocationGroupSeqs:generalFreight.deleteDeliveryLocationGroupSeqs,
            })
        }).then(()=>{
            // 清空本次提交的变更追踪，避免重复提交
            generalFreight.setCreateDeliveryLocationGroup([])
            generalFreight.setUpdateDeliveryLocationGroup([])
            generalFreight.setDeleteDeliveryLocationGroupSeqs([])
            // 拉最新数据覆盖
            sleep(1000).then(()=>{
                setRefresh(!refresh)
            })
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
        Promise.all([
            getProductGroup({
                languages_id:generalFreight.language,
                productGroupSeq:"1"
            }),
            getAddWarehouseList(),
            queryProductGroupCountry({
                languages_id:generalFreight.language,
            })
        ]).then((res)=>{
            if(res[0].data.list && res[0].data.list.length > 0){
                generalFreight.setProductGroupList(res[0].data.list)
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
                generalFreight.setProductGroupList([
                    {
                        ...newDeliveryLocationGroup,
                        areaPlanList:[],
                    }
                ])
                // 添加变更记录
                generalFreight.setCreateDeliveryLocationGroup([
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
            const warehouseMap = Object.fromEntries(res[1].data.map((item:LocationType) => [item.id, item])) as Record<string, LocationType>;
            generalFreight.setLocationList(warehouseMap)
            generalFreight.setCountryList(res[2].data || [])
        }).catch(()=>{
        }).finally(()=>{
            setIsSkeleton(false)
        })
    },[generalFreight.language,refresh])

    useEffect(()=>{
        return ()=>{
            generalFreight.reset()
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
                            <div className="mc-header-left-content">通用运费设置</div>
                        </div>
                        <div className="mc-header-right">
                            {/* 语言 */}
                            <LangSelect lang={generalFreight.language} setLang={(lang:string)=>generalFreight.setLanguage(lang)} />
                        </div>
                    </div>
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <ApplicableGoods />
                            <ManagementGroup loading={loading} />
                        </div>
                    </div>
                    {/* 提交按钮 */}
                    <div className="submit-btn">
                        <PrimaryButton loading={loading} text="更新" onClick={submit} />
                    </div>
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
            display: flex;
            justify-content: right;
        }
    }
}
`