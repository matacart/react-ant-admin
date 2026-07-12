import MyCard from "@/components/Card/MyCard"
import styled from "styled-components"
import ImagePicker from "./FormItem/ImagePicker"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import ColorPickerItem from "./FormItem/ColorPickerItem"
import { setPersonalizationsData } from "./BannerCard"
import { toJS } from "mobx"
import _ from "lodash"
import { useIntl } from "@umijs/max"
import { setCheckoutEditorConfig } from "@/services/y2/apiCheckout"

export const setStyleSystemData = (item:string,data:any)=>{
    const newConfig = toJS(checkoutEditor.config);
    _.set(newConfig.styleSystem, item, data);
    setCheckoutEditorConfig({
        languages_id:checkoutEditor.languagesId,
        profile_id:checkoutEditor.profileId,
        config:JSON.stringify(newConfig),
        is_preview:"0",
    }).then((res)=>{
        if(res.code == "0"){
            // 添加操作到历史记录
            checkoutEditor.addToOperationHistory({
                type: "templateUpdate",
                undoData: checkoutEditor.config,
                redoData: newConfig,
                timestamp: Date.now(),
            });
            checkoutEditor.setConfig(newConfig);
        }else{
            console.log("更新失败");
        }
    })
}

const CheckoutMainCard = ()=>{
    
    const intl = useIntl()

    return (
        <Scoped>
            <div className="header">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.checkoutMainContent"})}</div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.backgroundImage"})}</div>
                <ImagePicker item="main.backgroundImage" data={checkoutEditor.config.personalizations?.main?.backgroundImage} setData={setPersonalizationsData} />
            </div>
            <div>
                <ColorPickerItem data={{
                    label:intl.formatMessage({id: "settings.settle.checkoutEditor.Left.backgroundColor"}),
                    value:checkoutEditor.config.styleSystem?.colors?.palettes?.palette1?.base?.background,
                    desc:""
                }} setDataValue={(value)=>{
                    setStyleSystemData("colors.palettes.palette1.base.background",value);
                }} />
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
export default CheckoutMainCard
