import { DiscountedGraphIcon, IdeaIcon, RiseIcon, TemplateIcon } from "@/components/Icons/Icons";
import { Button, Card, Col, Divider, Flex, Input, Row, Tabs, TabsProps, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Chart } from '@antv/g2'; 
import { values } from 'lodash';


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

export default function NewAndOldCard() {

    const [list,setList] = useState([
        {title:"成交客户数",active:true},
        {title:"新客",active:false},
        {title:"老客",active:false}
    ])
   
    useEffect(()=>{
        // 初始化图表
        const chart = new Chart({
            container: 'container',
            autoFit:true, //启用自动适配
        });
        // 坐标轴
        chart.axis('x', {
            title: null,
            line: {
              style: {
                stroke: '#ccc'
              }
            }
        });
        chart.axis('y', {
            title: null,
        });

        // 图例配置
        chart.legend("color",{
            // custom: true,
            position:"bottom",
            layout: { justifyContent: 'center' },
            background:"#FF0000",
            marker: {
                symbol: 'diamond', // 标记形状：'circle'/'square'/'diamond'等
                radius: 5,        // 标记大小
                style: {
                  fill: '#1890ff',
                  lineWidth: 1,
                  stroke: '#fff'
                }
            },
        })
        

        // 声明可视化
        chart.line().data([
            { date: '06-10', count: 0, type: 'new' },
            { date: '06-11', count: 2, type: 'new' },
            { date: '06-12', count: 1, type: 'new' },
            { date: '06-13', count: 1, type: 'new' },
            { date: '06-14', count: 3, type: 'new' },
            { date: '06-10', count: 0, type: 'old' },
            { date: '06-11', count: 1, type: 'old' },
            { date: '06-12', count: 3, type: 'old' },
            { date: '06-13', count: 3, type: 'old' },
            { date: '06-14', count: 2, type: 'old' }
            // { date: '06-12', count: 0, type: '订单数' },
            // { date: '06-13', count: 0, type: '订单数' },
            // { date: '06-14', count: 0, type: '行业均值' },
            // { date: '06-15', count: 0, type: '行业均值' },
            // { date: '06-16', count: 0, type: '行业均值' },
        ])
        .encode('x', 'date')
        .encode('y', 'count')
        .encode("color","type")
        .scale('y', {
            domain: [0, 5],
        })
        

        // 渲染可视化
        chart.render();

        // 销毁逻辑
        return () => chart.destroy();
    },[])

    return (
        <Scoped>
            <Card>
                <div className="font-20 font-w-600 color-242833">新老客看板</div>
                <Flex className="message-box" justify="space-between">
                    <Flex className="color-474F5E">
                        <IdeaIcon className="font-20 color-356DFF" />
                        <div style={{marginLeft:"8px"}}>今日新客≥老客！经营建议：尝试设置“提升复购”的活动来吸引顾客下单！</div>
                    </Flex>
                    <div>
                        <a>配置营销活动</a>
                    </div>
                </Flex>
                <Flex>
                    {list.map((item,index)=>(
                        <Flex className="statistic">
                            <div onClick={()=>{
                                let newList = list.map((items,indexs)=>(
                                    indexs == index ? {...items,active:true}:{...items,active:false}
                                ))
                                setList(newList)
                            }} className={item.active?"statistic-wrap active cursor-pointer":"statistic-wrap cursor-pointer"}>
                                <div className="title font-w-600">{item.title}</div>
                                <Flex className="change" align="center">
                                    <div className="font-20 font-w-600" style={{marginRight:"8px"}}>0</div>
                                    <Tooltip title="较昨日变化">
                                        <div className="increase-box">
                                            <RiseIcon className="font-12" />
                                            <span className="color-7A8499" style={{marginLeft:"2px",position:"relative",top:"2px"}}>{"0.00%"}</span>
                                        </div>
                                    </Tooltip>
                                </Flex>
                                <div className="font-12 color-474F5E ARPU">ARPU US$0.00</div>
                            </div>
                            {index!==list.length-1 && <Divider type="vertical"  style={{height:"80%",margin:"0 20px",borderColor:"#eef1f6"}}/>}
                        </Flex>
                    ))}
                </Flex>
                {/*  */}
                <div className="chart-box">
                    <div id="container" style={{ width: '100%', height: 500 }} />
                </div>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    width: 100%;
    .message-box{
        margin:20px 0;
        padding: 12px;
        border-radius: 6px;
        background: #f5faff;
    }
    .statistic{
        flex:1;
        border-bottom: 1px solid #eef1f6;
        .statistic-wrap{
            width: 100%;
            /* background-color: #35c08e; */
            padding-bottom:12px;
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

    .chart-box{
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
    }
    
   
`