import { DiscountedGraphIcon, IdeaIcon, RiseIcon, TemplateIcon } from "@/components/Icons/Icons";
import { Button, Card, Col, Divider, Flex, Input, Progress, Radio, Row, Tabs, TabsProps, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Chart } from '@antv/g2'; 
import { G2 } from "@ant-design/plots";


const items: TabsProps['items'] = [
    {
        key: '1',
        label: <div style={{width:"100%"}}>
            123
        </div>,
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
];


export default function RepurchaseCard() {


    const [list,setList] = useState([
        {title:"成交客户数",active:true},
        {title:"新客",active:false},
        {title:"老客",active:false}
    ])

   
    useEffect(()=>{

        // 切换不进行重绘图表
    },[])

    return (
        <Scoped>
            <Card>
                <div className="font-20 font-w-600 color-242833">复购看板</div>
                <Row gutter={[12,0]} className="statistic">
                    <Col span={8}>
                        <Flex className="statistic-wrap" justify="space-between">
                            <div>
                                <Tooltip title="订单数>1的用户数">
                                    <div className="title font-w-600 cursor-pointer">复购人数</div>
                                </Tooltip>
                                <Flex className="change" align="center">
                                    <div className="font-20 font-w-600" style={{marginRight:"8px"}}>3</div>
                                    <Tooltip title="较昨日变化">
                                        <div className="increase-box cursor-pointer">
                                            <RiseIcon className="font-12" />
                                            <span className="color-7A8499" style={{marginLeft:"2px",position:"relative",top:"2px"}}>{"0.00%"}</span>
                                        </div>
                                    </Tooltip>
                                </Flex>
                                <Tooltip title="ARPU=月总收入/月付费用户数">
                                    <div className="font-12 color-474F5E ARPU cursor-pointer">ARPU US$0.00</div>
                                </Tooltip>
                            </div>
                            <Flex vertical align="center" justify="center">
                                <Progress type="circle" percent={70} size={50} />
                                <div style={{marginTop:'8px'}} className="font-12 color-7A8499">复购率</div>
                            </Flex>
                        </Flex>
                    </Col>
                    <Col span={8}>
                        <Flex className="statistic-wrap" justify="space-between">
                            <div>
                                <Tooltip title="满足新客定义的基础上，订单数>1">
                                    <div className="title font-w-600 cursor-pointer">新客复购</div>
                                </Tooltip>
                                <Flex className="change" align="center">
                                    <div className="font-20 font-w-600" style={{marginRight:"8px"}}>1</div>
                                    <Tooltip title="较昨日变化">
                                        <div className="increase-box cursor-pointer">
                                            <RiseIcon className="font-12" />
                                            <span className="color-7A8499" style={{marginLeft:"2px",position:"relative",top:"2px"}}>{"0.00%"}</span>
                                        </div>
                                    </Tooltip>
                                </Flex>
                                <Tooltip title="ARPU=月总收入/月付费用户数">
                                    <div className="font-12 color-474F5E ARPU cursor-pointer">ARPU US$0.00</div>
                                </Tooltip>
                            </div>
                            <Flex vertical align="center" justify="center">
                                <Progress type="circle" percent={30} size={50} />
                                <div style={{marginTop:'8px'}} className="font-12 color-7A8499">复购率</div>
                            </Flex>
                        </Flex>
                    </Col>
                    <Col span={8}>
                        <Flex className="statistic-wrap" justify="space-between">
                            <div>
                                <Tooltip title="满足老客定义的基础上，订单数>1">
                                    <div className="title font-w-600 cursor-pointer">老客复购</div>
                                </Tooltip>
                                <Flex className="change" align="center">
                                    <div className="font-20 font-w-600" style={{marginRight:"8px"}}>1</div>
                                    <Tooltip title="较昨日变化">
                                        <div className="increase-box cursor-pointer">
                                            <RiseIcon className="font-12" />
                                            <span className="color-7A8499" style={{marginLeft:"2px",position:"relative",top:"2px"}}>{"0.00%"}</span>
                                        </div>
                                    </Tooltip>
                                </Flex>
                                <Tooltip title="ARPU=月总收入/月付费用户数">
                                    <div className="font-12 color-474F5E ARPU cursor-pointer">ARPU US$0.00</div>
                                </Tooltip>
                            </div>
                            <Flex vertical align="center" justify="center">
                                <Progress type="circle" percent={60} size={50} />
                                <div style={{marginTop:'8px'}} className="font-12 color-7A8499">复购率</div>
                            </Flex>
                        </Flex>
                    </Col>
                </Row>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    width: 100%;
    .statistic{
        margin-top: 20px;
        .statistic-wrap{
            width: 100%;
            background-color: #f7f8fb;
            padding: 10px 16px;
            .title{
                width: fit-content;
                border-bottom: 1px dashed #b8becc;
            }
            .change{
                margin-top: 6px;
                .increase-box{
                    width: fit-content;
                    color:#35c08e;
                    border-bottom: 1px dashed #b8becc;
                }
            }
            .ARPU{
                width: fit-content;
                border-bottom: 1px dashed #b8becc;
            }
        }
        .active{
            border-bottom: 2px solid #356DFF;
        }
    }
   
`