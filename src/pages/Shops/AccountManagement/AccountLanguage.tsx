import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Flex, Select } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";


function AccountLanguage() {


    const [languageList, setLanguageList] = useState([]);

    useEffect(()=>{
        let tempList = [];
        if(languageList.length==0){
            tempList = JSON.parse(sessionStorage["languages"]).map((item:any)=>{
                return {
                    value: item.id,
                    label: item.name
                }
            })
            setLanguageList(tempList)
        }
    })
    return (
        <Scoped>
            <Card>
                <div className="title color-242833 font-w-600">账户语言</div>
                <div>
                    <Select defaultValue={"1"} style={{width:"240px"}} options={languageList} />
                </div>
            </Card>
        </Scoped>
    )

}

export default AccountLanguage;

const Scoped = styled.div`
    margin-bottom: 20px;
    .title{
        margin-bottom: 12px;
    }
`
