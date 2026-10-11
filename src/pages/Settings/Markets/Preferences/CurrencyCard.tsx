import { Card, Checkbox, Flex } from "antd"
import { MarketPreferenceType } from "./Preferences"
import { ExportOutlined } from "@ant-design/icons"
import DefaultButton from "@/components/Button/DefaultButton"
import { history, useParams } from "@umijs/max"

function CurrencyCard({marketPreference,setMarketPreference}:{marketPreference:MarketPreferenceType,setMarketPreference:(preference:MarketPreferenceType)=>void}) {
    
    const { langId="" } = useParams();
    
    return (
        <Card>
            <div className="font-w-500" style={{marginBottom:12}}>货币</div>
            <Flex justify="space-between" gap={20} align="center">
                <div>
                    <Checkbox checked={marketPreference.priceRounding} onChange={(e)=>setMarketPreference({...marketPreference,priceRounding:e.target.checked})}>自定义价格尾数</Checkbox>
                    <div className="font-12 color-62708D" style={{marginTop:8}}>开启后，系统将默认应用符合当地习惯的尾数规则（如 .95），并向上凑齐价格。您也可以手动自定义规则。<a>了解更多<ExportOutlined style={{position:"relative",top:"1px",margin:"0 4px"}} /></a></div>
                </div>
                <DefaultButton text="自定义尾数规则" onClick={()=>history.push(`/settings/markets/priceRounding/${langId}`)}  />
            </Flex>
        </Card>
    )
}

export default CurrencyCard
