import DefaultButton from "@/components/Button/DefaultButton"
import PrimaryButton from "@/components/Button/PrimaryButton"
import NumberInput from "@/components/Input/NumberInput"
import DefaultSelect from "@/components/Select/DefaultSelect"
import { modifyMarketProductPrice } from "@/services/y2/apiSaleMarket"
import productAndPricing from "@/store/settings/markets/productAndPricing"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { useParams } from "@umijs/max"
import { Flex, Modal, Space } from "antd"
import { useEffect, useState } from "react"

function PriceChangeItem() {

    const { marketId="", langId="" } = useParams();

    const [open,setOpen] = useState(false);

    const [loading,setLoading] = useState(false);

    const [downAdjust,setDownAdjust] = useState(false);

    const [priceAdjustRate,setPriceAdjustRate] = useState<number>();

    const cancel = ()=>{
        setOpen(false)
        setDownAdjust(productAndPricing.priceRule.downAdjust)
        setPriceAdjustRate(Math.abs(productAndPricing.priceRule.priceAdjustRate))
    }

    const confirm = ()=>{
        modifyMarketProductPrice({
            languages_id:langId,
            marketId:marketId,
            baseCurrency:productAndPricing.priceRule.baseCurrency,
            downAdjust:downAdjust,
            priceAdjustRate:priceAdjustRate??0
        }).then(()=>{
            productAndPricing.setPriceRule({
                ...productAndPricing.priceRule,
                downAdjust:downAdjust,
                priceAdjustRate:priceAdjustRate??0
            })
            setOpen(false);
        }).catch(()=>{
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        setDownAdjust(productAndPricing.priceRule.downAdjust)
        setPriceAdjustRate(productAndPricing.priceRule.priceAdjustRate)
    },[productAndPricing.priceRule.downAdjust,productAndPricing.priceRule.priceAdjustRate])

    return (
        <div>
            <div className="font-w-500 title">价格调整</div>
            <Space.Compact style={{width:"100%"}}>
                <DefaultSelect 
                    value={productAndPricing.priceRule.downAdjust?1:0} 
                    options={[
                        {
                            label:"价格升高",
                            value:0,
                        },
                        {
                            label:"价格降低",
                            value:1,
                        },
                    ]}
                    onChange={(value)=>{
                        setOpen(true)
                        setDownAdjust(value?true:false)
                    }}
                />
                <NumberInput 
                    value={productAndPricing.priceRule.priceAdjustRate} 
                    onBlur={(e:any)=>{
                        setOpen(true)
                        setPriceAdjustRate(e.target.value)
                    }}
                    style={{flex:1}}
                />
            </Space.Compact>
            <Modal
                width={480}
                centered={true}
                open={open}
                closable={false}
                onCancel={cancel}
                footer={<Flex justify="flex-end" gap={12}>
                    <DefaultButton loading={loading} onClick={cancel} text="取消" />
                    <PrimaryButton loading={loading} onClick={confirm} text="确认" />
                </Flex>}
            >
                <Flex align="flex-start" gap={8}>
                    <ExclamationCircleFilled className="color-356DFF font-24" />
                    <Flex className="font-16 font-w-500">确认要对商品价格整体调整比例吗？</Flex>
                </Flex>
                <div style={{margin:"12px 0px 24px 32px"}}>
                    <div>系统将按比例更新价格并进行货币换算。已手动固定的价格不受此比例影响。</div>
                </div>
            </Modal>
        </div>
    )
}


export default PriceChangeItem