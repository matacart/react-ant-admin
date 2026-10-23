import PrimaryButton from "@/components/Button/PrimaryButton";
import NumberInput from "@/components/Input/NumberInput";
import { modifyMarketExchangeRate } from "@/services/y2/apiSaleMarket";
import productAndPricing from "@/store/settings/markets/productAndPricing";
import { useParams } from "@umijs/max";
import { ConfigProvider, Flex, message, Radio, Select } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

function ExchangeRateItem() {

    const { marketId="", langId="" } = useParams();

    const [enableManualExchangeRate,setEnableManualExchangeRate] = useState(false);

    const [manualExchangeRate,setManualExchangeRate] = useState(0);

    const [loading,setLoading] = useState(false);

    const [open,setOpen] = useState(false);

    const [selectedValue, setSelectedValue] = useState("");

    const confirm = ()=>{
        if(enableManualExchangeRate && !manualExchangeRate){
            message.error("请输入大于0的汇率");
            return;
        }
        const options = {
            ...enableManualExchangeRate?{
                enableManualExchangeRate:true,
                manualExchangeRate:manualExchangeRate,
            }:{
                enableManualExchangeRate:false,
            }
        }
        setLoading(true);
        modifyMarketExchangeRate({
            languages_id:langId,
            marketId:marketId,
            ...options,
        }).then(()=>{
            if(enableManualExchangeRate){
                setSelectedValue(`固定汇率:1${productAndPricing.priceRule.storeCurrency} = ${manualExchangeRate??0}${productAndPricing.priceRule.baseCurrency}`);
            }else{
                setSelectedValue(`动态汇率:1${productAndPricing.priceRule.storeCurrency} = ${productAndPricing.priceRule.autoExchangeRate??0}${productAndPricing.priceRule.baseCurrency}`);
            }
            productAndPricing.setPriceRule({
                ...productAndPricing.priceRule,
                ...options
            })
            productAndPricing.refreshTable();
            // 刷新
            setOpen(false);
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    const init = ()=>{
        setEnableManualExchangeRate(productAndPricing.priceRule.enableManualExchangeRate);
        setManualExchangeRate(productAndPricing.priceRule.manualExchangeRate??0);
    }

    useEffect(()=>{
        setSelectedValue(productAndPricing.priceRule.enableManualExchangeRate?`固定汇率:1${productAndPricing.priceRule.storeCurrency} = ${productAndPricing.priceRule.manualExchangeRate??0}${productAndPricing.priceRule.baseCurrency}`:`动态汇率:1${productAndPricing.priceRule.storeCurrency} = ${productAndPricing.priceRule.autoExchangeRate??0}${productAndPricing.priceRule.baseCurrency}`);
    },[productAndPricing.priceRule.baseCurrency]);

    return (
        <>
            <div className="font-w-500 title">汇率策略</div>
            <ConfigProvider
                theme={{
                    token: {
                        /* 这里是你的全局 token */
                        paddingXXS:0,
                    },
                    components: {
                        Select: {
                            borderRadius:4,
                        },
                    },
                }}
            >
                <Select 
                    open={open}
                    value={selectedValue}
                    onOpenChange={(open)=>{
                        setOpen(open);
                        init();
                    }}
                    popupRender={()=>{
                        return <>
                            <div style={{padding:"16px"}}>
                                <div 
                                    style={{
                                        display:"flex",
                                        flexDirection:"column",
                                    }} 
                                >
                                    <Radio checked={!enableManualExchangeRate} onChange={()=>{
                                        setEnableManualExchangeRate(false);
                                    }}>动态汇率</Radio>
                                    {!enableManualExchangeRate && <div style={{marginLeft:"24px"}}>
                                        <div className="font-12 color-7A8499">商品售价将根据当前启用的汇率自动改变，并且包含0% 的转换费用。</div>
                                        <div style={{marginTop:"6px",padding:"12px",backgroundColor:"#F7F8FB"}}>
                                            <div>1 {productAndPricing.priceRule.storeCurrency} = {productAndPricing.priceRule.autoExchangeRate??0} {productAndPricing.priceRule.baseCurrency}</div>
                                            <div className="font-12 color-7A8499">更新时间：{new Date(productAndPricing.priceRule.autoExchangeUpdateTime).toLocaleString()}</div>
                                        </div>
                                    </div>}
                                    <Radio style={{marginTop:"12px"}} checked={enableManualExchangeRate} onChange={()=>{
                                        setEnableManualExchangeRate(true);
                                    }}>固定汇率</Radio>
                                    {enableManualExchangeRate && <div style={{marginLeft:"24px"}}>
                                        <div className="font-12 color-7A8499">自定义汇率，无转换费用。</div>
                                        <Flex align="center" style={{marginTop:"6px"}}>
                                            <div className="font-w-500" style={{width:"60px"}}>1{productAndPricing.priceRule.storeCurrency} = </div>
                                            <NumberInput
                                                value={manualExchangeRate}
                                                onChange={(value:number)=>setManualExchangeRate(value)}
                                                suffix={productAndPricing.priceRule.baseCurrency} 
                                                style={{height:"36px",flex:1}} 
                                                placeholder={productAndPricing.priceRule.autoExchangeRate??0}
                                            />
                                        </Flex>
                                    </div>}
                                </div>
                            </div>
                            <Flex justify="flex-end" style={{padding:"16px",borderTop:"1px solid #E5E5E5"}}>
                                <PrimaryButton loading={loading} text="确认" onClick={confirm} />
                            </Flex>
                        </>
                    }} 
                    style={{width:"100%",height:"36px"}} 
                />
            </ConfigProvider>
            
        </>
    )
}

export default observer(ExchangeRateItem);
