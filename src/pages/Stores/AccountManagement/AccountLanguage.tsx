import SuccessTag from "@/components/Tag/SuccessTag";
import { Button, Card, Flex, Select } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MySelect from "@/components/Select/MySelect";
import { getPlatformLanguagesList } from "@/services/y2/apiAppstore";
import accountManagement from "@/store/shops/accountManagement";
import { observer } from "mobx-react-lite";

function AccountLanguage() {

    const [languageList, setLanguageList] = useState([]);

    useEffect(()=>{
        getPlatformLanguagesList().then((res) => {
            setLanguageList(res.data.map((item:any)=>{
                return {
                    value: item.id,
                    label: item.languageName
                }
            }));
        }).catch(()=>{
        }).finally(()=>{
        });
    },[])

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
                    <MySelect style={{width:"240px",height:"36px"}} value={Number(accountManagement.userInfo.languages_id)} options={languageList} onChange={handleChange} />
                </div>
            </Card>
        </Scoped>
    )

}

export default observer(AccountLanguage);

const Scoped = styled.div`
    margin-bottom: 20px;
    .title{
        margin-bottom: 12px;
    }
`
