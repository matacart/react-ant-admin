import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Flex, Select } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import accountManagement from "@/store/shops/accountManagementStore";
import { getUserLanguages } from "@/services/y2/api";
import MySelect from "@/components/Select/MySelect";

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

    const handleChange = (value:string)=>{
        accountManagement.setUserInfo({
            ...accountManagement.userInfo,
            languages_id: value
        })
    }

    return (
        <Scoped>
            <Card>
                <div className="title color-242833 font-w-600">账户语言</div>
                <div>
                    <MySelect style={{width:"240px",height:"36px"}} defaultValue={accountManagement.userInfo.languages_id} options={languageList} onChange={handleChange} />
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
