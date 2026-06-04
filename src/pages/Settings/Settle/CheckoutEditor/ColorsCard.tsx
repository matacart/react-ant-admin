import MyCard from "@/components/Card/MyCard"
import styled from "styled-components"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import { useEffect } from "react"
import SelectItem from "./FormItem/SelectItem"
import ColorPickerItem from "./FormItem/ColorPickerItem"

function ColorsCard() {

    return (
        <Scoped>
            <div className="header">颜色</div>
            {Object.keys(checkoutEditor.config.styleSystem?.colors).map((key,index) => {
                switch(key){
                    case 'global':{
                        const data = checkoutEditor.config.styleSystem?.colors?.[key];
                        return <div key={key}>
                            {Object.keys(data).map((key:string,index:number) => {
                                let globalData = {};
                                if(key === 'brand'){
                                    globalData = {
                                        label: "按钮背景",
                                        value:data[key],
                                        desc:""
                                    }
                                }
                                if(key === 'critical'){
                                    globalData = {
                                        label: "报错信息",
                                        value:data[key],
                                        desc:"错误信息提示和高亮边框"
                                    }
                                }
                                if(key === 'accent'){
                                    globalData = {
                                        label: "强调信息",
                                        value:data[key],
                                        desc:"链接、复选框、输入框边框和下拉菜单"
                                    }
                                }
                                return <ColorPickerItem key={key} data={globalData} />
                            })}
                        </div>
                    }
                    case 'form':{
                        const data = checkoutEditor.config.styleSystem?.colors?.[key];
                        return <div key={key}>
                            <div className="title">表单背景颜色</div>
                            <SelectItem data={data} />
                        </div>
                    }
                }
            })}
        </Scoped>
    )
}

const Scoped = styled(MyCard)`
    .header{
        margin-bottom: 16px;
    }
    .title{
        padding-bottom: 4px;
    }
`

export default ColorsCard
