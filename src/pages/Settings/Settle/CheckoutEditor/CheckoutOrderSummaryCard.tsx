import MyCard from "@/components/Card/MyCard"
import styled from "styled-components"
import ImagePicker from "./FormItem/ImagePicker"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import SelectItem from "./FormItem/SelectItem"
import ColorPickerItem from "./FormItem/ColorPickerItem"
import { setPersonalizationsData } from "./BannerCard"
import { createOptions7 } from "./Left"
import { setStyleSystemData } from "./CheckoutMainCard"
import { useIntl } from "@umijs/max"

const CheckoutOrderSummaryCard = ()=>{

    const intl = useIntl();
    const options7 = createOptions7(intl);

    return (
        <Scoped>
            <div className="header">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.checkoutOrderSummary"})}</div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.backgroundImage"})}</div>
                <ImagePicker item="orderSummary.backgroundImage" data={checkoutEditor.config.personalizations?.orderSummary?.backgroundImage} setData={setPersonalizationsData} />
            </div>
            <div>
                <ColorPickerItem data={{
                    label:intl.formatMessage({id: "settings.settle.checkoutEditor.Left.backgroundColor"}),
                    value:checkoutEditor.config.styleSystem?.colors?.palettes?.palette2?.base?.background,
                    desc:""
                }} setDataValue={(value)=>{
                    setStyleSystemData("colors.palettes.palette2.base.background",value);
                }} />
            </div>
            <div>
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.phoneCollapse"})}</div>
                <SelectItem options={options7} item={"orderSummary.phoneCollapse"} data={checkoutEditor.config.personalizations?.orderSummary?.phoneCollapse} setData={setPersonalizationsData} />
            </div>
        </Scoped>
    )
}
const Scoped = styled(MyCard)`
    .ant-card-body{
        padding: 16px;
    }
    .header{
        font-weight: 500;
        margin-bottom: 16px;
    }
    .item{
        margin-bottom: 12px;
    }
    .title{
        padding-bottom: 4px;
    }
`
export default CheckoutOrderSummaryCard
