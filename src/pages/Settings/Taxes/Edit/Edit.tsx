import { ArrowLeftOutlined, ExportOutlined } from '@ant-design/icons';
import { App, Divider,Flex, Form } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import { styled } from 'styled-components';
import { observer } from 'mobx-react-lite';
import cookie from 'react-cookies';
import { history,useParams } from '@umijs/max';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import LangSelect from '@/components/Select/LangSelect';
import { getTaxDetail, getZoneList, updateTaxDetail } from '@/services/y2/apiTax';
import TaxServices from './TaxServices';
import TaxOverall from './TaxOverall';
import Tariff from './Tariff';
import taxes from '@/store/settings/taxes/taxes';
import CustomTax from './CustomTax';
import PrimaryButton from '@/components/Button/PrimaryButton';


function Edit() {

    const {countryId = "1",langId = "2"} = useParams();

    const [isSkeleton,setIsSkeleton] = useState(true);

    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const submit = ()=>{
        form.validateFields().then((values) => {
            const {overallTaxes,...customTaxes} = values;
            let customTaxesList:any[] = [];
            Object.keys(customTaxes).forEach((key:string,index:number)=>{
                customTaxesList.push({
                    ...taxes.customTax[index] || {},
                    subTaxesConfigDTOList:customTaxes[key] || [],
                })
            })
            const res = {
                ...taxes.taxInfo,
                deleteList:JSON.stringify(taxes.deleteList),
                dutyConfig:JSON.stringify(taxes.taxInfo?.dutyConfig),
                taxesConfigDTOList:JSON.stringify([
                    {
                        ...taxes.overallTax,
                        subTaxesConfigDTOList:overallTaxes,
                    },
                    ...customTaxesList,
                    taxes.tariffTax,
                ]),
            }
            setLoading(true)
            updateTaxDetail({
                languages_id:langId,
                country_id:countryId,
                ...res,
            }).then(()=>{
            }).catch((err)=>{
            }).finally(()=>{
                setLoading(false)
            })
        }).catch((err)=>{
            console.log("校验失败",err);
        });
    }

    const fetchData = async (langId:string)=>{
        await taxes.reset()
        setIsSkeleton(true)
        Promise.all([
            getTaxDetail({
                langId,
                countryId
            }),
            getZoneList({
                langId,
                countryId
            }),
        ]).then(([taxDetail,zoneList])=>{
            const {taxesConfigDTOList,...taxInfo} = taxDetail
            const tariffTax = taxesConfigDTOList.find((item:any)=>item.type == 4) || {}
            taxes.setTariffTax(tariffTax)
            const overallTax = taxesConfigDTOList.find((item:any)=>item.type == 1) || {}
            taxes.setOverallTax(overallTax)
            const customTax = taxesConfigDTOList.filter((item:any)=>item.type == 2 || item.type == 3) || []
            taxes.setCustomTax(customTax)
            // 税率信息
            taxes.setTaxInfo(taxInfo)
            taxes.setZoneList(zoneList.list.map((item:any)=>({
                label:item.zone_name,
                value:item.zone_id,
            })))
        }).finally(()=>{
            setIsSkeleton(false)
        })
    }

    useEffect(()=>{
        fetchData(langId);
    },[langId])

    return (
        <div>
            {isSkeleton?<SkeletonCard />:<Scoped>
                {/* 弹窗 */}
                <div className='mc-layout-wrap'>
                    <div className="mc-layout">
                        <Flex className="mc-header" align="center" justify="space-between">
                            <div className="mc-header-left">
                                <div className="mc-header-left-secondary" onClick={() => {
                                    history.push('/settings/taxes')
                                }}>
                                    <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                                </div>
                                <div className="mc-header-left-content">{taxes.taxInfo?.countryCode}</div>
                            </div>
                            <Flex className='mc-header-right' align='center' gap={8}>
                                <LangSelect lang={langId} setLang={(lang:string)=>history.push(`/settings/taxes/${countryId}/${lang}`)} />
                            </Flex>
                        </Flex>

                        <Flex gap={20} vertical>
                            <TaxServices />
                            {/* 基本销售税 */}
                            <div>
                                <div className='font-16 font-w-500'>基本销售税</div>
                                <div style={{marginBottom:"16px"}}>适用于 {taxes.taxInfo?.countryCode} 的基本消费税</div>
                                <Flex gap={16} vertical>
                                    <TaxOverall form={form} />
                                    {/* 自定义税率 */}
                                    <CustomTax form={form} />
                                </Flex>
                            </div>
                            {/* 关税 */}
                            <div>
                                <div className='font-16 font-w-500'>关税</div>
                                <div style={{marginBottom:"16px"}}>适用于 {taxes.taxInfo?.countryCode} 的关税 <a>了解更多<ExportOutlined style={{position:"relative",left:"2px"}} /></a></div>
                                <Tariff />
                            </div>
                        </Flex>
                        <Divider />
                        <Flex justify='flex-end'>
                            <PrimaryButton loading={loading} text='更新' onClick={submit} />
                        </Flex>
                    </div>
                </div>
            </Scoped>}
        </div>
    )
}

export default observer(Edit);

const Scoped = styled.div`
    .mc-layout-wrap {
        display: flex;
        justify-content: center;
        min-width: 510px;
        .mc-layout {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            .mc-header {
                color: rgb(36, 40, 51);
                font-size: 30px;
                height: 42px;
                font-weight: bold;
                margin-bottom: 20px;
                &-left {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    &-secondary {
                        height: 32px;
                        width: 32px;
                        border: 1px solid #d7dbe7;
                        border-radius: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        &:hover {
                            background-color: #eaf0ff;
                            cursor: pointer;
                        }
                        &-icon {
                            font-size: 18px;
                        }
                    }
                    &-content {
                        margin-left: 12px;
                        font-size: 20px;
                    }
                }

                &-right {
                    height: 100%;
                }
            }
        }
    }
    a {
        font-weight: 400;
    }
`;
