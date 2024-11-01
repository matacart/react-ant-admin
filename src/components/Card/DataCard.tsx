import { Link } from '@umijs/max';
import { Card } from 'antd';
import styles from './DataCard.modules.scss'
export default function DataCard({

}) {

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
                <Link to="/data">查看更多 &gt;</Link>
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
                        <div className={styles.title}>
                            销售额
                        </div>
                    </div>
                    <div className={styles.value}>
                        <span>US$0.00</span>
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
                            <div className={styles.title}>
                                订单数
                            </div>
                        </div>
                        <div className={styles.value}>
                            <span>0</span>
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
                            <div className={styles.title}>
                                销售额
                            </div>
                        </div>
                        <div className={styles.value}>
                            <span>0</span>
                        </div>

                    </div>
                </div>


            </div>
        </Card>
    )
}