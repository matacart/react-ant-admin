import { QuestionCircleOutlined } from "@ant-design/icons"
import { ConfigProvider, Select, Tooltip } from "antd"
import { useEffect, useState } from "react";
import styled from "styled-components"

// 多语言选择框
export default function LangSelect({isLabel,lang,setLang}:{isLabel?:string | boolean,lang?:string,setLang:any}){

    const [languageData, setLanguageData] = useState([]);

    useEffect(() => {
        let tempList = [];
        if(languageData.length==0){
            tempList = JSON.parse(sessionStorage["languages"]).map((item:any)=>{
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
                {isLabel ?<></>:<div className="title">语言：</div>}
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
                    <Select
                        className="langSelect"
                        value={lang || "2"}
                        onChange={(e)=>setLang(e)}
                        options={languageData}
                    />
                </ConfigProvider>
                {/* <Tooltip title="商品支持多种语言，请选择某种语言后再操作。">
                    <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                        <QuestionCircleOutlined />
                    </span>
                </Tooltip> */}
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