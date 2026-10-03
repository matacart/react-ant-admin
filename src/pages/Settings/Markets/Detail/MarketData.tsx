import MySelect from "@/components/Select/MySelect"
import { getMarketStatistic } from "@/services/y2/apiSaleMarket"
import marketsInfo from "@/store/settings/markets/marketsInfo";
import { getCurrencyAmount } from "@/utils/common";
import { useParams } from "@umijs/max";
import { Card, Flex } from "antd"
import { useEffect, useState } from "react"

interface StatisticData {
    customerPrice:number,
    customerPriceGrowthRate:number,
    totalConversion:number,
    totalConversionGrowthRate:number,
    totalSales:number,
    totalSalesGrowthRate:number,
    totalSalesComparison:number,
    totalSalesComparisonGrowthRate:number,
}

function MarketData() {

    const {marketId="", langId=""} = useParams();

    const [statisticQueryType,setStatisticQueryType] = useState("yesterday");

    const [statisticData,setStatisticData] = useState<StatisticData>({
        customerPrice:0,
        customerPriceGrowthRate:0,
        totalConversion:0,
        totalConversionGrowthRate:0,
        totalSales:0,
        totalSalesGrowthRate:0,
        totalSalesComparison:0,
        totalSalesComparisonGrowthRate:0,
    });

    useEffect(()=>{
        getMarketStatistic({
            market_id:marketId,
            languages_id:langId,
            statistic_query_type:statisticQueryType,
        }).then(res=>{
            setStatisticData(res.data || {})
        }).catch(()=>{
        })
    },[marketId,langId,statisticQueryType])

    return (
        <Card title={<Flex justify='space-between' align='center'>
            <span>数据</span>
            <MySelect
                style={{height:"36px"}}
                defaultValue={"yesterday"}
                onChange={(value)=>{
                    setStatisticQueryType(value)
                }}
                options={[
                    { value: 'yesterday', label: '昨天'},
                    { value: 'last_seven_days', label: '过去7天' },
                    { value: 'last_thirty_days', label: '过去30天' },
                ]}
                labelRender={(props) => {
                    const { label } = props
                    return (
                        <>
                            <span>日期范围：</span>
                            {label}
                        </>
                    )
                }}
            />
        </Flex>}>
            <Flex gap={12} vertical>
                <div>
                    <div className="font-w-500">总销售额份额</div>
                    <div style={{marginTop:"8px"}}>{statisticData.totalSalesComparison || 0}%</div>
                </div>
                <div>
                    <div className="font-w-500">销售额</div>
                    <div style={{marginTop:"8px"}}>{getCurrencyAmount(marketsInfo.marketsInfo.storeCurrency,statisticData.totalSales || 0)}</div>
                </div>
                <div>
                    <div className="font-w-500">转化率</div>
                    <div style={{marginTop:"8px"}}>{statisticData.totalConversion || 0 }%</div>
                </div>
                <div>
                    <div className="font-w-500">客单价</div>
                    <div style={{marginTop:"8px"}}>{getCurrencyAmount(marketsInfo.marketsInfo.storeCurrency,statisticData.customerPrice || 0)}</div>
                </div>
            </Flex>
        </Card>
    )
}

export default MarketData