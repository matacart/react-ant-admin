import MyDropdown from "@/components/Dropdown/MyDropdown";
import { DiscountedGraphIcon, RiseIcon, TemplateIcon } from "@/components/Icons/Icons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Flex, Input, Row, Tooltip } from "antd";
import { useRef, useState } from "react";
import styled from "styled-components";


export default function SummaryCard() {

    const list = [
        {title:"客户数",num:"0",rise:"0.00%"},
        {title:"活跃数",num:"0",rise:"0.00%"},
        {title:"流失数",num:"0"},
        {title:"客单价",num:"0.00"},
        {title:"复购率",num:"0.00%"}
    ]

    return (
        <Scoped>
            <Card classNames={{body:"card"}}>
                <Flex gap={12}>
                    {list.map(item=>(
                        <div className="item-box">
                            <div className="font-16 color-7A8499 font-w-600">{item.title}</div>
                            <Flex align="center" style={{marginTop:"8px"}}>
                                <div className="font-24 font-w-600" style={{marginRight:"12px"}}>{item.num}</div>
                                <Tooltip title="较昨日变化">
                                    {item.rise == undefined ? <>-</> :<div className="increase-box">
                                        <RiseIcon className="font-12" />
                                        {item.rise}
                                    </div>}
                                </Tooltip>
                            </Flex>
                        </div>
                    ))}
                </Flex>
            </Card>
        </Scoped>
    )
}

const Scoped = styled.div`
    width: 100%;
    .card{
        /* padding: 24px 0; */
        .item-box{
            height: 100%;
            padding: 10px 16px;
            border: 1px solid #eaedf1;
            border-radius: 6px;
            background: #fafbfc;
            flex:1;
            .increase-box{
                color:#35c08e;
                border-bottom: 1px dashed #b8becc;
            }
        }
        
    }
`