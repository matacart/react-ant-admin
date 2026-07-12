import MyCard from "@/components/Card/MyCard"
import styled from "styled-components"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import ColorPickerItem from "./FormItem/ColorPickerItem"
import SelectItem from "./FormItem/SelectItem"
import { setStyleSystemData } from "./CheckoutMainCard"
import { setPersonalizationsData } from "./BannerCard"
import { createOptions6 } from "./Left"
import { useIntl } from "@umijs/max"

function ColorsCard() {

    const intl = useIntl();
    const options6 = createOptions6(intl);

    return (
        <Scoped>
            <div className="header">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.colors"})}</div>
            {Object.keys(checkoutEditor.config.styleSystem?.colors).map((key,index) => {
                switch(key){
                    case 'global':{
                        const data = checkoutEditor.config.styleSystem?.colors?.[key];
                        return <div key={key}>
                            {Object.keys(data).map((key:string,index:number) => {
                                let globalData = {};
                                if(key === 'brand'){
                                    globalData = {
                                        label: intl.formatMessage({id: "settings.settle.checkoutEditor.Left.brand"}),
                                        value:data[key],
                                        desc:""
                                    }
                                }
                                if(key === 'critical'){
                                    globalData = {
                                        label: intl.formatMessage({id: "settings.settle.checkoutEditor.Left.critical"}),
                                        value:data[key],
                                        desc: intl.formatMessage({id: "settings.settle.checkoutEditor.Left.criticalDesc"})
                                    }
                                }
                                if(key === 'accent'){
                                    globalData = {
                                        label: intl.formatMessage({id: "settings.settle.checkoutEditor.Left.accent"}),
                                        value:data[key],
                                        desc: intl.formatMessage({id: "settings.settle.checkoutEditor.Left.accentDesc"})
                                    }
                                }
                                return <ColorPickerItem key={key} data={globalData} setDataValue={(value)=>{
                                    setStyleSystemData(`colors.global.${key}`,value);
                                }} />
                            })}
                        </div>
                    }
                }
            })}
            {/* 表单背景 */}
            <div>
                <div className="title">{intl.formatMessage({id: "settings.settle.checkoutEditor.Left.formBackgroundColor"})}</div>
                <SelectItem options={options6} item="form.color" data={checkoutEditor.config.personalizations?.form?.color} setData={setPersonalizationsData}  />
            </div>
        </Scoped>
    )
}

const Scoped = styled(MyCard)`
    .ant-card-body{
        padding: 16px;
    }
    .header{
        margin-bottom: 16px;
    }
    .title{
        padding-bottom: 4px;
    }
`

export default ColorsCard
