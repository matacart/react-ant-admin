import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DefaultSelect from "@/components/Select/DefaultSelect";
import { modifyMarketProductPrice } from "@/services/y2/apiSaleMarket";
import productAndPricing from "@/store/settings/markets/productAndPricing";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useParams } from "@umijs/max";
import { Checkbox, Flex, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

function LocalCurrencyItem() {

    const { marketId="", langId="" } = useParams();

    const [loading,setLoading] = useState(false);

    const [useLocalCurrency,setUseLocalCurrency] = useState(false);

    const [open,setOpen] = useState(false);

    const cancel = ()=>{
        setOpen(false);
    }

    const confirm = ()=>{
        setLoading(true);
        modifyMarketProductPrice({
            languages_id:langId,
            marketId:marketId,
            baseCurrency:productAndPricing.priceRule.baseCurrency,
            downAdjust:productAndPricing.priceRule.downAdjust,
            priceAdjustRate:productAndPricing.priceRule.priceAdjustRate,
            useLocalCurrency:useLocalCurrency,
            skuPriceExchangeList:"[]",
            productPriceExchangeList:"[]",
        }).then(()=>{
            setOpen(false);
            productAndPricing.setPriceRule({
                ...productAndPricing.priceRule,
                useLocalCurrency:useLocalCurrency,  
            })
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        setUseLocalCurrency(productAndPricing.priceRule.useLocalCurrency);
    },[productAndPricing.priceRule.useLocalCurrency]);

    return (
        <>
            <div style={{marginTop:"12px"}}>
                <Checkbox checked={productAndPricing.priceRule.useLocalCurrency} onChange={(e)=>{
                    setOpen(true);
                    setUseLocalCurrency(e.target.checked);
                }}> 以客户所在国家/地区的当地货币显示价格</Checkbox>
            </div>
            <Modal
                width={480}
                centered={true}
                open={open}
                closable={false}
                onCancel={cancel}
                footer={<Flex justify="flex-end" gap={12}>
                    <DefaultButton loading={loading} onClick={cancel} text="取消"></DefaultButton>
                    {productAndPricing.priceRule.useLocalCurrency ? <DangerButton loading={loading} onClick={confirm} text="确认" />:<PrimaryButton loading={loading} onClick={confirm} text="确认" />}
                </Flex>}
            >
                {productAndPricing.priceRule.useLocalCurrency ? <>
                    <Flex align="flex-start" gap={8}>
                        <ExclamationCircleFilled className="color-F86140 font-24" />
                        <Flex className="font-16 font-w-500">确认要{productAndPricing.priceRule.useLocalCurrency?"停用":"启用"}以当地货币显示价格吗？</Flex>
                    </Flex>
                    <div style={{margin:"12px 0px 24px 32px"}}>
                        <div>停用后：</div>
                        <div>1. 该市场下所有国家/地区的客户将以基准货币查看商品价格及进行支付。</div>
                        <div>2. 已设定的汇率策略也将重置。</div>
                        <div style={{marginTop:"20px"}}>
                            由于客户通常更倾向于使用本地货币支付，建议保持开启当地货币，以提升转化率。
                        </div>
                    </div>
                </>:<>
                    <Flex align="flex-start" gap={8}>
                        <ExclamationCircleFilled className="color-356DFF font-24" />
                        <Flex className="font-16 font-w-500">开启以当地货币显示价格吗？</Flex>
                    </Flex>
                    <div style={{margin:"12px 0px 24px 32px"}}>
                        <div>开启后：</div>
                        <div>1. 该市场下所有国家/地区的客户将以当地货币查看商品价格及进行支付。</div>
                        <div>2. 已设定的汇率策略也将重置。</div>
                    </div>
                </>}
            </Modal>
        
        </>
    )
}

export default observer(LocalCurrencyItem);
