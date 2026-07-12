import MyCard from "@/components/Card/MyCard"
import styled from "styled-components"
import ImagePicker from "./FormItem/ImagePicker"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import { Flex, Switch } from "antd"
import SelectItem from "./FormItem/SelectItem"
import { toJS } from "mobx"
import _ from "lodash"
import { createOptions1, createOptions4 } from "./Left"
import { useIntl } from "@umijs/max"
import { setCheckoutEditorConfig } from "@/services/y2/apiCheckout"


// 设置数据
export const setPersonalizationsData = (item:string,data:any) =>{
    const newConfig = toJS(checkoutEditor.config);
    _.set(newConfig.personalizations, item, data);
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

const BannerCard = ()=>{

    const intl = useIntl();
    const options1 = createOptions1(intl);
    const options4 = createOptions4(intl);

    return (
        <Scoped>
            <div className="header">Banner</div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.pcImage"})}</div>
                <ImagePicker item={"header.banner.pc.image"} data={checkoutEditor.config.personalizations?.header?.banner?.pc.image} setData={setPersonalizationsData} />
            </div>
            <div className="item">
                <div className="title">
                    <div>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.phoneImage"})}</div>
                    <div className="font-12 color-7A8499">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.phoneImageDesc"})}</div>
                </div>
                <ImagePicker item={"header.banner.phone.image"} data={checkoutEditor.config.personalizations?.header?.banner?.phone.image} setData={setPersonalizationsData} />
            </div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.pcImageHeight"})}</div>
                <SelectItem options={options4} item={"header.banner.pc.image.height"} data={checkoutEditor.config.personalizations?.header?.banner?.pc?.image?.height} setData={setPersonalizationsData} />
            </div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.phoneImageHeight"})}</div>
                <SelectItem options={options4} item={"header.banner.phone.image.height"} data={checkoutEditor.config.personalizations?.header?.banner?.phone?.image?.height} setData={setPersonalizationsData} />
            </div>
            <div className="item">
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.imageShowArea"})}</div>
                <SelectItem options={options1} item={"header.banner.image.show"} data={checkoutEditor.config.personalizations?.header?.banner?.image?.show} setData={setPersonalizationsData} />
            </div>
            <div>
                <Flex justify="space-between">
                    <div>{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.pcImageFullScreen"})}</div>
                    <Switch checked={checkoutEditor.config.personalizations?.header?.banner?.fullScreen} onChange={(val)=>{
                        setPersonalizationsData("header.banner.fullScreen",val);
                    }} />
                </Flex>
            </div>
        </Scoped>
    )
}

export default BannerCard

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
