import { DiscountedGraphIcon, IdeaIcon, RiseIcon, TemplateIcon } from "@/components/Icons/Icons";
import { Chart, register, SymbolFactor } from "@antv/g2";
import { Button, Card, Col, Divider, Flex, Input, Progress, Radio, Row, Tabs, TabsProps, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function RFMDistribution() {


    useEffect(()=>{

    },[])

    return (
        <Scoped>
            <Card>
                <div className="font-20 font-w-600 color-242833">RFM分布</div>
                <div className="chart-box">
                    <div className="title">客户生命周期分布</div>
                    <Flex className="message-box" justify="space-between">
                        <Flex className="color-474F5E">
                            <IdeaIcon className="font-20 color-356DFF" />
                            <div style={{marginLeft:"8px"}}>今日第一次购买的客户转化率小于 30%，需要促进首单转化效果！经营建议：尝试通过活动设置来提升新客转化！</div>
                        </Flex>
                        <div>
                            <a>配置营销活动</a>
                        </div>
                    </Flex>
                    <div id="container2" style={{ width: '600px', height: 380 , margin:"0 auto" }}>
                    </div>
                </div>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    width: 100%;
    .chart-box{
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
        .title{
            display: inline-block;
            border-bottom: 1px dashed #b8becc;
        }
        .message-box{
            margin:20px 0;
            padding: 12px;
            border-radius: 6px;
            background: #E2F0FF;
        }
    }
`