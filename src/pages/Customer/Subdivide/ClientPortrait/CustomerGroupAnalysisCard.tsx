import { DiscountedGraphIcon, IdeaIcon, RiseIcon, TemplateIcon } from "@/components/Icons/Icons";
import { Chart, register, SymbolFactor } from "@antv/g2";
import { Button, Card, Col, Divider, Flex, Input, Progress, Radio, Row, Tabs, TabsProps, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// 定义圆角矩形的 SymbolFactor
const roundedRect: SymbolFactor = (x, y, r) => {
    // x, y 是中心点，r 是半径（控制大小）
    const width = r * 2;
    const height = r * 1.2;
    const radius = r * 0.3; // 圆角大小
    return [
        ['M', x - width / 2 + radius, y - height / 2],
        ['Q', x - width / 2, y - height / 2, x - width / 2, y - height / 2 + radius],
        ['L', x - width / 2, y + height / 2 - radius],
        ['Q', x - width / 2, y + height / 2, x - width / 2 + radius, y + height / 2],
        ['L', x + width / 2 - radius, y + height / 2],
        ['Q', x + width / 2, y + height / 2, x + width / 2, y + height / 2 - radius],
        ['L', x + width / 2, y - height / 2 + radius],
        ['Q', x + width / 2, y - height / 2, x + width / 2 - radius, y - height / 2],
        ['Z'],
    ];
};
roundedRect.style = ['fill'];

// 注册自定义图形
register('symbol.customTriangle', roundedRect);

export default function CustomerGroupAnalysisCard() {


    useEffect(()=>{

        const chart = new Chart({ container: "container2" });

        chart.options({
            type: "view",
            autoFit: true,
            data: [
                { action: "潜客", pv: 0 },
                { action: "首单", pv: 1 },
                { action: "复购", pv: 3 },
            ],
            children:[
                {
                    type: "interval",
                    encode: { x: "action", y: "pv", color: "action", shape: "pyramid" },
                    transform: [{ type: "symmetryY"}],
                    scale: { x: { padding: 0.03 } },
                    coordinate: { transform: [{ type: "transpose"}] },
                    animate: { 
                        enter: { type: "fadeIn" ,duration: 1000 },
                        update: { type: "fadeIn" ,duration: 1000 },
                    },
                    axis: false,
                    legend: { color: {
                        position: 'bottom',
                        itemMarkerSize:16,
                        itemMarker:"customTriangle",
                        crossPadding:20,
                        layout: {
                            justifyContent: 'center',
                        }
                    }},
                    interaction: {
                        elementHighlight: true,
                        legendFilter: false, // 关键配置：禁用图例筛选数据
                    },
                    state: {
                        active: {
                            stroke: 'transparent',
                            opacity: 1,
                            animate: { animation: 'wave-in', duration: 1200 }
                        },
                        inactive: { 
                            opacity: 0.1,
                            animate: { animation: 'wave-in', duration: 1200 }
                        },
                    },
                    labels: [
                        { 
                            position: "right",
                            // transform: {exceedAdjust:true},
                            text: (d) => `${d.action}: ${d.pv}`,
                            dx:0,
                            // style: {
                            //     x: (d)=>`${50}%`, // 配置百分比坐标
                            //     y: '50%',
                            // }
                        }, // text 映射 字段 sold
                        // { text: ({ action }) => action, style: { dy: -20  } }, // text 自定义 返回 string 类型
                        // { innerHTML: "genre", dx: 20, dy: 10, style: { fill: '#fff', color: '#333', fontSize: 10 } }, // innerHTML 映射 字段 genre 注: 背景色有时会黑色，需要配置 fill 背景色. color 文本颜色 HTMElement 本身也可以配置样式
                        // { // innerHTML 自定义 返回 HTMElement 类型数据
                        //   innerHTML: ({ action, pv }) => `<div style="padding:0 4px;border-radius: 10px;background: #f5f5f5;border: 2px solid #5ea9e6;font-size: 11px;">${action}:${pv}</div>`, 
                        //   dx: 10, 
                        //   dy: 50, 
                        //   style: { fill: 'rgba(0,0,0,0)', color: '#333' }
                        // }, 
                    ],
                },
                
            ]
        });

        chart.render();
    },[])

    return (
        <Scoped>
            <Card>
                <div className="font-20 font-w-600 color-242833">客群分析</div>
                <div className="chart-box">
                    <Tooltip title="按生命周期分布的客户数量，分为潜客、新客、老客、流失客户">
                        <div className="title cursor-pointer">客户生命周期分布</div>
                    </Tooltip>
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
                {/* RFM 分布 */}
                <div className="chart-box">
                    <Tooltip title="根据客户的消费金额、消费次数、最近消费时间综合计算得到的客户价值分布">
                        <div className="title cursor-pointer">RFM分布</div>
                    </Tooltip>
                    <Flex className="rfm-container" gap={6}>
                        <div className="rfm-item color-FFFFFF" style={{backgroundColor:"#1657D9"}}>
                            <Flex justify="space-between" align="center">
                                <div>重要价值客户</div>
                                <div className="font-12" style={{opacity:"0.65"}}>近期有购买、购买频次高、花费金额大的客户，是价值最大的用户</div>
                            </Flex>
                            <Flex gap={8} style={{marginTop:"4px"}} className="font-16">
                                <div>50.00%</div>
                                <div>·</div>
                                <div>1客户</div>
                            </Flex>
                            <Flex className="font-12" gap={32} style={{marginTop:"24px"}}>
                                <Flex className="label" gap={8} vertical style={{opacity:"0.65"}}>
                                    <div>总消费</div>
                                    <div>客单</div>
                                    <div>订单数</div>
                                    <div>上一次消费</div>
                                </Flex>
                                <Flex className="value" gap={8} vertical style={{opacity:"1"}}>
                                    <div>US$1,665.00</div>
                                    <div>US$832.50</div>
                                    <div>2</div>
                                    <div>2025-06-01</div>
                                </Flex>
                            </Flex>
                        </div>
                        <div className="rfm-item color-242833" style={{backgroundColor:"#ADCEFF"}}>
                            <Flex justify="space-between" align="center">
                                <div>一般发展客户</div>
                                <div className="font-12" style={{opacity:"0.65"}}>最近有购买，但是购买频次不高、花钱也不多，属于一般发展客户</div>
                            </Flex>
                            <Flex gap={8} style={{marginTop:"4px"}} className="font-16">
                                <div>50.00%</div>
                                <div>·</div>
                                <div>1客户</div>
                            </Flex>
                            <Flex className="font-12" gap={32} style={{marginTop:"24px"}}>
                                <Flex className="label" gap={8} vertical style={{opacity:"0.65"}}>
                                    <div>总消费</div>
                                    <div>客单</div>
                                    <div>订单数</div>
                                    <div>上一次消费</div>
                                </Flex>
                                <Flex className="value" gap={8} vertical style={{opacity:"1"}}>
                                    <div>US$1,665.00</div>
                                    <div>US$832.50</div>
                                    <div>1</div>
                                    <div>2025-06-01</div>
                                </Flex>
                            </Flex>
                        </div>
                    </Flex>
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
        .rfm-container{
            margin-top: 20px;
            min-height: 380px;
            .rfm-item{
                flex-basis:0;
                flex:1;
                padding:16px;
            }
        }
    }
`