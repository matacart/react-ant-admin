import DefaultButton from "@/components/Button/DefaultButton";
import DefaultSelect from "@/components/Select/DefaultSelect";
import MySelect from "@/components/Select/MySelect";
import domainAndLang from "@/store/settings/markets/domainAndLang";
import productAndPricing from "@/store/settings/markets/productAndPricing";
import { history } from "@umijs/max";
import { Card, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";

function BaseCurrency() {

    const [options,setOptions] = useState([]);

    useEffect(()=>{
        const localStorageCurrencyList = JSON.parse(localStorage.getItem("MC_DATA_CURRENCIES") || "[]");
        setOptions(localStorageCurrencyList.map((item:any)=>{
            return{
                label:item.name,
                value:item.code,
            }
        }))
    },[]);

    return (
        <MyCard>
            <>
                <div className="font-w-500 title">基准货币</div>
                <div className="font-12 color-67280D desc">主要市场的基准货币，由商店的结算货币决定。若要修改，请前往<span className="color-356DFF cursor-pointer" onClick={()=>{
                    window.open("/settings/base")
                }}>基础设置</span></div>
                <DefaultSelect value={productAndPricing.priceRule.baseCurrency} options={options} style={{width:"100%"}} disabled />
            </>
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .title{
        margin-bottom: 2px;
    }
    .desc{
        margin-bottom: 8px;
    }
`

export default observer(BaseCurrency)
