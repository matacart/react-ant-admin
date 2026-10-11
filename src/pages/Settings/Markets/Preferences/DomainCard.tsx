import { Card, Checkbox } from "antd"
import { MarketPreferenceType } from "./Preferences"
import { ExportOutlined } from "@ant-design/icons"

function DomainCard({marketPreference,setMarketPreference}:{marketPreference:MarketPreferenceType,setMarketPreference:(preference:MarketPreferenceType)=>void}) {
    return (
        <Card>
            <div className="font-w-500" style={{marginBottom:12}}>域名</div>
            <Checkbox checked={marketPreference.redirect} onChange={(e)=>setMarketPreference({...marketPreference,redirect:e.target.checked})}>域名/子文件夹自动重定向</Checkbox>
            <div className="font-12 color-62708D" style={{marginTop:8}}>如果客户登录错误的域名、子域名或子文件夹，系统会自动将他们重定向到支持其所在国家/地区的域名。由于法律限制，通过欧盟国家/地区代码顶级域名（ccTLD）获得本地化体验的欧盟客户不会被自动重定向。请注意，开启自动重定向可能会影响搜索引擎的抓取与收录，进而对多地区站点的 SEO 表现产生一定影响。<a>了解更多<ExportOutlined style={{position:"relative",top:"1px",margin:"0 4px"}} /></a></div>
        </Card>
    )
}

export default DomainCard