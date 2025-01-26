import BindCard from "@/components/Card/BindCard"
import LittleLayout from "@/components/Layout/LittleLayout"
import { CheckCircleOutlined, ExportOutlined, HistoryOutlined, MinusCircleOutlined, QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons"
import { Link } from "@umijs/max"
import { Button, Col, Row, Tag, Tooltip } from "antd"
import styled from "styled-components"
import { history } from 'umi'

export default function Package() {
    return (
        <Scoped>
            <LittleLayout
                back={true}
                title="套餐"
                more={<Button type="primary"
                    onClick={()=>{
                        history.push('/settings/bill');
                    }}
                >查看账单</Button>}
            >
                {/* 支付方式 */}
                <Row>
                    <Col span={8} className="pay-func">
                        <h3 className="title">支付方式</h3>
                        <p className="description">
                            <div>管理您在 MataCart 中支付账单的方式。</div>
                            <Link key='viewAutoDeductRule' to=''>
                                查看自动扣费规则
                                <ExportOutlined className="mc-symbol-icon" />
                            </Link>
                        </p>
                    </Col>
                    <Col span={16}>
                        <div className="wrapper">
                            <div className="container">
                                <div className="left">
                                    <div className="header">
                                        自动续费
                                        <Tag style={{
                                            marginLeft: '8px',
                                        }}
                                            icon={<MinusCircleOutlined />} color="default"
                                        >
                                            已停用
                                        </Tag>
                                    </div>
                                    <div className="desc">
                                        开启后，当店铺套餐到期时，系统将进行自动订阅店铺套餐。
                                    </div>
                                </div>
                                <Button>
                                    开启自动续费
                                </Button>
                            </div>
                        </div>
                        <div className="brand-card">
                            <div className="header">
                                <div className="title">
                                    当前已绑定的银行卡
                                </div>
                                <div className="desc">
                                    绑定银行卡自动续费，仅在店铺产生相关费用时，对你的银行卡发起划扣。
                                    <Tooltip title="绑卡过程，会发起一笔小额支付（折合约1美元），完成绑卡信息的验证，支付后，会在7个工作日里退还。"><QuestionCircleOutlined className="mc-symbol-icon" /></Tooltip>
                                </div>
                            </div>

                            <BindCard />
                        </div>
                    </Col>
                </Row>

                {/* 我的套餐 */}
                <Row className="myPackage">
                    <Col span={8}>
                        <div className="left-title">我的套餐</div>
                        <p className="left-desc">
                            管理你的 MataCart 套餐，并查看套餐详细信息和佣金流水。<br />
                            查看
                            <Link to='#' className="link">服务细则</Link>
                            <span className="span">|</span>
                            <Link to='#' className="link">
                                隐私条款
                                <ExportOutlined className="spin-icon" />
                            </Link>
                        </p>
                    </Col>
                    <Col span={16}>
                        <div className="right-wrapper">
                            <div className="right-header">
                                <div className="right-title" style={{ flex: 1 }}>
                                    入门版
                                    <span style={{ margin: "0 16px" }}>
                                        试用
                                    </span>
                                    <Tag icon={<CheckCircleOutlined />} color="success">
                                        启用中
                                    </Tag>
                                </div>
                                <Link to={`/stores-subscriptions/list/paid`}>
                                <Button>购买套餐</Button>
                                </Link>
                            </div>
                            <div className="sectionBox">
                                <div className="sectionLabel">
                                    试用结束日期
                                </div>
                                <div className="sectionValue">
                                    2024-07-03 10:00
                                </div>
                            </div>
                            <div className="sectionBox">
                                <div className="sectionLabel">
                                    US$100
                                </div>
                                <div className="sectionValue">
                                    剩余免佣额度
                                </div>
                                <div className="sectionDesc">
                                    试用期总免佣金额度US$0，超出部分开始计算佣金，具体可查看
                                    <Link to='#' style={{ marginLeft: '3px' }}>
                                        佣金规则
                                        <ExportOutlined className="spin-icon" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>


                {/* 我的服务权益 */}
                <Row className="myServiceRights">
                    <Col span={8}>
                        <div className="left-title">我的的服务权益</div>
                        <p className="left-desc">
                            管理你的 MataCart 套餐之外购买的服务和权益。
                        </p>
                    </Col>
                    <Col span={16} >
                        <div className="wrap">
                            <div className="header">
                                <span className="secondaryText">当前店铺套餐</span>
                                <span>入门版（试用）</span>
                            </div>
                            <div className="productItem">
                                <div className="productInfo">
                                    <div className="productName">
                                        Facebook粉丝页
                                    </div>
                                    <div className="productDesc">
                                        串接更多Facebook粉丝页
                                        ，提升店铺销量
                                    </div>
                                    <div className="productNum">
                                        当前可用数量：
                                        <span className="productNumValue">
                                            5
                                        </span>
                                    </div>
                                </div>
                                <div className="rightButtonWrapper">
                                    <Button type="primary">购买</Button>
                                </div>
                            </div>
                            <div className="productItem">
                                <div className="productInfo">
                                    <div className="productName">
                                        社交商务Pro（试用）
                                        <Tag
                                        style={{marginRight: '10px'}}
                                        icon={<CheckCircleOutlined />} color="success">
                                        启用中
                                        </Tag>
                                    </div>
                                    <div className="productDesc">
                                    社交商务下的AI识别、游戏、直播打印标签等功能，提升店铺销量
                                    </div>
                                    <div className="productNum">
                                        试用到期日期：
                                        <span className="productNumValue">
                                            2024-07-03 10:00
                                            <Tooltip title="SC Pro试用期内进行购买，会附赠剩余试用时长到正式版本中"><QuestionCircleOutlined className="mc-symbol-icon" /></Tooltip>
                                            
                                        </span>
                                    </div>
                                </div>
                                <div className="rightButtonWrapper">
                                    <Button type="primary">购买</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </LittleLayout>
        </Scoped>
    )
}

const Scoped = styled.div`
.mc-symbol-icon{
    margin-left: 4px;
}
.pay-func{
    .title{
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    }
    .description{
        color: #474f5e;
        margin-right: 13px;
        color: #474f5e;
        font-size: 14px;
        line-height: 20px;
    }

}
.secondaryText{
    margin-right: 14px;
    color: #7a8499;
    font-weight: 400;
}
.wrapper{
    border-radius: 6px;
    margin-bottom: 20px;
    background: #fff;
    .container{
        display: flex;
        align-items: center;
        padding: 20px 24px;
        background: #fff;
        line-height: 20px;
        border-radius: 6px;
        .left{
            flex: 1;
            margin-right: 20px;
            .header{
                margin-top: 0;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: start;
                margin-bottom: 4px;
                color: #242833;
                font-weight: 500;
            }
            .desc{
                color: #474f5e;
                font-size: 14px;
                line-height: 16px;
            }
        }
    }
}
.brand-card{
    display: flex;
    align-items: center;
    padding: 20px 24px;
    margin-bottom: 20px ;
    background: #fff;
    line-height: 20px;
    border-radius: 6px;
    flex-wrap:wrap;
    .header{
        flex-wrap: wrap;
        display: block;
        .title{
            margin-bottom: 8px;
            color: #242833;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
        }
        .desc{
            margin-bottom: 10px;
            font-size: 14px;
            line-height: 16px;
        }
    }
}

.span{
    margin: 0 6px;
    color: #356dff;
}
.link{
    margin: 0 6px;
}
.left{
    &-title{
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
    }
    &-desc{
        margin-right: 13px;
        color: #474f5e;
        font-size: 14px;
        line-height: 20px;
    }
}
.spin-icon{
    margin:0 3px;
}
.myPackage{
    .right{
        &-wrapper{
            border-radius: 6px;
            margin-bottom: 20px;
            background: #fff;
            overflow: hidden;
            .sectionBox{
                padding: 15px 24px;
                background: #fafbfb;
                font-size: 14px;
                line-height: 20px;
                .sectionLabel{
                    margin-bottom: 6px;
                    color: #242833;
                    font-weight: 500;
                }
                .sectionValue{
                    color: #474f5e;
                }
                .sectionDesc{
                    margin-top: 4px;
                    color: #7a8499;
                    font-size: 12px;
                    line-height: 16px;
                }
            }
        }
        &-header{
            display: flex;
            align-items: center;
            min-height: 78px;
            padding: 20px 24px;
            font-size: 16px;
            font-weight: 600;
            line-height: 22px;
        }
        &-title{
            color: #474f5e;
        }

    }
    .sectionBox{
        padding: 15px 24px;
        background: #fafbfb;
        font-size: 14px;
        line-height: 20px;
    }
}

.myServiceRights{
    .wrap{
    overflow: hidden;
    border-radius: 6px;
    margin-bottom: 20px;
    background-color: white;
    .header{
        color: #242833;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        padding: 20px 24px;
    }
}
}
.productItem{
    display: flex;
    border-top: 1px solid #eef1f6;
    padding: 20px 24px;
    .productInfo{
        flex:1;
       margin-right:20px;
       .productName{
            color: #242833;
            font-size: 16px;
            font-weight: 600;
            line-height: 22px;
       }
       .productDesc{
            margin-top: 8px;
            color: #474f5e;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
       }
       .productNum{
            margin-top: 20px;
            color: #474f5e;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
       }
        
    }
    .rightButtonWrapper{
        margin-right:10px;
        text-align: right;
    }
}
`