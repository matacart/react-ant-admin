import { Card, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { getTodayData } from '@/services/y2/api';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import salesRevenue from '@/../public/icons/commons/salesRevenue.svg';
import orderNumber from '@/../public/icons/commons/orderNumber.svg';
import visitorCount from '@/../public/icons/commons/visitorCount.svg';
import { useAbortController } from '@/hooks/customHooks';
import styled from 'styled-components';
import { useIntl } from '@umijs/max';

interface todayDataType{
    customerCount:number;
    currencySymbol:string;
    visitorCount:number;
    domainID:string;
    orderCount:number;
    totalSales:number;
}


export default function DataCard() {

    const init = useIntl();

    const { createAbortController } = useAbortController();

    const [todayData,setTodayData] = useState<todayDataType | null>({
        currencySymbol: "$",
        customerCount: 0,
        domainID: "0",
        orderCount: 0,
        totalSales: 0,
        visitorCount: 0,
    });

    useEffect(()=>{

        const startTimer = dayjs().startOf('day').valueOf();
        const endTimer = dayjs().endOf('day').valueOf();

        // 创建 AbortController 信号
        const signal = createAbortController();

        // getTodayData(startTimer/1000,endTimer/1000,{ signal }).then((res:any)=>{
        //     if(res.code !== 201){
        //         setTodayData(res.data)
        //     }
        // }).catch(err=>{
        //     // 检查是否是取消请求导致的错误
        //     if (err.name !== 'CanceledError') {
        //         console.log(err)
        //     }
        // })
    },[])

    return (
        <Scoped>
            <Card>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px"
                }} >
                    <div style={{
                        display: "inline-block",
                        flex: 1,
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "22px"
                    }}>
                        {init.formatMessage({ id: 'dataCard.todayData' })}
                    </div>
                    <Link to="/">{init.formatMessage({ id: 'dataCard.more' })} &gt;</Link>
                </div>

                <div style={{
                    display: "flex",
                    minWidth: '140px',
                    flexWrap: 'wrap',
                }}>
                    {/* 1 */}
                    <div style={{
                        flex: '1 1 auto',
                        height: '100px',
                        minWidth: '145px',
                        margin: '5px 5px',
                    }}
                        className="item"
                    >
                        <div style={{
                            display: 'flex',
                        }}>
                            <img src={salesRevenue} />
                            <Tooltip title={init.formatMessage({ id: 'dataCard.todaySalesRevenue' })}>
                                <div className="title">
                                    {init.formatMessage({ id: 'dataCard.salesRevenue' })}
                                </div>
                            </Tooltip>
                        </div>
                        <div className="value">
                            <span>{todayData?.currencySymbol}{todayData?.totalSales?.toFixed(2)}</span>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flex: '2 2 auto',
                        height: '100px',
                        minWidth: '290px',
                    }}>
                        {/* 2 */}
                        <div style={{
                            flex: '1',
                            height: '100px',
                            margin: '5px 5px',
                        }}
                            className="item"
                        >
                            <div style={{
                                display: 'flex',
                            }}>
                                <img src={orderNumber} />
                                <Tooltip title={init.formatMessage({ id: 'dataCard.todayOrderNumber' })}>
                                    <div className={"title"}>
                                        {init.formatMessage({ id: 'dataCard.orderNumber' })}
                                    </div>
                                </Tooltip>
                            </div>
                            <div className={"value"}>
                                <span>{todayData?.orderCount}</span>
                            </div>
                        </div>
                        {/* 3 */}
                        <div style={{
                            flex: '1',
                            height: '100px',
                            margin: '5px 5px',

                        }}
                            className={"item"}
                        >
                            <div style={{
                                display: 'flex',
                            }}>
                                <img src={visitorCount} />
                                <Tooltip title={init.formatMessage({ id: 'dataCard.todayVisitorCount' })}>
                                    <div className={"title"}>
                                        {init.formatMessage({ id: 'dataCard.visitorCount' })}
                                        
                                    </div>
                                </Tooltip>
                            </div>
                            <div className={"value"}>
                                <span>{todayData?.visitorCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Scoped>
        
    )
}

const Scoped = styled.div`
    .item{
        background: linear-gradient(240.87deg, rgba(247, 248, 251, 0.75) 0%, rgba(247, 248, 251, 0.375) 98.92%);
        border: 1px solid #f0f3f9;
        border-radius: 6px;
        padding: 16px 20px;
        .title{
            margin-left: 8px;
            color: #7a8499;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            border-bottom: 1px dashed #b8becc;
            cursor: pointer;
            word-break: break-words;
        }

        .value{
            margin-top: 15px;
            color: #242833;
            font-weight: 500;
            font-size: 28px;
            line-height: 1;
        }

    }

`

