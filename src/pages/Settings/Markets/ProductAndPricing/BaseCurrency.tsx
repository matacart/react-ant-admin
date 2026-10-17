import DefaultSelect from "@/components/Select/DefaultSelect";
import productAndPricing from "@/store/settings/markets/productAndPricing";
import { history } from "@umijs/max";
import { Card, Checkbox, Flex } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BaseCurrencyItem from "./BaseCurrencyItem";

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
                    <div className="item">
                        <div className="font-w-500 title">汇率策略</div>
                        <DefaultSelect value={productAndPricing.priceRule.storeCurrency} options={options} style={{width:"100%"}} />
                    </div>
                    <div className="item">
                        <div className="font-w-500 title">价格调整</div>
                        <DefaultSelect value={productAndPricing.priceRule.storeCurrency} options={options} style={{width:"100%"}} />
                    </div>
                </Flex>
                <div style={{marginTop:"12px"}}>
                    <Checkbox>以客户所在国家/地区的当地货币显示价格</Checkbox>
                </div>
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
