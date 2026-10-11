import LangSelect from "@/components/Select/LangSelect";
import MySelect from "@/components/Select/MySelect"
import marketsList, { MarketType } from "@/store/settings/markets/marketsList";
import { RightOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { Card, Flex, List } from "antd"
import { observer } from "mobx-react-lite";

function MarketsList() {

    const names = (list:any[])=>{
        const nameList = list.map(item => item.name || "");
        const otherNum = nameList.length - 2;
        return nameList.slice(0, 2).join("、") + (otherNum > 0 ? `和其它${otherNum}个国家` : "");
        
    }

    const handleClick = (item:MarketType) => {
        history.push(`/settings/markets/${item.marketId}/${marketsList.languagesId}`)
    }

    return (
        <Card classNames={{body:"card"}} >
            <Flex justify="space-between" align="center" style={{margin:"20px"}}>
                <div className="color-242833 font-16 font-w-600">市场列表</div>
                <Flex gap={12}>
                    <LangSelect lang={marketsList.languagesId} setLang={(lang:string)=>marketsList.setLanguagesId(lang)} />    
                    <MySelect
                        style={{height:"36px"}}
                        defaultValue={"0"}
                        onChange={()=>{}}
                        options={[
                            { value: '0', label: '今天'},
                            { value: '1', label: '过去7天' },
                            { value: '2', label: '过去30天' },
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
                </Flex>
            </Flex>
            <List
                className="list"
                size="large"
                dataSource={marketsList.marketList}
                renderItem={(item) => {
                    if(item.homeMarket){
                        return (
                            <List.Item className="item" key={item.marketId} onClick={()=>handleClick(item)}>
                                <Flex style={{width:"100%"}} wrap justify="space-between" gap={20}>
                                    <Flex align="center">
                                        <div>
                                            <div className="item-icon">
                                                <span className="item-icon-text">{item.marketName?.slice(0, 2) || ""}</span>
                                            </div>
                                        </div>
                                        <div style={{marginLeft:28}}>
                                            <div className="font-16 color-242833 font-w-600">{item.marketName}</div>
                                        </div>
                                        <div>
                                            <span className="item-tag">主要市场</span>
                                        </div>
                                    </Flex>
                                    <Flex className="item-right" align="center">
                                        <div className="item-right-content">
                                            <div className="color-7A8499">总销售额份额</div>
                                            <div className="font-16 font-w-600">0%</div>
                                        </div>
                                        <div className="item-right-content">
                                            <div className="color-7A8499">销售额</div>
                                            <div className="font-16 font-w-600">0%</div>
                                        </div>
                                        <div className="item-right-content">
                                            <div className="color-7A8499">转化率</div>
                                            <div className="font-16 font-w-600">0%</div>
                                        </div>
                                    </Flex>
                                </Flex>
                                <RightOutlined />
                            </List.Item>
                        )
                    }else{
                        return (
                            <List.Item className="item" key={item.marketId} onClick={()=>handleClick(item)}>
                                <Flex style={{width:"100%"}} wrap justify="space-between" gap={20}>
                                    <Flex align="center">
                                        <div>
                                            <div className="item-icon">
                                                <span className="item-icon-text">{item.marketName?.slice(0, 2) || ""}</span>
                                            </div>
                                        </div>
                                        <div style={{marginLeft:28}}>
                                            <Flex align="center">
                                                <div className="font-16 color-242833 font-w-600">{item.marketName}</div>
                                                {!item.active && <span className="item-tag">已禁用</span>}
                                            </Flex>
                                            <div className="font-14 color-474F5E">{names(item.countryList)}</div>
                                        </div>
                                    </Flex>
                                    <Flex className="item-right" align="center">
                                        <div className="item-right-content">
                                            <div className="color-7A8499">总销售额份额</div>
                                            <div className="font-16 font-w-600">0%</div>
                                        </div>
                                        <div className="item-right-content">
                                            <div className="color-7A8499">销售额</div>
                                            <div className="font-16 font-w-600">0%</div>
                                        </div>
                                        <div className="item-right-content">
                                            <div className="color-7A8499">转化率</div>
                                            <div className="font-16 font-w-600">0%</div>
                                        </div>
                                    </Flex>
                                </Flex>
                                <RightOutlined />
                            </List.Item>
                        )
                    }
                }}
            />
        </Card>
    )
}

export default observer(MarketsList)
