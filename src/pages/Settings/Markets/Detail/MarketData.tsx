import MySelect from "@/components/Select/MySelect"
import { getMarketStatistic } from "@/services/y2/apiSaleMarket"
import { useParams } from "@umijs/max";
import { Card, Flex } from "antd"
import { useEffect, useState } from "react"

function MarketData() {

    const {marketId="", langId=""} = useParams();

    const [statisticQueryType,setStatisticQueryType] = useState("yesterday");

    useEffect(()=>{
        getMarketStatistic({
            market_id:marketId,
            languages_id:langId,
            statistic_query_type:statisticQueryType,
        }).then(res=>{
            console.log(res)
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
            数据
        </Card>
    )
}

export default MarketData