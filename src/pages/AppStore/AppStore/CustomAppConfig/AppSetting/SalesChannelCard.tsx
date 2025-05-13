import DefaultButton from "@/components/Button/DefaultButton";
import SimpleCard from "@/components/Card/SimpleCard";
import { InfoCircleFilled } from "@ant-design/icons";
import { Card, Flex, Form, GetProp, Input, Tag } from "antd";
import { useState } from "react";
import styled from "styled-components";


function SalesChannelCard(){

    const content = (
        <>
            <div>
                {/* 提示标签 */}
                <Tag
                    className='tag'
                    closable
                >
                    <div className="text-box">
                        <InfoCircleFilled className="color-FE9E0F" />
                        <span style={{marginLeft:"8px"}}>检测到存在默认初始化的地点数据，请先前往地点设置更新</span>
                        <a className="color-356DFF">地点设置</a>
                    </div>
                </Tag>
            </div>
            <div style={{marginTop:"20px"}}>
                <p className="color-474F5E">通过让你的应用成为销售渠道，你可以实现以下场景:</p>
                <pre className="color-474F5E">
                    {" -将你的销售渠道嵌入至商家后台"}
                    <br />
                    {" -让商家向你的渠道发布商品"}
                </pre>
            </div>
            <div>
                <DefaultButton text="将应用转为销售渠道" />
            </div>
        </>
    )
    return(
        <Scoped>
            <SimpleCard title={<div className="font-w-500">销售渠道</div>} content={content} />
        </Scoped>
    )
}

export default SalesChannelCard;

const Scoped = styled.div`
    .tag{
        width: 100%;
        font-size: 14px;
        margin-top:12px;
        padding: 8px 16px;
        background-color: #ffedc9;
        border: 1px solid rgba(254, 158, 15, .2);
        .text-box{
            display: inline-block;
            width: 99%;
        }
    }
`