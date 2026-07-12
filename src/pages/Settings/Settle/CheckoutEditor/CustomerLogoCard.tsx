import MyCard from "@/components/Card/MyCard"
import styled from "styled-components"
import ImagePicker from "./FormItem/ImagePicker"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import SelectItem from "./FormItem/SelectItem"
import { createOptions2 } from "./Left"
import { useIntl } from "@umijs/max"

const CustomerLogoCard = ()=>{

    const intl = useIntl();
    const options2 = createOptions2(intl);

    return (
        <Scoped>
            <div className="header">Logo</div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.customLogo"})}</div>
                <ImagePicker item="banner" data={checkoutEditor.config.personalizations?.header?.banner?.pc.image} setData={()=>{}} />
            </div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.customLogoSize"})}</div>
                <SelectItem options={options2} item="banner" data={checkoutEditor.config.personalizations?.header?.banner?.pc?.image?.height} setData={()=>{}} />
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
export default CustomerLogoCard
