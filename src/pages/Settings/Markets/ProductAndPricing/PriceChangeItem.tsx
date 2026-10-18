import NumberInput from "@/components/Input/NumberInput"
import DefaultSelect from "@/components/Select/DefaultSelect"
import productAndPricing from "@/store/settings/markets/productAndPricing"
import { Space } from "antd"

function PriceChangeItem() {
    return (
        <div>
            <div className="font-w-500 title">价格调整</div>
            <Space.Compact style={{width:"100%"}}>
                <DefaultSelect value={productAndPricing.priceRule.downAdjust} options={[
                    {
                        label:"价格升高",
                        value:0,
                    },
                    {
                        label:"价格降低",
                        value:1,
                    },
                ]} />
                <NumberInput style={{flex:1}} />
            </Space.Compact>
            {/* <DefaultSelect value={productAndPricing.priceRule.storeCurrency} options={options} style={{width:"100%"}} /> */}
        </div>
    )
}


export default PriceChangeItem