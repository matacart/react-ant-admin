import { useIntl } from "@umijs/max";
import { ConfigProvider, Select, Tooltip } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"

// 多语言选择框
export default function LangSelect({lang,setLang}:{lang:string,setLang:any}){

    const intl = useIntl();

    const [languageData, setLanguageData] = useState([]);

    useEffect(() => {
        let tempList = [];
        if(languageData.length==0){
            tempList = JSON.parse(sessionStorage["languages"] || "[]").map((item:any)=>{
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setLanguageData(tempList)
        }
    }, [])

    return (
        <Scoped>
            {languageData.length>0 && <>
                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                activeBorderColor:"#d7dbe7",
                                activeOutlineColor:"none",
                                hoverBorderColor:"#d7dbe7",
                                optionActiveBg:"#f7f8fb",
                                borderRadius:4
                            },
                        },
                    }}
                >
                    <span className="title">{intl.formatMessage({id: 'component.select.langSelect.shoplang'})}：</span>
                    <Select
                        className="langSelect"
                        value={lang}
                        onChange={(e)=>setLang(e)}
                        options={languageData}
                    />
                </ConfigProvider>
            </>}
        </Scoped>
    )
}

const Scoped = styled.div`
    font-size: 14px;
    display: flex;
    align-items: flex-end;
    .title{
        line-height: 36px;
    }
    .langSelect{
        height: 36px;
    }
`