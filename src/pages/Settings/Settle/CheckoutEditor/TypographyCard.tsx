import MyCard from "@/components/Card/MyCard"
import styled from "styled-components"
import FontPicker from "./FormItem/FontPicker"
import checkoutEditor from "@/store/settings/settle/checkoutEditor"
import { useEffect } from "react"

function TypographyCard() {
    return (
        <Scoped>
            <div className="header">字体</div>
            {Object.keys(checkoutEditor.config.styleSystem?.typography).map((key,index) => {
                switch(key){
                    case 'secondary':{
                        const data = checkoutEditor.config.styleSystem?.typography?.[key];
                        return <div key={key}>
                            <div className="title">标题</div>
                            <FontPicker data={data} />
                        </div>
                    }
                    case 'primary':{
                        const data = checkoutEditor.config.styleSystem?.typography?.[key];
                        return <div key={key}>
                            <div className="title">正文</div>
                            <FontPicker data={data} />
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

export default TypographyCard