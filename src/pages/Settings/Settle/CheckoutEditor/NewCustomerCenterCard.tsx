import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import CustomerLogoCard from "./CustomerLogoCard"
import CustomerMainCard from "./CustomerMainCard"
import { useIntl } from "@umijs/max";

const NewCustomerCenterCard = () => {
    const intl = useIntl(); 
    return (
        <>
            <div className="header">
                <h3>{intl.formatMessage({id:'settings.settle.checkoutEditor.header.newCustomerCenterTheme'})}</h3>
                <div>{intl.formatMessage({id:'settings.settle.checkoutEditor.header.newCustomerCenterThemeDescription'})}</div>
            </div>
            <div className="content">
                {/* 新客户中心 */}
                {checkoutEditor.config.personalizations?.customerHeader?.logo && <CustomerLogoCard />}
                {checkoutEditor.config.personalizations?.customerCenter && <CustomerMainCard />}
            </div>
        </>
    )
}
export default NewCustomerCenterCard