import MyDropdown from "@/components/Dropdown/MyDropdown";
import { DiscountedGraphIcon, TemplateIcon } from "@/components/Icons/Icons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Flex, Input, Tooltip } from "antd";
import { useRef, useState } from "react";
import styled from "styled-components";


export default function ScreeningConditionCard() {

    const [symbol,setSymbol] = useState("=");

    const [isInput,setIsInput] = useState(false);

    const myInputRef = useRef(null);

    const [orderQuantity,setOrderQuantity] = useState("不限");


    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Flex justify="space-between" style={{padding:"0 24px"}}>
                    <Flex>
                        <div>客户</div>
                        <div className="color-356DFF" style={{marginLeft:"24px"}}><DiscountedGraphIcon /><span style={{marginLeft:"4px"}}>客户画像</span></div>
                    </Flex>
                    <Flex align="center">
                        <TemplateIcon />
                        <div style={{marginLeft:"8px"}}>细分模板</div>
                        <Divider type="vertical" style={{height:"60%",borderColor:"#b8becc"}} />
                        <Tooltip title="疑问">
                            <span style={{ color: '#999', marginLeft: '4px', cursor: 'pointer' }}>
                                <QuestionCircleOutlined className="font-16" />
                            </span>
                        </Tooltip>
                    </Flex>
                </Flex>

                <Divider className="divider" />
                <Flex style={{padding:"0 24px"}} className="select-box">
                    <Flex className="select-item color-242833 cursor-pointer" gap={8} align="center">
                        订单数量
                        <MyDropdown
                            tiggerEle={<div className="select-item-conditions"> {symbol} </div>}
                            menu={{
                                items:[
                                    {
                                        key: "1", label: (
                                            <div onClick={()=>setSymbol("=")}>等于</div>
                                        )
                                    },
                                    {
                                        key: "2", label: (
                                            <div onClick={()=>setSymbol("≠")}>不等于</div>
                                        )
                                    },
                                    {
                                        key: "3", label: (
                                            <div onClick={()=>setSymbol(">")}>大于</div>
                                        )
                                    },
                                    {
                                        key: "4", label: (
                                            <div onClick={()=>setSymbol("<")}>小于</div>
                                        )
                                    }
                                ]
                            }}
                        />
                        <div>
                        {/*  */}
                            {isInput?<Input autoFocus ref={myInputRef} defaultValue={orderQuantity} onBlur={(e)=>{
                                setIsInput(false)
                                setOrderQuantity(e.target.value == ""?"不限":e.target.value)
                            }} />:<div className="select-item-text" onClick={()=>{
                                console.log(myInputRef)
                                setIsInput(true)
                            }}>{orderQuantity}</div>}
                        </div>
                    </Flex>
                </Flex>
                <Flex gap={10} align="center" className="recommendation-screening" style={{padding:"0 24px",marginTop:"16px"}}>
                    推荐筛选：
                    <Tooltip title="历史累计成单的订单数量">
                        <div className="item">
                            订单数
                        </div>
                    </Tooltip>
                    <Tooltip title="历史累计的消费金额">
                        <div className="item">
                            消费金额
                        </div>
                    </Tooltip>
                    <Tooltip title="客户最近一次将商品添加到购物车的时间">
                        <div className="item">
                            最近一次加购时间
                        </div>
                    </Tooltip>
                    <Tooltip title="客户上次成单的时间">
                        <div className="item">
                        上次购买时间
                        </div>
                    </Tooltip>
                    <Tooltip title="消费金额高于店铺平均水平的客户">
                        <div className="item">
                            高价值客户
                        </div>
                    </Tooltip>
                </Flex>
                <Divider />
                <Flex justify="end" gap={12} style={{padding:"0 24px"}}>
                    <Button>清空</Button>
                    <Button type="primary">创建细分</Button>
                </Flex>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    .card{
        padding: 24px 0;
        .divider{
            margin: 16px 0;
        }
        .recommendation-screening{
            .item{
                padding: 2px 8px;
                background: #f0f3f9;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .item:hover{
                background: #356DFF;
                color: #FFF;
            }
        }
        .select-box{
            .select-item{
                border: 1px solid #d7dbe7;
                border-radius: 4px;
                padding: 6px 8px;
                .select-item-conditions{
                    padding: 0 4px;
                }
                .select-item-text{
                    padding: 0 4px;
                }
            }
            .select-item:hover{
                border-color: #356dff;
                box-shadow: 0 0 12px rgba(53, 109, 255, 0.15);

                .select-item-conditions{
                    padding: 0 4px;
                    background-color: #f0f3f9;
                    border-radius: 2px;
                }

                .select-item-text{
                    padding: 0 4px;
                    background-color: #f0f3f9;
                    border-radius: 2px;
                }
            }

        }
    }
   
`