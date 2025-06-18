import { DiscountedGraphIcon, IdeaIcon, RiseIcon, TemplateIcon } from "@/components/Icons/Icons";
import { Button, Card, Col, Divider, Flex, Input, Radio, Row, Tabs, TabsProps, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Chart } from '@antv/g2'; 
import { values } from 'lodash';
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


export default function NewAndOldCard() {


    const [list,setList] = useState([
        {title:"成交客户数",tip:"订单数>0的用户数",active:true},
        {title:"新客",tip:"客户创建时间<72小时（3天内，包含今天）的用户",active:false},
        {title:"老客",tip:"客户创建时间≥于72小时（3天内，包含今天）的用户",active:false}
    ])

   
    useEffect(()=>{

        const chart = new Chart({
            container: 'container',
            autoFit:true, //启用自动适配

        });
          
        const data = [
            { date: '第一周', count: 0, type: '客户数' },
            { date: '第二周', count: 2, type: '客户数' },
            { date: '第三周', count: 1, type: '客户数' },
            { date: '第四周', count: 1, type: '客户数' },
            { date: '第五周', count: 3, type: '客户数' },
            { date: '第一周', count: 0, type: '行业均值' },
            { date: '第二周', count: 50, type: '行业均值' },
            { date: '第三周', count: 100, type: '行业均值' },
            { date: '第四周', count: 10, type: '行业均值' },
            { date: '第五周', count: 2, type: '行业均值' }
        ];

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
        
        const colorField = 'type';

        chart.line().data(data)
        .encode('shape', 'smooth')
        .encode('x', 'date')
        .encode('y', 'count')
        .encode("color",colorField)
        .style({
            lineWidth: 2,
        })
        .style("lineDash",(d)=>{
            return d[0].type == "行业均值" ? [4, 4] : [0, 0]
        })
        chart.encode("color",colorField)
        chart.legend(false);
        // .scale('y', {
        //     domain: [0, 5],
        // })
        
        // 渲染可视化
        chart.render().then(renderCustomLegend);
          
        function renderCustomLegend(chart) {
            // Get color scale.
            const scale = chart.getScaleByChannel('color');
            const { domain, range } = scale.getOptions();
            const excludedValues = [];
            
            // Create items from scale domain.
            const items = domain.map((text, i) => {
                const itemDiv = document.createElement('div');
                const color = range[i];
                itemDiv.className = "legend-item cursor-pointer";
                // 
                const span1 = document.createElement('span');
                span1.className = "component-antv-g2-chart-legend-active-dot";
                span1.style.background = color;
                itemDiv.append(span1);
                // 
                const span2 = document.createElement('span');
                span2.className = "font-12";
                span2.innerText = text;
                itemDiv.append(span2);
                // 
                itemDiv.onclick = () => {
                    const index = excludedValues.findIndex((d) => d === text);
                    if (index === -1) {
                        excludedValues.push(text);
                        itemDiv.style.color = 'rgb(223 224 226)';
                        span1.style.background = "rgb(223 224 226)";
                    } else {
                        excludedValues.splice(index, 1);
                        itemDiv.style.color = "#242833";
                        span1.style.background = color;
                    }
                    onChange(excludedValues);
                };
                return itemDiv;
            });
            
            // Mount legend items.
            const container = document.getElementById('container');
            const canvas = container.getElementsByTagName('canvas')[0];
            const legend = document.createElement('legend');
            container?.append(legend);
            
            const div = document.createElement('div');
            div.className = "legend-box"
            legend.append(div)
            // 
            for (const item of items) div.append(item);
        
            // Emit legendFilter event.
            function onChange(values) {
            const selectedValues = domain.filter((d) => !values.includes(d));
            const selectedData = data.filter((d) =>
                selectedValues.includes(d[colorField]),
            );
            chart.changeData(selectedData);
            }
        }

        // 销毁逻辑
        return () => chart.destroy();


        // 切换不进行重绘图表
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
                                <Tooltip title={item.tip}>
                                    <div className="title cursor-pointer font-w-600">{item.title}</div>
                                </Tooltip>
                                <Flex className="change" align="center">
                                    <div className="font-20 font-w-600" style={{marginRight:"8px"}}>0</div>
                                    <Tooltip title="较昨日变化">
                                        <div className="increase-box">
                                            <RiseIcon className="font-12" />
                                            <span className="color-7A8499" style={{marginLeft:"2px",position:"relative",top:"2px"}}>{"0.00%"}</span>
                                        </div>
                                    </Tooltip>
                                </Flex>
                                <Tooltip title="ARPU=月总收入/月付费用户数">
                                    <div className="font-12 color-474F5E ARPU">ARPU US$0.00</div>
                                </Tooltip>
                            </div>
                            {index!==list.length-1 && <Divider type="vertical"  style={{height:"80%",margin:"0 20px",borderColor:"#eef1f6"}}/>}
                        </Flex>
                    ))}
                </Flex>
                {/*  */}
                <div className="chart-box">
                    <div className="color-242833 font-w-500" style={{marginBottom:"8px"}}>新老客占比</div>
                    <Flex gap={2} style={{marginBottom:"8px"}}>
                        <div className="new-proportion">
                            新客 · 75.00%
                        </div>
                        <div className="old-proportion">
                            老客 · 25.00%
                        </div>
                    </Flex>
                    <Flex gap={12}>
                        <div className="tab-box">
                            <Tabs defaultActiveKey="1" items={[
                                {
                                    key: '1',
                                    label: '客户数',
                                },
                                {
                                    key: '2',
                                    label: 'GMV',
                                },
                                {
                                    key: '3',
                                    label: '订单数',
                                },
                            ]} />
                        </div>
                        <Radio.Group defaultValue="a">
                            <Radio.Button value="a">每小时</Radio.Button>
                            <Radio.Button value="b">每日</Radio.Button>
                            <Radio.Button value="c">每周</Radio.Button>
                        </Radio.Group>
                    </Flex>
                    <div id="container" style={{ width: '100%', height: 400 }} />
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
        background: #E2F0FF;
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
        padding: 20px;
        padding-bottom: 40px;
        border: 1px solid #d7dbe7;
        border-radius: 4px;
        .new-proportion{
            flex:3;
            background-color: #356DFF;
            padding: 6px 24px;
            text-align: right;
            white-space: nowrap;
            border-radius: 2px;
            color:#FFF;
        }
        .old-proportion{
            flex:1;
            background-color: #2ED296;
            padding: 6px 24px;
            text-align: right;
            white-space: nowrap;
            border-radius: 2px;
            color:#FFF;
        }
        .tab-box{
            flex: 1;
        }
        .legend-box{
            padding: 6px;
            background-color: rgb(248, 249, 252);
            display: flex;
            justify-content: center;
            gap: 12px;
            .legend-item{
                display: flex;
                align-items: center;
            }
            .component-antv-g2-chart-legend-active-dot{
                position: relative;
                top:1px;
                width: 12px;
                height: 12px;
                border-radius: 3px;
                margin-right: 8px;
            }
        }
    }
    
   
`