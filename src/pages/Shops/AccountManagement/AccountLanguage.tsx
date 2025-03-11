import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Flex, Select } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import accountManagement from "@/store/shops/accountManagementStore";
import { getUserLanguages } from "@/services/y2/api";

function AccountLanguage() {


    const [languageList, setLanguageList] = useState([]);

    useEffect(()=>{
        // getUserLanguages().then(res=>{
        //     console.log(res)
        // })

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

    const handleChange = (value:string)=>{
        console.log(value)
        // accountManagement.setUser({languages_id:value})
        // getUserLanguages().then(res=>{
        //     console.log(res)
        // })
    }

    return (
        <Scoped>
            <Card>
                <div className="title color-242833 font-w-600">账户语言</div>
                <div>
                    <Select defaultValue={accountManagement.user.languages_id} style={{width:"240px"}} options={languageList} onChange={handleChange} />
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
