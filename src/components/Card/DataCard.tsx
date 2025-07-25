import { Card, Tooltip } from 'antd';
import styles from './DataCard.modules.scss'
import { useEffect, useState } from 'react';
import { getTodayData } from '@/services/y2/api';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";

interface todayDataType{
    currencySymbol:string;
    visitorCount:number;
    domainID:string;
    orderCount:number;
    totalSales:number;
}


export default function DataCard({

}) {

    const [todayData,setTodayData] = useState<todayDataType | null>();

    useEffect(()=>{
        const startTimer = dayjs().startOf('day').valueOf();
        const endTimer = dayjs().endOf('day').valueOf();
        getTodayData(startTimer/1000,endTimer/1000).then((res:any)=>{
            setTodayData(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    return (
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
                }}>今日数据
                </div>
                <Link to="/">查看更多 &gt;</Link>
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
                    className={styles.item}
                >
                    <div style={{
                        display: 'flex',
                    }}>
                        <img src='./icons/salesRevenue.svg' />
                        <Tooltip title="今天到目前为止的销售额">
                            <div className={styles.title}>
                                销售额
                            </div>
                        </Tooltip>
                    </div>
                    <div className={styles.value}>
                        <span>{todayData?.currencySymbol}{todayData?.totalSales.toFixed(2)}</span>
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
                        className={styles.item}
                    >
                        <div style={{
                            display: 'flex',
                        }}>
                            <img src='./icons/orderNumber.svg' />
                            <Tooltip title="今天到目前为止的订单数">
                                <div className={styles.title}>
                                    订单数
                                </div>
                            </Tooltip>
                        </div>
                        <div className={styles.value}>
                            <span>{todayData?.orderCount}</span>
                        </div>
                    </div>
                    {/* 3 */}
                    <div style={{
                        flex: '1',
                        height: '100px',
                        margin: '5px 5px',

                    }}
                        className={styles.item}
                    >
                        <div style={{
                            display: 'flex',
                        }}>
                            <img src='./icons/visitorCount.svg' />
                            <Tooltip title="今天到目前为止的访客数">
                                <div className={styles.title}>
                                    访客数
                                </div>
                            </Tooltip>
                        </div>
                        <div className={styles.value}>
                            <span>{todayData?.visitorCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}