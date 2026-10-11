import { ExportOutlined } from "@ant-design/icons"
import { Card, Checkbox, Flex } from "antd"
import { MarketPreferenceType } from "./Preferences"

function CheckoutCard({marketPreference,setMarketPreference}:{marketPreference:MarketPreferenceType,setMarketPreference:(preference:MarketPreferenceType)=>void}) {
    return (
        <Card>
            <div className="font-w-500" style={{marginBottom:12}}>结账</div>
            <Checkbox checked={marketPreference.enableSettleSwitchMarket} onChange={(e)=>setMarketPreference({...marketPreference,enableSettleSwitchMarket:e.target.checked})}>根据收货地址自动匹配市场</Checkbox>
            <div className="font-12 color-62708D" style={{marginTop:8}}>开启后，客户将使用收货地址对应市场的价格、货币及商品进行结帐。但需注意，未被市场设置包含的国家/地区将不可下单。<a>了解使用建议<ExportOutlined style={{position:"relative",top:"1px",margin:"0 4px"}} /></a></div>
        </Card>
    )
}
export default CheckoutCard