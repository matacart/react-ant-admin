import MyCard from "@/components/Card/MyCard"
import styled from "styled-components"
import ImagePicker from "./FormItem/ImagePicker"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import SelectItem from "./FormItem/SelectItem"
import { setPersonalizationsData } from "./BannerCard"
import { createOptions2, createOptions3, createOptions5 } from "./Left"
import { useIntl } from "@umijs/max"

const LogoCard = ()=>{

    const intl = useIntl();
    const options2 = createOptions2(intl);
    const options3 = createOptions3(intl);
    const options5 = createOptions5(intl);

    return (
        <Scoped>
            <div className="header">Logo</div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.customImage"})}</div>
                <ImagePicker item="header.logo.image" data={checkoutEditor.config.personalizations?.header?.logo?.image} setData={setPersonalizationsData} />
            </div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.logoSize"})}</div>
                <SelectItem options={options2} item="header.logo.size" data={checkoutEditor.config.personalizations?.header?.logo?.size} setData={setPersonalizationsData} />
            </div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.logoAlignment"})}</div>
                <SelectItem options={options3} item="header.alignment" data={checkoutEditor.config.personalizations?.header?.alignment} setData={setPersonalizationsData} />
            </div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.logoPosition"})}</div>
                <SelectItem options={options5} item="header.position" data={checkoutEditor.config.personalizations?.header?.position} setData={setPersonalizationsData} />
            </div>
        </Scoped>
    )
}

export default LogoCard

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

