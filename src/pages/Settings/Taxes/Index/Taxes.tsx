import { ArrowLeftOutlined, ExportOutlined } from "@ant-design/icons"
import { App, Divider } from "antd"
import styled from "styled-components"
import { useEffect, useState } from "react"
import SkeletonCard from "@/components/Skeleton/SkeletonCard"
import TaxDistrict from "./TaxDistrict"
import TaxCollectionMethod from "./TaxCollectionMethod"
import { useNavigate } from "react-router-dom"
import { getCountryList, getTaxDisplayConfig, saveTaxDisplayConfig } from "@/services/y2/apiTax"
import LangSelect from "@/components/Select/LangSelect"
import taxesList from "@/store/settings/taxes/taxesList"
import { observer } from "mobx-react-lite"
import PrimaryButton from "@/components/Button/PrimaryButton"

function Taxes() {

    const { message } = App.useApp()

    const navigate = useNavigate()

    const [isSkeleton,setIsSkeleton] = useState(true)

    const [isRenewal,setIsRenewal] = useState(false)

    const [tableLoading,setTableLoading] = useState(false)

    const submit = ()=>{
        setIsRenewal(true)
        saveTaxDisplayConfig({
            languages_id:taxesList.languagesId,
            is_enabled:taxesList.taxDisplayConfig.is_enabled,
        }).then((res)=>{
            res.code == "SUCCESS" && message.success("已更新")
        }).catch(()=>{
        }).finally(()=>{
            setIsRenewal(false)
        })
    }

    const fetch = ()=>{
        setIsSkeleton(true)
        Promise.all([
            getCountryList({
                langId:taxesList.languagesId,
                current:taxesList.pagination.current,
                pageSize:taxesList.pagination.pageSize,
            }),
            getTaxDisplayConfig({
                langId:taxesList.languagesId,
            }),
        ]).then(res=>{
            taxesList.setTaxCountryList(res[0].list)
            taxesList.setPagination({
                ...taxesList.pagination,
                total:res[0].total,
            })
            taxesList.setTaxDisplayConfig(res[1])
        }).catch(()=>{
        }).finally(()=>{
            setIsSkeleton(false)
        })
    }

    useEffect(()=>{
        if(isSkeleton) return
        setTableLoading(true)
        getCountryList({
            langId:taxesList.languagesId,
            current:taxesList.pagination.current,
            pageSize:taxesList.pagination.pageSize,
            keyword:taxesList.keyWord,
        }).then(res=>{
            taxesList.setTaxCountryList(res.list)
            taxesList.setPagination({
                ...taxesList.pagination,
                total:res.total,
            })
        }).finally(()=>{
            setTableLoading(false)
        })
    },[taxesList.pagination.current,taxesList.keyWord])

    useEffect(()=>{
        fetch()
    },[taxesList.languagesId])

    useEffect(()=>{
       return ()=>{
        taxesList.reset()
       }
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<div className='mc-layout-wrap'>
                <div className="mc-layout">
                    <div className="mc-header">
                        <div className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>navigate("/settings/index")}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div className="mc-header-left-content">税费设置</div>
                        </div>
                        <div className='mc-header-right'>
                            <div className="mc-header-right-content">
                                <LangSelect setLang={(value:string)=>taxesList.setLanguagesId(value)} lang={taxesList.languagesId} />
                            </div>
                        </div>
                    </div>
                    {/* 收税地区 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">收税地区</div>
                                <p className="font-14 color-474F5E desc line-h-20">管理您征收税费的地点。如果您不确定您在何地有纳税义务，请咨询税务专家。您可以通过 <a>创建配送区域</a> 来添加新的国家/地区。<a>了解更多<ExportOutlined style={{position:"relative",top:"1px",left:"4px"}} /></a></p>
                            </div>
                            <div className="mc-layout-content-right">
                                <TaxDistrict loading={tableLoading} />
                            </div>
                        </div>
                    </div>
                    {/* 收税方式 */}
                    <div className='mc-layout-main'>
                        <div className='mc-layout-content'>
                            <div className="mc-layout-content-left">
                                <div className="font-20 color-242833 font-w-600">收税方式</div>
                                <p className="font-14 color-474F5E desc line-h-20">设定店铺对商品/运费的收税方式</p>
                            </div>
                            <div className="mc-layout-content-right">
                                <TaxCollectionMethod />
                            </div>
                        </div>
                    </div>
                    
                    <Divider
                        style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                            textAlign: 'center',
                            color: '#666',
                            fontWeight: '500',
                        }}
                        orientationMargin="3em"
                    >
                    </Divider>
                    <div className="submit-btn">
                        <PrimaryButton loading={isRenewal} text="更新" onClick={submit} />
                    </div>
                </div>
            </div>}
        </Scoped>
    )
}
export default observer(Taxes)

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
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
        &-content {
            flex: 9;
            min-width: 510px;
            display: flex;
            gap:20px;
            &-left{
                flex: 1;
                margin-right: 20px;
                .desc{
                    margin-top: 8px;
                }
            }
            &-right{
                flex: 2;
                .availableLocation_box{
                    padding: 12px 0;
                    border-bottom: 1px solid #EEF1F7;
                    cursor: pointer;
                    .availableLocation{
                        margin-right: 12px;
                        background-color: #F7F8Fb;
                        border-radius: 4px;
                        border: 1px solid #EEF1F7;
                    }
                }
                .availableLocation_box:hover{
                    background-color: #F7F8Fb;
                }
            }
        }
        .submit-btn{
            display: flex;
            justify-content: right;
        }
    }
}
`