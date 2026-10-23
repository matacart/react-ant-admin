import DefaultSelect from "@/components/Select/DefaultSelect";
import productAndPricing from "@/store/settings/markets/productAndPricing";
import { history } from "@umijs/max";
import { Card, Checkbox, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BaseCurrencyItem from "./BaseCurrencyItem";
import PriceChangeItem from "./PriceChangeItem";
import ExchangeRateItem from "./ExchangeRateItem";
import LocalCurrencyItem from "./LocalCurrencyItem";

function BaseCurrency() {

    const [options,setOptions] = useState([]);

    return (
        <MyCard>
            {/* 主市场 */}
            {productAndPricing.marketDetail.homeMarket ? <>
                <div className="font-w-500 title">基准货币</div>
                <div className="font-12 color-67280D desc">主要市场的基准货币，由商店的结算货币决定。若要修改，请前往<span className="color-356DFF cursor-pointer" onClick={()=>{
                    window.open("/settings/base")
                }}>基础设置</span></div>
                <DefaultSelect value={productAndPricing.priceRule.baseCurrency} options={options} style={{width:"100%"}} disabled />
            </>:<>
                <Flex gap={20}>
                    <div className="item">
                        <BaseCurrencyItem />
                    </div>
                    {(productAndPricing.priceRule.baseCurrency !== productAndPricing.priceRule.storeCurrency) &&<div className="item">
                        <ExchangeRateItem />
                    </div>}
                    <div className="item">
                        <PriceChangeItem />
                    </div>
                </Flex>
                {productAndPricing.marketDetail?.countryList?.length > 1 && <LocalCurrencyItem />}
            </>}
        </MyCard>
    )
}

const MyCard = styled(Card)`
    .title{
        margin-bottom: 8px;
    }
    .desc{
        margin-bottom: 8px;
    }
    .item{
        flex: 1;
    }
`

export default observer(BaseCurrency)
