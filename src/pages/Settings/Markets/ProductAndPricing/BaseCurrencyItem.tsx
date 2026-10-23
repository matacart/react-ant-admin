import DangerButton from "@/components/Button/DangerButton";
import DefaultButton from "@/components/Button/DefaultButton";
import DefaultSelect from "@/components/Select/DefaultSelect";
import { modifyMarketProductPrice } from "@/services/y2/apiSaleMarket";
import productAndPricing from "@/store/settings/markets/productAndPricing";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useParams } from "@umijs/max";
import { Flex, Modal } from "antd";
import { useEffect, useState } from "react";

function BaseCurrencyItem() {

    const { marketId="", langId="" } = useParams();

    const [options,setOptions] = useState([]);

    const [loading,setLoading] = useState(false);

    const [open,setOpen] = useState(false);

    const [selectedValue, setSelectedValue] = useState({label:"",value:""});

    const cancel = ()=>{
        setOpen(false);
    }

    const confirm = ()=>{
        setLoading(true);
        modifyMarketProductPrice({
            languages_id:langId,
            marketId:marketId,
            baseCurrency:selectedValue.value,
            downAdjust:productAndPricing.priceRule.downAdjust,
            priceAdjustRate:productAndPricing.priceRule.priceAdjustRate,
            useLocalCurrency:productAndPricing.priceRule.useLocalCurrency,
            skuPriceExchangeList:"[]",
            productPriceExchangeList:"[]",
        }).then(()=>{
            setOpen(false);
            productAndPricing.setPriceRule({
                ...productAndPricing.priceRule,
                baseCurrency:selectedValue.value
            })
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        const localStorageCurrencyList = JSON.parse(localStorage.getItem("MC_DATA_CURRENCIES") || "[]");
        setOptions(localStorageCurrencyList.map((item:any)=>{
            return{
                label:item.name,
                value:item.code,
            }
        }))
    },[]);

    return (
        <>
            <div className="font-w-500 title">基准货币</div>
            <DefaultSelect value={productAndPricing.priceRule.baseCurrency} onChange={(value,options:any)=>{
                setOpen(true);
                setSelectedValue({
                    label:options.label,
                    value:options.value,
                });
            }} options={options} style={{width:"100%"}} />
            <Modal
                width={480}
                centered={true}
                open={open}
                closable={false}
                onCancel={cancel}
                footer={<Flex justify="flex-end" gap={12}>
                    <DefaultButton loading={loading} onClick={cancel} text="取消"></DefaultButton>
                    <DangerButton loading={loading} onClick={confirm} text="确认"></DangerButton>
                </Flex>}
            >
                <Flex align="flex-start" gap={8}>
                    <ExclamationCircleFilled className="color-F86140 font-24" />
                    <Flex className="font-16 font-w-500">确认要将基准货币修改为{selectedValue.label}吗？</Flex>
                </Flex>
                <div style={{margin:"12px 0px 24px 32px"}}>
                    <div>修改后：</div>
                    <div>1. 已设定的固定价格将会被重置，并按照原始价格换算成{selectedValue.label}计算原价和售价。</div>
                    <div>2. 已设定的汇率策略也将重置。</div>
                </div>
            </Modal>
        
        </>
    )
}

export default BaseCurrencyItem;
