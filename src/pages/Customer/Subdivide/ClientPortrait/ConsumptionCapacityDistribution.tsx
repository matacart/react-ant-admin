import { DiscountedGraphIcon, IdeaIcon, RiseIcon, TemplateIcon } from "@/components/Icons/Icons";
import { Chart, register, SymbolFactor } from "@antv/g2";
import { Button, Card, Col, Divider, Flex, Input, Progress, Radio, Row, Tabs, TabsProps, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function ConsumptionCapacityDistribution() {

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: '消费金额',
          children: <div id="consumption-amount" style={{height:320,margin:"0 auto" }}></div>,
        },
        {
          key: '2',
          label: '消费频次',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: '消费时间',
          children: 'Content of Tab Pane 3',
        },
    ];


    useEffect(()=>{
        const chart2 = new Chart({
            container: 'consumption-capacity',
        });
        chart2.options({
            type: "view",
            autoFit: true,
            coordinate: { type: "theta", outerRadius: 0.8, innerRadius: 0.4 },
            children: [
              {
                type: "interval",
                data: [
                  { item: ">US$100", count: 2, percent: 1 },
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


        // 消费
        const chart3 = new Chart({
            container: 'consumption-amount',
        });
        chart3.options({
            type: "view",
            autoFit: true,
            children: [
              {
                type: "interval",
                data: [
                  { label: "US$1-100", value: 2 },
                  { label: "US$100-200", value: 1 },
                  { label: "US$200-300", value: 2 },
                  { label: "US$300-500", value: 1 },
                  { label: "US$500-1000", value: 1 },
                  { label: "US$1000-2000", value: 2 },
                  { label: "US$2000-5000", value: 2 },
                  { label: ">US$5000", value: 2 },
                ],
                encode: { x: "label", y: "value" },
                scale: { x: { padding: 0.75 } },
                axis: {
                    x: {
                        title:false,
                        line:true
                    },
                    y: {
                        title:false,
                    },
                },
                legend: false,
                labels: [
                ],
                interaction: {
                    elementHighlight: true
                },
                state: {
                    active: {
                        opacity: 1
                    },
                    inactive: { 
                        opacity: 0.1
                    },
                },
                tooltip: {
                  items: [
                    (data) => ({
                      name: data.item,
                      value: `客户数：${data.value}`,
                    }),
                  ],
                },
              },
            ],
        });
        chart3.render();

    },[])

    return (
        <Scoped>
            <Card>
                <div className="font-20 font-w-600 color-242833">消费能力分布</div>
                <Flex className="consumption-capacity-distribution-warp" gap={16}>
                    <div className="chart-box">
                        <Tooltip title="客户偏好商品的商品标签分布">
                            <div className="title cursor-pointer">偏好商品标签</div>
                        </Tooltip>
                        <Flex align="center" justify="center" style={{height:"100%"}}>
                            <div className="color-7A8499">该人群暂无商品标签数据</div>
                        </Flex>
                        {/* <div id="container2" style={{ width: '600px', margin:"0 auto" }}>
                        </div> */}
                    </div>
                    <div className="chart-box">
                        <Tooltip title="客户的客单价分布">
                            <div className="title cursor-pointer">消费能力</div>
                        </Tooltip>
                        <div id="consumption-capacity" style={{ width: '600px',height:"100%", margin:"0 auto" }}>
                        </div>
                    </div>
                </Flex>
                <div className="chart-box" style={{marginTop:"20px",height:"400px"}}>
                    <Tabs defaultActiveKey="1" items={items} onChange={()=>{}} />
                </div>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    width: 100%;
    .consumption-capacity-distribution-warp{
        margin-top: 20px;
    }
    .chart-box{
        height: 300px;
        flex-basis: 0;
        flex: 1;
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