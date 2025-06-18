import { CrowdIcon, DiscountedGraphIcon, IdeaIcon, RiseIcon, TemplateIcon } from "@/components/Icons/Icons";
import MyTag from "@/components/Tag/MyTag";
import { TwitterOutlined } from "@ant-design/icons";
import { Chart, register, SymbolFactor } from "@antv/g2";
import { Button, Card, Col, Divider, Flex, Input, Progress, Radio, Row, Tabs, TabsProps, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function FeatureDistribution() {


    useEffect(()=>{

        const chart = new Chart({
            container: 'customer-status',
        });

        chart.options({
            type: "view",
            autoFit: true,
            coordinate: { type: "theta", outerRadius: 0.8, innerRadius: 0.4 },
            children: [
              {
                type: "interval",
                data: [
                  { item: "待邀请", count: 2, percent: 0.5 },
                  { item: "邀请", count: 2, percent: 0.5 },
                ],
                style:{
                    inset:1.2,
                },
                encode: { y: "percent", color: "item" },
                transform: [{ type: "stackY" }],
                scale: { x: { padding: 0.01 } },
                legend: false,
                labels: [
                    {
                        position: "outside",
                        text:(data)=>`${data.item}`,
                        style: {
                            fontWeight: '500', // ✅ 加粗
                            fontSize: 12,
                            color: '#242833',
                            dy:-8
                        },
                    },
                    {
                        position: "outside",
                        text:(data)=>`${data.count}`,
                        style: {
                            fontWeight: '500', // ✅ 加粗
                            fontSize: 12,
                            color: '#242833',
                            dy:8
                        },
                    },
                ],
                interaction: {
                    elementHighlight: true
                },
                state: {
                    active: {
                        lineWidth: '3',
                        // stroke:(data)=>{
                        //     console.log(data.color)
                        // }
                    },
                    inactive: { 
                    },
                },
                tooltip: {
                  items: [
                    (data) => ({
                      name: data.item,
                      value: `${data.percent * 100}%`,
                    }),
                  ],
                },
              },
              {
                type: "text",
                style: {
                  text: "总数",
                  x: "50%",
                  y: "50%",
                  dy: -10,
                  fontSize: 12,
                  fill: "#8c8c8c",
                  textAlign: "center",
                },
              },
              {
                type: "text",
                style: {
                  text: "2",
                  x: "50%",
                  y: "50%",
                  dy: 10,
                  fontSize: 16,
                  fill: "#242833",
                  textAlign: "center",
                },
              }
            ],
        });
        chart.render();


        const chart2 = new Chart({
            container: 'email-subscription-status',
        });

        chart2.options({
            type: "view",
            autoFit: true,
            coordinate: { type: "theta", outerRadius: 0.8, innerRadius: 0.4 },
            children: [
              {
                type: "interval",
                data: [
                  { item: "未订阅", count: 2, percent: 1 },
                ],
                style:{
                    inset:1.2,
                },
                encode: { y: "percent", color: "item" },
                transform: [{ type: "stackY" }],
                scale: { x: { padding: 0.01 } },
                legend: false,
                labels: [
                    {
                        position: "outside",
                        text:(data)=>`${data.item}`,
                        style: {
                            fontWeight: '500', // ✅ 加粗
                            fontSize: 12,
                            color: '#242833',
                            dy:-8
                        },
                    },
                    {
                        position: "outside",
                        text:(data)=>`${data.count}`,
                        style: {
                            fontWeight: '500', // ✅ 加粗
                            fontSize: 12,
                            color: '#242833',
                            dy:8
                        },
                    },
                ],
                interaction: {
                    elementHighlight: true
                },
                state: {
                    active: {
                        lineWidth: '3',
                        // stroke:(data)=>{
                        //     console.log(data.color)
                        // }
                    },
                    inactive: { 
                    },
                },
                tooltip: {
                  items: [
                    (data) => ({
                      name: data.item,
                      value: `${data.percent * 100}%`,
                    }),
                  ],
                },
              },
              {
                type: "text",
                style: {
                  text: "总数",
                  x: "50%",
                  y: "50%",
                  dy: -10,
                  fontSize: 12,
                  fill: "#8c8c8c",
                  textAlign: "center",
                },
              },
              {
                type: "text",
                style: {
                  text: "2",
                  x: "50%",
                  y: "50%",
                  dy: 10,
                  fontSize: 16,
                  fill: "#242833",
                  textAlign: "center",
                },
              }
            ],
        });
        chart2.render();


    },[])

    return (
        <Scoped>
            <Card>
                <div className="font-20 font-w-600 color-242833">特征分布</div>
                    <Flex className="feature-distribution-warp" gap={16}>
                        <div className="chart-box">
                            <Tooltip title="按客户状态分布的客户数量">
                                <div className="title cursor-pointer">客户状态</div>
                            </Tooltip>
                            <div id="customer-status" style={{ height:230, margin:"0 auto" }}>
                            </div>
                        </div>
                        <div className="chart-box">
                            <Tooltip title="按来源渠道分布的客户数量">
                                <div className="title cursor-pointer">来源渠道</div>
                            </Tooltip>
                            <div>
                                <Flex style={{ marginTop: '24px'}} className="color-7A8499">
                                    <div style={{ flex:1 }}>来源渠道</div>
                                    <div style={{ width: '80px',textAlign:'right' }}>客户数</div>
                                    <div style={{ width: '80px',textAlign:'right' }}>占比</div>
                                </Flex>
                                <Flex style={{ marginTop: '16px' }}>
                                    <Flex style={{ flex:1 }} gap={4}>
                                        <div>手动创建</div>
                                        <MyTag icon={<CrowdIcon className="color-356DFF" />} style={{height:"20px"}} color="processing" text={<span className="color-242833">流量大</span>} />
                                    </Flex>
                                    <div style={{ width: '80px',textAlign:'right' }}>1</div>
                                    <div style={{ width: '80px',textAlign:'right' }}>50.00%</div>
                                </Flex>
                                <Flex style={{ marginTop: '16px' }}>
                                    <Flex style={{ flex:1 }} gap={4}>
                                        <div>未登录下单</div>
                                    </Flex>
                                    <div style={{ width: '80px',textAlign:'right' }}>1</div>
                                    <div style={{ width: '80px',textAlign:'right' }}>50.00%</div>
                                </Flex>
                            </div>
                        </div>
                        <div className="chart-box">
                            <Tooltip title="按邮箱订阅状态分布的客户数量">
                                <div className="title cursor-pointer">邮箱订阅状态</div>
                            </Tooltip>
                            <div id="email-subscription-status" style={{ height:230, margin:"0 auto" }}>
                            </div>
                        </div>
                    </Flex>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    width: 100%;
    .feature-distribution-warp{
        margin-top: 20px;
        flex-wrap: wrap; /* 允许 Col 换行 */
        .chart-box{
            min-width: 300px;
            flex-basis: 0;
            flex:1;
            padding: 20px;
            height: 300px;
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
    }
`