import { Card, DatePicker, Flex } from "antd";
import { useState } from "react";
import styled from "styled-components";
import WithdrawalRecordCard from "./WithdrawalRecordCard";
import AccountBalance from "./AccountBalance";
import WithdrawMoneyCard from "./WithdrawMoneyCard";
import AccountSettingCard from "./AccountSettingCard";


const { RangePicker } = DatePicker;
function GeneralView(){

    const [checkItem,setCheckItem] = useState("1")


    const handleChangeSegmented = (value:string)=>{
        setCheckItem(value)
    }

    return (
        <Scoped>
            {/*  */}
            <Flex justify="space-between" gap={20}>
                <div className="left-card-box">
                    {/* 交易 */}
                    <Card className="left-card-total">
                        <Flex>
                            <Flex className="mc-segmented-box">
                                <div className={checkItem == "1"?"mc-segmented mc-segmented-selected":"mc-segmented cursor-pointer"} onClick={(e)=>handleChangeSegmented("1")}>今天</div>
                                <div className={checkItem == "2"?"mc-segmented mc-segmented-selected":"mc-segmented cursor-pointer"} onClick={(e)=>handleChangeSegmented("2")}>昨天</div>
                                <div className={checkItem == "3"?"mc-segmented mc-segmented-selected":"mc-segmented cursor-pointer"} onClick={(e)=>handleChangeSegmented("3")}>过去 7 天</div>
                                <div className={checkItem == "4"?"mc-segmented mc-segmented-selected":"mc-segmented cursor-pointer"} onClick={(e)=>handleChangeSegmented("4")}>过去 31 天</div>
                            </Flex>
                            <RangePicker style={{height:"38px"}} />
                        </Flex>
                        <Flex style={{marginTop:"24px"}}>
                            <div className="trading-item">
                                <div className="color-7A8499 " style={{marginBottom:"14px"}}>订单交易</div>
                                <div className="color-474F5E font-16">HK$ 0</div>
                                <div className="color-474F5E">共 0 笔</div>
                            </div>
                            <div className="trading-item">
                                <div className="color-7A8499 " style={{marginBottom:"14px"}}>退款交易</div>
                                <div className="color-474F5E font-16">HK$ 0</div>
                                <div className="color-474F5E">共 0 笔</div>
                            </div>
                            <div className="trading-item">
                                <div className="color-7A8499 " style={{marginBottom:"14px"}}>问题交易退款</div>
                                <div className="color-474F5E font-16">HK$ 0</div>
                                <div className="color-474F5E">共 0 笔</div>
                            </div>
                        </Flex>
                    </Card>
                    {/* 提款记录 */}
                    <WithdrawalRecordCard />
                </div>
                <div className="right-card-box">
                    <AccountBalance />
                    <WithdrawMoneyCard />
                    <AccountSettingCard />
                </div>
            </Flex>
        </Scoped>
    )
}

export default GeneralView;

const Scoped = styled.div`
    .left-card-box{
        flex:2;
        .left-card-total{
            .mc-segmented-box{
                margin-right: 10px;
                width: fit-content;
                border: 1px solid #d7dbe7;
                border-radius: 4px;
                .mc-segmented{
                    height: 36px;
                    line-height: 36px;
                    width: 90px;
                    font-weight: 600;
                    text-align: center;
                    border-right: 1px solid #d7dbe7;
                }
                .mc-segmented:last-child{
                    border-right: none;
                }
                .mc-segmented-selected{
                    background-color: #356DFF;
                    color: #FFF;
                }
            }
            .trading-item{
                border-right: 1px solid rgb(211, 221, 230);
                flex: 1;
                margin: 0 10px;
            }
            .trading-item:last-child{
                border-right: none;
            }
            
        }
    }
    .right-card-box{
        flex:1;
    }
`