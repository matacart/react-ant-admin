import MyCard from "@/components/Card/MyCard"
import styled from "styled-components"
import ImagePicker from "./FormItem/ImagePicker"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import ColorPickerItem from "./FormItem/ColorPickerItem"
import { useIntl } from "@umijs/max"

const CustomerMainCard = ()=>{

    const intl = useIntl();

    const setDataValue = (data:any) => {
        console.log(data);
    }

    return (
        <Scoped>
            <div className="header">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.customMainBackground"})}</div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.customMainBackgroundImage"})}</div>
                <ImagePicker item="banner" data={checkoutEditor.config.personalizations?.header?.banner?.pc.image} setData={()=>{}} />
            </div>
            <div>
                <ColorPickerItem data={{
                    label:intl.formatMessage({id: "settings.settle.checkoutEditor.Left.backgroundColor"}),
                    value:checkoutEditor.config.styleSystem?.colors?.palettes?.palette1?.base?.background,
                    desc:""
                }} setDataValue={setDataValue} />
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
export default CustomerMainCard
