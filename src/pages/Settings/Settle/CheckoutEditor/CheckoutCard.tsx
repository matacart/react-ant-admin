import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import CheckoutLayoutCard from "./CheckoutLayoutCard"
import BannerCard from "./BannerCard"
import LogoCard from "./LogoCard"
import CheckoutMainCard from "./CheckoutMainCard"
import CheckoutOrderSummaryCard from "./CheckoutOrderSummaryCard"
import { useIntl } from "@umijs/max"

const CheckoutCard = () => {
    const intl = useIntl()
    return (
        <>
            <div className="header">
                <h3>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.themeSettings"})}</h3>
                <div>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.themeSettingsDesc"})}</div>
            </div>
            <div className="content">
                {/* 结账页面 */}
                {checkoutEditor.config.checkout?.stepType && <CheckoutLayoutCard />}
                {checkoutEditor.config.personalizations?.header?.banner && <BannerCard />}
                {checkoutEditor.config.personalizations?.header?.logo && <LogoCard />}
                {checkoutEditor.config.personalizations?.main && <CheckoutMainCard />}
                {checkoutEditor.config.personalizations?.orderSummary && <CheckoutOrderSummaryCard />}
            </div>
        </>
        
    )
}
export default CheckoutCard