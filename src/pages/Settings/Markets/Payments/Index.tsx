import SkeletonCard from "@/components/Skeleton/SkeletonCard";
import { ArrowLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { history, useParams } from "@umijs/max";
import { App, Collapse, CollapseProps, Flex, theme } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";
import { getMarketDetail, getMarketPayment, getMarketPriceRule, getMarketProductList, modifyMarketPayment } from "@/services/y2/apiSaleMarket";
import { observer } from "mobx-react-lite";
import LangSelect from "@/components/Select/LangSelect";
import payments, { CountryPaymentInfo } from "@/store/settings/markets/payments";
import CollapseTable from "./CollapseTable";
import MyAlert from "@/components/Alert/MyAlert";
import Overlay from "@/components/Overlay/Overlay";
import { toJS } from "mobx";
import PrimaryButton from "@/components/Button/PrimaryButton";


const panelStyle: React.CSSProperties = {
    marginBottom: 12,
    background: '#fff',
    borderRadius: 4,
    border: 'none',
};

const ItemLabel = ({item}:{item:CountryPaymentInfo})=>{
    return (
        <Flex align="center" gap={12}>
            <div className="item-icon">
                <span className="item-icon-text">{item.countryCode?.slice(0, 2) || ""}</span>
            </div>
            <div>
                <div className="font-w-500">{item.countryName}</div>
                <div className="item-desc font-12 color-7A8499">客户可使用 {item.paymentList.length} 种支付方式。</div>
            </div>
        </Flex>
    )
}

function Index() {

    const { marketId="", langId="" } = useParams();

    const [isSkeleton, setIsSkeleton] = useState(true);

    const [items, setItems] = useState<CollapseProps['items']>([]);

    const { message } = App.useApp();

    const [loading, setLoading] = useState(false);

    // modifyMarketPayment
    const submit = ()=>{
        setLoading(true);
        modifyMarketPayment({
            marketId,
            languages_id:langId,
            countryPaymentInfos:JSON.stringify(payments.newCountryPaymentInfos),
        }).then(()=>{
            // 刷新数据
            payments.refresh();
            message.success("更新成功");
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    // 初始化数据
    useEffect(() => {
        getMarketPayment({
            languages_id:langId,
            marketId,
        }).then((res)=>{
            const { countryPaymentInfos,...otherInfo } = res.data;
            payments.setOtherInfo(otherInfo);
            setItems(countryPaymentInfos.map((item:CountryPaymentInfo)=>{
                return {
                    key: item.countryCode,
                    label: <ItemLabel item={item} />,
                    children: <CollapseTable item={item}/>,
                    style: panelStyle,
                    styles: {
                        header: {
                            padding: '24px',
                            alignItems: 'center',
                        },
                        body: {
                            padding: '0 24px 24px',
                        }
                    }
                }
            }));
        }).catch(()=>{
        }).finally(()=>{
            setIsSkeleton(false);
        })

        console.log(payments.dataKey);
        
    }, [langId,payments.dataKey])


    useEffect(()=>{
        return ()=>{
            payments.reset();
        }
    },[])

    return (
        <Scoped>
            {isSkeleton?<SkeletonCard />:<Flex className='mc-layout-wrap' align="center">
                <div className="mc-layout">
                    <Flex className="mc-header" justify="space-between">
                        <Flex className="mc-header-left">
                            <div className="mc-header-left-secondary" onClick={()=>history.push(`/settings/markets/${marketId}/${langId}`)}>
                                <ArrowLeftOutlined className="mc-header-left-secondary-icon" />
                            </div>
                            <div style={{marginLeft:"12px"}}>
                                <div className="font-20">{"支付"}</div>
                                <div style={{marginTop:"4px"}} className="font-12 font-w-400">管理市场下各个国家/地区可使用的支付方式及支付货币。如需添加更多支付方式，可前往<a onClick={()=>history.push("/settings/payments")}>收款设置</a>。</div>
                            </div>
                        </Flex>
                        <Flex gap={12} align="flex-start">
                            <LangSelect lang={langId} setLang={(lang:string)=>history.push(`/settings/markets/payments/${marketId}/${lang}`)} />    
                        </Flex>
                    </Flex>
                    {!payments.otherInfo.useLocalCurrency && <div style={{marginBottom:"12px"}}>
                        <MyAlert type="info" showIcon message={<>当前市场仅可以选择以“市场基准货币”或“店铺货币”作为支付货币。如需选择以客户的“当地货币”为支付货币，请先前往 <a onClick={()=>{history.push(`/settings/markets/pricing/${marketId}/${langId}`)}}>商品与定价</a>开启“以客户所在国家/地区的当地货币显示价格”。</>} />
                    </div>}
                    {/* 主要内容 */}
                    <Flex gap={20} vertical>
                        <Collapse
                            bordered={false}
                            defaultActiveKey={['1']}
                            expandIconPosition="right"
                            // expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            style={{ background: 'transparent' }}
                            items={items}
                        />
                    </Flex>
                    {<Flex justify="right" className="submit-btn">
                        <PrimaryButton loading={loading} text="更新" onClick={submit}  />
                    </Flex>}
                </div>
                {(payments.newCountryPaymentInfos.length > 0 )&& <Overlay status={loading} okText="更新" onExit={()=>{
                    history.push(`/settings/markets/${marketId}/${langId}`)
                }} onSubmit={submit} />}
            </Flex>}
        </Scoped>
    )
}

const Scoped = styled.div`
    .mc-layout-wrap{
        min-width: 510px;
        .mc-layout {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            .mc-header {
                color: rgb(36, 40, 51);
                font-weight: bold;
                margin: 8px 0px 24px;
                .mc-header-left-secondary {
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
            }

            /* 主要内容 */
            .item-icon{
                width: 60px;
                height: 42px;
                line-height: 42px;
                background: linear-gradient(111.34deg, rgb(56, 88, 201) 0%, rgb(89, 55, 188) 100%);
                font-size: 18px;
                min-width: 54px;
                color: #FFFFFF;
                text-align: center;
                align-items: center;
                border-radius: 4px;
            }
            .item-desc{
                margin-top: 6px;
            }

            .submit-btn {
                margin-top: 24px;
            }
        }
    }
    .ant-alert {
        align-items: flex-start !important;
    }
    .ant-alert-icon {
        /* 微调图标上边距，使其与首行文字对齐，默认可能是 line-height 导致的视觉偏差 */
        margin-top: 4px !important; 
    }
    /* 折叠面板样式 */
    /* .ant-collapse-header {
        align-items: center !important; 
    }
    .ant-collapse-expand-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%; 
    } */
`

export default observer(Index);
